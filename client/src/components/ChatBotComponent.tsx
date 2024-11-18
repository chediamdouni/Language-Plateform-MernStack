import React, { useState } from "react";
import person from "../assets/images/default.png";

const ChatbotComponent = () => {
  const [userMessage, setUserMessage] = useState("");
  const [botResponse, setBotResponse] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { sender: "user" | "bot"; message: string }[]
  >([]);

  const suggestions = [
    "Quels cours proposez-vous ?",
    "Y a-t-il des cours adaptés aux débutants ?",
    "Comment réserver une session avec un tuteur ?",
    "Comment puis-je upgrader mon plan ?",
  ];

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    setChatHistory([...chatHistory, { sender: "user", message: userMessage }]);
    setUserMessage("");

    try {
      const response = await fetch("http://localhost:3001/chat", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { sender: "bot", message: data.response },
      ]);
    } catch (error) {
      console.error("Error communicating with the chatbot:", error);
      // Optionally add error handling in the UI
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setUserMessage(suggestion);
    handleSendMessage();
  };

  return (
    <div className="bg-gray-100 max-w-md mx-auto">
      <div className="bg-blue-500 text-white rounded-t-lg p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">Chatbot</h1>
        <img src={person} alt="Bot Avatar" className="rounded-full h-8 w-8" />
      </div>
      <div className="p-4 bg-white rounded-b-lg">
        <div className="mb-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex items-start mb-4 ${
                chat.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {chat.sender === "bot" && (
                <img
                  src={person}
                  alt="Bot Avatar"
                  className="rounded-full mr-2 h-8 w-8"
                />
              )}
              <div
                className={`p-2 rounded-lg ${
                  chat.sender === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                {chat.message}
              </div>
              {chat.sender === "user" && (
                <img
                  src={person}
                  alt="User Avatar"
                  className="rounded-full ml-2 h-8 w-8"
                />
              )}
            </div>
          ))}
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-md">
          <h2 className="font-semibold text-gray-700">Suggestions:</h2>
          <div className="flex flex-wrap gap-2 mt-2">
            {suggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="bg-gray-200 text-gray-800 rounded-full px-3 py-1 hover:bg-gray-300 transition duration-200"
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
        <div className="flex mt-4">
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500 bg-white"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-500 text-white rounded-r-md px-4 hover:bg-blue-600 transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatbotComponent;
