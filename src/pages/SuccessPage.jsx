import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="success-container">
            <h1>¡Pago Exitoso!</h1>
            <p>Gracias por tu compra. Tu pago se procesó correctamente.</p>

            <button className="home-btn" onClick={handleGoHome}>
                Volver al inicio
            </button>
        </div>
    );
};

export default SuccessPage;
