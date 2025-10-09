import './Hero.css';

function Hero() {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="inicio" className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">Descubre el Paraíso del Caribe Colombiano</h1>
        <p className="hero-subtitle">
          Vive experiencias inolvidables en las islas más hermosas de Cartagena.
          Cholón, Islas del Rosario, Barú y mucho más te esperan.
        </p>
        <div className="hero-cta">
          <button
            className="btn-primary"
            onClick={() => scrollToSection('paquetes')}
          >
            Ver Paquetes
          </button>
          <a
            href="https://wa.me/573006024770?text=Hola,%20estoy%20interesado%20en%20sus%20paquetes%20turísticos"
            className="btn-secondary"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="whatsapp-icon">📱</span>
            Contactar por WhatsApp
          </a>
        </div>
      </div>
      <div className="hero-scroll">
        <span>Desliza para descubrir</span>
        <div className="scroll-indicator"></div>
      </div>
    </section>
  );
}

export default Hero;
