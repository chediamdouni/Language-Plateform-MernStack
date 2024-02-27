import React, { useContext, useEffect } from "react";
import { AuthContext } from "src/Context/AuthContext";
import DefaultPerson from "../../assets/images/default.png";
import { CiEdit } from "react-icons/ci";
import { IoPersonCircle } from "react-icons/io5";
import { IoKey } from "react-icons/io5";
import { MdSettingsSuggest } from "react-icons/md";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { FaCalendarDays } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import TuteurLayout from "src/layouts/TuteurLayout";
import { Link } from "react-router-dom";

const AccountSettings = () => {
  const { user, getLoggedInUser } = useContext(AuthContext);

  useEffect(() => {
    getLoggedInUser();
  }, []);

  return (
    <TuteurLayout>
      <div className="max-w-screen mx-auto bg-white ">
        <div className="flex justify-center items-center flex-col px-10 py-5 divide-y divide-solid">
          <div className="flex flex-rows items-center gap-4">
            <img
              src={user?.profileImageUrl || DefaultPerson}
              alt=""
              className="h-32 w-32 rounded-full"
            />
            <div className="block">
              <div className="flex ">
                {user?.username || "undefined"} <CiEdit size={30} />
              </div>
              <div>Account ID : {user?._id}</div>
            </div>
          </div>
          <div className="flex flex-rows flex-wrap p-8 mt-10 gap-4">
            <Link to="/tuteur/account">
            <div className="w-80 h-48 border rounded-xl hover:bg-sky-100 p-4">
              <div className="space-y-2">
                <IoPersonCircle size={40} />
                <div className="font-base text-2xl flex items-center gap-4">
                  Account <MdKeyboardArrowRight size={30} />
                </div>
              </div>
              <div className="font-light text-xl">
                Enter your personal Details and tell us how to reach you{" "}
              </div>
            </div>
            </Link>
            <Link to="/tuteur/multiple-connexion">
            <div className="w-80 h-48 border rounded-xl  hover:bg-sky-100 p-4">
              <div className="space-y-2">
                <IoKey size={40} />
                <div className="font-base text-2xl flex items-center gap-4">
                  Login Methods <MdKeyboardArrowRight size={30} />
                </div>
              </div>
              <div className="font-light text-xl">
                Enter your personal Details and tell us how to reach you{" "}
              </div>
            </div>
            </Link>
            <Link to="/tuteur/settings">
            <div className="w-80 h-48 border rounded-xl  hover:bg-sky-100 p-4">
              <div className="space-y-2">
                <MdSettingsSuggest size={40} />
                <div className="font-base text-2xl flex items-center gap-4">
                  Settings <MdKeyboardArrowRight size={30} />
                </div>
              </div>
              <div className="font-light text-xl">
                Set your language, country , and much more{" "}
              </div>
            </div>
            </Link>
            <Link to="/tuteur/notifications">
            <div className="w-80 h-48 border rounded-xl  hover:bg-sky-100 p-4">
              <div className="space-y-2">
                <BiSolidMessageSquareDetail size={40} />
                <div className="font-base text-2xl flex items-center gap-4">
                  Notifications <MdKeyboardArrowRight size={30} />
                </div>
              </div>
              <div className="font-light text-xl">
                Choose when you want to be contacted
              </div>
            </div>
            </Link>
            <Link to="/tuteur/calendar-preferences">
            <div className="w-80 h-48 border rounded-xl  hover:bg-sky-100 p-4">
              <div className="space-y-2">
                <FaCalendarDays size={35} />
                <div className="font-base text-2xl flex items-center gap-4">
                  Calender <MdKeyboardArrowRight size={30} />
                </div>
              </div>
              <div className="font-light text-xl">
                Synchronise your calender with Google Calender
              </div>
            </div>
            </Link>
          </div>
        </div>
      </div>
    </TuteurLayout>
  );
};
export default AccountSettings;
