import type { FC } from 'react';
import type { ChatData } from '@/types/chat';

import { useMessageListScroll } from '../hooks/useMessageListScroll';
import { getDateLabel } from '../utils';
import ChatBubble, { ChatBubbleForTyping } from './ChatBubble';

type Props = {
    groups: {
        date: string;
        messages: ChatData[];
    }[];
    fetchNextPage: () => Promise<any>;
};

const MessageGroupList: FC<Props> = ({ groups, fetchNextPage }) => {
    const { containerRef, handleScroll, isTyping } =
        useMessageListScroll({
            groups,
            fetchNextPage,
        });

    return (
        <div
            ref={containerRef}
            onScroll={handleScroll}
            className="h-full overflow-y-auto"
        >
            {groups.map((group) => (
                <div key={group.date}>
                    <div className="sticky top-3 z-10 mb-5 flex justify-center">
                        <span className="rounded-full border border-gray-300 bg-white px-3 py-1 text-sm font-medium shadow">
                            {getDateLabel(group.date)}
                        </span>
                    </div>

                    {group.messages.map((message) => (
                            <ChatBubble message={message} key={message.id} />
                    ))}
                </div>
            ))}

            <ChatBubbleForTyping isTyping={isTyping} padding />
        </div>
    );
};

export default MessageGroupList;
