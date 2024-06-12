import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader } from "lucide-react";
import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "src/Context/AuthContext";
import React from "react";
import { useNavigate } from "react-router-dom";

const apiKey = "mmhfdzb5evj2";
const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const { user, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  const tokenProvider = async () => {
    const { token } = await fetch(
      "https://pronto.getstream.io/api/auth/create-token?" +
        new URLSearchParams({
          api_key: apiKey,
          user_id: user?._id || "",
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
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user?._id,
        name: user?.username || user?._id,
        image: user?.profileImageUrl,
      },
      tokenProvider,
    });

    setVideoClient(client);
  }, [user, loading, navigate]);

  if (loading || !videoClient) return <Loader />;

  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider;
