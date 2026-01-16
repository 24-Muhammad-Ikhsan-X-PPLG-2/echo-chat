"use client";
import { Rocket, Award, Code2, Clock } from "lucide-react";

const benefits = [
  {
    icon: Rocket,
    title: "Lightning Speed",
    description:
      "Messages delivered in milliseconds, not seconds. Experience the fastest real-time messaging platform.",
    stat: "<100ms",
    statLabel: "avg latency",
  },
  {
    icon: Award,
    title: "99.9% Uptime",
    description:
      "Built on reliable infrastructure that keeps you connected when it matters most.",
    stat: "99.9%",
    statLabel: "uptime SLA",
  },
  {
    icon: Code2,
    title: "Modern Technology",
    description:
      "Powered by cutting-edge tech stack with WebSocket connections and cloud infrastructure.",
    stat: "Latest",
    statLabel: "tech stack",
  },
  {
    icon: Clock,
    title: "Always Available",
    description:
      "24/7 accessibility across all time zones. Your conversations never sleep.",
    stat: "24/7",
    statLabel: "available",
  },
];

const WhyEchoChat = () => {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Why Choose EchoChat?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Built for speed, reliability, and modern user experience
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="relative bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6 hover:shadow-2xl hover:shadow-purple-500/20 dark:hover:shadow-purple-500/10 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="p-3 rounded-xl bg-white dark:bg-gray-900 shadow-md">
                      <Icon className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                        {benefit.stat}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {benefit.statLabel}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {benefit.description}
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

export default WhyEchoChat;
