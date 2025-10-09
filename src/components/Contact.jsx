import { useState } from 'react';
import { packages } from '../data/packages';
import './Contact.css';

function Contact() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    paquete: '',
    mensaje: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    } else if (!/^\d{10}$/.test(formData.telefono.replace(/\s/g, ''))) {
      newErrors.telefono = 'El teléfono debe tener 10 dígitos';
    }

    if (!formData.paquete) {
      newErrors.paquete = 'Selecciona un paquete de interés';
    }

    if (!formData.mensaje.trim()) {
      newErrors.mensaje = 'El mensaje es requerido';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      setSubmitMessage('');

      setTimeout(() => {
        const message = `Hola, soy ${formData.nombre}.\nEstoy interesado en: ${formData.paquete}.\n\nMensaje: ${formData.mensaje}\n\nContacto:\nEmail: ${formData.email}\nTeléfono: ${formData.telefono}`;
        window.open(
          `https://wa.me/573001234567?text=${encodeURIComponent(message)}`,
          '_blank'
        );

        setFormData({
          nombre: '',
          email: '',
          telefono: '',
          paquete: '',
          mensaje: ''
        });
        setIsSubmitting(false);
        setSubmitMessage('¡Gracias! Te redirigimos a WhatsApp para completar tu consulta.');
      }, 1000);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <section id="contacto" className="contact">
      <div className="contact-container">
        <div className="section-header">
          <h2 className="section-title">Contáctanos</h2>
          <p className="section-subtitle">
            Estamos aquí para ayudarte a planificar tu viaje perfecto
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon location">📍</div>
              <h3>Ubicación</h3>
              <p>Centro Histórico, Cartagena</p>
              <p>Calle de la Factoria #36-77</p>
            </div>

            <div className="info-card">
              <div className="info-icon phone">📞</div>
              <h3>Teléfono / WhatsApp</h3>
              <a href="tel:+573001234567">+57 300 123 4567</a>
              <a
                href="https://wa.me/573001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-link"
              >
                Chatea con nosotros
              </a>
            </div>

            <div className="info-card">
              <div className="info-icon email">📧</div>
              <h3>Email</h3>
              <a href="mailto:info@caribetours.com">info@caribetours.com</a>
              <a href="mailto:reservas@caribetours.com">reservas@caribetours.com</a>
            </div>

            <div className="info-card">
              <div className="info-icon clock">🕐</div>
              <h3>Horario de Atención</h3>
              <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
              <p>Sábados y Domingos: 9:00 AM - 5:00 PM</p>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="nombre">Nombre Completo *</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className={errors.nombre ? 'error' : ''}
                placeholder="Tu nombre completo"
              />
              {errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="email">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="tu@email.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="telefono">Teléfono *</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className={errors.telefono ? 'error' : ''}
                placeholder="3001234567"
              />
              {errors.telefono && <span className="error-message">{errors.telefono}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="paquete">Paquete de Interés *</label>
              <select
                id="paquete"
                name="paquete"
                value={formData.paquete}
                onChange={handleChange}
                className={errors.paquete ? 'error' : ''}
              >
                <option value="">Selecciona un paquete</option>
                {packages.map(pkg => (
                  <option key={pkg.id} value={pkg.name}>
                    {pkg.name}
                  </option>
                ))}
              </select>
              {errors.paquete && <span className="error-message">{errors.paquete}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="mensaje">Mensaje *</label>
              <textarea
                id="mensaje"
                name="mensaje"
                value={formData.mensaje}
                onChange={handleChange}
                className={errors.mensaje ? 'error' : ''}
                placeholder="Cuéntanos sobre tu viaje ideal..."
                rows="5"
              ></textarea>
              {errors.mensaje && <span className="error-message">{errors.mensaje}</span>}
            </div>

            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Consulta'}
            </button>

            {submitMessage && (
              <div className="success-message">{submitMessage}</div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
