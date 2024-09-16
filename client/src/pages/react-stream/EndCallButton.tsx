import { Button } from "@material-tailwind/react";
import {
  Call,
  StreamCall,
  useCall,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";
const apiUrl = process.env.REACT_APP_API_URL;
function EndCallButton() {
  const call = useCall();
  const navigate = useNavigate();
  const {
    useLocalParticipant,
    useParticipants,
    useCallStartedAt,
    useParticipantCount,
  } = useCallStateHooks();
  const participants = useParticipants();
  const localParticipant = useLocalParticipant();
  const startTime = useCallStartedAt();
  const numOfParticipants = useParticipantCount();

  const isMeetingOwner =
    localParticipant &&
    call?.state.createdBy &&
    localParticipant.userId === call.state.createdBy.id;

  if (!isMeetingOwner) return null;

  const endCall = async () => {
    let userParticipant: string[] = [];
    participants.forEach((user) => userParticipant.push(user.userId));

    if (!startTime) {
      console.error("Start time is undefined.");
      return; // Return or handle the error condition appropriately
    }

    const endTime = new Date();
    const callId = call?.id;
    const callOwner = call?.state?.createdBy?.id;
    const title = call?.state?.custom?.description;
    const duration = (
      (endTime.getTime() - new Date(startTime).getTime()) /
      1000 /
      60
    ).toFixed(2);
    const userData = {
      callId,
      callOwner,
      title,
      startTime,
      endTime,
      duration,
      userParticipant,
      numOfParticipants,
    };

    try {
      const response = await axios.post(
        `${apiUrl}/meet/updateMeeting`,
        userData
      );

      if (response.status !== 201) {
        await call.endCall();
        throw new Error("Failed to create meeting details");
      }
      await call.endCall();
      navigate("/tuteur/welcome");
    } catch (error) {
      console.error("Error creating meeting data:", error);
    }
  };

  return (
    <Button onClick={endCall} className="bg-red-500">
      End call for everyone
    </Button>
  );
}

export default EndCallButton;
