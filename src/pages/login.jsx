import React, { useState } from "react";
import "./login.css";

export default function Login() {
  const [role, setRole] = useState("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role, email, password }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        alert(`Welcome ${data.username || "User"}!`);
        // You can redirect here, e.g., window.location.href = "/dashboard"
      } else {
        alert(data.error || "Invalid credentials");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Error connecting to server");
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
            Doctor
          </button>
          <button
            type="button"
            className={role === "patient" ? "role active" : "role"}
            onClick={() => setRole("patient")}
            aria-pressed={role === "patient"}
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
            <a className="forgot" href="#forgot">
              Forgot?
            </a>
          </div>

          <button className="btn btn-primary full" type="submit">
            Sign in
          </button>

          <div className="alt">
            <span>Don't have an account?</span>
            <a href="#signup">Create one</a>
          </div>
        </form>
      </div>
    </div>
  );
}
