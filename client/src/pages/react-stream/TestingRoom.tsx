import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { FaMagento } from "react-icons/fa";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import LoadingSpinner from "../../components/LoadingSpinner";
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
//import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { Card, CardBody, Spinner, Typography } from "@material-tailwind/react";
import { AuthContext } from "src/Context/AuthContext";
import { useGetCalls } from "src/hooks/useGetCalls";
import axios from "axios";
import { toast } from "react-toastify";

const initialValues = {
  dateTime: new Date(),
  description: "",
  link: "",
};

interface UpcomingCall {
  upcoming_meeting_id: string;
  user_id: string;
  meeting_time: string;
  meeting_description: string;
  meeting_url: string;
}

const callId = "default_86cc4d89-c08f-41d6-8328-da13e535cb3e";
const user_id = "csb-user";
const user = { id: user_id };
const apiKey = "mmhfdzb5evj2";

export default function TestingRoom() {
  const navigate = useNavigate();
  const { user, isSignedIn } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const { upcomingCalls } = useGetCalls();
  const client = useStreamVideoClient();
  // const [meetingLink, setMeetingLink] = useState<string>("");
  console.log("Client", client);
  const [values, setValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [callDetails, setCallDetails] = useState<Call>();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isMeetingCreated" | "isInstantMeeting" | undefined
  >(undefined);

  if (!isSignedIn) {
    console.log("aaaaa mahoush connecter ");
    return <Navigate to="/" />;
  }

  const handleClickOpen = (
    meetingType: "isScheduleMeeting" | "isInstantMeeting"
  ) => {
    console.log("handleClickOpen triggered");
    setOpen(true);
    setMeetingState(meetingType);
  };

  const handleClose = () => {
    console.log("close");
    setOpen(false);
    setMeetingState(undefined);
  };

  const createMeeting = async (event: React.FormEvent<HTMLFormElement>) => {

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

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      let UpcomingCalls: UpcomingCall[] = [];

      if (upcomingCalls) {
        upcomingCalls.forEach((call) => {
          const upcoming_meeting_id = call.id;
          const user_id = call.currentUserId || "";
          const meeting_time = startsAt;
          const meeting_description = description;
          const meeting_url = `http://localhost:3000/meeting/${call.id}`;
          UpcomingCalls.push({
            upcoming_meeting_id,
            user_id,
            meeting_time,
            meeting_description,
            meeting_url,
          });
        });
      }
      
      console.log("Upcoming calls data:", UpcomingCalls); // Debugging line

      try {
        setLoading(true);
        const response = await axios.post(
          "http://localhost:5000/api/meet/upcoming",
          UpcomingCalls
        );

        console.log("Server response:", response);

        if (!response) {
          throw new Error("Failed to create new meeting");
        }

        setCallDetails(call);

        if (!values.description) {
          navigate(`/meeting/${call.id}`);
        }
        toast("🦄 Meeting Created", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setLoading(false);
      } catch (error) {
        console.error("Error creating meeting:", error);
      }
    } catch (error) {
      console.log("erreur lors du creation", error);
      toast("🦄 Failed to create a meeting", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  // console.log(callDetails);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    setValues({ ...values, description: value });
  };

  console.log(values)
  const meetingLink = `http://localhost:3000/meeting/${callDetails?.id}`;

  return (
    <>
      <Card
        className="mt-6 w-80 p-4 bg-purple-700 text-white cursor-pointer hover:opacity-70"
        onClick={() => handleClickOpen("isScheduleMeeting")}
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
          open={meetingState === "isScheduleMeeting"}
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
            <DialogContentText>Meeting created successfully</DialogContentText>
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
      <Card
        className="mt-6 w-80 p-4 bg-purple-700 text-white cursor-pointer hover:opacity-70"
        onClick={() => handleClickOpen("isInstantMeeting")}
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
            Start an Instant Meeting
          </Typography>
          <Typography className="text-lg font-normal">
            Plan your Meeting
          </Typography>
        </CardBody>
      </Card>
      <Dialog
        open={meetingState === "isInstantMeeting"}
        onClose={handleClose}
        fullWidth
        sx={{ height: "100vh" }}
      >
        <form onSubmit={createMeeting}>
          <DialogTitle>Start Instant Meeting</DialogTitle>
          <DialogContent></DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Start Meeting</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
