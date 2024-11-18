import React, { useContext, useEffect } from "react";
import { AuthContext } from "src/Context/AuthContext";
import {
  FiUser,
  FiLock,
  FiSettings,
  FiBell,
  FiCalendar,
  FiChevronRight,
} from "react-icons/fi";
import TuteurLayout from "src/layouts/TuteurLayout";
import { Link, useNavigate } from "react-router-dom";

const AccountSettings = () => {
  const { user, getLoggedInUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const settingsOptions = [
    {
      icon: FiUser,
      title: "Account",
      description: "Gérez vos informations personnelles",
      link: "/tuteur/account",
    },
    {
      icon: FiLock,
      title: "Méthodes de connexion",
      description: "Sécurisez votre compte",
      link: "/tuteur/multiple-connexion",
    },
    {
      icon: FiSettings,
      title: "Paramètres",
      description: "Personnalisez votre expérience",
      link: "/tuteur/settings",
    },
    {
      icon: FiBell,
      title: "Notifications",
      description: "Gérez vos préférences de notification",
      link: "/inbox",
    },
    {
      icon: FiCalendar,
      title: "Calendrier",
      description: "Synchronisez votre agenda",
      link: "/tuteur/calendar-preferences",
    },
  ];

  return (
    <TuteurLayout>
      <div className="min-h-screen bg-gray-900 text-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold mb-8 text-blue-400">
            Paramètres du compte
          </h1>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {settingsOptions.map((option, index) => (
              <Link
                key={index}
                to={option.link}
                className="bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:bg-gray-750"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-500 bg-opacity-20 rounded-full">
                    <option.icon className="w-6 h-6 text-blue-400" />
                  </div>
                  <FiChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold mb-2 text-gray-100">
                  {option.title}
                </h2>
                <p className="text-gray-400">{option.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </TuteurLayout>
  );
};
export default AccountSettings;
