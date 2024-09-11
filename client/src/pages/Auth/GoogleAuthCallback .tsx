import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "src/Context/AuthContext";

const GoogleAuthCallback: React.FC = () => {
  const navigate = useNavigate();
  const { getLoggedInUser } = useContext(AuthContext);

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        await getLoggedInUser();
        navigate("/apprenant");
      } catch (error) {
        console.error("Erreur lors de l'authentification Google", error);
        navigate("/apprenant/connexion");
      }
    };

    handleGoogleCallback();
  }, [getLoggedInUser, navigate]);

  return <div>Chargement...</div>;
};

export default GoogleAuthCallback;
