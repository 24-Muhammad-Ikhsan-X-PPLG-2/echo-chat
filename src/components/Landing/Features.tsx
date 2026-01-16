"use client";
import { Zap, Shield, Users, Smartphone } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-Time Messaging",
    description:
      "Experience lightning-fast message delivery with zero delays. Your conversations flow naturally and instantly.",
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    icon: Shield,
    title: "Secure Authentication",
    description:
      "Enterprise-grade security with end-to-end encryption. Your privacy and data are always protected.",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Users,
    title: "Typing Indicators",
    description:
      "See when someone is typing in real-time. Stay engaged and know exactly when to expect a response.",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: Smartphone,
    title: "Cross-Device Support",
    description:
      "Seamlessly switch between devices. Your conversations sync instantly across all your devices.",
    gradient: "from-blue-400 to-cyan-500",
  },
];

const Features = () => {
  return (
    <section className="py-20 sm:py-28 bg-white dark:bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Powerful Features for Modern Communication
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Everything you need for seamless, real-time conversations
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-6 hover:shadow-xl hover:shadow-purple-500/10 dark:hover:shadow-purple-500/5 transition-all duration-300 hover:-translate-y-1"
              >
                <div
                  className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${feature.gradient} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
