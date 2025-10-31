

import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard';
import './pages.css';

// 🚨 Refleja las categorías 🚨
const categories = [
  { id: 1, name: 'Tragos', image: 'https://img.freepik.com/foto-gratis/vista-frontal-variedad-cocteles-agitador_23-2148454386.jpg?semt=ais_hybrid&w=740&q=80' },
  { id: 2, name: 'Utensillos', image: 'https://cuberspremium.com/wp-content/uploads/2017/11/Utensilios-de-cocteleria.jpg' },
  { id: 3, name: 'Vinos', image: 'https://fotos.perfil.com/2023/08/30/trim/987/555/vinos-1642745.jpg' },
  { id: 4, name: 'Licores', image: 'https://distribuidoradelsur.com.ar/sysmam/padmin/productos/img/CUSENIER-LICORES.jpg' },
];

const HomePage = () => { 
  return (
    <div className="page-container">
      {/* ... (Títulos y enlaces) ... */}
      <h1 style={{ textAlign: 'center', fontSize: '2.5em', color: '#00bcd4' }}>Bienvenido a la Tienda Online</h1>
      <h1 style={{ textAlign: 'center', fontSize: '2.5em', color: '#00bcd4' }}>Barwoman Maira Torres</h1>

      <p style={{ textAlign: 'center', color: '#ccc', marginBottom: '50px' }}>Explora las categorías.</p>

      <div className="category-grid">
        {categories.map(category => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;