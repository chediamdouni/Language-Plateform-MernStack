import axios from "axios";
import React, { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "src/Context/AuthContext";

export interface IUser {
  email: "";
  password: "";
}

export const LoginApprenant = () => {
  const navigate = useNavigate();
  const { setUser, setIsSignedIn, setLoading } = useContext(AuthContext);
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
        "http://localhost:5000/api/auth/login/apprenant",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log("Nouvel utilisateur:", response.data.user);
      const { success, message } = response.data;
      if (success) {
        handleSuccess(message);
        setUser(response.data.user);
        setIsSignedIn(true);
        setLoading(false);
        setTimeout(() => {
          navigate("/apprenant");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (e: any) {
      setLoading(false);
      const errorMessage =
        e.response?.data?.message || "Une erreur s'est produite";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center overflow-hidden px-2">
      <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
        <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-orange-300 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-center text-3xl font-bold text-gray-700">
            Sign in
          </h1>
          <p className="text-gray-500">Sign in to access your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="relative mt-2 w-full">
              <input
                type="email"
                name="email"
                value={email}
                placeholder=""
                onChange={handleOnChange}
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                required
              />
              <label
                htmlFor="email"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {" "}
                Enter Your Email{" "}
              </label>
            </div>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="password"
                name="password"
                value={password}
                placeholder=""
                onChange={handleOnChange}
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="password"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {" "}
                Enter Your Password
              </label>
            </div>
          </div>
          <div className="flex w-full items-center my-4">
            <button
              type="submit"
              className="shrink-0 inline-block w-36 rounded-lg bg-blue-600 py-3 font-bold text-white "
            >
              Login
            </button>
            <Link
              className="w-full text-center text-sm font-medium text-gray-600 hover:underline"
              to="#"
            >
              Forgot your password?
            </Link>
          </div>
          <p className="text-center text-gray-600 ">
            Don't have an account?
            <Link
              to="/Signup"
              className="whitespace-nowrap font-semibold text-gray-900 hover:underline px-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export const LoginTuteur = () => {
  const navigate = useNavigate();
  const { setUser, setIsSignedIn, setLoading } = useContext(AuthContext);
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
        "http://localhost:5000/api/auth/login/tuteur",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );
      console.log("Nouvel utilisateur:", response.data.user);
      const { success, message } = response.data;
      if (success) {
        handleSuccess(message);
        setUser(response.data.user);
        setIsSignedIn(true);
        setLoading(false);
        setTimeout(() => {
          navigate("tuteur/step/signup-checklist");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (e: any) {
      setLoading(false);
      const errorMessage =
        e.response?.data?.message || "Une erreur s'est produite";
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-screen items-center overflow-hidden px-2">
      <div className="relative flex w-96 flex-col space-y-5 rounded-lg border bg-white px-5 py-10 shadow-xl sm:mx-auto">
        <div className="-z-10 absolute top-4 left-1/2 h-full w-5/6 -translate-x-1/2 rounded-lg bg-orange-300 sm:-right-10 sm:top-auto sm:left-auto sm:w-full sm:translate-x-0"></div>
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-center text-3xl font-bold text-gray-700">
            Sign in
          </h1>
          <p className="text-gray-500">Sign in to access your account</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="relative mt-2 w-full">
              <input
                type="email"
                name="email"
                value={email}
                placeholder=""
                onChange={handleOnChange}
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
                required
              />
              <label
                htmlFor="email"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {" "}
                Enter Your Email{" "}
              </label>
            </div>
          </div>

          <div>
            <div className="relative mt-2 w-full">
              <input
                type="password"
                name="password"
                value={password}
                placeholder=""
                onChange={handleOnChange}
                className="border-1 peer block w-full appearance-none rounded-lg border border-gray-300 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-900 focus:border-blue-600 focus:outline-none focus:ring-0"
              />
              <label
                htmlFor="password"
                className="origin-[0] peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-blue-600 absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-white px-2 text-sm text-gray-500 duration-300"
              >
                {" "}
                Enter Your Password
              </label>
            </div>
          </div>
          <div className="flex w-full items-center my-4">
            <button
              type="submit"
              className="shrink-0 inline-block w-36 rounded-lg bg-blue-600 py-3 font-bold text-white "
            >
              Login
            </button>
            <Link
              className="w-full text-center text-sm font-medium text-gray-600 hover:underline"
              to="#"
            >
              Forgot your password?
            </Link>
          </div>
          <p className="text-center text-gray-600 ">
            Don't have an account?
            <Link
              to="/tuteur/inscription"
              className="whitespace-nowrap font-semibold text-gray-900 hover:underline px-1"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};
