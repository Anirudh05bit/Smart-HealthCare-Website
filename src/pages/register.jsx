import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './register.css';

export default function RegisterPage({ onGoBack, onNavigateToLogin }) {
  const [role, setRole] = useState('patient');
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    dob: '',
    address: '',
    emergency: '',
    license: '',
    specialization: '',
    hospital: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function update(field) {
    return (e) => setForm((s) => ({ ...s, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.email || !form.password) {
      setError('Please fill name, email, and password.');
      return;
    }

    if (role === 'doctor' && (!form.license || !form.specialization)) {
      setError('Please provide doctor license and specialization.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, role }),
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.error || body.message || 'Registration failed');
      
      setSuccess('Registration successful — please sign in.');
      setForm({ name: '', email: '', password: '', dob: '', address: '', emergency: '', license: '', specialization: '', hospital: '' });
      
      setTimeout(() => {
        onNavigateToLogin();
      }, 1500);

    } catch (err) {
      setError(err.message || 'Registration error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Create account</h2>
        <p className="muted">Select your role and enter required details</p>

        <div className="role-toggle">
          <button
            type="button"
            className={role === 'patient' ? 'role active' : 'role'}
            onClick={() => setRole('patient')}
          >
            Patient 🧑
          </button>
          <button
            type="button"
            className={role === 'doctor' ? 'role active' : 'role'}
            onClick={() => setRole('doctor')}
          >
            Doctor 👨‍⚕️
          </button>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <label className="label">Full name</label>
          <input className="input" value={form.name} onChange={update('name')} required placeholder="e.g., Jane Doe" />

          <label className="label">Email</label>
          <input className="input" type="email" value={form.email} onChange={update('email')} required placeholder="you@example.com" />

          <label className="label">Password</label>
          <input className="input" type="password" value={form.password} onChange={update('password')} required placeholder="Set a strong password" />

          {role === 'patient' && (
            <>
              <label className="label">Date of birth</label>
              <input className="input" type="date" value={form.dob} onChange={update('dob')} />

              <label className="label">Address</label>
              <input className="input" value={form.address} onChange={update('address')} placeholder="Street, City, Zip" />

              <label className="label">Emergency contact</label>
              <input className="input" value={form.emergency} onChange={update('emergency')} placeholder="Name or Phone Number" />
            </>
          )}

          {role === 'doctor' && (
            <>
              <label className="label">Medical license number</label>
              <input className="input" value={form.license} onChange={update('license')} placeholder="e.g., L-123456" />

              <label className="label">Specialization</label>
              <input className="input" value={form.specialization} onChange={update('specialization')} placeholder="e.g., Cardiology" />

              <label className="label">Hospital / Clinic</label>
              <input className="input" value={form.hospital} onChange={update('hospital')} placeholder="Current workplace" />
            </>
          )}

          <button className="btn btn-primary full" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          {error && <p className="error-message">{error}</p>}
          {success && <p className="success-message">{success}</p>}
        </form>
        
        <div className="alt">
          <span>Already have an account?</span>
          <button 
            type="button" 
            onClick={onNavigateToLogin}
            style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer', fontWeight: '600', padding: '0 5px' }}
          >
            Sign in
          </button>
        </div>

        <div className="alt" style={{ marginTop: '1rem' }}>
          <button 
            type="button" 
            onClick={onGoBack}
            style={{ background: 'none', border: 'none', color: '#155e75', cursor: 'pointer', fontWeight: '500', padding: '0 5px' }}
          >
            &larr; Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}