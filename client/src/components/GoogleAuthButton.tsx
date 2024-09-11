import React from "react";
import { FaGoogle } from "react-icons/fa";

const GoogleAuthButton: React.FC = () => {
  const handleGoogleAuth = () => {
    window.location.href = "http://localhost:5000/api/auth/google";
  };

  return (
    <button
      onClick={handleGoogleAuth}
      className="flex items-center justify-center w-full px-4 py-2 mt-4 text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      <FaGoogle className="mr-2" />
      Se connecter avec Google
    </button>
  );
};

export default GoogleAuthButton;
