import { useState, useEffect, useRef } from 'react';
import { packages } from '../data/packages';
import './Packages.css';

function Packages() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = entry.target.dataset.index;
            setVisibleCards((prev) => [...new Set([...prev, parseInt(index)])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const handleReserve = (packageName) => {
    const message = `Hola, estoy interesado en el paquete: ${packageName}`;
    window.open(
      `https://wa.me/573001234567?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <section id="paquetes" className="packages">
      <div className="packages-container">
        <div className="section-header">
          <h2 className="section-title">Nuestros Paquetes de Viaje</h2>
          <p className="section-subtitle">
            Explora las mejores experiencias turísticas del Caribe colombiano
          </p>
        </div>

        <div className="packages-grid">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              ref={(el) => (cardsRef.current[index] = el)}
              data-index={index}
              className={`package-card ${visibleCards.includes(index) ? 'visible' : ''}`}
            >
              <div className="package-image">
                <img src={pkg.image} alt={pkg.name} loading="lazy" />
                <div className="package-badge">
                  <span className="badge-icon">⭐</span>
                  Popular
                </div>
              </div>

              <div className="package-content">
                <h3 className="package-name">{pkg.name}</h3>
                <p className="package-description">{pkg.description}</p>

                <ul className="package-includes">
                  {pkg.includes.map((item, idx) => (
                    <li key={idx}>
                      <span className="check-icon">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>

                <div className="package-footer">
                  <div className="package-price">
                    <span className="price-label">Desde</span>
                    <span className="price-amount">${pkg.price}</span>
                    <span className="price-currency">COP</span>
                  </div>
                  <button
                    className="btn-reserve"
                    onClick={() => handleReserve(pkg.name)}
                  >
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Packages;
