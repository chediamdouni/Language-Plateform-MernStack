import { useEffect, useState } from "react";
import { StreamChat } from "stream-chat";

interface User {
  id: string;
  username?: string;
  image?: string;
  [key: string]: any;
}

interface UseClientProps {
  user: User | null;
  streamToken: string | null;
}

export const useClient = ({
  user,
  streamToken,
}: UseClientProps): StreamChat | undefined => {
  const [chatClient, setChatClient] = useState<StreamChat>();
  const apiKey = "8db3m4j9z344";

  useEffect(() => {
    if (user && streamToken) {
      const client = new StreamChat(apiKey);
      
      // prevents application from setting stale client (user changed, for example)
      let didUserConnectInterrupt = false;

      const connectionPromise = client
        .connectUser(user, streamToken)
        .then(() => {
          if (!didUserConnectInterrupt) {
            setChatClient(client);
            console.log("User connected");
          }
        })
        .catch((err) => {
          console.error("Error connecting user:", err);
        });

      return () => {
        didUserConnectInterrupt = true;
        setChatClient(undefined);
        connectionPromise.finally(() => {
          client
            .disconnectUser()
            .then(() => {
              console.log("Connection closed");
            })
            .catch((err) => {
              console.error("Error disconnecting user:", err);
            });
        });
      };
    }
  }, [apiKey, user, streamToken]);

  return chatClient;
};
