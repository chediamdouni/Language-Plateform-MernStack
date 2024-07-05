import React, { ErrorInfo } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useContext, useEffect, useState } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import axios from "axios";

interface Request {
  _id: string;
  user_name: string;
  meeting_time: string;
}

const fetchRequests = async (tutorId: string) => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/request/tutor/${tutorId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch requests");
  }
};

const deleteRequest = async (requestId: string) => {
  try {
    const response = await axios.delete(
      `http://localhost:5000/api/request/delete/${requestId}`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to delete request");
  }
};

const TuteurRequest = () => {
  const { user } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [requests, setRequests] = useState<Request[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        setIsLoading(true);
        setError(null);
        try {
          const fetchedRequests = await fetchRequests(user.id);
          setRequests(fetchedRequests);
        } catch (error: any) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [user]);

  const handleDeleteClick = (requestId: string) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete this request?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            try {
              const response = await deleteRequest(requestId);

              setRequests((prevRequests) =>
                prevRequests.filter((request) => request._id !== requestId)
              );
            } catch (error) {
              console.error("Error deleting request:", error);
              setError("Failed to delete request");
            }
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <div id="Requests" className="bg-white shadow-xl p-8 mt-5">
      <h2 className="text-2xl font-bold my-4">Les Demandes de Cours </h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading requests: {error}</p>
      ) : (
        <div className="relative overflow-x-auto p-3">
          {requests ? (
            <table className="w-full shadow-xl text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-6 py-3">Apprenant Name</th>
                  <th className="px-6 py-3">Meeting Date</th>
                  <th className="px-6 py-3">Meeting Time</th>
                  <th className="px-6 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request) => (
                  <tr
                    key={request._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <strong>{request.user_name}</strong>
                    </td>
                    <td className="px-6 py-4">
                      <strong>
                        {new Date(request.meeting_time).toLocaleDateString()}
                      </strong>
                    </td>
                    <td className="px-6 py-4">
                      <strong>
                        {new Date(request.meeting_time).toLocaleTimeString()}
                      </strong>
                    </td>
                    <td className="px-6 py-4">
                      <div onClick={() => handleDeleteClick(request._id)}>
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.15"
                            d="M8 16H12L18 10L14 6L8 12V16Z"
                            fill="#000000"
                          />
                          <path
                            d="M14 6L8 12V16H12L18 10M14 6L17 3L21 7L18 10M14 6L18 10M10 4L4 4L4 20L20 20V14"
                            stroke="#000000"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No requests found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TuteurRequest;
