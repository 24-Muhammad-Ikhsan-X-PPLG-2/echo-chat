"use client";

import { isUserReallyOnline } from "@/lib/utils/chat-utils";
import { type Chat } from "@/type/db";
import { formatDistanceToNow } from "date-fns";
import { FC } from "react";

interface ChatListItemProps {
  chat: Chat;
  isSelected: boolean;
  onClick: () => void;
}

const ChatListItem: FC<ChatListItemProps> = ({ chat, isSelected, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`
        w-full p-4 flex items-center gap-3 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer
        ${
          isSelected
            ? "bg-purple-50 dark:bg-purple-900/20 border-l-4 border-purple-600"
            : "border-l-4 border-transparent"
        }
      `}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white font-semibold shadow-md">
          {chat.avatar}
        </div>
        {isUserReallyOnline(chat.lastSeen, chat.isOnline) && (
          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white dark:border-gray-900 rounded-full"></div>
        )}
      </div>

      {/* Chat Info */}
      <div className="flex-1 min-w-0 text-left">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-semibold text-gray-900 dark:text-white truncate">
            {chat.name}
          </h3>
          {chat.timestamp && (
            <span className="text-xs text-gray-500 dark:text-gray-400 shrink-0 ml-2">
              {formatDistanceToNow(chat.timestamp, { addSuffix: true })}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
            {chat.isTyping ? (
              <span className="text-purple-600 dark:text-purple-400 italic">
                typing...
              </span>
            ) : (
              chat.lastMessage
            )}
          </p>
          {chat.unreadCount > 0 && (
            <span className="shrink-0 ml-2 min-w-5 h-5 px-1.5 bg-purple-600 text-white text-xs font-semibold rounded-full flex items-center justify-center">
              {chat.unreadCount > 99 ? "99+" : chat.unreadCount}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatListItem;
