import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "./dropdown";
import {
  Typography,
  Button,
  Popover,
  PopoverHandler,
  PopoverContent,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Collapse,
  ListItem,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Bars4Icon,
  UserGroupIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import logo from "../assets/images/logo.png";
import { AuthContext } from "src/Context/AuthContext";
import { useCookies } from "react-cookie";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsCalendar3Event } from "react-icons/bs";
import { MdMessage } from "react-icons/md";
import person from "../assets/images/default.png";

const navListMenuItems = [
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: PowerIcon,
  },
];
const menuitems = [
  {
    title: "Features",
    path: "#",
    children: [
      { title: "Action", path: "#" },
      { title: "Another action", path: "#" },
      { title: "Dropdown Submenu", path: "#" },
    ],
  },
  {
    title: "Devenir Tuteur",
    path: "/tuteur/inscription",
  },
  {
    title: "Abonnement",
    path: "/pricing",
  },
  {
    title: "Contact",
    path: "/contact",
  },
];
const renderIcon = (IconComponent: React.ElementType) => {
  return React.createElement(IconComponent, {
    strokeWidth: 2,
    className: "h-6 text-gray-900 w-6",
  });
};
function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <Link to="#" key={key}>
        <MenuItem className="flex items-center gap-6 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2 ">
            {" "}
            {renderIcon(icon)}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </Link>
    )
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-bold ">
            <ListItem
              className="flex items-center gap-4  pr-4 font-medium text-gray-900"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y- outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}
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
    label: "Help",
    icon: LifebuoyIcon,
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
        break;
      case "My Profile":
        navigate("/apprenant/profile");
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
const Header: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { user, isSignedIn, loading } = useContext(AuthContext);

  if (!isSignedIn) {
    return (
      <header
        className="flex flex-col lg:flex-row justify-between items-center px-6 bg-sky-400 "
        data-open={open}
        onClick={() => setOpen(false)}
      >
        <div className="flex w-full lg:w-auto items-center justify-between p-5">
          <a href="/#" className="flex items-center text-lg gap-2">
            <img
              src={user?.profileImage.url}
              alt=""
              className="h-12 rounded-full"
            />
            <span className="font-semibold font-korto font-sans text-slate-800">
              LearnUp
            </span>
          </a>
          <div className="block lg:hidden">
            <button onClick={() => setOpen(!open)} className="text-gray-800">
              <svg
                fill="currentColor"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"></path>
                <path d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"></path>
              </svg>
            </button>
          </div>
        </div>
        <nav
          className={`hidden w-full lg:w-auto mt-2 lg:flex lg:mt-0 ${
            open ? "block" : "hidden"
          }`}
          data-transition=""
        >
          <ul className="flex flex-col lg:flex-row lg:gap-3 text-base font-semibold leading-6 text-gray-900">
            {menuitems.map((item, index) => (
              <React.Fragment key={index}>
                {item.children && (
                    <Dropdown
                      title={item.title}
                      children={item.children}
                      lastItem={index === menuitems.length - 1}
                    />
                  ) && <NavListMenu />}
                {!item.children && (
                  <li>
                    <a
                      href={item.path}
                      className="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900"
                    >
                      {item.title}
                    </a>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
          {/* mobile */}
          <div className="lg:hidden flex items-center mt-3 gap-4 ">
            <Link to="#" className="muted md ">
              Log in
            </Link>
            <Link to="#" className="md block">
              Sign up
            </Link>
          </div>
        </nav>
        <div>
          <div className="hidden lg:flex items-center gap-4 text-sm font-semibold leading-6 text-gray-900">
            <Link to="/apprenant/connexion">Log in</Link>
            <Link to="/apprenant/inscription" className="md">
              <button className="bg-orange-300 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Sign Up
              </button>
            </Link>
          </div>
        </div>
      </header>
    );
  } else {
    return (
      <header
        className="flex flex-col lg:flex-row justify-between items-center px-6 bg-sky-400 "
        data-open={open}
        onClick={() => setOpen(false)}
      >
        <div className="flex w-full lg:w-auto items-center justify-between p-5">
          <a href="/#" className="flex items-center text-lg gap-2">
            <img src={logo} alt="" className="h-12 rounded-full" />
            <span className="font-semibold font-korto font-sans text-slate-800">
              LearnUp
            </span>
          </a>
          <div className="block lg:hidden">
            <button onClick={() => setOpen(!open)} className="text-gray-800">
              <svg
                fill="currentColor"
                className="w-4 h-4"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Menu</title>
                <path d="M18.278 16.864a1 1 0 01-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 01-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 011.414-1.414l4.829 4.828 4.828-4.828a1 1 0 111.414 1.414l-4.828 4.829 4.828 4.828z"></path>
                <path d="M4 5h16a1 1 0 010 2H4a1 1 0 110-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2zm0 6h16a1 1 0 010 2H4a1 1 0 010-2z"></path>
              </svg>
            </button>
          </div>
        </div>
        <nav
          className={`hidden w-full lg:w-auto mt-2 lg:flex lg:mt-0 ${
            open ? "block" : "hidden"
          }`}
          data-transition=""
        >
          <ul className="flex flex-col lg:flex-row lg:gap-3 text-base font-semibold leading-6 text-gray-900">
            {menuitems.map((item, index) => (
              <React.Fragment key={index}>
                {item.children && (
                    <Dropdown
                      title={item.title}
                      children={item.children}
                      lastItem={index === menuitems.length - 1}
                    />
                  ) && <NavListMenu />}
                {!item.children && (
                  <li>
                    <a
                      href={item.path}
                      className="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900"
                    >
                      {item.title}
                    </a>
                  </li>
                )}
              </React.Fragment>
            ))}
          </ul>
        </nav>

        <div className="hidden lg:flex items-center gap-4 text-sm font-semibold leading-6 text-gray-900">
          <div>
            <ProfileMenu />
          </div>
        </div>
      </header>
    );
  }
};
export default Header;
