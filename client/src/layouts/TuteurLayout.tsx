import React, { useContext, useState } from "react";
import logo from "../assets/images/logo.png";
import { useCookies } from "react-cookie";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  InboxStackIcon,
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "src/Context/AuthContext";
import person from "../assets/images/default.png";

interface Props {
  children: React.ReactNode;
}
// profile menu component
const profileMenuItems = [
  {
    label: "Account Settings",
    icon: Cog6ToothIcon,
  },
  {
    label: "Your Profile",
    icon: UserCircleIcon,
  },
  {
    label: "Inbox",
    icon: InboxStackIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
const menuitems = [
  {
    title: "Profile",
    path: "/tuteur/welcome",
  },
  {
    title: "Ressources",
    path: "/tuteur/cours",
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, handleSignout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClick = (label: string) => {
    switch (label) {
      case "Sign Out":
        handleSignout();
        navigate("/tuteur/connexion");
        break;
      case "Inbox":
        navigate("/inbox");
        break;
      case "Your Profile":
        navigate("/tuteur/welcome");
        break;
      case "Account Settings":
        navigate("/tuteur/Account-settings");
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
          className="flex items-center gap-2 rounded-full py-2 px-4 transition-all duration-300 hover:bg-gray-700/50"
        >
          <Avatar
            variant="circular"
            size="xs"
            alt={user?.username}
            className="border border-indigo-500 p-0.5 w-8 h-8"
            src={user?.profileImage?.url || person}
          />
          <Typography color="white" className="font-medium text-sm">
            {user?.username}
          </Typography>
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-4 w-4 text-white transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-2 bg-gray-800 border border-gray-700 rounded-xl shadow-xl">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleClick(label)}
              className={`flex items-center gap-3 rounded-lg py-2 px-4 transition-all duration-200 ${
                isLastItem
                  ? "hover:bg-red-500/20 focus:bg-red-500/20 active:bg-red-500/20"
                  : "hover:bg-gray-700/50 focus:bg-gray-700/50 active:bg-gray-700/50"
              }`}
            >
              {React.createElement(icon, {
                className: `h-5 w-5 ${
                  isLastItem ? "text-red-400" : "text-indigo-400"
                }`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-medium"
                color={isLastItem ? "red" : "white"}
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

const TuteurLayout: React.FC<Props> = (props: Props) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-500">
      <header className="bg-gray-800 shadow-md">
        <nav
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
          aria-label="Top"
        >
          <div className="flex w-full items-center justify-between border-b border-gray-700 py-6 lg:border-none">
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="LearnUp" className="h-10 w-auto" />
                <span className="ml-2 text-xl font-semibold text-gray-100">
                  LearnUp
                </span>
              </Link>
              <div className="ml-10 hidden space-x-8 lg:block">
                {menuitems.map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleNavigation(item.path)}
                    className="text-base font-medium text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {item.title}
                  </button>
                ))}
              </div>
            </div>
            <div className="ml-10 space-x-4">
              <ProfileMenu />
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-x-6 py-4 lg:hidden">
            {menuitems.map((item) => (
              <button
                key={item.title}
                onClick={() => handleNavigation(item.path)}
                className="text-base font-medium text-gray-300 hover:text-white transition-colors duration-200"
              >
                {item.title}
              </button>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="d-flex" id="wrapper">
          <div id="page-content-wrapper">{props.children}</div>
        </div>
      </main>
    </div>
  );
};

export default TuteurLayout;
