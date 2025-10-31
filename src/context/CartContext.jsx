import React, { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

// Clave para guardar y cargar en el almacenamiento local
const LOCAL_STORAGE_KEY = 'ecomm_cart';

export const CartProvider = ({ children }) => {
    // 1. LÓGICA DE CARGA AL INICIO:
    // Inicializa el estado intentando cargar el carrito guardado en localStorage.
    // Si no hay datos, usa un array vacío ([]).
    const [cartItems, setCartItems] = useState(() => {
        try {
            const savedCart = localStorage.getItem(LOCAL_STORAGE_KEY);
            return savedCart ? JSON.parse(savedCart) : [];
        } catch (error) {
            console.error("Error al cargar el carrito de localStorage:", error);
            return []; // Retorna vacío si hay un error de parseo
        }
    });

    // 2. LÓGICA DE GUARDADO:
    // Se ejecuta CADA VEZ que 'cartItems' cambia, guardando el nuevo estado.
    useEffect(() => {
        try {
            // Convierte el array a JSON string y lo guarda
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
        } catch (error) {
            console.error("Error al guardar el carrito en localStorage:", error);
        }
    }, [cartItems]); // Dependencia: solo se ejecuta si cartItems cambia

    // --- Funciones del Carrito (CRUD) ---

    const addToCart = (product) => {
        setCartItems((prevItems) => {
            // Usamos product._id, que es la clave de MongoDB
            const existingItem = prevItems.find((item) => item._id === product._id); 
            
            if (existingItem) {
                return prevItems.map((item) =>
                    // Incrementa la cantidad del producto existente
                    item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
                );
            } else {
                // Añade el nuevo producto con quantity: 1
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (id) => {
        // Filtra el array, eliminando el ítem que coincida con el ID
        setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    };

    const clearCart = () => {
        setCartItems([]);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, getTotalPrice }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};