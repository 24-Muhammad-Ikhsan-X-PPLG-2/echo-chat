import z from 'zod';

export const loginScheme = z.object({
    email: z.email().nonempty('Email is required.'),
    password: z.string().nonempty('Password is required.'),
    rememberMe: z.boolean(),
});

export type LoginSchemeType = z.infer<typeof loginScheme>;
