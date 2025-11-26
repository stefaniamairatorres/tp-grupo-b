import axios from "axios";

// URL del backend desde las variables de entorno
const API_URL = import.meta.env.VITE_BACKEND_URL;

// Crear PaymentIntent en el backend
export const createPaymentIntent = async (amount, userId) => {
  try {
    const response = await axios.post(`${API_URL}/api/payment/create-payment-intent`, {
      amount,
      userId
    });

    return response.data; // { clientSecret }
  } catch (error) {
    console.error("Error creando PaymentIntent:", error);
    throw error;
  }
};
