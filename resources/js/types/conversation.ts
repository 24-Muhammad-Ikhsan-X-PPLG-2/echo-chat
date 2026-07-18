export type Conversation = {
    data: ConversationData[];
};

export type ConversationData = {
    contact: ConversationContact;
    id: string;
    last_message?: ConversationLastMessage;
    last_message_at?: string;
    unread_count: number;
    last_read_at?: string;
    type: string;
    is_typing?: boolean;
    updated_at: string;
};

export type ConversationLastMessage = {
    content: string;
    message: string;
    iv: string;
    sender_id: string;
    message_type: string;
};

export type ConversationContact = {
    avatar_url?: string;
    id: string;
    username: string;
    public_key: string;
    last_seen?: string;
};

export type ConversationUnread = {
    conversation_id: string;
    user_id: string;
    last_read_at: string;
};
