import { Bell, Globe, MessageCircle, Settings, UsersRound } from 'lucide-react';
import Tab from './Tab';

const Sidebar = () => {
    return (
        <div
            className={`flex h-screen w-25 flex-col items-center justify-between border-r-2 py-4`}
        >
            <div className="flex h-fit w-fit flex-col gap-5">
                {[MessageCircle, UsersRound, Bell, Globe].map((Icon, idx) => (
                    <Tab Icon={Icon} key={idx} />
                ))}
            </div>
            <Tab Icon={Settings} />
        </div>
    );
};

export default Sidebar;
