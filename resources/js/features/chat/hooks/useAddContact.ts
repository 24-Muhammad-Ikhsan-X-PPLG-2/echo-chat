import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';
import { fetchApi } from '@/lib/utils';
import { useChatStore, useStateGlobal } from '@/stores/chatStore';
import type { ConversationData } from '@/types/conversation';
import { addContactScheme } from '../scheme';
import type { AddContactSchemeType } from '../scheme';

const useAddContact = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setError,
    } = useForm<AddContactSchemeType>({
        resolver: zodResolver(addContactScheme),
        defaultValues: {
            email: '',
        },
    });
    const setContacts = useChatStore((state) => state.setContacts);
    const setShowAddContact = useStateGlobal(
        (state) => state.setShowAddContact,
    );
    const handleAddContact: SubmitHandler<AddContactSchemeType> = async ({
        email,
    }) => {
        const res = await fetchApi({
            url: '/contact/add',
            method: 'POST',
            data: {
                email,
            },
        });

        if (!res.success) {
            console.log(res);

            for (const [field, message] of Object.entries(res.field)) {
                setError(field as keyof AddContactSchemeType, {
                    message: message as string,
                });
            }

            return;
        }

        const contact = res.data as ConversationData;

        setContacts((prev) => {
            if (!prev) {
                return prev;
            }

            return [...prev, contact];
        });

        setShowAddContact(false);
    };

    return {
        register,
        handleSubmit,
        handleAddContact,
        setShowAddContact,

        errors,
        isSubmitting,
    };
};

export default useAddContact;
