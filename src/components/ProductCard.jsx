
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  // Nuevo estado para controlar si el botón ha sido pulsado
  const [isClicked, setIsClicked] = useState(false); 

  const handleAddToCart = () => {
    // 1. Ejecutar la lógica real del carrito
    addToCart(product);

    // 2. Iniciar el feedback visual
    setIsClicked(true); 

    // 3. Desactivar el feedback después de 300ms (un "parpadeo" rápido)
    setTimeout(() => {
      setIsClicked(false);
    }, 300); 
  };

  return (
    <div className="product-card">
      
      {/* 📸 Contenedor de la imagen */}
      <div className="image-overlay-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      
      {/* ℹ️ Bloque principal de información */}
      <div className="product-info">
        
        <h3 className="product-title">{product.name}</h3>
        
        <p className="product-description-visible">{product.description}</p> 
        
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        <button 
          // Aplicar la clase 'clicked' si isClicked es verdadero
          className={`add-to-cart-btn ${isClicked ? 'clicked' : ''}`} 
          onClick={handleAddToCart} // Usar la nueva función con feedback
          disabled={isClicked} // Opcional: Desactivar mientras pulsa para evitar clics dobles rápidos
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;