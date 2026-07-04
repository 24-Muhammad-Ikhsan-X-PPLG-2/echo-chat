import type { FC, InputHTMLAttributes, Ref } from 'react';
import type { FieldError } from 'react-hook-form';

type Props = InputHTMLAttributes<HTMLInputElement> & {
    error?: FieldError;
    ref?: Ref<HTMLInputElement>;
};

const EmailField: FC<Props> = ({ ref, error, ...props }) => {
    return (
        <div className="flex w-full flex-col">
            <label
                htmlFor="email"
                className={`font-medium ${error && 'text-red-600'}`}
            >
                Email
            </label>
            <input
                type="email"
                id="email"
                placeholder="someone@email.com"
                className={`w-full border-2 px-2 py-2 transition-all outline-none ${error ? 'border-red-600 focus:shadow-[5px_5px_0px_#e7000b]' : 'focus:shadow-[5px_5px_0px_#000]'}`}
                ref={ref}
                {...props}
            />
            {error && <p className="mt-1 text-red-600">{error.message}</p>}
        </div>
    );
};

export default EmailField;
