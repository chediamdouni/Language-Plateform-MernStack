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
import { StreamChat } from "stream-chat";
import { jwtDecode } from "jwt-decode";

const apiKey = "mmhfdzb5evj2";
// const client = StreamChat.getInstance(apiKey);
export interface User {
  id: string;
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
  streamToken: string | null;
  handleSignout: () => void;
  setLoading: (value: SetStateAction<boolean>) => void;
  getLoggedInUser: () => void;
  updateUser: (data: FormData) => void;
  setUser: Dispatch<SetStateAction<User | null>>;
  setIsSignedIn: Dispatch<SetStateAction<boolean>>;
  setStreamToken: Dispatch<SetStateAction<string | null>>;
}

export const AuthContext = createContext<IAuthContext>({
  isSignedIn: false,
  user: null,
  tutors: null,
  loading: false,
  streamToken: null,
  handleSignout: () => {},
  setLoading: (value: SetStateAction<boolean>) => {},
  getLoggedInUser: () => {},
  updateUser: (data: FormData) => {},
  setUser: () => {},
  setIsSignedIn: () => {},
  setStreamToken: () => {},
});

export const AuthProvider: React.FC<ProviderInterface> = ({ children }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["bearerToken"]);
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [tutors, setTutors] = useState<User[] | null>(null);
  const [streamToken, setStreamToken] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/logout",
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        console.log("Successfully logged out from backend");

        // Supprimer le cookie côté client
        removeCookie("bearerToken", { path: "/" });

        const checkCookie = cookies.bearerToken;
        if (!checkCookie) {
          console.log("Cookie bearerToken supprimé avec succès");
        } else {
          console.log("Échec de la suppression du cookie bearerToken");
        }

        // Réinitialiser l'état
        setIsSignedIn(false);
        setUser(null);
        setStreamToken(null);
      } else {
        console.error("Erreur lors de la déconnexion backend");
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API de déconnexion :", error);
    }
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
        setStreamToken(response.data.streamToken);
      } else {
        setIsSignedIn(false);
        setUser(null);
        setStreamToken(null);
      }
    } catch (e) {
      console.log("Error fetching logged in user:", e);
      setIsSignedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLoggedInUser();
  }, []);

  const updateUser = async (data: FormData) => {
    try {
      setLoading(true);
      console.log(data);
      const res = await axios.put(
        `http://localhost:5000/api/users/editUserProfile/${user?.id || ""}`,
        data,
        {
          withCredentials: true,
        }
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
    streamToken,
    handleSignout,
    setLoading,
    getLoggedInUser,
    updateUser,
    setUser,
    setIsSignedIn,
    setStreamToken,
  };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
