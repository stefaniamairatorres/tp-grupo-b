import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext.jsx'; 
import './pages.css';

const RegisterPage = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    
    const { login } = useAuth(); 
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        
        const userData = {
            nombre: `${firstName} ${lastName}`, 
            email,
            password,
        };

        try {
            // CORRECCIÓN CLAVE: Usamos la ruta relativa. Netlify redirigirá esto a Render.
            const response = await axios.post('/api/users/register', userData);
            
            // El backend devuelve el objeto user {_id, nombre, email}
            const user = response.data;

            // 1. Inicia sesión automáticamente usando el contexto
            login(user); 
            
            // 2. Redirige a la página principal
            navigate('/'); 

        } catch (err) {
            const errorMessage = err.response && err.response.data.message 
                               ? err.response.data.message 
                               : 'Error. No se pudo completar el registro. Verifica el servidor.';
            setError(errorMessage);
        }
    };

    return (
        <div className="page-container flex-center">
            <div className="form-card">
                <h1 className="form-title">Crear una cuenta</h1>
                
                {error && <div className="error-message">{error}</div>}
                
                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Nombre(s)"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Apellido(s)"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Correo electrónico"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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