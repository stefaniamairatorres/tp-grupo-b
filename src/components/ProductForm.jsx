import React, { useState } from 'react';
import './ProductForm.css'; // Lo crearemos en el siguiente paso

const ProductForm = ({ initialData, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    initialData || {
      title: '',
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
    onSave(formData);
  };

  return (
    <div className="product-form-container">
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
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