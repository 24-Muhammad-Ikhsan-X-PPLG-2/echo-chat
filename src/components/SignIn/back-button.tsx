"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

const BackButton = () => {
  return (
    <Link href="/">
      <button className="fixed top-6 left-6 flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-750 transition-all shadow-md z-50 cursor-pointer">
        <ArrowLeft className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Back to Home
        </span>
      </button>
    </Link>
  );
};

export default BackButton;
