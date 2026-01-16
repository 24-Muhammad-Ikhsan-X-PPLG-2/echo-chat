"use client";

import { Message } from "@/type/db";
import { FC, RefObject, useEffect, useRef } from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { createClient } from "@/lib/supabase/client/client";

interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
  userId: string;
  isInitialLoad: RefObject<boolean>;
}

const supabase = createClient();

const MessageList: FC<MessageListProps> = ({
  messages,
  isTyping = false,
  userId,
  isInitialLoad,
}) => {
  const pendingReadIds = useRef<string[]>([]);
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    // 1. Logika untuk Initial Load (Pertama kali buka chat)
    if (isInitialLoad.current && messages.length > 0 && container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: "auto", // Pakai "auto" agar instan tanpa animasi saat pertama buka
      });
      isInitialLoad.current = false; // Set ke false supaya nggak ganggu logika smart scroll
      return; // Keluar dari effect agar tidak bentrok dengan logika bawah
    }

    // 2. Logika Smart Scroll (Yang sudah kita buat sebelumnya)
    if (container && messages.length > 0) {
      const lastMessage = messages[messages.length - 1];
      const isMyMessage = lastMessage.sender_id === userId;
      const isAtBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 150;

      if (isMyMessage || isAtBottom) {
        container.scrollTo({
          top: container.scrollHeight,
          behavior: "smooth",
        });
      }
    }
  }, [messages, userId]);

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = message.timestamp.split(" ")[0]; // Simple grouping by day
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {} as Record<string, Message[]>);
  const processReadReceipts = () => {
    if (pendingReadIds.current.length === 0) return;

    // Ambil semua ID yang sudah terkumpul
    const idsToUpdate = [...pendingReadIds.current];
    pendingReadIds.current = []; // Kosongkan antrian

    // Kirim update sekaligus ke Supabase (Bulk Update)
    supabase
      .from("messages")
      .update({ status: "read" })
      .in("id", idsToUpdate)
      .then(({ error }) => {
        if (error) console.error("Gagal update status read:", error);
      });
  };

  const addToReadQueue = (id: string) => {
    // Masukkan ID ke antrian jika belum ada
    if (!pendingReadIds.current.includes(id)) {
      pendingReadIds.current.push(id);
    }

    // Atur timer (Throttle). Jika dalam 2 detik ada pesan baru,
    // timer yang lama dibatalkan, buat timer baru.
    if (throttleTimeout.current) clearTimeout(throttleTimeout.current);

    throttleTimeout.current = setTimeout(() => {
      processReadReceipts();
    }, 2000); // Tunggu 2 detik setelah pesan terakhir terlihat
  };
  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 dark:bg-gray-950"
    >
      {/* Date divider (simplified) */}
      <div className="flex items-center justify-center mb-4">
        <span className="px-3 py-1 bg-white dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400 rounded-full shadow-sm">
          Today
        </span>
      </div>

      {/* Messages */}
      {messages.map((message, index) => {
        const showTimestamp =
          index === 0 ||
          messages[index - 1].isSent !== message.isSent ||
          index === messages.length - 1;

        return (
          <MessageBubble
            onRead={addToReadQueue}
            userId={userId}
            key={message.id}
            message={message}
            showTimestamp={showTimestamp}
          />
        );
      })}

      {/* Typing Indicator */}
      {isTyping && <TypingIndicator />}
    </div>
  );
};

export default MessageList;
