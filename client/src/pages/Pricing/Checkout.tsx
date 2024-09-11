import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "src/Context/AuthContext";

const Checkout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { planType, selectedPlan, totalPrice } = location.state as any;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const createCheckoutSession = async () => {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/payment/create-checkout-session",
          {
            planType,
            selectedPlan,
            totalPrice,
            userId: user?.id,
          }
        );
        window.location.href = response.data.url;
      } catch (error) {
        console.error("Error creating checkout session:", error);
        setError(
          "Une erreur est survenue lors de la création de la session de paiement."
        );
      } finally {
        setIsLoading(false);
      }
    };

    createCheckoutSession();
  }, [planType, selectedPlan, totalPrice]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500 mx-auto"></div>
          <p className="mt-4 text-xl font-semibold text-indigo-600">
            Préparation de votre paiement...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition-colors"
          >
            Retour à la sélection du plan
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Checkout;
