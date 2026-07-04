import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';
import type { UIEvent } from 'react';

import { useChatStore } from '@/stores/chatStore';
import type { ChatData } from '@/types/chat';

type MessageGroup = {
    date: string;
    messages: ChatData[];
};

export function useMessageListScroll(
    groups: MessageGroup[],
    fetchNextPage: () => Promise<unknown>,
) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isAtBottom, setIsAtBottom] = useState(false);
    const shouldScrollToBottom = useRef(true);
    const selectedConversation = useChatStore(
        (state) => state.selectedConversation,
    );
    const prevHeightRef = useRef(0);
    const contacts = useChatStore((state) => state.contacts);
    const contact = selectedConversation
        ? contacts?.find((item) => item.id === selectedConversation.id)
        : null;
    useEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const scrollToBottom = () => {
            container.scrollTop = container.scrollHeight;
        };

        if (shouldScrollToBottom.current && groups.length !== 0) {
            scrollToBottom();
            shouldScrollToBottom.current = false;
        }

        if (isAtBottom) {
            scrollToBottom();
        }
    }, [groups, isAtBottom, contact?.is_typing]);

    const handleScroll = useCallback(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        const distanceFromBottom =
            container.scrollHeight -
            container.scrollTop -
            container.clientHeight;

        setIsAtBottom(distanceFromBottom < 50);
    }, []);

    const loadMore = useCallback(async () => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        prevHeightRef.current = container.scrollHeight;
        await fetchNextPage();
    }, [fetchNextPage]);

    const handleScrollEvent = useCallback(
        async (event: UIEvent<HTMLDivElement>) => {
            handleScroll();

            if (event.currentTarget.scrollTop === 0) {
                await loadMore();
            }
        },
        [handleScroll, loadMore],
    );
    useLayoutEffect(() => {
        const container = containerRef.current;

        if (!container) {
            return;
        }

        if (prevHeightRef.current === 0) {
            return;
        }

        const newHeight = container.scrollHeight;
        container.scrollTop = newHeight - prevHeightRef.current;
        prevHeightRef.current = 0;
    }, [groups]);

    return {
        containerRef,
        handleScrollEvent,
        isTyping: contact?.is_typing,
    };
}
