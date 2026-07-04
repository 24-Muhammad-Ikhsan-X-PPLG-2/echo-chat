import type { ClassValue } from 'clsx';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { ConversationData } from '@/types/conversation';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function fetchApi({
    data = {},
    method = 'GET',
    url,
}: {
    url: string;
    method?: string;
    data?: object;
}) {
    const csrf = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content');
    const res = await fetch(url, {
        method,
        body: method === 'GET' ? null : JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            'X-CSRF-TOKEN': csrf ?? '',
            Accept: 'application/json',
        },
        credentials: 'same-origin',
    });

    return await res.json();
}

export function contactSort(contacts: ConversationData[]) {
    return [...contacts].sort(
        (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );
}
