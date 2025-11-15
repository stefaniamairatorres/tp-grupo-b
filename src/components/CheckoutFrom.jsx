import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const CheckoutForm = ({ cart }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    // 🔢 Calcular total basado en los productos del carrito
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // 1️⃣ Crear PaymentIntent en el backend
            const res = await axios.post("/api/payment/create-payment-intent", {
                amount: total * 100 // Stripe trabaja en centavos
            });

            const clientSecret = res.data.clientSecret;

            // 2️⃣ Confirmar tarjeta
            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                },
            });

            if (result.error) {
                console.error(result.error.message);
                setLoading(false);
                alert("Error en el pago: " + result.error.message);
                return;
            }

            // 3️⃣ Pago exitoso
            if (result.paymentIntent.status === "succeeded") {
                window.location.href = "/success";
            }
        } catch (error) {
            console.error("Stripe error:", error);
            alert("Hubo un problema con el pago.");
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="stripe-form">
            <h3>Información de pago</h3>

            <div className="card-element-box">
                <CardElement />
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
