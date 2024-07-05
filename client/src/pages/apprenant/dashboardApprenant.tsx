import React, { useContext, useEffect, useState } from "react";
import { MdPerson } from "react-icons/md";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import { AuthContext } from "src/Context/AuthContext";
import { PiStudentDuotone } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { Bounce, toast } from "react-toastify";
import axios from "axios";
import { useClient } from "src/hooks/useStreamClient";
import {
  ChannelHeader,
  Chat,
  MessageInput,
  MessageList,
  Channel,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { StreamChat, Channel as StreamChannel } from "stream-chat";
import { Box, Modal } from "@mui/material";
import person from "../../assets/images/person1.jpg";
interface Tutor {
  _id: string;
  username: string;
  verified: string;
  language: string;
  aboutMe: string;
  country: string;
  email: string;
  experience: number;
  certificate: string;
}

const DashboardApprenant: React.FC = () => {
  const navigate = useNavigate();
  const { user, isSignedIn, streamToken } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Tutor[]>([]);
  const [showChat, setShowChat] = useState(false);
  const [channel, setChannel] = useState<StreamChannel | null>(null);
  const chatClient = useClient({ user, streamToken });
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [selectedTutor, setSelectedTutor] = useState<{
    _id: string;
    username: string;
  } | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchQuery(query);
    const results = searchTutors(query);
    setSearchResults(results);
  };
  const handleClose = () => {
    setShowChat(false);
    setSelectedTutor(null);
  };

  const handleSelectTutor = (tutorId: string) => {
    navigate(`/apprenant/tuteur/${tutorId}`);
  };

  const handleSelectTutorChat = (tutorId: string, tutorName: string) => {
    // console.log("handleSelectTutorChat called", tutorId, tutorName);
    setSelectedTutor({ _id: tutorId, username: tutorName });
    setShowChat(true);
    // navigate("/inbox", {
    //   state: { selectedTutor: { _id: tutorId, username: tutorName } },
    // });
  };

  const searchTutors = (query: string): Tutor[] => {
    const normalizedQuery = query.toLowerCase().trim();
    return tutors.filter(
      (tutor) =>
        tutor.username.toLowerCase().includes(normalizedQuery) ||
        tutor.language.toLowerCase().includes(normalizedQuery) ||
        tutor.country.toLowerCase().includes(normalizedQuery)
    );
  };

  // Display tutors
  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/tuteur/");
        console.log(response);
        setTutors(response.data.tuteurs);
        setSearchResults(response.data.tuteurs);
      } catch (err) {
        console.error("Error fetching tutors:", err);
      }
    };
    fetchTutors();
  }, []);

  useEffect(() => {
    if (user && chatClient && selectedTutor) {
      console.log("Channel users ", user.id, selectedTutor._id);
      const channel = chatClient.channel(
        "messaging",
        `${user.id}_${selectedTutor._id}`,
        {
          name: user.username,
          members: [user.id, selectedTutor._id],
        }
      );
      setChannel(channel);
    }
  }, [user, chatClient, selectedTutor]);

  return (
    <ApprenantLayout>
      <div className="mt-4 mx-10 p-5 font-korto font-sans">
        <div className="font-bold text-xl">
          Trouver des professeurs en ligne pour des cours particuliers
        </div>
        <div>
          <form className="max-w-full mt-5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Rechercher un tuteur..."
                value={searchQuery}
                onChange={handleSearchChange}
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-4 h-4 text-white-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className="mt-6 p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {searchResults.map((tutor) => (
              <div
                key={tutor._id}
                className="bg-white rounded-lg border overflow-hidden flex flex-col shadow-lg "
              >
                <div className="flex items-center">
                  <img
                    src={person}
                    alt="tuteur Profile"
                    className="w-30 h-20 mr-3 rounded-br-lg"
                  />
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {tutor.username}
                  </h3>
                </div>

                <div className="w-full p-4">
                  <div className="flex flex-col">
                    <div className="space-y-2 py-5">
                      <div className="flex gap-1 items-center">
                        <PiStudentDuotone />
                        <div className="text-base font-thin capitalize">
                          {tutor.language}
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        {" "}
                        <MdPerson />
                        <div className="font-thin text-gray-500">
                          12 active students • 6 lessons
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 32 32"
                        >
                          <rect
                            x="1"
                            y="4"
                            width="30"
                            height="24"
                            rx="4"
                            ry="4"
                            fill="#d52e23"
                          ></rect>
                          <path
                            d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z"
                            opacity=".15"
                          ></path>
                          <path
                            d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z"
                            fill="#fff"
                            opacity=".2"
                          ></path>
                          <path
                            d="M16,10c-3.314,0-6,2.686-6,6s2.686,6,6,6,6-2.686,6-6-2.686-6-6-6Zm3.384,7.587l-1.865-.606-1.153,1.587v-1.962l-1.866-.606,1.866-.606v-1.962l1.153,1.587,1.865-.606-1.153,1.587,1.153,1.587Zm-2.184-5.187c-1.988,0-3.6,1.612-3.6,3.6s1.612,3.6,3.6,3.6c.941,0,1.797-.361,2.438-.951-.818,1.122-2.143,1.851-3.638,1.851-2.485,0-4.5-2.015-4.5-4.5s2.015-4.5,4.5-4.5c1.495,0,2.82,.729,3.638,1.851-.641-.591-1.497-.951-2.438-.951Z"
                            fill="#fff"
                          ></path>
                        </svg>
                        <div className="capitalize font-thin text-gray-500">
                          {tutor.country}
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <PiStudentDuotone />
                        <div className="text-base font-thin">
                          {tutor.aboutMe} About me Description
                        </div>
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="text-gray-500 dark:text-gray-400 mb-4">
                          <p>Matieres: {tutor.country}</p>
                        </div>
                      </div>
                    </div>
                    <div className="gap-4 flex items-center">
                      {" "}
                      <button
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        onClick={() => handleSelectTutor(tutor._id)}
                      >
                        Leçon d'essaie
                      </button>
                      <button
                        className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        onClick={() =>
                          handleSelectTutorChat(tutor._id, tutor.username)
                        }
                      >
                        <svg
                          width="20px"
                          height="20px"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            opacity="0.15"
                            d="M3.00003 11.5C2.99659 12.8199 3.30496 14.1219 3.90003 15.3C4.6056 16.7118 5.69028 17.8992 7.03258 18.7293C8.37488 19.5594 9.92179 19.9994 11.5 20C12.8199 20.0035 14.1219 19.6951 15.3 19.1L21 21L19.1 15.3C19.6951 14.1219 20.0035 12.8199 20 11.5C19.9994 9.92179 19.5594 8.37488 18.7293 7.03258C17.8992 5.69028 16.7118 4.6056 15.3 3.90003C14.1219 3.30496 12.8199 2.99659 11.5 3.00003H11C8.91568 3.11502 6.94699 3.99479 5.47089 5.47089C3.99479 6.94699 3.11502 8.91568 3.00003 11V11.5Z"
                            fill="#000000"
                          />
                          <path
                            d="M8 9.5H15M8 13.5H13M15.3 19.1L21 21L19.1 15.3C19.1 15.3 20 14 20 11.5C20 6.80558 16.1944 3 11.5 3C6.80558 3 3 6.80558 3 11.5C3 16.1944 6.80558 20 11.5 20C14.0847 20 15.3 19.1 15.3 19.1Z"
                            stroke="#000000"
                            stroke-width="1.5"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Modal
            open={showChat}
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
                width: 600, // width of the modal
                minHeight: 400, // minimum height of the modal
                maxHeight: "90vh", // maximum height of the modal
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                overflowY: "auto", // allow modal content to scroll
              }}
            >
              {showChat && chatClient && channel && (
                <Chat client={chatClient} theme="str-chat__theme-light">
                  <Channel channel={channel}>
                    <Window>
                      <ChannelHeader />
                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              )}
            </Box>
          </Modal>
        </div>
      </div>
    </ApprenantLayout>
  );
};
export default DashboardApprenant;
