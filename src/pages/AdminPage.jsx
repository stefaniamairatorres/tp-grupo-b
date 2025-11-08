import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import ProductForm from '../components/ProductForm';
import './AdminPage.css'; 

// Archivo: src/pages/AdminPage.jsx

const AdminPage = () => {
    // 1. ESTADOS
    const [activeTab, setActiveTab] = useState('list');
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    
    // 2. FUNCIÓN DE CARGA DE DATOS (API REAL CORREGIDA)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); 
                // *** CORRECCIÓN CLAVE: Usamos solo /api/products para que Netlify redirija a Render ***
                const response = await axios.get('/api/products'); 
                
                setProducts(response.data); 
                setError(null); 
            } catch (err) {
                // Mensaje de error corregido para no mencionar localhost
                setError('Error al cargar productos. Revisa la conexión con el servidor (Render).');
                console.error('Error fetching admin products:', err);
                setProducts([]); 
            } finally {
                setLoading(false); 
            }
        };

        fetchProducts();
    }, []); 

    
    // NOTA: Las funciones de guardar y borrar (handleSaveProduct, handleDeleteProduct)
    // aún usan lógica simulada y deben ser actualizadas para usar AXIOS.POST/PUT/DELETE
    // y llamar a la API real, apuntando también a `/api/...`

    const handleSaveProduct = (newProduct) => {
        // Esta lógica debería usar axios.post o axios.put apuntando a `/api/products`
        console.log('Simulando guardado. Esto debe usar la API real.'); 
        if (editingProduct) {
            setProducts(products.map(p => (p._id === editingProduct._id ? newProduct : p)));
            setEditingProduct(null);
        } else {
            const tempId = 'temp-' + Date.now(); 
            setProducts([...products, { ...newProduct, _id: tempId }]);
        }
        setActiveTab('list');
    };

    const handleDeleteProduct = (id) => {
        // Esta lógica debería usar axios.delete apuntando a `/api/products/:id`
        console.log('Simulando eliminación. Esto debe usar la API real.');
        // NOTA: El uso de window.confirm() está desaconsejado en este entorno.
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
             setProducts(products.filter(p => p._id !== id));
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setActiveTab('create');
    };

    // 3. MANEJO DE ESTADOS DE CARGA Y ERROR
    if (loading) {
        return <div className="admin-container"><p>Cargando productos...</p></div>;
    }

    if (error && !products.length) {
        return <div className="admin-container"><p className="error-message">{error}</p></div>;
    }

    // 4. RENDERIZADO
    return (
        <div className="admin-container">
            <h1 className="admin-title">Panel de Administración</h1>
            <div className="tab-buttons">
                <button
                    className={`tab-btn ${activeTab === 'create' ? 'active' : ''}`}
                    onClick={() => { setActiveTab('create'); setEditingProduct(null); }}
                >
                    {editingProduct ? 'Editar Producto' : 'Crear Producto'}
                </button>
                <button
                    className={`tab-btn ${activeTab === 'list' ? 'active' : ''}`}
                    onClick={() => setActiveTab('list')}
                >
                    Listado de Productos
                </button>
            </div>

            <div className="tab-content">
                {activeTab === 'create' ? (
                    <ProductForm
                        initialData={editingProduct}
                        onSave={handleSaveProduct}
                        onCancel={() => { setActiveTab('list'); setEditingProduct(null); }}
                    />
                ) : (
                    <div className="product-list">
                        <h2>Listado de productos</h2>
                        {/* Muestra el error si existe y no hay productos */}
                        {error && <p className="error-message-inline">{error}</p>} 
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Título</th>
                                    <th>Precio</th>
                                    <th>Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td> 
                                        <td>{product.name}</td> 
                                        <td>${product.price ? product.price.toFixed(2) : 'N/A'}</td> 
                                        <td>
                                            <button onClick={() => handleEditProduct(product)} className="btn-edit">
                                                Editar
                                            </button>
                                            <button onClick={() => handleDeleteProduct(product._id)} className="btn-delete">
                                                Eliminar
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPage;