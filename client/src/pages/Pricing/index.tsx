import React, { useContext, useEffect, useState } from "react";
import person from "../../assets/images/default.png";
import exclamation from "../../assets/images/exclamation.png";
import logo from "../../assets/images/logo.png";
import group from "../../assets/images/group.png";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Tooltip, Typography } from "@material-tailwind/react";
import Halfhour from "./30min";
import OneHour from "./1heure";
import OneAndHalfHour from "./1.5heure";
import TwoHour from "./2heure";
import OneGroupe from "./groupe1";
import HalfGroupe from "./groupe0.5";
import DefaultComponent from "./DefaultComponent";
import { AuthContext } from "src/Context/AuthContext";

const Pricing = () => {
  const [totalPricePerMonth, setTotalPricePerMonth] = useState<number>(0);
  const [totalPricePerQuarter, setTotalPricePerQuarter] = useState<number>(0);
  const [totalPricePerYear, setTotalPricePerYear] = useState<number>(0);
  const [value, setValue] = useState<string>("");
  const [selectedCourses, setSelectedCourses] = useState("");
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setSelectedCourses(selectedValue);
    setValue(selectedValue);
  };

  const handleValuesChange = (
    monthly: number,
    quarter: number,
    annual: number
  ) => {
    setTotalPricePerMonth(monthly);
    setTotalPricePerQuarter(quarter);
    setTotalPricePerYear(annual);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center font-sans p-4">
      <div className="w-full max-w-5xl bg-white rounded-xl shadow-lg">
        <div className="p-6">
          <button
            className="mb-4 text-indigo-600 hover:text-indigo-800 transition-colors"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft size={20} />
          </button>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <img src={logo} alt="Logo" className="h-8 w-auto" />
              <h1 className="text-2xl font-bold text-gray-800">
                Créez votre abonnement personnalisé
              </h1>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Étape 1 */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-800">
                Étape 1 : Choisissez votre formule
              </h2>
              {/* Cours particuliers et en groupe */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                <div className="bg-indigo-50 p-3 flex items-center space-x-3">
                  <img src={person} alt="" className="h-10 w-10 rounded-full" />
                  <div>
                    <h3 className="font-semibold text-gray-800">
                      Cours particuliers et en groupe
                    </h3>
                    <p className="text-xs text-gray-600">
                      Accès aux cours particuliers et aux cours en groupe
                    </p>
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  {["30 minutes", "1 heure", "1.5 heures", "2 heures"].map(
                    (duration, index) => (
                      <label
                        key={duration}
                        className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                      >
                        <input
                          type="radio"
                          name="duration"
                          value={duration}
                          onChange={handleRadioChange}
                          className="form-radio text-indigo-600 h-4 w-4"
                        />
                        <span className="ml-2 text-sm text-gray-700">
                          {duration}/semaine
                        </span>
                        {index === 1 && (
                          <span className="ml-auto text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-0.5 rounded-full">
                            Le plus populaire
                          </span>
                        )}
                      </label>
                    )
                  )}
                </div>
                <div className="bg-indigo-50 p-4 flex items-center space-x-3">
                  <img src={exclamation} alt="" className="h-6 w-6" />
                  <p className="text-sm text-gray-600">
                    {value || "Choisissez une durée"}
                  </p>
                </div>
              </div>
              {/* Cours en groupe */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="bg-indigo-100 p-4 flex items-center space-x-4">
                  <img src={group} alt="" className="h-12 w-12 rounded-full" />
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">
                      Cours en groupe
                    </h3>
                    <p className="text-sm text-gray-600">
                      Cours en groupe seulement (pour les plus de 21 ans)
                    </p>
                  </div>
                </div>
                <div className="p-4 space-y-2">
                  {["30 minutes", "1 heure"].map((duration, index) => (
                    <label
                      key={duration}
                      className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="group-duration"
                        value={`groupe${index + 1}`}
                        onChange={handleRadioChange}
                        className="form-radio text-indigo-600 h-5 w-5"
                      />
                      <span className="ml-3 text-gray-700">
                        {duration}/semaine
                      </span>
                      {index === 1 && (
                        <span className="ml-auto text-xs font-semibold text-green-600 bg-green-100 px-2 py-1 rounded-full">
                          Meilleur prix
                        </span>
                      )}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            {/* Étape 2 */}
            <div>
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                Étape 2 : Choisissez votre abonnement
              </h2>
              {selectedCourses === "30 minutes" && (
                <Halfhour onValuesChange={handleValuesChange} />
              )}
              {selectedCourses === "1 heure" && (
                <OneHour onValuesChange={handleValuesChange} />
              )}
              {selectedCourses === "1.5 heures" && (
                <OneAndHalfHour onValuesChange={handleValuesChange} />
              )}
              {selectedCourses === "2 heures" && (
                <TwoHour onValuesChange={handleValuesChange} />
              )}
              {selectedCourses === "groupe1" && (
                <HalfGroupe onValuesChange={handleValuesChange} />
              )}
              {selectedCourses === "groupe2" && (
                <OneGroupe onValuesChange={handleValuesChange} />
              )}
              {!selectedCourses && <DefaultComponent />}
            </div>
          </div>
          {/* Résumé de l'abonnement */}
          <div className="mt-8 bg-indigo-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Résumé de l'abonnement
            </h3>
            <div className="flex justify-between items-center">
              <span className="font-bold text-gray-700">Total (en USD)</span>
              <div className="space-y-1">
                {totalPricePerMonth > 0 && (
                  <div className="text-right">
                    Prix mensuel: {totalPricePerMonth} $
                  </div>
                )}
                {totalPricePerQuarter > 0 && (
                  <div className="text-right">
                    Prix trimestriel: {totalPricePerQuarter} $
                  </div>
                )}
                {totalPricePerYear > 0 && (
                  <div className="text-right">
                    Prix annuel: {totalPricePerYear} $
                  </div>
                )}
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between bg-white rounded-full p-3">
              <div className="flex items-center space-x-2">
                <svg
                  className="h-5 w-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-medium text-gray-700">
                  Achetez en toute confiance : Annulez quand vous le souhaitez
                </span>
              </div>
              <Tooltip content="Annulez à tout moment et payez le prix mensuel de base selon le nombre de mois choisis">
                <svg
                  className="h-5 w-5 text-gray-400 cursor-help"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </Tooltip>
            </div>
            <p className="mt-4 text-sm text-gray-500 text-center">
              L'abonnement est renouvelé tous les 12 mois. Résiliez à tout
              moment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
