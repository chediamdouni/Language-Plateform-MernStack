import React from "react";
import { Link, useNavigate } from "react-router-dom";
import notfound from "../assets/images/errorPage.jpg";
const NotFound = () => {
  const navigate = useNavigate();

  const PagePrecedente = () => {
    navigate(-1);
  };
  return (
    <div
      className="flex flex-col h-screen justify-center items-center"
    //   style={{ background: `url(${notfound})` }}
    >
      <div className="flex flex-col items-center">
        <h1 className="text-[120px] font-extrabold text-gray-700">404</h1>
        <p className="text-2xl font-medium text-gray-600 mb-6">
          Page Not Found
        </p>
        <Link
          to="/"
          className="px-4 py-2 font-medium text-white bg-slate-500 rounded-md hover:bg-indigo-600 transition-all duration-200 ease-in-out"
          onClick={PagePrecedente}
        >
          Retour a la page précedente
        </Link>
      </div>
    </div>
  );
};
export default NotFound;
