import type { FC } from 'react';
import { useEffect } from 'react';

import AddContact from '@/features/chat/components/AddContact';
import ChatWindow from '@/features/chat/components/ChatWindow';
import Contacts from '@/features/chat/components/Contacts';
import ImageModal from '@/features/chat/components/ImageModal';
import Sidebar from '@/features/chat/components/Sidebar';
import { contactSort } from '@/lib/utils';
import { useChatStore, useStateGlobal } from '@/stores/chatStore';
import type { Conversation } from '@/types/conversation';
import PermissionAudioModal from '@/features/chat/components/PermissionAudioModal';
import { unlockAudio } from '@/features/chat/playSoundNotif';

type Props = {
    conversations: Conversation;
};

const Chat: FC<Props> = ({ conversations }) => {
    const showAddContact = useStateGlobal((state) => state.showAddContact);
    useChat({ conversations });

    return (
        <>
            <ImageModal />
            <PermissionAudioModal/>
            <div className="relative flex overflow-hidden bg-white font-['Space_Grotesk']">
                <Sidebar />
                {showAddContact ? <AddContact /> : <Contacts />}
                <ChatWindow />
            </div>
        </>
    );
};

const useChat = ({ conversations }: { conversations: Conversation }) => {
    const setContacts = useChatStore((state) => state.setContacts);

    useEffect(() => {
        setContacts(contactSort(conversations.data));
    }, [conversations, setContacts]);
    useEffect(() => {
        if (localStorage.getItem('notification-sound') !== "true") {
            return;
        }

        const unlock = () => {
            unlockAudio();
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
        }
        window.addEventListener("pointerdown", unlock);
        window.addEventListener("keydown", unlock);

        return () => {
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
        }
    }, [])
};

export default Chat;
