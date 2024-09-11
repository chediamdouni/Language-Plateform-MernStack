import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "src/Context/AuthContext";

const VerifyEmail: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);
  const { getLoggedInUser } = useContext(AuthContext);

  useEffect(() => {
    const token = searchParams.get("token");

    if (token) {
      axios
        .get(`http://localhost:5000/api/auth/verify-email?token=${token}`)
        .then(async (response) => {
          if (response.data.success) {
            setIsVerified(true);
            await getLoggedInUser();
            toast.success("Votre email a été vérifié avec succès !");
            setTimeout(() => {
              navigate("/apprenant/connexion");
            }, 5000);
          } else {
            toast.error("Le lien de vérification est invalide ou a expiré.");
          }
        })
        .catch((error) => {
          toast.error("Une erreur s'est produite lors de la vérification.");
          console.error(error);
        });
    } else {
      toast.error("Token de vérification manquant.");
    }
  }, [navigate, searchParams]);

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      {isVerified ? (
        <div className="text-center">
          <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Email vérifié avec succès !
          </h2>
          <p className="text-gray-600 mb-4">
            Vous pouvez maintenant accéder à votre compte en toute sécurité.
          </p>
          <p className="text-sm text-gray-500">
            Vous serez redirigé vers la page de connexion dans quelques
            secondes...
          </p>
        </div>
      ) : (
        <h2 className="text-lg font-semibold text-gray-800">
          Vérification de l'email en cours...
        </h2>
      )}
    </div>
  );
};

export default VerifyEmail;
