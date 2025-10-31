import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext'; // Importamos el hook que creaste
import './pages.css';

const PurchaseHistoryPage = () => {
    // Usamos tu hook: obtenemos el usuario logueado
    const { user, isLoggedIn } = useAuth(); 
    
    const [history, setHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 1. Verificación inicial: Si no está logueado, detenemos la carga.
        if (!isLoggedIn || !user || !user._id) {
            setLoading(false);
            // Mostrar un error más específico si quieres (aunque la ruta debería estar protegida)
            setError("Debes iniciar sesión para ver tu historial de compras.");
            return;
        }

        const fetchHistory = async () => {
            try {
                // *** CONSULTA AL BACKEND: Busca órdenes por el ID del usuario ***
                // Asume que tu backend tiene una ruta para esto y que el ID del usuario está en user._id
                const response = await axios.get(`http://localhost:5000/api/orders/user/${user._id}`); 
                
                setHistory(response.data);
            } catch (err) {
                // Manejo de errores de la API
                setError('No se pudo cargar el historial. Revisa si el servidor Express está corriendo.');
                console.error('Error fetching purchase history:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    // Dependencias: Se vuelve a ejecutar si el usuario cambia (ej. si se loguea/desloguea)
    }, [user, isLoggedIn]); 

    // --- Lógica de Renderizado ---
    if (loading) {
        return <div className="page-container text-center"><p>Cargando tu historial de compras...</p></div>;
    }

    if (error) {
         // Muestra el error si no está logueado o si falla la API
        return <div className="page-container text-center"><p className="error-message">{error}</p></div>;
    }
    
    // Si la carga fue exitosa pero no hay historial
    if (history.length === 0) {
        return (
            <div className="page-container">
                <h1 style={{ textAlign: 'center' }}>Historial de Compras</h1>
                <p style={{ textAlign: 'center', marginTop: '20px' }}>No has realizado ninguna compra todavía. ¡Empieza a comprar!</p>
            </div>
        );
    }

    // Mostrar el historial
    return (
        <div className="page-container">
            <h1 style={{ textAlign: 'center' }}>Historial de Compras</h1>
            
            <div className="history-list">
                {history.map(order => (
                    <div key={order._id} className="order-item" style={orderItemStyle}>
                        <p><strong>Número de Orden:</strong> {order._id}</p>
                        {/* Se asume que tu orden tiene una fecha de creación */}
                        <p><strong>Fecha:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                        {/* Se asume que tu orden tiene el monto total */}
                        <p><strong>Total:</strong> **${order.totalAmount ? order.totalAmount.toFixed(2) : 'N/A'}**</p>
                        
                        {/* Botón para ver los detalles de los productos en esa orden */}
                        <button 
                            style={detailButtonStyle} 
                            onClick={() => console.log('Navegar a /order/:id para ver los detalles completos', order._id)}
                        >
                            Ver Detalles
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PurchaseHistoryPage;

// Estilos de ejemplo para la tabla/lista de historial
const orderItemStyle = {
    border: '1px solid #444',
    padding: '15px',
    margin: '10px auto',
    borderRadius: '8px',
    backgroundColor: '#1e1e1e', // Fondo oscuro para coincidir con la captura
    color: '#ddd',
    maxWidth: '600px'
};

const detailButtonStyle = {
    padding: '5px 10px',
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
};