import React, { useState } from "react";
import ModalPagoExitoso from "../components/ModalPagoExitoso";

const Checkout = () => {
  const [pagoExitoso, setPagoExitoso] = useState(false);

  const handleSimularPago = () => {
    // Simulación de procesamiento (1.5 segundos)
    setTimeout(() => {
      setPagoExitoso(true);
      localStorage.removeItem("cart"); // Limpia el carrito si lo guardás en localStorage
    }, 1500);
  };

  return (
    <>
      <div className="checkout-container">

        {/* Título */}
        <h1 className="checkout-title">Checkout</h1>

        {/* 📝 FORMULARIO DE ENVÍO (tu contenido actual queda igual) */}
        <div className="checkout-left">
          <h2>Datos de Envío</h2>
          {/* aquí sigue tu formulario, no lo toco */}
        </div>

        {/* 💳 SECCIÓN DE PAGO */}
        <div className="checkout-right">
          <div className="payment-box">
            <h2>Información de pago</h2>

            {/* Simulación de pago */}
            <button className="btn-pagar" onClick={handleSimularPago}>
              Pagar $500.00
            </button>
          </div>
        </div>
      </div>

      {/* 🟢 MODAL de pago exitoso */}
      {pagoExitoso && (
        <ModalPagoExitoso 
          onClose={() => (window.location.href = "/")}
        />
      )}
    </>
  );
};

export default Checkout;
