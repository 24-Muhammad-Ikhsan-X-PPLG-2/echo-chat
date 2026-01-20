"use client";

import { Message } from "@/type/db";
import {
  Dispatch,
  FC,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { createClient } from "@/lib/supabase/client/client";
import { VList, VListHandle } from "virtua";
import { useInView } from "react-intersection-observer";

interface MessageListProps {
  messages: Message[];
  isTyping?: boolean;
  userId: string;
  isInitialLoad: RefObject<boolean>;
  selectedChatId: string;
  isLoading: boolean;
  hasMore: boolean;
  loadMoreMessage: () => void;
}

const supabase = createClient();

const MessageList: FC<MessageListProps> = ({
  messages,
  isTyping = false,
  userId,
  isInitialLoad,
  selectedChatId,
  isLoading,
  hasMore,
  loadMoreMessage,
}) => {
  const pendingReadIds = useRef<string[]>([]);
  const throttleTimeout = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const vListRef = useRef<VListHandle>(null);

  useEffect(() => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    const isMyMessage = lastMessage.sender_id === userId;

    // 1. Logika Initial Load
    if (isInitialLoad.current) {
      vListRef.current?.scrollToIndex(messages.length - 1);
      isInitialLoad.current = false;
      return;
    }

    // 2. Logika Smart Scroll
    // Kita cek apakah user sedang di bawah menggunakan API virtua
    // (Beberapa library menggunakan 'vListRef.current.scrollOffset')
    // Namun cara paling simpel di chat adalah:
    if (isMyMessage) {
      vListRef.current?.scrollToIndex(messages.length - 1, {
        align: "end",
        smooth: true,
      });
    } else {
      // Opsional: Cek jika user di bawah baru auto scroll untuk pesan orang lain
      vListRef.current?.scrollToIndex(messages.length - 1, {
        align: "end",
        smooth: true,
      });
    }
  }, [messages, userId]);

  // Group messages by date
  const groupedMessages = messages.reduce(
    (groups, message) => {
      const date = message.timestamp.split(" ")[0]; // Simple grouping by day
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
      return groups;
    },
    {} as Record<string, Message[]>,
  );
  const processReadReceipts = () => {
    if (pendingReadIds.current.length === 0) return;
    // gwe jelasin prosesnya (ikhsan)
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
    // gwe jelasin prosesnya (ikhsan)
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
    <div className="flex-1 overflow-hidden bg-gray-50 dark:bg-gray-950">
      {messages && messages.length > 0 ? (
        <VList
          key={selectedChatId}
          data={messages}
          ref={vListRef}
          bufferSize={2500}
          className="h-full p-4"
          shift={true}
          onScroll={(offset) => {
            if (offset < 50 && hasMore && !isLoading && messages.length > 0) {
              loadMoreMessage();
            }
          }}
        >
          {(message, index) => {
            // Logika Date Divider: Tampilkan jika pesan pertama atau beda hari dengan pesan sebelumnya
            const isNewDay =
              index === 0 ||
              new Date(messages[index - 1].timestamp).toDateString() !==
                new Date(message.timestamp).toDateString();

            const showTimestamp =
              index === 0 ||
              messages[index - 1].isSent !== message.isSent ||
              index === messages.length - 1;

            return (
              <div
                key={message.id}
                className="flex flex-col transform-gpu will-change-transform contain-[paint]"
              >
                {/* Tampilkan Date Divider di dalam VList agar ikut ter-scroll */}
                {isNewDay && (
                  <div className="flex items-center justify-center my-6">
                    <span className="px-3 py-1 bg-white dark:bg-gray-800 text-[10px] font-medium text-gray-500 rounded-full shadow-sm uppercase tracking-wider">
                      {new Date(message.timestamp).toLocaleDateString("id-ID", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                      })}
                    </span>
                  </div>
                )}

                <div className="mb-4 ">
                  <MessageBubble
                    onRead={addToReadQueue}
                    userId={userId}
                    message={message}
                    showTimestamp={showTimestamp}
                  />
                </div>
              </div>
            );
          }}
        </VList>
      ) : null}
    </div>
  );
};

export default MessageList;
