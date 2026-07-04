import { Eye, EyeOff } from 'lucide-react';
import type { FC, InputHTMLAttributes, Ref} from 'react';
import { useState } from 'react';
import type { FieldError } from 'react-hook-form';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    error?: FieldError;
    ref?: Ref<HTMLInputElement>;
    label?: string;
};

const PasswordField: FC<Props> = ({
    ref,
    error,
    label = 'Password',
    ...props
}) => {
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const handleToggleShowPassword = () => setShowPassword((prev) => !prev);

    return (
        <div className="flex w-full flex-col">
            <label
                htmlFor={props.id}
                className={`font-medium ${error && 'text-red-600'}`}
            >
                {label}
            </label>
            <div
                className={`flex w-full items-center border-2 ${error && 'border-red-600'} pr-2 transition-all ${passwordFocus ? (error ? 'shadow-[5px_5px_0px_#e7000b]' : 'shadow-[5px_5px_0px_#000]') : ''}`}
            >
                <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="......"
                    className="w-full px-2 py-2 outline-none"
                    ref={ref}
                    {...props}
                    onBlur={() => setPasswordFocus(false)}
                    onFocus={() => setPasswordFocus(true)}
                />
                <div
                    className="cursor-pointer"
                    onClick={handleToggleShowPassword}
                >
                    {showPassword ? <Eye size={24} /> : <EyeOff size={24} />}
                </div>
            </div>
            {error && <p className="mt-1 text-red-600">{error.message}</p>}
        </div>
    );
};

export default PasswordField;
