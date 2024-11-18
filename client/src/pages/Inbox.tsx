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

interface ContainerProps {
  isMobileListVisible?: boolean;
}

const ChatContainer = styled.div`
  display: flex;
  height: calc(100vh - 80px);
  width: 95%;
  margin: 20px auto;
  background-color: #ffffff;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  border-radius: 16px;
  overflow: hidden;

  @media (max-width: 768px) {
    width: 100%;
    margin: 0;
    height: 100vh;
    border-radius: 0;
  }
`;

const ChannelListContainer = styled.div<ContainerProps>`
  width: 320px;
  background-color: #f8fafc;
  border-right: 1px solid #e2e8f0;
  
  @media (max-width: 768px) {
    width: 100%;
    display: ${props => props.isMobileListVisible ? 'block' : 'none'};
  }

  /* Customizing the channel list */
  .str-chat__channel-list-messenger {
    background: transparent;
    
    &__main {
      background: transparent;
      padding: 20px 10px;
    }
  }

  /* Channel preview styling */
  .str-chat__channel-preview-messenger {
    border-radius: 12px;
    margin-bottom: 8px;
    transition: all 0.2s ease;
    
    &:hover {
      background: #e2e8f0;
    }
    
    &--active {
      background: #e2e8f0;
    }
  }
`;

const ChannelContainer = styled.div<ContainerProps>`
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  height: 100%;

  @media (max-width: 768px) {
    display: ${props => props.isMobileListVisible ? 'none' : 'flex'};
    width: 100%;
  }
`;

const CustomChannelHeader = styled(ChannelHeader)`
  background-color: #ffffff;
  border-bottom: 1px solid #e2e8f0;
  padding: 12px 20px;
  height: 70px;
  flex-shrink: 0;
  
  .str-chat__header-livestream-left--title {
    font-weight: 600;
    font-size: 1.1rem;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    height: 60px;
  }
`;

const CustomMessageList = styled(MessageList)`
  background-color: #ffffff;
  padding: 20px;
  flex: 1;
  overflow-y: auto;
  
  @media (max-width: 768px) {
    padding: 10px;
  }

  .str-chat__message-simple {
    margin: 8px 0;
    
    &__content {
      background: #f1f5f9;
      border-radius: 16px;
      padding: 12px 16px;
    }
    
    &--me {
      .str-chat__message-simple__content {
        background: #0ea5e9;
        color: white;
      }
    }
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f5f9;
  }

  &::-webkit-scrollbar-thumb {
    background: #cbd5e1;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #94a3b8;
  }
`;

const CustomMessageInput = styled(MessageInput)`
  background-color: #ffffff;
  border-top: 1px solid #e2e8f0;
  padding: 15px;
  flex-shrink: 0;
  
  @media (max-width: 768px) {
    padding: 8px;
  }

  .str-chat__input-flat {
    background: #f8fafc;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    min-height: 44px;
    max-height: 200px;
    overflow-y: auto;
    
    &:focus-within {
      border-color: #0ea5e9;
    }
  }

  .str-chat__send-button {
    background: #0ea5e9;
    border-radius: 8px;
    height: 32px;
    width: 32px;
    margin: 0 8px;
    
    &:hover {
      background: #0284c7;
    }
  }
`;

const CustomWindow = styled(Window)`
  display: flex;
  flex-direction: column;
  height: 100%;

  .str-chat__main-panel {
    height: 100%;
    display: flex;
    flex-direction: column;
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 80px);
  width: 100%;
  background-color: #f8fafc;
`;

const BackButton = styled.button`
  display: none;
  
  @media (max-width: 768px) {
    display: block;
    padding: 8px;
    background: #0ea5e9;
    color: white;
    border: none;
    border-radius: 4px;
    margin: 8px;
  }
`;

const Inbox: React.FC = () => {
  const { user, streamToken } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileListVisible, setIsMobileListVisible] = React.useState(true);

  useEffect(() => {
    if (!user) {
      console.log("user not found");
      // navigate("/");
    }
  }, [user, navigate]);

  const filters = { type: "messaging", members: { $in: [user!.id] } };
  const sort = { last_message_at: -1 };

  const chatClient = useClient({ user, streamToken });

  const toggleMobileView = () => {
    setIsMobileListVisible(!isMobileListVisible);
  };

  if (!chatClient) {
    return (
      <LoadingContainer>
        <LoadingIndicator size={40} />
      </LoadingContainer>
    );
  }

  const CustomList = (props: any) => {
    return (
      <div onClick={() => setIsMobileListVisible(false)}>
        {props.children}
      </div>
    );
  };

  return (
    <ChatContainer>
      <Chat client={chatClient} theme="str-chat__theme-light">
        <ChannelListContainer isMobileListVisible={isMobileListVisible}>
          <ChannelList 
            filters={filters} 
            sort={sort as any}
            options={{ state: true, presence: true, limit: 10 }}
            List={CustomList}
          />
        </ChannelListContainer>
        <ChannelContainer isMobileListVisible={isMobileListVisible}>
          <Channel>
            <CustomWindow>
              {!isMobileListVisible && (
                <BackButton onClick={toggleMobileView}>
                  ← Back to channels
                </BackButton>
              )}
              <CustomChannelHeader />
              <CustomMessageList />
              <CustomMessageInput />
            </CustomWindow>
            <Thread />
          </Channel>
        </ChannelContainer>
      </Chat>
    </ChatContainer>
  );
};

export default Inbox;
