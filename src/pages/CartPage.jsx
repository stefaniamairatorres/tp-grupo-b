import React from 'react';
import axios from 'axios'; 
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; 
import './CartPage.css';

// URL base de tu backend corregida para producción. 
// Usamos solo /api, Netlify redirigirá esto a tu backend de Render.
const API_BASE_URL = '/api'; 

const CartPage = () => {
    const { cartItems, removeFromCart, getTotalPrice, clearCart } = useCart();
    const { isLoggedIn, user } = useAuth(); // Obtener estado de autenticación y datos del usuario

    // Función que se encarga de iniciar el proceso de pago con Mercado Pago
    const handleCheckout = async () => {
        // Validación básica
        if (cartItems.length === 0) {
            // Reemplazar alert() con un mensaje o modal, ya que alert está prohibido en este entorno.
            console.log('El carrito está vacío. Agrega productos para pagar.');
            return;
        }

        if (!isLoggedIn) {
            console.warn("Usuario no logueado. Redirigiendo a login o mostrando modal.");
            // Reemplazar alert() con un mensaje o modal.
            console.log('Debes iniciar sesión para proceder al pago.'); 
            return;
        }

        try {
            // 1. Llamada a tu ruta del backend para crear la preferencia de pago
            // La URL ahora se resuelve como /api/payment/create-preference
            const response = await axios.post(`${API_BASE_URL}/payment/create-preference`, {
                items: cartItems,
                userId: user._id, // Enviar el ID del usuario para referencia
            });
            
            // 2. Mercado Pago devuelve el init_point (el link de pago)
            const { init_point } = response.data;
            
            if (init_point) {
                // 3. Redirigir al usuario a la página de pago segura de Mercado Pago
                window.location.href = init_point;
                // Opcionalmente, podrías llamar a clearCart() aquí, o en la página /success
            } else {
                console.error('No se pudo obtener el enlace de pago. Intenta de nuevo.');
            }

        } catch (error) {
            console.error('Error al iniciar el checkout con Mercado Pago:', error);
            console.error('Error en la comunicación con la pasarela de pago. Consulta la consola.');
        }
    };

    return (
        <div className="page-container">
            <h1 className="cart-title">Carrito de Compras</h1>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Tu carrito está vacío.</p>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        {cartItems.map((item) => (
                            <div key={item._id} className="cart-item-card"> 
                                <img 
                                    src={item.image} 
                                    alt={item.name} 
                                    className="cart-item-image" 
                                />
                                <div className="cart-item-info">
                                    <h3>{item.name}</h3> 
                                    <p>Precio: ${item.price.toFixed(2)}</p>
                                    <p>Cantidad: {item.quantity}</p>
                                </div>
                                <button 
                                    className="remove-btn" 
                                    onClick={() => removeFromCart(item._id)} 
                                >
                                    Eliminar
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="cart-summary">
                        <h2>Resumen del Carrito</h2>
                        <p className="summary-total">Total: ${getTotalPrice().toFixed(2)}</p>
                        
                        {/* 🚨 Conectar la función de pago al botón */}
                        <button className="checkout-btn" onClick={handleCheckout}>
                            Proceder al pago
                        </button>

                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;