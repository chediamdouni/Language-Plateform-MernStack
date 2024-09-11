import React, { useState, useEffect } from "react";
import { FaCheck, FaArrowRight, FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface TwoHourProps {
  onValuesChange: (monthly: number, quarter: number, annual: number) => void;
}

const TwoHour: React.FC<TwoHourProps> = ({ onValuesChange }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("monthly");
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();
  const plans = [
    { id: "monthly", name: "Mensuel", price: 149, period: "/ mois" },
    {
      id: "quarter",
      name: "Trimestriel",
      price: 134,
      period: "/ mois",
      savings: "10% de réduction",
    },
    {
      id: "annual",
      name: "Annuel",
      price: 112,
      period: "/ mois",
      savings: "25% de réduction",
    },
  ];

  useEffect(() => {
    calculatePrice(selectedPlan);
  }, [selectedPlan]);

  const calculatePrice = (selectedValue: string) => {
    let TotalpricePerMonth = 0;
    let TotalpricePerQuarter = 0;
    let TotalpricePerYear = 0;

    switch (selectedValue) {
      case "monthly":
        TotalpricePerMonth = 149 * 12;
        setTotalPrice(TotalpricePerMonth);
        break;
      case "quarter":
        TotalpricePerQuarter = Math.round(134 * 12 * 0.9);
        setTotalPrice(TotalpricePerQuarter);
        break;
      case "annual":
        TotalpricePerYear = Math.round(112 * 12 * 0.75);
        setTotalPrice(TotalpricePerYear);
        break;
    }

    onValuesChange(TotalpricePerMonth, TotalpricePerQuarter, TotalpricePerYear);
  };

  const handlePlanChange = (planId: string) => {
    setSelectedPlan(planId);
  };
  const handleNextStep = () => {
    const selectedPlanDetails = plans.find((plan) => plan.id === selectedPlan);
    navigate("/checkout", {
      state: {
        planType: "2 heures",
        selectedPlan: selectedPlanDetails,
        totalPrice: totalPrice,
      },
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-indigo-600 p-4 text-white relative">
        <h3 className="text-xl font-semibold">2 heures par semaine</h3>
        <p className="text-indigo-200">Choisissez votre plan d'abonnement</p>
        <div className="absolute top-0 right-0 bg-yellow-400 text-indigo-900 py-1 px-3 rounded-bl-lg font-semibold flex items-center">
          <FaStar className="mr-1" /> Populaire
        </div>
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
                  <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                    {plan.savings}
                  </span>
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
            <FaCheck className="text-green-500 mr-2" /> Accès illimité à tous
            les cours particuliers
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <FaCheck className="text-green-500 mr-2" /> Accès illimité à tous
            les cours en groupe
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <FaCheck className="text-green-500 mr-2" /> Support prioritaire 24/7
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <FaCheck className="text-green-500 mr-2" /> Sessions intensives pour
            un progrès rapide
          </li>
          <li className="flex items-center text-sm text-gray-600">
            <FaCheck className="text-green-500 mr-2" /> Matériel pédagogique
            premium inclus
          </li>
        </ul>
      </div>
      <div className="p-4 bg-gray-50 border-t border-gray-200">
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

export default TwoHour;
