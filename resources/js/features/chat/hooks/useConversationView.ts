import { useEffect, useMemo, useState } from 'react';
import { useChatStore } from '@/stores/chatStore';
import type { ConversationData } from '@/types/conversation';
import { useConversationMessages } from './useConversationMessages';

const useConversationView = ({
    selectedConversation,
}: {
    selectedConversation: ConversationData;
}) => {
    const [now, setNow] = useState(Date.now());
    const contacts = useChatStore((state) => state.contacts);
    const conversationId = selectedConversation.id;
    const publicKey = selectedConversation.contact.public_key;
    const last_seen =
        contacts?.find((item) => item.id === selectedConversation.id)?.contact
            .last_seen ?? null;
    const { groups, fetchNextPage, isLoading } = useConversationMessages(
        conversationId,
        publicKey,
    );

    useEffect(() => {
        setNow(Date.now());
        const id = setInterval(() => {
            setNow(Date.now());
        }, 10000);

        return () => clearInterval(id);
    }, []);
    const isOnline = useMemo(() => {
        if (!last_seen) return false;

        return now - new Date(last_seen).getTime() < 30000;
    }, [now, last_seen]);

    return {
        isOnline,
        groups,
        fetchNextPage,
        isLoading,
        publicKey,
        conversationId,
    };
};

export default useConversationView;
