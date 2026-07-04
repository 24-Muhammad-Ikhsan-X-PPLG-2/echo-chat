import type { FC } from 'react';

import { useMessageListScroll } from '@/features/chat/hooks/useMessageListScroll';
import type { ChatData } from '@/types/chat';

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
    const { containerRef, handleScrollEvent, isTyping } = useMessageListScroll(
        groups,
        fetchNextPage,
    );

    return (
        <div
            ref={containerRef}
            onScroll={handleScrollEvent}
            className="flex w-full flex-1 flex-col gap-5 overflow-y-auto border-b-2 p-4"
        >
            {groups.map((group) => (
                <div key={group.date} className="flex flex-col gap-5">
                    <p className="text-center text-xl font-bold">
                        {getDateLabel(group.date)}
                    </p>
                    {group.messages.map((item) => (
                        <ChatBubble message={item} key={item.id} />
                    ))}
                </div>
            ))}
            <ChatBubbleForTyping isTyping={isTyping} />
        </div>
    );
};

export default MessageGroupList;
