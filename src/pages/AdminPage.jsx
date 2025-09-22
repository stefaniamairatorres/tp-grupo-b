import React, { useState, useEffect } from 'react';
import ProductForm from '../components/ProductForm';
import './AdminPage.css';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('create');
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);

  // Simula la obtención de productos de una API
  useEffect(() => {
    // Aquí iría tu llamada a la API
    const fetchedProducts = [
      { id: 1, title: 'Mouse Gamer', price: 49.99, description: 'Mouse ergonómico para gaming', category: 'electronics', image: 'https://images.pexels.com/photos/1010497/pexels-photo-1010497.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
      { id: 2, title: 'Teclado Mecánico', price: 129.50, description: 'Teclado con switches rojos', category: 'electronics', image: 'https://images.pexels.com/photos/251225/pexels-photo-251225.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
    ];
    setProducts(fetchedProducts);
  }, []);

  const handleSaveProduct = (newProduct) => {
    if (editingProduct) {
      // Lógica para editar un producto existente
      setProducts(products.map(p => (p.id === editingProduct.id ? newProduct : p)));
      setEditingProduct(null);
    } else {
      // Lógica para crear un nuevo producto
      const id = Math.max(...products.map(p => p.id), 0) + 1;
      setProducts([...products, { ...newProduct, id }]);
    }
    setActiveTab('list');
  };

  const handleDeleteProduct = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setActiveTab('create');
  };

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
                {products.map(product => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                    <td>
                      <button onClick={() => handleEditProduct(product)} className="btn-edit">
                        Editar
                      </button>
                      <button onClick={() => handleDeleteProduct(product.id)} className="btn-delete">
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