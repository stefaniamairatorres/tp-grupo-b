import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css'; // Crearemos este archivo a continuación

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
        setProduct(response.data);
      } catch (err) {
        setError('No se pudo cargar el producto. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="page-container text-center"><p>Cargando producto...</p></div>;
  }

  if (error) {
    return <div className="page-container text-center"><p className="error-message">{error}</p></div>;
  }

  if (!product) {
    return <div className="page-container text-center"><p>Producto no encontrado.</p></div>;
  }

  return (
    <div className="page-container">
      <div className="product-detail-card">
        <div className="product-image-container">
          <img src={product.image} alt={product.title} className="product-detail-image" />
        </div>
        <div className="product-info-container">
          <h1 className="product-detail-title">{product.title}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          <p className="product-detail-description">{product.description}</p>
          <p className="product-detail-category">Categoría: {product.category}</p>
          <div className="product-detail-actions">
            <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
              Añadir al Carrito
            </button>
            <button className="back-btn" onClick={() => navigate(-1)}>
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;