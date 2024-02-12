import React, { useContext, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import { RatingWithComment } from "../components/RatingCard";
import Hero from "../components/hero";
import Reveal from "../utils/Reveal";
import aa from "../assets/images/aa.jpg";
import bb from "../assets/images/bb.jpg";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import { AuthContext } from "src/Context/AuthContext";

const data = [
  {
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    title: "UI/UX Review Check",
    description: "Description 1",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    title: "Autre Titre",
    description: "Description 2",
  },
  {
    imageSrc:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
    title: "Autre Titre",
    description: "Description 2",
  },
];

const DashboardApprenant: React.FC = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies<string>([]);
  const [username, setUsername] = useState("");
  const { user, getLoggedInUser } = useContext(AuthContext);

  return (
    <ApprenantLayout>
      <Hero />
      <Reveal>
        <div className="mx-auto mb-6 mt-20">
          <Typography
            variant="h2"
            color="blue-gray"
            className="mb-2 text-center text-6xl font-nunito tracking-tight text-blue-500"
          >
            Find the right tutor for you.{user?.username}
          </Typography>
          <Typography
            variant="h2"
            color="blue-gray"
            className="p-2 text-center text-base font-nunito tracking-tight "
          >
            With over 30,000 tutors and 1M+ learners, we know language learning.
          </Typography>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6 p-12 ">
            {data.map((item, index) => (
              <Card className="max-w-[24rem] overflow-hidden">
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="m-0 rounded-none"
                >
                  <img src={item.imageSrc} alt="ui/ux review check" />
                </CardHeader>
                <CardBody>
                  <Typography variant="h4" className=" text-orange-400">
                    {item.title}
                  </Typography>
                  <Typography
                    variant="lead"
                    color="gray"
                    className="mt-3 font-normal text-sm"
                  >
                    {item.description}
                  </Typography>
                </CardBody>
                <CardFooter className="flex items-center justify-between">
                  <div className="flex items-center -space-x-3">
                    <Tooltip content="Natali Craig">
                      <Avatar
                        size="sm"
                        variant="circular"
                        alt="natali craig"
                        src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
                        className="border-2 border-white hover:z-10"
                      />
                    </Tooltip>
                    <Tooltip content="Tania Andrew">
                      <Avatar
                        size="sm"
                        variant="circular"
                        alt="tania andrew"
                        src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        className="border-2 border-white hover:z-10"
                      />
                    </Tooltip>
                  </div>
                  <Typography className="font-normal">January 10</Typography>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </Reveal>
      <div className="flex flex-col text-center font-nunito tracking-tight">
        <Typography
          variant="h3"
          color="blue-gray"
          className="mb-2 text-center text-4xl font-nunito tracking-tight text-blue-500"
        >
          Choose the program that's right for you
        </Typography>
        <div className="grid grid-cols-1 gap-4 mt-20 mx-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3">
          <Card className="bg-sky-100 p-2 rounded-3xl">
            <CardHeader className="p-10">
              Cours particuliers et en groupe
            </CardHeader>
            <CardBody className="p-10 px-4 text-left">
              <p className="mb-3">Accès complet à l'intégralité de Cambly</p>
              <div className="ml-9 ">
                <p className="flex flex-row gap-2 mb-3">
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
                <p className="flex flex-row gap-2 mb-3">
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
                <p className="flex flex-row gap-2 mb-3">
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
            </CardBody>
            <CardFooter className="flex justify-items-start	flex-col items-center mt-auto p-4">
              <div className="text-left ">
                <p>À partir de</p>
                <p className="text-3xl mb-6 ">$37/mois</p>
              </div>
              <button
                className="select-none rounded-lg bg-gradient-to-tr from-orange-400 to-orange-300 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                S'inscrire
              </button>
            </CardFooter>
          </Card>
          <Card className="bg-sky-100 p-2 rounded-3xl">
            <CardHeader className="p-10">Groupe</CardHeader>
            <CardBody className="p-10 px-4 text-left">
              <p className="mb-3">Seulement les cours en groupe</p>
              <div className="ml-9 ">
                <p className="flex flex-row gap-2 mb-3">
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
                <p className="flex flex-row gap-2 mb-3">
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
                <p className="flex flex-row gap-2 mb-3">
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
                  Pour les adultes de plus de 21 ans
                </p>
              </div>
            </CardBody>
            <CardFooter className="flex justify-items-start	flex-col items-center mt-auto p-4">
              <div className="text-left flex flex-col">
                <p>À partir de</p>
                <p className="text-3xl mb-6 ">$16/mois</p>
              </div>
              <button
                className="select-none rounded-lg bg-gradient-to-tr from-orange-400 to-orange-300 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                S'inscrire
              </button>
            </CardFooter>
          </Card>
          <Card className="bg-sky-100 p-2 flex flex-col h-full rounded-3xl">
            <CardHeader className="p-10">Enfants</CardHeader>
            <CardBody className="p-10 px-4 text-left flex-1">
              <p className="mb-3">Pour les enfants (moins de 18 ans)</p>
              <div className="ml-9 ">
                <p className="flex flex-row gap-2 mb-3">
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
                  Cours particuliers avec des tuteurs spécialisés
                </p>
                <p className="flex flex-row gap-2 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-7 h-7"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.74a.75.75 0 0 1 1.04-.207Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Cours débutant à avancé disponibles
                </p>
                <p className="flex flex-row gap-2 mb-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-5 h-5"
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
            </CardBody>
            <CardFooter className="flex justify-items-start	flex-col items-center mt-auto p-4">
              <div className="text-left">
                <p>À partir de</p>
                <p className="text-3xl mb-6 ">$53/mois</p>
              </div>
              <button
                className="select-none rounded-lg bg-gradient-to-tr from-orange-400 to-orange-300 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                type="button"
              >
                S'inscrire
              </button>
            </CardFooter>
          </Card>
        </div>
      </div>
      <div className="flex justify-center mt-60 mb-40 ">
        <div className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[48rem] flex-row bg-orange-200">
          <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80"
              alt="card-image"
              className="object-cover w-full h-full"
            />
          </div>
          <div className="p-6">
            <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
              Try our free resources
            </h4>
            <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
              Discover our free resources! Tools, books and videos to help you
              learn English. Available without subscription.
            </p>
            <a href="#" className="inline-block">
              <button
                className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                type="button"
              >
                Register now
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
            </a>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-4 ">
        <RatingWithComment
          image={aa}
          name="chedi Amdouni"
          description="Full Stack Developer "
          rating={4}
        />
        <RatingWithComment
          image={bb}
          name="fathy el hadeoui"
          description="Lead Frontend Developper "
          rating={4}
        />
        <RatingWithComment />
      </div>
      <div className="flex flex-col text-center p-20 justify-center items-center">
        <p className="text-blue-500 text-3xl  font-extrabold px-80">
          Achieve your goals by learning English with Elearning App
        </p>
        <button
          className="max-w-xs select-none rounded-lg bg-gradient-to-tr from-orange-400 to-orange-300 py-3 px-10 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none mt-10"
          type="button"
        >
          Start learning
        </button>
      </div>
    </ApprenantLayout>
  );
};
export default DashboardApprenant;
