import { FC, useEffect, useState } from 'react';
import { createThumbnail } from '../utils';

type Props = {
    images: FileList;
};

const ImagesPreview: FC<Props> = ({ images }) => {
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
    return (
        <div className="flex -space-x-5">
            {!isLoading
                ? previews.map((Image, idx) => (
                      <div
                          key={Image.file.name}
                          className={`relative h-8 w-8 border-2 bg-white`}
                      >
                          <img
                              src={Image.preview}
                              loading="lazy"
                              className="h-full w-full object-cover object-center"
                              alt=""
                          />
                          {idx === 2 && remaining > 0 && (
                              <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-xs font-semibold text-white">
                                  +{remaining}
                              </div>
                          )}
                      </div>
                  ))
                : Array.from({
                      length: images.length > 3 ? 3 : images.length,
                  }).map((_, idx) => (
                      <div
                          key={idx}
                          className={`relative h-8 w-8 border-2 bg-gray-300`}
                      ></div>
                  ))}
        </div>
    );
};

export default ImagesPreview;
