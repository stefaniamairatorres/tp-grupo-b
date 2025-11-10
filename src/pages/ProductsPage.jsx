import React, { useState, useEffect } from 'react';
import axios from 'axios';
// CORRECCIÓN 1: Se añade la extensión .jsx
import ProductCard from '../components/ProductCard.jsx';
// CORRECCIÓN 2: Se añade la extensión .jsx
import { useSearch } from '../context/SearchContext.jsx';
// CORRECCIÓN 3: Se elimina el import de CSS y se incluye el estilo directamente.
// import './pages.css';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { searchTerm } = useSearch();

  // Estados para la paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8); // Número de productos por página

  // 🛑 LA LÍNEA DE BASE_URL HA SIDO REMOVIDA

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 1. LIMPIEZA DEL CONSOLE.LOG
        console.log("📡 Cargando productos desde: /api/products (Ruta Relativa)");
        
        // Llamada correcta a la ruta relativa
        const response = await axios.get('/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error("Error al cargar productos:", err);
        // 2. LIMPIEZA DEL MENSAJE DE ERROR
        setError('No se pudieron cargar los productos. Por favor, verifica la configuración del Backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // Dependencias vacías son CORRECTAS para rutas relativas
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
    <>
        <style jsx="true">{`
            /* Estilos mínimos para que la página se vea bien sin pages.css */
            .page-container {
                padding: 2rem;
                max-width: 1200px;
                margin: 0 auto;
                font-family: 'Inter', sans-serif;
            }
            .product-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 1.5rem;
                margin-top: 2rem;
            }
            .pagination {
                display: flex;
                justify-content: center;
                gap: 0.5rem;
                margin-top: 3rem;
                padding-bottom: 2rem;
            }
            .pagination-btn {
                padding: 0.5rem 1rem;
                border: 1px solid #007bff;
                border-radius: 0.5rem;
                background-color: #f9f9f9;
                color: #007bff;
                cursor: pointer;
                transition: all 0.2s;
                font-weight: 500;
            }
            .pagination-btn:hover:not(:disabled) {
                background-color: #e9ecef;
            }
            .pagination-btn.active {
                background-color: #007bff;
                color: white;
                border-color: #007bff;
            }
            .pagination-btn:disabled {
                cursor: not-allowed;
                opacity: 0.6;
                background-color: #f1f1f1;
                border-color: #ccc;
                color: #888;
            }
            .error-message {
                color: #dc3545;
                font-weight: bold;
                padding: 1rem;
                background: #f8d7da;
                border: 1px solid #f5c6cb;
                border-radius: 0.5rem;
            }
            .text-center {
                text-align: center;
            }
        `}</style>

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
    </>
  );
};

export default ProductPage;