import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx'; // Importa el proveedor del carrito

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider> {/* Envuelve App con el proveedor del carrito */}
        <App />
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>,
);