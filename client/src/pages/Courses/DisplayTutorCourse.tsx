import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import { AuthContext } from "src/Context/AuthContext";
import { toast } from "react-toastify";
const apiUrl = process.env.REACT_APP_API_URL;
interface Course {
  _id: string;
  titre: string;
  description: string;
  prix: number;
  image: string;
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
      const response = await axios.get(`http://localhost:5000/api/courses/all`);
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
      const response = await axios.get(
        `http://localhost:5000/api/courses/${id}`
      );
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
    <>
      <div className="bg-slate-50 w-full p-5 font-nunito relative">
        <div className="flex justify-between">
          <div className="flex gap-3">
            <img
              src={`http://localhost:5000/${course.image}`}
              alt="cours"
              className="w-64 h-48 object-cover rounded"
            />
            <div className="mx-10 w-96">
              <h2 className="font-bold text-4xl">{course.titre}</h2>
              <p className="mt-5">
                Ce cours fait partie de la spécialisation de Learn-Up
              </p>
              <p className="mt-4 gap-2">
                <strong>Instructeur:</strong>
                {course.tuteur.username}{" "}
              </p>
            </div>
          </div>
          <div className="mt-4 mr-20 text-center">
            <p>Débuter ({currentDate})</p>
            <Button color="green" className="w-48 rounded-xl my-3">
              Inscription
            </Button>
            <p className="w-64 text-sm">
              Essai gratuit :Inscrivez-vous pour commencer votre essai gratuit
              de 7 jours avec accès complet
            </p>
          </div>
        </div>
      </div>
      <div className="p-10 font-nunito bg-slate-50 mx-auto justify-center flex gap-4">
        <div className="w-2/3 p-4 shadow-xl bg-white rounded-xl">
          <div className="flex justify-between ">
            <div>
              <p className="font-semibold my-3 text-2xl ">
                Les compétences que vous allez acquérir
              </p>
              <div className="flex items-center gap-5">
                <button className="w-24 bg-green-300 text-center  rounded text-xs p-2">
                  {course.prompts}
                </button>
              </div>
            </div>
            <div>
              <button className="cursor-pointer " onClick={addToFavorites}>
                <svg
                  width="50px"
                  height="50px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.75 6L7.5 5.25H16.5L17.25 6V19.3162L12 16.2051L6.75 19.3162V6ZM8.25 6.75V16.6838L12 14.4615L15.75 16.6838V6.75H8.25Z"
                    fill="#080341"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div>
            <p className="font-semibold mt-5 text-2xl">
              Informations à connaître
            </p>
            <div className="flex gap-5 p-4">
              <div className="w-64">
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                >
                  <path
                    fill="#0A66C2"
                    d="M12.225 12.225h-1.778V9.44c0-.664-.012-1.519-.925-1.519-.926 0-1.068.724-1.068 1.47v2.834H6.676V6.498h1.707v.783h.024c.348-.594.996-.95 1.684-.925 1.802 0 2.135 1.185 2.135 2.728l-.001 3.14zM4.67 5.715a1.037 1.037 0 01-1.032-1.031c0-.566.466-1.032 1.032-1.032.566 0 1.031.466 1.032 1.032 0 .566-.466 1.032-1.032 1.032zm.889 6.51h-1.78V6.498h1.78v5.727zM13.11 2H2.885A.88.88 0 002 2.866v10.268a.88.88 0 00.885.866h10.226a.882.882 0 00.889-.866V2.865a.88.88 0 00-.889-.864z"
                  />
                </svg>
                <p>Obtenir un certificat professionnel</p>
                <p>Ajouter à votre profil LinkedIn</p>
              </div>
              <div className="w-64">
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.1"
                    d="M13.8179 4.54512L13.6275 4.27845C12.8298 3.16176 11.1702 3.16176 10.3725 4.27845L10.1821 4.54512C9.76092 5.13471 9.05384 5.45043 8.33373 5.37041L7.48471 5.27608C6.21088 5.13454 5.13454 6.21088 5.27608 7.48471L5.37041 8.33373C5.45043 9.05384 5.13471 9.76092 4.54512 10.1821L4.27845 10.3725C3.16176 11.1702 3.16176 12.8298 4.27845 13.6275L4.54512 13.8179C5.13471 14.2391 5.45043 14.9462 5.37041 15.6663L5.27608 16.5153C5.13454 17.7891 6.21088 18.8655 7.48471 18.7239L8.33373 18.6296C9.05384 18.5496 9.76092 18.8653 10.1821 19.4549L10.3725 19.7215C11.1702 20.8382 12.8298 20.8382 13.6275 19.7215L13.8179 19.4549C14.2391 18.8653 14.9462 18.5496 15.6663 18.6296L16.5153 18.7239C17.7891 18.8655 18.8655 17.7891 18.7239 16.5153L18.6296 15.6663C18.5496 14.9462 18.8653 14.2391 19.4549 13.8179L19.7215 13.6275C20.8382 12.8298 20.8382 11.1702 19.7215 10.3725L19.4549 10.1821C18.8653 9.76092 18.5496 9.05384 18.6296 8.33373L18.7239 7.48471C18.8655 6.21088 17.7891 5.13454 16.5153 5.27608L15.6663 5.37041C14.9462 5.45043 14.2391 5.13471 13.8179 4.54512Z"
                    fill="#323232"
                  />
                  <path
                    d="M13.8179 4.54512L13.6275 4.27845C12.8298 3.16176 11.1702 3.16176 10.3725 4.27845L10.1821 4.54512C9.76092 5.13471 9.05384 5.45043 8.33373 5.37041L7.48471 5.27608C6.21088 5.13454 5.13454 6.21088 5.27608 7.48471L5.37041 8.33373C5.45043 9.05384 5.13471 9.76092 4.54512 10.1821L4.27845 10.3725C3.16176 11.1702 3.16176 12.8298 4.27845 13.6275L4.54512 13.8179C5.13471 14.2391 5.45043 14.9462 5.37041 15.6663L5.27608 16.5153C5.13454 17.7891 6.21088 18.8655 7.48471 18.7239L8.33373 18.6296C9.05384 18.5496 9.76092 18.8653 10.1821 19.4549L10.3725 19.7215C11.1702 20.8382 12.8298 20.8382 13.6275 19.7215L13.8179 19.4549C14.2391 18.8653 14.9462 18.5496 15.6663 18.6296L16.5153 18.7239C17.7891 18.8655 18.8655 17.7891 18.7239 16.5153L18.6296 15.6663C18.5496 14.9462 18.8653 14.2391 19.4549 13.8179L19.7215 13.6275C20.8382 12.8298 20.8382 11.1702 19.7215 10.3725L19.4549 10.1821C18.8653 9.76092 18.5496 9.05384 18.6296 8.33373L18.7239 7.48471C18.8655 6.21088 17.7891 5.13454 16.5153 5.27608L15.6663 5.37041C14.9462 5.45043 14.2391 5.13471 13.8179 4.54512Z"
                    stroke="#323232"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9 12L10.8189 13.8189V13.8189C10.9189 13.9189 11.0811 13.9189 11.1811 13.8189V13.8189L15 10"
                    stroke="#323232"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>Enseignement en anglais</p>
                <p>20 autres langues</p>
              </div>
              <div className="w-64">
                <svg
                  width="30px"
                  height="30px"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    opacity="0.1"
                    d="M3.58579 3.58579C3 4.17157 3 5.11438 3 7V14.75H5.92963C6.68193 14.75 7.38445 15.126 7.80175 15.7519L8.61428 16.9707C8.93884 17.4576 9.48525 17.75 10.0704 17.75H13.9296C14.5148 17.75 15.0612 17.4576 15.3857 16.9707L16.1983 15.7519C16.6156 15.126 17.3181 14.75 18.0704 14.75H21V7C21 5.11438 21 4.17157 20.4142 3.58579C19.8284 3 18.8856 3 17 3H7C5.11438 3 4.17157 3 3.58579 3.58579Z"
                    fill="#323232"
                  />
                  <path
                    d="M3 15H5.92963C6.59834 15 7.2228 15.3342 7.59373 15.8906L8.40627 17.1094C8.7772 17.6658 9.40166 18 10.0704 18H13.9296C14.5983 18 15.2228 17.6658 15.5937 17.1094L16.4063 15.8906C16.7772 15.3342 17.4017 15 18.0704 15H21"
                    stroke="#323232"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M3 7C3 5.11438 3 4.17157 3.58579 3.58579C4.17157 3 5.11438 3 7 3H12H17C18.8856 3 19.8284 3 20.4142 3.58579C21 4.17157 21 5.11438 21 7V15V17C21 18.8856 21 19.8284 20.4142 20.4142C19.8284 21 18.8856 21 17 21H12H7C5.11438 21 4.17157 21 3.58579 20.4142C3 19.8284 3 18.8856 3 17V15V7Z"
                    stroke="#323232"
                    stroke-width="2"
                    stroke-linejoin="round"
                  />
                </svg>
                <p>Évaluations</p>
                <p>12 quizzes</p>
              </div>
            </div>
          </div>
          <div>
            <p className="font-semibold my-3 text-2xl">
              Développez votre expertise dans le domaine
            </p>
            <p>
              Lorsque vous vous inscrivez à ce cours, vous vous inscrivez
              également à cette spécialisation.
            </p>
            <ul className="max-w-md space-y-1 list-disc list-inside dark:text-gray-400 text-base p-3">
              <li>
                Apprendre de nouveaux concepts auprès d'experts du secteur
              </li>
              <li>
                Acquérir une compréhension fondamentale d'un sujet ou d'un outil
              </li>
              <li>
                Développer des compétences utiles à l'emploi grâce à des projets
                pratiques
              </li>
            </ul>
          </div>

          <p className="font-bold my-3 font-sans text-xl">
            Ce cours comporte {course.lessons.length} module
          </p>
          <div className="flex gap-3">
            <div className="w-2/3">
              {course.lessons.length > 0 ? (
                <ul>
                  {course.lessons.map((lesson) => (
                    <li
                      key={lesson._id}
                      className="border-2 border-slate-300 shadow-md rounded-xl my-2 cursor-pointer p-2"
                      onClick={() => {
                        navigate(`/courses/${course._id}/lessons`);
                      }}
                    >
                      <h4>
                        <strong>Chapitre :</strong> {lesson.titre}
                      </h4>
                      <p>{lesson.description}</p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>Aucune leçon disponible.</p>
              )}
            </div>
            <div className="w-1/3 border-2 border-slate-300 rounded-xl shadow-md my-2 p-4">
              <p className="font-bold text-lg">Instructeur</p>
              <p className="font-thin text-sm">
                Instructeur Rating (4698 avis)
              </p>
              <p>Tuteur: {course.tuteur.username}</p>
            </div>
          </div>
        </div>
        <div className="w-1/3 p-4 shadow-xl bg-white rounded-xl">
          <h2 className="font-bold mb-4">Des Cours Relatifs</h2>
          <ul>
            {courses.map((course) => (
              <li
                key={course._id}
                className="mb-2"
                onClick={() => {
                  handleCourseNavigation(course._id);
                }}
              >
                * {course.titre}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default DisplayTutorCourse;
