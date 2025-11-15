import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './register.css';

export default function Register() {
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
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  function update(field) {
    return (e) => setForm((s) => ({ ...s, [field]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (!form.name || !form.email || !form.password) {
      setError('Please fill name, email, and password');
      return;
    }

    if (role === 'doctor' && (!form.license || !form.specialization)) {
      setError('Please provide doctor license and specialization');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role, ...form }),
      });

      const data = await response.json();

      if (response.ok && data.token && data.user) {
        login(data.user, data.token);
        navigate('/');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (err) {
      console.error('Error:', err);
      setError('Error connecting to server');
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
            Patient
          </button>
          <button
            type="button"
            className={role === 'doctor' ? 'role active' : 'role'}
            onClick={() => setRole('doctor')}
          >
            Doctor
          </button>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <label className="label">Full name</label>
          <input className="input" value={form.name} onChange={update('name')} required />

          <label className="label">Email</label>
          <input className="input" type="email" value={form.email} onChange={update('email')} required />

          <label className="label">Password</label>
          <input className="input" type="password" value={form.password} onChange={update('password')} required />

          {role === 'patient' && (
            <>
              <label className="label">Date of birth</label>
              <input className="input" type="date" value={form.dob} onChange={update('dob')} />

              <label className="label">Address</label>
              <input className="input" value={form.address} onChange={update('address')} />

              <label className="label">Emergency contact</label>
              <input className="input" value={form.emergency} onChange={update('emergency')} />
            </>
          )}

          {role === 'doctor' && (
            <>
              <label className="label">Medical license number</label>
              <input className="input" value={form.license} onChange={update('license')} />

              <label className="label">Specialization</label>
              <input className="input" value={form.specialization} onChange={update('specialization')} />

              <label className="label">Hospital / Clinic</label>
              <input className="input" value={form.hospital} onChange={update('hospital')} />
            </>
          )}

          {error && <p className="error">{error}</p>}

          <button className="btn btn-primary full" type="submit" disabled={loading}>
            {loading ? 'Creating account...' : 'Create account'}
          </button>

          <div className="alt">
            <span>Already have an account?</span>
            <Link to="/login">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
