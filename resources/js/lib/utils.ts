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
    data?: Record<string, any>;
}) {
    const csrf = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content');

    const hasFile = Object.values(data).some(
        (value) =>
            value instanceof File ||
            value instanceof FileList ||
            (Array.isArray(value) && value.some((v) => v instanceof File)),
    );

    let body: BodyInit | null = null;
    const headers: HeadersInit = {
        'X-CSRF-TOKEN': csrf ?? '',
        Accept: 'application/json',
    };

    if (method !== 'GET') {
        if (hasFile) {
            const formData = new FormData();

            Object.entries(data).forEach(([key, value]) => {
                if (value instanceof File) {
                    formData.append(key, value);
                } else if (value instanceof FileList) {
                    Array.from(value).forEach((file) => {
                        formData.append(`${key}[]`, file);
                    });
                } else if (
                    Array.isArray(value) &&
                    value.every((v) => v instanceof File)
                ) {
                    value.forEach((file) => {
                        formData.append(`${key}[]`, file);
                    });
                } else {
                    formData.append(key, value);
                }
            });

            body = formData;
        } else {
            headers['Content-Type'] = 'application/json';
            body = JSON.stringify(data);
        }
    }

    const res = await fetch(url, {
        method,
        body,
        headers,
        credentials: 'same-origin',
    });

    return res.json();
}

export function contactSort(contacts: ConversationData[]) {
    return [...contacts].sort(
        (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    );
}
