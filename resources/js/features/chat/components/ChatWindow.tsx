import { MessageCircle } from 'lucide-react';
import useChatWindow from '../hooks/useChatWindow';
import ConversationView from './ConversationView';


const ChatWindow = () => {
    const { selectedConversation } = useChatWindow();

    return (
        <>
            {!selectedConversation && <EmptyState />}
            <div
                className={`absolute top-0 left-0 h-screen w-full flex-col bg-white transition-all duration-300 ease-in-out ${
                    selectedConversation
                        ? 'flex flex-1 translate-x-0'
                        : 'w-0 translate-x-full opacity-0'
                } md:relative md:translate-x-0 ${
                    !selectedConversation ? 'md:hidden' : 'md:flex md:flex-1'
                }`}
            >
                {selectedConversation && (
                    <ConversationView
                        selectedConversation={selectedConversation}
                    />
                )}
            </div>
        </>
    );
};

const EmptyState = () => {
    return (
        <div
            key="empty"
            className="hidden flex-1 flex-col items-center justify-center gap-2 md:flex"
        >
            <MessageCircle size={50} />
            <p className="text-center text-4xl">Start Chatting</p>
        </div>
    );
};

export default ChatWindow;
