import React, { useContext, useState } from "react";
import logo from "../assets/images/logo.jpg";
import { useNavigate } from "react-router";
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
  PowerIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { AuthContext } from "src/Context/AuthContext";

interface Props {
  children: React.ReactNode;
}
// profile menu component
const profileMenuItems = [
  {
    label: "Account Settings",
    icon: UserCircleIcon,
  },
  {
    label: "Your Profile",
    icon: Cog6ToothIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { user, handleSignout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies<string>([]);

  const handleClick = (label: string) => {
    switch (label) {
      case "Sign Out":
        handleSignout();
        navigate("/tuteur/connexion");
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
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="md"
            alt={user?.username}
            className="border border-gray-900 p-0.5 rounded-full"
            src={user?.profileImageUrl || "../assets/images/logo.jpg"}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleClick(label)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-korto font-semibold font-sans text-md py-2 px-2"
                color={isLastItem ? "red" : "inherit"}
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
  const [open, setOpen] = useState(false);
  return (
    <div>
      <header
        className="flex flex-col lg:flex-row justify-between items-center px-6 border-b-8"
        data-open={open}
        onClick={() => setOpen(false)}
      >
        <div className="flex w-full lg:w-auto items-center justify-between p-5">
          <a href="/#" className="flex items-center text-lg">
            <img src={logo} alt="" className="h-12" />
            <span className="font-semibold font-korto font-sans text-slate-800">
              LearnUp
            </span>
          </a>
          <div className="block lg:hidden">
            <ProfileMenu />
          </div>
        </div>
        <nav
          className={`hidden w-full lg:w-auto mt-2 lg:flex lg:mt-0 ${
            open ? "block" : "hidden"
          }`}
          data-transition=""
        >
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
            <ProfileMenu />
          </div>
        </div>
      </header>
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">{props.children}</div>
      </div>
    </div>
  );
};
export default TuteurLayout;
