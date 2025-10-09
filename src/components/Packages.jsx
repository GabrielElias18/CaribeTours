import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { packages } from '../data/packages';
import './Packages.css';

function Packages() {
  const [visibleCards, setVisibleCards] = useState([]);
  const cardsRef = useRef([]);
  const navigate = useNavigate();

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
      `https://wa.me/573006024770?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  const handleViewDetails = (packageId) => {
    navigate(`/paquete/${packageId}`);
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
              onClick={() => handleViewDetails(pkg.id)}
              style={{ cursor: 'pointer' }}
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

                <div className="package-footer">
                  <div className="package-price">
                    <span className="price-label">Desde</span>
                    <span className="price-amount">${pkg.price}</span>
                    <span className="price-currency">COP</span>
                  </div>
                  <button
                    className="btn-reserve"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReserve(pkg.name);
                    }}
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