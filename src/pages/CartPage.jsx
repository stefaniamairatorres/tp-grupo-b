import React from 'react';
import { useCart } from '../context/CartContext';
import './CartPage.css'; // Lo crearemos a continuación

const CartPage = () => {
  const { cartItems, removeFromCart, getTotalPrice } = useCart();

  return (
    <div className="page-container">
      <h1 className="cart-title">Carrito de Compras</h1>
      {cartItems.length === 0 ? (
        <p className="empty-cart-message">Tu carrito está vacío.</p>
      ) : (
        <div className="cart-content">
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item-card">
                <img src={item.image} alt={item.title} className="cart-item-image" />
                <div className="cart-item-info">
                  <h3>{item.title}</h3>
                  <p>Precio: ${item.price.toFixed(2)}</p>
                  <p>Cantidad: {item.quantity}</p>
                </div>
                <button className="remove-btn" onClick={() => removeFromCart(item.id)}>
                  Eliminar
                </button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Resumen del Carrito</h2>
            <p className="summary-total">Total: ${getTotalPrice().toFixed(2)}</p>
            <button className="checkout-btn">Proceder al pago</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;