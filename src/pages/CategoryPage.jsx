import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import './pages.css';

const API_URL = import.meta.env.VITE_API_URL;

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductsByCategory = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Cargando productos desde:", `${API_URL}/api/products`);

        const response = await axios.get(`${API_URL}/api/products`);
        const allProducts = response.data;

        const filtered = allProducts.filter(
          product => product.category?.toLowerCase() === categoryId.toLowerCase()
        );

        setProducts(filtered);
      } catch (err) {
        console.error("❌ Error cargando productos por categoría:", err);
        setError("No se pudieron cargar los productos. Revisa la conexión con el servidor (Render).");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsByCategory();
  }, [categoryId]);

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (products.length === 0) return <p>No hay productos en esta categoría.</p>;

  return (
    <div className="products-container">
      <h2>Productos de {categoryId}</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
