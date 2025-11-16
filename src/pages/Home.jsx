import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginPage from './login';
import RegisterPage from './register';
// Import necessary CSS files
import './Home.css';
<<<<<<< HEAD

=======
import "./login.css";
import "./register.css";

const COMPANY_LOGO_URL = 'https://images.unsplash.com/photo-1588776856019-338a0f96898d?w=400&h=100&fit=crop&q=80&auto=format';
>>>>>>> 0497187f026553060217c6e0fff3faabac8b972d

export default function Home() {
  // State to control which component is visible: 'home', 'login', or 'register'
  const [activeView, setActiveView] = useState('home');

  // Utility function for setting background based on view
  const getBackgroundColor = (view) => {
    return (view === 'login' || view === 'register') ? '#f0fdfa' : '#ffffff';
  };

  // Function to render the correct view based on state
  const renderView = () => {
    const commonProps = {
      // Pass these functions to allow navigation between login/register and back to home
      onGoBack: () => setActiveView('home'),
      onNavigateToRegister: () => setActiveView('register'),
      onNavigateToLogin: () => setActiveView('login')
    };

    switch (activeView) {
      case 'login':
        // The Login page replaces the main home content
        return (
          <div style={{ padding: '2rem', width: '100%', maxWidth: '450px', margin: '0 auto' }}>
            <LoginPage {...commonProps} />
          </div>
        );
      case 'register':
        // The Register page replaces the main home content
        return (
          <div style={{ padding: '2rem', width: '100%', maxWidth: '450px', margin: '0 auto' }}>
            <RegisterPage {...commonProps} />
          </div>
        );
      case 'home':
      default:
        // Render the simplified home content
        return (
          <div style={{ textAlign: 'center', padding: '5rem 2rem' }}>
            <img
              src={COMPANY_LOGO_URL}
              alt="Smart HealthCare Logo"
              style={{ maxWidth: '300px', height: 'auto', marginBottom: '2rem', borderRadius: '8px' }}
            />
            <h1 style={{ color: '#0e7490', fontSize: '2.5rem' }}>
              Welcome to **Smart HealthCare** 🏥
            </h1>
            <p style={{ color: '#155e75', fontSize: '1.15rem', maxWidth: '600px', margin: '1rem auto' }}>
              Your modern, secure platform for telehealth and in-person care.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="home-root" style={{ minHeight: '100vh', background: getBackgroundColor(activeView) }}>
      {/* HEADER/NAVIGATION SECTION */}
      <header className="home-hero" style={{ 
        position: 'sticky', // Keep header fixed at the top
        top: 0,
        zIndex: 100,
        height: '80px', 
        padding: '0 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'white', // White background for contrast
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.05)' 
      }}>
        {/* Company Name/Logo Link */}
        <Link to="/" onClick={() => setActiveView('home')} style={{ 
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#0891b2', 
            textDecoration: 'none'
        }}>
            Smart HealthCare
        </Link>
        
        {/* TOP RIGHT CORNER BUTTONS */}
        <div className="top-right-nav">
          {activeView !== 'login' && (
            <button 
              onClick={() => setActiveView('login')} 
              className="btn btn-ghost"
              style={{ 
                padding: '0.5rem 1rem', 
                marginRight: '1rem', 
                border: 'none', 
                background: 'transparent', 
                color: '#0891b2', 
                fontWeight: '600', 
                cursor: 'pointer' 
              }}
            >
              **Login**
            </button>
          )}
          {activeView !== 'register' && (
            <button 
              onClick={() => setActiveView('register')} 
              className="btn btn-primary"
              style={{ 
                padding: '0.5rem 1rem', 
                borderRadius: '8px', 
                border: 'none', 
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)', 
                color: 'white', 
                fontWeight: '600', 
                cursor: 'pointer' 
              }}
            >
              **Register**
            </button>
          )}
        </div>
      </header>
      
      {/* MAIN CONTENT AREA: This is where the Home content or the forms will appear */}
      <main className="home-main" style={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: activeView === 'home' ? 'center' : 'flex-start', // Center home, push forms to top
        padding: activeView === 'home' ? '0' : '1rem 0', // Add top/bottom padding for forms
        minHeight: 'calc(100vh - 80px - 60px)' // Account for header and footer height
      }}>
        {renderView()}
      </main>
      
      
    </div>
  );
}