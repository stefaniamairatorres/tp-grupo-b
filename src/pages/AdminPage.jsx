import React, { useState, useEffect } from 'react';
import axios from 'axios'; // 🚨 Necesario para la conexión de API
import ProductForm from '../components/ProductForm';
import './AdminPage.css'; 

// Archivo: src/pages/AdminPage.jsx

const AdminPage = () => {
    // ✅ 1. ESTADOS CORREGIDOS Y COMPLETOS
    const [activeTab, setActiveTab] = useState('list');
    const [products, setProducts] = useState([]);
    const [editingProduct, setEditingProduct] = useState(null);
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 
    
    // 2. FUNCIÓN DE CARGA DE DATOS (API REAL)
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true); 
                const response = await axios.get('http://localhost:5000/api/products'); 
                
                setProducts(response.data); 
                setError(null); 
            } catch (err) {
                setError('Error al cargar productos: Asegúrate de que el backend (http://localhost:5000) esté corriendo y CORS configurado.');
                console.error('Error fetching admin products:', err);
                setProducts([]); 
            } finally {
                setLoading(false); 
            }
        };

        fetchProducts();
    }, []); 

    
    // 3. LÓGICA DE MANEJO DE PRODUCTOS (NECESITA SER ACTUALIZADA A LA API)
    // ESTA LÓGICA DE ABAJO YA NO FUNCIONARÁ CORRECTAMENTE con la API sin una llamada axios.
   

    const handleSaveProduct = (newProduct) => {
        // LÓGICA TEMPORAL SIMULADA - DEBE USAR AXIOS.POST/PUT EN EL FUTURO
        if (editingProduct) {
            setProducts(products.map(p => (p._id === editingProduct._id ? newProduct : p))); // Usa _id
            setEditingProduct(null);
        } else {
            // Esta ID generada en frontend no es real. Se debe obtenerla del backend
            const tempId = 'temp-' + Date.now(); 
            setProducts([...products, { ...newProduct, _id: tempId }]); // Usa _id
        }
        setActiveTab('list');
    };

    const handleDeleteProduct = (id) => {
        // LÓGICA TEMPORAL SIMULADA -  USAR AXIOS.DELETE EN EL FUTURO
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
             setProducts(products.filter(p => p._id !== id)); // Usa _id
        }
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setActiveTab('create');
    };

    // 4. MANEJO DE ESTADOS DE CARGA Y ERROR
    if (loading) {
        return <div className="admin-container"><p>Cargando productos...</p></div>;
    }

    if (error) {
        return <div className="admin-container"><p className="error-message">{error}</p></div>;
    }

    // 5. RENDERIZADO
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
                                {/* 🚨 CORRECCIÓN CLAVE 2: USO DE CAMPOS DE MONGODB 🚨 */}
                                {products.map(product => (
                                    <tr key={product._id}>
                                        <td>{product._id}</td> {/* ✅ Usa _id */}
                                        <td>{product.name}</td> {/* ✅ Usa name */}
                                        <td>${product.price ? product.price.toFixed(2) : 'N/A'}</td> {/* ✅ Usa price */}
                                        <td>
                                            <button onClick={() => handleEditProduct(product)} className="btn-edit">
                                                Editar
                                            </button>
                                            <button onClick={() => handleDeleteProduct(product._id)} className="btn-delete"> {/* ✅ Usa _id */}
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