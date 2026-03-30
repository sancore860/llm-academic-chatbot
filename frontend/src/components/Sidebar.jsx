import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function Sidebar({ chats, currentChatId, onNewChat, onSelectChat, onDeleteChat, onShowStats }) {
  const { user, logout } = useAuth();

  const handleDelete = async (e, chatId) => {
    e.stopPropagation();
    try {
      await axios.delete(`/api/chat/${chatId}`);
      onDeleteChat(chatId);
    } catch {}
  };

  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    const now = new Date();
    const diffMs = now - d;
    const diffH = Math.floor(diffMs / 3600000);
    if (diffH < 1) return 'Just now';
    if (diffH < 24) return `${diffH}h ago`;
    const diffD = Math.floor(diffH / 24);
    if (diffD < 7) return `${diffD}d ago`;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  };

  const initial = user?.name?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">🎓</div>
          <span className="sidebar-logo-name">EduBot</span>
        </div>
        <button className="new-chat-btn" onClick={onNewChat}>
          <span>＋</span> New Chat
        </button>
      </div>

      <div className="sidebar-section-title">Recent Chats</div>

      <div className="chat-list">
        {chats.length === 0 && (
          <div style={{ padding: '20px 10px', color: 'var(--text-muted)', fontSize: '0.85rem', textAlign: 'center' }}>
            No chats yet.<br/>Start by asking a question!
          </div>
        )}
        {chats.map(chat => (
          <div
            key={chat._id}
            className={`chat-item ${currentChatId === chat._id ? 'active' : ''}`}
            onClick={() => onSelectChat(chat._id)}
          >
            <div className="chat-item-info">
              <div className="chat-item-title">{chat.title}</div>
              <div className="chat-item-meta">{formatDate(chat.updatedAt)} · {chat.messageCount} msgs</div>
            </div>
            {chat.subject && chat.subject !== 'General' && (
              <span className="chat-item-tag">{chat.subject}</span>
            )}
            <button className="chat-delete-btn" onClick={(e) => handleDelete(e, chat._id)} title="Delete chat">
              ✕
            </button>
          </div>
        ))}
      </div>

      <div className="sidebar-section-title" style={{ cursor: 'pointer' }} onClick={onShowStats}>
        📊 My Stats
      </div>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">{initial}</div>
          <div className="user-info">
            <div className="user-name">{user?.name}</div>
            <div className="user-branch">{user?.branch} · Year {user?.year} {user?.rollNumber ? `· ${user.rollNumber}` : ''}</div>
          </div>
          <button className="logout-btn" onClick={logout} title="Logout">⏻</button>
        </div>
      </div>
    </div>
  );
}
