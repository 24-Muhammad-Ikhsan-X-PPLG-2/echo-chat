"use client";

import { Message } from "@/type/db";
import { formatDistanceToNow } from "date-fns";
import { Check, CheckCheck } from "lucide-react";
import { FC, useEffect, useRef, memo, useMemo } from "react";

interface MessageBubbleProps {
  message: Message;
  showTimestamp?: boolean;
  userId: string;
  onRead: (msgId: string) => void;
}

const MessageBubbleComponent: FC<MessageBubbleProps> = ({
  message,
  showTimestamp = true,
  userId,
  onRead,
}) => {
  const isSent = message.isSent;
  const ref = useRef<HTMLDivElement>(null);

  // OPTIMASI 1: Memoize format waktu agar tidak dihitung ulang setiap scroll
  const timeAgo = useMemo(() => {
    return formatDistanceToNow(new Date(message.timestamp), {
      addSuffix: true,
    });
  }, [message.timestamp]);

  // OPTIMASI 2: Intersection Observer lebih efisien
  useEffect(() => {
    if (message.sender_id !== userId && message.status !== "read") {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            onRead(message.id);
            observer.disconnect();
          }
        },
        { threshold: 0.1 },
      ); // Menambah sedikit threshold biar lebih akurat

      const currentRef = ref.current;
      if (currentRef) observer.observe(currentRef);

      return () => {
        observer.disconnect();
      };
    }
  }, [message.id, message.status, userId, onRead]);

  return (
    <div
      ref={ref}
      key={message.id}
      // OPTIMASI 3: Tambahkan transform-gpu dan contain:paint
      className={`flex ${isSent ? "justify-end" : "justify-start"} mb-2 transform-gpu will-change-transform contain-[layout_paint]`}
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
              {timeAgo}
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

// OPTIMASI 4: Bungkus dengan memo untuk mencegah re-render list yang gak perlu
const MessageBubble = memo(MessageBubbleComponent, (prev, next) => {
  // Hanya render ulang jika ID, status, atau konten berubah
  return (
    prev.message.id === next.message.id &&
    prev.message.status === next.message.status &&
    prev.message.content === next.message.content &&
    prev.showTimestamp === next.showTimestamp
  );
});

// Memberikan nama eksplisit agar React DevTools gak bingung
MessageBubble.displayName = "MessageBubble";

export default MessageBubble;
