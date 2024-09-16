import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "src/Context/AuthContext";
import { useForm } from "react-hook-form";
import {
  Input,
  Button,
  Card,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import logo from "../../assets/images/logo.png";
const apiUrl = process.env.REACT_APP_API_URL;
interface FormData {
  username: string;
  email: string;
  password: string;
}

const SignupTuteur: React.FC = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(AuthContext);
  const [agreeTerms, setAgreeTerms] = useState<boolean>(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    if (!agreeTerms) {
      toast.error("Veuillez accepter les conditions d'utilisation");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${apiUrl}/auth/signup/tuteur`, data, {
        withCredentials: true,
      });
      toast.success(response.data.message);
      setTimeout(() => {
        navigate("/tuteur/connexion");
      }, 1000);
    } catch (error) {
      setLoading(false);
      toast.error("Une erreur est survenue lors de l'inscription");
      console.error(error);
    }
  };

  const handleInvite = () => {
    // Logique pour inviter un collègue
    toast.success(`Invitation envoyée à ${inviteEmail}`);
    setInviteEmail("");
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="m-auto bg-white rounded-xl shadow-xl overflow-hidden max-w-5xl w-full">
        <div className="flex flex-col md:flex-row">
          {/* Partie gauche */}
          <div className="md:w-2/5 bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white flex flex-col justify-between">
            <div>
              <img src={logo} alt="LearnUp Logo" className="h-10 mb-12" />
              <Typography variant="h3" className="mb-4 font-bold">
                Devenez un tuteur d'exception
              </Typography>
              <Typography variant="lead" className="mb-6">
                Partagez votre savoir et inspirez la prochaine génération
                d'apprenants
              </Typography>
            </div>
            <Typography className="text-blue-200 italic text-sm">
              "L'éducation est l'arme la plus puissante pour changer le monde."
              - Nelson Mandela
            </Typography>
          </div>

          {/* Partie droite - Formulaire */}
          <div className="md:w-3/5 p-8">
            <Typography
              variant="h4"
              className="mb-4 text-center font-bold text-gray-800"
            >
              Créez votre compte tuteur
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="relative">
                <Input
                  size="lg"
                  label=""
                  {...register("username", {
                    required: "Ce champ est obligatoire",
                  })}
                  error={Boolean(errors.username)}
                  className="pr-10"
                  icon={
                    <FaUser className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-600" />
                  }
                />
                {errors.username && (
                  <Typography color="red" className="mt-1 text-xs">
                    {errors.username.message}
                  </Typography>
                )}
              </div>

              <div className="relative">
                <Input
                  size="lg"
                  type="email"
                  label=""
                  {...register("email", {
                    required: "Ce champ est obligatoire",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Adresse email invalide",
                    },
                  })}
                  error={Boolean(errors.email)}
                  className="pr-10"
                  icon={
                    <FaEnvelope className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-600" />
                  }
                />
                {errors.email && (
                  <Typography color="red" className="mt-1 text-xs">
                    {errors.email.message}
                  </Typography>
                )}
              </div>

              <div className="relative">
                <Input
                  size="lg"
                  type="password"
                  label=""
                  {...register("password", {
                    required: "Ce champ est obligatoire",
                    minLength: {
                      value: 8,
                      message:
                        "Le mot de passe doit comporter au moins 8 caractères",
                    },
                  })}
                  error={Boolean(errors.password)}
                  className="pr-10"
                  icon={
                    <FaLock className="absolute top-1/2 right-3 transform -translate-y-1/2 text-blue-600" />
                  }
                />
                {errors.password && (
                  <Typography color="red" className="mt-1 text-xs">
                    {errors.password.message}
                  </Typography>
                )}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                />
                <Typography color="gray" className="text-sm ml-3">
                  J'accepte les{" "}
                  <Link to="/terms" className="text-blue-600 hover:underline">
                    conditions d'utilisation
                  </Link>
                </Typography>
              </div>

              <Button
                type="submit"
                className="w-[20rem] bg-blue-600 hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 p-3 mx-auto"
                size="lg"
                ripple={true}
                disabled={!agreeTerms}
              >
                <FaUserPlus className="text-lg" />
                S'inscrire
              </Button>
            </form>

            <div className="mt-6">
              <Typography color="gray" className="mb-2 text-sm font-medium">
                Invitez vos collègues à rejoindre la plateforme
              </Typography>
              <div className="flex items-center space-x-2 bg-gray-100 p-2 rounded-lg">
                <Input
                  size="lg"
                  label="Email du collègue"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  className="bg-transparent border-none"
                  containerProps={{ className: "min-w-[200px]" }}
                />
                <Button
                  color="blue"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={handleInvite}
                >
                  <FaUserPlus />
                  Inviter
                </Button>
              </div>
            </div>

            <Typography color="gray" className="mt-4 text-center text-sm">
              Déjà un compte ?{" "}
              <Link
                to="/tuteur/connexion"
                className="text-blue-600 hover:underline font-medium"
              >
                Se connecter
              </Link>
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupTuteur;
