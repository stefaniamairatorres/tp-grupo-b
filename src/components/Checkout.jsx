import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useCart } from "../context/CartContext.jsx";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export default function Checkout() {
    const { getTotalPrice } = useCart();
    const total = getTotalPrice();

    return (
        <div className="checkout-container">
            <h1>Checkout</h1>

            <Elements stripe={stripePromise}>
                <CheckoutForm total={total} />
            </Elements>
        </div>
    );
}
