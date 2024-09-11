import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "src/Context/AuthContext";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import Person from "../../assets/images/person1.jpg";
interface Tutor {
  _id: string;
  username: string;
  profileImage: string;
  aboutMe: string;
  experience: number;
  language: string;
  country: string;
  gender: string;
}

interface Course {
  _id: string;
  titre: string;
  image: string;
  description: string;
  tuteur: string;
  prix: number;
  etudiantsInscrits: string[];
}

interface FavoritesData {
  favoriteTutors: Tutor[];
  favoriteCourses: Course[];
}

const Favorites: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [favorites, setFavorites] = useState<FavoritesData>({
    favoriteTutors: [],
    favoriteCourses: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"tutors" | "courses">("tutors");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get<FavoritesData>(
          `http://localhost:5000/api/users/favorites/${user?.id}`
        );
        setFavorites(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris:", error);
        setError("Erreur lors de la récupération des favoris");
        setIsLoading(false);
      }
    };

    if (user?.id) {
      fetchFavorites();
    }
  }, []);

  const removeFavoriteTutor = async (tutorId: string) => {
    try {
      console.log("id tuteur ", tutorId);
      const response = await axios.post(
        "http://localhost:5000/api/users/favorite/tutors/remove",
        { tutorId, userId: user?.id }
      );
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        favoriteTutors: prevFavorites.favoriteTutors.filter(
          (tutor) => tutor._id !== tutorId
        ),
      }));
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du tuteur des favoris:",
        error
      );
    }
  };
  const removeFavoriteCourse = async (courseId: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/favorite/courses/remove",
        { courseId, userId: user?.id }
      );
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        favoriteCourses: prevFavorites.favoriteCourses.filter(
          (course) => course._id !== courseId
        ),
      }));
    } catch (error) {
      console.error(
        "Erreur lors de la suppression du cours des favoris:",
        error
      );
    }
  };
  if (isLoading) {
    return <div>Chargement des favoris...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <ApprenantLayout>
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 min-h-screen p-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Vos Favoris</h1>

        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-2xl font-semibold text-gray-700">
              {filter === "tutors" ? "Tuteurs Préférés" : "Cours Préférés"}
            </h2>
            <div className="flex space-x-2">
              <button
                className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                  filter === "tutors"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setFilter("tutors")}
              >
                Tuteurs
              </button>
              <button
                className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                  filter === "courses"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                onClick={() => setFilter("courses")}
              >
                Cours
              </button>
            </div>
          </div>

          <div className="p-6">
            {filter === "tutors" ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.favoriteTutors.length > 0 ? (
                  favorites.favoriteTutors.map((tutor) => (
                    <div
                      key={tutor._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 p-4 flex flex-col items-center"
                    >
                      <img
                        src={`http://localhost:5000/${tutor.profileImage}`}
                        alt={tutor.username}
                        className="w-24 h-24 rounded-full object-cover mb-4"
                      />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                        {tutor.username}
                      </h3>
                      <button
                        onClick={() => removeFavoriteTutor(tutor._id)}
                        className="w-full px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Retirer
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center col-span-full">
                    Aucun tuteur favori
                  </p>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {favorites.favoriteCourses.length > 0 ? (
                  favorites.favoriteCourses.map((course) => (
                    <div
                      key={course._id}
                      className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 p-4 flex flex-col items-center"
                    >
                      <img
                        src={`http://localhost:5000/${course.image}`}
                        alt={course.titre}
                        className="w-24 h-24 rounded-full object-cover mb-4"
                      />
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                        {course.titre}
                      </h3>
                      <button
                        onClick={() => removeFavoriteCourse(course._id)}
                        className="w-full px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 transition-colors duration-200 flex items-center justify-center"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Retirer
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 text-center col-span-full">
                    Aucun cours favori
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ApprenantLayout>
  );
};

export default Favorites;
