import React from "react";
import TuteurLayout from "src/layouts/TuteurLayout";
import { FaGlobe, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const Settings = () => {
  return (
    <TuteurLayout>
      <div className="max-w-4xl mx-auto p-8 bg-gray-900 text-gray-100 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-8">Paramètres</h1>
        <div className="space-y-6">
          {[ 
            { icon: FaGlobe, label: "Langue", type: "select", options: ["Français", "English", "Deutsch", "Español"] },
            { icon: FaMapMarkerAlt, label: "Localisation actuelle", type: "select", options: ["France", "Canada", "États-Unis", "Allemagne"] },
            { icon: FaClock, label: "Fuseau horaire", type: "text", value: "Europe/Paris" },
          ].map((setting) => (
            <div key={setting.label} className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
              <setting.icon className="text-2xl text-indigo-400" />
              <div className="flex-grow">
                <label className="block text-sm font-medium text-gray-400">{setting.label}</label>
                {setting.type === "select" ? (
                  <select className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-700 bg-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md">
                    {setting.options?.map((option) => (
                      <option key={option}>{option}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type="text"
                    value={setting.value}
                    readOnly
                    className="mt-1 block w-full px-3 py-2 bg-gray-700 border border-gray-700 rounded-md text-gray-300 focus:outline-none"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
        <button className="mt-8 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
          Enregistrer les modifications
        </button>
      </div>
    </TuteurLayout>
  );
};

export default Settings;
