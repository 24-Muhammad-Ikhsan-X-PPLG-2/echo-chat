import z from 'zod';

export const addContactScheme = z.object({
    email: z.email(),
});

export type AddContactSchemeType = z.infer<typeof addContactScheme>;
