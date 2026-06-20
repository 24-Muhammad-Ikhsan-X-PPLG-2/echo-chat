import z from 'zod';

export const registerScheme = z
    .object({
        username: z.string().nonempty('Username is required.').min(3),
        fullName: z.string().nonempty('Full name is required.'),
        email: z.email(),
        password: z.string().min(8),
        confirmPassword: z.string().min(8),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Password confirmation does not match.',
        path: ['confirmPassword'],
    });

export type RegisterSchemeType = z.infer<typeof registerScheme>;
