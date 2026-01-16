"use client";

import { createClient } from "@/lib/supabase/client/client";
import {
  fetchChats,
  fetchMessages,
  sidebarSubscribeChannel,
  subscribeMessages,
  subscribeProfiles,
  updateUserOnline,
} from "@/lib/utils/chat-utils";
import { Chat, Message } from "@/type/db";
import { useEffect, useRef, useState } from "react";

const supabase = createClient(); // Membuat instance supabase

const useChat = ({ userId }: { userId: string }) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>();
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesRef = useRef<Message[]>([]);
  const selectedChatIdRef = useRef<string | null>(null);
  const isInitialLoad = useRef(true);
  // Pertama kali load pesan pengguna.
  useEffect(() => {
    (async () => {
      await fetchChats(userId, setChats);
    })();
  }, []);
  useEffect(() => {
    if (!userId) return;

    const channel = supabase.channel("room_online", {
      config: { presence: { key: userId } },
    });

    // Fungsi pembantu untuk panggil API Next.js
    const updateDatabaseStatus = (status: "online" | "offline") => {
      fetch("/api/presence", {
        method: "POST",
        body: JSON.stringify({ userId, status }),
        headers: { "Content-Type": "application/json" },
        keepalive: true, // PENTING: Agar tetap jalan saat tab ditutup
      });
    };

    channel
      .on("presence", { event: "sync" }, () => {
        const newState = channel.presenceState();
        // Update local state jika kamu butuh daftar user online di UI
        // setOnlineUsers(newState);
        console.log(newState);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          // 1. Update Database lewat API Next.js
          updateDatabaseStatus("online");

          // 2. Kirim sinyal Presence ke user lain
          await channel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
        }
      });

    // Event listener untuk menutup tab/browser
    const handleBeforeUnload = () => {
      updateDatabaseStatus("offline");
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    const heartBeatInterval = setInterval(() => {
      updateDatabaseStatus("online");
    }, 60000);
    return () => {
      // Cleanup saat komponen unmount
      updateDatabaseStatus("offline");
      window.removeEventListener("beforeunload", handleBeforeUnload);
      channel.unsubscribe();
      clearInterval(heartBeatInterval);
    };
  }, [userId]);
  // Untuk mengubah messageRef.current sesuai messages, tujuannya agar fungsi di payload bisa mengakses data messages
  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);
  useEffect(() => {
    selectedChatIdRef.current = selectedChatId;
  }, [selectedChatId]);
  // Menangani ambil pesan dari lawan bicara yg dipilih dan listen ke realtime messages
  useEffect(() => {
    if (!selectedChatId) return;
    isInitialLoad.current = true;
    fetchMessages(selectedChatId, userId, setMessages, chats, setChats);
    const messageChannel = subscribeMessages(
      selectedChatId,
      userId,
      setMessages,
      chats,
      setChats,
      messagesRef
    );
    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [selectedChatId]);
  // Listen ke realtime messages untuk update sidebar
  useEffect(() => {
    const sidebarChannel = sidebarSubscribeChannel(
      userId,
      setChats,
      selectedChatIdRef
    );
    const subscribeProfilesChannel = subscribeProfiles(setChats);
    return () => {
      supabase.removeChannel(sidebarChannel);
      supabase.removeChannel(subscribeProfilesChannel);
    };
  }, []);
  // Untuk menentukan chat mana yg dipilih
  const selectedChat = chats?.find((chat) => chat.id === selectedChatId);
  return {
    chats,
    selectedChat,
    selectedChatId,
    setSelectedChatId,
    messages,
    setMessages,
    isInitialLoad,
  };
};

export default useChat;
