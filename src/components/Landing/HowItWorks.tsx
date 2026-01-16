"use client";
import { UserPlus, MessageSquare, Sparkles } from "lucide-react";

const steps = [
  {
    icon: UserPlus,
    step: "01",
    title: "Sign Up",
    description:
      "Create your account in seconds with our simple and secure registration process.",
  },
  {
    icon: MessageSquare,
    step: "02",
    title: "Start Chatting",
    description:
      "Connect with friends, colleagues, or teams instantly. Begin conversations right away.",
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Stay Connected",
    description:
      "Enjoy seamless real-time messaging across all your devices, anytime, anywhere.",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-20 sm:py-28 bg-gradient-to-b from-white via-purple-50/30 to-blue-50/30 dark:from-background dark:via-purple-950/10 dark:to-blue-950/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get started with EchoChat in three simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector line for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-[60%] w-full h-0.5 bg-gradient-to-r from-purple-300 to-blue-300 dark:from-purple-700 dark:to-blue-700 z-0"></div>
                )}

                <div className="relative z-10 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 shadow-lg shadow-purple-500/50 dark:shadow-purple-500/30">
                    <Icon className="w-10 h-10 text-white" />
                  </div>

                  <div className="space-y-2">
                    <div className="text-sm font-bold text-purple-600 dark:text-purple-400">
                      STEP {step.step}
                    </div>
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
