import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/Context/AuthContext";
import TuteurLayout from "src/layouts/TuteurLayout";
import CreateCourse from "../Courses/CreateCourse";
import cours1 from "../../assets/images/cours1.png";
import { useNavigate } from "react-router-dom";
import { Breadcrumbs, Card, Typography } from "@material-tailwind/react";
import { motion } from "framer-motion";

interface Course {
  _id: string;
  titre: string;
  description: string;
  image: string;
  tuteur: string;
  prix: number;
  etudiantsInscrits: string[];
  createdAt: string;
}
const apiUrl = process.env.REACT_APP_API_URL;
const Courses: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [courses, setCourses] = useState<Course[]>([]);
  const navigate = useNavigate();
  const [lastCourse, setLastCourse] = useState<Course | null>(null);
  const [newCourse, setNewCourse] = useState({
    nom: "",
    description: "",
    prix: 0,
  });

  useEffect(() => {
    if (user) {
      fetchCourses();
    }
  }, [user]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        `${apiUrl}/courses/tuteur/${user!.id}`
      );
      console.log(response.data);
      setCourses(response.data);

      const sortedCourses = [...response.data].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      setLastCourse(sortedCourses[0] || null);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours:", error);
    }
  };

  return (
    <TuteurLayout>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen bg-gray-900 text-white p-8"
      >
        <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold mb-8 text-center text-blue-400"
        >
          Vos Cours
        </motion.h1>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {courses.map((course, index) => (
            <motion.div
              key={course._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              onClick={() => navigate(`/courses/update/${course._id}`)}
            >
              <div className="relative h-48">
                <img
                  src={`https://language-plateform-mernstack.onrender.com/${course.image}`}
                  alt={course.titre}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70"></div>
                <h2 className="absolute bottom-4 left-4 text-2xl font-bold text-white">
                  {course.titre}
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4 line-clamp-3">
                  {course.description}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-600 font-bold text-xl">
                    {course.prix}€
                  </span>
                  <span className="text-gray-500 text-sm">
                    {new Date(course.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-2/3"
          >
            <CreateCourse />
          </motion.div>
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-1/3"
          >
            <div className="bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-blue-400">
                Dernière Leçon Créée
              </h3>
              {lastCourse ? (
                <>
                  <img
                    src={`https://language-plateform-mernstack.onrender.com/${lastCourse.image}`}
                    alt={lastCourse.titre}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h4 className="text-xl font-semibold mb-2 text-white">
                    {lastCourse.titre}
                  </h4>
                  <p className="text-gray-400 mb-4 line-clamp-3">
                    {lastCourse.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-blue-400 font-bold">
                      {lastCourse.prix}€
                    </span>
                    <span className="text-gray-500 text-sm">
                      {new Date(lastCourse.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </>
              ) : (
                <p className="text-gray-400">
                  Aucune leçon créée pour le moment.
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </TuteurLayout>
  );
};

export default Courses;
