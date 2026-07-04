import { useVirtualizer } from '@tanstack/react-virtual';
import { memo, useRef } from 'react';
import type { FC } from 'react';

import type { ConversationData } from '@/types/conversation';

import Contact from './Contact';

type RenderContacts = {
    data: ConversationData[];
};

const RenderContacts: FC<RenderContacts> = ({ data }) => {
    if (data.length > 100) {
        return <RenderContactsWithVirtualizer data={data} />;
    }

    return <RenderContactsWithoutVirtualizer data={data} />;
};

export const RenderContactsWithoutVirtualizer: FC<RenderContacts> = ({
    data,
}) => {
    return (
        <div className="flex-1 overflow-y-auto">
            {data.map((item) => (
                <Contact item={item} key={item.id} />
            ))}
        </div>
    );
};

export const RenderContactsWithVirtualizer: FC<RenderContacts> = ({ data }) => {
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
                        <Contact item={data[item.index]} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default memo(RenderContacts);
