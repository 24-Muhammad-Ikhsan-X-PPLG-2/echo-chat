"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-r from-purple-600 to-blue-600 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      {/* Decorative blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-purple-500 rounded-full blur-3xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500 rounded-full blur-3xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Ready to Transform Your Conversations?
            </h2>
            <p className="text-lg sm:text-xl text-purple-100">
              Join thousands of users already enjoying real-time messaging with
              EchoChat. Start your journey today.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href={"/signup"}>
              <button className="group px-8 py-4 bg-white text-purple-600 rounded-xl hover:shadow-2xl hover:shadow-white/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer">
                Start for Free
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="px-8 py-4 bg-transparent text-white border-2 border-white/30 rounded-xl hover:bg-white/10 hover:border-white transition-all duration-300 cursor-pointer">
              Learn More
            </button>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-8 text-white/90 text-sm">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Free to use</span>
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Ga ribet kaya cwe</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
