import { create } from 'zustand';
import type { ConversationData } from '@/types/conversation';

type ContactType = {
    contacts: ConversationData[] | null;
    setContacts: (
        contacts:
            | ConversationData[]
            | null
            | ((prev: ConversationData[] | null) => ConversationData[] | null),
    ) => void;
};

type ChatStore = {
    selectedConversation: ConversationData | null;
    setSelectedConversation: (conversation: ConversationData | null) => void;
} & ContactType;

type StateGlobal = {
    showAddContact: boolean;
    setShowAddContact: (
        showAddContact: boolean | ((prev: boolean) => boolean),
    ) => void;
    previewImage: PreviewImage | null;
    setPreviewImage: (
        previewImages:
            | PreviewImage
            | null
            | ((prev: PreviewImage | null) => PreviewImage | null),
    ) => void;
};

type PreviewImage = {
    images: DataPreviewImage[];
    initialIndex: number;
};

type DataPreviewImage = {
    url: string;
};

export const useChatStore = create<ChatStore>((set) => ({
    selectedConversation: null,
    setSelectedConversation: (conversation) =>
        set({
            selectedConversation: conversation,
        }),
    contacts: null,
    setContacts: (contacts) =>
        set((state) => ({
            contacts:
                typeof contacts === 'function'
                    ? contacts(state.contacts)
                    : contacts,
        })),
}));

export const useStateGlobal = create<StateGlobal>((set) => ({
    showAddContact: false,
    setShowAddContact: (showAddContact) =>
        set((state) => ({
            showAddContact:
                typeof showAddContact === 'function'
                    ? showAddContact(state.showAddContact)
                    : showAddContact,
        })),
    previewImage: null,
    setPreviewImage: (previewImage) =>
        set((state) => ({
            previewImage:
                typeof previewImage === 'function'
                    ? previewImage(state.previewImage)
                    : previewImage,
        })),
}));
