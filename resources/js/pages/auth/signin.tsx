import EmailField from '@/features/login/components/EmailField';
import PasswordField from '@/features/login/components/PasswordField';
import { MessageCircle } from 'lucide-react';
import { Link } from '@inertiajs/react';
import Google from '@/icons/Google';
import useLogin from '@/features/login/hooks/useLogin';

const SignIn = () => {
    const { errors, handleSignIn, handleSubmit, isLoading, register } =
        useLogin();
    return (
        <div className="flex min-h-screen items-center justify-center bg-white px-4 font-['Space_Grotesk']">
            <div className="h-fit min-h-100 w-full border-[3px] p-5 shadow-[5px_5px_0px_#000] lg:w-1/2">
                <div className="group mx-auto flex w-fit items-center justify-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-black transition-all group-hover:shadow-[3px_3px_0px_#000]">
                        <MessageCircle size={15} className="text-white" />
                    </div>
                    <h1 className="text-center text-4xl font-bold">Sign In</h1>
                </div>
                <form
                    onSubmit={handleSubmit(handleSignIn)}
                    className="mx-auto mt-6 flex w-full flex-col gap-5 lg:w-1/2"
                >
                    <EmailField
                        disabled={isLoading}
                        error={errors.email}
                        {...register('email')}
                    />
                    <PasswordField
                        disabled={isLoading}
                        error={errors.password}
                        {...register('password')}
                    />
                    <div className="w-full">
                        <div className="mb-1 flex items-center justify-between">
                            <div className="flex items-center gap-1">
                                <input
                                    disabled={isLoading}
                                    type="checkbox"
                                    id="rememberMe"
                                    {...register('rememberMe')}
                                />
                                <label htmlFor="rememberMe">Remember Me</label>
                            </div>
                            <Link
                                href={'/auth/forgot'}
                                className="hover:underline"
                            >
                                Forgot password?
                            </Link>
                        </div>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="mb-1 w-full cursor-pointer border-2 bg-white py-2 font-bold transition-all hover:shadow-[5px_5px_0px_#000] focus:bg-black focus:text-white"
                        >
                            {isLoading ? 'Submitting...' : 'Sign In'}
                        </button>
                        <Link href={'/auth/signup'} className="group">
                            Don't have an account?{' '}
                            <span className="group-hover:underline">
                                Sign Up
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
                    <button className="mx-auto flex w-full cursor-pointer items-center justify-center gap-3 border-2 py-2 transition-all hover:shadow-[3px_3px_0px_#000] lg:w-1/2">
                        <Google size={20} className="fill-black" />
                        Login With Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
