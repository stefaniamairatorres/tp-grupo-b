import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import './CartPage.css';

// Stripe
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const CartPage = () => {
    const { cartItems, removeFromCart, getTotalPrice } = useCart();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const total = getTotalPrice();

    const handleGoLogin = () => {
        navigate('/login');
    };

    return (
        <div className="page-container">
            <h1 className="cart-title">Carrito de Compras</h1>

            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Tu carrito está vacío.</p>
            ) : (
                <div className="cart-content">
                    
                    {/* LISTA DE PRODUCTOS */}
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

                    {/* RESUMEN */}
                    <div className="cart-summary">
                        <h2>Resumen del Carrito</h2>
                        <p className="summary-total">
                            Total: <strong>${total.toFixed(2)}</strong>
                        </p>

                        {/* 🔐 Verificación de login */}
                        {!isLoggedIn ? (
                            <button className="checkout-btn" onClick={handleGoLogin}>
                                Iniciar sesión para pagar
                            </button>
                        ) : (
                            // 🔥 STRIPE CHECKOUT
                            <Elements stripe={stripePromise}>
                                <CheckoutForm cart={cartItems} />
                            </Elements>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
