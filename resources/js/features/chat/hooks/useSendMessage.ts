import { usePage } from '@inertiajs/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { InfiniteData } from '@tanstack/react-query';
import type { FormEvent } from 'react';
import { useCallback, useRef, useState } from 'react';

import { toast } from 'react-toastify';
import type { Id } from 'react-toastify';
import { PrivateKeyNotFound } from '@/lib/custom-errors';
import { KeyStorage } from '@/lib/key-storage';
import { contactSort, fetchApi } from '@/lib/utils';
import { useChatStore } from '@/stores/chatStore';
import type { Chat, ChatData } from '@/types/chat';

import { E2EE, SharedKeyCache } from '../e2ee';
import { compressImages } from '../utils';

type SendMessageInput = {
    content: string;
    messageType: string;
    iv: string;
    contentNotEncrypt: string;
    images?: FileList;
    documents?: FileList;
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
    images: FileList | null,
    documents: FileList | null,
    setImages: (v: FileList | null) => void,
): UseSendMessageResult {
    const queryClient = useQueryClient();
    const toastId = useRef<Id | null>(null);
    const setContacts = useChatStore((state) => state.setContacts);
    const {
        auth: { user },
    } = usePage().props;
    const [message, setMessage] = useState('');
    const isTyping = useRef(false);
    const timeout = useRef<number | null>(null);

    const whisperTyping = useCallback(
        async (val: boolean) => {
            const endpoint = val ? 'on' : 'off';
            await fetchApi({
                url: `/conversations/${conversationId}/typing/${endpoint}`,
            });
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
        mutationFn: async ({
            content,
            messageType,
            iv,
            documents,
            images,
        }: SendMessageInput) => {
            return fetchApi({
                url: `/conversations/${conversationId}/messages`,
                method: 'POST',
                data: {
                    conversation_id: conversationId,
                    content,
                    message_type: messageType,
                    iv,
                    images: images ?? null,
                    documents: documents ?? null,
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
            const messageId = crypto.randomUUID();
            const now = new Date().toISOString();
            const attachments =
                newMessage.messageType && newMessage.images
                    ? Array.from(newMessage.images).map((item) => ({
                          message_id: messageId,
                          id: Math.floor(Math.random() * 10),
                          size: item.size,
                          type: item.type,
                          url: URL.createObjectURL(item),
                          created_at: now,
                          updated_at: now,
                      }))
                    : [];
            const optimisticMessage: ChatData = {
                id: messageId,
                content: newMessage.content,
                type: newMessage.messageType,
                created_at: now,
                pending: true,
                attachments,
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
                                      message_type: newMessage.messageType,
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
            toast.error(error.message);
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

        if (!message.trim() || message.trim() === '') {
            return;
        }

        const privateKey = await KeyStorage.get();

        if (!privateKey) {
            throw new PrivateKeyNotFound();
        }

        const sharedKey = await SharedKeyCache.getOrCreate(
            conversationId,
            privateKey,
            publicKey,
        );
        const encrypted = await E2EE.encryptMessage(sharedKey, message);
        void whisperTyping(false);

        if (images) {
            toastId.current = toast.loading('Compress Image...');
            const compressedImages = await compressImages(images);

            if (!compressedImages) {
                toast.dismiss(toastId.current);
                toastId.current = null;

                return;
            }

            toast.update(toastId.current, {
                render: 'Success Compress Image',
                type: 'success',
                isLoading: false,
                autoClose: 3000,
            });

            mutation.mutate({
                content: encrypted.ciphertext,
                messageType: 'image',
                iv: encrypted.iv,
                contentNotEncrypt: message,
                images: compressedImages,
            });
            setImages(null);
            setMessage('');
            toastId.current = null;

            return;
        }

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
