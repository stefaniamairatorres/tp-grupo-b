import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // 1. Inicializa el estado 'user' leyendo desde localStorage
    // Si hay datos de usuario guardados, los carga.
    const [user, setUser] = useState(() => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : null;
    });
    const [isLoading, setIsLoading] = useState(false);

    // 2. Función LOGIN: Guarda los datos del usuario en el estado y localStorage.
    // Llamada desde RegisterPage/LoginPage al recibir la respuesta exitosa del backend.
    const login = (userData) => {
        // userData debe ser el objeto que el backend devuelve: {_id, nombre, email}
        localStorage.setItem('userInfo', JSON.stringify(userData));
        setUser(userData);
        // Nota: Asumimos que el backend ya estableció la cookie 'jwt'
    };

    // 3. Función LOGOUT: Cierra la sesión.
    const logout = async () => {
        setIsLoading(true);
        try {
            // Llama al endpoint de logout en el backend (debe limpiar la cookie 'jwt')
            await axios.post('/api/users/logout');
            
            // Limpia el estado y el almacenamiento local en el frontend
            localStorage.removeItem('userInfo');
            setUser(null);
        } catch (error) {
            console.error("Error al cerrar sesión en el backend:", error);
            // Incluso si el backend falla, forzamos el cierre de sesión local
            localStorage.removeItem('userInfo');
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    // 4. Proveedor del contexto (permite acceder a los valores desde cualquier componente)
    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading, isLoggedIn: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    // 5. Hook personalizado para usar el contexto
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth debe ser usado dentro de un AuthProvider');
    }
    return context;
};

export default AuthContext;
