import React from "react";
import "./ModalPagoExitoso.css";

const ModalPagoExitoso = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-card">
        <h2>¡Pago exitoso! 🎉</h2>
        <p>Gracias por tu compra. Tu pedido ha sido procesado correctamente.</p>

        <button onClick={onClose} className="btn-cerrar">
          Volver a la tienda
        </button>
      </div>
    </div>
  );
};

export default ModalPagoExitoso;
