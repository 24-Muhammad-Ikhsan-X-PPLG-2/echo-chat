import { useVirtualizer } from '@tanstack/react-virtual';
import { memo, useRef } from 'react';
import type { FC } from 'react';
import { useChatStore } from '@/stores/chatStore';

import type { ConversationData } from '@/types/conversation';

import Contact from './Contact';

type RenderContactsProps = {
    data: ConversationData[];
    selectedConversation: ConversationData | null;
};

type RenderContactsRootProps = {
    data: ConversationData[];
}

const RenderContacts: FC<RenderContactsRootProps> = ({ data }) => {
    const selectedConversation = useChatStore((state) => state.selectedConversation);

    if (data.length > 100) {
        return <RenderContactsWithVirtualizer selectedConversation={selectedConversation} data={data} />;
    }

    return <RenderContactsWithoutVirtualizer selectedConversation={selectedConversation} data={data} />;
};

export const RenderContactsWithoutVirtualizer: FC<RenderContactsProps> = ({
    data,
    selectedConversation
}) => {
    return (
        <div className="flex-1 overflow-y-auto">
            {data.map((item) => (
                <Contact item={item} active={item.id === selectedConversation?.id} key={item.id} />
            ))}
        </div>
    );
};

export const RenderContactsWithVirtualizer: FC<RenderContactsProps> = ({ data, selectedConversation }) => {
    const parentRef = useRef<HTMLDivElement>(null);
    // eslint-disable-next-line react-hooks/incompatible-library
    const virtualizer = useVirtualizer({
        count: data.length,
        getScrollElement: () => parentRef.current,
        estimateSize: () => 85,
        overscan: 5,
    });

    return (
        <div className="flex-1 overflow-y-auto" ref={parentRef}>
            <div
                style={{
                    height: `${virtualizer.getTotalSize()}px`,
                    position: 'relative',
                }}
            >
                {virtualizer.getVirtualItems().map((item) => (
                    <div
                        key={item.key}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            transform: `translateY(${item.start}px)`,
                        }}
                    >
                        <Contact active={data[item.index].id === selectedConversation?.id} item={data[item.index]} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(RenderContacts);
