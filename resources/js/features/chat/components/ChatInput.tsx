import { Send, X } from 'lucide-react';
import { useState } from 'react';
import type { FC } from 'react';
import { useSendMessage } from '@/features/chat/hooks/useSendMessage';
import ImagesPreview from './ImagesPreview';
import SendAttachment from './SendAttachment';

type Props = {
    conversationId: string;
    publicKey: string;
};

const ChatInput: FC<Props> = ({ conversationId, publicKey }) => {
    const [Images, setImages] = useState<FileList | null>(null);
    const [Documents, setDocuments] = useState<FileList | null>(null);
    const { message, handleChangeMessage, handleSubmit, isSending } =
        useSendMessage(conversationId, publicKey, Images, Documents, setImages);
    const handleCancel = () => {
        setImages(null);
        setDocuments(null);
    };

    return (
        <div className="flex w-full flex-col">
            {(Images && Images.length !== 0) ||
            (Documents && Documents.length !== 0) ? (
                <div className="flex h-fit w-full items-center justify-between border-t-2 bg-white">
                    <div>
                        {Images && (
                            <div className="flex items-center gap-2 border-r-2 p-3">
                                <ImagesPreview images={Images} />
                                <p>
                                    {Images.length} Image
                                    {Images.length > 1 && 's'}.
                                </p>
                            </div>
                        )}
                    </div>
                    <button className="cursor-pointer pr-4">
                        <X size={24} onClick={handleCancel} />
                    </button>
                </div>
            ) : null}
            <form
                onSubmit={handleSubmit}
                className="flex h-18 w-full items-center gap-4 border-t-2 p-4"
            >
                <input
                    type="text"
                    value={message}
                    onChange={({ target: { value } }) =>
                        handleChangeMessage(value)
                    }
                    className="h-12 flex-1 border-2 bg-white px-3 outline-none placeholder:text-gray-500 disabled:bg-white/80"
                    placeholder="Type a message..."
                    disabled={isSending}
                />
                <SendAttachment
                    documents={Documents}
                    images={Images}
                    setDocuments={setDocuments}
                    setImages={setImages}
                    disabled={isSending}
                />
                <button
                    type="submit"
                    className="flex h-12 w-12 items-center justify-center bg-black text-white disabled:bg-black/80"
                    disabled={isSending}
                >
                    <Send size={18} />
                </button>
            </form>
        </div>
    );
};

export default ChatInput;
