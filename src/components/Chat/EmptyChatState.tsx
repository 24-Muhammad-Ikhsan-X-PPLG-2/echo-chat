"use client";

import { MessageCircle } from "lucide-react";
import { FC } from "react";

type EmptyChatStateProps = {
  onOpenSidebar: () => void;
};

const EmptyChatState: FC<EmptyChatStateProps> = ({ onOpenSidebar }) => {
  return (
    <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center max-w-md px-4">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/30 dark:to-blue-900/30 rounded-full mb-6">
          <MessageCircle className="w-10 h-10 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Welcome to EchoChat
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Select a conversation from the sidebar to start messaging, or start a
          new chat to connect with your team.
        </p>
        <button
          onClick={onOpenSidebar}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl font-medium hover:shadow-lg hover:shadow-purple-500/50 dark:hover:shadow-purple-500/30 transition-all duration-300"
        >
          Start New Chat
        </button>
      </div>
    </div>
  );
};

export default EmptyChatState;
