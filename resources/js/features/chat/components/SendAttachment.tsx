import { File, Image, MapPin, Paperclip } from 'lucide-react';
import {
    useEffect,
    useRef,
    useState,
} from 'react';
import type { ChangeEvent, Dispatch, FC, SetStateAction } from "react"
import { toast } from 'react-toastify';

type Props = {
    setImages: Dispatch<SetStateAction<FileList | null>>;
    setDocuments: Dispatch<SetStateAction<FileList | null>>;
    images: FileList | null;
    documents: FileList | null;
    disabled?: boolean;
};

const MAX_SIZE = 20 * 1024 * 1024;

const SendAttachment: FC<Props> = ({
    setImages,
    setDocuments,
    documents,
    images,
    disabled = false,
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [show, setShow] = useState(false);
    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(e.target as Node)
            ) {
                setShow(false);
            }
        };
        window.addEventListener('mousedown', clickOutside);

        return () => window.removeEventListener('mousedown', clickOutside);
    }, []);
    const handleClickButton = () =>
        setShow((prev) => {
            if (images || documents) {
                return false;
            }

            return !prev;
        });
    const handleChange = (e: ChangeEvent<HTMLInputElement>, type: string) => {
        const files = e.target.files;

        if (!files) {
            return;
        }

        const tempFiles = Array.from(files);
        const invalidFileSize = tempFiles.find((file) => file.size > MAX_SIZE);
        const invalidFileType = tempFiles.find(
            (file) => !file.type.startsWith('image/'),
        );

        if (invalidFileType) {
            toast.error(`${invalidFileType.name} not an image.`);
            e.target.value = '';

            return;
        }

        if (invalidFileSize) {
            toast.error(
                `${invalidFileSize.name} exceeds the maximum limit of 10 MB.`,
            );
            e.target.value = '';

            return;
        }

        if (type === 'images') {
            setImages(files);
        } else {
            setDocuments(files);
        }

        setShow(false);
    };

    return (
        <div ref={containerRef} className="relative size-fit">
            {show && (
                <div className="absolute -top-35 -left-15 flex size-fit flex-col border-2 bg-white shadow-[5px_5px_0px_#000]">
                    <label
                        htmlFor="images"
                        className="flex cursor-pointer items-center justify-center gap-2 border-b-2 p-2 text-nowrap hover:bg-gray-100"
                    >
                        <Image size={20} />
                        <p>Send Image</p>
                    </label>
                    <label
                        htmlFor="documents"
                        className="flex cursor-pointer items-center justify-center gap-2 border-b-2 p-2 text-nowrap hover:bg-gray-100"
                    >
                        <File size={20} />
                        <p>Send Document</p>
                    </label>
                    <div className="flex cursor-pointer items-center justify-center gap-2 border-b-2 p-2 text-nowrap hover:bg-gray-100">
                        <MapPin size={20} />
                        <p>Send Location</p>
                    </div>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                className="hidden"
                multiple
                id="images"
                onChange={(e) => handleChange(e, 'images')}
            />
            <input
                type="file"
                className="hidden"
                id="documents"
                multiple
                onChange={(e) => handleChange(e, 'documents')}
            />
            <button
                type="button"
                disabled={
                    (images ? true : false) ||
                    (documents ? true : false) ||
                    disabled
                }
                onClick={handleClickButton}
                className="flex size-12 cursor-pointer items-center justify-center border-2 bg-white disabled:cursor-not-allowed disabled:bg-gray-400"
            >
                <Paperclip size={18} />
            </button>
        </div>
    );
};

export default SendAttachment;
