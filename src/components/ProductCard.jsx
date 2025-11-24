import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const [isClicked, setIsClicked] = useState(false); 

  const handleAddToCart = () => {
    addToCart(product);
    setIsClicked(true); 
    setTimeout(() => setIsClicked(false), 300);
  };

  return (
    <div className="product-card">
      
      <div className="image-overlay-container">
        <img src={product.image} alt={product.name} className="product-image" />
      </div>
      
      <div className="product-info">
        <h3 className="product-title">{product.name}</h3>
        <p className="product-description-visible">{product.description}</p>

        {/* FIX: Convertir precio a número */}
        <p className="product-price">
          ${Number(product?.price ?? 0).toFixed(2)}
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
