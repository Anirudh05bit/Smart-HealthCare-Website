import React, { useState } from 'react';
import Layout from '../components/Layout';
import './login.css';

export default function Login() {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // placeholder action - integrate auth logic here
    console.log('login', { role, email, password });
    alert(`Logging in as ${role}: ${email}`);
  }

  return (
    <Layout>
      <div className="login-page">
        <div className="login-hero">
          <div className="hero-left">
            <h2 className="brand">GuruDharma</h2>
            <p className="lead">Complete care. Anytime. Anywhere.</p>
            <ul className="benefits">
              <li>Secure patient records</li>
              <li>Trusted specialists</li>
              <li>Fast appointments</li>
            </ul>
            <div className="accent-blob" aria-hidden />
          </div>
          
          <div className="login-card">
            <div className="card-header">
              <h3>Sign in</h3>
              <p className="muted">Choose your role and sign in to continue</p>
            </div>

            <div className="role-toggle" role="tablist" aria-label="Select role">
              <button
                type="button"
                className={role === 'doctor' ? 'role active' : 'role'}
                onClick={() => setRole('doctor')}
                aria-pressed={role === 'doctor'}
              >
                Doctor
              </button>
              <button
                type="button"
                className={role === 'patient' ? 'role active' : 'role'}
                onClick={() => setRole('patient')}
                aria-pressed={role === 'patient'}
              >
                Patient
              </button>
            </div>

            <form className="login-form" onSubmit={handleSubmit}>
              <label className="label">Email</label>
              <input
                className="input"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
              />

              <label className="label">Password</label>
              <input
                className="input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />

              <div className="form-row">
                <label className="remember">
                  <input type="checkbox" /> Remember me
                </label>
                <a className="forgot" href="#forgot">Forgot?</a>
              </div>

              <button className="btn btn-primary full" type="submit">Sign in</button>

              <div className="alt">
                <span>Don't have an account?</span>
                <a href="#signup">Create one</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
