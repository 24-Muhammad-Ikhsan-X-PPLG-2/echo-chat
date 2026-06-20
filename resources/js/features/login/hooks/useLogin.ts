import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { loginScheme, LoginSchemeType } from '../scheme';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from '@inertiajs/react';

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
    const handleSignIn: SubmitHandler<LoginSchemeType> = ({
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
                    Object.entries(errors).map(([field, message]) => {
                        setError(field as keyof LoginSchemeType, {
                            message,
                        });
                    });
                },
                onFinish: () => setIsLoading(false),
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
