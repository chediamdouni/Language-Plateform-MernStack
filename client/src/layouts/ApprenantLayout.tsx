import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  PowerIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import logo from "../assets/images/logo.png";
import { AuthContext } from "src/Context/AuthContext";
import RequestsList from "../components/RequestsList";
import { Popover, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import ChatbotComponent from "../components/ChatBotComponent";
import person from "../assets/images/default.png";
import ApprenantChatbot from "../components/ApprenantChatbot";

// profile menu component
const profileMenuItems = [
  {
    label: "My Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Edit Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Inbox",
    icon: InboxArrowDownIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { user, handleSignout } = React.useContext(AuthContext);

  const handleClick = (label: string) => {
    switch (label) {
      case "Sign Out":
        handleSignout();
        navigate("/apprenant/connexion");
        break;
      case "My Profile":
        navigate("/apprenant/profile");
        break;
      case "Edit Profile":
        navigate("/apprenant/edit");
        break;
      case "Inbox":
        navigate("/inbox");
        break;
      default:
        closeMenu();
    }
  };
  const closeMenu = () => setIsMenuOpen(false);

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-2 rounded-full py-1 pr-3 pl-1 lg:ml-auto transition-all hover:bg-gray-100"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            className="border border-gray-300 p-0.5 rounded-full"
            src={user?.profileImage?.url || person}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-4 w-4 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-2 bg-white shadow-lg rounded-lg">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleClick(label)}
              className={`flex items-center gap-3 rounded-lg p-2 transition-all hover:bg-gray-100 ${
                isLastItem ? "hover:bg-red-100" : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-5 w-5 ${
                  isLastItem ? "text-red-500" : "text-blue-500"
                }`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className={`font-korto font-semibold text-md ${
                  isLastItem ? "text-red-500" : "text-gray-700"
                }`}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
interface Props {
  children: React.ReactNode;
}
const menuitems = [
  {
    title: "Tuteur",
    path: "/apprenant",
  },
  {
    title: "Cours",
    path: "/courses/all",
  },
  {
    title: "Abonnement",
    path: "/pricing",
  },
  {
    title: "Favoris",
    path: "/favorites",
  },
];

const ApprenantLayout: React.FC<Props> = (props: Props) => {
  const { isSignedIn, loading } = useContext(AuthContext);
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const handleNavigation = (path: string) => {
    navigate(path);
  };

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  useEffect(() => {
    if (!isSignedIn && !loading) {
      navigate("/apprenant/connexion");
    }
  }, [isSignedIn, loading, navigate]);

  return (
    <div className=" font-Korto-Medium">
      <header className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <img src={logo} alt="LearnUp Logo" className="h-10 w-auto" />
              <span className="ml-2 text-xl font-bold text-gray-800">
                LearnUp
              </span>
            </div>

            <nav className="hidden md:flex space-x-8">
              {menuitems.map((item, index) => (
                <a
                  key={index}
                  href="###"
                  onClick={() => handleNavigation(item.path)}
                  className="text-gray-600 hover:text-blue-600 transition duration-300 ease-in-out"
                >
                  {item.title}
                </a>
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                        />
                      </svg>
                    </Popover.Button>
                    <Transition
                      show={open}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Messages
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Les conversations avec les tuteurs seront affichées
                            ici.
                          </p>
                          <button
                            onClick={() => navigate("/inbox")}
                            className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-300 ease-in-out"
                          >
                            Voir tous les messages
                          </button>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all">
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                    </Popover.Button>
                    <Transition
                      show={open}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Leçons à venir
                          </h3>
                          <RequestsList />
                          <button
                            onClick={() => navigate("/apprenant")}
                            className="w-full mt-4 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-md px-4 py-2 hover:from-blue-600 hover:to-indigo-600 transition duration-300 ease-in-out"
                          >
                            + Réserver une leçon
                          </button>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <Popover className="relative">
                {({ open }) => (
                  <>
                    <Popover.Button className="p-1 rounded-full hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                    </Popover.Button>
                    <Transition
                      show={open}
                      enter="transition ease-out duration-200"
                      enterFrom="opacity-0 translate-y-1"
                      enterTo="opacity-100 translate-y-0"
                      leave="transition ease-in duration-150"
                      leaveFrom="opacity-100 translate-y-0"
                      leaveTo="opacity-0 translate-y-1"
                    >
                      <Popover.Panel className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                        <div className="p-4">
                          <h3 className="text-lg font-medium text-gray-900 mb-2">
                            Notifications
                          </h3>
                          <p className="text-sm text-gray-500 mb-4">
                            Vous n'avez pas de nouvelles notifications.
                          </p>
                          <button className="w-full bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700 transition duration-300 ease-in-out">
                            Voir toutes les notifications
                          </button>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>

              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">{props.children}</div>
      </div>
      {/* Floating Chatbot Button */}
      <div className="fixed right-4 bottom-4 z-50">
        <motion.button
          className="bg-blue-500 text-white rounded-full p-4 shadow-lg hover:bg-blue-600 transition-colors duration-300"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={toggleChatbot}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
            />
          </svg>
        </motion.button>
      </div>

      {/* Chatbot Modal */}
      <AnimatePresence>
        {isChatbotOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed right-4 bottom-20 bg-white rounded-lg shadow-xl p-4 w-80 z-50"
          >
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={toggleChatbot}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <ApprenantChatbot />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
export default ApprenantLayout;
