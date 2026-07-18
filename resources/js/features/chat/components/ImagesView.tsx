import type { FC } from "react";
import type { ChatData } from "@/types/chat";
import useImagesView from "../hooks/useImagesView";

type ImagesViewProps = {
    message: ChatData;
};

const ImagesView: FC<ImagesViewProps> = ({ message }) => {
    const { handleClick, remaining, visibleImages } = useImagesView({
        message,
    });

    if (message.type !== 'image') {
        return <></>;
    }

    return (
        <div
            className={`mb-1 grid h-fit w-fit gap-2 ${visibleImages.length > 1 ? 'grid-cols-2' : 'grid-cols-1'}`}
        >
            {visibleImages.map((image, idx) => (
                <div
                    key={`${image.message_id}-${image.id}-${idx}`}
                    className="relative h-40 w-40 cursor-pointer bg-white"
                    onClick={() => handleClick(idx)}
                >
                    <img
                        src={image.url}
                        loading="lazy"
                        className="h-full w-full object-cover object-center"
                        alt=""
                    />
                    {idx === 3 && remaining > 0 && (
                        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center bg-black/50">
                            <p className="text-xl font-bold">+{remaining}</p>
                        </div>
                    )}
                    <div className=""></div>
                </div>
            ))}
        </div>
    );
};

export default ImagesView;
