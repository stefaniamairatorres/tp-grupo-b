import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import './AdminPage.css';

const API_URL = import.meta.env.VITE_API_URL; // 👉 se toma del .env

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('list');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ message: '', type: '' });

  // ==============================================
  // FUNCIÓN PARA OBTENER PRODUCTOS
  // ==============================================
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/api/products`);
      setProducts(response.data);
      setError(null);
      setSaveStatus({ message: '', type: '' });
    } catch (err) {
      console.error('❌ Error al cargar productos:', err);
      setError('No se pudieron cargar los productos desde Render.');
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // ==============================================
  // GUARDAR O ACTUALIZAR PRODUCTO
  // ==============================================
  const handleSaveProduct = async (productData, isEditing) => {
    try {
      let response;
      setSaveStatus({
        message: isEditing ? 'Actualizando producto...' : 'Creando producto...',
        type: 'info',
      });

      if (isEditing && editingProduct?._id) {
        response = await axios.put(`${API_URL}/api/products/${editingProduct._id}`, productData);
        setSaveStatus({ message: '✅ Producto actualizado con éxito.', type: 'success' });
      } else {
        response = await axios.post(`${API_URL}/api/products`, productData);
        setSaveStatus({ message: '✅ Producto creado con éxito.', type: 'success' });
      }

      await fetchProducts();
      setEditingProduct(null);
      setActiveTab('list');
    } catch (err) {
      console.error('❌ Error al guardar producto:', err);
      const errorMessage = err.response?.data?.message || 'Error al guardar producto.';
      setSaveStatus({ message: errorMessage, type: 'error' });
    }
  };

  // ==============================================
  // ELIMINAR PRODUCTO
  // ==============================================
  const handleDeleteProduct = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este producto?')) {
      try {
        await axios.delete(`${API_URL}/api/products/${id}`);
        setSaveStatus({ message: '🗑️ Producto eliminado con éxito.', type: 'success' });
        await fetchProducts();
      } catch (err) {
        console.error('❌ Error al eliminar producto:', err);
        setSaveStatus({ message: 'Error al eliminar producto.', type: 'error' });
      }
    }
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveTab('create');
  };

  // ==============================================
  // RENDER
  // ==============================================
  if (loading) {
    return <div className="admin-container"><p>Cargando productos...</p></div>;
  }

  if (error && !products.length) {
    return <div className="admin-container"><p className="error-message">{error}</p></div>;
  }

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

      {saveStatus.message && (
        <p className={`status-message ${saveStatus.type}`}>
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
                  <th>Nombre</th>
                  <th>Precio</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {products.map(product => (
                  <tr key={product._id}>
                    <td>{product._id}</td>
                    <td>{product.name}</td>
                    <td>${product.price?.toFixed(2) ?? 'N/A'}</td>
                    <td>
                      <button onClick={() => handleEditProduct(product)} className="btn-edit">Editar</button>
                      <button onClick={() => handleDeleteProduct(product._id)} className="btn-delete">Eliminar</button>
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
