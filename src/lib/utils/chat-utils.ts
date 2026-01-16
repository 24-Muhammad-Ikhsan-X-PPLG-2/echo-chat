"use client";

import { Chat, ChatParticipantWithChat, Message, ProfilesDB } from "@/type/db";
import {
  PostgrestResponse,
  RealtimePostgresChangesPayload,
} from "@supabase/supabase-js";
import { createClient } from "../supabase/client/client";
import { Dispatch, RefObject, SetStateAction } from "react";

const supabase = createClient();

export const isUserReallyOnline = (
  lastSeenParam: string,
  isOnline: boolean
) => {
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
  const lastSeen = new Date(lastSeenParam);

  // User dianggap online JIKA (is_online true) DAN (last_seen masih baru)
  return isOnline && lastSeen > twoMinutesAgo;
};

export const updateUserOnline = async (
  status: "online" | "offline",
  userId: string
) => {
  const isOnline = status === "online" ? true : false;
  const { error } = await supabase
    .from("profiles")
    .update({
      is_online: isOnline,
    })
    .eq("id", userId);
  if (error) console.error(error);
};

export const fetchChats = async (
  userId: string, // Mengambil user id dari pengguna
  setChats: Dispatch<SetStateAction<Chat[] | undefined>> // ini untuk state chats
) => {
  // Ambil data dari table chat_participants dan memakai join untuk mengambil juga data dari table chats dan profiles
  const { data, error } = (await supabase
    .from("chat_participants")
    .select(
      `
        unread_count,
    chats (
      id,
      is_group,
      name,
      last_message,
      last_message_at,
      chat_participants (
        user_id,
        profiles (
          id,
          username,
          avatar_url,
          is_online,
          last_seen
        )
      )
    )
      `
    )
    .eq("user_id", userId)) as PostgrestResponse<ChatParticipantWithChat>;
  if (error) console.error(error);
  if (!data) return;
  // Set Chats untuk mengganti data dan trigger update ui react
  setChats(
    data.map((item) => {
      const otherParticipant = item.chats?.chat_participants.find(
        (item) => item.user_id !== userId
      );
      const nameChat = item.chats?.is_group
        ? item.chats.name
        : otherParticipant?.profiles?.username;
      return {
        id: item.chats?.id ?? "",
        name: nameChat ?? "Unknown",
        avatar: nameChat?.slice(0, 2) ?? "??",
        lastMessage: item.chats?.last_message ?? "",
        lastMessageAt: item.chats?.last_message_at ?? "",
        timestamp: item.chats?.last_message_at ?? "",
        unreadCount: item.unread_count,
        isOnline: otherParticipant?.profiles?.is_online ?? false,
        lastSeen: otherParticipant?.profiles?.last_seen ?? "",
        otherParticipantId: otherParticipant?.profiles?.id ?? "",
      };
    })
  );
};

export const subscribeProfiles = (
  setChats: Dispatch<SetStateAction<Chat[] | undefined>>
) => {
  const channelProfiles = supabase
    .channel("profiles-channel")
    .on(
      "postgres_changes",
      { event: "*", schema: "public", table: "profiles" },
      (payload: RealtimePostgresChangesPayload<ProfilesDB>) => {
        if (payload.eventType === "UPDATE") {
          const profile = payload.new;
          setChats((prev) =>
            prev?.map((chat) => {
              if (chat.otherParticipantId == profile.id) {
                return {
                  ...chat,
                  isOnline: profile.is_online,
                  lastSeen: profile.last_seen,
                };
              }
              return chat;
            })
          );
        }
      }
    )
    .subscribe();
  return channelProfiles;
};

