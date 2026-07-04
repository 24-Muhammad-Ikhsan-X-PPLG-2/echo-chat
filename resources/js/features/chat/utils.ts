import dayjs from 'dayjs';
import type { ChatData } from '@/types/chat';

export const groupedMessages = (messages: ChatData[] | undefined) => {
    if (!messages) {
return;
}

    const val = messages.reduce(
        (acc, message) => {
            const date = message.created_at.split('T')[0];

            if (!acc[date]) {
                acc[date] = [];
            }

            acc[date].push(message);

            return acc;
        },
        {} as Record<string, typeof messages>,
    );

    return Object.entries(val).map(([date, messages]) => ({
        date,
        messages,
    }));
};

export function getDateLabel(date: string) {
    const today = dayjs();

    if (dayjs(date).isSame(today, 'day')) {
        return 'Today';
    }

    if (dayjs(date).isSame(today.subtract(1, 'day'), 'day')) {
        return 'Yesterday';
    }

    return dayjs(date).format('DD MMMM YYYY');
}

type Group = {
    date: string;
    messages: ChatData[];
};

export function mergeGroups(
    oldGroups: Group[],
    newMessages: ChatData[],
): Group[] {
    const map = new Map<string, ChatData[]>();

    for (const group of oldGroups) {
        map.set(group.date, [...group.messages]);
    }

    for (const message of newMessages) {
        const date = message.created_at.split('T')[0];

        if (!map.has(date)) {
            map.set(date, []);
        }

        map.get(date)!.push(message);
    }

    return Array.from(map, ([date, messages]) => ({
        date,
        messages,
    }));
}

export function appendMessage(
    oldGroups: Group[],
    newMessage: ChatData,
): Group[] {
    const map = new Map<string, ChatData[]>();

    for (const group of oldGroups) {
        map.set(group.date, [...group.messages]);
    }

    const date = newMessage.created_at.split('T')[0];

    if (!map.has(date)) {
        map.set(date, []);
    }

    map.get(date)!.push(newMessage);

    return Array.from(map, ([date, messages]) => ({
        date,
        messages,
    }));
}
