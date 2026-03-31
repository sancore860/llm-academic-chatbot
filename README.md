# 🎓 EduBot — B.Tech Academic Chatbot

A full-stack AI-powered academic assistant built specifically for B.Tech students. EduBot helps students with subject queries, exam preparation, placement guidance, and career advice — all in a clean, modern chat interface.

![EduBot](https://img.shields.io/badge/EduBot-B.Tech%20Assistant-blue?style=for-the-badge&logo=graduation-cap)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb)
![Groq](https://img.shields.io/badge/Groq-AI%20Powered-FF6B35?style=for-the-badge)

---

## 📸 Features

- 🔐 **Login & Signup** — JWT-based authentication with student profile (branch, year, roll number)
- 💬 **AI Chat** — Powered by Groq AI (Llama 3.3) for fast, accurate academic answers
- 📚 **Subject Coverage** — DSA, DBMS, OS, Networks, OOP, ML, Algorithms, Maths, and more
- 🗂️ **Chat History** — All conversations saved per user in MongoDB
- 🏷️ **Auto Subject Tagging** — Chats automatically tagged by topic
- 📊 **Stats Dashboard** — Track total queries, chats, and subject breakdown
- 🎨 **Modern UI** — Dark theme with markdown rendering, code blocks, and typing indicators
- 💡 **Suggestion Cards** — Quick-start prompts for common B.Tech topics

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React 18 + Vite |
| Backend | Node.js + Express |
| Database | MongoDB (Mongoose) |
| AI | Groq API (Llama 3.3 70B) |
| Auth | JWT (JSON Web Tokens) |
| Styling | Pure CSS (Dark Theme) |

---

## 📁 Project Structure

```
btech-chatbot/
├── backend/
│   ├── data/
│   │   └── btechData.js        ← B.Tech knowledge base & AI system prompt
│   ├── middleware/
│   │   └── auth.js             ← JWT authentication middleware
│   ├── models/
│   │   ├── User.js             ← User schema (name, email, branch, year)
│   │   └── Chat.js             ← Chat & message schema
│   ├── routes/
│   │   ├── auth.js             ← /api/auth/* (login, signup, profile)
│   │   └── chat.js             ← /api/chat/* (message, history, stats)
│   ├── .env.example            ← Copy to .env and fill your keys
│   ├── server.js               ← Express server entry point
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Sidebar.jsx     ← Chat history sidebar
    │   │   └── ChatInterface.jsx ← Main chat UI
    │   ├── context/
    │   │   └── AuthContext.jsx ← Global auth state
    │   ├── pages/
    │   │   ├── Login.jsx
    │   │   ├── Signup.jsx
    │   │   ├── Dashboard.jsx
    │   │   └── StatsPage.jsx
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    └── package.json
```

---

## ⚙️ Prerequisites

Before running this project, make sure you have installed:

1. **Node.js** (v18 or higher) — https://nodejs.org
2. **MongoDB Community Server** — https://www.mongodb.com/try/download/community
3. **Groq API Key** (Free) — https://console.groq.com

---

## 🚀 Getting Started

### Step 1 — Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/btech-chatbot.git
cd btech-chatbot
```

### Step 2 — Get a free Groq API Key
1. Go to https://console.groq.com
2. Sign up with Google (free, no credit card needed)
3. Click **API Keys** → **Create API Key**
4. Copy the key (starts with `gsk_...`)

### Step 3 — Configure environment
```bash
cd backend
cp .env.example .env
```
Open `.env` and fill in your values:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/btech_chatbot
JWT_SECRET=any_random_secret_string_here
GROQ_API_KEY=gsk_your_groq_key_here
```

### Step 4 — Install dependencies

**Backend:**
```bash
cd backend
npm install
```

**Frontend:**
```bash
cd ../frontend
npm install
```

### Step 5 — Start the application

**Terminal 1 — Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 — Frontend:**
```bash
cd frontend
npm run dev
```

### Step 6 — Open in browser
```
http://localhost:5173
```

---

## 🔌 API Endpoints

### Auth Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new student |
| POST | `/api/auth/login` | Login & get JWT token |
| GET | `/api/auth/me` | Get current user info |
| PUT | `/api/auth/profile` | Update profile |

### Chat Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/chat/message` | Send message, get AI reply |
| GET | `/api/chat/history` | Get all user chats |
| GET | `/api/chat/:chatId` | Get single chat with messages |
| DELETE | `/api/chat/:chatId` | Delete a chat |
| GET | `/api/chat/stats/summary` | Get user statistics |

---

## 🤖 AI Knowledge Coverage

EduBot is trained on a comprehensive B.Tech knowledge base:

| Subject | Topics |
|---------|--------|
| Data Structures | Arrays, Trees, Graphs, Sorting, Searching, Time Complexity |
| Algorithms | Dijkstra, Floyd-Warshall, Dynamic Programming, Greedy |
| DBMS | SQL, Normalization (1NF–BCNF), Joins, ACID, Transactions |
| Operating Systems | Scheduling, Paging, Deadlocks, Semaphores |
| Computer Networks | OSI Model, TCP/IP, Protocols, Subnetting |
| OOP | 4 Pillars, Design Patterns, Java/C++ examples |
| Machine Learning | Supervised/Unsupervised, Algorithms, Evaluation |
| Engineering Maths | Calculus, Laplace, Fourier, Probability |
| Software Engineering | SDLC, Agile, Scrum, Testing, SOLID |
| Placement Prep | DSA, System Design, Top Companies, Interview Tips |
| GATE / MS Abroad | Exam strategy, IITs, IISc, Foreign universities |

---

## 🔒 Security Notes

- Never commit your `.env` file — it's blocked by `.gitignore`
- Change `JWT_SECRET` to a strong random string in production
- For production deployment, use MongoDB Atlas instead of local MongoDB

---

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB not connecting | Make sure MongoDB service is running |
| Groq API error 401 | Check your `GROQ_API_KEY` in `.env` |
| `ENOTFOUND api.groq.com` | Check internet connection / flush DNS |
| Frontend blank screen | Check browser console (F12) for errors |
| Port already in use | Change `PORT=5001` in `.env` |

---

