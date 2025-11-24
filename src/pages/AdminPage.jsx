import React, { useState, useEffect, useCallback } from 'react';
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
    const [saveStatus, setSaveStatus] = useState({ message: '', type: '' });

    // Función para obtener productos (uso useCallback para poder llamarla después de guardar/eliminar)
    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            // Uso de la ruta relativa /api/products para que Vercel redirija a Render
            const response = await axios.get('/api/products');
            
            setProducts(response.data);
            setError(null);
            setSaveStatus({ message: '', type: '' }); // Limpiar estado de guardado
        } catch (err) {
            setError('Error al cargar productos. Revisa la conexión con el servidor (Render).');
            console.error('Error fetching admin products:', err);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]); 

    // 2. FUNCIÓN REAL DE GUARDADO/ACTUALIZACIÓN
    const handleSaveProduct = async (productData, isEditing) => {
        try {
            let response;
            
            // Mostrar mensaje de carga mientras se envía
            setSaveStatus({ message: isEditing ? 'Actualizando producto...' : 'Creando producto...', type: 'info' });

            if (isEditing && editingProduct?._id) {
                // Lógica de ACTUALIZACIÓN (PUT)
                // Usamos productData que DEBE ser FormData (si incluye archivo) o un objeto.
                response = await axios.put(`/api/products/${editingProduct._id}`, productData, {
                    // Si el backend espera FormData (por ejemplo, con Multer para la imagen),
                    // es mejor no especificar el Content-Type, Axios y el navegador lo harán.
                });
                setSaveStatus({ message: 'Producto actualizado con éxito.', type: 'success' });
            } else {
                // Lógica de CREACIÓN (POST)
                response = await axios.post('/api/products', productData, {
                    // Si el backend espera FormData (por ejemplo, con Multer para la imagen)
                });
                setSaveStatus({ message: 'Producto creado con éxito.', type: 'success' });
            }

            // Recargar la lista de productos para ver el nuevo/editado
            await fetchProducts(); 
            
            // Volver a la lista después de guardar
            setEditingProduct(null);
            setActiveTab('list');

        } catch (err) {
            console.error('Error al guardar o actualizar el producto:', err);
            // Mensaje de error detallado
            const errorMessage = err.response?.data?.message || `Error al guardar: ${err.message}. Revisa la consola para más detalles.`;
            setSaveStatus({ message: errorMessage, type: 'error' });
            // EVITAR PANTALLA NEGRA: Si falla, solo mostramos el error, no colapsamos.
        }
    };

    // 3. FUNCIÓN REAL DE ELIMINACIÓN
    const handleDeleteProduct = async (id) => {
        // CORRECCIÓN: Usar un modal o un mensaje dentro del UI en lugar de window.confirm()
        // En un entorno profesional, se evitaría window.confirm()
        if (window.confirm('¿Estás seguro de eliminar este producto?')) {
            try {
                await axios.delete(`/api/products/${id}`);
                setSaveStatus({ message: 'Producto eliminado con éxito.', type: 'success' });
                // Recargar la lista
                await fetchProducts();
            } catch (err) {
                console.error('Error al eliminar el producto:', err);
                const errorMessage = err.response?.data?.message || `Error al eliminar: ${err.message}.`;
                setSaveStatus({ message: errorMessage, type: 'error' });
            }
        }
    };

    // Funciones auxiliares
    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setActiveTab('create');
    };
    
    // 4. MANEJO DE ESTADOS DE CARGA Y ERROR
    if (loading) {
        return <div className="admin-container"><p>Cargando productos...</p></div>;
    }

    if (error && !products.length) {
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

            {/* Mensajes de estado (Éxito/Error al guardar) */}
            {saveStatus.message && (
                <p className={`status-message ${saveStatus.type === 'error' ? 'error' : 'success'}`}>
                    {saveStatus.message}
                </p>
            )}

            <div className="tab-content">
                {activeTab === 'create' ? (
                    <ProductForm
                        initialData={editingProduct}
                        onSave={(data) => handleSaveProduct(data, !!editingProduct)}
                        onCancel={() => { setActiveTab('list'); setEditingProduct(null); }}
                    />
                ) : (
                    <div className="product-list">
                        <h2>Listado de productos ({products.length})</h2>
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
                                {products.map(product => {
                                    // FIX CRÍTICO: Asegurar que el precio es numérico antes de llamar a toFixed
                                    const displayPrice = (Number(product?.price) || 0).toFixed(2);

                                    return (
                                        <tr key={product._id}>
                                            <td>{product._id}</td> 
                                            <td>{product.name}</td> 
                                            {/* Usamos el precio ya corregido */}
                                            <td>${displayPrice}</td> 
                                            <td>
                                                <button onClick={() => handleEditProduct(product)} className="btn-edit">
                                                    Editar
                                                </button>
                                                <button onClick={() => handleDeleteProduct(product._id)} className="btn-delete">
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            {/* Estilo para los mensajes de estado */}
            <style jsx="true">{`
                .status-message {
                    padding: 10px;
                    margin: 15px 0;
                    border-radius: 5px;
                    font-weight: bold;
                    text-align: center;
                }
                .status-message.success {
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }
                .status-message.error {
                    background-color: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }
                .status-message.info {
                    background-color: #bee5eb;
                    color: #0c5460;
                    border: 1px solid #b8daff;
                }
            `}</style>
        </div>
    );
};

export default AdminPage;