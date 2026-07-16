import { usePage } from '@inertiajs/react';
import { useVirtualizer } from '@tanstack/react-virtual';
import { useMemo } from 'react';
import type { FC } from "react"

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
    const { auth: { user } } = usePage().props
    const items = useMemo(() => {
        return groups.flatMap((group) => [
            {
                type: 'header' as const,
                date: group.date
            },
            ...group.messages.map((message) => ({
                type: 'message' as const,
                message,
            }))
        ])
    }, [groups])
    const { containerRef, handleScrollEvent, isTyping } = useMessageListScroll(
        groups,
        fetchNextPage,
    );
    const rowVirtualizer = useVirtualizer({
        count: items.length,
        getScrollElement: () => containerRef.current,
        estimateSize: () => 150,
        overscan: 12,
    })

    return (
        <div
            ref={containerRef}
            onScroll={handleScrollEvent}
            className="overflow-y-auto h-full"
        >
            <div
                style={{
                    height: rowVirtualizer.getTotalSize(),
                    position: "relative",
                }}
            >
                {rowVirtualizer.getVirtualItems().map(virtualRow => {
                    const item = items[virtualRow.index];

                    return (
                        <div
                            key={virtualRow.key}
                            ref={rowVirtualizer.measureElement}
                            data-index={virtualRow.index}
                            style={{
                                position: "absolute",
                                top: virtualRow.start,
                                left: 0,
                                width: "100%",
                            }}
                        >
                            <div className={`${item.type === "message" && item.message.sender.id === user.id ? "pr-4" : "pl-4"} pb-5`}>
                                {item.type === "header" ? (
                                    <p className="text-center font-bold">
                                        {getDateLabel(item.date)}
                                    </p>
                                ) : (
                                    <ChatBubble message={item.message} />
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
            <ChatBubbleForTyping isTyping={isTyping} padding />
        </div>
    );
};

export default MessageGroupList;
