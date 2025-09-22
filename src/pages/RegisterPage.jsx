import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './pages.css';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Usamos la función login para simular el registro
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos a una API de registro.
    // Por ahora, simulamos un registro exitoso y logueamos al usuario.
    const userData = {
      firstName,
      lastName,
      email,
      password,
    };
    console.log('Datos de registro:', userData);
    
    // Una vez que el registro es exitoso, logueamos al usuario
    // Nota: En una aplicación real, aquí harías una llamada a la API
    // y luego, si la respuesta es exitosa, llamarías a `login`.
    login({ name: `${firstName} ${lastName}`, email });
    
    navigate('/'); // Redirige a la página de inicio
  };

  return (
    <div className="page-container flex-center">
      <div className="form-card">
        <h1 className="form-title">Crear una cuenta</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="firstName">Nombre</label>
            <input
              type="text"
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Tu nombre"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="lastName">Apellido</label>
            <input
              type="text"
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Tu apellido"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Tu email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-form">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;