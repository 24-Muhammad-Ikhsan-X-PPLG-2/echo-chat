import { Plus, Search } from 'lucide-react';
import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import { KeyStorage } from '@/lib/key-storage';
import { useChatStore, useStateGlobal } from '@/stores/chatStore';

import { E2EE, SharedKeyCache } from '../e2ee';
import RenderContacts from './RenderContacts';

type Props = Record<string, never>;

const Contacts: FC<Props> = () => {
    const { contacts, isLoading, setShowAddContact } = useContacts();

    if (!contacts) {
        return <></>;
    }

    const handleShowAddContact = () => setShowAddContact((prev) => !prev);

    return (
        <div className="relative flex h-screen w-full flex-col border-r-2 md:w-80">
            <div className="border-b border-gray-400 p-4">
                <div className="flex w-full items-center border-2 pl-2">
                    <Search size={24} className="text-gray-500" />
                    <input
                        type="text"
                        className="w-full p-2 outline-none placeholder:text-gray-500"
                        placeholder="Search chats..."
                    />
                </div>
            </div>
            {!isLoading && <RenderContacts data={contacts} />}
            <button
                type="button"
                onClick={handleShowAddContact}
                className="group absolute bottom-5 left-5 flex size-12 cursor-pointer items-center justify-center border-2 transition hover:bg-black"
            >
                <Plus size={24} className="group-hover:text-white" />
            </button>
        </div>
    );
};

const useContacts = () => {
    const contacts = useChatStore((state) => state.contacts);
    const setContacts = useChatStore((state) => state.setContacts);
    const setShowAddContact = useStateGlobal(
        (state) => state.setShowAddContact,
    );
    const isTwice = useRef(false);

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            if (!contacts) {
                return;
            }

            if (isTwice.current) {
                return;
            }

            isTwice.current = true;
            setIsLoading(true);
            const privateKey = await KeyStorage.get();

            if (!privateKey) {
                throw new Error('Private key not found.');
            }

            const newContacts = await Promise.all(
                contacts.map(async (item) => {
                    if (!item.last_message) {
                        return item;
                    }

                    const sharedKey = await SharedKeyCache.getOrCreate(
                        item.id,
                        privateKey,
                        item.contact.public_key,
                    );

                    const lastMessage = await E2EE.decryptMessage(
                        sharedKey,
                        item.last_message.content,
                        item.last_message.iv,
                    );

                    return {
                        ...item,
                        last_message: {
                            ...item.last_message,
                            message: lastMessage,
                        },
                    };
                }),
            );
            setIsLoading(false);

            if (!cancelled) {
                setContacts(newContacts);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [contacts, setContacts]);
    return {
        contacts,
        isLoading,
        setShowAddContact,
    };
};

export default Contacts;
