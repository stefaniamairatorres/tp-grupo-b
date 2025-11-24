import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useParams } from 'react-router-dom';
import './pages.css';

// CRÍTICO: Definimos la URL absoluta de Render aquí
const RENDER_BACKEND_URL = "https://tp-back-final.onrender.com";

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

        // CAMBIO CRÍTICO 1: Usar la URL absoluta de Render
        // CAMBIO CRÍTICO 2: Filtrar los productos DESDE LA API, no después.
        // Hacemos el llamado a la API con el filtro de categoría directamente
        const apiUrl = `${RENDER_BACKEND_URL}/api/products?category=${categoryId}`;
        
        console.log("Cargando productos desde:", apiUrl);

        const response = await axios.get(apiUrl);
        
        // Si el backend es eficiente, ya devuelve solo los filtrados.
        // Si el backend es menos eficiente (como sugiere tu código anterior), 
        // quizás tengas que seguir filtrando aquí si tu API no soporta el query param:
        
        // Versión Simple (asumiendo que la API filtra por el parámetro `category`):
        setProducts(response.data);
        
        /* // Si tu backend SOLO devuelve TODOS los productos sin importar el parámetro, 
        // debes usar el filtro en el frontend como lo tenías:
        const allProducts = response.data;
        const filtered = allProducts.filter(
          product => product.category?.toLowerCase() === categoryId.toLowerCase()
        );
        setProducts(filtered);
        */

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