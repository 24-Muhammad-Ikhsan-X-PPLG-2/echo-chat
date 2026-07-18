import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { toast } from 'react-toastify';

type Props = {
    images: FileList | null;
    documents: FileList | null;
    setImages: (v: FileList | null) => void;
    setDocuments: (v: FileList | null) => void;
};

const MAX_SIZE = 20 * 1024 * 1024;

const useSendAttachment = ({
    documents,
    images,
    setDocuments,
    setImages,
}: Props) => {
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

    return {
        // state
        show,

        // function
        handleChange,
        handleClickButton,

        // ref
        containerRef,
    };
};

export default useSendAttachment;
