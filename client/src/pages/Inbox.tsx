import React, { useContext, useEffect } from "react";
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
import styled from "styled-components";

const ChatContainer = styled.div`
  display: flex;
  height: calc(100vh - 64px);
  width: 100%;
  background-color: #f5f7f9;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  overflow: hidden;
`;

const ChannelListContainer = styled.div`
  width: 300px;
  background-color: #ffffff;
  border-right: 1px solid #e0e0e0;
`;

const ChannelContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const CustomChannelHeader = styled(ChannelHeader)`
  background-color: #ffffff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const CustomMessageList = styled(MessageList)`
  background-color: #f9f9f9;
`;

const CustomMessageInput = styled(MessageInput)`
  background-color: #ffffff;
  border-top: 1px solid #e0e0e0;
`;

const Inbox: React.FC = () => {
  const { user, streamToken } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      console.log("user not found");
      // navigate("/");
    }
  }, [user, navigate]);

  const filters = { type: "messaging", members: { $in: [user!.id] } };
  const sort = { last_message_at: -1 };

  const chatClient = useClient({ user, streamToken });

  if (!chatClient) {
    return <LoadingIndicator />;
  }

  return (
    <ChatContainer>
      <Chat client={chatClient} theme="str-chat__theme-light">
        <ChannelListContainer>
          <ChannelList filters={filters} sort={sort as any} />
        </ChannelListContainer>
        <ChannelContainer>
          <Channel>
            <Window>
              <CustomChannelHeader />
              <CustomMessageList />
              <CustomMessageInput />
            </Window>
            <Thread />
          </Channel>
        </ChannelContainer>
      </Chat>
    </ChatContainer>
  );
};

export default Inbox;
