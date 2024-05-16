import React from "react";
import { useEffect, useState } from "react";
import {
  Call,
  CallControls,
  StreamCall,
  StreamTheme,
  StreamVideo,
  SpeakerLayout,
  StreamVideoClient,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import "./styles.css";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import { positions } from "react-alert";
import HomeCard from "../../components/HomeCard";
import MeetingModal from "../../components/MeetingModal";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Textarea } from "@material-tailwind/react";
const callId = "default_86cc4d89-c08f-41d6-8328-da13e535cb3e";
const user_id = "csb-user";
const user = { id: user_id };

const apiKey = "mmhfdzb5evj2";
const tokenProvider = async () => {
  const { token } = await fetch(
    "https://pronto.getstream.io/api/auth/create-token?" +
      new URLSearchParams({
        api_key: apiKey,
        user_id: user_id,
      })
  ).then((res) => res.json());
  return token as string;
};

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

const MeetingRoom = () => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(!open);

  const client = useStreamVideoClient();
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [callDetails, setCallDetails] = useState<Call>();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isMeetingCreated" | undefined
  >(undefined);
  const createMeeting = async () => {
    if (!client) return;
    try {
      if (!values.dateTime) {
        toast.success("Success Notification !", {
          position: "bottom-left",
        });
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Votre call n'est pas créer");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });
     // setCallDetails(call);
      
    } catch (error) {
      console.log(error);
      toast.error("erreur lors du creation", {
        position: "bottom-left",
      });
    }
  };
 // const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
  return (
    <>
      <HomeCard
        img=""
        description="Plan your meeting"
        title="Arranger une réunion"
        className="bg-purple-500"
        handleClick={() => {
          handleOpen();
          setMeetingState("isScheduleMeeting");
        }}
      ></HomeCard>
      {!callDetails ? (
        <Dialog
          open={meetingState === "isScheduleMeeting"}
          handler={() => {
            handleOpen();
          }}
          className="w-1/2 bg-cyan-700"
        >
          <DialogHeader className="text-3xl font-bold leading-[42px]">
            Create Meeting
          </DialogHeader>
          <DialogBody className="gap-6 border-none  px-6 py-9 text-white">
            <div className="flex flex-col gap-6">
              {loading && <LoadingSpinner />}
              <div className="flex flex-col gap-2.5">
                <label className="text-base font-normal leading-[22.4px] text-sky-2">
                  Add a description
                </label>
                <Textarea
                  className="border-none bg-cyan-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                  onChange={(e) =>
                    setValues({ ...values, description: e.target.value })
                  }
                />
              </div>
              <div className="flex w-full flex-col gap-2.5">
                <label className="text-base font-normal leading-[22.4px]">
                  Select Date and Time
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
                  className="w-full rounded p-2 focus:outline-none text-black"
                />
              </div>
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={() => {
                handleOpen();
                setMeetingState(undefined);
              }}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={createMeeting}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
      ) : (
        <Dialog
          open={meetingState === "isMeetingCreated"}
          handler={() => {
            handleOpen();
            setMeetingState(undefined);
          }}
          className="text-center"
        >
          <DialogHeader className="text-3xl font-bold leading-[42px]">
            Meeting Created
          </DialogHeader>
          <DialogBody>
            <div>
              <p>Meeting successfully created!</p>
              {/* <p>Meeting Link: {meetingLink}</p> */}
            </div>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="gradient"
              color="blue"
              // onClick={() => {
              //   navigator.clipboard.writeText(meetingLink);
              //   toast(toast.success("Link copied "));
              // }}
            >
              <span>Copy Link</span>
            </Button>
            <Button
              variant="gradient"
              color="red"
              onClick={() => {
                setCallDetails(undefined);
                setMeetingState(undefined);
              }}
            >
              <span>Create New Meeting</span>
            </Button>
          </DialogFooter>
        </Dialog>
      )}
    </>
  );
};
export default MeetingRoom;
