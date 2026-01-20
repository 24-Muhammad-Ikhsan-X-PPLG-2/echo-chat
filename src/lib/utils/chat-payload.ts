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
  PostgrestResponse,
  RealtimePostgresChangesPayload,
  RealtimePostgresDeletePayload,
  RealtimePostgresInsertPayload,
  RealtimePostgresUpdatePayload,
} from "@supabase/supabase-js";
import { Dispatch, RefObject, SetStateAction } from "react";
import { createClient } from "../supabase/client/client";
import initDB from "../rxdb/init";

const supabase = createClient();

type SetChatsType = Dispatch<SetStateAction<Chat[] | undefined>>;
type SetMessagesType = Dispatch<SetStateAction<Message[]>>;

export const handlePayloadMessages = async (
  payload: RealtimePostgresChangesPayload<MessageDB>,
  setMessages: SetMessagesType,
  userId: string,
  chatId: string,
) => {
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
        isSent: false,
        sender_id: msg.sender_id,
        status: msg.status,
        type: msg.type,
        fileUrl: msg.file_url,
        fileName: msg.file_name,
        is_deleted: msg.is_deleted,
        created_at: msg.created_at,
      },
    ]);
    supabase
      .from("chat_participants")
      .update({
        unread_count: 0,
      })
      .eq("chat_id", chatId)
      .eq("user_id", userId)
      .then(({ error }) => {
        if (error) console.error(error);
      });
  }
  if (payload.eventType === "UPDATE") {
    const msg = payload.new;

    setMessages((prev) => {
      const findIndex = prev.findIndex((message) => message.id === msg.id);
      if (findIndex === -1) return prev;
      const updatedMessage = [...prev];
      updatedMessage[findIndex] = {
        ...updatedMessage[findIndex],
        content: msg.content,
        status: msg.status,
        is_deleted: msg.is_deleted,
      };
      return updatedMessage;
    });
  }
};

export const handlePayloadSidebarMessages = (
  payload: RealtimePostgresInsertPayload<MessageDB>,
  setChats: SetChatsType,
  selectedChatIdRef: RefObject<string | null>,
  userId: string,
) => {
  const message = payload.new;
  setChats((prev) => {
    if (!prev) return prev;
    return prev?.map((chat) => {
      if (chat.id === message.chat_id) {
        const isSelected = selectedChatIdRef.current === chat.id;
        const isFromOther = message.sender_id !== userId;

        const newUnreadCount = isSelected
          ? 0
          : isFromOther
            ? chat.unreadCount + 1
            : chat.unreadCount;
        return {
          ...chat,
          lastMessage: message.content,
          timestamp: message.created_at,
          unreadCount: newUnreadCount,
        };
      }
      return chat;
    });
  });
};

export const handlePayloadSidebarChats = async (
  payload: RealtimePostgresDeletePayload<ChatDB>,
  setChats: SetChatsType,
) => {
  const deletedId = payload.old.id;
  if (!deletedId) return;
  const db = await initDB();
  const doc = await db.chats.findOne(deletedId).exec();
  if (doc) {
    await doc.remove();
  }
  setChats((prev) => {
    if (!prev) return prev;
    return prev.filter((chat) => chat.id !== deletedId);
  });
};

export const handlePayloadSidebarChatParticipants = async (
  payload: RealtimePostgresChangesPayload<ChatParticipantsDB>,
  setChats: SetChatsType,
  userId: string,
) => {
  const db = await initDB();
  if (payload.eventType === "INSERT") {
    const newItem = payload.new;
    const { data: participants, error } = (await supabase
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
      )
      .eq("user_id", userId)
      .neq("chats.chat_participants.user_id", userId)
      .eq(
        "chat_id",
        newItem.chat_id,
      )) as PostgrestResponse<ChatParticipantWithChat>;
    if (!participants || error) return;
    const chat = participants[0].chats;
    const profileOtherParticipant =
      participants[0].chats?.chat_participants[0].profiles;
    const nameChat = chat?.is_group
      ? chat.name
      : profileOtherParticipant?.username;
    const newChat: Chat = {
      id: chat?.id ?? "",
      name: nameChat ?? "Unknown",
      avatar: nameChat?.slice(0, 2) ?? "??",
      lastMessage: chat?.last_message ?? "",
      lastMessageAt: chat?.last_message_at ?? "",
      timestamp: chat?.last_message_at ?? "",
      unreadCount: participants[0].unread_count,
      isOnline: profileOtherParticipant?.is_online ?? false,
      lastSeen: profileOtherParticipant?.last_seen ?? "",
      otherParticipantId: profileOtherParticipant?.id ?? "",
    };
    setChats((prev) => [...(prev || []), newChat]);
    await db.chats.insert(newChat);
  }
  if (payload.eventType === "DELETE") {
    const deletedId = payload.old.chat_id;
    if (!deletedId) return;
    const doc = await db.chats.findOne(deletedId).exec();
    if (doc) {
      await doc.remove();
    }
    setChats((prev) => {
      if (!prev) return prev;
      return prev.filter((chat) => chat.id !== deletedId);
    });
  }
};

export const handlePayloadProfiles = (
  payload: RealtimePostgresUpdatePayload<ProfilesDB>,
  setChats: SetChatsType,
) => {
  const profile = payload.new;
  setChats((prev) => {
    if (!prev) return prev;
    return prev?.map((chat) => {
      if (chat.otherParticipantId === profile.id) {
        return {
          ...chat,
          isOnline: profile.is_online,
          lastSeen: profile.last_seen,
        };
      }
      return chat;
    });
  });
};
