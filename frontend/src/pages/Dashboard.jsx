import { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import ChatInterface from '../components/ChatInterface';
import StatsPage from './StatsPage';

export default function Dashboard() {
  const [chats, setChats] = useState([]);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [view, setView] = useState('chat'); // 'chat' | 'stats'

  useEffect(() => {
    loadChatHistory();
  }, []);

  const loadChatHistory = async () => {
    try {
      const { data } = await axios.get('/api/chat/history');
      setChats(data);
    } catch {}
  };

  const handleNewChat = () => {
    setCurrentChatId(null);
    setView('chat');
  };

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
    setView('chat');
  };

  const handleDeleteChat = (chatId) => {
    setChats(prev => prev.filter(c => c._id !== chatId));
    if (currentChatId === chatId) setCurrentChatId(null);
  };

  const handleChatCreated = (chatId) => {
    setCurrentChatId(chatId);
    loadChatHistory(); // Refresh sidebar
  };

  const handleChatUpdated = () => {
    loadChatHistory(); // Refresh sidebar to update timestamps
  };

  const handleShowStats = () => {
    setView('stats');
    setCurrentChatId(null);
  };

  return (
    <div className="app-layout">
      <Sidebar
        chats={chats}
        currentChatId={currentChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onShowStats={handleShowStats}
      />
      {view === 'stats' ? (
        <StatsPage />
      ) : (
        <ChatInterface
          key={currentChatId || 'new'}
          chatId={currentChatId}
          onChatCreated={handleChatCreated}
          onChatUpdated={handleChatUpdated}
        />
      )}
    </div>
  );
}
