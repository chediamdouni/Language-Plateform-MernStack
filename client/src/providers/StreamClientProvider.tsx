import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "src/Context/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";

const apiKey = "8db3m4j9z344";
const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, loading, streamToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Loading:", loading);
    console.log("User:", user);

    if (loading) return;
    if (!user) {
      console.log("y a pas d'utulisateur");
      navigate("/apprenant/connexion");
      return;
    }
    if (!apiKey) throw new Error("Stream API Key is Missing");
    if (!user.id) {
      console.error("User ID is missing");
      return;
    }
    if (!streamToken) {
      console.error("Stream token is missing");
      return;
    }
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?.id,
        name: user?.username || user?.id,
        image: user?.profileImageUrl,
      },
      token: streamToken,
    });

    setVideoClient(client);
  }, [user, loading, navigate]);

  if (loading || !videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
