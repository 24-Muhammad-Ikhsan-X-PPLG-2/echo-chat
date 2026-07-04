import { Send } from 'lucide-react';
import type { FC } from 'react';
import { useSendMessage } from '@/features/chat/hooks/useSendMessage';

type Props = {
    conversationId: string;
    publicKey: string;
};

const ChatInput: FC<Props> = ({ conversationId, publicKey }) => {
    const { message, handleChangeMessage, handleSubmit, isSending } =
        useSendMessage(conversationId, publicKey);

    return (
        <form
            onSubmit={handleSubmit}
            className="flex h-18 w-full items-center gap-4 p-4"
        >
            <input
                type="text"
                value={message}
                onChange={({ target: { value } }) => handleChangeMessage(value)}
                className="h-12 flex-1 border-2 px-3 outline-none placeholder:text-gray-500"
                placeholder="Type a message..."
                disabled={isSending}
            />
            <button
                type="submit"
                className="flex h-12 w-12 items-center justify-center bg-black text-white"
                disabled={isSending}
            >
                <Send size={18} />
            </button>
        </form>
    );
};

export default ChatInput;
