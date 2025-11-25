// Este componente corrige el filtro de categorías al usar el ID de MongoDB
// y asegura que los productos estén ordenados alfabéticamente.

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Loader2, Frown } from 'lucide-react';
// FIX DE ERROR: Especificamos la extensión .jsx para asegurar la resolución de la ruta
import ProductCard from '../components/ProductCard.jsx'; 

// --- CONFIGURACIÓN DE LA API ---
const API_URL = 'https://tp-back-final.onrender.com';
// ------------------------------

const CategoryPage = () => {
    // Obtenemos el nombre de la categoría (ej. "Vinos") de la URL
    const { categoryName } = useParams();
    
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 1. Obtener el ID de MongoDB (el "código de mongo") a partir del nombre en la URL
    const selectedCategory = useMemo(() => {
        const normalizedName = categoryName?.toLowerCase();
        // Buscamos la categoría en la lista cargada
        return categories.find(cat => cat.name?.toLowerCase() === normalizedName);
    }, [categories, categoryName]);

    // --- CARGA DE DATOS ---
    useEffect(() => {
        const fetchAllData = async () => {
            try {
                setLoading(true);
                setError(null);
                
                // Cargar todas las categorías y productos en paralelo
                const [categoriesResponse, productsResponse] = await Promise.all([
                    axios.get(`${API_URL}/api/categories`),
                    axios.get(`${API_URL}/api/products`)
                ]);

                setCategories(categoriesResponse.data);
                setProducts(productsResponse.data);
                
            } catch (err) {
                setError('Error al cargar datos. Asegúrate de que tu servidor de Render esté activo.');
                console.error('Error fetching data for CategoryPage:', err);
            } finally {
                setLoading(false);
            }
        };
        fetchAllData();
    }, [categoryName]);

    // 2. Filtrado (por ID de MongoDB) y Ordenamiento (alfabético)
    const filteredAndSortedProducts = useMemo(() => {
        if (!selectedCategory || !products.length) {
            return [];
        }
        
        // CRÍTICO: Filtra por el ID de MongoDB (el campo 'category' debe coincidir con el _id)
        const filtered = products.filter(product => {
            const categoryId = product.category?._id || product.category; 
            return categoryId === selectedCategory._id;
        });

        // CRÍTICO: Ordenamiento alfabético por nombre (para que no estén mezclados)
        return filtered.sort((a, b) => a.name.localeCompare(b.name));
        
    }, [products, selectedCategory]);

    // --- RENDERING ---
    
    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-[50vh] text-center p-8">
                <Loader2 className="animate-spin text-indigo-500 w-12 h-12 mb-3" />
                <p className="text-xl font-medium text-gray-700">Cargando productos...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center p-8 text-red-700 bg-red-100 rounded-lg max-w-lg mx-auto mt-10 shadow-lg border border-red-300">
                <Frown className="mx-auto h-12 w-12" />
                <h2 className="text-2xl font-bold mt-4">Error de Conexión</h2>
                <p className="mt-2">{error}</p>
            </div>
        );
    }
    
    if (!selectedCategory) {
        return (
            <div className="text-center p-10 bg-white rounded-xl shadow-lg max-w-3xl mx-auto mt-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-4">Categoría no encontrada</h1>
                <p className="text-lg text-gray-500 mb-6">La categoría "{categoryName}" no existe o no se pudo cargar.</p>
                <Link to="/" className="bg-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-indigo-700 transition shadow-lg">
                    Ir a la página principal
                </Link>
            </div>
        );
    }


    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                    {selectedCategory.name}
                </h1>
                <p className="text-lg text-gray-500">
                    {filteredAndSortedProducts.length} productos disponibles.
                </p>
                <Link 
                    to="/products" 
                    className="mt-4 inline-flex items-center text-indigo-600 hover:text-indigo-800 transition font-medium"
                >
                    Ver todos los productos
                </Link>
            </div>
            
            {filteredAndSortedProducts.length === 0 ? (
                <div className="text-center p-10 bg-white rounded-xl shadow-lg mt-10">
                    <Frown className="mx-auto h-16 w-16 text-gray-400" />
                    <h2 className="text-2xl font-semibold mt-4 text-gray-700">Sin productos</h2>
                    <p className="mt-2 text-gray-500">No hay productos en esta categoría.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {/* Usamos el ProductCard corregido para renderizar cada producto */}
                    {filteredAndSortedProducts.map(product => (
                        <ProductCard 
                            key={product._id} 
                            product={product} 
                            categoryName={selectedCategory.name}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CategoryPage;