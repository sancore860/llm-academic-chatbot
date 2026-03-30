import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function Signup({ onSwitch }) {
  const { signup } = useAuth();
  const [form, setForm] = useState({
    name: '', email: '', password: '', branch: 'CSE', year: '1', rollNumber: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (form.password.length < 6) return setError('Password must be at least 6 characters');
    setLoading(true);
    try {
      await signup({ ...form, year: parseInt(form.year) });
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const set = (field) => (e) => setForm(p => ({ ...p, [field]: e.target.value }));

  return (
    <div className="auth-page">
      <div className="auth-bg-orb orb1" />
      <div className="auth-bg-orb orb2" />
      <div className="auth-card">
        <div className="auth-logo">
          <div className="auth-logo-icon">🎓</div>
          <span className="auth-logo-text">EduBot</span>
        </div>
        <h2 className="auth-title">Create your account</h2>
        <p className="auth-subtitle">Join thousands of B.Tech students</p>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input placeholder="Rahul Sharma" value={form.name} onChange={set('name')} required />
          </div>
          <div className="form-group">
            <label>College Email</label>
            <input type="email" placeholder="rollno@college.edu" value={form.email} onChange={set('email')} required />
          </div>
          <div className="form-group">
            <label>Roll Number</label>
            <input placeholder="2021BTCSE001" value={form.rollNumber} onChange={set('rollNumber')} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Branch</label>
              <select value={form.branch} onChange={set('branch')}>
                <option>CSE</option>
                <option>ECE</option>
                <option>ME</option>
                <option>CE</option>
                <option>EE</option>
                <option>IT</option>
                <option>Other</option>
              </select>
            </div>
            <div className="form-group">
              <label>Year</label>
              <select value={form.year} onChange={set('year')}>
                <option value="1">1st Year</option>
                <option value="2">2nd Year</option>
                <option value="3">3rd Year</option>
                <option value="4">4th Year</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" placeholder="Min. 6 characters" value={form.password} onChange={set('password')} required />
          </div>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create Account →'}
          </button>
        </form>

        <div className="auth-switch">
          Already have an account? <a onClick={onSwitch}>Sign in</a>
        </div>
      </div>
    </div>
  );
}
