import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

// Usar la URL del backend desde el .env
const API_BASE_URL = import.meta.env.VITE_API_URL;

const SuccessPage = () => {
  const location = useLocation();
  const { clearCart, cartItems } = useCart();
  const { user } = useAuth();
  const [isProcessing, setIsProcessing] = useState(true);
  const [statusMessage, setStatusMessage] = useState("Procesando tu compra...");
  const [isSaved, setIsSaved] = useState(false);

  // Función para guardar la compra en la base de datos
  const savePurchase = async (paymentId, status, externalReference) => {
    try {
      if (!API_BASE_URL) throw new Error("VITE_API_URL no está definido");

      await axios.post(`${API_BASE_URL}/api/purchases`, {
        userId: externalReference || user?.id,
        paymentId,
        status,
        items: cartItems,
        totalAmount: cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0),
      });

      setIsSaved(true);
      clearCart();
      setStatusMessage("¡Compra registrada y carrito vaciado con éxito!");
    } catch (error) {
      console.error("Error al guardar la compra:", error);
      setStatusMessage(
        "¡Pago aprobado! Pero hubo un error al registrar la compra en la base de datos."
      );
    }
  };

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const status = params.get('status');       // "approved"
    const paymentId = params.get('payment_id'); // ID del pago
    const externalReference = params.get('external_reference'); // userId

    if (status === 'approved' && paymentId) {
      setStatusMessage("Pago aprobado. Finalizando proceso...");
      savePurchase(paymentId, status, externalReference);
    } else {
      setStatusMessage("Error: Parámetros de éxito incompletos. Revisa tu backend.");
    }

    setIsProcessing(false);
  }, [location.search]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-lg w-full">
        <svg
          className="w-20 h-20 text-green-500 mx-auto mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h1 className="text-3xl font-bold text-green-700 mb-2">¡Pago Exitoso!</h1>
        <p className={`text-lg mb-6 ${isSaved ? 'text-green-600' : 'text-yellow-600'}`}>
          {statusMessage}
        </p>

        {!isProcessing && (
          <div className="space-y-4">
            <Link
              to="/products"
              className="inline-block w-full px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-150 ease-in-out"
            >
              Seguir Comprando
            </Link>
            <Link
              to="/profile/purchases"
              className="inline-block w-full px-6 py-3 border border-blue-600 text-base font-medium rounded-md text-blue-600 bg-white hover:bg-blue-50 transition duration-150 ease-in-out"
            >
              Ver Mis Compras
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default SuccessPage;
