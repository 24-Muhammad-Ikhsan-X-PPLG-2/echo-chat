import type { LucideProps } from 'lucide-react';
import type { FC, ForwardRefExoticComponent, RefAttributes } from 'react';

type TabProps = {
    Icon: ForwardRefExoticComponent<
        Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
    >;
};

const Tab: FC<TabProps> = ({ Icon }) => {
    return (
        <div className="flex size-12 cursor-pointer items-center justify-center border-2 transition-all hover:bg-black hover:text-white">
            <Icon size={24} />
        </div>
    );
};

export default Tab;
