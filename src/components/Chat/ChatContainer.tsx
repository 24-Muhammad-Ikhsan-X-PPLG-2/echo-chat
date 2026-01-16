"use client";

import { type Chat, Message } from "@/type/db";
import { Dispatch, FC, RefObject, SetStateAction } from "react";
import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageComposer from "./MessageComposer";

interface ChatContainerProps {
  chat: Chat;
  messages: Message[];
  onOpenSidebar: () => void;
  senderId: string;
  setMessages: Dispatch<SetStateAction<Message[]>>;
  userId: string;
  isInitialLoad: RefObject<boolean>;
}

const ChatContainer: FC<ChatContainerProps> = ({
  chat,
  messages,
  onOpenSidebar,
  senderId,
  setMessages,
  userId,
  isInitialLoad,
}) => {
  return (
    <div className="flex-1 flex flex-col h-screen bg-white dark:bg-gray-900">
      {/* Chat Header */}
      <ChatHeader chat={chat} onOpenSidebar={onOpenSidebar} />

      {/* Messages Area */}
      <MessageList
        isInitialLoad={isInitialLoad}
        userId={userId}
        messages={messages}
      />

      {/* Message Composer */}
      <MessageComposer
        setMessages={setMessages}
        userId={userId}
        chatId={chat.id}
        senderId={senderId}
      />
    </div>
  );
};

export default ChatContainer;
