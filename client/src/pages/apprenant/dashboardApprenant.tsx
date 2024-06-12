import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  CardFooter,
  Tooltip,
  Avatar,
} from "@material-tailwind/react";
import { MdPerson } from "react-icons/md";
import { IoMdHeartEmpty } from "react-icons/io";
import person from "../../assets/images/default.png";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import { AuthContext } from "src/Context/AuthContext";
import { PiStudentDuotone } from "react-icons/pi";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";

interface Tutor {
  id: number;
  name: string;
  country: string;
  Language: string;
  aboutMe: string;
  subjects: string[];
}
const tutors: Tutor[] = [
  {
    id: 1,
    name: "Jean Dupont",
    country: "angleterre",
    Language: "Anglais",
    aboutMe:
      "French Community Tutor with 5 years of experience Hello everyone! Bonjour tout le monde! I'm Marwa,from Tunisia and currently based in Spain.",
    subjects: ["Mathématiques", "Physique"],
  },
  {
    id: 2,
    name: "Marie Durand",
    country: "tunis",
    Language: "Arabe",
    aboutMe:
      "French Community Tutor with 5 years of experience Hello everyone! Bonjour tout le monde! I'm Marwa,from Tunisia and currently based in Spain.",
    subjects: ["Anglais", "Français"],
  },
  {
    id: 3,
    name: "Pierre Martin",
    country: "france",
    Language: "Français",
    aboutMe:
      "French Community Tutor with 5 years of experience Hello everyone! Bonjour tout le monde! I'm Marwa,from Tunisia and currently based in Spain.",
    subjects: ["Chimie", "Biologie"],
  },
  {
    id: 4,
    name: "Sophie Lambert",
    country: "italie",
    Language: "italien",
    aboutMe:
      "French Community Tutor with 5 years of experience Hello everyone! Bonjour tout le monde! I'm Marwa,from Tunisia and currently based in Spain.",
    subjects: ["Mathématiques", "Physique"],
  },
];

const DashboardApprenant: React.FC = () => {
  const navigate = useNavigate();
  const { user, isSignedIn } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Tutor[]>([]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const results = searchTutors(query);
    setSearchResults(results);
  };

  useEffect(() => {
    if (!isSignedIn && !user) {
      console.log("Not Authorized");
      toast("🦄 Not Authorized!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      navigate("/");
    }
  }, [isSignedIn, user, navigate]);

  useEffect(() => {
    setSearchResults(tutors);
  }, []);

  const searchTutors = (query: string): Tutor[] => {
    const normalizedQuery = query.toLowerCase().trim();
    return tutors.filter(
      (tutor) =>
        tutor.name.toLowerCase().includes(normalizedQuery) ||
        tutor.Language.toLowerCase().includes(normalizedQuery) ||
        tutor.subjects.some((subject) =>
          subject.toLowerCase().includes(normalizedQuery)
        )
    );
  };

  return (
    <ApprenantLayout>
      <div className="mt-4 mx-10 p-5 font-korto font-sans">
        <div className="font-bold text-xl">
          Trouver des professeurs en ligne pour des cours particuliers
        </div>
        <div>
          <form className="max-w-full mt-5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Rechercher un tuteur..."
                value={searchQuery}
                onChange={handleSearchChange}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4 text-white-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className="mt-6 p-4 flex flex-col space-y-4 ">
            {searchResults.map((tutor) => (
              <div
                key={tutor.id}
                className="bg-white rounded-lg border-2 overflow-hidden flex shadow-md w-2/3"
              >
                <div>
                  <img
                    src={person}
                    alt=""
                    className="w-20 h-20 rounded-lg object-fit "
                  />
                </div>

                <div className="w-full p-4">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {tutor.name}
                    </h3>
                    <div className="flex gap-3 mr-5">
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-1 font-bold text-xl">
                          <FaStar />5
                        </div>
                        <div className="text-gray-600 font-semibold">
                          ( 3 avis )
                        </div>
                      </div>
                      <div className="flex flex-col items-center">
                        <div className="font-bold text-xl">$12</div>
                        <div className="text-gray-600 font-semibold">
                          {" "}
                          50min-cours{" "}
                        </div>
                      </div>
                      <div className="ml-5">
                        <IoMdHeartEmpty size={"30px"} />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-1 items-center">
                    <PiStudentDuotone />
                    <div className="text-base font-thin capitalize">
                      {tutor.Language}
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    {" "}
                    <MdPerson />
                    <div className="font-thin text-gray-500">
                      12 active students • 6 lessons
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 32 32"
                    >
                      <rect
                        x="1"
                        y="4"
                        width="30"
                        height="24"
                        rx="4"
                        ry="4"
                        fill="#d52e23"
                      ></rect>
                      <path
                        d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                        opacity=".15"
                      ></path>
                      <path
                        d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                        fill="#fff"
                        opacity=".2"
                      ></path>
                      <path
                        d="M16,10c-3.314,0-6,2.686-6,6s2.686,6,6,6,6-2.686,6-6-2.686-6-6-6Zm3.384,7.587l-1.865-.606-1.153,1.587v-1.962l-1.866-.606,1.866-.606v-1.962l1.153,1.587,1.865-.606-1.153,1.587,1.153,1.587Zm-2.184-5.187c-1.988,0-3.6,1.612-3.6,3.6s1.612,3.6,3.6,3.6c.941,0,1.797-.361,2.438-.951-.818,1.122-2.143,1.851-3.638,1.851-2.485,0-4.5-2.015-4.5-4.5s2.015-4.5,4.5-4.5c1.495,0,2.82,.729,3.638,1.851-.641-.591-1.497-.951-2.438-.951Z"
                        fill="#fff"
                      ></path>
                    </svg>
                    <div className="capitalize font-thin text-gray-500">
                      {tutor.country}
                    </div>
                  </div>
                  <div className="flex items-center ">
                    <div>{tutor.aboutMe}</div>
                    <div className="space-y-2">
                      {" "}
                      <button
                        className="border-2 w-64 rounded-xl p-3 text-center hover:bg-sky-300 font-semibold "
                        onClick={() => {
                          navigate("/apprenant/tuteur");
                        }}
                      >
                        Leçon d'essaie
                      </button>
                      <button className="border-2 w-64 rounded-xl p-3 text-center hover:bg-sky-300 font-semibold ">
                        Send Message
                      </button>
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Matieres: {tutor.subjects.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ApprenantLayout>
  );
};
export default DashboardApprenant;
