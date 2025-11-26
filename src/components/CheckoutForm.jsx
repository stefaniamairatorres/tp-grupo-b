import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const CheckoutForm = ({ cart, user }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await axios.post(`${BACKEND_URL}/api/payment/create-payment-intent`, {
                amount: total
            });

            const clientSecret = res.data.clientSecret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: user?.name || "Cliente",
                        address: { postal_code: user?.postalCode || "0000" }
                    }
                }
            });

            if (result.error) {
                console.error(result.error.message);
            } else if (result.paymentIntent?.status === "succeeded") {
                window.location.href = "/success";
            }
        } catch (err) {
            console.error(err.message);
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h3>Total a pagar: {total.toFixed(2)}</h3>

            <CardElement
                options={{
                    style: {
                        base: { fontSize: "16px", color: "#424770" },
                        invalid: { color: "#9e2146" }
                    }
                }}
            />

            <button disabled={!stripe || loading}>
                {loading ? "Procesando..." : `Pagar $${total.toFixed(2)}`}
            </button>
        </form>
    );
};

export default CheckoutForm;
