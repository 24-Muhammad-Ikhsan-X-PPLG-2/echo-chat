import { useEffect, useRef, useState } from "react";
import { KeyStorage } from "@/lib/key-storage";
import { useChatStore, useStateGlobal } from "@/stores/chatStore";
import { E2EE, SharedKeyCache } from "../e2ee";

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

export default useContacts;
