import React from "react";
import { useCart } from "../context/CartContext";

const API_URL = import.meta.env.VITE_API_URL;
const DEFAULT_IMAGE = "/uploads/default.jpg";

const getImageUrl = (path) => {
  if (!path) return `${API_URL}${DEFAULT_IMAGE}`;

  // Si ya es un link completo (CDN, Shopify, etc.)
  if (path.startsWith("http")) return path;

  // Si es un archivo local del backend
  return `${API_URL}/${path.replace(/^\/+/, "")}`;
};

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="product-card">
      <div className="product-image-container">
        <img
          src={getImageUrl(product.image)}  // 👈 IMAGEN CORREGIDA
          alt={product.name}
          className="product-image"
          onError={(e) => {
            e.target.src = `${API_URL}${DEFAULT_IMAGE}`;
          }}
        />
      </div>

      <h3 className="product-title">{product.name}</h3>
      <p className="product-price">${product.price}</p>

      <button
        className="btn-add-cart"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default ProductCard;
