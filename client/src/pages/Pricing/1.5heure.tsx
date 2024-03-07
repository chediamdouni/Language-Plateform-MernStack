import React, { useState } from "react";

interface OneAndHalfHourProps {
  onValuesChange: (monthly: number, quarter: number, annual: number) => void;
}
const OneAndHalfHour: React.FC<OneAndHalfHourProps> = ({ onValuesChange }) => {
  const [monthlyPrice, setMonthlyPrice] = useState<number>(0);
  const [quaterPrice, setQuarterPrice] = useState<number>(0);
  const [AnnualPrice, setAnnualPrice] = useState<number>(0);

  const calculatePrice = (selectedValue: string) => {
    let TotalpricePerMonth = 0;
    let TotalpricePerQuarter = 0;
    let TotalpricePerYear = 0;
    switch (selectedValue) {
      case "monthly":
        TotalpricePerMonth = 105 * 12;
        break;
      case "quarter":
        const reductionQ = 1140 * 0.1;
        TotalpricePerQuarter = parseInt((95 * 12 - reductionQ).toFixed(0));
        break;
      case "annual":
        const reductionA = (948 * 25) / 100;
        TotalpricePerYear = parseInt((79 * 12 - reductionA).toFixed(0));
        break;
      default:
        break;
    }

    setMonthlyPrice(TotalpricePerMonth);
    setQuarterPrice(TotalpricePerQuarter);
    setAnnualPrice(TotalpricePerYear);

    onValuesChange(TotalpricePerMonth, TotalpricePerQuarter, TotalpricePerYear);
  };

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    console.log(selectedValue);
    calculatePrice(selectedValue);
  };

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
              value="monthly"
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
                <div>105 $US/mois</div>
              </div>
            </label>
          </div>
        </li>
        <li className="w-full border border-gray-200 rounded-lg p-5">
          <div className="flex items-center ps-3">
            <input
              id="list-radio-id"
              type="radio"
              value="quarter"
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
                <div>95 $US/mois</div>
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
              value="annual"
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
                <div>79 $US/mois</div>
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
export default OneAndHalfHour;
