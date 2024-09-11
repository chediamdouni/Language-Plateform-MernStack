import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import LoadingSpinner from "../../components/LoadingSpinner";
import { FiSearch, FiFilter, FiX } from "react-icons/fi";
import person from "../../assets/images/curriculum-banner-person.png";
import book from "../../assets/images/curriculum-banner-book.png";

interface Course {
  _id: string;
  titre: string;
  description: string;
  categorie: string;
  image: string;
  prix: number;
  tuteur: {
    _id: string;
    username: string;
  };
}

const DisplayAllCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [tuteurTerm, setTuteurTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBadge, setSelectedBadge] = useState("");
  const [showBlock, setShowBlock] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const result = handleSearch();
    setFilteredCourses(result);
  }, [searchTerm, tuteurTerm, priceRange, selectedBadge, courses]);

  const fetchCourses = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/courses/all`);
      setCourses(response.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des cours", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    try {
      return courses.filter((course) => {
        if (!course || !course.tuteur) {
          console.error("Course or tutor data is missing:", course);
          return false;
        }
        const matchesTitle = course.titre
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesTuteur = course.tuteur.username
          .toLowerCase()
          .includes(tuteurTerm.toLowerCase());
        const matchesPrice =
          course.prix >= priceRange[0] && course.prix <= priceRange[1];
        const matchesBadge = selectedBadge
          ? course.categorie === selectedBadge
          : true;
        return matchesTitle && matchesTuteur && matchesPrice && matchesBadge;
      });
    } catch (err) {
      console.error("Error in handleSearch:", err);
      setError("Une erreur est survenue lors de la recherche des cours.");
      return [];
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const handleButtonClick = () => {
    setShowBlock(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <ApprenantLayout>
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 p-8"
      >
        <AnimatePresence>
          {showBlock && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              className="bg-gradient-to-r from-orange-400 to-pink-500 rounded-3xl p-8 mb-12 shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-full bg-white opacity-10 transform -skew-y-6"></div>
              <h2 className="text-4xl font-bold text-white mb-6">Bienvenue dans notre espace de cours</h2>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-4 bg-white bg-opacity-20 p-6 rounded-2xl backdrop-blur-sm">
                  <img src={person} alt="person" className="h-20 w-20" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Liberté de choix</h3>
                    <p className="text-white text-opacity-90">Choisissez vos propres sujets ou discutez librement avec votre tuteur</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 bg-white bg-opacity-20 p-6 rounded-2xl backdrop-blur-sm">
                  <img src={book} alt="book" className="h-20 w-20" />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Supports guidés</h3>
                    <p className="text-white text-opacity-90">Explorez nos propositions de sujets pour orienter vos cours</p>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 bg-white text-orange-500 font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition duration-300"
                onClick={handleButtonClick}
              >
                J'ai compris
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div variants={itemVariants} className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Filtres</h2>
              <div className="space-y-4">
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un cours"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Rechercher un tuteur"
                    value={tuteurTerm}
                    onChange={(e) => setTuteurTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700 mb-1">
                    Prix maximum : {priceRange[1]} €
                  </label>
                  <input
                    type="range"
                    id="priceRange"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
                <div>
                  <h3 className="font-medium text-gray-700 mb-2">Catégories :</h3>
                  <div className="flex flex-wrap gap-2">
                    {["Développement personnel", "Exprimez-vous"].map((badge) => (
                      <motion.span
                        key={badge}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedBadge((prevBadge) => (prevBadge === badge ? "" : badge))}
                        className={`inline-block px-3 py-1 rounded-full text-sm cursor-pointer ${
                          selectedBadge === badge
                            ? "bg-indigo-500 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        {badge}
                        {selectedBadge === badge && (
                          <FiX className="inline-block ml-1" onClick={() => setSelectedBadge("")} />
                        )}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:w-3/4">
            <h1 className="text-4xl font-bold mb-8 text-gray-800">Explorer les cours</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <motion.div
                  key={course._id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
                  onClick={() => navigate(`/displayCourses/${course._id}`)}
                >
                  <div className="relative h-48">
                    <img
                      src={`http://localhost:5000/${course.image}`}
                      alt={course.titre}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                      <h2 className="text-xl font-bold text-white">{course.titre}</h2>
                    </div>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-2 line-clamp-2">{course.description}</p>
                    <div className="flex justify-between items-center">
                      <p className="text-indigo-600 font-bold">{course.prix} €</p>
                      <p className="text-gray-500 text-sm">Par {course.tuteur.username}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </ApprenantLayout>
  );
};

export default DisplayAllCourses;
