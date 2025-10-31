

import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css'; 

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      
      {/* 📸 Contenedor de la imagen */}
      <div className="image-overlay-container">
        <img src={product.image} alt={product.name} className="product-image" />
        
       
        
      </div>
      
      {/* ℹ️ Bloque principal de información */}
      <div className="product-info">
        
        <h3 className="product-title">{product.name}</h3>
        
        {/* ✅ ÚNICA DESCRIPCIÓN VISIBLE ✅ 
           Esta ya está centrada y prolija con la clase  */}
        <p className="product-description-visible">{product.description}</p> 
        
        <p className="product-price">${product.price.toFixed(2)}</p>
        
        <button 
          className="add-to-cart-btn" 
          onClick={() => addToCart(product)}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;