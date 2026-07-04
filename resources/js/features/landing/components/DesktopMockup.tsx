import {
    Bell,
    Globe,
    MessageCircle,
    MoreHorizontal,
    Phone,
    Search,
    Send,
    Users,
    Video,
} from 'lucide-react';

const DesktopMockup = () => {
    const chatList = [
        'Alex K.',
        'Dev Team',
        'Maria S.',
        'Jordan L.',
        'Design Guild',
    ];

    return (
        <div className="overflow-hidden border-[3px] border-black bg-white shadow-[8px_8px_0px_#000]">
            <div className="flex items-center gap-2 bg-black px-3 py-2">
                <div className="h-3 w-3 rounded-full bg-white/20" />
                <div className="h-3 w-3 rounded-full bg-white/20" />
                <div className="h-3 w-3 rounded-full bg-white/20" />
                <span className="ml-2 font-['Space_Mono'] text-[10px] text-white/40">
                    EchoChat — Desktop
                </span>
            </div>
            <div className="flex" style={{ height: 280 }}>
                {/* Icon nav */}
                <div className="flex w-14 flex-col items-center gap-3 border-r-2 border-black bg-black/3 py-3">
                    <div className="flex h-8 w-8 cursor-pointer items-center justify-center bg-black">
                        <MessageCircle size={15} className="text-white" />
                    </div>
                    {[Users, Bell, Globe].map((Icon, i) => (
                        <div
                            key={i}
                            className="flex h-8 w-8 cursor-pointer items-center justify-center border-2 border-black transition-colors hover:bg-black/5"
                        >
                            <Icon size={14} />
                        </div>
                    ))}
                    <div className="mt-auto flex h-8 w-8 cursor-pointer items-center justify-center bg-black text-[11px] font-black text-white">
                        S
                    </div>
                </div>

                {/* Chat list */}
                <div className="flex w-40 shrink-0 flex-col border-r-2 border-black">
                    <div className="border-b border-black/20 p-2">
                        <div className="flex items-center gap-1 border-[1.5px] border-black px-2 py-1">
                            <Search size={10} className="text-black/40" />
                            <span className="text-[9px] text-black/30">
                                Search chats
                            </span>
                        </div>
                    </div>
                    {chatList.map((name, i) => (
                        <div
                            key={i}
                            className={`flex cursor-pointer items-center gap-2 border-b border-black/10 px-2.5 py-2.5 transition-colors ${
                                i === 0 ? 'bg-black/6' : 'hover:bg-black/3'
                            }`}
                        >
                            <div
                                className={`flex h-6 w-6 shrink-0 items-center justify-center border-2 border-black text-[9px] font-black ${i === 0 ? 'bg-black text-white' : 'bg-white text-black'}`}
                            >
                                {name[0]}
                            </div>
                            <div className="min-w-0">
                                <div className="truncate text-[9px] font-bold">
                                    {name}
                                </div>
                                <div className="truncate text-[8px] text-black/40">
                                    just now
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Conversation */}
                <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-center justify-between border-b-2 border-black px-3 py-2">
                        <div className="flex items-center gap-2">
                            <div className="flex h-6 w-6 items-center justify-center border-2 border-black bg-black text-[9px] font-black text-white">
                                A
                            </div>
                            <div>
                                <div className="text-[10px] font-black">
                                    Alex K.
                                </div>
                                <div className="text-[8px] text-black/40">
                                    Online
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2.5">
                            <Phone
                                size={11}
                                className="cursor-pointer text-black/45"
                            />
                            <Video
                                size={11}
                                className="cursor-pointer text-black/45"
                            />
                            <MoreHorizontal
                                size={11}
                                className="cursor-pointer text-black/45"
                            />
                        </div>
                    </div>

                    <div className="flex flex-1 flex-col gap-2.5 overflow-hidden p-3">
                        {[
                            {
                                from: 'them',
                                text: 'Looking good! When do we ship?',
                            },
                            {
                                from: 'me',
                                text: 'Tomorrow at 9AM. Everything is ready.',
                            },
                            {
                                from: 'them',
                                text: 'Let us know once it is live 🚀',
                            },
                        ].map((msg, i) => (
                            <div
                                key={i}
                                className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div
                                    className={`max-w-[70%] border-[1.5px] border-black px-2.5 py-1.5 text-[9px] ${
                                        msg.from === 'me'
                                            ? 'bg-black text-white shadow-[2px_2px_0px_#555]'
                                            : 'bg-white text-black shadow-[2px_2px_0px_#000]'
                                    }`}
                                >
                                    {msg.text}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="flex gap-2 border-t-2 border-black p-2">
                        <div className="flex-1 border-[1.5px] border-black bg-black/2 px-2 py-1.5 text-[9px] text-black/30">
                            Type a message...
                        </div>
                        <div className="flex h-7 w-7 items-center justify-center border-[1.5px] border-black bg-black">
                            <Send size={10} className="text-white" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DesktopMockup;
