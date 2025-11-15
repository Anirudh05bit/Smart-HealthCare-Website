import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "./login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok && data.token && data.user) {
        login(data.user, data.token);
        navigate("/");
      } else {
        setError(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("Error connecting to server");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="card-header">
          <h3>Sign in</h3>
          <p className="muted">Log in to your account</p>
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

          {error && <p className="error">{error}</p>}

          <button className="btn btn-primary full" type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Sign in"}
          </button>

          <div className="alt">
            <span>Don't have an account?</span>
            <Link to="/register">Create one</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
