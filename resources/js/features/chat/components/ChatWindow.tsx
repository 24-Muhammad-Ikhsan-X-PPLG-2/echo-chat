import { usePage } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';
import { useEffect } from 'react';

import echo from '@/lib/echo';
import { KeyStorage } from '@/lib/key-storage';
import { contactSort, fetchApi } from '@/lib/utils';
import { useChatStore } from '@/stores/chatStore';
import type { ConversationData } from '@/types/conversation';

import { E2EE, SharedKeyCache } from '../e2ee';
import ConversationView from './ConversationView';

type ConversationUnread = {
    conversation_id: string;
    user_id: string;
    last_read_at: string;
};

const ChatWindow = () => {
    const { selectedConversation } = useChatWindow();

    return (
        <>
            {!selectedConversation && <EmptyState />}
            <div
                className={`absolute top-0 left-0 h-screen w-full flex-col bg-white transition-all duration-300 ease-in-out ${
                    selectedConversation
                        ? 'flex flex-1 translate-x-0'
                        : 'w-0 translate-x-full opacity-0'
                } md:relative md:translate-x-0 ${
                    !selectedConversation ? 'md:hidden' : 'md:flex md:flex-1'
                }`}
            >
                {selectedConversation && (
                    <ConversationView
                        selectedConversation={selectedConversation}
                    />
                )}
            </div>
        </>
    );
};

const EmptyState = () => {
    return (
        <div
            key="empty"
            className="hidden flex-1 flex-col items-center justify-center gap-2 md:flex"
        >
            <MessageCircle size={50} />
            <p className="text-center text-4xl">Start Chatting</p>
        </div>
    );
};

const useChatWindow = () => {
    const setContacts = useChatStore((state) => state.setContacts);
    const selectedConversation = useChatStore(
        (state) => state.selectedConversation,
    );
    const {
        auth: { user },
    } = usePage().props;

    useEffect(() => {
        const channel = echo.private(`user.${user.id}`);

        const onConversationRead = (
            event: ConversationUnread & { last_read_at: string },
        ) => {
            setContacts((prev) => {
                if (!prev) {
                    return prev;
                }

                return contactSort(
                    prev.map((item) =>
                        item.contact.id === event.user_id
                            ? { ...item, last_read_at: event.last_read_at }
                            : item,
                    ),
                );
            });
        };

        const onContactUpdate = (event: ConversationData) => {
            if (event.contact.id === user.id) {
                return;
            }

            setContacts((prev) => {
                if (!prev) {
                    return prev;
                }

                const nextContacts = prev.some((item) => item.id === event.id)
                    ? prev.map((item) => (item.id === event.id ? event : item))
                    : [...prev, event];

                return contactSort(nextContacts);
            });
        };

        const onLastMessageUpdate = async (event: {
            sender_id: string;
            message: { content: string; iv: string; type: string };
            conversation_id: string;
            public_key: string;
        }) => {
            const privateKey = await KeyStorage.get();

            if (!privateKey) {
                throw new Error('Private key not found.');
            }

            const sharedKey = await SharedKeyCache.getOrCreate(
                event.conversation_id,
                privateKey,
                event.public_key,
            );
            const lastMessage = await E2EE.decryptMessage(
                sharedKey,
                event.message.content,
                event.message.iv,
            );

            setContacts((prev) => {
                if (!prev) {
                    return prev;
                }

                return contactSort(
                    prev.map((item) =>
                        item.contact.id === event.sender_id
                            ? {
                                  ...item,
                                  last_message: {
                                      content: event.message.content,
                                      iv: event.message.iv,
                                      sender_id: event.sender_id,
                                      type: event.message.type,
                                      message: lastMessage,
                                  },
                                  updated_at: new Date().toISOString(),
                              }
                            : item,
                    ),
                );
            });
        };

        const onConversationUnread = (event: ConversationUnread) => {
            if (selectedConversation?.contact.id === event.user_id) {
                return;
            }

            setContacts((prev) => {
                if (!prev) {
                    return prev;
                }

                return prev.map((item) =>
                    item.contact.id === event.user_id
                        ? {
                              ...item,
                              unread_count: item.unread_count + 1,
                          }
                        : item,
                );
            });
        };

        channel.listen('.conversation.read', onConversationRead);
        channel.listen('.contact.update', onContactUpdate);
        channel.listen('.lastMessage.update', onLastMessageUpdate);
        channel.listen('.conversation.unread', onConversationUnread);

        return () => {
            channel.stopListening('.conversation.read');
            channel.stopListening('.contact.update');
            channel.stopListening('.lastMessage.update');
            channel.stopListening('.conversation.unread');
            echo.leave(`user.${user.id}`);
        };
    }, [selectedConversation?.contact.id, setContacts, user.id]);
    useEffect(() => {
        const channel = echo.channel('last_seen');
        const onLastSeenUpdate = (event: { user_id: string; time: string }) => {
            if (event.user_id === user.id) return;
            setContacts((prev) => {
                if (!prev) return prev;
                return prev.map((item) =>
                    item.contact.id === event.user_id
                        ? {
                              ...item,
                              contact: {
                                  ...item.contact,
                                  last_seen: event.time,
                              },
                          }
                        : item,
                );
            });
        };
        channel.listen('.last_seen.update', onLastSeenUpdate);
        return () => {
            channel.stopListening('.last_seen.update');
            echo.leave('last_seen');
        };
    }, [setContacts, user.id]);
    useEffect(() => {
        const updateOnline = async () => {
            await fetchApi({
                url: '/last_seen/update',
                method: 'PATCH',
            });
        };
        updateOnline();
        const interval = setInterval(() => {
            updateOnline();
        }, 10000);
        return () => clearInterval(interval);
    }, []);

    return { selectedConversation };
};

export default ChatWindow;
