import React from "react";
import Layout from "../components/Layout";
import './Admin.css';

function Admin() {
  return (
    <Layout>
      <div className="admin-container">
        <header className="admin-header">
          <h1>Administrator Dashboard</h1>
          <p>Overview of system health, users, and appointments — quick actions at your fingertips.</p>
        </header>

        <div className="admin-grid">
          <div className="admin-card">
            <div className="card-header">
              <div className="card-icon">👥</div>
              <h3 className="card-title">User Management</h3>
            </div>
            <div className="stats">2,458</div>
            <div className="stat-label">Active Users</div>
            <p className="card-content">Create, edit, and deactivate user accounts. Assign roles and permissions.</p>
          </div>

          <div className="admin-card">
            <div className="card-header">
              <div className="card-icon">📊</div>
              <h3 className="card-title">Analytics</h3>
            </div>
            <div className="stats">89%</div>
            <div className="stat-label">Patient Satisfaction</div>
            <p className="card-content">Monitor KPIs and export reports for stakeholders.</p>
          </div>

          <div className="admin-card">
            <div className="card-header">
              <div className="card-icon">📅</div>
              <h3 className="card-title">Appointments</h3>
            </div>
            <div className="stats">156</div>
            <div className="stat-label">Today's Schedule</div>
            <p className="card-content">Quickly review today's appointments and assign staff as needed.</p>
          </div>
        </div>

        <div className="admin-form">
          <h3>Quick Actions</h3>
          <div className="form-group">
            <label className="form-label">Generate Report</label>
            <select className="form-input">
              <option>Daily Summary</option>
              <option>Weekly Analytics</option>
              <option>Monthly Performance</option>
            </select>
          </div>
          <button className="admin-button">Generate Report</button>
        </div>
      </div>
    </Layout>
  );
}

export default Admin;
