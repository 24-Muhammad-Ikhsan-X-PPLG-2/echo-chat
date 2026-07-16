import { usePage } from '@inertiajs/react';
import { Image } from 'lucide-react';
import type { FC } from 'react';

import { useChatStore } from '@/stores/chatStore';
import type { ConversationData } from '@/types/conversation';
import { shortText } from '../utils';

type ContactProps = {
    active?: boolean;
    item: ConversationData;
};

const Contact: FC<ContactProps> = ({ active = false, item }) => {
    const setSelectedConversation = useChatStore(
        (state) => state.setSelectedConversation,
    );
    const isImage = item.last_message?.message_type === 'image';
    const {
        auth: { user },
    } = usePage().props;

    return (
        <div
            onClick={() => setSelectedConversation(item)}
            className={`group flex w-full cursor-pointer items-center gap-3 border-b border-gray-400 p-4 transition-all ${active ? 'bg-gray-100' : 'hover:bg-gray-100'}`}
        >
            <div
                className={`relative flex size-12 items-center justify-center border-2 text-center transition-all ${active ? 'bg-black text-white' : 'group-hover:bg-black group-hover:text-white'}`}
            >
                {item.unread_count !== 0 && (
                    <div className="absolute -top-3 -right-3 flex size-6 items-center justify-center bg-black text-white transition-colors group-hover:bg-white group-hover:text-black">
                        <p className="text-xs font-bold">{item.unread_count}</p>
                    </div>
                )}
                <p className="text-xl">
                    {item.contact.username.slice(0, 1).toUpperCase()}
                </p>
            </div>
            <div className="max-w-50 text-wrap wrap-break-word">
                <p className="text-xl font-bold">{item.contact.username}</p>
                {item.last_message &&
                    (user.id == item.last_message.sender_id ? (
                        <p className="flex gap-1">
                            You:{' '}
                            <span className="flex items-center gap-1 text-gray-500">
                                {isImage && (
                                    <Image size={18} />
                                )}
                                {shortText(item.last_message.message, isImage ? 16 : 21)}
                            </span>
                        </p>
                    ) : (
                        <p className="flex gap-1 text-gray-500">
                            {isImage && (
                                <Image size={18}/>
                            )}
                            {shortText(item.last_message.message, isImage ? 16 : 21)}
                        </p>
                    ))}
            </div>
        </div>
    );
};
export default Contact;
