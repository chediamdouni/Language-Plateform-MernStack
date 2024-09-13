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
    <div>
      <h1>Chatbot</h1>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage}>Send</button>
      <div>
        <h2>Bot Response:</h2>
        <p>{botResponse}</p>
      </div>
    </div>
  );
};

export default ChatbotComponent;
