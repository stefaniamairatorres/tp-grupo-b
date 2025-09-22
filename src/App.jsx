import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import CategoryPage from './pages/CategoryPage';
import ContactPage from './pages/ContactPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminPage from './pages/AdminPage';
import ProductPage from './pages/ProductPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import { useAuth } from './context/AuthContext';

// Componente para proteger rutas que requieren autenticación
const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="main-content">
       <Routes>
  <Route path="/" element={<HomePage />} />
  <Route path="/products" element={<ProductPage />} />
  <Route path="/products/:id" element={<ProductDetailPage />} />
  {/* <Route path="/category" element={<CategoryPage />} />  <-- ¡Elimina esta línea! */}
  <Route path="/category/:categoryName" element={<CategoryPage />} /> {/* Deja solo la ruta dinámica */}
  <Route path="/contact" element={<ContactPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/carrito" element={<CartPage />} />

  <Route 
    path="/admin" 
    element={
      <ProtectedRoute>
        <AdminPage />
      </ProtectedRoute>
    } 
  />
</Routes> 
      </main>
    </BrowserRouter>
  );
}

export default App;