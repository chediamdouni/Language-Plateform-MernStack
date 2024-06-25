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
import RequestsList from "../components/RequestsList";

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
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 1024 1024"
                      className="icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M896 192H128c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h576.6l191.6 127.7L896 832c35.3 0 64-28.7 64-64V256c0-35.3-28.7-64-64-64z"
                        fill="#3D5AFE"
                      />
                      <path
                        d="M640 512c0-125.4-51.5-238.7-134.5-320H128c-35.3 0-64 28.7-64 64v512c0 35.3 28.7 64 64 64h377.5c83-81.3 134.5-194.6 134.5-320z"
                        fill="#536DFE"
                      />
                      <path
                        d="M256 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                        fill="#FFFF8D"
                      />
                      <path
                        d="M512 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                        fill="#FFFF00"
                      />
                      <path
                        d="M768 512m-64 0a64 64 0 1 0 128 0 64 64 0 1 0-128 0Z"
                        fill="#FFEA00"
                      />
                    </svg>
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
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 1024 1024"
                      className="icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M960 224v608c0 35.3-28.7 64-64 64H128c-35.3 0-64-28.7-64-64V224c0-17.7 14.3-32 32-32h832c17.7 0 32 14.3 32 32z"
                        fill="#3D5AFE"
                      />
                      <path
                        d="M832 480.2c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h576c17.7 0 32 14.4 32 32zM832 672.2c0 17.7-14.3 32-32 32H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h576c17.7 0 32 14.4 32 32z"
                        fill="#FFEA00"
                      />
                      <path
                        d="M224 319.8c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32v127.8c0 17.7-14.3 32-32 32zM800 319.8c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32v127.8c0 17.7-14.3 32-32 32z"
                        fill="#536DFE"
                      />
                      <path
                        d="M660.8 704.3H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h461.4c12.1-40.6 18.6-83.5 18.6-128H224c-17.7 0-32-14.3-32-32s14.3-32 32-32h475.5c-14.2-99.8-61.3-189-130-256.3H256v95.8c0 17.7-14.3 32-32 32s-32-14.3-32-32V192H96c-17.7 0-32 14.3-32 32v608c0 35.3 28.7 64 64 64h358.9c75.1-45.2 135.9-112 173.9-191.7z"
                        fill="#536DFE"
                      />
                      <path
                        d="M192 480.3c0 17.7 14.3 32 32 32h480v-0.2c0-21.6-1.5-42.9-4.5-63.8H224c-17.7 0-32 14.3-32 32zM192 672.3c0 17.7 14.3 32 32 32h436.8c9.8-20.5 18-41.9 24.6-64H224c-17.7 0-32 14.3-32 32z"
                        fill="#FFFF00"
                      />
                      <path
                        d="M192 287.8c0 17.7 14.3 32 32 32s32-14.3 32-32V192h-64v95.8z"
                        fill="#8C9EFF"
                      />
                    </svg>
                  </Button>
                </PopoverHandler>
                <PopoverContent className="w-80">
                  <Typography variant="h6" color="blue-gray" className="mb-6">
                    Upcoming Lesson
                  </Typography>
                  <RequestsList />
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
                    <svg
                      width="30px"
                      height="30px"
                      viewBox="0 0 1024 1024"
                      className="icon"
                      version="1.1"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M168.8 224h-8.4c-35.3 0-64 28.7-64 64v56.3c0.9-2.2 1.8-4.5 2.8-6.7 17.5-41.4 40.9-79.4 69.6-113.6zM96.5 679.7V736c0 35.3 28.7 64 64 64h8.4c-28.8-34.2-52.1-72.3-69.6-113.7-1-2.1-1.9-4.4-2.8-6.6z"
                        fill="#FFEA00"
                      />
                      <path
                        d="M863.5 224H258.3C178.5 294.4 128 397.4 128 512s50.5 217.6 130.3 288h605.1c35.3 0 64-28.7 64-64V288c0.1-35.4-28.5-64-63.9-64z"
                        fill="#536DFE"
                      />
                      <path
                        d="M125.1 289.7L512 673.6l382.6-385.5L512 543.9zM717.9 836.2c-14.9 9.5-19.3 29.3-9.8 44.2 6.1 9.6 16.4 14.8 27 14.8 5.9 0 11.8-1.6 17.2-5C791 865.6 825.7 835 855.1 800h-89c-15 13.2-31.1 25.3-48.2 36.2zM927.5 344.1v335.5c21.3-53 32.5-110 32.5-167.6 0-58.4-11.1-115.1-32.5-167.9z"
                        fill="#FFEA00"
                      />
                      <path
                        d="M774.3 148.8c-38-27.5-79.9-48.8-124.3-63.1C605.5 71.3 559.1 64 512 64c-60.5 0-119.1 11.8-174.4 35.2-53.4 22.6-101.3 54.9-142.4 96-9.2 9.2-18 18.8-26.4 28.7-28.8 34.2-52.1 72.3-69.6 113.7-0.9 2.2-1.9 4.4-2.8 6.7C74.9 397.6 64 454 64 512s10.9 114.4 32.5 167.7c0.9 2.2 1.8 4.5 2.8 6.7 17.5 41.4 40.8 79.5 69.6 113.7 8.3 9.9 17.1 19.5 26.4 28.7 41.1 41.1 89 73.4 142.4 96C392.9 948.2 451.5 960 512 960c23.1 0 46.3-1.8 69-5.3 17.5-2.7 29.4-19 26.7-36.5s-19.1-29.4-36.5-26.7c-19.5 3-39.4 4.5-59.2 4.5-97.1 0-186-36.3-253.7-96C178.5 729.6 128 626.6 128 512s50.5-217.6 130.3-288c67.7-59.7 156.5-96 253.7-96 40.4 0 80.2 6.2 118.3 18.6 51.5 16.6 97.4 43.3 136.1 77.4h88.7c-23.7-28.3-50.8-53.5-80.8-75.2z"
                        fill="#FFEA00"
                      />
                      <path
                        d="M96.5 288v56.3c0.9-2.2 1.8-4.5 2.8-6.7 17.5-41.4 40.8-79.5 69.6-113.7h-8.4c-35.4 0.1-64 28.7-64 64.1zM160.5 800h8.4c-28.8-34.2-52.1-72.3-69.6-113.7-0.9-2.2-1.9-4.4-2.8-6.7V736c0 35.4 28.6 64 64 64zM177.3 324L512 543.9l182.9-122.3c-15.2-74.2-48.8-141.8-95.8-197.7H258.3c-32.3 28.5-59.7 62.3-81 100.1z"
                        fill="#8C9EFF"
                      />
                      <path
                        d="M703 481.2L512 673.6 171.1 335.4C143.6 388.3 128 448.3 128 512c0 114.6 50.5 217.6 130.3 288h340.8C664.6 722.2 704 621.7 704 512c0-10.3-0.4-20.6-1-30.8z"
                        fill="#8C9EFF"
                      />
                      <path
                        d="M177.3 324c-2.1 3.8-4.2 7.6-6.2 11.4L512 673.6l191-192.4c-1.4-20.3-4.1-40.2-8.1-59.6L512 543.9 177.3 324z"
                        fill="#FFFF00"
                      />
                      <path
                        d="M128 512c0-63.7 15.6-123.7 43.1-176.6 2-3.8 4-7.6 6.2-11.4 21.3-37.7 48.8-71.6 81.1-100 62.1-54.8 142-89.8 229.8-95.2a446.34 446.34 0 0 0-104.1-46.2c-15.7 4.7-31.2 10.2-46.4 16.7-53.4 22.6-101.3 54.9-142.4 96-9.2 9.2-18 18.8-26.4 28.7-28.8 34.2-52.1 72.3-69.6 113.7-0.9 2.2-1.9 4.4-2.8 6.7C74.9 397.6 64 454 64 512s10.9 114.4 32.5 167.7c0.9 2.2 1.8 4.5 2.8 6.7 17.5 41.4 40.8 79.5 69.6 113.7 8.3 9.9 17.1 19.5 26.4 28.7 41.1 41.1 89 73.4 142.4 96 15.2 6.4 30.7 12 46.4 16.7 36.9-11 71.9-26.6 104.1-46.2-87.8-5.4-167.7-40.4-229.8-95.2C178.5 729.6 128 626.6 128 512z"
                        fill="#FFFF00"
                      />
                    </svg>
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
