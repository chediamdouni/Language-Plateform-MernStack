import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";

import { Loader } from "lucide-react";
import axios from "axios";

interface UpcomingMeeting {
  _id: string;
  upcoming_meeting_id: string;
  user_id: string;
  meeting_time: string;
  meeting_description?: string;
  meeting_url: string;
  __v: number;
}
const apiUrl = process.env.REACT_APP_API_URL;

const fetchUpcoming = async (userId: string): Promise<UpcomingMeeting[]> => {
  try {
    const response = await axios.get(
       `${apiUrl}/meet/GetUpcoming/${userId}`
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

const UpcomingCallList = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
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
