import { zodResolver } from '@hookform/resolvers/zod';
import { ChevronLeft } from 'lucide-react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import EmailField from '@/features/login/components/EmailField';
import { fetchApi } from '@/lib/utils';
import { useChatStore, useStateGlobal } from '@/stores/chatStore';
import type { ConversationData } from '@/types/conversation';

import { addContactScheme } from '../scheme';
import type { AddContactSchemeType } from '../scheme';

const AddContact = () => {
    const {
        errors,
        handleAddContact,
        handleSubmit,
        isSubmitting,
        register,
        setShowAddContact,
    } = useAddContact();

    const handleBack = () => {
        setShowAddContact(false);
    };

    return (
        <div className="relative flex h-screen w-full flex-col border-r-2 p-4 md:w-80">
            <div className="flex items-center gap-1">
                <button className="cursor-pointer" onClick={handleBack}>
                    <ChevronLeft size={28} />
                </button>
                <h1 className="text-2xl font-bold">Add Contact</h1>
            </div>
            <form onSubmit={handleSubmit(handleAddContact)} className="mt-25">
                <EmailField
                    {...register('email')}
                    error={errors.email}
                    disabled={isSubmitting}
                />
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="mt-4 w-full cursor-pointer border-2 py-2 font-bold"
                >
                    {isSubmitting ? 'Wait...' : 'Submit'}
                </button>
            </form>
        </div>
    );
};

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

export default AddContact;
