import { usePage } from '@inertiajs/react';
import {
    InfiniteData,
    useMutation,
    useQueryClient,
} from '@tanstack/react-query';
import type { FormEvent } from 'react';
import { useCallback, useRef, useState } from 'react';

import { KeyStorage } from '@/lib/key-storage';
import { contactSort, fetchApi } from '@/lib/utils';
import { useChatStore } from '@/stores/chatStore';
import type { Chat, ChatData } from '@/types/chat';

import { E2EE, SharedKeyCache } from '../e2ee';

type SendMessageInput = {
    content: string;
    messageType: string;
    iv: string;
    contentNotEncrypt: string;
};

type UseSendMessageResult = {
    message: string;
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isSending: boolean;
    handleChangeMessage: (val: string) => void;
};

export function useSendMessage(
    conversationId: string,
    publicKey: string,
): UseSendMessageResult {
    const queryClient = useQueryClient();
    const setContacts = useChatStore((state) => state.setContacts);
    const {
        auth: { user },
    } = usePage().props;
    const [message, setMessage] = useState('');
    const isTyping = useRef(false);
    const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    const whisperTyping = useCallback(
        async (val: boolean) => {
            const endpoint = val ? 'on' : 'off';
            const res = await fetchApi({
                url: `/conversations/${conversationId}/typing/${endpoint}`,
            });
            console.log(res);
        },
        [conversationId],
    );

    const handleChangeMessage = useCallback(
        (val: string) => {
            setMessage(val);

            if (!isTyping.current) {
                isTyping.current = true;
                void whisperTyping(true);
            }

            if (timeout.current) {
                clearTimeout(timeout.current);
            }

            timeout.current = window.setTimeout(() => {
                isTyping.current = false;
                void whisperTyping(false);
            }, 2000);
        },
        [whisperTyping],
    );

    const mutation = useMutation({
        mutationFn: async ({ content, messageType, iv }: SendMessageInput) => {
            return fetchApi({
                url: `/conversations/${conversationId}/messages`,
                method: 'POST',
                data: {
                    conversation_id: conversationId,
                    content,
                    message_type: messageType,
                    iv,
                },
            });
        },
        onMutate: async (newMessage) => {
            await queryClient.cancelQueries({
                queryKey: ['messages', conversationId],
            });

            const previousMessages = queryClient.getQueryData<
                InfiniteData<Chat>
            >(['messages', conversationId]);

            const optimisticMessage: ChatData = {
                id: crypto.randomUUID(),
                content: newMessage.content,
                type: newMessage.messageType,
                created_at: new Date().toISOString(),
                pending: true,
                attachments: [],
                reply_to: null,
                sender: {
                    id: user.id,
                    username: user.username,
                    avatar_url: user.avatar ?? null,
                    public_key: publicKey,
                },
                iv: newMessage.iv,
            };

            queryClient.setQueryData<InfiniteData<Chat>>(
                ['messages', conversationId],
                (old) => {
                    if (!old) {
                        return old;
                    }

                    return {
                        ...old,
                        pages: old.pages.map((page, index) =>
                            index !== 0
                                ? page
                                : {
                                      ...page,
                                      data: [optimisticMessage, ...page.data],
                                  },
                        ),
                    };
                },
            );

            setContacts((prev) => {
                if (!prev) {
                    return prev;
                }

                return contactSort(
                    prev.map((item) =>
                        item.id === conversationId
                            ? {
                                  ...item,
                                  last_message: {
                                      content: newMessage.content,
                                      message: newMessage.contentNotEncrypt,
                                      iv: newMessage.iv,
                                      sender_id: user.id,
                                      type: newMessage.messageType,
                                  },
                                  updated_at: new Date().toISOString(),
                              }
                            : item,
                    ),
                );
            });

            return { previousMessages };
        },
        onError: (error, _variables, context) => {
            console.error(error);
            queryClient.setQueryData(
                ['messages', conversationId],
                context?.previousMessages,
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['messages', conversationId],
            });
        },
    });

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!message.trim()) {
            return;
        }

        const privateKey = await KeyStorage.get();
        console.log(privateKey);

        if (!privateKey) {
            throw new Error('No private key found.');
        }

        const sharedKey = await SharedKeyCache.getOrCreate(
            conversationId,
            privateKey,
            publicKey,
        );
        const encrypted = await E2EE.encryptMessage(sharedKey, message);
        void whisperTyping(false);
        mutation.mutate({
            content: encrypted.ciphertext,
            messageType: 'text',
            iv: encrypted.iv,
            contentNotEncrypt: message,
        });

        setMessage('');
    };

    return {
        message,
        handleChangeMessage,
        handleSubmit,
        isSending: mutation.isPending,
    };
}
