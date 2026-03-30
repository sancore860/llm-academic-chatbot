const express = require('express');
const router = express.Router();
const https = require('https');
const Chat = require('../models/Chat');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const { systemPrompt } = require('../data/btechData');

// Call Groq API (100% free, no credit card needed)
function callGroq(apiKey, messages) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: 'llama-3.3-70b-versatile',
      max_tokens: 1500,
      temperature: 0.7,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages.map(m => ({ role: m.role === 'assistant' ? 'assistant' : 'user', content: m.content }))
      ]
    });

    const options = {
      hostname: 'api.groq.com',
      path: '/openai/v1/chat/completions',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey,
        'Content-Length': Buffer.byteLength(body)
      }
    };

    const req = https.request(options, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          if (res.statusCode === 200) resolve(parsed);
          else reject({ status: res.statusCode, body: parsed });
        } catch(e) {
          reject({ status: res.statusCode, body: data });
        }
      });
    });

    req.on('error', (e) => reject({ status: 0, body: e.message }));
    req.write(body);
    req.end();
  });
}

// ---------------------------------------------------------------
// @route GET /api/chat/stats/summary  — MUST be before /:chatId
// ---------------------------------------------------------------
router.get('/stats/summary', protect, async (req, res) => {
  try {
    const totalChats = await Chat.countDocuments({ userId: req.user._id });
    const subjectStats = await Chat.aggregate([
      { $match: { userId: req.user._id } },
      { $group: { _id: '$subject', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);
    const user = await User.findById(req.user._id).select('totalQueries');
    res.json({
      totalChats,
      totalQueries: user ? user.totalQueries : 0,
      subjectBreakdown: subjectStats
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch stats' });
  }
});

// ---------------------------------------------------------------
// @route GET /api/chat/history
// ---------------------------------------------------------------
router.get('/history', protect, async (req, res) => {
  try {
    const chats = await Chat.find({ userId: req.user._id })
      .select('_id title subject createdAt updatedAt messages')
      .sort({ updatedAt: -1 })
      .limit(50);
    res.json(chats.map(c => ({
      _id: c._id, title: c.title, subject: c.subject,
      messageCount: c.messages.length, createdAt: c.createdAt, updatedAt: c.updatedAt
    })));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chat history' });
  }
});

// ---------------------------------------------------------------
// @route POST /api/chat/message
// ---------------------------------------------------------------
router.post('/message', protect, async (req, res) => {
  try {
    const { message, chatId } = req.body;
    if (!message || !message.trim()) return res.status(400).json({ message: 'Message cannot be empty' });

    const apiKey = (process.env.GROQ_API_KEY || '').trim();
    if (!apiKey || apiKey === 'your_groq_api_key_here') {
      return res.status(500).json({ message: 'GROQ_API_KEY missing in .env file. Get free key at https://console.groq.com' });
    }

    let chat;
    if (chatId) {
      chat = await Chat.findOne({ _id: chatId, userId: req.user._id });
      if (!chat) return res.status(404).json({ message: 'Chat not found' });
    } else {
      chat = new Chat({ userId: req.user._id, messages: [] });
    }

    chat.messages.push({ role: 'user', content: message.trim() });
    const contextMessages = chat.messages.slice(-20).map(m => ({ role: m.role, content: m.content }));

    let groqResponse;
    try {
      groqResponse = await callGroq(apiKey, contextMessages);
    } catch (apiErr) {
      console.error('Groq API error:', apiErr.status, JSON.stringify(apiErr.body));
      let msg = 'Groq API error.';
      if (apiErr.status === 401) msg = 'Invalid Groq API key. Get one free at https://console.groq.com';
      else if (apiErr.status === 429) msg = 'Rate limit hit. Wait a moment and try again.';
      else if (apiErr.status === 0) msg = 'Network error: ' + apiErr.body;
      else msg = 'Groq error ' + apiErr.status + ': ' + JSON.stringify(apiErr.body);
      return res.status(500).json({ message: msg });
    }

    const assistantReply = groqResponse?.choices?.[0]?.message?.content;
    if (!assistantReply) {
      console.error('Unexpected Groq response:', JSON.stringify(groqResponse));
      return res.status(500).json({ message: 'No reply from Groq: ' + JSON.stringify(groqResponse) });
    }

    chat.messages.push({ role: 'assistant', content: assistantReply });

    const subjectKeywords = {
      'Data Structures': ['array', 'linked list', 'tree', 'graph', 'stack', 'queue', 'heap', 'sorting', 'searching', 'dsa'],
      'DBMS': ['sql', 'database', 'query', 'normalization', 'join', 'table', 'dbms', 'transaction'],
      'OS': ['process', 'thread', 'scheduling', 'memory', 'deadlock', 'semaphore', 'paging', 'operating system'],
      'Networks': ['network', 'protocol', 'tcp', 'udp', 'osi', 'http', 'router', 'subnet'],
      'OOP': ['class', 'object', 'inheritance', 'polymorphism', 'encapsulation', 'abstraction'],
      'Machine Learning': ['ml', 'machine learning', 'neural', 'regression', 'classification', 'clustering'],
      'Algorithms': ['algorithm', 'complexity', 'big o', 'dijkstra', 'dynamic programming', 'greedy'],
      'Placement': ['placement', 'interview', 'leetcode', 'company', 'hiring', 'job', 'internship'],
      'GATE': ['gate exam', 'm.tech', 'psu', 'gate preparation'],
      'Mathematics': ['calculus', 'matrix', 'differential', 'probability', 'statistics', 'laplace', 'fourier']
    };

    const msgLower = message.toLowerCase();
    let detectedSubject = 'General';
    for (const [subject, keywords] of Object.entries(subjectKeywords)) {
      if (keywords.some(k => msgLower.includes(k))) { detectedSubject = subject; break; }
    }
    if (chat.subject === 'General') chat.subject = detectedSubject;

    await chat.save();
    await User.findByIdAndUpdate(req.user._id, { $inc: { totalQueries: 1 } });
    res.json({ chatId: chat._id, reply: assistantReply, subject: chat.subject });

  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});

// ---------------------------------------------------------------
// @route GET /api/chat/:chatId   — AFTER all named routes
// ---------------------------------------------------------------
router.get('/:chatId', protect, async (req, res) => {
  try {
    const chat = await Chat.findOne({ _id: req.params.chatId, userId: req.user._id });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json(chat);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chat' });
  }
});

// ---------------------------------------------------------------
// @route DELETE /api/chat/:chatId
// ---------------------------------------------------------------
router.delete('/:chatId', protect, async (req, res) => {
  try {
    const chat = await Chat.findOneAndDelete({ _id: req.params.chatId, userId: req.user._id });
    if (!chat) return res.status(404).json({ message: 'Chat not found' });
    res.json({ message: 'Chat deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete chat' });
  }
});

module.exports = router;