import dayjs from 'dayjs';
import type { ChatData } from '@/types/chat';
import imageCompression from 'browser-image-compression';
import { toast } from 'react-toastify';

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

export async function createThumbnail(file: File) {
    const bitmap = await createImageBitmap(file);

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;

    const maxSize = 300;

    const scale = Math.min(maxSize / bitmap.width, maxSize / bitmap.height);

    canvas.width = bitmap.width * scale;
    canvas.height = bitmap.height * scale;

    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    bitmap.close();

    return canvas.toDataURL('image/jpeg', 0.8);
}

export async function compressImages(
    imageArray: FileList,
): Promise<FileList | null> {
    console.log('Proses compress dan convert image....');
    const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
        fileType: 'image/webp',
    };

    try {
        const processingPromises = Array.from(imageArray).map((imageFile) =>
            imageCompression(imageFile, options),
        );
        const compressedImages = await Promise.all(processingPromises);
        const dataTransfer = new DataTransfer();
        compressedImages.forEach((file, index) => {
            if (file instanceof Blob && !(file instanceof File)) {
                const originalName = imageArray[index].name;
                const newName =
                    originalName.substring(0, originalName.lastIndexOf('.')) +
                    '.webp';
                const newFile = new File([file], newName, {
                    type: 'image/webp',
                });
                dataTransfer.items.add(newFile);
            } else {
                dataTransfer.items.add(file);
            }
        });

        return dataTransfer.files;
    } catch (e) {
        console.error(e);

        if (e instanceof Error) {
            toast.error(e.message);
        }

        return null;
    }
}

export function shortText(text: string, maxWord: number = 21) {
    if (!text) {
        return '';
    }

    if (text.length <= maxWord) {
        return text;
    }

    return text.substring(0, maxWord) + '...';
}
