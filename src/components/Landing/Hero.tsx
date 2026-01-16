import { ArrowRight, Play } from "lucide-react";
import ChatIllustration from "./ChatIllustration";
import Link from "next/link";

function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 via-blue-50 to-white dark:from-purple-950/20 dark:via-blue-950/20 dark:to-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white">
                EchoChat
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400">
                  Real-Time Conversations, Instantly Connected
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Experience instant and secure messaging that brings your
                conversations to life. Connect with anyone, anywhere, in
                real-time.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link href={"/signup"}>
                <button className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                  Get Started
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <button className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-purple-500 dark:hover:border-purple-500 transition-all duration-300 flex items-center justify-center gap-2">
                <Play className="w-5 h-5" />
                View Demo
              </button>
            </div>

            <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 border-2 border-white dark:border-gray-900"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-cyan-400 border-2 border-white dark:border-gray-900"></div>
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-emerald-400 border-2 border-white dark:border-gray-900"></div>
                </div>
                <span>10,000+ active users</span>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="flex justify-center lg:justify-end">
            <ChatIllustration />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
