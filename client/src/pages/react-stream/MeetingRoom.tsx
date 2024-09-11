import React from "react";
import { useEffect, useState } from "react";
import {
  SpeakerLayout,
  useCallStateHooks,
  CallingState,
  PaginatedGridLayout,
  CallParticipantsList,
  CallControls,
  CallStatsButton,
} from "@stream-io/video-react-sdk";
import {
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Typography,
} from "@material-tailwind/react";
import { Layout, Loader, Users } from "lucide-react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import EndCallButton from "./EndCallButton";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const MeetingRoom = () => {
  const navigate = useNavigate();
  const SearchParams = useSearchParams();
  const [layout, setLayout] = useState<CallLayoutType>("speaker-left");
  const [showParticipants, setShowParticipants] = useState(false);
  const { useCallCallingState } = useCallStateHooks();
  const callingState = useCallCallingState();

  if (callingState !== CallingState.JOINED) return <div>attend attend </div>;
  //  console.log(callingState);

  const CallLayout = () => {
    switch (layout) {
      case "grid":
        return <PaginatedGridLayout />;

      case "speaker-right":
        return <SpeakerLayout participantsBarPosition="left" />;

      default:
        return <SpeakerLayout participantsBarPosition="right" />;
    }
  };

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center ">
          <CallLayout />
        </div>
        <div
          className={`h-[calc(100vh-86px)] ml-4 ${
            showParticipants ? "block" : "hidden"
          }`}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls onLeave={() => navigate("/")} />
        <Menu>
          <MenuHandler>
            <Button className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <Layout size={20} className="text-white" />
            </Button>
          </MenuHandler>
          <MenuList className="bg-[#19232d] text-white">
            {["Grid", "Speaker-left", "Speaker-right"].map((item, index) => (
              <MenuItem
                key={index}
                className="cursor-pointer hover:bg-[#4c535b]"
                onClick={() => {
                  setLayout(item.toLowerCase() as CallLayoutType);
                }}
              >
                <Typography className="text-white">{item}</Typography>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <CallStatsButton />
        <button
          onClick={() => {
            setShowParticipants((prev) => !prev);
          }}
        >
          <div className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <Users size={20} className="text-white" />
          </div>
        </button>
        <EndCallButton />
      </div>
    </section>
  );
};

export default MeetingRoom;
