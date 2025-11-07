import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css'; 

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
        // !!! CAMBIO CRÍTICO 1: USAR TU PROPIA API DE EXPRESS !!!
        const response = await axios.get(`/api/products/${id}`);
        
        setProduct(response.data);
      } catch (err) {
        // Si el backend responde con 404 (Producto no encontrado), el error se maneja aquí.
        setError('No se pudo cargar el producto. Asegúrate de que el ID es correcto.');
        console.error('Error fetching product from Express API:', err);
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
          {/* CAMBIO 2: Usar product.name en lugar de product.title */}
          <img src={product.image} alt={product.name} className="product-detail-image" />
        </div>
        <div className="product-info-container">
          {/* CAMBIO 2: Usar product.name en lugar de product.title */}
          <h1 className="product-detail-title">{product.name}</h1>
          <p className="product-detail-price">${product.price.toFixed(2)}</p>
          {/* La descripción ya estaba correcta */}
          <p className="product-detail-description">{product.description}</p>
          
          {/* CAMBIO 3: La categoría es un objeto (gracias a populate), accedemos al nombre */}
          <p className="product-detail-category">Categoría: {product.category ? product.category.name : 'N/A'}</p> 
          
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