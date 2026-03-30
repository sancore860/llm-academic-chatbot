require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', require('./routes/auth'));
app.use('/api/chat', require('./routes/chat'));

app.get('/api/health', (req, res) => {
  const key = process.env.GROQ_API_KEY;
  res.json({
    status: 'OK',
    GROQ_API_KEY: (!key || key === 'your_groq_api_key_here') ? 'MISSING' : 'SET (' + key.substring(0,10) + '...)',
    MONGO_URI: process.env.MONGO_URI ? 'Set' : 'MISSING',
    JWT_SECRET: process.env.JWT_SECRET ? 'Set' : 'MISSING',
  });
});

app.use('*', (req, res) => res.status(404).json({ message: 'Route not found' }));
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB connected');
    app.listen(PORT, () => {
      console.log('🚀 Server running on http://localhost:' + PORT);
      const key = process.env.GROQ_API_KEY;
      if (!key || key === 'your_groq_api_key_here') {
        console.log('⚠️  GROQ_API_KEY not set! Get free key at https://console.groq.com');
      } else {
        console.log('✅ GROQ_API_KEY loaded (' + key.substring(0,10) + '...)');
      }
    });
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed:', err.message);
    process.exit(1);
  });
