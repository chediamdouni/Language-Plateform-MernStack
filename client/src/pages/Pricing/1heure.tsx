import React from "react";
const OneHour = () => {
  return (
    <>
      {" "}
      <div className="text-black text-3xl font-bold mb-5">Etape 2 :</div>
      <div className="text-xl">Quel type d'abonnement préférez vous ?</div>
      <ul className="text-xl text-gray-900 bg-white space-y-5">
        <li className="w-full border border-gray-200 rounded-lg p-5">
          <div className="flex items-center ps-3">
            <input
              id="list-radio-license"
              type="radio"
              value="30 minutes/semaine"
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
          <div className="flex place-content-end">
            <div className="border rounded-full bg-red-600 text-white text-center w-64 ">
              10% de réduction
            </div>
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
          <div className="flex place-content-end">
            <div className="border rounded-full bg-red-600 text-white text-center w-64 ">
              25% de réduction
            </div>
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
    </>
  );
};
export default OneHour;
