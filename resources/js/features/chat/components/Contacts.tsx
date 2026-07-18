import { Plus, Search } from 'lucide-react';
import type { FC } from 'react';
import useContacts from '../hooks/useContacts';
import RenderContacts from './RenderContacts';

type Props = Record<string, never>;

const Contacts: FC<Props> = () => {
    const { contacts, isLoading, setShowAddContact } = useContacts();

    if (!contacts) {
        return <></>;
    }

    const handleShowAddContact = () => setShowAddContact((prev) => !prev);

    return (
        <div className="relative flex h-screen w-full flex-col border-r-2 md:w-80">
            <div className="border-b border-gray-400 p-4">
                <div className="flex w-full items-center border-2 pl-2">
                    <Search size={24} className="text-gray-500" />
                    <input
                        type="text"
                        className="w-full p-2 outline-none placeholder:text-gray-500"
                        placeholder="Search chats..."
                    />
                </div>
            </div>
            {!isLoading && <RenderContacts data={contacts} />}
            <button
                type="button"
                onClick={handleShowAddContact}
                className="group absolute bottom-5 left-5 flex size-12 cursor-pointer items-center justify-center border-2 transition hover:bg-black"
            >
                <Plus size={24} className="group-hover:text-white" />
            </button>
        </div>
    );
};

export default Contacts;
