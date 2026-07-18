import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { FC } from 'react';
import useImageModal from '../hooks/useImageModal';

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
    const {
        currentIndex,
        direction,
        handleNext,
        handlePrev,
        isOpen,
        onClose,
        previewImage,
    } = useImageModal();

    return (
        <AnimatePresence>
            {isOpen &&
            currentIndex != null &&
            previewImage &&
            previewImage.images.length > 0 ? (
                // Backdrop gelap (WhatsApp biasanya hitam pekat/transparan tipis)
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-black/95 select-none"
                >
                    {/* Header: Tombol Close & Info Index Gambar */}
                    <div className="absolute top-0 right-0 left-0 z-10000 flex items-center justify-between bg-linear-to-b from-black/50 to-transparent p-4 text-white">
                        <span className="text-sm font-medium">
                            {currentIndex + 1} / {previewImage.images.length}
                        </span>
                        <button
                            onClick={onClose}
                            className="cursor-pointer rounded-full p-2 transition-colors hover:bg-white/10"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Container Gambar & Navigasi */}
                    <div className="relative flex h-full w-full max-w-5xl items-center justify-center px-4">
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
                        <div className="relative flex h-[75vh] w-full items-center justify-center overflow-hidden">
                            <AnimatePresence
                                initial={false}
                                custom={direction}
                                mode="popLayout"
                            >
                                <motion.img
                                    key={currentIndex}
                                    src={previewImage.images[currentIndex].url}
                                    custom={direction}
                                    variants={slideVariants as any}
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
