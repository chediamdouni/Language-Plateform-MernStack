import React from "react";
import {
  FC,
  useState,
  createContext,
  SetStateAction,
  Dispatch,
  ReactNode,
} from "react";

import history from "../utils/history";
import axios from "axios";
import { useCookies } from "react-cookie";

export interface User {
  _id: string;
  username?: string;
  gender?: string;
  dateOfBirth: Date;
  password: string;
  email: string;
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
  loading: false,
  handleSignout: () => {},
  setLoading: (value: SetStateAction<boolean>) => {},
  getLoggedInUser: () => {},
  updateUser: (data: FormData) => {},
  setUser: () => {},
  setIsSignedIn: () => {},
});

export const AuthProvider: FC = (props: ProviderInterface): JSX.Element => {
  const { children } = props;
  const [cookies, setCookie, removeCookie] = useCookies();
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignout = () => {
    removeCookie("jwt");
    setIsSignedIn(false);
    history.push("/");
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
      console.log(response.data.user);
      setIsSignedIn(true);
      setUser(response.data.user);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      alert("Something went wrong !! ");
      console.log(e);
    }
  };

  const updateUser = async (data: FormData) => {
    try {
      setLoading(true);
      const res = await axios.put(
        `http://localhost:5000/api/users/editUserProfile/${user?._id || ""}`,
        data
      );
      setUser(res.data);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      console.log(e);
      alert("Something went wrong !! ");
    }
  };
  const contextValue: IAuthContext = {
    isSignedIn,
    user,
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
