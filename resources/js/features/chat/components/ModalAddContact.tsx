import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useRef } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { fetchApi } from '@/lib/utils';
import { useStateGlobal } from '@/stores/chatStore';

import { addContactScheme } from '../scheme';
import type { AddContactSchemeType } from '../scheme';

// kode ui
const ModalAddContact = () => {
    const {
        errors,
        handleAddContact,
        handleSubmit,
        modalRef,
        register,
        showAddContact,
        reset,
        setShowAddContact,
    } = useModal();

    return (
        <div
            key={'modal-add-contact'}
            className={`fixed top-0 left-0 z-999 flex h-full w-full items-center justify-center bg-black/30 font-['Space_Grotesk'] ${showAddContact ? 'opacity-100' : 'pointer-events-none opacity-0'} transition-all`}
        >
            <form
                key={'add-contact-form'}
                ref={modalRef}
                onSubmit={handleSubmit(handleAddContact)}
                className="flex h-55 w-115 flex-col justify-between border-2 bg-white p-4"
            >
                <div>
                    <h1 className="text-2xl font-bold">Add Contact</h1>
                    <div className="mt-4 flex flex-col">
                        <label
                            htmlFor="email"
                            className={`font-medium ${errors.email && 'text-red-600'}`}
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="someone@email.com"
                            className={`w-full border-2 px-2 py-2 transition-all outline-none ${errors.email ? 'border-red-600 focus:shadow-[5px_5px_0px_#e7000b]' : 'focus:shadow-[5px_5px_0px_#000]'}`}
                            {...register('email')}
                        />
                        {errors.email && (
                            <p className="mt-1 text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="flex items-center justify-end gap-3">
                    <button
                        onClick={() => {
                            setShowAddContact(false);
                            reset();
                        }}
                        className="cursor-pointer px-6 py-1.5 font-bold transition hover:border-black hover:bg-black hover:text-white hover:shadow-[5px_5px_0px_#101828]"
                        type="button"
                    >
                        Cancel
                    </button>
                    <button
                        className="cursor-pointer border-2 px-6 py-1.5 font-bold transition hover:border-black hover:bg-black hover:text-white hover:shadow-[5px_5px_0px_#101828]"
                        type="submit"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

// kode logic
const useModal = () => {
    const modalRef = useRef<HTMLFormElement>(null);
    const showAddContact = useStateGlobal((state) => state.showAddContact);
    const setShowAddContact = useStateGlobal(
        (state) => state.setShowAddContact,
    );
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        setError,
    } = useForm<AddContactSchemeType>({
        resolver: zodResolver(addContactScheme),
        defaultValues: {
            email: '',
        },
    });
    // handle add contact here -ikhsan
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
            for (const [field, message] of Object.entries(res.field)) {
                setError(field as keyof AddContactSchemeType, {
                    message: message as string,
                });
            }

            return;
        }

        setShowAddContact(false);
        reset();
    };

    useEffect(() => {
        const clickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node)
            ) {
                setShowAddContact(false);
                reset();
            }
        };

        window.addEventListener('mousedown', clickOutside);

        return () => {
            window.removeEventListener('mousedown', clickOutside);
        };
    }, [reset, setShowAddContact]);

    return {
        modalRef,

        handleSubmit,
        handleAddContact,
        errors,
        showAddContact,
        register,
        reset,

        setShowAddContact,
    };
};

export default ModalAddContact;
