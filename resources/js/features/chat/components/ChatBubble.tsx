import { usePage } from '@inertiajs/react';
import { CheckCheck, Clock, Dot } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { FC } from 'react';
import { useChatStore, useStateGlobal } from '@/stores/chatStore';
import type { ChatData } from '@/types/chat';

type ChatBubbleProps = {
    message: ChatData;
};

type ChatBubbleForTypingProps = {
    isTyping?: boolean;
    padding?: boolean;
};

export const ChatBubbleForTyping: FC<ChatBubbleForTypingProps> = ({
    isTyping = false,
    padding = false,
}) => {
    return (
        <AnimatePresence mode="wait">
            {isTyping ? (
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    className={`flex w-fit flex-col ${padding && "pl-4 pb-4"}`}
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
                className={`w-fit border-2 px-3 py-2 flex flex-col ${
                    isCurrentUser
                        ? 'border-black bg-black text-white items-end shadow-[3px_3px_0px_#4a5565]'
                        : 'bg-white shadow-[3px_3px_0px_#000]'
                }`}
            >
                <ImagesView message={message}/>
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

type ImagesViewProps = {
    message: ChatData;
}

const ImagesView: FC<ImagesViewProps> = ({ message }) => {
    const setPreviewImage = useStateGlobal((state) => state.setPreviewImage);
    const visibleImages = message.attachments.slice(0, 4);
    const remaining = message.attachments.length - visibleImages.length;

    if (message.type !== "image") {
        return;
    }

    const handleClick = (initialIndex: number) => {
        const images = message.attachments.map((image) => ({
                url: image.url
        }))
        setPreviewImage({
            images,
            initialIndex,
        })
    }


    return (
            <div
                className={`grid gap-2 w-fit mb-1 h-fit ${visibleImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}
            >
                {visibleImages.map((image, idx) => (
                    <div
                        key={`${image.message_id}-${image.id}-${idx}`}
                        className="h-40 w-40 relative cursor-pointer bg-white"
                        onClick={() => handleClick(idx)}
                    >
                        <img
                            src={image.url}
                            loading="lazy"
                            className="h-full w-full object-cover object-center"
                            alt=""
                        />
                        {idx === 3 && remaining > 0 && (
                            <div className='absolute w-full h-full bg-black/50 flex justify-center items-center top-0 left-0'>
                                <p className='text-xl font-bold'>+{remaining}</p>
                            </div>
                        )}
                        <div className=''></div>
                    </div>
                ))}
            </div>
    )
}

export default ChatBubble;
