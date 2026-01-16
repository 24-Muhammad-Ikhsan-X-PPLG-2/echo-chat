"use client";

import { isUserReallyOnline } from "@/lib/utils/chat-utils";
import { type Chat } from "@/type/db";
import { Menu, MoreVertical, Phone, Search, Video } from "lucide-react";
import { FC } from "react";

interface ChatHeaderProps {
  chat: Chat;
  onOpenSidebar: () => void;
}

const ChatHeader: FC<ChatHeaderProps> = ({ chat, onOpenSidebar }) => {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
      {/* Left: User Info */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        <div className="relative flex-shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold shadow-md">
            {chat.avatar}
          </div>
          {isUserReallyOnline(chat.lastSeen, chat.isOnline) ? (
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
          ) : null}
        </div>

        <div>
          <h2 className="font-semibold text-gray-900 dark:text-white">
            {chat.name}
          </h2>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {isUserReallyOnline(chat.lastSeen, chat.isOnline)
              ? "Online"
              : "Offline"}
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-1">
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <Search className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors hidden sm:block">
          <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors hidden sm:block">
          <Video className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
        <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors">
          <MoreVertical className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
