import React, { useState } from "react";
import person from "../../assets/images/default.png";
import exclamation from "../../assets/images/exclamation.png";
import logo from "../../assets/images/logo.jpg";
import group from "../../assets/images/group.png";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Tooltip, Typography } from "@material-tailwind/react";
import Halfhour from "./30min";
import OneHour from "./1heure";
import OneAndHalfHour from "./1.5heure";
import TwoHour from "./2heure";
import OneGroupe from "./groupe1";
import HalfGroupe from "./groupe0.5";
import DefaultComponent from "./DefaultComponent";

const Pricing = () => {
  const [selectedHours, setSelectedHours] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState<number>(0);
  const [quarterlyPrice, setQuarterlyPrice] = useState<number>(0);
  const [annualPrice, setAnnualPrice] = useState<number>(0);
  const [value, setValue] = useState<string>("");
  const [selectedCourses, setSelectedCourses] = useState("");
  const navigate = useNavigate();

  const calculerPrix = (selectedValue: string) => {
    let pricePerMonth = 0;
    let pricePerQuarter = 0;
    let pricePerYear = 0;
    switch (selectedValue) {
      case "30 minutes/semaine":
        pricePerMonth = 50;
        pricePerQuarter = pricePerMonth * 3 * 0.9;
        pricePerYear = pricePerMonth * 12 * 0.8;
        break;
      case "1 heure/semaine":
        pricePerMonth = 80;
        pricePerQuarter = pricePerMonth * 3 * 0.9;
        pricePerYear = pricePerMonth * 12 * 0.8;
        break;
      case "1.5 heures/semaine":
        pricePerMonth = 100;
        pricePerQuarter = pricePerMonth * 3 * 0.9;
        pricePerYear = pricePerMonth * 12 * 0.8;
        break;
      case "2.5 heures/semaine":
        pricePerMonth = 120;
        pricePerQuarter = pricePerMonth * 3 * 0.9;
        pricePerYear = pricePerMonth * 12 * 0.8;
        break;
      default:
        break;
    }

    // Mettre à jour les états des prix
    setMonthlyPrice(pricePerMonth);
    setQuarterlyPrice(pricePerQuarter);
    setAnnualPrice(pricePerYear);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setSelectedCourses(selectedValue);
    // setSelectedHours(selectedValue);
    // calculerPrix(selectedValue);
    setValue(e.target.value);
  };
  const handleRadioGroupeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setSelectedCourses(selectedValue);
    // setSelectedHours(selectedValue);
    // calculerPrix(selectedValue);
    // setValue(e.target.value);
  };

  return (
    <div className="min-h-screen bg-sky-200 flex justify-center items-center font-korto font-sans ">
      <div className="max-w-screen-xl w-full border bg-white rounded-lg m-10 p-5">
        <button className="p-5 ml-4 " onClick={() => navigate(-1)}>
          <FaArrowLeft size={32} />
        </button>
        <div className="flex flex-rows items-center justify-start m-4">
          <img src={logo} alt="" className="h-20 w-20" />
          <div className="font-semibold text-2xl tracking-tight ">
            Créer votre abonnement personnalisé.
          </div>
        </div>
        <div className="flex flex-col">
          <div className="md:flex no-wrap md:-mx-2 gap-5 m-5 p-5">
            {/* Etape 1 */}
            <div className="w-full md:w-6/12 md:mx-2 gap-2 space-y-6 ">
              <div className="text-black text-3xl font-bold mb-5">
                Etape 1 :
              </div>
              <div className="text-xl">Combien d'heures voulez-vous ?</div>
              {/* individuals  */}
              <div className="flex flex-col rounded-2xl border ">
                <div className="flex items-center flex-rows gap-5 border rounded-t-2xl w-full bg-sky-200 p-5">
                  <img src={person} alt="" className="h-14 w-14 " />
                  <div className="block">
                    <div className="font-bold text-lg">
                      Cours particuliers et en groupe
                    </div>
                    <div className="text-lg">
                      Accès aux cours particuliers et aux cours en groupe
                    </div>
                  </div>
                </div>
                <div className="block">
                  <ul className="text-xl text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input
                          id="list-radio-license"
                          type="radio"
                          value="Programmez des cours n'importe quel jour de la semaine, jusqu'à 30 minutes par jour"
                          name="list-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
                          onChange={handleRadioChange}
                        />
                        <label
                          htmlFor="list-radio-license"
                          className="w-full py-3 ms-2 text-xl  text-gray-900 dark:text-gray-300"
                        >
                          <span className="font-bold">30 minutes</span>
                          /semaine
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input
                          id="list-radio-id"
                          type="radio"
                          value="Programmez des cours n'importe quel jour de la semaine, jusqu'à 1 heure par jour"
                          name="list-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
                          onChange={handleRadioChange}
                        />
                        <label
                          htmlFor="list-radio-id"
                          className="flex justify-between w-full py-3 ms-2 text-xl  text-gray-900 dark:text-gray-300"
                        >
                          <div>
                            <span className="font-bold">1 heure</span>/semaine
                          </div>
                          <div className="rounded-full border bg-sky-200 mr-4 text-xs p-2 font-bold w-32 text-center">
                            Le plus populaire{" "}
                          </div>
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input
                          id="list-radio-military"
                          type="radio"
                          value="Programmez des cours n'importe quel jour de la semaine, jusqu'à 1,5 heure par jour"
                          name="list-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
                          onChange={handleRadioChange}
                        />
                        <label
                          htmlFor="list-radio-military"
                          className="w-full py-3 ms-2 text-xl  text-gray-900 dark:text-gray-300"
                        >
                          <span className="font-bold">1.5 heures</span>
                          /semaine
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input
                          id="list-radio-passport"
                          type="radio"
                          value="Programmez des cours n'importe quel jour de la semaine, jusqu'à 2 heure par jour"
                          name="list-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
                          onChange={handleRadioChange}
                        />
                        <label
                          htmlFor="list-radio-passport"
                          className="w-full py-3 ms-2 text-xl text-gray-900 dark:text-gray-300"
                        >
                          <span className="font-bold">2.5 heures</span>
                          /semaine
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-rows items-center gap-4 rounded-b-xl p-7 bg-sky-200">
                  <img
                    src={exclamation}
                    alt=""
                    className="h-10 w-10 rounded-full "
                  />
                  <div className="text-lg font-semibold flex-1">
                    {value ||
                      "Programmez des cours n'importe quel jour de la semaine, jusqu'à 30 minutes par jour"}
                  </div>
                </div>
              </div>
              {/* groupe */}
              <div className="flex flex-col rounded-2xl border ">
                <div className="flex items-center flex-rows gap-5 border w-full rounded-t-2xl bg-sky-200 p-5">
                  <img src={group} alt="" className="h-14 w-14" />
                  <div className="block">
                    <div className="font-bold text-lg">Cours en groupe</div>
                    <div className="text-lg">
                      Cours en groupe seulement (pour les plus de 21 ans)
                    </div>
                  </div>
                </div>
                <div className="block">
                  <ul className="text-xl text-gray-900 bg-white dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input
                          id="list-radio-license"
                          type="radio"
                          value="groupe1"
                          name="list-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
                          onChange={handleRadioGroupeChange}
                        />
                        <label
                          htmlFor="list-radio-license"
                          className="w-full py-3 ms-2 text-xl  text-gray-900 dark:text-gray-300"
                        >
                          <span className="font-bold">30 minutes</span>
                          /semaine
                        </label>
                      </div>
                    </li>
                    <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
                      <div className="flex items-center ps-3">
                        <input
                          id="list-radio-id"
                          type="radio"
                          value="groupe2"
                          name="list-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300  dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
                          onChange={handleRadioGroupeChange}
                        />
                        <label
                          htmlFor="list-radio-id"
                          className="flex justify-between w-full py-3 ms-2 text-xl  text-gray-900 dark:text-gray-300"
                        >
                          <div>
                            <span className="font-bold">1 heure</span>/semaine
                          </div>
                          <div className="rounded-full border bg-green-500 mr-4 text-xs p-2 font-bold w-32 text-center">
                            Meilleur Prix
                          </div>
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Etape 2 */}
            <div className="w-full md:w-6/12 mx-2 space-y-4">
              {/* <div className="text-black text-3xl font-bold mb-5">
                Etape 2 :
              </div>
              <div className="text-xl">
                Quel type d'abonnement préférez vous ?
              </div>
              <ul className="text-xl text-gray-900 bg-white space-y-5">
                <li className="w-full border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center ps-3">
                    <input
                      id="list-radio-license"
                      type="radio"
                      value="30 minutes/semaine"
                      name="list-radio"
                      className="w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
                      onChange={handleRadioChange}
                    />
                    <label
                      htmlFor="list-radio-license"
                      className="w-full py-3 ms-2 text-xl  text-gray-900 dark:text-gray-300"
                    >
                      <div className="font-bold flex justify-between">
                        <div>Mensuel</div>
                        <div>79 $US/mois</div>
                      </div>
                    </label>
                  </div>
                </li>
                <li className="w-full border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center ps-3">
                    <input
                      id="list-radio-id"
                      type="radio"
                      value="Programmez des cours n'importe quel jour de la semaine, jusqu'à 1 heure par jour"
                      name="list-radio"
                      className="w-10 h-10 text-blue-600 bg-gray-100 border-gray-300  dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
                      onChange={handleRadioChange}
                    />
                    <label
                      htmlFor="list-radio-id"
                      className="w-full py-3 ms-2 text-xl  text-gray-900 dark:text-gray-300"
                    >
                      <div className="font-bold flex justify-between">
                        <div>Tous les 3 mois </div>
                        <div>71 $US/mois</div>
                      </div>
                    </label>
                  </div>
                </li>
                <li className="w-full border border-gray-200 rounded-lg p-5">
                  <div className="flex items-center ps-3">
                    <input
                      id="list-radio-military"
                      type="radio"
                      value="Programmez des cours n'importe quel jour de la semaine, jusqu'à 1,5 heure par jour"
                      name="list-radio"
                      className="w-10 h-10 text-blue-600 bg-gray-100 border-gray-300  dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
                      onChange={handleRadioChange}
                    />
                    <label
                      htmlFor="list-radio-military"
                      className="w-full py-3 ms-2 text-xl  text-gray-900 dark:text-gray-300"
                    >
                      <div className="font-bold flex justify-between">
                        <div>Annuel</div>
                        <div>59 $US/mois</div>
                      </div>
                    </label>
                  </div>
                </li>
              </ul>
              <div className="flex justify-end">
                <button className="border rounded-lg text-white bg-blue-400 w-80 h-16 flex items-center p-4 font-bold">
                  Etape suivante : mode de paiment
                  <svg
                    fill="none"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    className="w-6 h-6 ml-2"
                  >
                    <path d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </button>
              </div> */}
              {/* individual components */}
              {selectedCourses ===
                "Programmez des cours n'importe quel jour de la semaine, jusqu'à 30 minutes par jour" && (
                <Halfhour />
              )}
              {selectedCourses ===
                "Programmez des cours n'importe quel jour de la semaine, jusqu'à 1 heure par jour" && (
                <OneHour />
              )}
              {selectedCourses ===
                "Programmez des cours n'importe quel jour de la semaine, jusqu'à 1,5 heure par jour" && (
                <OneAndHalfHour />
              )}
              {selectedCourses ===
                "Programmez des cours n'importe quel jour de la semaine, jusqu'à 2 heure par jour" && (
                <TwoHour />
              )}
              {/* groupe components */}
              {selectedCourses === "groupe1" && <HalfGroupe />}
              {selectedCourses === "groupe2" && <OneGroupe />}
              {/* Default component */}
              {selectedCourses !==
                "Programmez des cours n'importe quel jour de la semaine, jusqu'à 30 minutes par jour" &&
                selectedCourses !==
                  "Programmez des cours n'importe quel jour de la semaine, jusqu'à 1 heure par jour" &&
                selectedCourses !==
                  "Programmez des cours n'importe quel jour de la semaine, jusqu'à 1,5 heure par jour" &&
                selectedCourses !==
                  "Programmez des cours n'importe quel jour de la semaine, jusqu'à 2 heure par jour" &&
                selectedCourses !== "groupe1" &&
                selectedCourses !== "groupe2" && <DefaultComponent />}
            </div>
          </div>
          {/* la partie resumé de l'abonnement  */}
          <div className="flex justify-center items-center font-korto font-sans">
            <div className="w-1/2 p-3 space-y-4">
              <div className="space-y-6 flex-col">
                <div className="font-semibold text-xl text-center">
                  Résumé de l'abonnement
                </div>
                <div className="flex justify-between">
                  <div className="font-bold ">Prix mensuel original (x 12)</div>
                  <div>: la somme </div>
                </div>
              </div>
              <div className="flex justify-between bg-sky-200 rounded-full p-1">
                <div className="flex gap-2 items-center ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0px"
                    y="0px"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                  >
                    <path d="M 12 2 C 6.5 2 2 6.5 2 12 C 2 17.5 6.5 22 12 22 C 17.5 22 22 17.5 22 12 C 22 10.9 21.8 9.8007812 21.5 8.8007812 L 19.800781 10.400391 C 19.900781 10.900391 20 11.4 20 12 C 20 16.4 16.4 20 12 20 C 7.6 20 4 16.4 4 12 C 4 7.6 7.6 4 12 4 C 13.6 4 15.100391 4.5007812 16.400391 5.3007812 L 17.800781 3.9003906 C 16.200781 2.7003906 14.2 2 12 2 z M 21.300781 3.3007812 L 11 13.599609 L 7.6992188 10.300781 L 6.3007812 11.699219 L 11 16.400391 L 22.699219 4.6992188 L 21.300781 3.3007812 z"></path>
                  </svg>
                  <div className="flex gap-2">
                    <div className="font-semibold">
                      Achetez en toute confiance :
                    </div>{" "}
                    Annulez quand vous le souhaitez
                  </div>
                </div>
                <Tooltip
                  placement="right"
                  className="bg-black"
                  content={
                    <div className="w-80">
                      <Typography
                        variant="small"
                        color="white"
                        className="font-normal opacity-80"
                      >
                        Annuler quand vous souhaitez et payez le prix mensuel de
                        base selon le nombre de mois que vous avez choisi
                      </Typography>
                    </div>
                  }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    className="h-5 w-5 cursor-pointer text-blue-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                </Tooltip>
              </div>
              <div className="font-thin text-slate-400 text-center text-sm">
                L'abonnement est renouvelé tous les 12 mois. Résiliez à tout
                moment.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Pricing;
