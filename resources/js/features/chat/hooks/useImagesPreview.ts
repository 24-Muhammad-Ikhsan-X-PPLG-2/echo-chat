import { useEffect, useState } from 'react';
import { createThumbnail } from '../utils';

const useImagesPreview = ({ images }: { images: FileList }) => {
    const [previews, setPreviews] = useState<
        {
            file: File;
            preview: string;
        }[]
    >([]);
    const [remaining, setRemaining] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        let cancelled = false;
        async function loadPreviews() {
            setIsLoading(true);
            const files = Array.from(images);
            const visibleImages = await Promise.all(
                files.slice(0, 3).map(async (image) => ({
                    file: image,
                    preview: await createThumbnail(image),
                })),
            );
            const remaining = files.length - visibleImages.length;
            setIsLoading(false);

            if (!cancelled) {
                setPreviews(visibleImages);
                setRemaining(remaining);
            }
        }
        loadPreviews();

        return () => {
            cancelled = true;
        };
    }, [images]);

    return {
        previews,
        remaining,
        isLoading,
    };
};

export default useImagesPreview;
