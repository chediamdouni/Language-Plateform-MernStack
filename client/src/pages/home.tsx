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
                  {/* Similar adjustments for other icons/text */}
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
          {/* Cards with similar responsive adjustments */}
          {/* ... */}
        </div>
      </div>

      <div className="px-4 md:px-6 lg:px-8 my-10 md:my-20">
        <div className="relative flex flex-col md:flex-row bg-clip-border rounded-3xl bg-white text-gray-700 shadow-lg bg-orange-200 overflow-hidden">
          <div className="relative w-full md:w-2/5 h-48 md:h-auto">
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
                <FaArrowRight />
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
