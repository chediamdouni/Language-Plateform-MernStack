import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "src/Context/AuthContext";
import { useClient } from "src/hooks/useStreamClient";
import {
  Channel,
  ChannelHeader,
  ChannelList,
  Chat,
  LoadingIndicator,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";
import "stream-chat-react/dist/css/v2/index.css";
import { StreamChat, Channel as StreamChannel } from "stream-chat";
import { Box, Button, Modal } from "@mui/material";

const Inbox: React.FC = () => {
  const { user, streamToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [channel, setChannel] = useState<StreamChannel | null>(null);

  useEffect(() => {
    if (!user) {
      //   navigate("/");
      console.log("user not found ");
    }
  }, [user, navigate]);

  const filters = { type: "messaging", members: { $in: [user!.id] } };
  const sort = { last_message_at: -1 };

  const chatClient = useClient({ user, streamToken });

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  const 
  const handleCreateNewChat = async () => {
    
    const memberIds = [user!.id, "other-user-id"]; 
    const channel = chatClient.channel("messaging", {
      members: memberIds,
    });

    await channel.create();
    setChannel(channel);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setChannel(null);
  };

  return (
    <div className="flex w-5/6 justify-center ">
      <Chat client={chatClient} theme="str-chat__theme-light">
        <ChannelList filters={filters} sort={sort as any} />
        <Channel>
          <Window>
            <ChannelHeader />
            <MessageList />
            <MessageInput />
          </Window>
          <Thread />
        </Channel>
      </Chat>
      <Button onClick={handleCreateNewChat}>Create New Chat</Button>
      <Modal
        open={showModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 600,
            minHeight: 400,
            maxHeight: "90vh",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          {showModal && chatClient && channel && (
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
  );
};

export default Inbox;
