import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./login.css";

export default function LoginPage({ onGoBack, onNavigateToRegister }) {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await auth.login({ email, password }); 
      
      if (user && user.role) {
        if (user.role === "patient") navigate("/patient", { replace: true });
        else if (user.role === "doctor") navigate("/doctor", { replace: true });
        else if (user.role === "admin") navigate("/admin", { replace: true });
        else navigate("/", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="card-header">
          <h3>Sign in</h3>
          <p className="muted">Select your role and log in to continue</p>
        </div>
        
        <div className="role-toggle" role="tablist" aria-label="Select role">
          <button
            type="button"
            className={role === "doctor" ? "role active" : "role"}
            onClick={() => setRole("doctor")}
            aria-pressed={role === "doctor"}
          >
            Doctor 👨‍⚕️
          </button>
          <button
            type="button"
            className={role === "patient" ? "role active" : "role"}
            onClick={() => setRole("patient")}
            aria-pressed={role === "patient"}
          >
            Patient 🧑
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
            <a className="forgot" href="#forgot">
              Forgot password?
            </a>
          </div>

          <button className="btn btn-primary full" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          {error && <div className="error-message">{error}</div>}

          <div className="alt">
            <span>Don't have an account?</span>
            <button 
              type="button" 
              onClick={onNavigateToRegister}
              style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer', fontWeight: '600', padding: '0 5px' }}
            >
              Create one
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
        </form>
      </div>
    </div>
  );
}