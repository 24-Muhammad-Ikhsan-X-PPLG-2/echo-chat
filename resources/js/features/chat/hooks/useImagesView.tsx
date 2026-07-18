import { useStateGlobal } from "@/stores/chatStore";
import type { ChatData } from "@/types/chat";

const useImagesView = ({ message }: { message: ChatData }) => {
    const setPreviewImage = useStateGlobal((state) => state.setPreviewImage);
    const visibleImages = message.attachments.slice(0, 4);
    const remaining = message.attachments.length - visibleImages.length;

    const handleClick = (initialIndex: number) => {
        const images = message.attachments.map((image) => ({
            url: image.url,
        }));
        setPreviewImage({
            images,
            initialIndex,
        });
    };

    return {
        remaining,
        handleClick,
        visibleImages,
    };
};

export default useImagesView;
