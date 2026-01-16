"use client";

const TypingIndicator = () => {
  return (
    <div className="flex justify-start mb-2">
      <div className="bg-white dark:bg-gray-800 px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm max-w-[70%]">
        <div className="flex items-center gap-1">
          <div
            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          ></div>
          <div
            className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
