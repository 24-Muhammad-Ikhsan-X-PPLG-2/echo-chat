import { ChevronLeft, Ellipsis, Phone, Video } from 'lucide-react';
import type { FC } from 'react';
import { useChatStore } from '@/stores/chatStore';

type ChatHeaderProps = {
    name: string;
    online?: boolean;
};

const ChatHeader: FC<ChatHeaderProps> = ({ name, online = false }) => {
    const setSelectedConversation = useChatStore(
        (state) => state.setSelectedConversation,
    );

    return (
        <div className="flex h-20 w-full items-center justify-between border-b-2 p-4">
            <div className="flex items-center gap-2">
                <button
                    className="block h-fit w-fit md:hidden"
                    onClick={() => setSelectedConversation(null)}
                >
                    <ChevronLeft size={30} />
                </button>
                <div className="flex size-12 items-center justify-center bg-black text-white">
                    <p className="text-xl font-bold">
                        {name.slice(0, 1).toUpperCase()}
                    </p>
                </div>
                <div className="">
                    <p className="text-xl font-semibold">{name}</p>
                    <p className="text-gray-500">
                        {online ? 'Online' : 'Offline'}
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-5">
                <Phone size={24} className="cursor-pointer text-gray-500" />
                <Video size={24} className="cursor-pointer text-gray-500" />
                <Ellipsis size={24} className="cursor-pointer text-gray-500" />
            </div>
        </div>
    );
};

export default ChatHeader;
