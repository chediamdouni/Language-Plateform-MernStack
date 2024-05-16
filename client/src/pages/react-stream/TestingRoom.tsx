import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FaMagento } from "react-icons/fa";
import {
  Call,
  StreamVideoClient,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MeetingModal from "@/componentsMeetingModal";
//import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

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

export default function TestingRoom() {
  const [open, setOpen] = React.useState(false);
  const [client, setClient] = useState<StreamVideoClient>();
  // //const [meetingLink, setMeetingLink] = useState<string>("");
  // console.log("Client", client);
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [callDetails, setCallDetails] = useState<Call>();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isMeetingCreated" | undefined
  >(undefined);

  useEffect(() => {
    const myClient = new StreamVideoClient({ apiKey, user, tokenProvider });
    setClient(myClient);
    return () => {
      myClient.disconnectUser();
      setClient(undefined);
    };
  }, []);

  const handleClickOpen = () => {
    console.log("handleClickOpen triggered");
    setOpen(true);
    setMeetingState("isScheduleMeeting");
  };

  const handleClose = () => {
    console.log("close");
    setOpen(false);
    setMeetingState(undefined);
  };

  const createMeeting = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("hiii");
    event.preventDefault();
    if (!client) return;
    try {
      if (!values.dateTime) {
        console.log("Success Notification !");
        return;
      }
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Votre call n'est pas créer");

      const startsAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      const response = await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);
      console.log(callDetails);
      setMeetingState("isScheduleMeeting");
      console.log(meetingState);
    } catch (error) {
      console.log("erreur lors du creation", error);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    setValues({ ...values, description: value });
  };
  const meetingLink = "meet link from backside ";
  return (
    <React.Fragment>
      <Card
        className="mt-6 w-80 p-4 bg-purple-700 text-white cursor-pointer hover:opacity-70"
        onClick={handleClickOpen}
      >
        <div className="flex-center glassmorphism size-12 rounded-[10px]">
          <FaMagento size={30} color="white" />
        </div>
        <CardBody>
          <Typography
            variant="h5"
            color="blue-gray"
            className="mb-2 text-2xl font-bold"
          >
            Schedule Meeting
          </Typography>
          <Typography className="text-lg font-normal">
            Plan your Meeting
          </Typography>
        </CardBody>
      </Card>
      {!callDetails ? (
        <Dialog
          open={open}
          onClose={handleClose}
          fullWidth
          sx={{ height: "100vh" }}
        >
          <form onSubmit={createMeeting}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <div className="flex flex-col gap-6">
                {loading && <LoadingSpinner />}
                <div className="flex flex-col gap-2.5">
                  <label className="text-base font-normal leading-[22.4px] text-sky-2">
                    Add a description
                  </label>
                  <TextField
                    className="border-none bg-cyan-700 focus-visible:ring-0 focus-visible:ring-offset-0"
                    onChange={handleChange}
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
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="submit">Subscribe</Button>
            </DialogActions>
          </form>
        </Dialog>
      ) : (
        <Dialog
          open={meetingState === "isScheduleMeeting"}
          onClose={() => {
            handleClose();
            
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle>Meeting Link</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Meeting created successfully
             <p>Meeting Link: {meetingLink}</p>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                navigator.clipboard.writeText(meetingLink);
                setCallDetails(undefined);
                setMeetingState(undefined);
              }}
            >
              Copy Meeting Link
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}
