import { useState, useEffect } from 'react';
import './Header.css';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div className="logo">
          <span className="logo-icon">🏝️</span>
          <span className="logo-text">Trip Cartagena Tours</span>
        </div>

        <nav className={`nav ${isMenuOpen ? 'open' : ''}`}>
          <a href="#inicio" onClick={() => scrollToSection('inicio')}>Inicio</a>
          <a href="#paquetes" onClick={() => scrollToSection('paquetes')}>Paquetes</a>
          <a href="#resenas" onClick={() => scrollToSection('resenas')}>Reseñas</a>
          <a href="#contacto" onClick={() => scrollToSection('contacto')}>Contacto</a>
        </nav>

        <a
          href="https://wa.me/573006024770?text=Hola,%20estoy%20interesado%20en%20sus%20paquetes%20turísticos"
          className="btn-reservar"
          target="_blank"
          rel="noopener noreferrer"
        >
          Reservar Ahora
        </a>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  );
}

export default Header;
