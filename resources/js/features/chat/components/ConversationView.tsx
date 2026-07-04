import type { FC } from 'react';
import { useConversationMessages } from '@/features/chat/hooks/useConversationMessages';
import type { ConversationData } from '@/types/conversation';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import Loading from './Loading';
import MessageGroupList from './MessageGroupList';

type Props = {
    selectedConversation: ConversationData;
};

const ConversationView: FC<Props> = ({ selectedConversation }) => {
    const conversationId = selectedConversation.id;
    const publicKey = selectedConversation.contact.public_key;

    const { groups, fetchNextPage, isLoading } = useConversationMessages(
        conversationId,
        publicKey,
    );

    return (
        <>
            {isLoading ? (
                <Loading />
            ) : (
                <>
                    <ChatHeader
                        name={selectedConversation.contact.username ?? ''}
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
