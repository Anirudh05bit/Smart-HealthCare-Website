import React from "react";
import Layout from "../components/Layout";
import './Patients.css';

function Patients() {
  return (
    <Layout>
      <div className="patients-container">
        <header className="patients-header">
          <h1>Patient Dashboard</h1>
          <p>Manage appointments, medical records, and prescriptions in one secure place.</p>
        </header>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon">📅</div>
              <h3 className="card-title">Upcoming Appointments</h3>
            </div>
            <div className="appointment-list">
              <div className="appointment-item">
                <div className="appointment-header">
                  <div className="doctor-name">Dr. Sarah Johnson</div>
                  <div className="appointment-date">Nov 10, 2025</div>
                </div>
                <p className="appointment-details">Regular Checkup - Cardiology</p>
                <div className="appointment-actions">
                  <button className="action-button primary-button">Confirm</button>
                  <button className="action-button secondary-button">Reschedule</button>
                </div>
              </div>
            </div>
          </div>

          <div className="dashboard-card">
            <div className="card-header">
              <div className="card-icon">💊</div>
              <h3 className="card-title">Prescriptions</h3>
            </div>
            <div className="appointment-list">
              <div className="appointment-item">
                <div className="appointment-header">
                  <div className="doctor-name">Active Medications</div>
                  <div className="appointment-date">Refill Available</div>
                </div>
                <p className="appointment-details">2 current prescriptions need attention</p>
                <div className="appointment-actions">
                  <button className="action-button primary-button">Request Refill</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="medical-history">
          <h3 className="card-title">Recent Medical History</h3>
          <div className="history-item">
            <div className="history-date">October 15, 2025</div>
            <div className="history-title">Annual Physical Examination</div>
            <p className="history-details">Routine checkup completed. All vital signs normal. Follow-up recommended in 12 months.</p>
          </div>
          <div className="history-item">
            <div className="history-date">September 28, 2025</div>
            <div className="history-title">Vaccination</div>
            <p className="history-details">Seasonal flu vaccine administered. No adverse reactions observed.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Patients;
