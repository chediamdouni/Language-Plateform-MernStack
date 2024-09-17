import React, { useCallback, useEffect, useMemo } from "react";
import {
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useLocation, useNavigate } from "react-router-dom";

const apiKey = "mmhfdzb5evj2";
const apiUrl = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;
// const client = StreamChat.getInstance(apiKey);
export interface User {
  id: string;
  username?: string;
  gender?: string;
  dateOfBirth: Date;
  password: string;
  email: string;
  roles: string;
  profileImage: string;
  verified: boolean;
  createdAt: string;
  updatedAt: string;
  aboutMe?: string;
  experience?: number;
  certificate?: string;
  language?: string;
  country?: string;
  favoriteTutors?: string[];
  favoriteCourses?: string[];
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
  //getUserInfo: () => Promise<void>;
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
  //getUserInfo: async () => {},
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
  const location = useLocation();

  const handleSignout = useCallback(async () => {
    try {
      await axios.get(`${apiUrl}/auth/logout`, { withCredentials: true });
      removeCookie("bearerToken", { path: "/" });
      localStorage.removeItem("bearerToken");
      setIsSignedIn(false);
      setUser(null);
      setStreamToken(null);
    } catch (error) {
      console.error("Erreur lors de la déconnexion :", error);
    }
  }, [removeCookie]);

  const getLoggedInUser = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("bearerToken");
      const config = {
        withCredentials: true,
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      };

      const response = await axios.get(`${apiUrl}/auth/loggedInUser`, config);
      console.log("LoggedInUser response:", response);
      if (response.data.user) {
        console.log("User data:", response.data.user);
        setIsSignedIn(true);
        console.log("Is signed in after setting:", isSignedIn);
        setUser(response.data.user);
        setStreamToken(response.data.streamToken);
      } else {
        handleSignout();
      }
    } catch (e) {
      console.log("Error fetching logged in user:", e);
      setIsSignedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, [handleSignout]);

  useEffect(() => {
    console.log("Is signed in updated:", isSignedIn);
  }, [isSignedIn]);

  useEffect(() => {
    getLoggedInUser();
  }, [getLoggedInUser, location]);

  const updateUser = useCallback(
    async (data: FormData) => {
      try {
        setLoading(true);
        console.log(data);
        const res = await axios.put(
          `${apiUrl}/users/editUserProfile/${user?.id || ""}`,
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
    },
    [user?.id]
  );

  const contextValue: IAuthContext = useMemo(
    () => ({
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
    }),
    [
      isSignedIn,
      user,
      tutors,
      loading,
      streamToken,
      handleSignout,
      getLoggedInUser,
      updateUser,
    ]
  );
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
