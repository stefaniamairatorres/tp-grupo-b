import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import './pages.css';

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        setError('No se pudieron cargar los productos de esta categoría.');
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchProducts();
    } else {
      // Si la URL no tiene un nombre de categoría, muestra un mensaje de error.
      setError('Categoría no encontrada. Por favor, regrese a la página principal.');
      setLoading(false);
    }
  }, [categoryName]);

  if (loading) {
    return <div className="page-container text-center"><p>Cargando productos...</p></div>;
  }

  if (error) {
    return <div className="page-container text-center"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>{categoryName.toUpperCase()}</h1>
      <p style={{ textAlign: 'center', color: '#ccc' }}>Encuentra los mejores productos de {categoryName}</p>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;