import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";

import { Loader } from "lucide-react";
import axios from "axios";

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
  _id: string;
  upcoming_meeting_id: string;
  user_id: string;
  meeting_time: string; // Utiliser string ici pour correspondre au format de la réponse
  meeting_description?: string;
  meeting_url: string;
  __v: number;
}

const fetchUpcoming = async (userId: string): Promise<UpcomingMeeting[]> => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/meet/GetUpcoming/${userId}`
    );

    console.log("Réponse de l'API:", response); // Ajout de journaux pour inspecter la réponse

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

const UpcomingCallList = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [upcomingMeetings, setUpcomingMeetings] = useState<UpcomingMeeting[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      if (user && user._id) {
        setIsLoading(true);
        try {
          const meetings = await fetchUpcoming(user._id);
          console.log("Réunions récupérées:", meetings); // Ajout de journaux pour vérifier les réunions récupérées
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

  return (
    <>
      {upcomingMeetings.length !== 0 ? (
        <ul>
          {upcomingMeetings.map((meeting) => (
            <li key={meeting.upcoming_meeting_id} className="mb-4">
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
                  Join Meeting
                </a>
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <h1 className="text-2xl font-bold text-black">{noCallsMessage}</h1>
      )}
    </>
  );
};

export default UpcomingCallList;
