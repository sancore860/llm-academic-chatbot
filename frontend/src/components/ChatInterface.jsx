import { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const SUGGESTIONS = [
  { icon: '📊', text: 'Explain time complexity of sorting algorithms' },
  { icon: '🗄️', text: 'What is normalization in DBMS? Explain 3NF with example' },
  { icon: '💻', text: 'Explain the four pillars of OOP with Java examples' },
  { icon: '🌐', text: 'Describe the OSI model layers with protocols' },
  { icon: '🧠', text: 'How does Dijkstra\'s algorithm work? Step by step' },
  { icon: '🏢', text: 'How to prepare for TCS/Infosys placement interviews?' },
  { icon: '📐', text: 'Explain Laplace Transform with examples' },
  { icon: '🔒', text: 'What are deadlocks in OS and how to prevent them?' },
];

export default function ChatInterface({ chatId, onChatCreated, onChatUpdated }) {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(chatId);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    setCurrentChatId(chatId);
    if (chatId) {
      loadChat(chatId);
    } else {
      setMessages([]);
    }
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const loadChat = async (id) => {
    setLoadingChat(true);
    try {
      const { data } = await axios.get(`/api/chat/${id}`);
      setMessages(data.messages);
    } catch {
      setMessages([]);
    } finally {
      setLoadingChat(false);
    }
  };

  const handleSend = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput('');

    // Add user message
    const userMsg = { role: 'user', content: msg, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    try {
      const { data } = await axios.post('/api/chat/message', {
        message: msg,
        chatId: currentChatId
      });

      const assistantMsg = { role: 'assistant', content: data.reply, timestamp: new Date() };
      setMessages(prev => [...prev, assistantMsg]);

      if (!currentChatId) {
        setCurrentChatId(data.chatId);
        onChatCreated(data.chatId);
      } else {
        onChatUpdated(data.chatId);
      }
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: '❌ Sorry, I couldn\'t process your request. Please check if the server is running and try again.',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
      textareaRef.current?.focus();
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const autoResize = (e) => {
    const el = e.target;
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 140) + 'px';
  };

  const formatTime = (ts) => {
    if (!ts) return '';
    const d = new Date(ts);
    return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div>
          <div className="chat-header-title">
            {currentChatId ? 'Chat Session' : 'New Conversation'}
          </div>
          <div className="chat-header-sub">
            EduBot · B.Tech Academic Assistant · {user?.branch} Year {user?.year}
          </div>
        </div>
        <div className="chat-header-actions">
          <button className="icon-btn" onClick={() => { setMessages([]); setCurrentChatId(null); }}>
            ＋ New Chat
          </button>
        </div>
      </div>

      <div className="messages-container">
        {loadingChat ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '40px' }}>
            <div className="loading-spinner" />
          </div>
        ) : messages.length === 0 ? (
          <div className="welcome-screen">
            <div className="welcome-icon">🎓</div>
            <h1 className="welcome-title">Hi {user?.name?.split(' ')[0]}! 👋</h1>
            <p className="welcome-sub">
              I'm EduBot, your personal B.Tech academic assistant. Ask me anything about your subjects, exams, placements, or career!
            </p>
            <div className="suggestion-grid">
              {SUGGESTIONS.slice(0, 6).map((s, i) => (
                <div key={i} className="suggestion-card" onClick={() => handleSend(s.text)}>
                  <div className="suggestion-icon">{s.icon}</div>
                  <div className="suggestion-text">{s.text}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <>
            {messages.map((msg, idx) => (
              <div key={idx} className={`message ${msg.role}`}>
                <div className="msg-avatar">
                  {msg.role === 'user' ? initial : '🤖'}
                </div>
                <div>
                  <div className="msg-bubble">
                    {msg.role === 'assistant' ? (
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      msg.content
                    )}
                  </div>
                  <div className="msg-time">{formatTime(msg.timestamp)}</div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="message assistant">
                <div className="msg-avatar">🤖</div>
                <div className="msg-bubble">
                  <div className="typing-indicator">
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                    <div className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
          </>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="chat-input-area">
        <div className="input-wrapper">
          <textarea
            ref={textareaRef}
            className="chat-textarea"
            placeholder="Ask anything about your B.Tech subjects, exams, placements..."
            value={input}
            onChange={e => { setInput(e.target.value); autoResize(e); }}
            onKeyDown={handleKeyDown}
            rows={1}
            disabled={loading}
          />
          <button
            className="send-btn"
            onClick={() => handleSend()}
            disabled={!input.trim() || loading}
            title="Send (Enter)"
          >
            ➤
          </button>
        </div>
        <div className="input-hint">Press Enter to send · Shift+Enter for new line</div>
      </div>
    </div>
  );
}
