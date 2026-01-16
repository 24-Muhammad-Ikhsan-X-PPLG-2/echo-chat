"use client";
import { MessageCircle } from "lucide-react";

const Header = () => {
  return (
    <div className="mb-8 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-linear-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/30">
          <MessageCircle className="w-7 h-7 text-white" />
        </div>
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          EchoChat {new Date().getFullYear()}
        </span>
      </div>
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Sign in to continue your conversations
        </p>
      </div>
    </div>
  );
};

export default Header;
