import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "src/Context/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";
import { StreamChat } from "stream-chat";
import { Chat, useCreateChatClient } from "stream-chat-react";

const apiKey = "8db3m4j9z344";
const ChatClientProvider = ({ children }: { children: ReactNode }) => {
  const [chatClient, setChatClient] = useState<StreamChat>();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const tokenProvider = async () => {
    const { token } = await fetch(
      "https://pronto.getstream.io/api/auth/create-token?" +
        new URLSearchParams({
          api_key: apiKey,
          user_id: user?.id || "",
        })
    ).then((res) => res.json());
    return token as string;
  };

  useEffect(() => {
    console.log("Loading:", loading);
    console.log("User:", user);

    if (loading) return;
    if (!user) {
      console.log("y a pas d'utulisateur");
      navigate("/");
      return;
    }
    if (!apiKey) throw new Error("Stream API Key is Missing");
    const client = useCreateChatClient({
      apiKey,
      userData: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.profileImageUrl,
      },
      tokenOrProvider: tokenProvider,
    });

    setChatClient(client!);
  }, [user, loading, navigate]);

  if (loading || !chatClient) return <Loader />;

  return <Chat client={chatClient}>{children}</Chat>;
};

export default ChatClientProvider;
