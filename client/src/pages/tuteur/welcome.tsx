import Aside from "../../components/aside";
import React from "react";
import TuteurLayout from "src/layouts/TuteurLayout";
import welcome from "../../assets/images/Welcome.png";
import { Link } from "react-router-dom";

const WelcomeComponent = () => {
  return (
    <TuteurLayout>
      <Aside />
      <div className="p-4 sm:ml-80 px-28 font-korto font-sans">
        <div className="font-semibold text-2xl ">Welcome to LearnUp</div>
        <div className="text-lg mt-4 w-3/4">
          Au nom de nos étudiants, nous sommes ravis de vous accueillir ici.
          Parler anglais avec un étranger peut être intimidant, mais avec votre
          chaleur, votre patience et votre guidance, les étudiants que vous
          rencontrerez discuteront en toute confiance en un rien de temps ! Le
          processus d'inscription en tant que tuteur sur Learn Up prend environ
          10 minutes, et nous vous guiderons à travers chaque étape.
        </div>
        <img
          src={welcome}
          alt="marahbe"
          className="rounded-full w-64 mt-10 mx-60"
        />
        <div className="flex justify-end items-end mr-60">
          <Link
            to={"/tuteur/step/signup-checklist"}
            className="border rounded-xl p-4 uppercase bg-blue-400 "
          >
            let's get started
          </Link>
        </div>
      </div>
    </TuteurLayout>
  );
};
export default WelcomeComponent;
