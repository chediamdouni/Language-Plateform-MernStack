import React, { ReactNode } from "react";
import Chatbot from "react-chatbot-kit";
import "react-chatbot-kit/build/main.css";

const config = {
  initialMessages: [
    {
      id: 1,
      message:
        "Bonjour ! Comment puis-je vous aider à comprendre notre application ?",
      type: "bot",
    },
  ],
  botName: "Assistant Apprenant",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#376B7E",
    },
    chatButton: {
      backgroundColor: "#5ccc9d",
    },
  },
};
interface MessageParserProps {
  children: ReactNode;
  actions: {
    handleCours: () => void;
    handleTuteur: () => void;
    handleSubscription: () => void;
    handlePopularSubscription: () => void;
    handleDefault: () => void;
  };
}
interface ActionProviderProps {
  createChatBotMessage: (message: string) => any;
  setState: React.Dispatch<React.SetStateAction<any>>;
  children: ReactNode;
}

const MessageParser: React.FC<MessageParserProps> = ({ children, actions }) => {
  const parse = (message: string) => {
    const lowerCaseMessage = message.toLowerCase();
    if (lowerCaseMessage.includes("cours")) {
      actions.handleCours();
    } else if (lowerCaseMessage.includes("tuteur")) {
      actions.handleTuteur();
    } else if (
      lowerCaseMessage.includes("abonnement") ||
      lowerCaseMessage.includes("subscription")
    ) {
      actions.handleSubscription();
    } else if (
      lowerCaseMessage.includes("populaire") ||
      lowerCaseMessage.includes("popular")
    ) {
      actions.handlePopularSubscription();
    } else {
      actions.handleDefault();
    }
  };

  return (
    <>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          parse: parse,
          actions,
        });
      })}
    </>
  );
};

const ActionProvider: React.FC<ActionProviderProps> = ({
  createChatBotMessage,
  setState,
  children,
}) => {
  const handleCours = () => {
    const botMessage = createChatBotMessage(
      "Les cours sont accessibles depuis la page 'Cours'. Vous pouvez y trouver différents supports et matériels pédagogiques."
    );
    setState((prev: { messages: any[] }) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handleTuteur = () => {
    const botMessage = createChatBotMessage(
      "Vous pouvez trouver des tuteurs qualifiés sur la page 'Tuteurs'. Chaque tuteur a un profil détaillé avec ses compétences et disponibilités."
    );
    setState((prev: { messages: any[] }) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleSubscription = () => {
    const botMessage = createChatBotMessage(
      "Nous proposons plusieurs types d'abonnements : Basique, Premium, et Pro. Chaque abonnement offre différents niveaux d'accès aux cours et aux tuteurs. Quel type d'abonnement vous intéresse ?"
    );
    setState((prev: { messages: any[] }) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  const handlePopularSubscription = () => {
    const botMessage = createChatBotMessage(
      "Notre abonnement le plus populaire est le Premium. Il offre un excellent équilibre entre l'accès aux cours, le temps avec les tuteurs, et le prix. C'est le choix préféré de la plupart de nos apprenants."
    );
    setState((prev: { messages: any[] }) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };
  const handleDefault = () => {
    const botMessage = createChatBotMessage(
      "Je suis désolé, je n'ai pas compris votre question. Pouvez-vous reformuler ou demander des informations sur les cours ou les tuteurs ?"
    );
    setState((prev: { messages: any[] }) => ({
      ...prev,
      messages: [...prev.messages, botMessage],
    }));
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child as React.ReactElement, {
          actions: {
            handleCours,
            handleTuteur,
            handleSubscription,
            handlePopularSubscription,
            handleDefault,
          },
        });
      })}
    </div>
  );
};

const ApprenantChatbot = () => {
  return (
    <div className="chatbot-container">
      <Chatbot
        config={config}
        messageParser={MessageParser}
        actionProvider={ActionProvider}
      />
    </div>
  );
};

export default ApprenantChatbot;
