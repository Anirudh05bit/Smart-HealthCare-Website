import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&h=600&fit=crop',
      title: 'Expert Medical Care',
      description: 'Our experienced team of doctors is here for you 24/7'
    },
    {
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&h=600&fit=crop',
      title: 'Advanced Technology',
      description: 'State-of-the-art medical equipment for accurate diagnosis'
    },
    {
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&h=600&fit=crop',
      title: 'Compassionate Care',
      description: 'Your health and comfort are our top priorities'
    },
    {
      image: 'https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=1200&h=600&fit=crop',
      title: 'Specialized Services',
      description: 'Comprehensive healthcare solutions for all your needs'
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index) => setCurrentSlide(index);

  return (
    <div className="home min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900">
      <style>{`
        .gradient-text {
          background: linear-gradient(45deg, #60a5fa, #a78bfa, #c084fc);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradientShift 3s ease infinite;
        }
        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>

      {/* Navbar (no shimmer animation now) */}
      <nav className="flex justify-between items-center px-10 py-5 bg-slate-900/70 shadow-lg shadow-black/40">
        <div className="text-3xl font-bold gradient-text hover:scale-105 transition-transform cursor-pointer">
          Smart Healthcare Management System (SHMS)
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-5 py-16 text-center">
        <h2 className="text-5xl font-bold text-white mb-4">
          Smart Healthcare Management System (SHMS)
        </h2>
        <p className="text-xl text-indigo-200 mb-12">
          A secure, role-based healthcare management platform for Patients, Doctors, and Administrators.
        </p>

        {/* Buttons */}
        <div className="buttons flex justify-center gap-6 mb-12">
          <Link to="/patients">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              Patient Portal
            </button>
          </Link>
          <Link to="/doctors">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              Doctor Portal
            </button>
          </Link>
          <Link to="/admin">
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300">
              Admin Dashboard
            </button>
          </Link>
        </div>
      </div>

      {/* Smaller Slider */}
      <div className="max-w-3xl mx-auto px-5 pb-16">
        <div className="relative bg-slate-900/60 backdrop-blur-xl border border-purple-600/20 rounded-3xl p-6 shadow-2xl shadow-black/40">
          {/* Slider */}
          <div className="relative overflow-hidden rounded-2xl h-[180px]">
            <div 
              className="flex h-full transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="min-w-full h-full relative">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover rounded-2xl brightness-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent rounded-2xl" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-lg font-bold text-white">{slide.title}</h2>
                    <p className="text-sm text-white/90">{slide.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-3 mt-4">
            <button
              onClick={prevSlide}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              ← Prev
            </button>
            <button
              onClick={nextSlide}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              Next →
            </button>
          </div>

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide 
                    ? 'w-6 bg-gradient-to-r from-blue-500 to-purple-600' 
                    : 'w-2 bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
