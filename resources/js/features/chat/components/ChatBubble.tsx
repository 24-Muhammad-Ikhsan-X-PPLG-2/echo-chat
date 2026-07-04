import { usePage } from '@inertiajs/react';
import { CheckCheck, Clock, Dot } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { FC } from 'react';
import { useChatStore } from '@/stores/chatStore';
import type { ChatData } from '@/types/chat';

type ChatBubbleProps = {
    message: ChatData;
};

type ChatBubbleForTypingProps = {
    isTyping?: boolean;
};

export const ChatBubbleForTyping: FC<ChatBubbleForTypingProps> = ({
    isTyping = false,
}) => {
    return (
        <AnimatePresence mode="wait">
            {isTyping ? (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className={`flex w-fit flex-col`}
                    key={'typing_bubble'}
                >
                    <div
                        className={`flex w-fit items-center gap-1 border-2 bg-white px-3 py-2 shadow-[3px_3px_0px_#000]`}
                    >
                        {Array.from({ length: 3 }).map((_, idx) => (
                            <motion.div
                                animate={{ y: [0, -8, 0] }}
                                transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                    delay: idx * 0.3,
                                }}
                                key={idx}
                                className="size-fit"
                            >
                                <Dot size={24} />
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

const ChatBubble: FC<ChatBubbleProps> = ({ message }) => {
    const {
        auth: { user },
    } = usePage().props;
    const selectedConversation = useChatStore(
        (state) => state.selectedConversation,
    );
    const contacts = useChatStore((state) => state.contacts);
    const contact = selectedConversation
        ? contacts?.find((item) => item.id == selectedConversation!.id)
        : null;
    const isCurrentUser = message.sender.id === user.id;
    const time = new Date(message.created_at).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    });
    const read = contact
        ? new Date(message.created_at) <= new Date(contact?.last_read_at ?? '')
        : false;

    return (
        <div
            className={`flex w-fit flex-col ${
                isCurrentUser ? 'ml-auto items-end' : ''
            }`}
        >
            <div
                className={`w-fit border-2 px-3 py-2 ${
                    isCurrentUser
                        ? 'border-black bg-black text-white shadow-[3px_3px_0px_#4a5565]'
                        : 'bg-white shadow-[3px_3px_0px_#000]'
                }`}
            >
                <p>{message.content}</p>
            </div>
            <div
                className={`mt-1 flex items-center gap-2 ${
                    isCurrentUser ? 'justify-end' : ''
                }`}
            >
                <p className="text-sm text-gray-500">{time}</p>
                {message.pending ? (
                    <Clock size={18} className="text-black" />
                ) : isCurrentUser && !read ? (
                    <CheckCheck size={18} className="text-gray-500" />
                ) : isCurrentUser && read ? (
                    <CheckCheck size={18} className="text-blue-500" />
                ) : null}
            </div>
        </div>
    );
};

export default ChatBubble;
