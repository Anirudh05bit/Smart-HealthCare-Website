import React from "react";
import Layout from "../components/Layout";
import './Doctors.css';

function Doctors() {
  return (
    <Layout>
      <div className="doctors-container">
        <header className="doctors-header">
          <h1>Our Medical Specialists</h1>
          <p>Connect with experienced doctors across a wide range of specialties.</p>
        </header>

        <div className="filters">
          <button className="filter-button active">All</button>
          <button className="filter-button">Cardiology</button>
          <button className="filter-button">Neurology</button>
          <button className="filter-button">Pediatrics</button>
        </div>

        <div className="doctors-grid">
          <div className="doctor-card">
            <div className="doctor-image" />
            <div className="doctor-info">
              <h3 className="doctor-name">Dr. Sarah Johnson</h3>
              <div className="doctor-specialty">Cardiologist</div>
              <p className="doctor-details">Interventional cardiologist with 15+ years experience.</p>
              <div className="doctor-stats">
                <div className="stat"><div className="stat-value">15+</div><div className="stat-label">Years</div></div>
                <div className="stat"><div className="stat-value">1000+</div><div className="stat-label">Patients</div></div>
                <div className="stat"><div className="stat-value">4.9</div><div className="stat-label">Rating</div></div>
              </div>
              <a className="book-button" href="#book">Book Appointment</a>
            </div>
          </div>

          <div className="doctor-card">
            <div className="doctor-image" />
            <div className="doctor-info">
              <h3 className="doctor-name">Dr. Michael Chen</h3>
              <div className="doctor-specialty">Neurologist</div>
              <p className="doctor-details">Expert in neurology and advanced therapies.</p>
              <div className="doctor-stats">
                <div className="stat"><div className="stat-value">12+</div><div className="stat-label">Years</div></div>
                <div className="stat"><div className="stat-value">800+</div><div className="stat-label">Patients</div></div>
                <div className="stat"><div className="stat-value">4.8</div><div className="stat-label">Rating</div></div>
              </div>
              <a className="book-button" href="#book">Book Appointment</a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Doctors;
