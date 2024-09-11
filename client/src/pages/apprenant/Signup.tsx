import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { AuthContext } from "src/Context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../../assets/images/logo.png";
import GoogleAuthButton from "../../components/GoogleAuthButton";
import { FaUserPlus, FaEnvelope, FaLock, FaUser } from "react-icons/fa";

interface formData {
  username: string;
  email: string;
  password: string;
}

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { setLoading } = useContext(AuthContext);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formData>();

  const handleError = (err: string) =>
    toast.error(err, {
      position: "bottom-left",
    });
  const handleSuccess = (msg: string) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const onSubmit = async (data: formData) => {
    const checkbox = document.getElementById("remember") as HTMLInputElement;
    console.log(checkbox.checked);
    if (!checkbox.checked) {
      toast.error("veuillez accepter les termes !", {
        position: "top-center",
      });
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup/apprenant",
        {
          ...data,
        },
        { withCredentials: true }
      );
      const { message } = response.data.message;
      if (response) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/apprenant/connexion");
        }, 1000);
        toast.success(
          "Un email de vérification a été envoyé. Veuillez vérifier votre boîte de réception."
        );
      } else {
        setLoading(false);
        handleError(message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col justify-center items-center p-4 md:p-8">
        <Link
          to="/"
          className="mb-8 flex items-center text-2xl font-bold text-indigo-700"
        >
          <img src={logo} alt="LearnUp Logo" className="h-12 mr-2" />
          <span>LearnUp</span>
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold text-indigo-800 mb-4 text-center">
          Bienvenue sur LearnUp
        </h1>
        <p className="text-xl text-indigo-600 mb-8 text-center max-w-md">
          Rejoignez notre communauté d'apprenants passionnés et commencez votre
          voyage éducatif dès aujourd'hui !
        </p>
      </div>

      <div className="flex-1 flex justify-center items-center p-4 md:p-8">
        <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            Créez votre compte
          </h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nom d'utilisateur
              </label>
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="username"
                  type="text"
                  {...register("username", {
                    required: "Le nom d'utilisateur est requis",
                  })}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Votre nom d'utilisateur"
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.username.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Adresse e-mail
              </label>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  {...register("email", {
                    required: "L'adresse e-mail est requise",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Adresse e-mail invalide",
                    },
                  })}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="vous@exemple.com"
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Mot de passe
              </label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  {...register("password", {
                    required: "Le mot de passe est requis",
                    minLength: {
                      value: 8,
                      message:
                        "Le mot de passe doit contenir au moins 8 caractères",
                    },
                  })}
                  className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="••••••••"
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label
                htmlFor="agree-terms"
                className="ml-2 block text-sm text-gray-700"
              >
                J'accepte les{" "}
                <Link
                  to="/terms"
                  className="text-indigo-600 hover:text-indigo-500"
                >
                  termes et conditions
                </Link>
              </label>
            </div>

            <button
              type="submit"
              disabled={!agreeTerms}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <FaUserPlus className="mr-2" /> S'inscrire
            </button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Ou inscrivez-vous avec
                </span>
              </div>
            </div>

            <div className="mt-6">
              <GoogleAuthButton />
            </div>
          </div>

          <p className="mt-8 text-center text-sm text-gray-600">
            Déjà membre ?{" "}
            <Link
              to="/apprenant/connexion"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Connectez-vous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
