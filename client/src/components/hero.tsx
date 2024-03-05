import React from "react";
import photo from "../assets/images/dashboard1.jpg";
import aa from "../assets/images/aa.jpg";
import bb from "../assets/images/bb.jpg";
import cc from "../assets/images/cc.jpg";
import photo1 from "../assets/images/hero.png";
import Reveal from "../utils/Reveal";

const Hero: React.FC = () => {
  return (
      <div className="h-screen w-screen flex items-center bg-sky-400 ">
        <div className="px-4 mx-auto mb-10 max-w-7xl sm:mt-24">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl font-title">
              <span className="block">Libérez votre potentiel</span>
              <span className="block pt-2">
                avec les meilleurs professeurs de langues.
              </span>
            </h1>
            <p className="max-w-md mx-auto mt-3 text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
              Bénéficie de cours particuliers sur mesure, validés par des
              millions d'utilisateurs satisfaits, Intègre une communauté internationale d'apprenants de langues passionnés.
            </p>
            <div className="max-w-md mx-auto mt-5 sm:flex sm:justify-center md:mt-8">
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
                <a
                  href="/"
                  className="block shadow-lg w-full px-8 py-3 text-base font-medium text-gray-200 hover:text-gray-100 bg-orange-400 rounded-md md:py-4 md:text-lg md:px-10"
                >
                  Get started
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
};
export default Hero;
