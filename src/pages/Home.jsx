import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Clock, Award, ChevronRight, Star } from 'lucide-react';
import './Home.css';
import WebBackground from '../components/WebBackground';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const doctors = [
    {
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      experience: "15+ years",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop"
    },
    {
      name: "Dr. Michael Chen",
      specialty: "Neurologist",
      experience: "12+ years",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop"
    },
    {
      name: "Dr. Emily Rodriguez",
      specialty: "Pediatrician",
      experience: "10+ years",
      rating: 5.0,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop"
    },
    {
      name: "Dr. James Wilson",
      specialty: "Orthopedic Surgeon",
      experience: "18+ years",
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop"
    },
    {
      name: "Dr. Priya Patel",
      specialty: "Dermatologist",
      experience: "8+ years",
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % doctors.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % doctors.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + doctors.length) % doctors.length);
  };

  return (
    <div className="home-root">
      <header className="home-hero">
        <div className="hero-overlay" />
        <div className="hero-pattern" />
        <div className='hero-container'>
          <div className="hero-content">
            <h1 className="hero-title">Where expertise meets professionalism</h1>
            <p className="hero-sub">
              Modern, secure telehealth and in-person care. Book appointments, connect with top
              specialists, and manage patient records — all in one place.
            </p>

            <div className="hero-ctas">
              <Link to="/doctors" className="btn btn-primary">Find a Doctor</Link>
              <Link to="/patients" className="btn btn-ghost">For Patients</Link>
            </div>
          </div>
          <div className="hero-background">
          </div>
        </div>
      </header>
      
      <main className="home-main">
        {/* Enhanced About Section */}
        <section className="about-section" style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto',
          textAlign: 'center'
        }}>
          <div style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #ecfeff, #cffafe)',
            padding: '0.5rem 1.5rem',
            borderRadius: '25px',
            marginBottom: '1.5rem',
            border: '2px solid #a5f3fc',
            animation: 'fadeInDown 0.8s ease-out'
          }}>
            <span style={{ color: '#0891b2', fontWeight: '600', fontSize: '0.9rem' }}>
              ✨ Trusted by 10,000+ patients
            </span>
          </div>
          
          <h2 style={{
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            fontWeight: '700',
            background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem'
          }}>
            
          </h2>
          <p style={{
            fontSize: '1.15rem',
            color: '#155e75',
            maxWidth: '700px',
            margin: '0 auto 2.5rem',
            lineHeight: '1.8'
          }}>
          
          </p>
        </section>

        {/* Enhanced Gallery/Features Grid */}
        <section className="gallery" style={{
          padding: '3rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div className="gallery-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}>
            {[
              { icon: Heart, title: 'Consultations', desc: 'Expert medical advice from certified professionals' },
              { icon: Shield, title: 'Diagnostics', desc: 'State-of-the-art diagnostic facilities and equipment' },
              { icon: Clock, title: '24/7 Support', desc: 'Round-the-clock emergency care and assistance' }
            ].map((item, idx) => (
              <div key={idx} className="tile" style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '20px',
                border: '2px solid #cffafe',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                animation: `fadeInUp 0.8s ease-out ${0.2 + idx * 0.2}s both`
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(6, 182, 212, 0.2)';
                e.currentTarget.style.borderColor = '#a5f3fc';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = '#cffafe';
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                  borderRadius: '15px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.5rem',
                  boxShadow: '0 4px 15px rgba(6, 182, 212, 0.3)'
                }}>
                  <item.icon size={30} color="white" />
                </div>
                <h3 style={{
                  fontSize: '1.5rem',
                  color: '#0e7490',
                  marginBottom: '0.75rem',
                  fontWeight: '700'
                }}>
                  {item.title}
                </h3>
                <p style={{
                  color: '#155e75',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Doctor Slider Section */}
        <section style={{
          padding: '4rem 2rem',
          background: 'linear-gradient(to bottom, #f0fdfa, #ecfeff)',
          marginTop: '2rem'
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{
                fontSize: 'clamp(2rem, 4vw, 2.75rem)',
                fontWeight: '700',
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                marginBottom: '1rem'
              }}>
                Meet Our Expert Doctors
              </h2>
              <p style={{
                fontSize: '1.15rem',
                color: '#155e75',
                maxWidth: '600px',
                margin: '0 auto'
              }}>
                World-class medical professionals dedicated to your health and well-being
              </p>
            </div>

            {/* Slider */}
            <div style={{
              position: 'relative',
              maxWidth: '50vw',
              margin: '0 auto',
              overflow: 'hidden',
              borderRadius: '24px'
            }}>
              <div style={{
                display: 'flex',
                transform: `translateX(-${currentSlide * 100}%)`,
                transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
              }}>
                {doctors.map((doctor, idx) => (
                  <div key={idx} style={{
                    minWidth: '50vw',
                  }}>
                    <div style={{
                      background: 'white',
                      borderRadius: '20px',
                      overflow: 'hidden',
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                      gap: '2rem',
                      padding: '2rem',
                      border: '2px solid #cffafe',
                      boxShadow: '0 8px 30px rgba(6, 182, 212, 0.15)'
                    }}>
                      <div style={{
                        position: 'relative',
                        height: '350px',
                        borderRadius: '16px',
                        overflow: 'hidden',
                        background: 'linear-gradient(135deg, #ecfeff, #cffafe)'
                      }}>
                        <img
                          src={doctor.image}
                          alt={doctor.name}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover'
                          }}
                        />
                        <div style={{
                          position: 'absolute',
                          top: '1rem',
                          right: '1rem',
                          background: 'rgba(255, 255, 255, 0.95)',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          fontWeight: '600',
                          color: '#0891b2'
                        }}>
                          <Star size={16} fill="#fbbf24" color="#fbbf24" />
                          {doctor.rating}
                        </div>
                      </div>
                      
                      <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        padding: '1rem'
                      }}>
                        <div style={{
                          display: 'inline-block',
                          background: '#ecfeff',
                          color: '#06b6d4',
                          padding: '0.5rem 1rem',
                          borderRadius: '20px',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          marginBottom: '1rem',
                          width: 'fit-content',
                          border: '1px solid #a5f3fc'
                        }}>
                          {doctor.specialty}
                        </div>
                        
                        <h3 style={{
                          fontSize: '2rem',
                          color: '#0e7490',
                          marginBottom: '1rem',
                          fontWeight: '700'
                        }}>
                          {doctor.name}
                        </h3>
                        
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          marginBottom: '1.5rem',
                          color: '#155e75',
                          fontSize: '1rem'
                        }}>
                          <Award size={20} color="#06b6d4" />
                          <span style={{ fontWeight: '600' }}>{doctor.experience} Experience</span>
                        </div>
                        
                        <p style={{
                          color: '#155e75',
                          lineHeight: '1.7',
                          marginBottom: '2rem',
                          fontSize: '1rem'
                        }}>
                          Dedicated to providing exceptional patient care with a compassionate approach. 
                          Specialized in advanced treatment methods and preventive care strategies.
                        </p>
                        
                        <button style={{
                          padding: '1rem 2rem',
                          background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                          color: 'white',
                          border: 'none',
                          borderRadius: '12px',
                          fontWeight: '600',
                          fontSize: '1rem',
                          cursor: 'pointer',
                          boxShadow: '0 4px 12px rgba(6, 182, 212, 0.3)',
                          transition: 'all 0.3s ease',
                          width: '100%'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'translateY(-2px)';
                          e.target.style.boxShadow = '0 6px 18px rgba(6, 182, 212, 0.4)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'translateY(0)';
                          e.target.style.boxShadow = '0 4px 12px rgba(6, 182, 212, 0.3)';
                        }}>
                          Book Appointment
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              <button onClick={prevSlide} style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid #cffafe',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.2)',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#06b6d4';
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.95)';
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.style.color = '#06b6d4';
              }}>
                <ChevronRight size={100} color="#06b6d4" style={{ transform: 'rotate(180deg)', transition: 'color 0.3s ease' }} />
              </button>

              <button onClick={nextSlide} style={{
                position: 'absolute',
                right: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '70px',
                height: '70px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '2px solid #cffafe',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(6, 182, 212, 0.2)',
                zIndex: 10
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#06b6d4';
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.95)';
                const svg = e.currentTarget.querySelector('svg');
                if (svg) svg.style.color = '#06b6d4';
              }}>
                <ChevronRight size={100} color="#06b6d4" style={{ transition: 'color 0.3s ease' }} />
              </button>

              {/* Dots Indicator */}
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '0.75rem',
                marginTop: '2rem'
              }}>
                {doctors.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    style={{
                      width: currentSlide === idx ? '2.5rem' : '0.75rem',
                      height: '0.75rem',
                      borderRadius: '10px',
                      border: 'none',
                      background: currentSlide === idx 
                        ? 'linear-gradient(135deg, #06b6d4, #0891b2)' 
                        : '#cffafe',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section style={{
          padding: '4rem 2rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            background: 'white',
            borderRadius: '24px',
            padding: '3rem 2rem',
            border: '2px solid #cffafe',
            boxShadow: '0 8px 30px rgba(6, 182, 212, 0.15)'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem',
              textAlign: 'center'
            }}>
              {[
                { value: '10,000+', label: 'Happy Patients' },
                { value: '50+', label: 'Expert Doctors' },
                { value: '24/7', label: 'Support Available' },
                { value: '99%', label: 'Satisfaction Rate' }
              ].map((stat, idx) => (
                <div key={idx}>
                  <div style={{
                    fontSize: '3rem',
                    fontWeight: '800',
                    background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                    WebkitBackgroundClip: 'text',
                    backgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    marginBottom: '0.5rem'
                  }}>
                    {stat.value}
                  </div>
                  <div style={{
                    color: '#0891b2',
                    fontSize: '1rem',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em'
                  }}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <div className="footer-inner">
          <p>© {new Date().getFullYear()} Smart HealthCare. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}