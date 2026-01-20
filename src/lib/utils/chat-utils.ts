"use client";

import {
  Chat,
  ChatDB,
  ChatParticipantsDB,
  ChatParticipantWithChat,
  Message,
  MessageDB,
  ProfilesDB,
} from "@/type/db";
import {
  PostgrestMaybeSingleResponse,
  PostgrestResponse,
  RealtimePostgresChangesPayload,
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from "@supabase/supabase-js";
import { createClient } from "../supabase/client/client";
import { Dispatch, RefObject, SetStateAction } from "react";
import initDB from "../rxdb/init";

const supabase = createClient();

// di file ini juga kadang nge blank gwe aowkwkw

export const isUserReallyOnline = (
  lastSeenParam: string,
  isOnline: boolean,
) => {
  const twoMinutesAgo = new Date(Date.now() - 2 * 60 * 1000);
  const lastSeen = new Date(lastSeenParam);

  // User dianggap online JIKA (is_online true) DAN (last_seen masih baru)
  return isOnline && lastSeen > twoMinutesAgo;
};

export const updateUserOnline = async (
  status: "online" | "offline",
  userId: string,
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

export const updateDatabaseStatus = (
  status: "online" | "offline",
  userId: string,
) => {
  fetch("/api/presence", {
    method: "POST",
    body: JSON.stringify({ userId, status }),
    headers: { "Content-Type": "application/json" },
    keepalive: true, // PENTING: Agar bisa jalan pas ditutup tab nya
  });
};

// jujur kode ini digenerate gemini ai, bukan gua yg nulis, gua hanya menyesuaikan kode yg digenerate gemini ke kasus aplikasi gua.
export const fetchChats = async (userId: string, page = 0, limit = 20) => {
  const db = await initDB();
  const skip = page * limit;

  // 1. Ambil dari Local DB dulu (Pagination Lokal)
  const chatsLocalDB = await db.chats
    .find({
      sort: [{ lastMessageAt: "desc" }],
      limit: limit,
      skip: skip,
    })
    .exec();

  const localData = chatsLocalDB.map((chat) => chat.toJSON());

  // 2. Ambil dari Supabase (Pagination API)
  const { data, error, count } = (await supabase
    .from("chat_participants")
    .select(
      `
      unread_count,
      chat_id,
      chats (
        id, is_group, name, last_message, last_message_at,
        chat_participants!inner (
          profiles ( id, username, avatar_url, is_online, last_seen )
        )
      )
    `,
      { count: "exact" },
    )
    .eq("user_id", userId)
    .neq("chats.chat_participants.user_id", userId)
    .order("chats(last_message_at)", { ascending: false }) // Pastikan urutan sama
    .range(
      skip,
      skip + limit - 1,
    )) as PostgrestResponse<ChatParticipantWithChat>;

  if (error || !data)
    return {
      data: localData,
      count: 0,
    };

  const formattedChats = data.map((item) => {
    const chat = item.chats;
    // Karena kita sudah filter .neq user_id di atas, index 0 pasti lawan bicara
    const otherParticipant = chat?.chat_participants?.[0]?.profiles;

    const nameChat = chat?.is_group ? chat.name : otherParticipant?.username;

    return {
      id: chat?.id ?? "",
      name: nameChat ?? "Unknown",
      avatar: nameChat?.slice(0, 2) ?? "??",
      lastMessage: chat?.last_message ?? "",
      lastMessageAt: chat?.last_message_at ?? "",
      timestamp: chat?.last_message_at ?? "",
      unreadCount: item.unread_count,
      isOnline: otherParticipant?.is_online ?? false,
      lastSeen: otherParticipant?.last_seen ?? "",
      otherParticipantId: otherParticipant?.id ?? "",
    };
  });

  // 4. Sinkronisasi ke Local DB (Upsert agar data lama terupdate)
  // Gunakan bulkUpsert agar jika ada perubahan lastMessage, data lokal terupdate
  const supabaseIds = new Set(formattedChats.map((c) => c.id));
  const localChats = await db.chats.find().exec();
  const idsToRemove = localChats
    .map((doc) => doc.id)
    .find((id) => !supabaseIds.has(id));
  if (idsToRemove && idsToRemove.length > 0) {
    db.chats.bulkRemove([idsToRemove]);
  }
  db.chats.bulkUpsert(formattedChats);
  return {
    data: formattedChats,
    totalCount: count || 0,
    hasMore: skip + limit < (count || 0),
  };
};

export const subscribeProfiles = (
  onPayload: (payload: RealtimePostgresUpdatePayload<ProfilesDB>) => void,
) => {
  const channelProfiles = supabase
    .channel("profiles-channel")
    .on(
      "postgres_changes",
      { event: "UPDATE", schema: "public", table: "profiles" },
      onPayload,
    )
    .subscribe();
  return channelProfiles;
};

export const fetchMessages = async (
  chatId: string,
  userId: string,
  page = 0,
  limit = 25,
) => {
  const skip = page * limit;
  const { data, count } = (await supabase
    .from("messages")
    .select("*", { count: "exact" })
    .eq("chat_id", chatId)
    .order("created_at", { ascending: false })
    .range(skip, skip + limit - 1)) as PostgrestResponse<MessageDB>;
  if (!data) return;

  const newMessages = data
    .map((msg) => ({
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
    }))
    .reverse();
  const updatedChatIds = new Set(data.map((item) => item.chat_id));
  supabase
    .from("chat_participants")
    .update({
      unread_count: 0,
    })
    .eq("chat_id", chatId)
    .eq("user_id", userId);
  return {
    newMessages,
    updatedChatIds,
    hasMoreMessages: skip + limit < (count || 0),
  };
};

export const subscribeMessages = (
  chatId: string,
  onPayload: (payload: RealtimePostgresChangesPayload<MessageDB>) => void,
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
      onPayload,
    )
    .subscribe();
  return messageChannel;
};

export const sidebarSubscribeChannel = (
  userId: string,
  onPayloadSidebarMessages: (
    payload: RealtimePostgresInsertPayload<MessageDB>,
  ) => void,
  onPayloadSidebarChats: (
    payload: RealtimePostgresDeletePayload<ChatDB>,
  ) => void,
  onPayloadSidebarChatParticipant: (
    payload: RealtimePostgresChangesPayload<ChatParticipantsDB>,
  ) => void,
) => {
  const sidebarMessagesChannel = supabase
    .channel("sidebar-messages")
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages",
      },
      onPayloadSidebarMessages,
    )
    .subscribe();
  const sidebarChatsChannel = supabase
    .channel("sidebar-chats")
    .on(
      "postgres_changes",
      {
        event: "DELETE",
        schema: "public",
        table: "chats",
      },
      onPayloadSidebarChats,
    )
    .subscribe();
  const sidebarChatParticipantsChannel = supabase
    .channel("sidebar-chat-participants")
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "chat_participants",
        filter: `user_id=eq.${userId}`,
      },
      onPayloadSidebarChatParticipant,
    )
    .subscribe();
  return {
    sidebarMessagesChannel,
    sidebarChatsChannel,
    sidebarChatParticipantsChannel,
  };
};
