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
    <div id="Requests" className="bg-gray-800 rounded-lg shadow-2xl p-6 mt-5">
      <h2 className="text-2xl font-bold mb-6 text-gray-100">
        Demandes de Cours
      </h2>
      {isLoading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <p className="text-red-400">
          Erreur lors du chargement des demandes : {error}
        </p>
      ) : (
        <div className="overflow-x-auto">
          {requests && requests.length > 0 ? (
            <table className="w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-gray-700 text-gray-400">
                <tr>
                  <th className="px-6 py-3 rounded-tl-lg">
                    Nom de l'Apprenant
                  </th>
                  <th className="px-6 py-3">Date du Rendez-vous</th>
                  <th className="px-6 py-3">Heure du Rendez-vous</th>
                  <th className="px-6 py-3 rounded-tr-lg">Actions</th>
                </tr>
              </thead>
              <tbody>
                {requests.map((request, index) => (
                  <tr
                    key={request._id}
                    className="bg-gray-800 border-b border-gray-700 hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 font-medium whitespace-nowrap">
                      {request.user_name}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(request.meeting_time).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(request.meeting_time).toLocaleTimeString()}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteClick(request._id)}
                        className="text-red-400 hover:text-red-600 transition-colors duration-200"
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M10 11V16M14 11V16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-400 text-center py-4">
              Aucune demande trouvée.
            </p>
          )}
        </div>
      )}
    </div>
  );
};
export default TuteurRequest;
