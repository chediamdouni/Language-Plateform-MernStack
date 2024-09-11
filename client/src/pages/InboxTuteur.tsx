import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import {
  LoadingIndicator,
  Chat,
  ChannelList,
  Channel,
  Window,
  MessageInput,
  MessageList,
  ChannelHeader,
  ChannelListMessengerProps,
  useChatContext,
} from "stream-chat-react";

import { AuthContext } from "src/Context/AuthContext";
import { useClient } from "src/hooks/useStreamClient";
import { Button } from "@material-tailwind/react";

export function InboxTuteur() {
  const { user, streamToken } = useContext(AuthContext);

  const chatClient = useClient({ user, streamToken });

  if (chatClient == null) return <LoadingIndicator />;

  return (
    <Chat client={chatClient}>
      <ChannelList
        List={Channels}
        sendChannelsToList
        filters={{ members: { $in: [user!.id] } }}
      />
      <Channel>
        <Window>
          <ChannelHeader />
          <MessageList />
          <MessageInput />
        </Window>
      </Channel>
    </Chat>
  );
}

function Channels({ loadedChannels }: ChannelListMessengerProps) {
  const navigate = useNavigate();
  const { handleSignout } = useContext(AuthContext);
  const { setActiveChannel, channel: activeChannel } = useChatContext();

  return (
    <div className="w-60 flex flex-col gap-4 m-3 h-full">
      <Button onClick={() => navigate("/channel/new")}>New Conversation</Button>
      <hr className="border-gray-500" />
      {loadedChannels != null && loadedChannels.length > 0
        ? loadedChannels.map((channel) => {
            const isActive = channel === activeChannel;
            const extraClasses = isActive
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100 bg-gray-100";
            return (
              <button
                onClick={() => setActiveChannel(channel)}
                disabled={isActive}
                className={`p-4 rounded-lg flex gap-3 items-center ${extraClasses}`}
                key={channel.id}
              >
                {channel.data?.image && (
                  <img
                    src={channel.data.image}
                    className="w-10 h-10 rounded-full object-center object-cover"
                  />
                )}
                <div className="text-ellipsis overflow-hidden whitespace-nowrap">
                  {channel.data?.name || channel.id}
                </div>
              </button>
            );
          })
        : "No Conversations"}
      <hr className="border-gray-500 mt-auto" />
      <Button onClick={() => handleSignout()}>Logout</Button>
    </div>
  );
}