export const fetchMessages = async (
  chatId: string,
  userId: string,
  setMessages: Dispatch<SetStateAction<Message[]>>,
  chats: Chat[] | undefined,
  setChats: Dispatch<SetStateAction<Chat[] | undefined>>
) => {
  await supabase
    .from("chat_participants")
    .update({
      unread_count: 0,
    })
    .eq("chat_id", chatId)
    .eq("user_id", userId);
  const { data } = await supabase
    .from("messages")
    .select("*")
    .eq("chat_id", chatId)
    .order("created_at");

  if (!data) return;

  setMessages(
    data.map((msg) => {
      const dataChats = [...(chats ?? [])];
      const editChats = dataChats.map((item) => {
        if (item.id === msg.chat_id) {
          return {
            ...item,
            unreadCount: 0,
          };
        }
        return item;
      });
      setChats(editChats);
      return {
        id: msg.id,
        chatId: msg.chat_id,
        content: msg.content,
        timestamp: msg.created_at,
        isSent: msg.sender_id === userId,
        sender_id: msg.sender_id,
        status: msg.status,
        type: msg.type,
        fileUrl: msg.file_url,
        fileName: msg.file_name,
        is_deleted: msg.is_deleted,
        created_at: msg.created_at,
      };
    })
  );
};

export const subscribeMessages = (
  chatId: string,
  userId: string,
  setMessages: Dispatch<SetStateAction<Message[]>>,
  chats: Chat[] | undefined,
  setChats: Dispatch<SetStateAction<Chat[] | undefined>>,
  messagesRef: RefObject<Message[]>
) => {
  const messageChannel = supabase
    .channel(`chat-${chatId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "messages",
        filter: `chat_id=eq.${chatId}`,
      },
      async (payload) => {
        if (payload.eventType === "INSERT") {
          const msg = payload.new;
          if (msg.sender_id === userId) return;
          setMessages((prev) => [
            ...prev,
            {
              id: msg.id,
              chatId: msg.chat_id,
              content: msg.content,
              timestamp: msg.created_at,
              isSent: msg.sender_id === userId,
              sender_id: msg.sender_id,
              status: msg.status,
              type: msg.type,
              fileUrl: msg.file_url,
              fileName: msg.file_name,
              is_deleted: msg.is_deleted,
              created_at: msg.created_at,
            },
          ]);
          const dataChats = [...(chats ?? [])];
          const editChats = dataChats.map((item) => {
            if (item.id === msg.chat_id) {
              return {
                ...item,
                lastMessage: msg.content,
                timestamp: msg.created_at,
                unreadCount: 0,
              };
            }
            return item;
          });
          setChats(editChats);
          await supabase
            .from("chat_participants")
            .update({
              unread_count: 0,
            })
            .eq("chat_id", chatId)
            .eq("user_id", userId);
        }
        if (payload.eventType === "UPDATE" && messagesRef.current) {
          const msg = payload.new;
          const findIndex = messagesRef.current.findIndex(
            (item) => item.id == msg.id
          );
          if (findIndex === -1) return;
          const newMsg = [...messagesRef.current];
          newMsg[findIndex] = {
            id: msg.id,
            chatId: msg.chat_id,
            content: msg.content,
            timestamp: msg.created_at,
            isSent: msg.sender_id === userId,
            sender_id: msg.sender_id,
            status: msg.status,
            type: msg.type,
            fileUrl: msg.file_url,
            fileName: msg.file_name,
            is_deleted: msg.is_deleted,
            created_at: msg.created_at,
          };
          setMessages(newMsg);
        }
      }
    )
    .subscribe();
  return messageChannel;
};

export const sidebarSubscribeChannel = (
  userId: string,
  setChats: Dispatch<SetStateAction<Chat[] | undefined>>,
  selectedChatIdRef: RefObject<string | null>
) => {
  const sidebarChannel = supabase
    .channel("sidebar-messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      (payload) => {
        const message = payload.new;
        setChats((prev) =>
          prev?.map((chat) => {
            const unreadWhenNotSelectedChat =
              message.sender_id !== userId
                ? chat.unreadCount + 1
                : chat.unreadCount;
            const unread =
              selectedChatIdRef.current == chat.id
                ? 0
                : unreadWhenNotSelectedChat;
            if (chat.id === message.chat_id) {
              return {
                ...chat,
                lastMessage: message.content,
                timestamp: message.created_at,
                unreadCount: unread,
              };
            }
            return chat;
          })
        );
      }
    )
    .subscribe();
  return sidebarChannel;
};
