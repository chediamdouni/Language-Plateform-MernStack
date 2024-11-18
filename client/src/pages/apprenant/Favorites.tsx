import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "src/Context/AuthContext";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import Person from "../../assets/images/person1.jpg";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import { TrashIcon } from "@heroicons/react/24/solid";
interface Tutor {
  _id: string;
  username: string;
  profileImage: {
    public_id: string;
    url: string;
  };
  aboutMe: string;
  experience: number;
  language: string;
  country: string;
  gender: string;
}

interface Course {
  _id: string;
  titre: string;
  image: {
    url: string;
  };
  description: string;
  tuteur: string;
  prix: number;
  etudiantsInscrits: string[];
}

interface FavoritesData {
  favoriteTutors: Tutor[];
  favoriteCourses: Course[];
}

const apiUrl = process.env.REACT_APP_API_URL;

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
          `${apiUrl}/users/favorites/${user?.id}`
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
        `${apiUrl}/users/favorite/tutors/remove`,
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
        `${apiUrl}/users/favorite/courses/remove`,
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
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {favorites.favoriteTutors.length > 0 ? (
                  favorites.favoriteTutors.map((tutor) => (
                    <Card
                      key={tutor._id}
                      className="shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <CardHeader className="relative h-56">
                        <img
                          src={tutor?.profileImage?.url}
                          alt={tutor.username}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeFavoriteTutor(tutor._id)}
                          className="absolute top-2 right-2"
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </button>
                      </CardHeader>
                      <CardBody className="text-center">
                        <Typography variant="h5" className="mb-2">
                          {tutor.username}
                        </Typography>
                        <div className="line-clamp-2">
                          <Typography className="text-gray-600 ">
                            {tutor.aboutMe}
                          </Typography>
                        </div>
                      </CardBody>
                      <CardFooter className="flex justify-between items-center">
                        <Typography className="text-gray-600">
                          {tutor.language}
                        </Typography>
                        <Typography className="text-gray-600">
                          {tutor.country}
                        </Typography>
                      </CardFooter>
                    </Card>
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
                    <Card
                      key={course._id}
                      className="shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <CardHeader className="relative h-56">
                        <img
                          src={course.image?.url}
                          alt={course.titre}
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => removeFavoriteCourse(course._id)}
                          className="absolute top-2 right-2 "
                        >
                          <TrashIcon className="h-5 w-5 text-red-500" />
                        </button>
                      </CardHeader>
                      <CardBody className="text-center">
                        <Typography variant="h5" className="mb-2">
                          {course.titre}
                        </Typography>
                        <div className="line-clamp-2">
                          <Typography className="text-gray-600">
                            {course.description}
                          </Typography>
                        </div>
                      </CardBody>
                      <CardFooter className="flex justify-between items-center">
                        <Typography className="text-gray-600">
                          {course.prix} €
                        </Typography>
                        <Typography className="text-gray-600">
                          {course.etudiantsInscrits.length} inscrits
                        </Typography>
                      </CardFooter>
                    </Card>
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
