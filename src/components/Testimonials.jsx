import { useState, useEffect, useRef } from 'react';
import { testimonials } from '../data/packages';
import './Testimonials.css';

function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => (
      <span key={i} className="star">★</span>
    ));
  };

  return (
    <section id="resenas" className="testimonials" ref={sectionRef}>
      <div className="testimonials-container">
        <div className="section-header">
          <h2 className="section-title">Lo Que Dicen Nuestros Viajeros</h2>
          <p className="section-subtitle">
            Miles de turistas felices han vivido experiencias inolvidables con nosotros
          </p>
        </div>

        <div className={`testimonials-grid ${isVisible ? 'visible' : ''}`}>
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="testimonial-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="quote-icon">"</div>

              <div className="testimonial-rating">
                {renderStars(testimonial.rating)}
              </div>

              <p className="testimonial-comment">{testimonial.comment}</p>

              <div className="testimonial-author">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="author-image"
                  loading="lazy"
                />
                <div className="author-info">
                  <h4 className="author-name">{testimonial.name}</h4>
                  <p className="author-label">Cliente Verificado</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="testimonials-stats">
          <div className="stat-item">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Viajeros Felices</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">4.9/5</div>
            <div className="stat-label">Calificación Promedio</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">8+</div>
            <div className="stat-label">Años de Experiencia</div>
          </div>
          <div className="stat-item">
            <div className="stat-number">15+</div>
            <div className="stat-label">Destinos Disponibles</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
