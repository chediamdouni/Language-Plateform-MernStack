import React, { useEffect } from "react";
import {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";

import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export interface User {
  _id: string;
  username?: string;
  gender?: string;
  dateOfBirth: Date;
  password: string;
  email: string;
  roles: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProviderInterface {
  children?: ReactNode;
}

interface IAuthContext {
  isSignedIn: boolean;
  user: User | null;
  tutors: User[] | null;
  loading: boolean;
  handleSignout: () => void;
  setLoading: (value: SetStateAction<boolean>) => void;
  getLoggedInUser: () => void;
  updateUser: (data: FormData) => void;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
}
export const AuthContext = createContext<IAuthContext>({
  isSignedIn: false,
  user: null,
  tutors: null,
  loading: false,
  handleSignout: () => {},
  setLoading: (value: SetStateAction<boolean>) => {},
  getLoggedInUser: () => {},
  updateUser: (data: FormData) => {},
  setUser: () => {},
  setIsSignedIn: () => {},
});

export const AuthProvider: React.FC<ProviderInterface> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tutors, setTutors] = useState<User[] | null>(null);
  const navigate = useNavigate();

  const handleSignout = () => {
    removeCookie("jwt", { path: "/" });
    setIsSignedIn(false);
    setUser(null);
    navigate("/");
  };

  const getLoggedInUser = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:5000/api/auth/loggedInUser",
        {
          withCredentials: true,
        }
      );
      console.log("User Data", response.data.user);
      if (response.data.user) {
        setIsSignedIn(true);
        setUser(response.data.user);
      } else {
        setIsSignedIn(false);
        setUser(null);
        // navigate("/apprenant/connexion");
      }
    } catch (e) {
      console.log("Error fetching logged in user:", e);
      setIsSignedIn(false);
      setUser(null);
      // navigate("/apprenant/connexion");
    } finally {
      setLoading(false);
    }
  };
  const fetchTutors = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/tuteur/getAlltutors"
      );
      setTutors(response.data.tutors);
    } catch (error) {
      console.error("Error fetching tutors:", error);
    }
  };

  useEffect(() => {
    getLoggedInUser();
    fetchTutors();
  }, []);
  //  useEffect(() => {
  //   console.log("Cookies:", cookies);
  //   if (!cookies.jwt) {
  //     setLoading(false);
  //     setIsSignedIn(false);
  //     setUser(null);
  //     console.log("JWT token is missing");
  //     navigate("/");
  //     return;
  //   }

  //   console.log("JWT token is present");

  //   getLoggedInUser();
  // }, [cookies.jwt]);

  const updateUser = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/users/editUserProfile/${user?._id || ""}`,
        data
      );
      setUser(res.data);
    } catch (e) {
      console.log(e);
      alert("Something went wrong !! ");
    } finally {
      setLoading(false);
    }
  };
  const contextValue: IAuthContext = {
    isSignedIn,
    user,
    tutors,
    loading,
    handleSignout,
    setLoading,
    getLoggedInUser,
    updateUser,
    setUser,
    setIsSignedIn,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
