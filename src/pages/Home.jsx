import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

export default function Home() {
  return (
    <div className="home-root">
      <header className="home-hero">
        <div className="hero-overlay" />
        <div className="hero-pattern" />

        <div className="hero-content">
          <div className="eyebrow">Smart HealthCare</div>
          <h1 className="hero-title">Where expertise meets professionalism</h1>
          <p className="hero-sub">
            Modern, secure telehealth and in-person care. Book appointments, connect with top
            specialists, and manage patient records  all in one place.
          </p>

          <div className="hero-ctas">
            <Link to="/doctors" className="btn btn-primary">Find a Doctor</Link>
            <Link to="/patients" className="btn btn-ghost">For Patients</Link>
          </div>
        </div>

        <div className="hero-bottom-cards">
          <div className="cards-inner">
            <div className="feature-card">
              <div className="fc-icon"></div>
              <h4>Trusted Doctors</h4>
              <p>Verified professionals across multiple specialties.</p>
            </div>
            <div className="feature-card">
              <div className="fc-icon"></div>
              <h4>Easy Scheduling</h4>
              <p>Book same-day or future appointments in seconds.</p>
            </div>
            <div className="feature-card">
              <div className="fc-icon"></div>
              <h4>Secure Records</h4>
              <p>Encrypted medical records and private messaging.</p>
            </div>
          </div>
        </div>
      </header>

      <main className="home-main">
        <section className="about-section">
          <h2>Care that puts patients first</h2>
          <p>
            Our platform helps hospitals and clinics modernize workflows and deliver a better
            patient experience. From telehealth to in-clinic visits, we make it easy to get the
            right care at the right time.
          </p>
        </section>

        <section className="gallery">
          <div className="gallery-grid">
            <div className="tile">Consultations</div>
            <div className="tile">Diagnostics</div>
            <div className="tile">24/7 Support</div>
          </div>
        </section>
      </main>
    </div>
  );
}
