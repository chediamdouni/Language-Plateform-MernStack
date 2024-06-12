import * as React from "react";
import FooterWithLogo from "../components/footer";
import { Link, useNavigate } from "react-router-dom";
import Dropdown from "../components/dropdown";
import {
  Typography,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Popover,
  PopoverHandler,
  PopoverContent,
} from "@material-tailwind/react";
import {
  UserCircleIcon,
  ChevronDownIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { useCookies } from "react-cookie";
import logo from "../assets/images/logo.jpg";
import { AuthContext } from "src/Context/AuthContext";
import { BsCalendar3Event } from "react-icons/bs";
import { MdMessage } from "react-icons/md";
import { IoMdNotificationsOutline } from "react-icons/io";
import { Loader } from "lucide-react";
import UpcomingCallList from "../components/UpcomingCallList";

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
    label: "Help",
    icon: LifebuoyIcon,
  },
  {
    label: "Sign Out",
    icon: PowerIcon,
  },
];
const renderIcon = (IconComponent: React.ElementType) => {
  return React.createElement(IconComponent, {
    strokeWidth: 2,
    className: "h-6 text-gray-900 w-6",
  });
};

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const navigate = useNavigate();
  const { handleSignout } = React.useContext(AuthContext);
  const [cookies, setCookie, removeCookie] = useCookies<string>([]);

  // const handleLogout = () => {
  //   removeCookie("jwt");
  //   navigate("/");
  // };
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
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="md"
            alt="tania andrew"
            className="border border-gray-900 p-0.5 rounded-full"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
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
    path: "/cour",
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
interface User {
  _id: string;
  username?: string;
  gender?: string;
  dateOfBirth: Date;
  password: string;
  email: string;
  roles: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface UpcomingMeeting {
  account: User;
  upcoming_meeting_id: string;
  user_id: string;
  meeting_time: Date;
  meeting_description?: string;
  meeting_url: string;
}

const ApprenantLayout: React.FC<Props> = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  const { user } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<Boolean>(true);
  const [upcomingMeeting, setUpcomingMeeting] = React.useState<
    UpcomingMeeting[]
  >([]);

  return (
    <div>
      <header
        className="flex flex-col lg:flex-row justify-between items-center px-6 border-b-8  "
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
          <ul className="flex flex-col lg:flex-row lg:gap-3 text-base font-semibold leading-6 text-gray-900">
            {menuitems.map((item, index) => (
              <React.Fragment key={index}>
                <li>
                  <a
                    href={item.path}
                    className="flex lg:px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    {item.title}
                  </a>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </nav>
        <div>
          <div className="hidden lg:flex items-center gap-4 text-sm font-semibold leading-6 text-gray-900">
            <div className="mr-4 flex items-center gap-2 ">
              <Popover placement="bottom">
                <PopoverHandler>
                  <Button variant="text" size="sm">
                    <MdMessage size={30} />
                  </Button>
                </PopoverHandler>
                <PopoverContent className="w-80">
                  <Typography variant="h6" color="blue-gray" className="mb-6">
                    Les conversations avec les tuteurs seront affichées ici.
                  </Typography>
                  <Button
                    variant="gradient"
                    className="flex-shrink-0 w-full text-blue-gray border"
                  >
                    Subscribe
                  </Button>
                </PopoverContent>
              </Popover>
              <Popover placement="bottom">
                <PopoverHandler>
                  <Button variant="text" size="sm">
                    <BsCalendar3Event size={25} />
                  </Button>
                </PopoverHandler>
                <PopoverContent className="w-80">
                  <Typography variant="h6" color="blue-gray" className="mb-6">
                    Upcoming Lesson
                  </Typography>
                  <UpcomingCallList />
                  <Button
                    variant="gradient"
                    className="flex-shrink-0 w-full text-blue-gray border"
                  >
                    + Schedule Lesson
                  </Button>
                </PopoverContent>
              </Popover>
              <Popover placement="bottom">
                <PopoverHandler>
                  <Button variant="text" size="sm">
                    <IoMdNotificationsOutline size={30} />
                  </Button>
                </PopoverHandler>
                <PopoverContent className="w-80">
                  <Typography variant="h6" color="blue-gray" className="mb-6">
                    Notification
                  </Typography>
                  <Button
                    variant="gradient"
                    className="flex-shrink-0 w-full text-blue-gray border"
                  >
                    View All
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <ProfileMenu />
            </div>
          </div>
        </div>
      </header>
      <div className="d-flex" id="wrapper">
        <div id="page-content-wrapper">{props.children}</div>
      </div>
      <FooterWithLogo />
    </div>
  );
};
export default ApprenantLayout;
