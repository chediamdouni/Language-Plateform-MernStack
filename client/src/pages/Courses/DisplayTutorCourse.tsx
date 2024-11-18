import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { AuthContext } from "src/Context/AuthContext";
import { toast } from "react-toastify";
import TuteurLayout from "src/layouts/TuteurLayout";
import { motion } from "framer-motion";

const apiUrl = process.env.REACT_APP_API_URL;
interface Course {
  _id: string;
  titre: string;
  description: string;
  prix: number;
  image: {
    url: string;
  };
  tuteur: {
    _id: string;
    username: string;
  };
  lessons: Lesson[];
  quizzes: Quiz[];
  prompts: string;
}

interface Lesson {
  _id: string;
  titre: string;
  description: string;
  contenu: string;
}

interface Quiz {
  _id: string;
  nom: string;
  description: string;
  deadline: Date;
  questions: Question[];
}

interface Question {
  question: string;
  options: Option[];
}

interface Option {
  texte: string;
  correct: boolean;
}

const DisplayTutorCourse = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const currentDate = new Date().toLocaleDateString("fr-FR");

  const navigate = useNavigate();
  // all courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get(`${apiUrl}/courses/all`);
      setCourses(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours", error);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  // specifique course
  const fetchCourse = async () => {
    try {
      const response = await axios.get(`${apiUrl}/courses/${id}`);
      setCourse(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération du cours", error);
      setErrorMessage("Erreur lors de la récupération du cours");
    }
  };

  useEffect(() => {
    fetchCourse();
  }, [id]);
  // adding course to favorites
  const addToFavorites = async () => {
    try {
      const userId = user?.id;
      const courseId = id;
      if (!userId) {
        console.log("user n'est pas defini ");
      }
      if (!courseId) {
        console.log("Cour  n'est pas defini ");
      }
      const response = await axios.post(
        `${apiUrl}/users/favorite/courses/add`,
        { courseId: id, userId: user?.id }
      );
      console.log("Message de succès:", response.data.message);
      toast("🦄 Le cour est ajouter avec succès", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du cour aux favoris:", error);
      toast.error("le cour est deja en favories ", { position: "top-center" });
    }
  };

  const handleCourseNavigation = (courseId: string) => {
    navigate(`/displayTutorsCourses/${courseId}`);
  };
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }

  if (!course) {
    return <div>Chargement du cours...</div>;
  }

  return (
    <TuteurLayout>
      <div className="bg-gray-900 text-white w-full p-5 font-nunito relative">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <motion.img
              src={course.image.url}
              alt="cours"
              className="w-64 h-48 object-cover rounded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
            <div className="mx-10 w-96">
              <h2 className="font-bold text-4xl">{course.titre}</h2>
              <p className="mt-5">
                Ce cours fait partie de la spécialisation de Learn-Up
              </p>
              <p className="mt-4 gap-2">
                <strong>Instructeur:</strong> {course.tuteur.username}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="p-10 font-nunito bg-gray-900 text-white mx-auto justify-center flex flex-col gap-4">
        <div className="w-full">
          <p className="font-semibold my-3 text-2xl">
            Les compétences que vous allez acquérir
          </p>
          <div className="flex items-center gap-5">
            <button className="w-24 bg-green-500 text-center rounded text-xs p-2">
              {course.prompts}
            </button>
          </div>
        </div>
        <div className="w-full">
          <p className="font-bold my-3 font-sans text-xl">
            Ce cours comporte {course.lessons.length} module
          </p>
          <div className="flex flex-col gap-3">
            {course.lessons.length > 0 ? (
              <ul>
                {course.lessons.map((lesson) => (
                  <li key={lesson._id} className="my-2">
                    <motion.div
                      className="p-4 bg-gray-700 rounded-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3 className="font-semibold text-lg">{lesson.titre}</h3>
                      <p>{lesson.description}</p>
                    </motion.div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucun module disponible pour ce cours.</p>
            )}
          </div>
        </div>
      </div>
    </TuteurLayout>
  );
};

export default DisplayTutorCourse;
