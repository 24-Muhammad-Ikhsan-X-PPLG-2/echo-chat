"use client";
const SignInIllustration = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center p-8">
      {/* Background gradient blob */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100 via-blue-100 to-purple-50 dark:from-purple-950/40 dark:via-blue-950/40 dark:to-purple-900/20 rounded-3xl"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:20px_20px] rounded-3xl"></div>

      <div className="relative z-10 max-w-md w-full space-y-6">
        {/* Floating chat bubbles */}
        <div className="space-y-4 animate-fade-in-up">
          {/* Chat bubble 1 */}
          <div className="flex items-start gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 shadow-lg"></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-5 py-4 shadow-xl max-w-[75%] transform hover:scale-105 transition-transform">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                Welcome back! Ready to connect?
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Just now
              </p>
            </div>
          </div>

          {/* Chat bubble 2 - right aligned */}
          <div
            className="flex items-start gap-3 justify-end animate-fade-in-up"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl rounded-tr-sm px-5 py-4 shadow-xl max-w-[75%] transform hover:scale-105 transition-transform">
              <p className="text-sm text-white">
                Sign in to continue chatting!
              </p>
              <p className="text-xs text-purple-200 mt-1">Just now</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0 shadow-lg"></div>
          </div>

          {/* Chat bubble 3 */}
          <div
            className="flex items-start gap-3 animate-fade-in-up"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-emerald-500 flex-shrink-0 shadow-lg"></div>
            <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-5 py-4 shadow-xl max-w-[75%] transform hover:scale-105 transition-transform">
              <p className="text-sm text-gray-800 dark:text-gray-200">
                Your conversations are waiting... ✨
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Just now
              </p>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 right-10 w-20 h-20 bg-purple-300 dark:bg-purple-700 rounded-full blur-3xl opacity-40 animate-pulse"></div>
        <div
          className="absolute bottom-10 left-10 w-32 h-32 bg-blue-300 dark:bg-blue-700 rounded-full blur-3xl opacity-40 animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>
    </div>
  );
};

export default SignInIllustration;
