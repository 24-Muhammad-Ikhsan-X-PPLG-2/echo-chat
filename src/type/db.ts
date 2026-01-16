export interface Chat {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageAt: string;
  timestamp: string;
  unreadCount: number;
  isOnline: boolean;
  isTyping?: boolean;
  lastSeen: string;
  otherParticipantId: string;
}

export interface ChatDB {
  id: string;
  is_group: boolean;
  name: string;
  last_message: string;
  last_message_at: string;
  created_at: string;
}

export interface Message {
  id: string;
  chatId: string;
  sender_id: string;
  content: string;
  timestamp: string;
  isSent: boolean;
  status?: "sent" | "delivered" | "read";
  type?: "text" | "image" | "file";
  fileUrl?: string;
  fileName?: string;
  is_deleted: boolean;
  created_at: string;
}

export interface MessageDB {
  id: string;
  chat_id: string;
  sender_id: string;
  content: string;
  type: "text" | "image" | "file";
  file_url: string;
  file_name: string;
  status: "sent" | "delivered" | "read";
  created_at: string;
  is_deleted: boolean;
}

export type ChatParticipantWithChat = {
  unread_count: number;
  chats: {
    id: string;
    is_group: boolean;
    name: string | null;
    last_message: string | null;
    last_message_at: string | null;

    chat_participants: {
      user_id: string;
      profiles: {
        id: string;
        username: string | null;
        avatar_url: string | null;
        is_online: boolean | null;
        last_seen: string;
      } | null;
    }[];
  } | null;
};

export type ProfilesDB = {
  id: string;
  updated_at: string;
  username: string;
  email: string;
  avatar_url: string;
  is_online: boolean;
  last_seen: string;
  bio: string;
};
