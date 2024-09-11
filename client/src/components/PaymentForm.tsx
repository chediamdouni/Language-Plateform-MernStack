import React, { useContext, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "src/Context/AuthContext";

interface PaymentFormProps {
  amount: number;
  selectedPlan: {
    name: string;
    price: number;
    period: string;
    duration?: string;
  };
}

const PaymentForm: React.FC<PaymentFormProps> = ({ amount, selectedPlan }) => {
  const stripe = useStripe();
  const { user } = useContext(AuthContext);
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setIsLoading(false);
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/payment/create-payment-intent",
        {
          amount,
          currency: "usd",
        }
      );

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(data.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement)!,
          },
        });

      if (stripeError) {
        setError(
          stripeError.message || "Une erreur est survenue lors du paiement."
        );
      } else if (paymentIntent.status === "succeeded") {
        console.log("Paiement réussi !");
        toast.success("Paiement réussi !");
        await axios.post(
          "http://localhost:5000/api/payment/send-confirmation",
          {
            userId: user?.id, // Assuming you have access to the user object
            planDetails: {
              name: selectedPlan.name,
              price: selectedPlan.price,
              period: selectedPlan.period,
              duration: selectedPlan.duration, // You might need to add this to your plan object
            },
          }
        );
        toast.success("Consulter votre courrier pour plus de détails !");
        navigate("/apprenant");
      }
    } catch (error) {
      setError(
        "Une erreur est survenue lors de la communication avec le serveur."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <CardElement className="p-3 border rounded-md" />
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <button
        type="submit"
        disabled={!stripe || isLoading}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:opacity-50"
      >
        {isLoading ? "Traitement en cours..." : "Payer"}
      </button>
    </form>
  );
};

export default PaymentForm;
