import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState, useEffect, useRef, useCallback } from 'react';
import type { FC } from "react";
import { useStateGlobal } from '@/stores/chatStore';


// Varian animasi untuk efek slide kanan/kiri ala WhatsApp
const slideVariants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
        transition: { duration: 0.25, ease: 'easeInOut' },
    },
    exit: (direction: number) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.25, ease: 'easeInOut' },
    }),
};

const ImageModal: FC = () => {
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
    }, [setPreviewImage, setCurrentIndex])
    // Handle navigasi
    const handleNext = useCallback((e: React.MouseEvent) => {
        e.stopPropagation(); // Mencegah modal ketutup pas ngeklik button

        if (currentIndex != null && previewImage && (currentIndex < previewImage.images.length - 1)) {
            setPage([currentIndex + 1, 1]);
            setCurrentIndex(prev => prev != null ? prev + 1 : prev);
        }
    }, [currentIndex, previewImage]);

    const handlePrev = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();

        if (currentIndex != null && (currentIndex > 0)) {
            setPage([currentIndex - 1, -1]);
            setCurrentIndex(prev => prev != null ? prev - 1 : prev);
        }
    }, [currentIndex]);

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
            if (containerImageRef.current && !containerImageRef.current.contains(e.target as Node)) {
                onClose();
            }
        }
        window.addEventListener("mousedown", clickOutside);
        return () => window.removeEventListener("mousedown", clickOutside);
    }, [onClose]);
    useEffect(() => {
        if (previewImage) {
            previewImage.images.forEach((image) => {
                if (!image.url || image.url.trim() === "") {
                    setPreviewImage(null)
                }
            })
        }
    }, [previewImage, setPreviewImage])

    return (
        <AnimatePresence>
            {isOpen && currentIndex != null && previewImage && previewImage.images.length > 0 ? (
                // Backdrop gelap (WhatsApp biasanya hitam pekat/transparan tipis)
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black/95 select-none"
                >
                    {/* Header: Tombol Close & Info Index Gambar */}
                    <div className="absolute top-0 left-0 right-0 z-10000 flex items-center justify-between p-4 text-white bg-linear-to-b from-black/50 to-transparent">
                        <span className="text-sm font-medium">
                            {currentIndex + 1} / {previewImage.images.length}
                        </span>
                        <button
                            onClick={onClose}
                            className="p-2 transition-colors rounded-full cursor-pointer hover:bg-white/10"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Container Gambar & Navigasi */}
                    <div className="relative flex items-center justify-center w-full h-full max-w-5xl px-4">
                        {/* Tombol Kiri */}
                        {currentIndex > 0 && (
                            <button
                                onClick={handlePrev}
                                className="absolute left-4 z-10000 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 md:left-8"
                            >
                                <ChevronLeft size={28} />
                            </button>
                        )}

                        {/* Area Gambar Utama */}
                        <div className="relative flex items-center justify-center w-full overflow-hidden h-[75vh]">
                            <AnimatePresence initial={false} custom={direction} mode="popLayout">
                                <motion.img
                                    key={currentIndex}
                                    src={previewImage.images[currentIndex].url}
                                    custom={direction}
                                    variants={slideVariants}
                                    initial="enter"
                                    animate="center"
                                    exit="exit"
                                    onClick={(e) => e.stopPropagation()} // Supaya ga ke-close pas ngeklik gambarnya
                                    className="max-h-full max-w-full object-contain shadow-2xl shadow-black/40"
                                    alt={`Preview ${currentIndex}`}
                                />
                            </AnimatePresence>
                        </div>

                        {/* Tombol Kanan */}
                        {currentIndex < previewImage.images.length - 1 && (
                            <button
                                onClick={handleNext}
                                className="absolute right-4 z-10000 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-black/30 text-white backdrop-blur-sm transition-all hover:bg-black/50 md:right-8"
                            >
                                <ChevronRight size={28} />
                            </button>
                        )}
                    </div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
};

export default ImageModal;
