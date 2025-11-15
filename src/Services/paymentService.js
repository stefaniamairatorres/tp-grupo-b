import axios from "axios";

// URL del backend desde las variables de entorno
const API_URL = import.meta.env.VITE_BACKEND_URL;

// Crear preferencia de pago en el backend
export const createPreference = async (items, userId) => {
  try {
    const response = await axios.post(`${API_URL}/api/payment/create-preference`, {
      items,
      userId
    });

    return response.data; // { id, init_point }
  } catch (error) {
    console.error("Error creando la preferencia:", error);
    throw error;
  }
};
