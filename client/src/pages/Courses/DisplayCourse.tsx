import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import courseImage from "../../assets/images/dashboard.jpg";
import { AuthContext } from "src/Context/AuthContext";
import { toast } from "react-toastify";
import { FiClock, FiBook, FiAward, FiHeart } from "react-icons/fi";
import ApprenantLayout from "src/layouts/ApprenantLayout";
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
    profileImage: {
      public_id: string;
      url: string;
    };
  };
  lessons: Lesson[];
  quizzes: Quiz[];
  prompts: string;
  duration: number;
  level: number;
}

interface Lesson {
  _id: string;
  titre: string;
  description: string;
  contenu: string;
  duration: number;
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

const DisplayCourse = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState<Course[]>([]);
  const [course, setCourse] = useState<Course | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();
  const currentDate = new Date().toLocaleDateString("fr-FR");

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
      if (!userId || !courseId) {
        console.log("Utilisateur ou cours non défini");
        return;
      }
      const response = await axios.post(
        `${apiUrl}/users/favorite/courses/add`,
        { courseId, userId }
      );
      setIsFavorite(true);
      toast.success("Cours ajouté aux favoris avec succès", {
        position: "top-center",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du cours aux favoris:", error);
      toast.error("Ce cours est déjà dans vos favoris", {
        position: "top-center",
      });
    }
  };

  const handleStartCourse = () => {
    navigate(`/courses/${id}/lessons`);
  };

  if (errorMessage) {
    return <div className="text-red-500 text-center">{errorMessage}</div>;
  }

  if (!course) {
    return <div className="text-center">Chargement du cours...</div>;
  }

  return (
    <ApprenantLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-12"
          >
            <div className="md:flex">
              <div className="md:w-2/3 p-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                  {course.titre}
                </h1>
                <p className="text-gray-600 mb-6">{course.description}</p>
                <div className="flex items-center mb-6">
                  <img
                    src={course.tuteur.profileImage?.url}
                    alt={course.tuteur.username}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">
                      {course.tuteur.username}
                    </p>
                    <p className="text-gray-600 text-sm">Instructeur</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-4 mb-6">
                  <div className="flex items-center">
                    <FiClock className="text-indigo-500 mr-2" />
                    <span>{course.duration} heures</span>
                  </div>
                  <div className="flex items-center">
                    <FiBook className="text-indigo-500 mr-2" />
                    <span>{course.lessons.length} leçons</span>
                  </div>
                  <div className="flex items-center">
                    <FiAward className="text-indigo-500 mr-2" />
                    <span>{course.level}</span>
                  </div>
                </div>
              </div>
              <div className="md:w-1/3 bg-indigo-600 p-8 text-white">
                <div className="mb-8">
                  <p className="text-3xl font-bold mb-2">{course.prix} €</p>
                  <p className="text-sm opacity-75">Accès à vie</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300 mb-4"
                  onClick={handleStartCourse}
                >
                  Commencer le cours
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full flex items-center justify-center ${
                    isFavorite ? "bg-pink-500" : "bg-indigo-500"
                  } text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300`}
                  onClick={addToFavorites}
                >
                  <FiHeart
                    className={`mr-2 ${isFavorite ? "fill-current" : ""}`}
                  />
                  {isFavorite ? "Dans vos favoris" : "Ajouter aux favoris"}
                </motion.button>
              </div>
            </div>
          </motion.div>

          <div className="md:flex gap-12">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="md:w-2/3"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Contenu du cours
              </h2>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                <AnimatePresence>
                  {course.lessons.map((lesson, index) => (
                    <motion.div
                      key={lesson._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: index * 0.1 }}
                      className="mb-4 last:mb-0 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-lg text-gray-800">
                          {lesson.titre}
                        </h3>
                        <div className="flex items-center text-gray-600">
                          <FiClock className="mr-2" />
                          <span>{lesson.duration} min</span>
                        </div>
                      </div>
                      <p className="text-gray-600 mt-2">{lesson.description}</p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="md:w-1/3 mt-8 md:mt-0"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Cours relatifs
              </h2>
              <div className="bg-white rounded-2xl shadow-xl p-6">
                {courses.map((relatedCourse) => (
                  <motion.a
                    key={relatedCourse._id}
                    href={`/displayCourses/${relatedCourse._id}`}
                    className="block mb-4 last:mb-0 hover:bg-indigo-50 rounded-lg p-3 transition duration-300"
                    whileHover={{ scale: 1.03 }}
                  >
                    <h3 className="font-semibold text-indigo-600">
                      {relatedCourse.titre}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {relatedCourse.tuteur?.username}
                    </p>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </ApprenantLayout>
  );
};

export default DisplayCourse;
