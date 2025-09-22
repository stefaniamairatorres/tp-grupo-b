import React, { createContext, useState, useContext } from 'react';

// 1. Crea el contexto
const AuthContext = createContext();

// 2. Crea el proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  const login = (userData) => {
    // Aquí iría la lógica para autenticar al usuario
    // Por ahora, solo simulamos un login exitoso
    setIsLoggedIn(true);
    setUser(userData);
    console.log('Usuario logueado:', userData);
  };

  const logout = () => {
    // Lógica para cerrar la sesión
    setIsLoggedIn(false);
    setUser(null);
    console.log('Sesión cerrada');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Crea un hook personalizado para usar el contexto fácilmente
export const useAuth = () => {
  return useContext(AuthContext);
};