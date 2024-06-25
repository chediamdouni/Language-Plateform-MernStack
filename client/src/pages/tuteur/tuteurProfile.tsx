import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import TuteurLayout from "src/layouts/TuteurLayout";
import { IoIosSchool } from "react-icons/io";
import { BsFillPersonFill } from "react-icons/bs";
import { AiOutlineSlack } from "react-icons/ai";
import { ReviewCard } from "../../components/ReviewCard";
import { Button } from "@material-tailwind/react";
import {
  Call,
  StreamVideoClient,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { useGetCalls } from "src/hooks/useGetCalls";
import UpcomingCallList from "../../components/UpcomingCallList";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import { AuthContext } from "src/Context/AuthContext";
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

/// video-Conference Props
// const user_id = "csb-user";
// const user = { id: user_id };
// const apiKey = "mmhfdzb5evj2";
// const tokenProvider = async () => {
//   const { token } = await fetch(
//     "https://pronto.getstream.io/api/auth/create-token?" +
//       new URLSearchParams({
//         api_key: apiKey,
//         user_id: user_id,
//       })
//   ).then((res) => res.json());
//   return token as string;
// };

interface Tutor {
  _id: string;
  username: string;
  profileImageUrl: string;
  aboutMe: string;
  experience: number;
  language: string;
  country: string;
  gender: string;
}

const TuteurProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useContext(AuthContext);
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [open, setOpen] = React.useState(false);
  // const [client, setClient] = useState<StreamVideoClient>();
  const alert = useAlert();
  const [values, setValues] = useState(initialValues);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [reviewToShow, setReviewToShow] = useState(3);
  const ReviewRef = useRef<HTMLDivElement | null>(null);

 

  const days: string[] = [
    "sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "saturday",
  ];

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

  //fetch tutor
  useEffect(() => {
    const fetchTutor = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/tuteur/${id}`
        );
        setTutor(response.data.tuteur);
      } catch (err) {
        console.error("Error fetching tutor:", err);
      }
    };
    fetchTutor();
  }, [id]);

  useEffect(() => {
    if (values.dateTime) {
      handleReserve();
    }
  }, [values.dateTime]);

  const handleReserve = async () => {
    if (!values.dateTime || !user) {
      alert.show("Please select a date");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/request/add",
        {
          user_id: user?._id,
          tutor_id: tutor?._id,
          tutor_name: tutor?.username,
          meeting_time: values.dateTime,
        }
      );

      if (response.status === 201) {
        alert.show("Reservation successful");
      } else {
        alert.show("Failed to make a reservation");
      }
    } catch (error) {
      console.error("Error making reservation:", error);
      // alert.show("An error occurred. Please try again.");
    }
  };

  // Modal
  const handleClickOpen = () => {
    console.log("handleClickOpen triggered");
    setOpen(true);
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

    // console.log("Formatted Date:", targetDate);
    // handleReserve();
     handleClickOpen();
  };

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
      </div>
    );
  };
  // retrieve a unique time slots (plage horraires) from the availability slots (créaneaux de disponibilité) provided as parameters
  const getUniqueTimes = (availability: AvailabilitySlot[]): string[] => {
    const timeSet = new Set(availability.map((slot) => slot.startTime));
    return Array.from(timeSet).sort();
  };

  if (!tutor) return <div>Loading...</div>;

  return (
    <ApprenantLayout>
      <div className="flex justify-center mt-6 p-6 font-korto font-sans">
        <div className="w-2/3 mr-2 ">
          <section id="section-1">
            <div className="flex justify-center ">
              <img
                src="https://picsum.photos/id/646/200/200"
                alt="tuteur Profile"
                className="w-64 mx-3 rounded-lg"
              />
              <div>
                <div className="text-3xl font-bold">{tutor.username}</div>
                <div className="text-base my-2">
                  Build your Future: I will make you fluent in English with
                  customized classes. * IELTS Examiner for 5 years and 8 years
                  as a 1-1 Online English Tutor * Native Speaker * SAT Exam
                  Preparation
                </div>
                <div className="text-gray-400">
                  <div className="flex gap-2 items-center text-base">
                    <IoIosSchool color="black" />
                    Teaches English lessons Speaks French (B1),
                  </div>
                  <div className="flex gap-2 items-center text-base">
                    <AiOutlineSlack color="black" />
                    English (Native),
                  </div>
                  <div className="flex gap-2 items-center text-base">
                    <BsFillPersonFill color="black" />
                    Greek (B1) 5,689 lessons taught
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 my-6">
              <div className="font-bold text-2xl my-3">Recent View</div>
              <div className="ml-2">
                So far I had 4 lessons for IELTS speaking test. Theodora gave
                feedback on my English speaking and taught me how to improve. I
                think the lessons are useful!
              </div>
              <Button
                variant="outlined"
                size="sm"
                className="mt-3 underline ml-2 bg-opacity"
                onClick={() => {
                  ReviewRef.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                View all reviews
              </Button>
            </div>
          </section>
          <section id="section-2" className="p-4">
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
                  Choisissez une heure pour votre première leçon gratuite
                </div>
              </div>
              <div>{renderAvailabilityTable()}</div>
            </div>
          </section>
          <section id="reviews" ref={ReviewRef} className="p-4">
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
          <section id="Resume" className="p-4">
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
          <section id="Specialite" className="p-4">
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
        </div>
        <div id="section-video" className="w-1/3 ml-2 ">
          <div className="sticky top-0 max-h-screen overflow-y-auto">
            <div className="flex flex-col items-center">
              {/* Ajoutez votre vidéo et description ici */}
              <div className="p-4 mb-4">
                <iframe
                  className="border-xl "
                  width="400"
                  height="215"
                  src="https://www.youtube.com/embed/VIDEO_ID"
                  title="YouTube video player"
                  frameBorder="4"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="flex mt-4 justify-center gap-8 ">
                  <div className="flex items-center flex-col">
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-black-300 me-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 22 20"
                      >
                        <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                      </svg>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">
                        4.95
                      </p>
                    </div>
                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                    <a
                      href="/#"
                      className="text-md text-center font-medium text-gray-600 underline hover:no-underline dark:text-white"
                    >
                      73 reviews
                    </a>
                  </div>
                  <div className="flex items-center flex-col">
                    <div className="flex items-center">
                      <svg
                        className="w-6 h-6 text-gray-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M8 17.345a4.76 4.76 0 0 0 2.558 1.618c2.274.589 4.512-.446 4.999-2.31.487-1.866-1.273-3.9-3.546-4.49-2.273-.59-4.034-2.623-3.547-4.488.486-1.865 2.724-2.899 4.998-2.31.982.236 1.87.793 2.538 1.592m-3.879 12.171V21m0-18v2.2"
                        />
                      </svg>

                      <p className=" text-xl font-bold text-gray-900 dark:text-white">
                        37
                      </p>
                    </div>
                    <span className="w-1 h-1 mx-1.5 bg-gray-500 rounded-full dark:bg-gray-400"></span>
                    <a
                      href="/#"
                      className="text-md text-center font-medium text-gray-600 underline hover:no-underline dark:text-white"
                    >
                      50-min lesson
                    </a>
                  </div>
                </div>
                <div className="space-y-3 flex flex-col p-3 my-4">
                  <div className="border-4 border-slate-500	rounded-xl w-full p-2 flex items-center justify-center gap-3">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M3 4a1 1 0 0 0-.822 1.57L6.632 12l-4.454 6.43A1 1 0 0 0 3 20h13.153a1 1 0 0 0 .822-.43l4.847-7a1 1 0 0 0 0-1.14l-4.847-7a1 1 0 0 0-.822-.43H3Z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <div className="text-xl font-semibold">
                      Try a free lesson
                    </div>
                  </div>
                  <div className="border-4 border-slate-500	rounded-xl w-full p-2 flex items-center justify-center gap-3">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M4 3a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h1v2a1 1 0 0 0 1.707.707L9.414 13H15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1H4Z"
                        clip-rule="evenodd"
                      />
                      <path
                        fill-rule="evenodd"
                        d="M8.023 17.215c.033-.03.066-.062.098-.094L10.243 15H15a3 3 0 0 0 3-3V8h2a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-1v2a1 1 0 0 1-1.707.707L14.586 18H9a1 1 0 0 1-.977-.785Z"
                        clip-rule="evenodd"
                      />
                    </svg>

                    <div className="text-xl font-semibold">
                      Envoyer un message
                    </div>
                  </div>
                  <div className="border-4 border-slate-500	rounded-xl w-full p-2 flex items-center justify-center gap-3">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z"
                      />
                    </svg>

                    <div className="text-xl font-semibold">
                      Ajouter au favories
                    </div>
                  </div>
                </div>
                <div id="" className="space-y-3 p-3">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17 20v-5h2v6.988H3V15h1.98v5H17Z" />
                      <path d="m6.84 14.522 8.73 1.825.369-1.755-8.73-1.825-.369 1.755Zm1.155-4.323 8.083 3.764.739-1.617-8.083-3.787-.739 1.64Zm3.372-5.481L10.235 6.08l6.859 5.704 1.132-1.362-6.859-5.704ZM15.57 17H6.655v2h8.915v-2ZM12.861 3.111l6.193 6.415 1.414-1.415-6.43-6.177-1.177 1.177Z" />
                    </svg>

                    <p className="text-md ">
                      1 leçon réservée dans les dernières 48 heures
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        stroke-width="2"
                        d="M11.083 5.104c.35-.8 1.485-.8 1.834 0l1.752 4.022a1 1 0 0 0 .84.597l4.463.342c.9.069 1.255 1.2.556 1.771l-3.33 2.723a1 1 0 0 0-.337 1.016l1.03 4.119c.214.858-.71 1.552-1.474 1.106l-3.913-2.281a1 1 0 0 0-1.008 0L7.583 20.8c-.764.446-1.688-.248-1.474-1.106l1.03-4.119A1 1 0 0 0 6.8 14.56l-3.33-2.723c-.698-.571-.342-1.702.557-1.771l4.462-.342a1 1 0 0 0 .84-.597l1.753-4.022Z"
                      />
                    </svg>

                    <p>
                      Populaire : 2 étudiants ont contacté ce tuteur dans les
                      dernières 48 heures
                    </p>
                  </div>
                  <div className="flex items-center gap-2 ">
                    <svg
                      className="w-6 h-6 text-gray-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="2"
                        d="M7.111 20A3.111 3.111 0 0 1 4 16.889v-12C4 4.398 4.398 4 4.889 4h4.444a.89.89 0 0 1 .89.889v12A3.111 3.111 0 0 1 7.11 20Zm0 0h12a.889.889 0 0 0 .889-.889v-4.444a.889.889 0 0 0-.889-.89h-4.389a.889.889 0 0 0-.62.253l-3.767 3.665a.933.933 0 0 0-.146.185c-.868 1.433-1.581 1.858-3.078 2.12Zm0-3.556h.009m7.933-10.927 3.143 3.143a.889.889 0 0 1 0 1.257l-7.974 7.974v-8.8l3.574-3.574a.889.889 0 0 1 1.257 0Z"
                      />
                    </svg>

                    <p>Répond généralement dans les 10 heures</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ApprenantLayout>
  );
};
export default TuteurProfile;
