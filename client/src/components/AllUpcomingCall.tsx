import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Loader, Calendar, Clock, Link2, Trash2 } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

interface UpcomingMeeting {
  _id: string;
  upcoming_meeting_id: string;
  user_id: string;
  meeting_time: string;
  meeting_description?: string;
  meeting_url: string;
  __v: number;
}

const fetchUpcoming = async (userId: string): Promise<UpcomingMeeting[]> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/meet/GetAllUpcoming/${userId}`
    );

    console.log("Réponse de l'API:", response);

    if (!response.data) {
      throw new Error("Invalid response format");
    }

    const data = Array.isArray(response.data) ? response.data : [response.data];

    return data;
  } catch (error) {
    console.error("Error fetching upcoming meetings:", error);
    throw error;
  }
};
const deleteUpcomingMeeting = async (upcomingMeetingId: string) => {
  try {
    await axios.delete(
      `http://localhost:5000/api/meet/DelUpcoming/${upcomingMeetingId}`
    );
    console.log("Meeting deleted successfully");
  } catch (error) {
    console.error("Error deleting meeting:", error);
    throw error;
  }
};

const AllUpcomingCall = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const [upcomingMeetings, setUpcomingMeetings] = useState<UpcomingMeeting[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      if (user && user.id) {
        setIsLoading(true);
        try {
          const meetings = await fetchUpcoming(user.id);
          console.log("Réunions récupérées:", meetings);
          setUpcomingMeetings(meetings);
        } catch (error) {
          console.error("Error fetching meeting data:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  if (isLoading) return <Loader />;

  const noCallsMessage = "No Upcoming Calls";

  const handleDelete = async (upcomingMeetingId: string) => {
    confirmAlert({
      title: "Confirmer la suppression",
      message: "Êtes-vous sûr de vouloir supprimer cette réunion ?",
      buttons: [
        {
          label: "Oui",
          onClick: async () => {
            try {
              console.log(
                "Attempting to delete meeting with ID:",
                upcomingMeetingId
              );
              await deleteUpcomingMeeting(upcomingMeetingId);
              setUpcomingMeetings(
                upcomingMeetings.filter(
                  (meeting) => meeting.upcoming_meeting_id !== upcomingMeetingId
                )
              );
            } catch (error) {
              console.error(
                "Erreur lors de la suppression de la réunion:",
                error
              );
            }
          },
        },
        {
          label: "Non",
          onClick: () => {},
        },
      ],
    });
  };

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <Loader className="animate-spin text-blue-500" size={48} />
      </div>
    );
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-900 text-white p-6 rounded-xl shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-6 text-blue-400">Appels à venir</h2>
      <AnimatePresence>
        {upcomingMeetings.length > 0 ? (
          <motion.div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {upcomingMeetings.map((meeting) => (
              <motion.div
                key={meeting.upcoming_meeting_id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <h3 className="text-xl font-semibold mb-4 text-blue-300">
                  {meeting.meeting_description || "Pas de description"}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center text-gray-300">
                    <Calendar className="mr-2" size={18} />
                    <span>
                      {new Date(meeting.meeting_time).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-300">
                    <Clock className="mr-2" size={18} />
                    <span>
                      {new Date(meeting.meeting_time).toLocaleTimeString()}
                    </span>
                  </div>
                  <div className="flex items-center text-blue-400">
                    <Link2 className="mr-2" size={18} />
                    <a
                      href={meeting.meeting_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      Lien de la réunion
                    </a>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(meeting.upcoming_meeting_id)}
                  className="mt-4 flex items-center justify-center w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition duration-300"
                >
                  <Trash2 size={18} className="mr-2" />
                  Supprimer
                </motion.button>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-xl text-gray-400 text-center"
          >
            Aucun appel à venir
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AllUpcomingCall;
