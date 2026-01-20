"use client";

import { createClient } from "@/lib/supabase/client/client";
import {
  handlePayloadMessages,
  handlePayloadProfiles,
  handlePayloadSidebarChatParticipants,
  handlePayloadSidebarChats,
  handlePayloadSidebarMessages,
} from "@/lib/utils/chat-payload";
import {
  fetchChats,
  fetchMessages,
  sidebarSubscribeChannel,
  subscribeMessages,
  subscribeProfiles,
  updateDatabaseStatus,
  updateUserOnline,
} from "@/lib/utils/chat-utils";
import { Chat, Message } from "@/type/db";
import { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const supabase = createClient(); // Membuat instance supabase

// jujur gua kadang nge blank kalo edit file ini aowkwkw

const useChat = ({ userId }: { userId: string }) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>();
  const [messages, setMessages] = useState<Message[]>([]);
  const [pageChats, setPageChats] = useState(0);
  const [hasMoreChats, setHasMoreChats] = useState(true);
  const [pageMessages, setPageMessages] = useState(0);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  const messagesRef = useRef<Message[]>([]);
  const selectedChatIdRef = useRef<string | null>(null);
  const isInitialLoad = useRef(true);
  const { ref: refChat, inView: inViewChat } = useInView();
  const loadChats = async (currentPage: number) => {
    const res = await fetchChats(userId, 0);
    setChats((prev) => {
      const newItem = res.data;
      if (currentPage === 0 || !prev) return newItem;
      const combined = [...prev, ...newItem];
      return combined.filter(
        (v, i, a) => a.findIndex((t) => t.id === v.id) === i,
      );
    });
    setHasMoreChats(res.hasMore ?? false);
  };
  const loadMoreMessages = async (isInit = false) => {
    if (isLoadingMessages || (!hasMoreMessages && !isInit) || !selectedChatId)
      return;
    setIsLoadingMessages(true);
    try {
      const nextPage = isInit ? 0 : pageMessages;
      const res = await fetchMessages(selectedChatId, userId, nextPage);
      setMessages((prev) => {
        if (!prev || !res) return prev;
        return isInit ? res?.newMessages : [...res?.newMessages, ...prev];
      });
      setHasMoreMessages(res?.hasMoreMessages ?? false);
      setPageMessages((prev) => prev + 1);
      return {
        updatedChatIds: res?.updatedChatIds ?? null,
      };
    } finally {
      setIsLoadingMessages(false);
    }
  };
  // Pertama kali load pesan pengguna.

  useEffect(() => {
    loadChats(0);
  }, []);
  useEffect(() => {
    if (inViewChat && hasMoreChats) {
      const nextPage = pageChats + 1;
      setPageChats(nextPage);
      loadChats(nextPage);
    }
  }, [inViewChat, hasMoreChats]);
  useEffect(() => {
    if (!userId) return;

    const channel = supabase.channel("room_online", {
      config: { presence: { key: userId } },
    });

    channel
      .on("presence", { event: "sync" }, () => {
        const newState = channel.presenceState();
        console.log(newState);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          // 1. Update Database lewat API Next.js
          updateDatabaseStatus("online", userId);

          // 2. Kirim sinyal Presence ke user lain
          await channel.track({
            user_id: userId,
            online_at: new Date().toISOString(),
          });
        }
      });

    // Event listener untuk menutup tab/browser
    const handleBeforeUnload = () => {
      updateDatabaseStatus("offline", userId);
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    const heartBeatInterval = setInterval(() => {
      updateDatabaseStatus("online", userId);
    }, 60000);
    return () => {
      // Cleanup saat komponen unmount
      updateDatabaseStatus("offline", userId);
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
  const loadMessages = async () => {
    if (!selectedChatId) return;
    setPageMessages(0);
    setHasMoreMessages(true);
    setIsLoadingMessages(false);
    const res = await loadMoreMessages(true);
    setChats((prev) => {
      if (!prev) return prev;
      return prev.map((chat) => {
        if (res?.updatedChatIds!.has(chat.id)) {
          return {
            ...chat,
            unreadCount: 0,
          };
        }
        return chat;
      });
    });
  };
  useEffect(() => {
    if (!selectedChatId) return;
    setMessages([]);

    isInitialLoad.current = true;
    loadMessages();
    const messageChannel = subscribeMessages(selectedChatId, (p) =>
      handlePayloadMessages(p, setMessages, userId, selectedChatId),
    );
    return () => {
      supabase.removeChannel(messageChannel);
    };
  }, [selectedChatId]);
  // Listen ke realtime messages untuk update sidebar
  useEffect(() => {
    // P disini adalah payload maksudnya
    const {
      sidebarMessagesChannel,
      sidebarChatsChannel,
      sidebarChatParticipantsChannel,
    } = sidebarSubscribeChannel(
      userId,
      (p) =>
        handlePayloadSidebarMessages(p, setChats, selectedChatIdRef, userId),
      (p) => handlePayloadSidebarChats(p, setChats),
      (p) => handlePayloadSidebarChatParticipants(p, setChats, userId),
    );
    const subscribeProfilesChannel = subscribeProfiles((p) =>
      handlePayloadProfiles(p, setChats),
    );
    return () => {
      supabase.removeChannel(sidebarMessagesChannel);
      supabase.removeChannel(subscribeProfilesChannel);
      supabase.removeChannel(sidebarChatsChannel);
      supabase.removeChannel(sidebarChatParticipantsChannel);
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
    loadChats,
    refChat,
    hasMoreChats,
    isLoadingMessages,
    loadMoreMessages,
    hasMoreMessages,
  };
};

export default useChat;
