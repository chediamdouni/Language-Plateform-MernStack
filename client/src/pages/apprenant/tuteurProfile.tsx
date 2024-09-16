import React, { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { IoIosSchool } from "react-icons/io";
import { BsFillPersonFill, BsStarFill } from "react-icons/bs";
import { AiOutlineSlack } from "react-icons/ai";
import { ReviewCard } from "../../components/ReviewCard";
import { motion, AnimatePresence } from "framer-motion";
import { useClient } from "src/hooks/useStreamClient";
import "stream-chat-react/dist/css/v2/index.css";
import { IoClose } from "react-icons/io5";
import { StreamChat, Channel as StreamChannel } from "stream-chat";
import { Box, Modal } from "@mui/material";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate, useParams } from "react-router-dom";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import { AuthContext } from "src/Context/AuthContext";
import {
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Channel,
  Thread,
  Window,
  MessageInputFlat,
  useChannelActionContext,
  useChannelStateContext,
} from "stream-chat-react";
import { FaDollarSign } from "react-icons/fa6";
import { toast } from "react-toastify";
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

interface Tutor {
  _id: string;
  username: string;
  profileImage: string;
  aboutMe: string;
  experience: number;
  language: string;
  country: string;
  gender: string;
}
interface Course {
  _id: string;
  titre: string;
  description: string;
  tuteur: string;
  prix: number;
  etudiantsInscrits: string[];
}
interface Favorites {
  favoriteTutors: Tutor[];
  favoriteCourses: Course[];
}

const CustomMessageInput = () => {
  const [message, setMessage] = React.useState("");
  const { sendMessage } = useChannelActionContext();
  const { channel } = useChannelStateContext();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (message.trim() === "") return;

    sendMessage({
      text: message,
    });
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border-t">
      <div className="flex">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-grow px-4 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-purple-600 text-white rounded-r-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          Send
        </button>
      </div>
    </form>
  );
};

