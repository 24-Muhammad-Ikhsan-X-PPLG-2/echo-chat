import { Send } from 'lucide-react';
import type { FC } from 'react';

const Loading = () => {
    return (
        <div className="flex w-full flex-1 flex-col overflow-y-auto">
            <FakeChatHeader />
            <div className="flex w-full flex-1 flex-col gap-5 overflow-y-auto border-b-2 p-4">
                {Array.from({ length: 6 }).map((_, idx) => {
                    const isCurrentUser = idx % 2 == 0;

                    return (
                        <FakeChatBubble
                            key={idx}
                            isCurrentUser={isCurrentUser}
                        />
                    );
                })}
            </div>
            <FakeChatInput />
        </div>
    );
};

const FakeChatInput = () => {
    return (
        <form className="flex h-18 w-full items-center gap-4 p-4">
            <input
                type="text"
                className="h-12 flex-1 border-2 px-3 outline-none placeholder:text-gray-500"
                placeholder="Type a message..."
                disabled
            />
            <button
                type="submit"
                className="flex h-12 w-12 items-center justify-center bg-black text-white"
                disabled
            >
                <Send size={18} />
            </button>
        </form>
    );
};

type FakeChatBubbleProps = {
    isCurrentUser?: boolean;
};

const FakeChatBubble: FC<FakeChatBubbleProps> = ({ isCurrentUser = false }) => {
    return (
        <div
            className={`flex w-fit flex-col ${
                isCurrentUser ? 'ml-auto items-end' : ''
            }`}
        >
            <div
                className={`h-10 w-32 animate-pulse border-2 border-gray-500 bg-gray-500 shadow-[3px_3px_0px_#6a7282]`}
            ></div>
            {/* <div
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
            </div> */}
        </div>
    );
};

const FakeChatHeader = () => {
    return (
        <div className="flex h-20 w-full items-center justify-between border-b-2 p-4">
            <div className="flex items-center gap-2">
                <div className="flex size-12 animate-pulse items-center justify-center bg-gray-500 text-white"></div>
                <div className="flex flex-col gap-2">
                    <div className="h-2 w-16 animate-pulse bg-gray-500"></div>
                    <div className="h-2 w-12 animate-pulse bg-gray-500"></div>
                </div>
            </div>
        </div>
    );
};
export default Loading;
