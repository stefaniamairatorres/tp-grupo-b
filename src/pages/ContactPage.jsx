import React, { useState } from 'react';
import './pages.css';
import './ContactPage.css'; // Crearemos este archivo de estilos a continuación

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    alert('¡Mensaje enviado con éxito!');
    // Aquí iría la lógica para enviar los datos a una API
    setFormData({
      name: '',
      email: '',
      message: '',
    });
  };

  return (
    <div className="page-container flex-center">
      <div className="form-card">
        <h1 className="form-title">Contáctanos</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Tu email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Mensaje</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Escribe tu mensaje aquí..."
              rows="5"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-form">
            Enviar Mensaje
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;