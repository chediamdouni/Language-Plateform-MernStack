import React from "react";
import { FaCheck, FaClock, FaUsers, FaGraduationCap } from "react-icons/fa";

const DefaultComponent: React.FC = () => {
  const plans = [
    { name: "Mensuel", price: 49, period: "/ mois" },
    { name: "Trimestriel", price: 44, period: "/ mois", savings: "10% de réduction" },
    { name: "Annuel", price: 37, period: "/ mois", savings: "25% de réduction" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="bg-indigo-600 p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">Choisissez votre abonnement</h2>
        <p className="text-indigo-200">Sélectionnez d'abord une durée de cours, puis un plan d'abonnement</p>
      </div>
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div key={plan.name} className="bg-gray-50 rounded-lg p-4 text-center hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-gray-800 mb-2">{plan.name}</h3>
              <div className="text-3xl font-bold text-indigo-600 mb-1">${plan.price}<span className="text-sm text-gray-500">{plan.period}</span></div>
              {plan.savings && (
                <span className="text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                  {plan.savings}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="bg-gray-50 rounded-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Caractéristiques de l'abonnement</h3>
          <ul className="space-y-3">
            <li className="flex items-center text-gray-600">
              <FaClock className="text-indigo-500 mr-3" />
              <span>Choisissez parmi différentes durées de cours hebdomadaires</span>
            </li>
            <li className="flex items-center text-gray-600">
              <FaUsers className="text-indigo-500 mr-3" />
              <span>Accès aux cours particuliers et en groupe</span>
            </li>
            <li className="flex items-center text-gray-600">
              <FaGraduationCap className="text-indigo-500 mr-3" />
              <span>Matériel pédagogique de qualité inclus</span>
            </li>
            <li className="flex items-center text-gray-600">
              <FaCheck className="text-green-500 mr-3" />
              <span>Annulation flexible : résiliez à tout moment</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-gray-50 p-6 border-t border-gray-200">
        <p className="text-center text-gray-600">
          Sélectionnez une durée de cours ci-dessus pour voir les options d'abonnement détaillées et les tarifs spécifiques.
        </p>
      </div>
    </div>
  );
};

export default DefaultComponent;
