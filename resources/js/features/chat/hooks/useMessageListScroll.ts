import {
    useCallback,
    useEffect,
    useLayoutEffect,
    useRef,
    useState,
} from 'react';

import { useChatStore } from '@/stores/chatStore';
import type { ChatData } from '@/types/chat';

type MessageGroup = {
    date: string;
    messages: ChatData[];
};

type Props = {
    groups: MessageGroup[];
    fetchNextPage: () => Promise<unknown>;
};

export function useMessageListScroll({ groups, fetchNextPage }: Props) {
    const selectedConversation = useChatStore(
        (state) => state.selectedConversation,
    );

    const contacts = useChatStore((state) => state.contacts);

    const contact =
        selectedConversation && contacts
            ? contacts.find((item) => item.id === selectedConversation.id)
            : null;

    const containerRef = useRef<HTMLDivElement>(null);

    const [isAtBottom, setIsAtBottom] = useState(true);

    const shouldScrollToBottom = useRef(true);

    const prevScrollHeight = useRef(0);

    const isLoadingMore = useRef(false);

    const scrollToBottom = useCallback((behavior: ScrollBehavior = 'auto') => {
        const container = containerRef.current;

        if (!container) return;

        container.scrollTo({
            top: container.scrollHeight,
            behavior,
        });
    }, []);

    // ketika pindah conversation
    useEffect(() => {
        shouldScrollToBottom.current = true;
    }, [selectedConversation?.id]);

    // auto scroll pertama kali / ketika sedang di bawah
    useEffect(() => {
        if (!groups.length) return;

        if (shouldScrollToBottom.current) {
            scrollToBottom();

            shouldScrollToBottom.current = false;

            return;
        }

        if (isAtBottom) {
            scrollToBottom();
        }
    }, [groups, isAtBottom, scrollToBottom]);

    const loadMore = useCallback(async () => {
        const container = containerRef.current;

        if (!container) return;

        if (isLoadingMore.current) return;

        isLoadingMore.current = true;

        prevScrollHeight.current = container.scrollHeight;

        await fetchNextPage();
    }, [fetchNextPage]);

    // menjaga posisi scroll setelah prepend message
    // pake useLayoutEffect karena biar menjaga posisi scroll pada saat state sudah berubah.
    useLayoutEffect(() => {
        if (!isLoadingMore.current) return;

        const container = containerRef.current;

        if (!container) return;

        const newHeight = container.scrollHeight;

        container.scrollTop += newHeight - prevScrollHeight.current;

        prevScrollHeight.current = 0;

        isLoadingMore.current = false;
    }, [groups]);

    const handleScroll = useCallback(async () => {
        const container = containerRef.current;

        if (!container) return;

        const distanceFromBottom =
            container.scrollHeight -
            container.scrollTop -
            container.clientHeight;

        setIsAtBottom(distanceFromBottom < 50);

        if (container.scrollTop <= 0) {
            await loadMore();
        }
    }, [loadMore]);

    return {
        containerRef,
        handleScroll,
        isTyping: contact?.is_typing,
    };
}
