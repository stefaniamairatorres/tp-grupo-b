import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css'; // Lo crearemos a continuación

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <Link to={`/products/${product.id}`}>
        <img src={product.image} alt={product.title} className="product-image" />
      </Link>
      <div className="product-info">
        <h3 className="product-title">{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
          Añadir al carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;