import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "src/Context/AuthContext";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useGetCallById } from "src/hooks/useGetCallById";
import LoadingSpinner from "../../components/LoadingSpinner";
import MeetingSetup from "./MeetingSetup";
import MeetingRoom from "./MeetingRoom";
import { useParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

const Meeting = () => {
  const { id } = useParams();
  const { user, isSignedIn, getLoggedInUser, loading } =
    useContext(AuthContext);
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isCallLoading } = useGetCallById(id ?? "");

  useEffect(() => {
    if (!user && !loading) {
      getLoggedInUser();
    }
  }, [user, loading, getLoggedInUser]);

  // useEffect(() => {
  //   console.log("Meeting Component Rendered");
  //   console.log({ isSignedIn, isSetupComplete, call });
  // }, [isSignedIn, isSetupComplete, call]);

  if (isCallLoading) return <LoadingSpinner />;
  if (!call) return <div>Call not found</div>;

  return (
    <main className="h-screen w-full">
      {isSignedIn ? (
        <StreamCall call={call}>
          <StreamTheme>
            {!isSetupComplete ? (
              <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
            ) : (
              <MeetingRoom />
            )}
          </StreamTheme>
        </StreamCall>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <Spinner className="h-16 w-16 text-gray-900/50" />
        </div>
      )}
    </main>
  );

  // const { call, isCallLoading } =
};
export default Meeting;
