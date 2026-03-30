import { useState } from 'react';
import { useAuth } from './context/AuthContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

export default function App() {
  const { user, loading } = useAuth();
  const [showLogin, setShowLogin] = useState(true);

  if (loading) {
    return (
      <div className="loading-screen">
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 16 }}>🎓</div>
          <div className="loading-spinner" style={{ margin: '0 auto' }} />
          <div style={{ marginTop: 12, color: 'var(--text-muted)', fontSize: '0.9rem' }}>Loading EduBot...</div>
        </div>
      </div>
    );
  }

  if (!user) {
    return showLogin
      ? <Login onSwitch={() => setShowLogin(false)} />
      : <Signup onSwitch={() => setShowLogin(true)} />;
  }

  return <Dashboard />;
}
