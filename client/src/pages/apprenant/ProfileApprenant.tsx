import { Button, Spinner } from "@material-tailwind/react";
import React, { useContext, useEffect } from "react";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import {
  IoArrowForwardCircleOutline,
  IoCheckmarkDoneOutline,
} from "react-icons/io5";
import { CiCalendar } from "react-icons/ci";
import { MdEmojiFlags } from "react-icons/md";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import courses from "../../assets/images/Courses.png";
import trial from "../../assets/images/Trial.png";
import subscribe from "../../assets/images/Subscribe.png";
import newsBanner from "../../assets/images/NewsBannerImg.png";
import tutors from "../../assets/images/Tutors.png";
import image1 from "../../assets/images/image1.png";
import image2 from "../../assets/images/image2.png";
import image3 from "../../assets/images/image3.png";
import light from "../../assets/images/lightbulb.png";
import schedule from "../../assets/images/reschedule_trial_checklist.png";
import { AuthContext } from "src/Context/AuthContext";

const ProfileApprenant = () => {
  const { user, isSignedIn } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div>
      {isSignedIn ? (
        <ApprenantLayout>
          <div className="container mx-auto px-7 py-7 ">
            <div className="md:flex no-wrap md:-mx-2 ">
              <div className="md:w-4/12 md:mx-2 gap-2 space-y-4 font-korto font-sans">
                <div className="bg-white border rounded-3xl p-5">
                  <img src={user?.profileImageUrl} alt=""></img>
                  <p className="text-3xl font-bold ">
                    Bienvenue sur Notre Plateform, {user?.username} !
                  </p>
                </div>
                <div className=" border rounded-3xl p-5 flex justify-between cursor-pointer">
                  <p className="font-semibold ">
                    Cours en groupe maintenant disponibles
                  </p>
                  <IoArrowForwardCircleOutline size="30px" />
                </div>

                <div className=" border rounded-3xl p-5  flex justify-between cursor-pointer">
                  <p className="font-semibold">Parrainer un ami</p>
                  <IoArrowForwardCircleOutline size="30px" />
                </div>
                <div className=" border rounded-3xl p-5 space-y-3">
                  <img className="mx-auto block p-4" src={newsBanner} alt="" />
                  <p className="font-bold pr-10 text-2xl tracking-tight">
                    Comment fonctionne LearnUp
                  </p>
                  <div className="p-2 space-y-2">
                    <p className="flex gap-2 ">
                      <IoCheckmarkDoneOutline size={30} />
                      Discutez en direct avec des tuteurs natifs dans chaque
                      leçon
                    </p>
                    <p className="flex gap-2 ">
                      <IoCheckmarkDoneOutline size={30} />
                      Planifiez des leçons à l'avance ou discutez quand vous
                      êtes libre, 24 heures sur 24 et 7 jours sur 7
                    </p>
                    <p className="flex gap-2 ">
                      <IoCheckmarkDoneOutline size={30} />
                      Tous les tuteurs, cours et outils sont inclus dans chaque
                      abonnement.
                    </p>
                  </div>
                  <Button
                    className="mx-auto block mt-6 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
                    type="button"
                    onClick={() => {
                      navigate("/apprenant");
                    }}
                  >
                    Pratiquer maintenant
                  </Button>
                </div>
              </div>
              <div className="w-full md:w-8/12 mx-2 space-y-6 font-korto font-sans">
                <div className=" border rounded-3xl p-5 divide-y divide-solid">
                  <div className="font-semibold font-sans text-2xl  mb-5">
                    C'est parti !
                  </div>
                  <div
                    className="mt-5 flex items-center justify-between p-5 cursor-pointer"
                    onClick={() => {
                      navigate("/apprenant");
                    }}
                  >
                    <div className="flex align-items gap-4 mt-4">
                      <img
                        className="relative w-22 h-22 flex-shrink-0"
                        src={trial}
                        alt="aaaa"
                      ></img>
                      <div className="flex flex-col">
                        <div className="font-semibold font-sans ">
                          Discutez avec un tuteur pour seulement 1,00 $US
                        </div>
                        <div className="text-xs">
                          Essayez Cambly avec un cours d'essai de 30 minutes
                        </div>
                      </div>
                    </div>
                    <IoArrowForwardCircleOutline size="30px" />
                  </div>
                  <div className="mt-5 flex items-center justify-between p-5 cursor-pointer">
                    <div className="flex align-items gap-4 mt-4">
                      <img
                        className="relative w-22 h-22 flex-shrink-0"
                        src={subscribe}
                        alt="aaaa"
                      ></img>
                      <div className="flex flex-col">
                        <div className="font-semibold font-sans">
                          Abonnez-vous et commencez l'apprentissage
                        </div>
                        <div className="text-xs">
                          Choisissez un programme d'apprentissage qui vous
                          convient
                        </div>
                      </div>
                    </div>
                    <IoArrowForwardCircleOutline size="30px" />
                  </div>
                  <div className="mt-5 flex items-center justify-between p-5 cursor-pointer">
                    <div className="flex align-items gap-4 mt-4">
                      <img
                        className="relative w-22 h-22 flex-shrink-0"
                        src={tutors}
                        alt="aaaa"
                      ></img>
                      <div className="flex flex-col">
                        <div className="font-semibold font-sans">
                          Parcourez notre communauté de tuteurs
                        </div>
                        <div className="text-xs">
                          Trouvez un tuteur sympathique pour commencer à
                          pratiquer l'anglais
                        </div>
                      </div>
                    </div>
                    <IoArrowForwardCircleOutline size="30px" />
                  </div>
                  <div
                    className="mt-5 flex items-center justify-between p-5 cursor-pointer"
                    onClick={() => {
                      navigate("/cour");
                    }}
                  >
                    <div className="flex align-items gap-4 mt-4">
                      <img
                        className="relative w-22 h-22 flex-shrink-0"
                        src={courses}
                        alt="aaaa"
                      ></img>
                      <div className="flex flex-col">
                        <div className="font-semibold font-sans ">
                          Voir nos cours
                        </div>
                        <div className="text-xs">
                          Découvrez des supports de cours sur mesure qui
                          correspondent à vos centres d'intérêt
                        </div>
                      </div>
                    </div>
                    <IoArrowForwardCircleOutline size="30px" />
                  </div>
                </div>
                <div className=" border  rounded-3xl p-5 ">
                  <div className="flex gap-2 mb-5">
                    <img src={light} alt="" />
                    <div className="flex flex-col">
                      <p className="font-semibold text-2xl tracking-tight">
                        Trouvez des tuteurs qui vous font parler
                      </p>
                      <p>
                        Des tuteur pour chaque style d'apprentissage et chaque
                        intérêt.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 p-5">
                    <div className="flex justify-center">
                      <div className="rounded-3xl shadow-lg bg-white max-w-sm w-64 duration-500 hover:scale-105 hover:shadow-xl shadow-md">
                        <a href="#!">
                          <video
                            width="320"
                            height="240"
                            controls
                            className="w-full rounded-t-3xl"
                          >
                            <source
                              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                              type="video/mp4"
                            />
                            <source src="movie.ogg" type="video/ogg" />
                            Your browser does not support the video tag.
                          </video>
                        </a>
                        <div className="p-6 ">
                          <div className="text-gray-900 text-xl font-medium mb-2">
                            Ghassen
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <MdEmojiFlags size="20px" />
                            <div className="text-gray-700 text-xs ">
                              Accent Americaine
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <CiCalendar size="20px" />
                            <div className="text-gray-700 text-xs ">
                              tuteur depuis 2023
                            </div>
                          </div>

                          <Link
                            to="/apprenant"
                            type="button"
                            className="flex items-center justify-between mt-10 inline-block px-6 py-2.5 bg-orange-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Voir le profil
                            <FaArrowRightLong />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="rounded-3xl shadow-lg bg-white max-w-sm w-64 duration-500 hover:scale-105 hover:shadow-xl shadow-md">
                        <a href="#!">
                          <video
                            width="320"
                            height="240"
                            controls
                            className="w-full rounded-t-3xl"
                          >
                            <source
                              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                              type="video/mp4"
                            />
                            <source src="movie.ogg" type="video/ogg" />
                            Your browser does not support the video tag.
                          </video>
                        </a>
                        <div className="p-6 ">
                          <div className="text-gray-900 text-xl font-medium mb-2">
                            Ghassen
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <MdEmojiFlags size="20px" />
                            <div className="text-gray-700 text-xs ">
                              Accent Americaine
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <CiCalendar size="20px" />
                            <div className="text-gray-700 text-xs ">
                              tuteur depuis 2023
                            </div>
                          </div>

                          <Link
                            to="/apprenant"
                            type="button"
                            className="flex items-center justify-between mt-10 inline-block px-6 py-2.5 bg-orange-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Voir le profil
                            <FaArrowRightLong />
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="rounded-3xl shadow-lg bg-white max-w-sm w-64 duration-500 hover:scale-105 hover:shadow-xl shadow-md">
                        <a href="#!">
                          <video
                            width="320"
                            height="240"
                            controls
                            className="w-full rounded-t-3xl"
                          >
                            <source
                              src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
                              type="video/mp4"
                            />
                            <source src="movie.ogg" type="video/ogg" />
                            Your browser does not support the video tag.
                          </video>
                        </a>
                        <div className="p-6 ">
                          <div className="text-gray-900 text-xl font-medium mb-2">
                            Ghassen
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <MdEmojiFlags size="20px" />
                            <div className="text-gray-700 text-xs ">
                              Accent Americaine
                            </div>
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            <CiCalendar size="20px" />
                            <div className="text-gray-700 text-xs ">
                              tuteur depuis 2023
                            </div>
                          </div>

                          <Link
                            to="/apprenant"
                            type="button"
                            className="flex items-center justify-between mt-10 inline-block px-6 py-2.5 bg-orange-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-orange-700 hover:shadow-lg focus:bg-orange-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-orange-800 active:shadow-lg transition duration-150 ease-in-out"
                          >
                            Voir le profil
                            <FaArrowRightLong />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className=" border  rounded-3xl p-5 ">
                  <div className="flex gap-3 mb-5">
                    <img src={schedule} alt="" className="w-24"/>
                    <div className="flex flex-col">
                      <p className="font-semibold text-2xl tracking-tight">
                        Découvrez nos formations guidées
                      </p>
                      <p>
                        Ajoutez plus de structure aux leçons avec des cours.
                        Inclus dans chaque abonnement LearnUp.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-row gap-4 p-5">
                    <div className="flex justify-center">
                      <div className="rounded-3xl shadow-lg bg-white max-w-sm w-64 ">
                        <a href="#!">
                          <div className="rounded-t-lg h-24 overflow-hidden">
                            <img
                              className="object-cover object-top w-full "
                              src={image1}
                              alt="Mountain"
                            />
                          </div>
                        </a>
                        <div className="p-6 ">
                          <div className="text-gray-900 text-xl font-medium mb-2">
                            Anglais social des affaires
                          </div>
                          <div className="text-gray-700 text-s ">
                            Compétences en communication pour les situations
                            sociales au bureau et ailleurs !
                          </div>
                          <Link
                            to="#"
                            type="button"
                            className="flex items-center border rounded-lg mt-10 shadow-md hover:bg-blue-400 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg inline-block px-6 py-2.5  text-blue-800 font-medium text-s leading-tight transition duration-150 ease-in-out"
                          >
                            Continuer
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="rounded-3xl shadow-lg bg-white max-w-sm w-64 ">
                        <a href="#!">
                          <div className="rounded-t-lg h-24 overflow-hidden">
                            <img
                              className="object-cover object-top w-full"
                              src={image2}
                              alt="Mountain"
                            />
                          </div>
                        </a>
                        <div className="p-6 ">
                          <div className="text-gray-900 text-xl font-medium mb-2">
                            Anglais académique - Intermédiaire
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            {/* <MdEmojiFlags size="20px" /> */}
                            <div className="text-gray-700 text-s ">
                              Pratiquez l'écoute, l'expression orale, la lecture
                              et l'écriture dans des situations académiques.
                            </div>
                          </div>

                          <Link
                            to="#"
                            type="button"
                            className="flex items-center border rounded-lg mt-10 shadow-md hover:bg-blue-400 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg inline-block px-6 py-2.5  text-blue-800 font-medium text-s leading-tight transition duration-150 ease-in-out"
                          >
                            Continuer
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="rounded-3xl shadow-lg bg-white max-w-sm w-64 ">
                        <a href="#!">
                          <div className="rounded-t-lg h-24 overflow-hidden">
                            <img
                              className="object-cover object-top w-full"
                              src={image3}
                              alt="Mountain"
                            />
                          </div>
                        </a>
                        <div className="p-6 ">
                          <div className="text-gray-900 text-xl font-medium mb-2">
                            Décrivez ceci ! (Technologie)
                          </div>
                          <div className="flex items-center gap-2 mb-4">
                            {/* <MdEmojiFlags size="20px" /> */}
                            <div className="text-gray-700 text-s ">
                              Décrivez et discutez des photos intéressantes
                              liées aux technologies !
                            </div>
                          </div>
                          <Link
                            to="#"
                            type="button"
                            className="flex items-center border rounded-lg mt-auto shadow-md hover:bg-blue-400 hover:shadow-lg focus:bg-blue-400 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-600 active:shadow-lg inline-block px-6 py-2.5  text-blue-800 font-medium text-s leading-tight transition duration-150 ease-in-out"
                          >
                            Continuer
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ApprenantLayout>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Spinner className="h-16 w-16 text-gray-900/50" />
        </div>
      )}
    </div>
  );
};
export default ProfileApprenant;
