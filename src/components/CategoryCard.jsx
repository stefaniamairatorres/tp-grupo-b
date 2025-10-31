import React from 'react';
import { Link } from 'react-router-dom';
import './CategoryCard.css'; 

const CategoryCard = ({ category }) => {
    // Convierte el nombre a un slug (ej: "men's clothing" -> "mens-clothing")
    const categorySlug = category.name.toLowerCase().replace(/['\s]/g, '-'); 

    return (
        <Link 
            to={`/category/${categorySlug}`} 
            className="category-card"
            // APLICA LA IMAGEN COMO FONDO (compatible con tu CSS)
            style={{ 
                backgroundImage: `url(${category.image})` 
            }}
        >
            {/* El overlay y título se renderizan sobre la imagen */}
            <div className="category-overlay">
                <h3 className="category-title">{category.name}</h3>
            </div>
            {/* NO USAR <img> */}
        </Link>
    );
}

export default CategoryCard;