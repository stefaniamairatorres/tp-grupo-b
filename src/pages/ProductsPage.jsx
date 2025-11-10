import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { useSearch } from '../context/SearchContext';
import './pages.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchTerm } = useSearch();

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Número de productos por página

  // 🛑 ELIMINAMOS BASE_URL para SIEMPRE 🛑
  // const BASE_URL = import.meta.env.VITE_API_URL; 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Corregimos el console.log para usar la ruta relativa
        console.log("📡 Cargando productos desde: /api/products (Ruta Relativa)"); 
        
        // ESTA LÍNEA ES CORRECTA: Solicitud a la ruta relativa
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        setError('No se pudieron cargar los productos. (Revisa tu conexión)');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // 🛑 ELIMINAMOS BASE_URL de las dependencias. Esto es CRUCIAL.
  }, []); 

  if (loading) {
    return <div className="page-container text-center"><p>Cargando productos...</p></div>;
  }

  if (error) {
    return <div className="page-container text-center"><p className="error-message">{error}</p></div>;
  }

  // Lógica de filtrado de búsqueda
  const filteredProducts = products.filter(product =>
    product.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Lógica de paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>Todos los productos</h1>
      <p style={{ textAlign: 'center', color: '#ccc' }}>Encuentra lo que buscas en nuestra tienda</p>
      
      <div className="product-grid">
        {currentProducts.map(product => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>

      {/* Botones de paginación */}
      <div className="pagination">
        <button 
          onClick={() => paginate(currentPage - 1)} 
          disabled={currentPage === 1}
          className="pagination-btn"
        >
          Anterior
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
        <button 
          onClick={() => paginate(currentPage + 1)} 
          disabled={currentPage === totalPages}
          className="pagination-btn"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default ProductPage;