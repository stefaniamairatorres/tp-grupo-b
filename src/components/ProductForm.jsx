import React, { useState } from 'react';
import './ProductForm.css'; 

const ProductForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      // *** CORRECCIÓN CLAVE: Usamos 'name' en lugar de 'title' ***
      name: '', 
      price: '',
      description: '',
      category: '',
      image: '',
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convertimos el precio a número antes de enviar (por si acaso el backend lo espera así)
    const dataToSend = {
        ...formData,
        price: parseFloat(formData.price),
    };

    // La función onSave se encarga de llamar a la API
    onSave(dataToSend);
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          {/* *** CORRECCIÓN: El atributo 'htmlFor' y 'name' usan 'name' *** */}
          <label htmlFor="name">Título / Nombre</label>
          <input
            type="text"
            id="name"
            name="name" // Este es el campo que el backend de Express probablemente espera
            value={formData.name}
            onChange={handleChange}
            placeholder="Título del producto"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Precio"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Descripción detallada"
            rows="4"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Categoría</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Categoría (ej: electronics)"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">URL de la Imagen</label>
          <input
            type="text"
            id="image"
            name="image"
            value={formData.image}
            onChange={handleChange}
            placeholder="URL de la imagen del producto"
            required
          />
        </div>
        <div className="form-buttons">
          <button type="button" onClick={onCancel} className="btn-secondary">
            Cancelar
          </button>
          <button type="submit" className="btn-primary">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;