const TuteurProfile = () => {
  const { id } = useParams<{ id: string }>();
  const { user, streamToken } = useContext(AuthContext);
  const [tutor, setTutor] = useState<Tutor | null>(null);
  const [open, setOpen] = React.useState(false);
  // const [client, setClient] = useState<StreamVideoClient>();
  const [values, setValues] = useState(initialValues);
  const [availability, setAvailability] = useState<AvailabilitySlot[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [channel, setChannel] = useState<StreamChannel | null>(null);
  const [selectedTutor, setSelectedTutor] = useState<{
    _id: string;
    username: string;
  } | null>(null);
  const chatClient = useClient({ user, streamToken });
  const [reviewToShow, setReviewToShow] = useState(3);
  const ReviewRef = useRef<HTMLDivElement | null>(null);
  const [favorites, setFavorites] = useState<Favorites>({
    favoriteTutors: [],
    favoriteCourses: [],
  });
  const [message, setMessage] = useState<string>("");

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
      toast.error("Please select a date");
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/request/add`, {
        user_id: user?.id,
        user_name: user?.username,
        tutor_id: tutor?._id,
        tutor_name: tutor?.username,
        meeting_time: values.dateTime,
      });

      if (response.status === 201) {
        toast.success("Reservation successful");
      } else {
        toast.error("Failed to make a reservation");
      }
    } catch (error) {
      console.error("Error making reservation:", error);
      // alert.show("An error occurred. Please try again.");
    }
  };
  // messaging Modal
  const handleClose = () => {
    setShowChat(false);
    setSelectedTutor(null);
  };

  const handleSelectTutorChat = (tutorId: string, tutorName: string) => {
    // console.log("handleSelectTutorChat called", tutorId, tutorName);
    setSelectedTutor({ _id: tutorId, username: tutorName });
    setShowChat(true);
    // navigate("/inbox", {
    //   state: { selectedTutor: { _id: tutorId, username: tutorName } },
    // });
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
  // creating channel for messages
  useEffect(() => {
    if (user && chatClient && selectedTutor) {
      console.log("Channel users ", user.id, selectedTutor._id);
      const channel = chatClient.channel(
        "messaging",
        `${user.id}_${selectedTutor._id}`,
        {
          name: user.username,
          members: [user.id, selectedTutor._id],
        }
      );
      setChannel(channel);
    }
  }, [user, chatClient, selectedTutor]);

  // fetch favorites
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get<Favorites>(
          `http://localhost:5000/api/users/favorites/${user?.id}`
        );
        setFavorites(response.data);
      } catch (error) {
        console.error("Erreur lors de la récupération des favoris:", error);
      }
    };

    fetchFavorites();
  }, [user?.id]);

  // adding tutor to favorites
  const addToFavorites = async () => {
    try {
      const userId = user?.id;
      const tutorId = id;
      if (!userId) {
        console.log("user n'est pas defini ");
      }
      if (!tutorId) {
        console.log("tuteur  n'est pas defini ");
      }
      const response = await axios.post(`${apiUrl}/users/favorite/tutors/add`, {
        tutorId: id,
        userId: user?.id,
      });
      console.log("Message de succès:", response.data.message);

      setMessage(response.data.message);
      toast.success("✅ Ajouté avec succées ", {
        position: "top-center",
      });
    } catch (error) {
      toast.error("le tuteur est deja dans la liste des favories", {
        position: "top-center",
      });

      console.error("Erreur lors de l'ajout du tuteur aux favoris:", error);
      setMessage("Erreur lors de l'ajout du tuteur aux favoris");
    }
  };

  if (!tutor) return <div>Loading...</div>;

  return (
    <ApprenantLayout>
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white shadow-2xl rounded-3xl overflow-hidden"
          >
            {/* Section de profil améliorée */}

            <div className="md:flex mt-10">
              {/* Colonne de gauche */}
              <div className="md:w-2/3 p-8">
                <section className="mb-12 text-center">
                  <div className="flex gap-2 justify-center items-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20,
                      }}
                      className="mb-5"
                    >
                      <img
                        src={`http://localhost:5000/${tutor?.profileImage}`}
                        alt={tutor?.username}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    </motion.div>
                    <motion.h1
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-4xl font-bold text-gray-900 mb-2"
                    >
                      {tutor?.username}
                    </motion.h1>
                  </div>

                  <p className="text-lg text-gray-600 mb-4">{tutor?.aboutMe}</p>
                  <div className="flex justify-center space-x-6">
                    <span className="flex items-center text-sm text-gray-500">
                      <IoIosSchool className="mr-2 text-purple-500" />
                      {tutor?.experience} years experience
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <AiOutlineSlack className="mr-2 text-purple-500" />
                      {tutor?.language}
                    </span>
                    <span className="flex items-center text-sm text-gray-500">
                      <BsFillPersonFill className="mr-2 text-purple-500" />
                      {tutor?.country}
                    </span>
                  </div>
                </section>

                {/* Section des statistiques des élèves */}
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Statistiques des élèves
                  </h2>
                  <div className="grid grid-cols-3 gap-6">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-xl shadow-lg p-6 text-center"
                    >
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        152
                      </div>
                      <div className="text-sm text-gray-600">
                        Élèves inscrits
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-xl shadow-lg p-6 text-center"
                    >
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        98%
                      </div>
                      <div className="text-sm text-gray-600">
                        Taux de satisfaction
                      </div>
                    </motion.div>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className="bg-white rounded-xl shadow-lg p-6 text-center"
                    >
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        1,280
                      </div>
                      <div className="text-sm text-gray-600">
                        Heures enseignées
                      </div>
                    </motion.div>
                  </div>
                </section>

                {/* Section du calendrier */}
                <section className="mb-12">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Calendrier
                  </h2>
                  <div className="bg-purple-50 rounded-xl p-6">
                    <div className="text-purple-700 font-medium mb-4">
                      Choisissez une heure pour votre première leçon gratuite
                    </div>
                    {renderAvailabilityTable()}
                  </div>
                </section>

                {/* Section des avis */}
                <section ref={ReviewRef} className="mb-12">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                    Ce que disent les élèves
                  </h2>
                  <div className="space-y-6">
                    <ReviewCard
                      name="Sophie L."
                      imageSrc="https://randomuser.me/api/portraits/women/65.jpg"
                      description="J'ai adoré mes cours avec ce tuteur ! Son approche pédagogique est excellente et j'ai fait des progrès rapides. Je recommande vivement !"
                    />
                    <ReviewCard
                      name="Thomas M."
                      imageSrc="https://randomuser.me/api/portraits/men/32.jpg"
                      description="Un tuteur patient et attentif. Il adapte parfaitement ses leçons à mes besoins et à mon rythme d'apprentissage. Très satisfait !"
                    />
                    <ReviewCard
                      name="Emma R."
                      imageSrc="https://randomuser.me/api/portraits/women/89.jpg"
                      description="Grâce à ce tuteur, j'ai réussi mon examen avec brio. Ses explications sont claires et il fournit d'excellents supports de cours. Merci !"
                    />
                    {show && (
                      <>
                        <ReviewCard
                          name="Lucas D."
                          imageSrc="https://randomuser.me/api/portraits/men/55.jpg"
                          description="Un excellent pédagogue qui sait rendre les cours intéressants et interactifs. J'ai hâte de continuer à apprendre avec lui !"
                        />
                        <ReviewCard
                          name="Chloé B."
                          imageSrc="https://randomuser.me/api/portraits/women/42.jpg"
                          description="Je suis impressionnée par la qualité des cours et l'engagement de ce tuteur. Il est toujours disponible pour répondre à mes questions, même en dehors des heures de cours."
                        />
                      </>
                    )}
                  </div>
                  <button
                    className="mt-6 text-purple-600 hover:text-purple-800 transition duration-300 ease-in-out"
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
                      Topica Native - An Online English School Serving
                      Vietnamese English Learners English Language Teacher
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
                      I have been teaching 1 on on private lessons for 4 years.
                      this can be about anything! family, hobbies, business
                      meeting. If your not sure, lets book some time to figure
                      out what you need
                    </div>
                  </div>
                </section>
              </div>

              {/* Colonne de droite */}
              <div className="md:w-1/3 bg-gray-50 p-8">
                <div className="sticky top-8">
                  <div className="mb-8">
                    <iframe
                      className="w-full rounded-xl shadow-lg"
                      height="215"
                      src="https://www.youtube.com/embed/VIDEO_ID"
                      title="Présentation du tuteur"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>

                  <div className="flex justify-between mb-6">
                    <div className="text-center">
                      <div className="flex items-center justify-center text-3xl font-bold text-purple-600">
                        <BsStarFill className="mr-2 text-yellow-400" />
                        4.95
                      </div>
                      <div className="text-sm text-gray-600">73 avis</div>
                    </div>
                    <div className="text-center">
                      <div className="flex items-center justify-center text-3xl font-bold text-purple-600">
                        <FaDollarSign className="mr-1 text-green-500" />
                        37
                      </div>
                      <div className="text-sm text-gray-600">par heure</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button className="w-full bg-purple-600 text-white rounded-xl py-3 font-semibold hover:bg-purple-700 transition duration-300 ease-in-out">
                      Essayer une leçon gratuite
                    </button>
                    <button
                      className="w-full bg-white text-purple-600 border-2 border-purple-600 rounded-xl py-3 font-semibold hover:bg-purple-50 transition duration-300 ease-in-out"
                      onClick={() =>
                        handleSelectTutorChat(
                          tutor?._id || "",
                          tutor?.username || ""
                        )
                      }
                    >
                      Envoyer un message
                    </button>
                    <button
                      className="w-full bg-white text-gray-700 border-2 border-gray-300 rounded-xl py-3 font-semibold hover:bg-gray-50 transition duration-300 ease-in-out"
                      onClick={addToFavorites}
                    >
                      Ajouter aux favoris
                    </button>
                  </div>

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-5 h-5 text-purple-500 mr-2" /* ... */ />
                      1 leçon réservée dans les dernières 48 heures
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-5 h-5 text-purple-500 mr-2" /* ... */ />
                      Populaire : 2 étudiants ont contacté ce tuteur dans les
                      dernières 48 heures
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <svg className="w-5 h-5 text-purple-500 mr-2" /* ... */ />
                      Répond généralement dans les 10 heures
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {showChat && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-full overflow-hidden flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-2xl font-semibold text-gray-800">
                  Chat with {selectedTutor?.username}
                </h2>
                <button
                  onClick={handleClose}
                  className="text-gray-500 hover:text-gray-700 transition-colors"
                >
                  <IoClose size={24} />
                </button>
              </div>

              <div className="flex-grow overflow-auto">
                {chatClient && channel ? (
                  <Chat client={chatClient} theme="str-chat__theme-light">
                    <Channel channel={channel}>
                      <Window>
                        <ChannelHeader />
                        <MessageList />
                        <MessageInput Input={MessageInputFlat} />
                      </Window>
                      <Thread />
                    </Channel>
                  </Chat>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full"
                    />
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ApprenantLayout>
  );
};
export default TuteurProfile;
