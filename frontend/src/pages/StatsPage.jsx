import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

export default function StatsPage() {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const { data } = await axios.get('/api/chat/stats/summary');
      setStats(data);
    } catch {}
    finally { setLoading(false); }
  };

  const maxCount = stats?.subjectBreakdown?.[0]?.count || 1;

  const subjectColors = {
    'Data Structures': '#4f8ef7',
    'DBMS': '#7c3aed',
    'OS': '#10b981',
    'Networks': '#f59e0b',
    'OOP': '#ef4444',
    'Machine Learning': '#06b6d4',
    'Algorithms': '#8b5cf6',
    'Placement': '#ec4899',
    'GATE': '#14b8a6',
    'Mathematics': '#f97316',
    'General': '#6b7280',
  };

  if (loading) return (
    <div className="stats-page" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="loading-spinner" />
    </div>
  );

  return (
    <div className="chat-area">
      <div className="chat-header">
        <div>
          <div className="chat-header-title">My Learning Stats</div>
          <div className="chat-header-sub">Track your academic journey</div>
        </div>
      </div>

      <div className="stats-page">
        <div style={{ marginBottom: 28 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
            <div style={{
              width: 60, height: 60, borderRadius: 16,
              background: 'linear-gradient(135deg, var(--accent), var(--accent2))',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 28, color: 'white', fontWeight: 700
            }}>
              {user?.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>{user?.name}</div>
              <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                {user?.branch} · Year {user?.year} {user?.rollNumber ? `· ${user.rollNumber}` : ''}
              </div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{user?.email}</div>
            </div>
          </div>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-num">{stats?.totalChats || 0}</div>
            <div className="stat-label">💬 Total Conversations</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{stats?.totalQueries || 0}</div>
            <div className="stat-label">❓ Total Questions Asked</div>
          </div>
          <div className="stat-card">
            <div className="stat-num">{stats?.subjectBreakdown?.length || 0}</div>
            <div className="stat-label">📚 Subjects Explored</div>
          </div>
        </div>

        {stats?.subjectBreakdown?.length > 0 && (
          <div className="stat-card" style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, marginBottom: 16, fontSize: '1rem' }}>📊 Topics Breakdown</div>
            <div className="subject-bars">
              {stats.subjectBreakdown.map(({ _id: subject, count }) => (
                <div key={subject} className="subject-bar-item">
                  <div className="subject-bar-label">
                    <span>{subject}</span>
                    <span style={{ color: 'var(--text-muted)' }}>{count} chat{count !== 1 ? 's' : ''}</span>
                  </div>
                  <div className="subject-bar-track">
                    <div
                      className="subject-bar-fill"
                      style={{
                        width: `${(count / maxCount) * 100}%`,
                        background: `linear-gradient(90deg, ${subjectColors[subject] || '#4f8ef7'}, ${subjectColors[subject] || '#6366f1'}88)`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="stat-card">
          <div style={{ fontWeight: 600, marginBottom: 12, fontSize: '1rem' }}>🎯 Quick Tips</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: '⏱️', tip: 'Use the Pomodoro Technique — 25 min study, 5 min break' },
              { icon: '📝', tip: 'Make handwritten notes for formulas & algorithms' },
              { icon: '💻', tip: 'Practice 2-3 LeetCode problems daily for placement prep' },
              { icon: '📖', tip: 'Solve last 5 years of university question papers before exams' },
              { icon: '🤝', tip: 'Join or form a study group for difficult subjects' },
            ].map(({ icon, tip }, i) => (
              <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
                <span>{icon}</span>
                <span>{tip}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
