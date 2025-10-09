import { useParams, useNavigate } from 'react-router-dom';
import { packages } from '../data/packages';
import './PackageDetails.css';

function PackageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const pkg = packages.find(p => p.id === parseInt(id));

  if (!pkg) {
    return (
      <div className="package-detail-error">
        <h2>Paquete no encontrado</h2>
        <button onClick={() => navigate('/paquetes')}>Volver a paquetes</button>
      </div>
    );
  }

  const handleReserve = () => {
    const message = `Hola, estoy interesado en el paquete: ${pkg.name}`;
    window.open(
      `https://wa.me/573006024770?text=${encodeURIComponent(message)}`,
      '_blank'
    );
  };

  return (
    <div className="package-detail">
      <button className="btn-back" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="detail-container">
        <div className="detail-image-section">
          <img src={pkg.image} alt={pkg.name} className="detail-main-image" />
        </div>

        <div className="detail-content-section">
          <h1 className="detail-title">{pkg.name}</h1>
          <p className="detail-description">{pkg.description}</p>

          <div className="detail-price-section">
            <span className="detail-price-label">Precio desde</span>
            <div className="detail-price-amount">
              ${pkg.price} <span className="detail-price-currency">COP</span>
            </div>
          </div>

          {pkg.includes && pkg.includes.length > 0 && (
            <div className="detail-includes">
              <h3 className="detail-section-title">¿Qué incluye?</h3>
              <ul className="detail-includes-list">
                {pkg.includes.map((item, idx) => (
                  <li key={idx}>
                    <span className="check-icon">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pkg.itinerary && (
            <div className="detail-itinerary">
              <h3 className="detail-section-title">Itinerario</h3>
              <div className="itinerary-content">{pkg.itinerary}</div>
            </div>
          )}

          {pkg.duration && (
            <div className="detail-info">
              <h3 className="detail-section-title">Duración</h3>
              <p>{pkg.duration}</p>
            </div>
          )}

          <button className="btn-reserve-detail" onClick={handleReserve}>
            Reservar ahora
          </button>
        </div>
      </div>
    </div>
  );
}

export default PackageDetail;