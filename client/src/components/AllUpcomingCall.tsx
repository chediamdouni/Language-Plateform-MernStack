import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { Loader } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

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
      title: "Confirm to delete",
      message: "Are you sure you want to delete this meeting?",
      buttons: [
        {
          label: "Yes",
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
              console.error("Error deleting meeting:", error);
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };
  return (
    <>
      {upcomingMeetings.length !== 0 ? (
        <ul className="flex gap-4 flex-wrap">
          {upcomingMeetings.map((meeting) => (
            <li
              key={meeting.upcoming_meeting_id}
              className="mb-4 border drop-shadow-md p-2 w-auto"
            >
              <p>
                <strong>Description:</strong>
                {meeting.meeting_description || "No description"}
              </p>
              <p>
                <strong>Time:</strong>
                {new Date(meeting.meeting_time).toLocaleString()}
              </p>
              <p>
                <strong>Link:</strong>
                <a
                  href={meeting.meeting_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {meeting.meeting_url}
                </a>
              </p>
              <button
                onClick={() => handleDelete(meeting.upcoming_meeting_id)}
                className="bg-red-500 text-white px-2 py-1 rounded mt-3"
              >
                Supprimer
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="text-2xl font-bold text-black">{noCallsMessage}</h1>
      )}
    </>
  );
};

export default AllUpcomingCall;
