import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { ReviewCard } from "../../components/ReviewCard";
import { Button } from "@material-tailwind/react";
import { Container, Box, Avatar, Typography, SvgIcon } from "@mui/material";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useGetCalls } from "src/hooks/useGetCalls";
import TuteurLayout from "src/layouts/TuteurLayout";
import { AuthContext } from "src/Context/AuthContext";
import VerticalBarChart from "../../components/chart";
import { CiEdit } from "react-icons/ci";
import AllUpcomingCall from "../../components/AllUpcomingCall";
interface AvailabilitySlot {
  day: string;
  startTime: string;
  endTime: string;
}

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

interface UpcomingCall {
  upcoming_meeting_id: string;
  user_id: string;
  meeting_time: string;
  meeting_description: string;
  meeting_url: string;
}

const WelcomeComponent = () => {
  const { user } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const client = useStreamVideoClient();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [callDetails, setCallDetails] = useState<Call>();
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [reviewToShow, setReviewToShow] = useState(3);
  const navigate = useNavigate();
  const ReviewRef = useRef<HTMLDivElement | null>(null);
  const { upcomingCalls } = useGetCalls();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isMeetingCreated" | "isInstantMeeting" | undefined
  >(undefined);

  const initialData = {
    username: user?.username || "",
    email: user?.email || "",
    password: "",
    confirmPassword: "",
  };

  const days: string[] = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "saturday",
  ];
  const formatDate = (date?: Date): string => {
    return date ? date.toLocaleDateString() : "";
  };
  // Fetching availability from BackSide
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tuteur/availability/65dcd2e9d997a54d215c10dd`
        );
        console.log(response.data.availability);
        setAvailability(response.data.availability || []);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);
  // Modal
  const handleClickOpen = () => {
    console.log("handleClickOpen triggered");
    setOpen(true);
    setMeetingState("isScheduleMeeting");
  };

  // Handle time in the schedule
  const HandleClickTime = (timeString: string, day: string) => {
    const currentDate = new Date();
    const [hours, minutes] = timeString.split(":").map(Number);
    const currentDayIndex = currentDate.getDay(); // 0 (Sunday) to 6 (Saturday)
    const targetDayIndex = days.indexOf(day); // index of the day in the week

    // Calculate the difference in days
    const dayDifference =
      targetDayIndex >= currentDayIndex
        ? targetDayIndex - currentDayIndex
        : 7 - (currentDayIndex - targetDayIndex);

    // Calculate the target date
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + dayDifference);
    targetDate.setHours(hours, minutes, 0, 0); // Set the time

    setValues({ ...values, dateTime: targetDate });

    console.log("Formatted Date:", targetDate);
    handleClickOpen();
  };
  // Modal
  const handleClose = () => {
    console.log("close");
    setOpen(false);
    setMeetingState(undefined);
  };
  const createMeeting = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!client) return console.log("y'apas de client ");
    try {
      if (!values.dateTime) {
        console.log("Success Notification !");
        return;
      }
      const callId = crypto.randomUUID();
      const call = client.call("default", callId);

      if (!call) throw new Error("Votre call n'est pas créer");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";
      const currentDateTime = new Date();
      const startDateTime = new Date(startsAt);

      // Vérification si la date de début est inférieure à la date actuelle
      if (startDateTime < currentDateTime) {
        toast("🦄 La leçon que vous avez choisit est déjà passer", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        return;
      }

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
      console.log(call);
      let UpcomingCalls: UpcomingCall[] = [];

      if (upcomingCalls) {
        upcomingCalls.forEach((call) => {
          console.log("Prcossing call", call);
          const upcoming_meeting_id = callId;
          const user_id = call.currentUserId || "";
          const meeting_time = startsAt;
          const meeting_description = description;
          const meeting_url = `http://localhost:3000/meeting/${call.id}`;

          UpcomingCalls.push({
            upcoming_meeting_id,
            user_id,
            meeting_time,
            meeting_description,
            meeting_url,
          });
        });
      }

      // console.log("Upcoming calls data:", UpcomingCalls);

      // if (UpcomingCalls.length === 0) {
      //   console.error("UpcomingCalls est vide");
      //   return;
      // }
      try {
        setLoading(true);
        console.log("Sending request to server with data:", UpcomingCalls);
        const response = await axios.post(
          "http://localhost:5000/api/meet/upcoming",
          UpcomingCalls
        );

        console.log("Server response:", response);

        if (!response) {
          throw new Error("Failed to create new meeting");
        }

        setCallDetails(call);

        if (!values.description) {
          navigate(`/meeting/${call.id}`);
        }
        toast("🦄 Meeting Created", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error creating meeting:", error);
      }
    } catch (error) {
      console.log("erreur lors du creation", error);
      toast("🦄 Failed to create a meeting", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
  // Description input
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    setValues({ ...values, description: value });
  };
  const meetingLink = `http://localhost:3000/meeting/${callDetails?.id}`;
  // Scroll To an Element
  const ToggleShowAllReviews = () => {
    setShow(!show);
    if (!show) {
      setReviewToShow(6); // ici on va mettre le nombre totale de reviews
    } else {
      setReviewToShow(3);
    }
  };
  // Render availability with Formatted Date & Dialog
  const renderAvailabilityTable = (): React.ReactElement => {
    if (isLoading) {
      return <p>Loading availability...</p>;
    }
    if (error) {
      return <p>Error: {error}</p>;
    }
    if (!availability || availability.length === 0) {
      return <p>No availability found for this tutor.</p>;
    }
    const formattedAvailability: { [day: string]: AvailabilitySlot[] } = {};
    // Group availability by day
    availability.forEach((slot) => {
      if (!formattedAvailability[slot.day]) {
        formattedAvailability[slot.day] = [];
      }
      formattedAvailability[slot.day].push(slot);
    });

    const slotsByDay: { [day: string]: AvailabilitySlot[] } = {};
    availability.forEach((slot) => {
      if (!slotsByDay[slot.day]) {
        slotsByDay[slot.day] = [];
      }
      slotsByDay[slot.day].push(slot);
    });

    return (
      <div className="mx-auto flex justify-center p-5">
        <table className="w-full text-sm border-t-4 text-left rtl:text-right dark:text-gray-400">
          <thead className="text-md uppercase dark:text-gray-400">
            <tr>
              {days.map((day) => (
                <th key={day}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {getUniqueTimes(availability).map((time) => (
              <tr key={time}>
                {days.map((day) => (
                  <td
                    className="px-2 py-4 cursor-pointer"
                    key={`${day}-${time}`}
                  >
                    {slotsByDay[day] &&
                      slotsByDay[day].find(
                        (slot) => slot.startTime === time
                      ) && (
                        <span
                          className="underline bg-slate-200 p-2 rounded-lg"
                          onClick={() => {
                            HandleClickTime(time, day);
                          }}
                        >
                          {time}
                        </span>
                      )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

        {!callDetails ? (
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            sx={{ height: "100vh" }}
          >
            <form onSubmit={createMeeting}>
              <DialogTitle>Ajouter un leçon</DialogTitle>
              <DialogContent>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2.5">
                    <label className="text-base font-normal leading-[22.4px] text-sky-2">
                      Ajouter une Description
                    </label>
                    <TextField
                      required
                      className="border-none bg-cyan-200 focus-visible:ring-0 focus-visible:ring-offset-0"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2.5">
                    <label className="text-base font-normal leading-[22.4px]">
                      Créneaux Horraires
                    </label>
                    <ReactDatePicker
                      selected={values.dateTime}
                      onChange={(date: Date) =>
                        setValues({ ...values, dateTime: date! })
                      }
                      showTimeSelect
                      timeFormat="HH:mm"
                      timeIntervals={15}
                      timeCaption="time"
                      dateFormat="MMMM d, yyyy h:mm aa"
                      className="w-full rounded p-2 focus:outline-none text-black"
                    />
                    {/* <TextField
                      className="w-full rounded p-2 focus:outline-none text-black"
                      // value={values.dateTime?.toLocaleString()} // Display the selected date and time
                    /> */}
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Annuler</Button>
                <Button type="submit">Ajouter</Button>
              </DialogActions>
            </form>
          </Dialog>
        ) : (
          <Dialog
            open={meetingState === "isScheduleMeeting"}
            onClose={() => {
              handleClose();
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle>Meeting Link</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Meeting created successfully
                <p>Meeting Link: {meetingLink}</p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(meetingLink);
                  setCallDetails(undefined);
                  setMeetingState(undefined);
                }}
              >
                Copy Meeting Link
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    );
  };
  // retrieve a unique time slots (plage horraires) from the availability slots (créaneaux de disponibilité) provided as parameters
  const getUniqueTimes = (availability: AvailabilitySlot[]): string[] => {
    const timeSet = new Set(availability.map((slot) => slot.startTime));
    return Array.from(timeSet).sort();
  };

  return (
    <TuteurLayout>
      <div className="flex justify-center font-korto font-sans h-full bg-gray-200 p-8">
        <div className="">
          <section className="relative block h-[500px]">
            <div
              className="absolute top-0 w-full h-full bg-center bg-cover"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
              }}
            >
              <span
                id="blackOverlay"
                className="w-full h-full absolute opacity-50 bg-black"
              ></span>
            </div>
            <div
              className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-[70px]"
              style={{ transform: "translateZ(0px)" }}
            >
              <SvgIcon
                className="absolute bottom-0 overflow-hidden text-blueGray-200 fill-current"
                viewBox="0 0 2560 100"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <polygon points="2560 0 2560 100 0 100" />
              </SvgIcon>
            </div>
          </section>
          <section className="relative py-16 bg-blueGray-200">
            <Container>
              <Box className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
                <Box className="px-6">
                  <Box className="flex flex-wrap justify-center">
                    <Box className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                      <Box className="relative">
                        <Avatar
                          alt="Profile Picture"
                          src="https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg"
                          className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-150-px"
                          sx={{ width: 150, height: 150 }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box className="text-center mt-20">
                    <Typography
                      variant="h3"
                      className="font-semibold leading-normal mb-2 text-blueGray-700 mb-2"
                    >
                      {user?.username}
                    </Typography>
                    <Typography
                      variant="body2"
                      className="leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase"
                    >
                      <i className="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                      Los Angeles, California
                    </Typography>
                    <Typography
                      variant="body1"
                      className="mb-2 text-blueGray-600 mt-10"
                    >
                      <i className="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                      Teaches English lessons Speaks French (B1),
                    </Typography>
                    <Typography
                      variant="body1"
                      className="mb-2 text-blueGray-600"
                    >
                      <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
                      Greek (B1) 5,689 lessons taught
                    </Typography>
                  </Box>
                  <Box className="mt-10 py-10 border-t border-blueGray-200 text-center">
                    <Box className="flex flex-wrap justify-center">
                      <Box className="w-full lg:w-9/12 px-4">
                        <Typography
                          variant="body1"
                          className="mb-4 text-lg leading-relaxed text-blueGray-700"
                        >
                          Build your Future: I will make you fluent in English
                          with customized classes. * IELTS Examiner for 5 years
                          and 8 years as a 1-1 Online English Tutor * Native
                          Speaker * SAT Exam Preparation
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Container>
          </section>
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <div className="gap-2 flex items-center cursor-pointer">
              <h4 className="text-xl text-gray-900 font-bold">Personal Info</h4>
              <div>
                <CiEdit
                  size={20}
                  onClick={() => {
                    navigate("/tuteur/account");
                  }}
                />
              </div>
            </div>
            <ul className="mt-2 text-gray-700">
              <li className="flex border-y py-2">
                <span className="font-bold w-24">Full name:</span>
                <span className="text-gray-700">{user?.username}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Birthday:</span>
                <span className="text-gray-700">
                  {formatDate(user?.dateOfBirth)}
                </span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Joined:</span>
                <span className="text-gray-700">{user?.createdAt}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Gender:</span>
                <span className="text-gray-700">{user?.gender}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Email:</span>
                <span className="text-gray-700">{user?.email}</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Location:</span>
                <span className="text-gray-700">New York, US</span>
              </li>
              <li className="flex border-b py-2">
                <span className="font-bold w-24">Languages:</span>
                <span className="text-gray-700">English, Spanish</span>
              </li>
            </ul>
          </div>
          <section
            id="section-2"
            className="bg-white rounded-lg shadow-xl p-8 mt-5"
          >
            <div className="">
              <div className="text-2xl font-bold my-4">Schedule</div>
              <div
                className="flex items-center p-4 mb-4 mt-2 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 me-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div className="text-lg">
                  Cliquer sur une date pour planifier un meet !!
                </div>
              </div>
              <div>{renderAvailabilityTable()}</div>
            </div>
          </section>
          <section id="Upcoming Call" className="bg-white shadow-xl p-8 mt-5">
            <p className="text-2xl font-bold my-4">Les Appels à venir</p>
            <AllUpcomingCall />
          </section>
          <section
            id="reviews"
            ref={ReviewRef}
            className="bg-white shadow-xl p-8 mt-5"
          >
            <div className="font-bold text-2xl my-4">
              Ce que disent les élèves
            </div>
            <div className="p-1 ml-2 space-y-3">
              <ReviewCard
                name="Theodora D."
                imageSrc="https://picsum.photos/id/646/200/200"
                description="Sapien consequat eleifend! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              />
              <ReviewCard
                name="Chedi"
                imageSrc="https://picsum.photos/id/646/200/200"
                description="consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              />
              <ReviewCard
                name="Azizza"
                imageSrc="https://picsum.photos/id/646/200/200"
                description="Sapien consequat eleifend! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
              />
              {show ? (
                <div>
                  <ReviewCard
                    name="Haythem"
                    imageSrc="https://picsum.photos/id/646/200/200"
                    description="Sapien consequat eleifend! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                  />
                  <ReviewCard
                    name="Rayen"
                    imageSrc="https://picsum.photos/id/646/200/200"
                    description="Sapien consequat eleifend! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                  />
                  <ReviewCard
                    name="Taha"
                    imageSrc="https://picsum.photos/id/646/200/200"
                    description="Sapien consequat eleifend! Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
                  />
                </div>
              ) : null}
            </div>
            <button
              className="text-blue-500 text-sm mt-2 focus:outline-none underline"
              onClick={ToggleShowAllReviews}
            >
              {show ? "Afficher moins" : "Afficher plus"}
            </button>
          </section>
          <section id="Resume" className="bg-white shadow-xl p-8 mt-5">
            <p className="text-2xl font-bold my-4">Resumé</p>
            <div className="p-4 mt-4">
              <div className="border-b-4 w-64 text-xl font-semibold mb-4">
                Expérience Professionnel
              </div>
              <div className="p-5">
                Topica Native - An Online English School Serving Vietnamese
                English Learners English Language Teacher
              </div>
            </div>
          </section>
          <section id="Specialite" className="bg-white shadow-xl p-8 mt-5">
            <p className="text-2xl font-bold my-4">Specialité</p>
            <div className="p-4">
              <div className="text-xl font-semibold mb-3">
                Conversational English
              </div>
              <div className="p-2">
                I have been teaching 1 on on private lessons for 4 years. this
                can be about anything! family, hobbies, business meeting. If
                your not sure, lets book some time to figure out what you need
              </div>
            </div>
          </section>
          <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
            <h4 className="text-xl text-gray-900 font-bold">Statistics</h4>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
              <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-indigo-600">
                    Total Revenue
                  </span>
                  <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                    7 days
                  </span>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <svg
                      className="w-12 h-12 p-2.5 bg-indigo-400 bg-opacity-20 rounded-full text-indigo-600 border border-indigo-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-end">
                      <span className="text-2xl 2xl:text-3xl font-bold">
                        $8,141
                      </span>
                      <div className="flex items-center ml-2 mb-1">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                        <span className="font-bold text-sm text-gray-500 ml-0.5">
                          3%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-green-600">
                    New Orders
                  </span>
                  <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                    7 days
                  </span>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <svg
                      className="w-12 h-12 p-2.5 bg-green-400 bg-opacity-20 rounded-full text-green-600 border border-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-end">
                      <span className="text-2xl 2xl:text-3xl font-bold">
                        217
                      </span>
                      <div className="flex items-center ml-2 mb-1">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                        <span className="font-bold text-sm text-gray-500 ml-0.5">
                          5%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-6 py-6 bg-gray-100 border border-gray-300 rounded-lg shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-blue-600">
                    New Connections
                  </span>
                  <span className="text-xs bg-gray-200 hover:bg-gray-500 text-gray-500 hover:text-gray-200 px-2 py-1 rounded-lg transition duration-200 cursor-default">
                    7 days
                  </span>
                </div>
                <div className="flex items-center justify-between mt-6">
                  <div>
                    <svg
                      className="w-12 h-12 p-2.5 bg-blue-400 bg-opacity-20 rounded-full text-blue-600 border border-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="1"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      ></path>
                    </svg>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-end">
                      <span className="text-2xl 2xl:text-3xl font-bold">
                        54
                      </span>
                      <div className="flex items-center ml-2 mb-1">
                        <svg
                          className="w-5 h-5 text-green-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          ></path>
                        </svg>
                        <span className="font-bold text-sm text-gray-500 ml-0.5">
                          7%
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <VerticalBarChart />
            </div>
          </div>
        </div>
      </div>
    </TuteurLayout>
  );
};

export default WelcomeComponent;
