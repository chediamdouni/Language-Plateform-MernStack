import axios from "axios";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Input, Button, Card, Typography } from "@material-tailwind/react";

import { AuthContext } from "src/Context/AuthContext";
import logo from "../../assets/images/logo.png";
import GoogleAuthButton from "../../components/GoogleAuthButton";
import { FaEnvelope, FaLock } from "react-icons/fa6";

export interface IUser {
  email: "";
  password: "";
}

const apiUrl = process.env.REACT_APP_API_URL;

export const LoginApprenant = () => {
  const navigate = useNavigate();
  const { setUser, setIsSignedIn, setLoading, setStreamToken } =
    useContext(AuthContext);

  const [inputValue, setInputValue] = useState<IUser>({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err: string) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg: string) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      // validation des donnees
      const response = await axios.post(
        `${apiUrl}/auth/login/apprenant`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log("utilisateur:", response.data);
      const { message } = response.data.message;
      if (response) {
        handleSuccess(message);
        setUser(response.data.user);
        setStreamToken(response.data.streamToken);
        setIsSignedIn(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/apprenant/profile");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (e: any) {
      setLoading(false);
      const errorMessage =
        e.response?.data?.message || "Veuillez verifier votre compte ";
      handleError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="LearnUp Logo" className="h-16" />
        </div>
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
          Connexion Apprenant
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <Input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                required
                size="lg"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="vous@exemple.com"
              />
            </div>
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
              <Input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={handleOnChange}
                required
                size="lg"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>
          <Button type="submit" color="blue" ripple className="w-full">
            Se connecter
          </Button>
        </form>
        <div className="mt-6">
          <GoogleAuthButton />
        </div>
        <Typography color="gray" className="mt-4 text-center">
          <Link to="#" className="text-blue-500 hover:underline">
            Mot de passe oublié ?
          </Link>
        </Typography>
        <Typography color="gray" className="mt-4 text-center">
          Pas encore de compte ?{" "}
          <Link
            to="/apprenant/inscription"
            className="text-blue-500 hover:underline"
          >
            S'inscrire
          </Link>
        </Typography>
      </Card>
    </div>
  );
};

// Login Tuteur

export const LoginTuteur = () => {
  const navigate = useNavigate();
  const { setUser, setIsSignedIn, setLoading, setStreamToken } =
    useContext(AuthContext);

  const [inputValue, setInputValue] = useState<IUser>({
    email: "",
    password: "",
  });

  const { email, password } = inputValue;

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err: string) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg: string) =>
    toast.success(msg, {
      position: "bottom-left",
    });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      // validation des donnees
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/auth/login/tuteur`,
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      const { message } = response.data.message;
      if (response) {
        handleSuccess(message);
        setUser(response.data.user);
        setStreamToken(response.data.streamToken);
        setIsSignedIn(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/tuteur/welcome");
        }, 1000);
      } else {
        handleError(message);
        setLoading(false);
        navigate("/tuteur/connexion");
      }
    } catch (e: any) {
      setLoading(false);
      const errorMessage =
        e.response?.data?.message || "Une erreur s'est produite";
      alert(errorMessage);
      navigate("/tuteur/connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 to-teal-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-xl">
        <div className="flex justify-center mb-8">
          <img src={logo} alt="LearnUp Logo" className="h-16" />
        </div>
        <Typography variant="h4" color="blue-gray" className="mb-4 text-center">
          Connexion Tuteur
        </Typography>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
              <Input
                id="email"
                type="email"
                name="email"
                value={email}
                onChange={handleOnChange}
                required
                size="lg"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="vous@exemple.com"
              />
            </div>
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
              <Input
                id="password"
                type="password"
                name="password"
                value={password}
                onChange={handleOnChange}
                required
                size="lg"
                className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="••••••••"
              />
            </div>
          </div>
          <Button type="submit" color="blue" ripple className="w-full">
            Se connecter
          </Button>
        </form>
        <div className="mt-6">
          <GoogleAuthButton />
        </div>
        <Typography color="gray" className="mt-4 text-center">
          <Link to="#" className="text-teal-500 hover:underline">
            Mot de passe oublié ?
          </Link>
        </Typography>
        <Typography color="gray" className="mt-4 text-center">
          Pas encore de compte ?{" "}
          <Link
            to="/tuteur/inscription"
            className="text-teal-500 hover:underline"
          >
            S'inscrire
          </Link>
        </Typography>
      </Card>
    </div>
  );
};
