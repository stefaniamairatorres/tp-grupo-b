import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios'; 
import ProductCard from '../components/ProductCard';
import './pages.css';

const CategoryPage = () => {
  const { categoryName } = useParams(); // Ej: 'vinos'
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null); // Limpiar errores

      try {
        // 1. Traer TODOS los productos del backend - ¡CORREGIDO! Usamos solo /api
        const response = await axios.get(`/api/products`); 
        const allProducts = response.data;

        // 2. Lógica de Filtrado (El Paso Clave)
        let filteredProducts = [];

        if (categoryName) {
            // Si hay un categoryName en la URL (ej. /category/licores), filtramos:
            filteredProducts = allProducts.filter(product => {
                // El campo product.category ahora es un objeto gracias al populate
                // Verificamos que exista y que el nombre de la categoría coincida con la URL
                return product.category && 
                       product.category.name.toLowerCase() === categoryName.toLowerCase();
            });
        } else {
            // Si no hay categoryName (Ej: /products), mostramos todos
            filteredProducts = allProducts;
        }
        
        setProducts(filteredProducts);
        setLoading(false);
      } catch (err) {
        console.error("Error al cargar o filtrar productos:", err);
        // Mensaje de error ajustado, ya no menciona localhost
        setError('No se pudieron cargar los productos. Revisa la conexión con el servidor (Render).'); 
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]); // Vuelve a ejecutar cuando la categoría en la URL cambia

  // --- Renderizado Final ---

  return (
    <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>{categoryName ? categoryName.toUpperCase() : "TODOS LOS PRODUCTOS"}</h1>
      <p style={{ textAlign: 'center', color: '#ccc' }}>Mostrando {products.length} productos.</p>
      
      {products.length === 0 && !loading && !error && (
            <div className="text-center"><p>No hay productos disponibles en esta categoría.</p></div>
        )}
      
      {error && <div className="text-center"><p className="error-message">{error}</p></div>}

      <div className="product-grid">
        {products.map(product => (
          <ProductCard key={product._id} product={product} /> 
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;