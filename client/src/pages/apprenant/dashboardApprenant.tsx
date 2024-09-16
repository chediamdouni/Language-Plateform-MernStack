import React, { useContext, useEffect, useState } from "react";
import { MdPerson, MdSearch, MdChat } from "react-icons/md";
import ApprenantLayout from "src/layouts/ApprenantLayout";
import { AuthContext } from "src/Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

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
import FooterWithLogo from "../../components/footer";
interface Tutor {
  _id: string;
  username: string;
  profileImage: string;
  verified: string;
  language: string;
  aboutMe: string;
  country: string;
  email: string;
  experience: number;
  certificate: string;
}

const apiUrl = process.env.REACT_APP_API_URL;

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

  useEffect(() => {
    if (!isSignedIn) {
      navigate("/apprenant/connexion");
    }
  }, [isSignedIn, navigate]);

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
    setSelectedTutor({ _id: tutorId, username: tutorName });
    setShowChat(true);
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

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        const response = await axios.get(`${apiUrl}/tuteur/`);
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <ApprenantLayout>
      <motion.div
        className="font-korto font-sans bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen p-4 sm:p-6 lg:p-8"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1
          className="font-bold text-3xl mb-6 text-indigo-900"
          variants={itemVariants}
        >
          Trouvez votre tuteur idéal
        </motion.h1>

        <motion.div className="relative mb-8" variants={itemVariants}>
          <input
            type="search"
            className="w-full p-3 pl-10 text-base text-gray-900 border-none rounded-full bg-white shadow-md focus:ring-2 focus:ring-indigo-500 transition duration-300"
            placeholder="Rechercher un tuteur, une langue, un pays..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <MdSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-xl text-gray-400" />
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
        >
          {searchResults.map((tutor) => (
            <motion.div
              key={tutor._id}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
              variants={itemVariants}
            >
              <div className="relative h-40">
                <img
                  src={`http://localhost:5000/${tutor?.profileImage}`}
                  alt={`${tutor.username}'s Profile`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-3">
                  <h3 className="text-lg font-bold text-white">
                    {tutor.username}
                  </h3>
                  <p className="text-xs text-gray-300">{tutor.language}</p>
                </div>
              </div>

              <div className="p-3 space-y-1">
                <p className="text-xs text-gray-600">{tutor.country}</p>
                <p className="text-xs text-gray-800 line-clamp-2">
                  {tutor.aboutMe}
                </p>
                <div className="flex items-center space-x-1">
                  <span className="text-yellow-500 text-xs">★</span>
                  <span className="text-xs font-medium">
                    {tutor.experience} ans d'expérience
                  </span>
                </div>
              </div>

              <div className="px-3 pb-3 flex flex-col space-y-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-1.5 px-3 rounded-md text-sm transition-colors duration-300"
                  onClick={() => handleSelectTutor(tutor._id)}
                >
                  Réserver une leçon
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-1.5 px-3 rounded-md text-sm transition-colors duration-300 flex items-center justify-center"
                  onClick={() =>
                    handleSelectTutorChat(tutor._id, tutor.username)
                  }
                >
                  <MdChat className="mr-1 text-sm" /> Contacter
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <Modal
        open={showChat}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="fixed inset-4 sm:inset-6 md:inset-10 bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col"
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
        </motion.div>
      </Modal>
      <FooterWithLogo />
    </ApprenantLayout>
  );
};

export default DashboardApprenant;
