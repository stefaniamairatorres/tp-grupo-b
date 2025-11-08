import React, { useState, useEffect } from 'react';
import axios from 'axios';
// Asegúrate de que los estilos necesarios (como buttonStyle) estén definidos
// ya sea aquí o importados de un archivo .css

const AdminProductListPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Hook para cargar los productos reales de la API (CORREGIDO)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); // Se agrega para indicar el estado de carga
                // *** CORRECCIÓN CLAVE: Usamos solo /api/products ***
                const response = await axios.get('/api/products'); 
                setProducts(response.data);
                setError(null);
            } catch (err) {
                // Mensaje de error corregido para despliegue
                setError('Error de conexión: No se pudieron cargar los productos del servidor.');
                console.error('Error fetching admin products:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    // 2. Funciones de Acciones (Lógica de Navegación y Borrado - Pendiente de implementar API)
    const handleEdit = (productId) => {
        console.log('Navegar para editar producto:', productId);
        // Implementación futura: Navegar a /admin/products/edit/:id
    };

    const handleDelete = (productId) => {
        // NOTA: Si implementas el delete, la llamada de axios también debe ser relativa: `/api/products/${productId}`
        if (window.confirm(`¿Estás seguro de eliminar el producto con ID: ${productId}?`)) {
            console.log('Producto eliminado:', productId);
            // Implementación futura: Llamada a axios.delete('/api/products/' + productId)
            setProducts(products.filter(p => p._id !== productId)); // Simulación temporal
        }
    };

    // 3. Manejo de estado de carga y error
    if (loading) {
        return <div className="admin-page-container" style={{ padding: '20px', color: '#ccc' }}><p>Cargando productos de la Base de Datos...</p></div>;
    }

    if (error) {
        return <div className="admin-page-container" style={{ padding: '20px', color: '#ccc' }}><p className="error-message">Error: {error}</p></div>;
    }

    return (
        <div className="admin-page-container" style={{ padding: '20px', color: '#ccc' }}>
            <h2 style={{ color: '#2ecc71', textAlign: 'center' }}>Panel de Administración</h2>
            
            <div style={{ margin: '20px 0', textAlign: 'center' }}>
                <button style={buttonStyle.create}>Crear Producto</button>
                <button style={buttonStyle.listActive}>Listado de Productos</button>
            </div>
            
            <h3>Listado de productos ({products.length} encontrados)</h3>

            <table style={tableStyle}>
                <thead>
                    <tr style={theadStyle}>
                        <th style={thStyle}>ID</th>
                        <th style={thStyle}>Título</th>
                        <th style={thStyle}>Precio</th>
                        <th style={{ ...thStyle, color: '#2ecc71' }}>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {products.length > 0 ? (
                        products.map((product) => (
                            <tr key={product._id} style={trStyle}>
                                <td style={tdStyle}>{product._id}</td>
                                <td style={tdStyle}>{product.name}</td> 
                                <td style={tdStyle}>${product.price ? product.price.toFixed(2) : 'N/A'}</td> 
                                
                                <td style={tdStyle}>
                                    <button 
                                        onClick={() => handleEdit(product._id)} 
                                        style={buttonStyle.edit}
                                    >
                                        Editar
                                    </button>
                                    <button 
                                        onClick={() => handleDelete(product._id)} 
                                        style={buttonStyle.delete}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr style={trStyle}>
                            <td colSpan="4" style={{ ...tdStyle, textAlign: 'center' }}>
                                Aún no hay productos en la base de datos.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProductListPage;

// Estilos básicos (Asegúrate de tener estos estilos definidos)
const tableStyle = {
    width: '100%',
    borderCollapse: 'collapse',
    marginTop: '20px',
    backgroundColor: '#333'
};

const theadStyle = {
    backgroundColor: '#1e1e1e',
};

const thStyle = {
    padding: '12px',
    textAlign: 'left',
    color: '#aaa',
    borderBottom: '1px solid #444'
};

const trStyle = {
    borderBottom: '1px solid #444'
};

const tdStyle = {
    padding: '12px',
};

const buttonStyle = {
    create: {
        padding: '10px 15px',
        marginRight: '10px',
        backgroundColor: '#444',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    listActive: {
        padding: '10px 15px',
        backgroundColor: '#2ecc71',
        color: '#1e1e1e',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    },
    edit: {
        padding: '5px 10px',
        backgroundColor: '#3498db',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer',
        marginRight: '5px'
    },
    delete: {
        padding: '5px 10px',
        backgroundColor: '#e74c3c',
        color: 'white',
        border: 'none',
        borderRadius: '4px',
        cursor: 'pointer'
    }
};