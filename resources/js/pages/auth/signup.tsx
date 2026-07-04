import { zodResolver } from '@hookform/resolvers/zod';
import { Link, router } from '@inertiajs/react';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { E2EE } from '@/features/chat/e2ee';
import EmailField from '@/features/login/components/EmailField';
import PasswordField from '@/features/login/components/PasswordField';
import Field from '@/features/register/components/field';
import type { RegisterSchemeType } from '@/features/register/scheme';
import { registerScheme } from '@/features/register/scheme';
import Google from '@/icons/Google';
import { cryptoMan } from '@/lib/crypto-man';
import { KeyStorage } from '@/lib/key-storage';

const Signup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<RegisterSchemeType>({
        resolver: zodResolver(registerScheme),
        defaultValues: {
            username: '',
            confirmPassword: '',
            email: '',
            fullName: '',
            password: '',
        },
    });
    const handleSignUp: SubmitHandler<RegisterSchemeType> = async ({
        confirmPassword,
        email,
        fullName,
        password,
        username,
    }) => {
        const keyPair = await E2EE.generateKeyPair();
        const publicKey = await E2EE.exportPublicKey(keyPair.publicKey);
        const encrypted = await cryptoMan.encrypt(
            await E2EE.exportPrivateKey(keyPair.privateKey),
            password,
        );
        router.post(
            '/auth/signup',
            {
                username,
                full_name: fullName,
                email,
                password,
                password_confirmation: confirmPassword,
                public_key: publicKey,
                key: encrypted.ciphertext,
                iv: encrypted.iv,
                salt: encrypted.salt,
            },
            {
                onBefore: () => setIsLoading(true),
                onError: (errors) => {
                    for (const [field, message] of Object.entries(errors)) {
                        setError(field as keyof RegisterSchemeType, {
                            message,
                        });
                    }
                },
                onFinish: () => setIsLoading(false),
                onSuccess: async () =>
                    await KeyStorage.save(keyPair.privateKey),
                preserveScroll: true,
                preserveState: true,
            },
        );
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 font-['Space_Grotesk'] lg:py-10">
            <div className="h-fit min-h-100 w-full border-[3px] p-5 shadow-[5px_5px_0px_#000] lg:w-1/2">
                <div className="group mx-auto flex w-fit items-center justify-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-black transition-all group-hover:shadow-[3px_3px_0px_#000]">
                        <MessageCircle size={15} className="text-white" />
                    </div>
                    <h1 className="text-center text-4xl font-bold">Sign Up</h1>
                </div>
                <form
                    onSubmit={handleSubmit(handleSignUp)}
                    className="mx-auto mt-6 flex w-full flex-col gap-5 lg:w-1/2"
                >
                    <Field
                        type="text"
                        label="Username"
                        id="username"
                        placeholder="john"
                        error={errors.username}
                        disabled={isLoading}
                        {...register('username')}
                    />
                    <Field
                        type="text"
                        label="Full Name"
                        id="fullName"
                        placeholder="John Smith"
                        error={errors.fullName}
                        disabled={isLoading}
                        {...register('fullName')}
                    />
                    <EmailField
                        error={errors.email}
                        disabled={isLoading}
                        {...register('email')}
                    />
                    <PasswordField
                        id="password"
                        error={errors.password}
                        disabled={isLoading}
                        {...register('password')}
                    />
                    <PasswordField
                        id="confirmPassword"
                        label="Confirm Password"
                        error={errors.confirmPassword}
                        disabled={isLoading}
                        {...register('confirmPassword')}
                    />
                    <div className="w-full">
                        <button
                            type="submit"
                            className="mb-1 w-full cursor-pointer border-2 bg-white py-2 font-bold transition-all hover:shadow-[5px_5px_0px_#000] focus:bg-black focus:text-white"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Submitting...' : 'Sign Up'}
                        </button>
                        <Link href={'/auth/signin'} className="group">
                            Have an account?{' '}
                            <span className="group-hover:underline">
                                Sign In
                            </span>
                        </Link>
                    </div>
                </form>
                <div className="mx-auto my-5 flex w-100 items-center gap-1">
                    <div className="h-[0.5px] w-full border bg-black"></div>
                    <p className="text-center text-xl font-bold">Or</p>
                    <div className="h-[0.5px] w-full border bg-black"></div>
                </div>
                <div className="mb-10 flex w-full justify-center">
                    <button
                        disabled={isLoading}
                        className="mx-auto flex w-full cursor-pointer items-center justify-center gap-3 border-2 py-2 transition-all hover:shadow-[3px_3px_0px_#000] lg:w-1/2"
                    >
                        <Google size={20} className="fill-black" />
                        Login With Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Signup;
