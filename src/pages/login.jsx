import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./login.css";

// Updated prop name: onNavigateToRegister
export default function LoginPage({ onGoBack, onNavigateToRegister }) {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Note: The role state is currently unused in handleSubmit but kept for UI toggle logic.
  // The actual role determination should happen within auth.login or on the subsequent redirect.

  const auth = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      // Assuming auth.login({ email, password }) handles authentication and returns user data with a 'role'.
      const user = await auth.login({ email, password }); 
      
      // Navigate based on the user's role
      if (user && user.role) {
        if (user.role === "patient") navigate("/patient", { replace: true });
        else if (user.role === "doctor") navigate("/doctor", { replace: true });
        else if (user.role === "admin") navigate("/admin", { replace: true });
        else navigate("/", { replace: true }); // Default fallback
      } else {
         // Fallback if role is missing, maybe navigate to a generic dashboard or home
         navigate("/", { replace: true });
      }

    } catch (err) {
      // Catch network or authentication errors
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
        
        {/* Role Toggle */}
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

          {/* Display error message */}
          {error && <div className="error-message">{error}</div>}

          {/* Navigation to Register Page and Back to Home */}
          <div className="alt">
            <span>Don't have an account?</span>
            {/* Using the prop to navigate to the Register view */}
            <button 
                type="button" 
                onClick={onNavigateToRegister}
                style={{ background: 'none', border: 'none', color: '#06b6d4', cursor: 'pointer', fontWeight: '600', padding: '0 5px' }}
            >
                **Create one**
            </button>
          </div>

          {/* Optional: Add a button to return to the Home page view */}
          <div className="alt" style={{ marginTop: '1rem' }}>
            <button 
                type="button" 
                onClick={onGoBack}
                style={{ background: 'none', border: 'none', color: '#155e75', cursor: 'pointer', fontWeight: '500', padding: '0 5px' }}
            >
                &larr; **Back to Home**
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}