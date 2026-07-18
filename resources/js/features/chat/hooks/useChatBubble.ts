import { usePage } from '@inertiajs/react';
import { useChatStore } from '@/stores/chatStore';
import type { ChatData } from '@/types/chat';

const useChatBubble = ({ message }: { message: ChatData }) => {
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

    return {
        isCurrentUser,
        time,
        read,
    };
};

export default useChatBubble;
