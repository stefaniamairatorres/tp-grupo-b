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
        // CORRECCIÓN CLAVE: Usamos la ruta relativa. Netlify redirigirá '/api/products'
        // a https://tp-back-final.onrender.com/api/products
        const response = await axios.get('/api/products');
        
        setProducts(response.data);
      } catch (err) {
        // Mensaje genérico de fallo de conexión
        setError('No se pudieron cargar los productos. Asegúrate de que tu servidor Express esté corriendo.');
        console.error('Error fetching products from Express API:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return <div className="page-container text-center"><p>Cargando productos de tu base de datos...</p></div>;
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
          <ProductCard key={product._id} product={product} /> 
        ))}
      </div>
    </div>
  );
};

export default ProductPage;