import axios from "axios";
import React, { FC, useState, createContext, ReactNode } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export interface ProviderInterface {
  children?: ReactNode;
}
export interface Course {
  _id: string;
  nom: string;
  description: string;
  professeur: string;
  prix: number;
  etudiantsInscrits: string[];
}
export interface ICoursContext {
  loading: boolean;
  courses?: Course[];
  loadedCourse: () => void;
  registerCourse: (courseId: string) => void;
  unregisterCourse: (courseId: string) => void;
}

export const CoursContext = createContext<ICoursContext>({
  courses: [],
  loading: false,
  loadedCourse: () => {},
  registerCourse: () => {},
  unregisterCourse: () => {},
});
export const CoursProvider: FC = ({
  children,
}: ProviderInterface): JSX.Element => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [cookies] = useCookies();
  const navigate = useNavigate();

  const loadedCourse = async () => {
    try {
      setLoading(true);
      const response = await axios.get("", {
        withCredentials: true,
      });
      setCourses(response.data);
      setLoading(false);
    } catch (e) {
      console.error("Error loading cours", e);
      setLoading(false);
    }
  };
  const registerCourse = async () => {
    try {
      setLoading(true);
    } catch (e) {
      console.error("Error register Courses", e);
    }
  };
  const unregisterCourse = async () => {
    try {
      setLoading(true);
    } catch (e) {
      console.error("Error register Courses", e);
    }
  };
  const contextValue: ICoursContext = {
    courses,
    loading,
    loadedCourse,
    registerCourse,
    unregisterCourse,
  };
  return (
    <CoursContext.Provider value={contextValue}>
      {children}
    </CoursContext.Provider>
  );
};
