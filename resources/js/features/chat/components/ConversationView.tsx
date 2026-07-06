import { useCallback, useEffect, useMemo, useState, type FC } from 'react';
import { useConversationMessages } from '@/features/chat/hooks/useConversationMessages';
import type { ConversationData } from '@/types/conversation';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import Loading from './Loading';
import MessageGroupList from './MessageGroupList';
import { useChatStore } from '@/stores/chatStore';

type Props = {
    selectedConversation: ConversationData;
};

const ConversationView: FC<Props> = ({ selectedConversation }) => {
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

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <ChatHeader
                        name={selectedConversation.contact.username ?? ''}
                        online={isOnline}
                    />
                    <MessageGroupList
                        fetchNextPage={fetchNextPage}
                        groups={groups!}
                    />
                    <ChatInput
                        publicKey={publicKey}
                        conversationId={conversationId}
                    />
                </>
            )}
        </>
    );
};

export default ConversationView;
