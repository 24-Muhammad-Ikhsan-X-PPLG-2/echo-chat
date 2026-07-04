import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitHandler } from 'react-hook-form';

import { E2EE } from '@/features/chat/e2ee';
import { cryptoMan } from '@/lib/crypto-man';
import { KeyStorage } from '@/lib/key-storage';
import { fetchApi } from '@/lib/utils';

import { loginScheme } from '../scheme';
import type { LoginSchemeType } from '../scheme';

const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginSchemeType>({
        resolver: zodResolver(loginScheme),
        defaultValues: {
            email: '',
            password: '',
            rememberMe: false,
        },
    });
    const handleSignIn: SubmitHandler<LoginSchemeType> = async ({
        email,
        password,
        rememberMe,
    }) => {
        router.post(
            '/auth/signin',
            {
                email,
                password,
                remember: rememberMe,
            },
            {
                onBefore: () => setIsLoading(true),
                onError: (errors) => {
                    for (const [field, message] of Object.entries(errors)) {
                        setError(field as keyof LoginSchemeType, {
                            message,
                        });
                    }
                },
                onFinish: () => setIsLoading(false),
                onSuccess: async () => {
                    const res = await fetchApi({
                        url: '/key/get',
                    });

                    if (!res.data) {
                        throw new Error(res.message);
                    }

                    const privateKeyString = await cryptoMan.decrypt(
                        {
                            ciphertext: res.data.key,
                            iv: res.data.iv,
                            salt: res.data.salt,
                        },
                        password,
                    );
                    const privateKey =
                        await E2EE.importPrivateKey(privateKeyString);
                    await KeyStorage.save(privateKey);
                    router.get('/');
                },
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    return {
        register,
        handleSubmit,
        errors,

        isLoading,

        handleSignIn,
    };
};

export default useLogin;
