import { useCallback, useEffect, useRef, useState } from 'react';
import { useStateGlobal } from '@/stores/chatStore';

const useImageModal = () => {
    const previewImage = useStateGlobal((state) => state.previewImage);
    const setPreviewImage = useStateGlobal((state) => state.setPreviewImage);
    const initialIndex = previewImage?.initialIndex;
    const isOpen = previewImage ? true : false;
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [[page, direction], setPage] = useState([initialIndex, 0]);
    const containerImageRef = useRef<HTMLDivElement>(null);

    // Sinkronisasi index kalau modal dibuka lagi dengan gambar berbeda
    useEffect(() => {
        if (isOpen) {
            setCurrentIndex(initialIndex);

            setPage([initialIndex, 0]);
        }
    }, [isOpen, initialIndex]);
    const onClose = useCallback(() => {
        setPreviewImage(null);
        setCurrentIndex(0);
    }, [setPreviewImage, setCurrentIndex]);
    // Handle navigasi
    const handleNext = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation(); // Mencegah modal ketutup pas ngeklik button

            if (
                currentIndex != null &&
                previewImage &&
                currentIndex < previewImage.images.length - 1
            ) {
                setPage([currentIndex + 1, 1]);
                setCurrentIndex((prev) => (prev != null ? prev + 1 : prev));
            }
        },
        [currentIndex, previewImage],
    );

    const handlePrev = useCallback(
        (e: React.MouseEvent) => {
            e.stopPropagation();

            if (currentIndex != null && currentIndex > 0) {
                setPage([currentIndex - 1, -1]);
                setCurrentIndex((prev) => (prev != null ? prev - 1 : prev));
            }
        },
        [currentIndex],
    );

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowRight') handleNext(e as any);
            if (e.key === 'ArrowLeft') handlePrev(e as any);
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
        }

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, currentIndex, onClose, handleNext, handlePrev]);
    useEffect(() => {
        const clickOutside = (e: MouseEvent) => {
            if (
                containerImageRef.current &&
                !containerImageRef.current.contains(e.target as Node)
            ) {
                onClose();
            }
        };
        window.addEventListener('mousedown', clickOutside);

        return () => window.removeEventListener('mousedown', clickOutside);
    }, [onClose]);
    useEffect(() => {
        if (previewImage) {
            previewImage.images.forEach((image) => {
                if (!image.url || image.url.trim() === '') {
                    setPreviewImage(null);
                }
            });
        }
    }, [previewImage, setPreviewImage]);

    return {
        // state
        isOpen,
        previewImage,
        currentIndex,
        direction,

        // function
        handleNext,
        handlePrev,
        onClose,
    };
};

export default useImageModal;
