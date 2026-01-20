"use client";

import { Chat } from "@/type/db";
import { Search, X } from "lucide-react";
import { FC, useState } from "react";
import ChatListItem from "./ChatListItem";
import { useInView } from "react-intersection-observer";

interface ChatSidebarProps {
  chats: Chat[] | undefined;
  selectedChatId: string | null;
  onSelectChat: (chatId: string) => void;
  isOpen: boolean;
  onClose: () => void;
  refChat: (node?: Element | null | undefined) => void;
  hasMoreChats: boolean;
}

const ChatSidebar: FC<ChatSidebarProps> = ({
  chats,
  isOpen,
  onClose,
  onSelectChat,
  selectedChatId,
  refChat,
  hasMoreChats,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = chats?.filter((chat) =>
    chat.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-50
          w-full sm:w-96 lg:w-96
          bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800
          flex flex-col
          transform transition-transform duration-300 lg:transform-none
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Chats
            </h1>
            <button
              onClick={onClose}
              className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
            </button>
          </div>

          {/* Search Input */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-100 dark:bg-gray-800 border-none rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition-all text-gray-900 dark:text-white placeholder-gray-500"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {filteredChats?.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-gray-500 dark:text-gray-400">No chats found</p>
            </div>
          ) : (
            <div>
              {filteredChats?.map((chat) => (
                <ChatListItem
                  key={chat.id}
                  chat={chat}
                  isSelected={chat.id === selectedChatId}
                  onClick={() => onSelectChat(chat.id)}
                />
              ))}
            </div>
          )}
          <div ref={refChat} className="p-8 text-center">
            <p className="text-gray-500 dark:text-gray-400">
              {hasMoreChats ? "Loading more..." : "No more chats"}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
