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
const apiUrl = process.env.REACT_APP_API_URL;

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
        const response = await axios.get(`${apiUrl}/request/user/${user?.id}`);
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
    <div className="text-base font-korto font-sans">
      <p className="mb-3">Vous avez {requests.length} leçons</p>
      {requests.length === 0 ? (
        <p>Veuillez réserver une leçon</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((request) => (
            <li
              key={request._id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lime-600 font-semibold">Tutor Name:</p>
                  <p>{request.tutor_name}</p>
                </div>
                <Button
                  size="sm"
                  color="blue"
                  onClick={() => handleOpen(request)}
                >
                  View Details
                </Button>
              </div>
              <div className="mt-2">
                <p className="text-lime-600 font-semibold">Meeting Time:</p>
                <p>{new Date(request.meeting_time).toLocaleString()}</p>
              </div>
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
            borderRadius: 2,
          }}
        >
          {selectedRequest && (
            <>
              <Typography id="modal-title" variant="h6" component="h2">
                Détails du cours
              </Typography>
              <Typography id="modal-description" className="mt-4">
                <span className="text-lime-600 font-semibold">Tutor Name:</span>{" "}
                {selectedRequest.tutor_name}
              </Typography>
              <Typography id="modal-description" className="mt-2">
                <span className="text-lime-600 font-semibold">
                  Meeting Time:
                </span>{" "}
                {new Date(selectedRequest.meeting_time).toLocaleString()}
              </Typography>
              <div
                className="flex p-4 mb-4 mt-2 text-sm text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
                role="alert"
              >
                <svg
                  className="flex-shrink-0 inline w-4 h-4 mr-3 mt-1"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <div className="text-md">
                  Veuillez contacter votre tuteur pour le lien meet
                </div>
              </div>
              <Button
                className="mt-4 bg-blue-600 text-white hover:bg-blue-700 transition duration-300 ease-in-out"
                onClick={handleClose}
              >
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
