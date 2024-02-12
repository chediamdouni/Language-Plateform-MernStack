import React from "react";
import aa from "../assets/images/aa.jpg";
import bb from "../assets/images/bb.jpg";
import cc from "../assets/images/cc.jpg";
import Reveal from "../utils/Reveal";
const Hero: React.FC = () => {
  return (
    <Reveal>
      <div className="bg-white dark:bg-gray-800 overflow-hidden relative lg:flex lg:items-center">
        <div className="w-full py-12 px-4 sm:px-6 lg:py-16 lg:px-8 z-20 ">
          <div className="text-6xl tracking-tight text-orange-300 font-korto font-extrabold  ">
            Libérez votre potentiel avec les meilleurs professeurs de langues.
          </div>
          <p className="text-md mt-4 text-gray-400 font-nunito">
            The state of Utah in the united states is home to lots of beautiful
            National parks, Bryce national canion park ranks as three of the
            most magnificient &amp; awe inspiring.
          </p>
          <div className="lg:mt-0 lg:flex-shrink-0">
            <div className="mt-12 inline-flex rounded-md shadow">
              <button
                type="button"
                className="py-2 px-4  bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-green-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg "
              >
                Get started
              </button>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-8 lg:p-24">
          <img src={aa} className="w-1/2 rounded-lg" alt="Tree" />
          <div>
            <img src={bb} className="mb-8 rounded-lg" alt="Tree" />
            <img src={cc} className="rounded-lg" alt="Tree" />
          </div>
        </div>
      </div>
    </Reveal>
  );
};
export default Hero;
