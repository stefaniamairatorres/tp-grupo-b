import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

// 🚨 CRÍTICO: Obtener la URL del Backend (Render)
// Esta variable DEBE estar configurada en Vercel como VITE_BACKEND_URL
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || import.meta.env.REACT_APP_BACKEND_URL;

const CheckoutForm = ({ cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    // 🔢 Calcular total basado en los productos del carrito
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // ** Verificación de URL **
        if (!BACKEND_URL) {
            console.error("ERROR CRÍTICO: La variable de entorno VITE_BACKEND_URL no está configurada en Vercel.");
            alert("No se puede conectar al servidor. Configuración de URL de API faltante.");
            setLoading(false);
            return;
        }

        if (!stripe || !elements) {
            console.error("Stripe no está inicializado.");
            alert("El servicio de Stripe no está disponible.");
            setLoading(false);
            return;
        }

        setLoading(true);

        try {
            // 1️⃣ Crear PaymentIntent en el backend
            // 🚨 USANDO RUTA ABSOLUTA DE RENDER
            const res = await axios.post(`${BACKEND_URL}/api/payment/create-payment-intent`, {
                amount: total // Stripe trabaja en centavos
            });

            const clientSecret = res.data.clientSecret;

            // 2️⃣ Confirmar tarjeta
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                console.error("Error de Stripe (Cliente):", result.error.message);
                alert("Error en el pago: " + result.error.message); 
                return;
            }

            // 3️⃣ Pago exitoso
            if (result.paymentIntent.status === "succeeded") {
                window.location.href = "/success";
            }
        } catch (error) {
            console.error("Error al llamar a la API de pago (Red/Backend):", error.message);
            alert("Hubo un problema al conectar con el servidor de pago. (Verifica URL y CORS)");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="stripe-form">
            <h3>Total a pagar: ${total.toFixed(2)}</h3>

            <div className="card-element-box">
                <CardElement 
                    options={{
                        style: {
                            base: {
                                fontSize: '16px',
                                color: '#424770',
                                '::placeholder': { color: '#aab7c4' },
                            },
                            invalid: { color: '#9e2146' },
                        },
                    }}
                />
            </div>

            <button
                disabled={!stripe || loading}
                className="pay-btn"
            >
                {loading ? "Procesando..." : `Pagar $${total.toFixed(2)}`}
            </button>
        </form>
    );
};

export default CheckoutForm;