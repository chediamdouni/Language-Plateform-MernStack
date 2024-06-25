import React from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { Loader } from "lucide-react";
import axios from "axios";
import { Button } from "@material-tailwind/react";
import { Box, Modal, Typography } from "@mui/material";

interface Request {
  _id: string;
  user_id: string;
  tutor_id: string;
  tutor_name: string;
  meeting_time: Date;
}

const RequestsList = () => {
  const { user } = useContext(AuthContext);
  const [requests, setRequests] = useState<Request[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/request/user/${user?._id}`
        );
        setRequests(response.data);
        setIsLoading(false);
      } catch (err) {
        setError("Error fetching requests");
        setIsLoading(false);
      }
    };

    fetchRequests();
  }, [user]);

  const handleOpen = (request: Request) => {
    setSelectedRequest(request);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedRequest(null);
    setOpen(false);
  };
  if (isLoading) return <Loader />;

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="text-base font-korto font-sans ">
      <p className="mb-3"> Vous avez {requests.length} leçons </p>
      {requests.length === 0 ? (
        <p>Veuillez reserver un leçon </p>
      ) : (
        <ul>
          {requests.map((request) => (
            <li key={request._id} className="border mb-3 p-2">
              <p className="flex gap-2">
                <p className="text-lime-600 font-semibold">Tutor Name:</p>{" "}
                {request.tutor_name}
              </p>
              <p className="flex gap-2">
                <p className="text-lime-600 font-semibold">Meeting Time:</p>{" "}
                {new Date(request.meeting_time).toLocaleString()}
                <Button size="sm" onClick={() => handleOpen(request)}>
                  View Details
                </Button>
              </p>
            </li>
          ))}
        </ul>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          {selectedRequest && (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                Details du cour
              </Typography>
              <Typography id="modal-description" className="mt-4 flex gap-2">
                <p className="text-lime-600 font-semibold">Tutor Name:</p>{" "}
                {selectedRequest.tutor_name}
              </Typography>
              <Typography id="modal-description" className="mt-2 flex gap-2">
                <p className="text-lime-600 font-semibold">Meeting Time: </p>
                {new Date(selectedRequest.meeting_time).toLocaleString()}
              </Typography>
              <Typography>
                <div
                  className="flex p-4 mb-4 mt-2 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                  role="alert"
                >
                  <svg
                    className="flex-shrink-0 inline w-4 h-4 me-3 mt-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                  </svg>
                  <span className="sr-only">Info</span>
                  <div className="text-md">
                    Veuillez contacter votre tuteur pour le lien meet
                  </div>
                </div>
              </Typography>
              <Button className="mt-4" onClick={handleClose}>
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default RequestsList;
