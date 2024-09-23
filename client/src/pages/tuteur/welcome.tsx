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
import TuteurRequest from "../../components/TuteurRequest";
import { motion, useScroll, useSpring } from "framer-motion";

const apiUrl = process.env.REACT_APP_API_URL;
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
  const { user, isSignedIn, getLoggedInUser } = useContext(AuthContext);
  const [open, setOpen] = React.useState(false);
  const client = useStreamVideoClient();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [callDetails, setCallDetails] = useState<Call>();
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
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

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Refs pour chaque section
  const heroRef = useRef(null);
  const profileRef = useRef(null);
  const scheduleRef = useRef(null);
  const upcomingCallsRef = useRef(null);
  const reviewsRef = useRef(null);
  const statisticsRef = useRef(null);
  const requestsRef = useRef(null);

  useEffect(() => {
    if (!loading && !isSignedIn && !user) {
      navigate("/tuteur/connexion");
    }
  }, [loading, isSignedIn, navigate, user]);

  // Fetching availability from BackSide
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://language-plateform-mernstack.onrender.com/api/tuteur/availability/65dcd2e9d997a54d215c10dd`
        );
        console.log(response.data.availability);
        setAvailability(response.data.availability || []);
      } catch (error) {
        console.log(error);
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
          const meeting_url = `https://language-plateform-mern-stack.vercel.app/meeting/${call.id}`;

          UpcomingCalls.push({
            upcoming_meeting_id,
            user_id,
            meeting_time,
            meeting_description,
            meeting_url,
          });
        });
      }
      try {
        setLoading(true);
        console.log("Sending request to server with data:", UpcomingCalls);
        const response = await axios.post(
          `${apiUrl}/meet/upcoming`,
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
  const meetingLink = `https://language-plateform-mern-stack.vercel.app/meeting/${callDetails?.id}`;
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
      <div className="mx-auto p-5 bg-gray-800 rounded-xl shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-gray-200">
            <thead className="text-xs uppercase bg-gray-700 text-gray-400">
              <tr>
                {days.map((day) => (
                  <th key={day} className="px-4 py-3">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {getUniqueTimes(availability).map((time) => (
                <tr key={time} className="border-b border-gray-700">
                  {days.map((day) => (
                    <td className="px-4 py-3" key={`${day}-${time}`}>
                      {slotsByDay[day] &&
                        slotsByDay[day].find(
                          (slot) => slot.startTime === time
                        ) && (
                          <button
                            className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
                            onClick={() => {
                              HandleClickTime(time, day);
                            }}
                          >
                            {time}
                          </button>
                        )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {!callDetails ? (
          <Dialog
            open={open}
            onClose={handleClose}
            fullWidth
            maxWidth="sm"
            PaperProps={{
              className: "bg-gray-800 text-gray-200 rounded-lg",
            }}
          >
            <form onSubmit={createMeeting} className="p-6">
              <DialogTitle className="text-2xl font-bold mb-4">
                Ajouter un leçon
              </DialogTitle>
              <DialogContent>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Description
                    </label>
                    <TextField
                      required
                      fullWidth
                      variant="outlined"
                      onChange={handleChange}
                      className="bg-gray-700 rounded-md"
                      InputProps={{
                        className: "text-gray-200",
                      }}
                    />
                  </div>
                  <div className="flex w-full flex-col gap-2.5">
                    <label className="block text-sm font-medium mb-2">
                      Créneau Horaire
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
                      className="w-full rounded-md p-2 bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* <TextField
                      className="w-full rounded p-2 focus:outline-none text-black"
                      // value={values.dateTime?.toLocaleString()} // Display the selected date and time
                    /> */}
                  </div>
                </div>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={handleClose}
                  className="bg-gray-600 hover:bg-gray-700 text-white"
                >
                  Annuler
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-600 text-white"
                >
                  Ajouter
                </Button>
              </DialogActions>
            </form>
          </Dialog>
        ) : (
          <Dialog
            open={meetingState === "isScheduleMeeting"}
            onClose={() => {
              handleClose();
            }}
            PaperProps={{
              className: "bg-gray-800 text-gray-200 rounded-lg",
            }}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle className="text-2xl font-bold">
              Meeting Link
            </DialogTitle>
            <DialogContent>
              <DialogContentText className="text-gray-300">
                Réunion créée avec succès
                <p className="mt-2 p-2 bg-gray-700 rounded">
                  Meeting Link: {meetingLink}
                </p>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(meetingLink);
                  setCallDetails(undefined);
                  setMeetingState(undefined);
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white"
              >
                Copier le lien
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col space-y-8 text-gray-100 relative"
      >
        {/* Ligne de progression */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-2 bg-blue-500 z-50"
          style={{ scaleX }}
        />
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative h-[300px] rounded-xl overflow-hidden"
        >
          {" "}
          <div
            className="absolute inset-0 bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <div className="absolute inset-0 bg-gray-900 opacity-75"></div>
          </div>
          <div className="relative h-full flex items-center justify-center">
            <div className="text-center">
              <h1 className="text-4xl font-bold mb-4">
                Bienvenue, {user?.username}
              </h1>
              <p className="text-xl">Prêt à inspirer et éduquer ?</p>
            </div>
          </div>
        </motion.section>

        {/* Profile Section */}
        <motion.section
          ref={profileRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          {" "}
          <div className="flex items-center space-x-4">
            <Avatar
              alt={user?.username}
              src={`https://language-plateform-mernstack.onrender.com/${user?.profileImage}`}
              sx={{ width: 100, height: 100 }}
            />
            <div>
              <h2 className="text-2xl font-bold">{user?.username}</h2>
              <p className="text-gray-400">{user?.country}</p>
            </div>
          </div>
          <div className="mt-6">
            <h3 className="text-xl font-semibold mb-2">À propos de moi</h3>
            <p className="text-gray-300">{user?.aboutMe}</p>
          </div>
          <Button
            color="blue"
            className="mt-4"
            onClick={() => navigate("/tuteur/edit")}
          >
            Modifier le profil
          </Button>
        </motion.section>

        {/* Schedule Section */}
        <motion.section
          ref={scheduleRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          {" "}
          <h2 className="text-2xl font-bold mb-4">Horaire</h2>
          {renderAvailabilityTable()}
        </motion.section>

        {/* Upcoming Calls Section */}
        <motion.section
          ref={upcomingCallsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          {" "}
          <h2 className="text-2xl font-bold mb-4">Appels à venir</h2>
          <AllUpcomingCall />
        </motion.section>

        {/* Reviews Section */}
        <motion.section
          ref={reviewsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          {" "}
          <h2 className="text-2xl font-bold mb-4">Avis des élèves</h2>
          <div className="space-y-4">
            {/* Implement ReviewCard component with dark theme */}
            <ReviewCard
              name="Theodora D."
              imageSrc="https://picsum.photos/id/646/200/200"
              description="Excellent tuteur, très patient et compétent."
            />
            <ReviewCard
              name="Chedi"
              imageSrc="https://picsum.photos/id/646/200/200"
              description="Les cours sont toujours bien structurés et intéressants."
            />
            {show && (
              <>
                <ReviewCard
                  name="Azizza"
                  imageSrc="https://picsum.photos/id/646/200/200"
                  description="J'ai fait beaucoup de progrès grâce à ces cours."
                />
              </>
            )}
          </div>
          <Button color="blue" className="mt-4" onClick={ToggleShowAllReviews}>
            {show ? "Afficher moins" : "Afficher plus"}
          </Button>
        </motion.section>

        {/* Statistics Section */}
        <motion.section
          ref={statisticsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          {" "}
          <h2 className="text-2xl font-bold mb-4">Statistiques</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <StatCard title="Revenus totaux" value="$8,141" change="+3%" />
            <StatCard title="Nouvelles commandes" value="217" change="+5%" />
            <StatCard title="Nouvelles connexions" value="54" change="+7%" />
          </div>
          <VerticalBarChart />
        </motion.section>

        {/* Requests Section */}
        <motion.section
          ref={requestsRef}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-gray-800 rounded-xl p-6 shadow-lg"
        >
          <h2 className="text-2xl font-bold mb-4">Demandes des élèves</h2>
          <TuteurRequest />
        </motion.section>
      </motion.div>
    </TuteurLayout>
  );
};

// Helper component for stat cards
const StatCard = ({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) => (
  <div className="bg-gray-700 p-4 rounded-lg">
    <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
    <p
      className={`text-sm ${
        change.startsWith("+") ? "text-green-400" : "text-red-400"
      }`}
    >
      {change}
    </p>
  </div>
);

export default WelcomeComponent;
