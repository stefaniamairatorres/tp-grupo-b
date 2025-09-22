import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './pages.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (err) {
        setError('No se pudieron cargar los productos. Por favor, inténtalo de nuevo más tarde.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="page-container text-center"><p>Cargando productos...</p></div>;
  }

  if (error) {
    return <div className="page-container text-center"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>Todos los productos</h1>
      <p style={{ textAlign: 'center', color: '#ccc' }}>Encuentra lo que buscas en nuestra tienda</p>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductPage;