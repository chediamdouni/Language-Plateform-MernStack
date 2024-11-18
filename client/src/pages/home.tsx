import React, { useContext, useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
} from "@material-tailwind/react";
import { RatingWithComment } from "../components/RatingCard";
import Hero from "../components/hero";
import Reveal from "../utils/Reveal";
import bb from "../assets/images/bb.jpg";
import tuteurImage from "../assets/images/tuteur.png";
import { FaArrowRight } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "src/Context/AuthContext";
import axios from "axios";

const data = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    title: "Aziz Bayoudh",
    description: "Enseignant Professionnel",
    budget: "USD 5$",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    title: "Ala Ben Rjab", 
    description: "Enseignant Débutant",
    budget: "USD 5$",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    title: "Aziza Chouchene",
    description: "Enseignant Academique",
    budget: "USD 5$",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    title: "Mahdi Khmili",
    description: "Enseignant Professionnel", 
    budget: "USD 5$",
  },
];

const apiUrl = process.env.REACT_APP_API_URL;

interface Tutor {
  _id: string;
  username: string;
  verified: string;
  language: string;
  aboutMe: string;
  profileImage: {
    public_id: string;
    url: string;
  };
  country: string;
  email: string;
  experience: number;
  certificate: string;
  createdAt: Date;
}

const Home: React.FC = () => {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tuteur/`);
        console.log(response);
        setTutors(response.data.tuteurs);
      } catch (err) {
        console.error("Error fetching tutors:", err);
      }
    };
    fetchTutors();
  }, []);

  const handleSelectTutor = (tutorId: string) => {
    navigate("/apprenant");
  };

  return (
    <DashboardLayout>
      <Hero />
      <div className="min-h-screen mb-6 mt-10 px-4 md:px-6 lg:px-8">
        <Typography
          variant="h2"
          color="blue-gray"
          className="mb-2 text-center text-3xl md:text-4xl lg:text-5xl font-korto font-sans tracking-tight font-bold text-blue-500"
        >
          Choisissez votre propre tuteur
        </Typography>
        <Typography
          variant="h2"
          color="gray"
          className="p-2 text-center text-sm md:text-base font-korto"
        >
          Avec plus de 30 000 tuteurs et plus d'un million d'apprenants, nous
          connaissons l'apprentissage des langues.
        </Typography>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8 mt-6 md:mt-10">
          {tutors.slice(0, 3).map((tutor) => (
            <div
              key={tutor._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-105 cursor-pointer"
              onClick={() => handleSelectTutor(tutor._id)}
            >
              <div className="relative">
                <img
                  src={tutor?.profileImage?.url}
                  alt={`${tutor.username}'s profile`}
                  className="w-full h-40 md:h-48 object-cover"
                />
                <div className="absolute top-0 right-0 bg-orange-500 text-white px-2 md:px-3 py-1 rounded-bl-lg text-xs md:text-sm font-semibold">
                  50 dinars
                </div>
              </div>

              <div className="p-4 md:p-6">
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-2">
                  {tutor.username}
                </h3>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span className="truncate">{tutor.email}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm">{tutor.country}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <svg
                      className="w-4 h-4 md:w-5 md:h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-sm">
                      {tutor.experience} ans d'expérience
                    </span>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-4 border-t border-gray-200">
                  <span className="text-xs md:text-sm text-gray-500 mb-2 md:mb-0">
                    Inscrit le {new Date(tutor.createdAt).toLocaleDateString()}
                  </span>
                  <button className="w-full md:w-auto bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full text-sm transition-colors duration-300">
                    Voir le profil
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="min-h-screen flex flex-col text-center tracking-tight px-4 md:px-6 lg:px-8">
        <Typography
          variant="h3"
          color="blue-gray"
          className="mb-8 text-center text-3xl md:text-4xl lg:text-5xl font-korto font-sans tracking-tight font-bold text-blue-500"
        >
          Choisissez le programme qui vous convient
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-5">
          <Card className="max-w-[22rem] bg-sky-100 p-2 rounded-3xl">
            <CardBody className="p-10 px-4 divide-y divide-solid divide-black">
              <div className="flex text-2xl font-bold items-center justify-center mb-5">
                Cours particuliers et en groupe
              </div>
              <div className="text-left">
                <p className="mb-3 mt-6">
                  Accès complet à l'intégralité de Cambly
                </p>
                <div className="ml-9 space-y-2">
                  <p className="flex flex-row gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Notre expérience la plus exhaustive
                  </p>
                  <p className="flex flex-row gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Pratiquez l'anglais en cours particuliers ou en groupe
                  </p>
                  <p className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Cours disponibles à la réservation et à la demande
                  </p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-items-start	flex-col items-center p-4">
              <div className="text-left">
                <p>À partir de</p>
                <p className="text-3xl mb-6 ">$37/mois</p>
              </div>
              <button
                className="select-none rounded-lg bg-gradient-to-tr from-orange-400 to-orange-300 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => {
                  navigate("/pricing");
                }}
              >
                S'inscrire
              </button>
            </CardFooter>
          </Card>
          <Card className="max-w-[22rem] bg-sky-100 p-2 rounded-3xl">
            <CardBody className="p-10 px-4 divide-y divide-solid divide-black">
              <div className="flex text-2xl font-bold items-center justify-center mb-5 p-4">
                Groupe
              </div>
              <div className="text-left">
                <p className="mb-3 mt-6">Seulement les cours en groupe</p>
                <div className="ml-9 space-y-2">
                  <p className="flex flex-row gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Expérience de conversation de monde réel
                  </p>
                  <p className="flex flex-row gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-8"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Travaillez avec un tuteur et 1 ou 2 autres étudiants
                  </p>
                  <p className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Pour les adultes de plus de 21 ans
                  </p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-items-start	flex-col items-center p-4">
              <div className="text-left">
                <p>À partir de</p>
                <p className="text-3xl mb-6 ">$16/mois</p>
              </div>
              <button
                className="select-none rounded-lg bg-gradient-to-tr from-orange-400 to-orange-300 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => {
                  navigate("/pricing");
                }}
              >
                S'inscrire
              </button>
            </CardFooter>
          </Card>
          <Card className="max-w-[22rem] bg-sky-100 p-2 rounded-3xl">
            <CardBody className="p-10 px-4 divide-y divide-solid divide-black">
              <div className="flex text-2xl font-bold items-center justify-center mb-5 p-3">
                Enfants
              </div>
              <div className="text-left">
                <p className="mb-3 mt-6">Pour les enfants (moins de 18 ans)</p>
                <div className="ml-9 space-y-2">
                  <p className="flex flex-row gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Cours particuliers avec des tuteurs spécialisés
                  </p>
                  <p className="flex flex-row gap-2 ">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Cours débutant à avancé disponibles
                  </p>
                  <p className="flex flex-row gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-8 h-6"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    Jeux et activités ludiques
                  </p>
                </div>
              </div>
            </CardBody>
            <CardFooter className="flex justify-items-start	flex-col items-center p-4">
              <div className="text-left">
                <p>À partir de</p>
                <p className="text-3xl mb-6 ">$53/mois</p>
              </div>
              <button
                className="select-none rounded-lg bg-gradient-to-tr from-orange-400 to-orange-300 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
                onClick={() => {
                  navigate("/pricing");
                }}
              >
                S'inscrire
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-center my-20 font-korto">
        <div className="relative flex bg-clip-border rounded-full bg-white text-gray-700 shadow w-full max-w-[70rem] flex-row bg-orange-200">
          <div className="relative w-2/5 m-0 overflow-visible text-gray-700 bg-white rounded-full bg-clip-border rounded-xl ">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
              alt="card"
              className="w-full h-full object-cover md:rounded-l-3xl"
            />
          </div>
          <div className="p-4 md:p-6">
            <h4 className="text-xl md:text-2xl font-semibold mb-2">
              Essayez nos ressources gratuites 😊🚀
            </h4>
            <p className="text-base md:text-lg mb-4 md:mb-8">
              Découvrez nos ressources gratuites ! Outils, livres et vidéos pour
              vous aider à apprendre l'anglais. Disponibles sans abonnement.
            </p>
            <Link to="/cour">
              <button className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-xs font-bold text-gray-900 uppercase transition-all rounded-lg hover:bg-gray-900/10">
                S'inscrire maintenant
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                  className="w-4 h-4"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        </div>
      </div>

      <div className="bg-sky-200 p-6 md:p-10 lg:p-20 mb-10 md:mb-20">
        <div className="text-4xl md:text-6xl lg:text-8xl font-korto font-bold text-center tracking-tight">
          Des cours pour tous niveaux de compétences et d'intérêt.
        </div>
        <div className="text-center p-3 md:p-5 text-sm md:text-base">
          Concentrez-vous sur vos objectifs spécifiques grâce à nos cours
          personnalisés.
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 px-4 md:px-6 lg:px-8 my-10 md:my-20">
        <img src={tuteurImage} alt="" className="w-full md:w-auto max-w-md" />
        <div className="space-y-4 font-korto font-sans text-center md:text-left">
          <div className="font-bold tracking-tight text-3xl md:text-4xl text-sky-600">
            Devenir Tuteur
          </div>
          <div className="text-base md:text-lg max-w-md">
            Rejoignez notre communauté d'enseignement de l'anglais et bénéficiez
            d'un emploi du temps flexible et de conversations enrichissantes
            avec des personnes du monde entier
          </div>
          <Link to="/tuteur/inscription">
            <button className="flex items-center justify-center gap-4 w-full md:w-auto px-6 py-3 bg-gradient-to-tr from-orange-400 to-orange-300 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all">
              C'est Parti
              <FaArrowRight />
            </button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 md:p-7">
        <RatingWithComment
          image={bb}
          name="chedi Amdouni"
          description="Full Stack Developer"
          rating={3}
        />
        <RatingWithComment
          image={bb}
          name="fathy el hadeoui"
          description="Lead Frontend Developper"
          rating={4}
        />
        <RatingWithComment />
      </div>

      <div className="flex flex-col text-center p-6 md:p-20 justify-center items-center">
        <p className="text-blue-500 text-2xl md:text-3xl font-extrabold px-4 md:px-20 lg:px-80">
          Atteignez vos objectifs en apprenant l'anglais avec Elearning App
        </p>
        <button
          className="mt-6 md:mt-10 px-6 py-3 bg-gradient-to-tr from-orange-400 to-orange-300 text-white font-bold rounded-lg shadow-md hover:shadow-lg transition-all text-sm md:text-base"
          onClick={() => navigate("/apprenant")}
        >
          Commencer l'apprentissage
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Home;
