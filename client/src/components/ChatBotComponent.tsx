import React, { useState } from "react";
import axios from "axios";

const ChatbotComponent = () => {
  const [userMessage, setUserMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");

  const handleSendMessage = async () => {
    try {
      const response = await axios.post("http://localhost:8000/chat", {
        message: userMessage,
      });
      setBotResponse(response.data.response);
    } catch (error) {
      console.error("Error communicating with the chatbot:", error);
    }
  };

  return (
    <div className="bg-gray-100 rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">
        Chatbot
      </h1>
      <div className="flex mb-4">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white rounded-r-md px-4 hover:bg-blue-600 transition duration-200"
        >
          Send
        </button>
      </div>
      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
        <h2 className="font-semibold text-gray-700">Bot Response:</h2>
        <p className="text-gray-800">{botResponse}</p>
      </div>
    </div>
  );
};

export default ChatbotComponent;
