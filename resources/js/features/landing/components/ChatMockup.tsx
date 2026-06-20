import {
    CheckCheck,
    File,
    Lock,
    MoreHorizontal,
    Paperclip,
    Phone,
    Search,
    Send,
    Smile,
    Video,
    Zap,
} from 'lucide-react';
import { motion } from 'motion/react';

const ChatMockup = () => {
    const contacts = [
        {
            name: 'Alex K.',
            preview: 'See you there!',
            online: true,
            active: true,
        },
        {
            name: 'Maria S.',
            preview: 'File attached',
            online: true,
            active: false,
        },
        {
            name: 'Dev Team',
            preview: 'Build complete ✓',
            online: false,
            active: false,
        },
        { name: 'Jordan L.', preview: 'Thanks!', online: true, active: false },
    ];

    const messages = [
        {
            from: 'them',
            text: 'Hey! Did you get the design files?',
            time: '10:24 AM',
        },
        {
            from: 'me',
            text: 'Yes! The new layout is perfect.',
            time: '10:25 AM',
        },
        {
            from: 'them',
            text: 'Great — brand guidelines attached.',
            time: '10:26 AM',
            file: true,
        },
        { from: 'me', text: 'On it. When is the deadline?', time: '10:27 AM' },
    ];

    return (
        <div className="relative px-14 py-8">
            {/* Main chat window */}
            <div className="mx-auto w-full max-w-125 overflow-hidden border-[3px] border-black bg-white shadow-[10px_10px_0px_#000]">
                7{/* Fake browser bar */}
                <div className="flex items-center gap-2 bg-black px-3 py-2">
                    <div className="h-3 w-3 rounded-full bg-white/20" />
                    <div className="h-3 w-3 rounded-full bg-white/20" />
                    <div className="h-3 w-3 rounded-full bg-white/20" />
                    <span className="ml-3 font-['Space_Mono'] text-[10px] tracking-wide text-white/40">
                        echochat.app
                    </span>
                </div>
                <div className="flex" style={{ height: 370 }}>
                    {/* Sidebar */}
                    <div className="flex w-38.75 shrink-0 flex-col border-r-[3px] border-black">
                        <div className="border-b-2 border-black p-2">
                            <div className="flex items-center gap-1.5 border-2 border-black px-2 py-1">
                                <Search size={10} strokeWidth={2.5} />
                                <span className="text-[10px] text-black/35">
                                    Search...
                                </span>
                            </div>
                        </div>
                        {contacts.map((c, i) => (
                            <div
                                key={i}
                                className={`cursor-pointer border-b border-black/10 px-2 py-2.5 transition-colors ${
                                    c.active
                                        ? 'bg-black text-white'
                                        : 'hover:bg-black/5'
                                }`}
                            >
                                <div className="flex items-center gap-2">
                                    <div className="relative shrink-0">
                                        <div
                                            className={`flex h-7 w-7 items-center justify-center border-2 text-[10px] font-black ${
                                                c.active
                                                    ? 'border-white bg-white text-black'
                                                    : 'border-black bg-black text-white'
                                            }`}
                                        >
                                            {c.name[0]}
                                        </div>
                                        {c.online && (
                                            <div
                                                className={`absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 ${
                                                    c.active
                                                        ? 'border-black bg-white'
                                                        : 'border-white bg-black'
                                                }`}
                                            />
                                        )}
                                    </div>
                                    <div className="min-w-0">
                                        <div
                                            className={`truncate text-[10px] font-bold ${c.active ? 'text-white' : 'text-black'}`}
                                        >
                                            {c.name}
                                        </div>
                                        <div
                                            className={`truncate text-[9px] ${c.active ? 'text-white/60' : 'text-black/45'}`}
                                        >
                                            {c.preview}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat pane */}
                    <div className="flex min-w-0 flex-1 flex-col">
                        {/* Chat header */}
                        <div className="flex items-center justify-between border-b-2 border-black bg-black/2 px-3 py-2">
                            <div className="flex items-center gap-2">
                                <div className="flex h-7 w-7 items-center justify-center border-2 border-black bg-black text-[10px] font-black text-white">
                                    A
                                </div>
                                <div>
                                    <div className="text-[11px] leading-tight font-black">
                                        Alex K.
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <div className="h-1.5 w-1.5 rounded-full bg-black" />
                                        <span className="text-[9px] text-black/50">
                                            Online now
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5">
                                <Phone
                                    size={12}
                                    className="cursor-pointer text-black/40 transition-colors hover:text-black"
                                />
                                <Video
                                    size={12}
                                    className="cursor-pointer text-black/40 transition-colors hover:text-black"
                                />
                                <MoreHorizontal
                                    size={12}
                                    className="cursor-pointer text-black/40 transition-colors hover:text-black"
                                />
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex flex-1 flex-col gap-2 overflow-hidden p-3">
                            {messages.map((msg, i) => (
                                <div
                                    key={i}
                                    className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                                >
                                    <div className="flex max-w-[78%] flex-col gap-0.5">
                                        {msg.file && (
                                            <div className="mb-0.5 flex items-center gap-2 border-2 border-black bg-black/5 p-2">
                                                <File
                                                    size={13}
                                                    strokeWidth={2}
                                                />
                                                <div>
                                                    <div className="text-[9px] font-bold">
                                                        brand_guidelines.pdf
                                                    </div>
                                                    <div className="text-[8px] text-black/50">
                                                        2.4 MB · PDF
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        <div
                                            className={`border-2 border-black px-2.5 py-1.5 text-[10px] leading-relaxed ${
                                                msg.from === 'me'
                                                    ? 'bg-black text-white shadow-[3px_3px_0px_#444]'
                                                    : 'bg-white text-black shadow-[3px_3px_0px_#000]'
                                            }`}
                                        >
                                            {msg.text}
                                        </div>
                                        <div
                                            className={`flex items-center gap-1 ${msg.from === 'me' ? 'justify-end' : ''}`}
                                        >
                                            <span className="text-[8px] text-black/40">
                                                {msg.time}
                                            </span>
                                            {msg.from === 'me' && (
                                                <CheckCheck
                                                    size={10}
                                                    className="text-black/60"
                                                />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {/* Typing indicator */}
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1 border-2 border-black bg-white px-3 py-1.5 shadow-[2px_2px_0px_#000]">
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-black"
                                            style={{
                                                animationDelay: `${i * 160}ms`,
                                                animationDuration: '0.9s',
                                            }}
                                        />
                                    ))}
                                </div>
                                <span className="text-[9px] text-black/40">
                                    Alex is typing...
                                </span>
                            </div>
                        </div>

                        {/* Input bar */}
                        <div className="flex items-center gap-2 border-t-2 border-black p-2">
                            <div className="flex flex-1 items-center gap-2 border-2 border-black bg-black/2 px-2 py-1.5">
                                <span className="flex-1 text-[10px] text-black/30">
                                    Message Alex...
                                </span>
                                <Smile size={11} className="text-black/30" />
                                <Paperclip
                                    size={11}
                                    className="text-black/30"
                                />
                            </div>
                            <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-black">
                                <Send size={11} className="text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating cards */}
            <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{
                    duration: 3.2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
                className="absolute top-0 left-0 z-10 border-[3px] border-black bg-white px-3 py-2.5 shadow-[4px_4px_0px_#000]"
            >
                <div className="flex items-center gap-2">
                    <Lock size={15} strokeWidth={2.5} />
                    <div>
                        <div className="text-[11px] leading-tight font-black">
                            End-to-End
                        </div>
                        <div className="text-[10px] font-black text-black/60">
                            Encrypted
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 9, 0] }}
                transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.2,
                }}
                className="absolute bottom-0 left-0 z-10 border-[3px] border-black bg-black px-3 py-2.5 text-white shadow-[4px_4px_0px_#000]"
            >
                <div className="flex items-center gap-2">
                    <Zap size={15} strokeWidth={2.5} />
                    <div>
                        <div className="text-[11px] leading-tight font-black">
                            Real-Time
                        </div>
                        <div className="text-[10px] opacity-60">
                            {'<'}10ms latency
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div
                animate={{ y: [0, -9, 0] }}
                transition={{
                    duration: 3.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 0.6,
                }}
                className="absolute top-4 right-0 z-10 border-[3px] border-black bg-white px-3 py-2.5 shadow-[4px_4px_0px_#000]"
            >
                <div className="text-[13px] leading-tight font-black">
                    100K+
                </div>
                <div className="text-[10px] text-black/55">Msgs / Day</div>
            </motion.div>

            <motion.div
                animate={{ y: [0, 7, 0] }}
                transition={{
                    duration: 4.4,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: 1.8,
                }}
                className="absolute right-0 bottom-4 z-10 border-[3px] border-black bg-black px-3 py-2.5 text-white shadow-[4px_4px_0px_#000]"
            >
                <div className="flex items-center gap-1.5">
                    <div className="h-2 w-2 rounded-full bg-white" />
                    <div className="text-[11px] font-black">99.9% Uptime</div>
                </div>
            </motion.div>
        </div>
    );
};

export default ChatMockup;
