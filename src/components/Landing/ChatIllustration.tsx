function ChatIllustration() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="relative z-10 space-y-4">
        {/* Message bubble 1 - Received */}
        <div className="flex items-start gap-3 animate-fade-in-up">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0"></div>
          <div className="flex-1 space-y-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-lg max-w-[80%]">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                Hey! How's the new chat app coming along?
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 px-2">
              10:23 AM
            </p>
          </div>
        </div>

        {/* Message bubble 2 - Sent */}
        <div
          className="flex items-start gap-3 justify-end animate-fade-in-up"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="flex-1 space-y-1 flex flex-col items-end">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl rounded-tr-sm px-4 py-3 shadow-lg max-w-[80%]">
              <p className="text-sm text-white">
                It's amazing! Real-time messaging works perfectly ✨
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 px-2">
              10:24 AM
            </p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex-shrink-0"></div>
        </div>

        {/* Message bubble 3 - Received */}
        <div
          className="flex items-start gap-3 animate-fade-in-up"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex-shrink-0"></div>
          <div className="flex-1 space-y-1">
            <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-lg max-w-[80%]">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                That's awesome! Super fast and clean design 🚀
              </p>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 px-2">
              10:25 AM
            </p>
          </div>
        </div>

        {/* Typing indicator */}
        <div
          className="flex items-start gap-3 animate-fade-in-up"
          style={{ animationDelay: "0.6s" }}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 flex-shrink-0"></div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-5 py-3 shadow-lg">
            <div className="flex gap-1">
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "0s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-purple-200 dark:bg-purple-900/30 rounded-full blur-3xl opacity-60"></div>
      <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-blue-200 dark:bg-blue-900/30 rounded-full blur-3xl opacity-60"></div>
    </div>
  );
}
export default ChatIllustration;
