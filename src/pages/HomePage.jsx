import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './pages.css';
import './HomePage.css';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products/categories');
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        setError('No se pudieron cargar las categorías.');
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="page-container text-center"><p>Cargando categorías...</p></div>;
  }

  if (error) {
    return <div className="page-container text-center"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="page-container">
      <div className="home-banner">
        <h1 className="banner-title">Bienvenido a la Tienda Online del grupo B</h1>
        <p className="banner-subtitle">Explora nuestros productos y encuentra ofertas increíbles.</p>
      </div>

      <div className="categories-section">
        <h2 className="section-title">Explora nuestras Categorías</h2>
        <p className="section-subtitle">Descubre los mejores productos.</p>
        <div className="categories-grid">
          {categories.map(category => (
            <Link to={`/category/${category}`} key={category} className="category-link">
              <div className="category-card">
                <div className="category-image">
                  {/* Aquí puedes usar imágenes para las categorías si las tienes */}
                </div>
                <h3>{category.toUpperCase()}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;