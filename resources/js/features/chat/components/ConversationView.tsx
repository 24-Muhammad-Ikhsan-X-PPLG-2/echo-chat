import type { FC } from 'react';
import type { ConversationData } from '@/types/conversation';
import useConversationView from '../hooks/useConversationView';
import ChatHeader from './ChatHeader';
import ChatInput from './ChatInput';
import Loading from './Loading';
import MessageGroupList from './MessageGroupList';

type Props = {
    selectedConversation: ConversationData;
};

const ConversationView: FC<Props> = ({ selectedConversation }) => {
    const {
        fetchNextPage,
        groups,
        isLoading,
        isOnline,
        conversationId,
        publicKey,
    } = useConversationView({ selectedConversation });

    return (
        <>
            {!groups || isLoading ? (
                <Loading />
            ) : (
                <>
                    <ChatHeader
                        name={selectedConversation.contact.username ?? ''}
                        online={isOnline}
                    />
                    <MessageGroupList
                        fetchNextPage={fetchNextPage}
                        groups={groups}
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
