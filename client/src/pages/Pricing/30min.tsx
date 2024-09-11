import React, { useState, useEffect } from "react";
import { FaCheck, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface HalfhourProps {
  onValuesChange: (monthly: number, quarter: number, annual: number) => void;
}

const Halfhour: React.FC<HalfhourProps> = ({ onValuesChange }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly");
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const navigate = useNavigate();
  const plans = [
    { id: "monthly", name: "Mensuel", price: 99, period: "/ mois" },
    {
      id: "quarterly",
      name: "Trimestriel",
      price: 89,
      period: "/ mois",
      savings: "Économisez 10%",
    },
    {
      id: "annual",
      name: "Annuel",
      price: 79,
      period: "/ mois",
      savings: "Économisez 20%",
    },
  ];

  useEffect(() => {
    calculatePrice(selectedPlan);
  }, [selectedPlan]);

  const calculatePrice = (planId: string) => {
    let monthly = 0,
      quarterly = 0,
      annual = 0;

    switch (planId) {
      case "monthly":
        monthly = 99 * 12;
        setTotalPrice(monthly);
        break;
      case "quarterly":
        quarterly = Math.round(89 * 12 * 0.9);
        setTotalPrice(quarterly);
        break;
      case "annual":
        annual = Math.round(79 * 12 * 0.8);
        setTotalPrice(annual);
        break;
    }

    onValuesChange(monthly, quarterly, annual);
  };

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleNextStep = () => {
    const selectedPlanDetails = plans.find((plan) => plan.id === selectedPlan);
    navigate("/checkout", {
      state: {
        planType: "demi heure",
        selectedPlan: selectedPlanDetails,
        totalPrice: totalPrice,
      },
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-indigo-600 p-4 text-white">
        <h3 className="text-xl font-semibold">30 minutes par semaine</h3>
        <p className="text-indigo-200">Choisissez votre plan d'abonnement</p>
      </div>
      <div className="p-6 space-y-4">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`flex items-center justify-between p-4 rounded-lg cursor-pointer transition-all ${
              selectedPlan === plan.id
                ? "bg-indigo-50 border-2 border-indigo-500"
                : "bg-gray-50 hover:bg-gray-100"
            }`}
            onClick={() => handlePlanChange(plan.id)}
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.id
                    ? "border-indigo-500 bg-indigo-500"
                    : "border-gray-300"
                }`}
              >
                {selectedPlan === plan.id && (
                  <FaCheck className="text-white text-xs" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">{plan.name}</h4>
                {plan.savings && (
                  <p className="text-sm text-green-600">{plan.savings}</p>
                )}
              </div>
            </div>
            <div className="text-right">
              <span className="text-2xl font-bold text-gray-800">
                ${plan.price}
              </span>
              <span className="text-gray-500 text-sm">{plan.period}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-50 p-4 border-t border-gray-200">
        <ul className="space-y-2">
          <li className="flex items-center text-sm text-gray-600">
            <FaCheck className="text-green-500 mr-2" /> Accès à tous les cours
            particuliers
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <FaCheck className="text-green-500 mr-2" /> Accès à tous les cours
            en groupe
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <FaCheck className="text-green-500 mr-2" /> Support prioritaire
          </li>
        </ul>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <span className="font-bold text-gray-700">Total (en USD)</span>
          <span className="text-xl font-bold text-indigo-600">
            ${totalPrice}
          </span>
        </div>
        <button
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center hover:bg-indigo-700 transition-colors"
          onClick={handleNextStep}
        >
          {" "}
          Étape suivante : mode de paiement
          <FaArrowRight className="ml-2" />
        </button>
      </div>
    </div>
  );
};

export default Halfhour;
