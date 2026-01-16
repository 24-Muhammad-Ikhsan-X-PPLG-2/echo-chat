"use client";

import { createClient } from "@/lib/supabase/client/client";
import { Message, MessageDB } from "@/type/db";
import { PostgrestMaybeSingleResponse } from "@supabase/supabase-js";
import { Mic, Paperclip, Send, Smile } from "lucide-react";
import {
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";

const supabase = createClient();

type MessageComposerProps = {
  userId: string;
  chatId: string;
  senderId: string;
  setMessages: Dispatch<SetStateAction<Message[]>>;
};

const MessageComposer: FC<MessageComposerProps> = ({
  userId,
  chatId,
  senderId,
  setMessages,
}) => {
  const [message, setMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = async () => {
    if (message.trim()) {
      console.log("Sending message:", message);
      const idMsg = self.crypto.randomUUID();
      const nowDate = new Date().toISOString();
      const msg: Message = {
        id: idMsg,
        chatId: chatId,
        sender_id: senderId,
        content: message,
        timestamp: nowDate,
        created_at: nowDate,
        is_deleted: false,
        isSent: true,
        type: "text",
        status: "sent",
      };
      setMessages((prev) => [...prev, msg]);
      setMessage("");

      const { error: ErrorMessage, data } = (await supabase
        .from("messages")
        .insert({
          id: idMsg,
          chat_id: chatId,
          sender_id: senderId,
          content: message,
          status: "delivered",
        })
        .select()
        .maybeSingle()) as PostgrestMaybeSingleResponse<MessageDB>;
      if (data) {
        setMessages((prev) => {
          const findIndex = prev.findIndex((item) => item.id == idMsg);
          if (findIndex === -1) return prev;
          const newMsg = [...prev];
          newMsg[findIndex] = {
            id: data.id,
            chatId: data.chat_id,
            content: data.content,
            timestamp: data.created_at,
            isSent: data.sender_id === userId,
            sender_id: data.sender_id,
            status: data.status,
            type: data.type,
            fileUrl: data.file_url,
            fileName: data.file_name,
            is_deleted: data.is_deleted,
            created_at: data.created_at,
          };
          return newMsg;
        });
      }

      if (ErrorMessage) console.error(ErrorMessage);
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    // Auto-resize textarea
    e.target.style.height = "auto";
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
  };
  return (
    <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
      <div className="flex items-end gap-2">
        {/* Attachment Button */}
        <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0">
          <Paperclip className="w-5 h-5 text-gray-600 dark:text-gray-400" />
        </button>

        {/* Message Input Container */}
        <div className="flex-1 flex items-end bg-gray-100 dark:bg-gray-800 rounded-2xl px-4 py-2">
          {/* Emoji Button */}
          <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors flex-shrink-0 mr-2">
            <Smile className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            value={message}
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            rows={1}
            className="flex-1 bg-transparent border-none outline-none resize-none text-gray-900 dark:text-white placeholder-gray-500 max-h-[120px] py-1"
          />
        </div>

        {/* Send or Mic Button */}
        {message.trim() ? (
          <button
            onClick={handleSend}
            className="p-2.5 bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg hover:shadow-purple-500/50 dark:hover:shadow-purple-500/30 rounded-lg transition-all flex-shrink-0"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        ) : (
          <button className="p-2.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors flex-shrink-0">
            <Mic className="w-5 h-5 text-gray-600 dark:text-gray-400" />
          </button>
        )}
      </div>

      {/* Helper Text */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 text-center">
        Press Enter to send, Shift + Enter for new line
      </p>
    </div>
  );
};

export default MessageComposer;
