import { Button } from "@mui/material";

import {
  DeviceSettings,
  VideoPreview,
  useCall,
} from "@stream-io/video-react-sdk";

import React, { useEffect, useState } from "react";

const MeetingSetup = ({
  setIsSetupComplete,
}: {
  setIsSetupComplete: (value: boolean) => void;
}) => {
  const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false);

  const call = useCall();

  if (!call) {
    throw new Error("usecall must be used within StreamCall Component");
  }
  useEffect(() => {
    if (isMicCamToggleOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicCamToggleOn, call?.camera, call?.microphone]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white font-Korto-Medium">
      <h1 className="text-3xl font-bold mb-4">Configuration</h1>
      <VideoPreview />
      <div className="flex h-16 items-center justify-center gap-3">
        <label className="flex items-center justify-center gap-2 font-medium ">
          <input
            type="checkbox"
            checked={isMicCamToggleOn}
            onChange={(e) => setIsMicCamToggleOn(e.target.checked)}
          />
          Rejoindre avec le micro et la caméra éteinte
        </label>
        <DeviceSettings />
      </div>
      <Button
        color="success"
        variant="contained"
        className="rounded-md  px-4 py-2.5"
        onClick={() => {
          call.join();
          setIsSetupComplete(true);
        }}
      >
        Rejoindre la réunion
      </Button>
    </div>
  );
};

export default MeetingSetup;
