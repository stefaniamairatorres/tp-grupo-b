import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css'; 

// CRÍTICO: Reemplaza ESTE PLACEHOLDER por la URL REAL de tu servicio de Render
const RENDER_BACKEND_URL = "https://tp-back-final.onrender.com"; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isClicked, setIsClicked] = useState(false); 

  const handleAddToCart = () => {
    addToCart(product);
    setIsClicked(true); 
    setTimeout(() => setIsClicked(false), 300);
  };

  // 1. Aseguramos que el precio sea numérico antes de usar toFixed()
  const displayPrice = (Number(product?.price) || 0).toFixed(2);
  
  // 2. Construimos la URL completa para la imagen
  const imageUrl = `${RENDER_BACKEND_URL}${product.image}`;

  return (
    <div className="product-card">
      
      <div className="image-overlay-container">
        {/* FIX DE IMAGEN: Usar la URL absoluta de Render */}
        <img 
          src={imageUrl} 
          alt={product.name} 
          className="product-image" 
          // Opcional: Manejo de errores si la imagen no carga
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/e0e0e0/555555?text=No+Image" }}
        />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description-visible">{product.description}</p>

        {/* FIX DE PRECIO: Usar la variable segura displayPrice */}
        <p className="product-price">
          ${displayPrice}
        </p>
        
        <button 
          className={`add-to-cart-btn ${isClicked ? 'clicked' : ''}`} 
          onClick={handleAddToCart}
          disabled={isClicked}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;