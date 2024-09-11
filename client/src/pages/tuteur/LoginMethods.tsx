import React from "react";
import TuteurLayout from "src/layouts/TuteurLayout";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";

const LoginMethods = () => {
  return (
    <TuteurLayout>
      <div className="max-w-3xl mx-auto p-8 bg-gray-900 text-gray-100 rounded-lg shadow-xl">
        <h1 className="text-4xl font-bold mb-8 text-center">
          Méthodes de connexion
        </h1>
        <div className="space-y-6">
          {[
            { name: "Facebook", icon: FaFacebook, color: "bg-blue-600" },
            { name: "Google", icon: FaGoogle, color: "bg-red-600" },
            { name: "Apple", icon: FaApple, color: "bg-gray-700" },
          ].map((method) => (
            <div
              key={method.name}
              className="flex items-center justify-between p-4 bg-gray-800 rounded-lg transition-all hover:bg-gray-700"
            >
              <div className="flex items-center space-x-4">
                <method.icon
                  className={`text-3xl ${method.color} p-2 rounded-full`}
                />
                <span className="text-xl font-semibold">{method.name}</span>
              </div>
              <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                Connecter
              </button>
            </div>
          ))}
        </div>
      </div>
    </TuteurLayout>
  );
};

export default LoginMethods;
