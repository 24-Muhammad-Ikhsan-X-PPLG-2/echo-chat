import { usePage } from '@inertiajs/react';
import type { InfiniteData } from '@tanstack/react-query';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import echo from '@/lib/echo';
import { KeyStorage } from '@/lib/key-storage';
import { fetchApi } from '@/lib/utils';
import { useChatStore } from '@/stores/chatStore';
import type { Chat, ChatData } from '@/types/chat';

import { E2EE, SharedKeyCache } from '../e2ee';
import { groupedMessages } from '../utils';

type UseConversationMessagesResult = {
    groups:
        | {
              date: string;
              messages: ChatData[];
          }[]
        | undefined;
    fetchNextPage: () => Promise<unknown>;
    isLoading: boolean;
};

export function useConversationMessages(
    conversationId: string,
    publicKey: string,
): UseConversationMessagesResult {
    const queryClient = useQueryClient();
    const [decryptedMessages, setDecryptedMessages] = useState<ChatData[]>([]);
    const {
        auth: { user },
    } = usePage().props;
    const contacts = useChatStore((state) => state.contacts);
    const setContacts = useChatStore((state) => state.setContacts);
    const selectedConversation = useChatStore(
        (state) => state.selectedConversation,
    );
    const activeConversationIdRef = useRef(conversationId);

    useEffect(() => {
        activeConversationIdRef.current = conversationId;
    }, [conversationId]);

    const queryKey = ['messages', conversationId];
    const { data, fetchNextPage, isLoading } = useInfiniteQuery<Chat>({
        queryKey,
        queryFn: async ({ pageParam = 1 }) => {
            return (await fetchApi({
                url: `/conversations/${conversationId}/messages?page=${pageParam}`,
            })) as Chat;
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage) => {
            const currentPage = lastPage.meta.current_page;
            const lastPageNumber = lastPage.meta.last_page;

            return currentPage < lastPageNumber ? currentPage + 1 : undefined;
        },
    });

    const messages = useMemo(
        () => [...(data?.pages.flatMap((page) => page.data) ?? [])].reverse(),
        [data],
    );

    const groups = useMemo(
        () => groupedMessages(decryptedMessages),
        [decryptedMessages],
    );

    const updateLastRead = useCallback(async () => {
        await fetchApi({
            url: `/conversations/${conversationId}/read`,
            method: 'PATCH',
        });
    }, [conversationId]);

    const getDecryptedMessage = useCallback(
        async ({
            conversationId,
            messages,
            publicKey,
        }: {
            conversationId: string;
            publicKey: string;
            messages: ChatData[];
        }) => {
            const privateKey = await KeyStorage.get();

            if (!privateKey) {
                throw new Error('Private key not found.');
            }

            const sharedKey = await SharedKeyCache.getOrCreate(
                conversationId,
                privateKey,
                publicKey,
            );

            return Promise.all(
                messages.map(async (message) => ({
                    ...message,
                    content: await E2EE.decryptMessage(
                        sharedKey,
                        message.content,
                        message.iv,
                    ),
                })),
            );
        },
        [],
    );

    useEffect(() => {
        if (!conversationId) {
            return;
        }

        const channel = echo.private(`conversation.${conversationId}`);

        const onMessageSent = async (event: { message: ChatData }) => {
            queryClient.setQueryData<InfiniteData<Chat>>(
                ['messages', conversationId],
                (old) => {
                    if (!old) {
                        return old;
                    }

                    if (event.message.sender.id === user.id) {
                        return old;
                    }

                    return {
                        ...old,
                        pages: old.pages.map((page, index) => {
                            if (index !== 0) {
                                return page;
                            }

                            return {
                                ...page,
                                data: [event.message, ...page.data],
                            };
                        }),
                    };
                },
            );

            await updateLastRead();
        };

        const onTypingUpdate = (event: {
            user_id: string;
            is_typing: boolean;
        }) => {
            if (!contacts) {
                return;
            }

            setContacts((prev) => {
                if (!prev) {
                    return prev;
                }

                const index = prev.findIndex(
                    (item) => item.contact.id === event.user_id,
                );

                if (index === -1) {
                    return prev;
                }

                const next = [...prev];
                next[index] = {
                    ...next[index],
                    is_typing: event.is_typing,
                };

                return next;
            });
        };

        const markConversationRead = async () => {
            if (!contacts) {
                return;
            }

            setContacts((prev) => {
                if (!prev) {
                    return prev;
                }

                const index = prev.findIndex(
                    (item) =>
                        item.contact.id === selectedConversation?.contact.id,
                );

                if (index === -1) {
                    return prev;
                }

                const next = [...prev];
                next[index] = {
                    ...next[index],
                    unread_count: 0,
                };

                return next;
            });

            await updateLastRead();
        };

        channel.listen('.message.sent', onMessageSent);
        channel.listen('.message.typing', onTypingUpdate);

        void markConversationRead();

        return () => {
            channel.stopListening('.message.sent');
            channel.stopListening('.message.typing');
            echo.leave(`conversation.${conversationId}`);
        };
    }, [
        conversationId,
        queryClient,
        selectedConversation?.contact.id,
        setContacts,
        updateLastRead,
        user.id,
    ]);

    useEffect(() => {
        let cancelled = false;

        void (async () => {
            const decrypted = await getDecryptedMessage({
                conversationId,
                messages,
                publicKey,
            });

            if (
                !cancelled &&
                activeConversationIdRef.current === conversationId
            ) {
                setDecryptedMessages(decrypted);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [conversationId, getDecryptedMessage, messages, publicKey]);

    return {
        groups,
        fetchNextPage,
        isLoading,
    };
}
