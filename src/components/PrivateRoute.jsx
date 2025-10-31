import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
// Asegúrate de que esta ruta a AuthContext sea correcta
import { useAuth } from '../context/AuthContext.jsx'; 

/**
 * Componente de Ruta Privada
 * Verifica si el usuario está logueado y, si no, lo redirige al Login.
 */
const PrivateRoute = () => {
    // Obtenemos el estado del usuario del contexto
    const { user } = useAuth(); 

    // user ? <Outlet /> : <Navigate to="/login" replace />
    // Si 'user' existe (está logueado), renderiza la ruta anidada (<Outlet />).
    // Si 'user' es null, redirige a /login.
    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
