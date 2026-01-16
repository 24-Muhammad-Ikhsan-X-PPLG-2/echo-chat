"use client";

import ChatContainer from "@/components/Chat/ChatContainer";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import EmptyChatState from "@/components/Chat/EmptyChatState";
import useChat from "@/hooks/useChat";
import { type Chat } from "@/type/db";
import { User } from "@supabase/supabase-js";
import { FC, useState } from "react";

type ChatProps = {
  user: User;
};

const Chat: FC<ChatProps> = ({ user }) => {
  const userId = user.id;
  const {
    chats,
    messages,
    selectedChat,
    selectedChatId,
    setSelectedChatId,
    setMessages,
    isInitialLoad,
  } = useChat({ userId });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Sidebar */}
      <ChatSidebar
        chats={chats}
        selectedChatId={selectedChatId}
        onSelectChat={(chatId) => {
          setSelectedChatId(chatId);
          setIsMobileSidebarOpen(false);
        }}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Chat Container */}
      <div className="flex-1 flex flex-col">
        {selectedChat ? (
          <ChatContainer
            isInitialLoad={isInitialLoad}
            setMessages={setMessages}
            userId={userId}
            senderId={userId}
            chat={selectedChat}
            messages={messages}
            onOpenSidebar={() => setIsMobileSidebarOpen(true)}
          />
        ) : (
          <EmptyChatState onOpenSidebar={() => setIsMobileSidebarOpen(true)} />
        )}
      </div>
    </div>
  );
};

export default Chat;
