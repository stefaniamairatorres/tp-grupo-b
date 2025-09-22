import React from 'react';
import { Link } from 'react-router-dom';
import CategoryCard from '../components/CategoryCard'; // Importa el componente
import './pages.css';

// Datos de ejemplo para las categorías
const categories = [
  { id: 1, name: 'men\'s clothing', image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 2, name: 'women\'s clothing', image: 'https://images.pexels.com/photos/1039832/pexels-photo-1039832.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 3, name: 'electronics', image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
  { id: 4, name: 'jewelery', image: 'https://images.pexels.com/photos/145416/pexels-photo-145416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' },
];

const CategoryPage = () => {
  return (
    <div className="page-container">
      <h1 style={{ textAlign: 'center' }}>Categorías</h1>
      <p style={{ textAlign: 'center', color: '#ccc' }}>Descubre las últimas tendencias</p>
      
      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <Link to="/admin" className="btn btn-primary">Agregar Producto</Link>
      </div>

      <div className="category-grid">
        {categories.map(category => (
          // Usamos el componente CategoryCard aquí
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;