import React, { useState } from "react";
import person from "../assets/images/default.png";
import exclamation from "../assets/images/exclamation.png";
import logo from "../assets/images/logo.jpg";
import group from "../assets/images/group.png";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
const Pricing = () => {
  const [value, setValue] = useState<string>("");
  const  navigate = useNavigate();
  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    setValue(e.target.value);
  };
  return (
    <div className="min-h-screen bg-sky-200 flex justify-center items-center font-korto font-sans ">
      <div className="max-w-screen-xl w-full border bg-white rounded-lg m-4">
        <button className="p-5 ml-4 " onClick={()=>navigate(-1)}><FaArrowLeft size={32}/></button>
        <div className="flex flex-rows items-center justify-center m-4">
          <img src={logo} alt="" className="h-20 w-20" />
          <div className="font-semibold text-xl tracking-tight ">
            Créer votre abonnement personnalisé.
          </div>
        </div>
        <div className="flex items-center justify-center  ">
          <div className="box1">
            <div className="md:flex no-wrap md:-mx-2 gap-5 m-5">
              <div className="w-full md:w-6/12 md:mx-2 gap-2 space-y-4 ">
                <div className="text-black text-3xl font-bold mb-5">
                  Etape 1 :
                </div>
                <div className="text-xl">Combien d'heures voulez-vous ?</div>
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
                            className="w-full py-3 ms-2 text-xl  text-gray-900 dark:text-gray-300"
                          >
                            <span className="font-bold">1 heure</span>/semaine
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
                            className="w-full py-3 ms-2 text-xl  text-gray-900 dark:text-gray-300"
                          >
                            <span className="font-bold">1 heure</span>/semaine
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-6/12 mx-2 space-y-4">
                <div className="text-black text-3xl font-bold mb-5">
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
                        value="Programmez des cours n'importe quel jour de la semaine, jusqu'à 30 minutes par jour"
                        name="list-radio"
                        className="w-10 h-10 text-blue-600 bg-gray-100 border-gray-300 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700  dark:bg-gray-600 dark:border-gray-500"
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
                </div>
              </div>
            </div>
          </div>

          <div className="box2"></div>
        </div>
      </div>
    </div>
  );
};
export default Pricing;
