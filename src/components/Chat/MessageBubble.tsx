"use client";

import { Message } from "@/type/db";
import { formatDistanceToNow } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import { FC, useEffect, useRef } from "react";

interface MessageBubbleProps {
  message: Message;
  showTimestamp?: boolean;
  userId: string;
  onRead: (msgId: string) => void;
}

const MessageBubble: FC<MessageBubbleProps> = ({
  message,
  showTimestamp = true,
  userId,
  onRead,
}) => {
  const isSent = message.isSent;
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (message.sender_id !== userId && message.status !== "read") {
      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          onRead(message.id);
          observer.disconnect();
        }
      });
      if (ref.current) observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [message.id, message.status]);
  return (
    <div
      ref={ref}
      className={`flex ${isSent ? "justify-end" : "justify-start"} mb-2`}
    >
      <div
        className={`flex flex-col ${
          isSent ? "items-end" : "items-start"
        } max-w-[70%] sm:max-w-md`}
      >
        {/* Message Bubble */}
        <div
          className={`
            px-4 py-2.5 rounded-2xl shadow-sm
            ${
              isSent
                ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-sm"
                : "bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded-bl-sm"
            }
          `}
        >
          <p className="text-sm leading-relaxed break-words">
            {message.content}
          </p>
        </div>

        {/* Timestamp and Status */}
        {showTimestamp && (
          <div className="flex items-center gap-1 mt-1 px-1">
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDistanceToNow(new Date(message.timestamp), {
                addSuffix: true,
              })}
            </span>
            {isSent && message.status && (
              <span className="text-gray-500 dark:text-gray-400">
                {message.status === "sent" && <Check className="w-3.5 h-3.5" />}
                {message.status === "delivered" && (
                  <CheckCheck className="w-3.5 h-3.5" />
                )}
                {message.status === "read" && (
                  <CheckCheck className="w-3.5 h-3.5 text-blue-500" />
                )}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;
