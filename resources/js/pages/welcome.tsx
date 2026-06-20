import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
    MessageCircle,
    Shield,
    Zap,
    Users,
    Mic,
    Smile,
    Paperclip,
    CheckCheck,
    ChevronDown,
    Phone,
    Video,
    ArrowRight,
    Send,
    MoreHorizontal,
    Search,
    File,
    Lock,
    Menu,
    X as XIcon,
    Play,
    Bell,
    Globe,
} from 'lucide-react';
import Twitter from '@/icons/Twitter';
import Github from '@/icons/Github';
import Linkedin from '@/icons/Linkedin';

/* ─── Utility ─── */
function FadeIn({
    children,
    delay = 0,
    className = '',
}: {
    children: React.ReactNode;
    delay?: number;
    className?: string;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/* ─── Chat Mockup (Hero Right) ─── */
function ChatMockup() {
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
}

/* ─── Desktop App Mockup ─── */
function DesktopMockup() {
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
}

/* ─── Mobile Mockup ─── */
function MobileMockup() {
    return (
        <div
            className="overflow-hidden border-[3px] border-black bg-white shadow-[6px_6px_0px_#000]"
            style={{ width: 160 }}
        >
            <div className="flex h-7 items-center justify-center bg-black">
                <div className="h-1.5 w-14 rounded-full bg-white/20" />
            </div>
            <div className="flex items-center gap-1.5 border-b-2 border-black px-2 py-1.5">
                <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-black text-[9px] font-black text-white">
                    M
                </div>
                <div className="min-w-0 flex-1">
                    <div className="text-[9px] font-black">Maria S.</div>
                    <div className="text-[7px] text-black/40">Online</div>
                </div>
                <Mic size={10} className="shrink-0 text-black/50" />
            </div>

            <div className="flex flex-col gap-1.5 p-2" style={{ height: 190 }}>
                {[
                    { from: 'them', text: 'Can you review the PR?' },
                    { from: 'me', text: 'On it now!' },
                ].map((msg, i) => (
                    <div
                        key={i}
                        className={`flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                        <div
                            className={`max-w-[85%] border-[1.5px] border-black px-1.5 py-1 text-[8px] ${
                                msg.from === 'me'
                                    ? 'bg-black text-white shadow-[1.5px_1.5px_0px_#555]'
                                    : 'bg-white shadow-[1.5px_1.5px_0px_#000]'
                            }`}
                        >
                            {msg.text}
                        </div>
                    </div>
                ))}

                {/* Voice message */}
                <div className="border-[1.5px] border-black bg-black/5 p-1.5 shadow-[1.5px_1.5px_0px_#000]">
                    <div className="flex items-center gap-1.5">
                        <div className="flex h-5 w-5 shrink-0 items-center justify-center bg-black">
                            <Play size={8} className="ml-0.5 text-white" />
                        </div>
                        <div className="flex flex-1 items-end gap-0.5">
                            {[2, 4, 3, 5, 3, 4, 2, 3, 5, 2, 4].map((h, i) => (
                                <div
                                    key={i}
                                    className="w-0.5 bg-black"
                                    style={{ height: h * 2.5 }}
                                />
                            ))}
                        </div>
                        <span className="shrink-0 text-[7px] text-black/50">
                            0:14
                        </span>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="max-w-[85%] border-[1.5px] border-black bg-black px-1.5 py-1 text-[8px] text-white shadow-[1.5px_1.5px_0px_#555]">
                        Looks great!
                    </div>
                </div>
            </div>

            <div className="flex gap-1 border-t-2 border-black p-1.5">
                <div className="flex-1 border-[1.5px] border-black px-1.5 py-1 text-[8px] text-black/30">
                    Message...
                </div>
                <div className="flex h-6 w-6 items-center justify-center bg-black">
                    <Send size={8} className="text-white" />
                </div>
            </div>
        </div>
    );
}

/* ─── FAQ Item ─── */
function FAQItem({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <div className="overflow-hidden border-[3px] border-black">
            <button
                onClick={() => setOpen(!open)}
                className="group flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-black/3"
                aria-expanded={open}
            >
                <span className="pr-4 text-base font-black">{q}</span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-black transition-colors group-hover:bg-black group-hover:text-white"
                >
                    <ChevronDown size={16} strokeWidth={2.5} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="answer"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="border-t-2 border-black bg-black/2 px-6 pb-5">
                            <p className="pt-4 font-['Inter'] leading-relaxed text-black/70">
                                {a}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

/* ─── Data ─── */
const features = [
    {
        icon: Zap,
        title: 'Real-Time Messaging',
        desc: 'Messages delivered in under 10ms. No delays, no buffering — just instant, fluid communication between people.',
    },
    {
        icon: Mic,
        title: 'Voice Messages',
        desc: 'Record and send voice notes with a single tap. Waveform visualizations bring audio to life in the chat.',
    },
    {
        icon: Users,
        title: 'Group Chats',
        desc: 'Create conversations for teams, friends, or communities. Scale to thousands of members with fine-grained permissions.',
    },
    {
        icon: Paperclip,
        title: 'File Sharing',
        desc: 'Share any file type up to 5GB. Preview documents, images, and videos right inside the conversation.',
    },
    {
        icon: Smile,
        title: 'Message Reactions',
        desc: 'React to messages with emoji or custom stickers. Express more without breaking the flow of conversation.',
    },
    {
        icon: Shield,
        title: 'Secure Encryption',
        desc: 'Military-grade end-to-end encryption on every message. Your keys, your conversations — invisible to everyone else.',
    },
];

const stats = [
    { value: '100K+', label: 'Messages Daily' },
    { value: '99.9%', label: 'Uptime SLA' },
    { value: 'E2EE', label: 'Encryption' },
    { value: '180+', label: 'Countries' },
];

const testimonials = [
    {
        quote: 'EchoChat replaced our entire communication stack. Faster, cleaner, and actually enjoyable to use every single day.',
        name: 'Sarah Chen',
        role: 'Head of Engineering, Prismatic',
    },
    {
        quote: 'The encryption and privacy features are unmatched. Finally a messaging app that genuinely respects its users.',
        name: 'Marcus Webb',
        role: 'Security Researcher',
    },
    {
        quote: 'Switched from Slack two months ago and never looked back. The UI is stunning and performance is effortless.',
        name: 'Priya Nair',
        role: 'Product Lead, Novaris',
    },
];

const faqs = [
    {
        q: 'Is EchoChat free?',
        a: 'Yes — EchoChat is completely free for personal use with unlimited messages, group chats, and file sharing up to 2 GB. Pro plans unlock advanced features for power users and teams starting at $8/month.',
    },
    {
        q: 'Is my data secure?',
        a: 'Absolutely. Every message is end-to-end encrypted using AES-256 with keys only you hold. We have zero access to your message content, and neither does anyone else — by design.',
    },
    {
        q: 'Can I use it on mobile?',
        a: 'EchoChat is available on iOS and Android with native apps that sync seamlessly with the web version. Your messages, files, and history follow you everywhere, in real time.',
    },
    {
        q: 'Does it support groups?',
        a: 'Yes. Create group chats with up to 10,000 members, manage roles and permissions, pin announcements, and broadcast to entire communities — all within EchoChat.',
    },
];

/* ─── Nav ─── */
function Nav() {
    const [open, setOpen] = useState(false);
    const links = ['Features', 'Product', 'Why Us', 'FAQ'];

    return (
        <nav className="sticky top-0 z-50 border-b-[3px] border-black bg-white">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                {/* Logo */}
                <a href="#" className="group flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center border-2 border-black bg-black transition-all group-hover:shadow-[3px_3px_0px_#000]">
                        <MessageCircle size={15} className="text-white" />
                    </div>
                    <span className="text-lg font-black tracking-tight">
                        EchoChat
                    </span>
                </a>

                {/* Desktop links */}
                <div className="hidden items-center gap-8 md:flex">
                    {links.map((l) => (
                        <a
                            key={l}
                            href={`#${l.toLowerCase().replace(' ', '-')}`}
                            className="text-sm font-bold text-black/60 transition-colors hover:text-black"
                        >
                            {l}
                        </a>
                    ))}
                </div>

                {/* CTA */}
                <div className="hidden items-center gap-3 md:flex">
                    <a
                        href="#"
                        className="text-sm font-bold underline-offset-2 hover:underline"
                    >
                        Sign In
                    </a>
                    <button className="border-[3px] border-black bg-black px-5 py-2 text-sm font-black text-white transition-all hover:bg-white hover:text-black hover:shadow-[4px_4px_0px_#000]">
                        Start Chatting
                    </button>
                </div>

                {/* Mobile burger */}
                <button
                    onClick={() => setOpen(!open)}
                    className="flex h-10 w-10 items-center justify-center border-2 border-black md:hidden"
                    aria-label="Toggle menu"
                >
                    {open ? <XIcon size={18} /> : <Menu size={18} />}
                </button>
            </div>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        className="overflow-hidden border-t-[3px] border-black bg-white md:hidden"
                    >
                        <div className="flex flex-col gap-4 px-6 py-4">
                            {links.map((l) => (
                                <a
                                    key={l}
                                    href={`#${l.toLowerCase().replace(' ', '-')}`}
                                    onClick={() => setOpen(false)}
                                    className="border-b border-black/10 py-1 text-base font-bold"
                                >
                                    {l}
                                </a>
                            ))}
                            <button className="mt-2 w-full border-[3px] border-black bg-black px-5 py-3 text-sm font-black text-white">
                                Start Chatting Free
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

/* ─── Main App ─── */
export default function App() {
    return (
        <div className="overflow-x-hidden bg-white font-['Space_Grotesk'] text-black">
            <Nav />

            {/* ── HERO ── */}
            <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-16 pb-8 lg:grid-cols-2 lg:gap-8 lg:pt-24 lg:pb-12">
                <FadeIn className="flex flex-col gap-7">
                    {/* Badge */}
                    <div className="inline-flex w-fit items-center gap-2 border-[3px] border-black px-4 py-2 shadow-[3px_3px_0px_#000]">
                        <span className="text-sm font-black">
                            ✦ Now in v2.0
                        </span>
                        <ArrowRight size={14} strokeWidth={3} />
                    </div>

                    {/* Headline */}
                    <div>
                        <h1 className="text-6xl leading-[0.92] font-black tracking-tight lg:text-7xl xl:text-8xl">
                            Chat
                            <br />
                            Without
                            <br />
                            Limits.
                        </h1>
                    </div>

                    {/* Subhead */}
                    <p className="max-w-md font-['Inter'] text-lg leading-relaxed text-black/60">
                        Communicate instantly with friends, teams, and
                        communities through a messaging experience designed for
                        speed, privacy, and simplicity.
                    </p>

                    {/* Tagline */}
                    <p className="border-l-4 border-black pl-4 text-sm font-black tracking-widest text-black/40 uppercase">
                        Messages Fade. Echoes Stay.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4 pt-2">
                        <button className="border-[3px] border-black bg-black px-8 py-4 text-base font-black text-white transition-all duration-200 hover:bg-white hover:text-black hover:shadow-[6px_6px_0px_#000]">
                            Start Chatting
                        </button>
                        <button className="flex items-center gap-2 border-[3px] border-black bg-white px-8 py-4 text-base font-black text-black transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-[6px_6px_0px_#000]">
                            <Play size={16} strokeWidth={3} />
                            View Demo
                        </button>
                    </div>
                </FadeIn>

                {/* Chat mockup */}
                <FadeIn
                    delay={0.2}
                    className="flex justify-center lg:justify-end"
                >
                    <ChatMockup />
                </FadeIn>
            </section>

            {/* ── STATS ── */}
            <section className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
                <FadeIn>
                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        {stats.map((s, i) => (
                            <motion.div
                                key={i}
                                whileHover={{
                                    y: -4,
                                    boxShadow: '8px 8px 0px #000',
                                }}
                                transition={{ duration: 0.18 }}
                                className="flex cursor-default flex-col gap-2 border-[3px] border-black bg-white p-6 shadow-[5px_5px_0px_#000] lg:p-8"
                            >
                                <div className="text-4xl font-black tracking-tighter lg:text-5xl">
                                    {s.value}
                                </div>
                                <div className="text-sm font-bold tracking-wider text-black/50 uppercase">
                                    {s.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </FadeIn>
            </section>

            {/* ── FEATURES ── */}
            <section
                id="features"
                className="bg-black py-20 text-white lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-6">
                    <FadeIn>
                        <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
                            <div>
                                <p className="mb-3 text-sm font-black tracking-widest text-white/40 uppercase">
                                    Features
                                </p>
                                <h2 className="text-4xl leading-tight font-black lg:text-6xl">
                                    Built for
                                    <br />
                                    real communication.
                                </h2>
                            </div>
                            <p className="max-w-sm font-['Inter'] leading-relaxed text-white/50">
                                Every feature is thoughtfully designed around
                                the way people actually communicate — fast,
                                natural, and private.
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {features.map((f, i) => (
                            <FadeIn key={i} delay={i * 0.07}>
                                <motion.div
                                    whileHover={{
                                        y: -4,
                                        boxShadow: '6px 6px 0px #fff',
                                    }}
                                    transition={{ duration: 0.18 }}
                                    className="flex cursor-default flex-col gap-4 border-[3px] border-white bg-black p-7 shadow-[4px_4px_0px_#fff]"
                                >
                                    <div className="flex h-11 w-11 items-center justify-center border-2 border-white">
                                        <f.icon size={20} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-xl font-black">
                                        {f.title}
                                    </h3>
                                    <p className="font-['Inter'] text-sm leading-relaxed text-white/55">
                                        {f.desc}
                                    </p>
                                </motion.div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── PRODUCT SHOWCASE ── */}
            <section
                id="product"
                className="mx-auto max-w-7xl px-6 py-20 lg:py-32"
            >
                <FadeIn>
                    <div className="mb-16 text-center">
                        <p className="mb-4 text-sm font-black tracking-widest text-black/40 uppercase">
                            Product
                        </p>
                        <h2 className="text-4xl leading-tight font-black lg:text-6xl">
                            Every screen.
                            <br />
                            Perfectly crafted.
                        </h2>
                    </div>
                </FadeIn>

                <FadeIn delay={0.15}>
                    <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-end">
                        <div className="w-full max-w-2xl">
                            <DesktopMockup />
                        </div>
                        <div className="shrink-0">
                            <MobileMockup />
                        </div>
                    </div>
                </FadeIn>
            </section>

            {/* ── WHY ECHOCHAT ── */}
            <section
                id="why-us"
                className="border-y-[3px] border-black bg-black/3 py-20 lg:py-28"
            >
                <div className="mx-auto max-w-7xl px-6">
                    <FadeIn>
                        <div className="mb-16 text-center">
                            <p className="mb-4 text-sm font-black tracking-widest text-black/40 uppercase">
                                The Difference
                            </p>
                            <h2 className="text-4xl font-black lg:text-6xl">
                                Why EchoChat?
                            </h2>
                        </div>
                    </FadeIn>

                    <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-2">
                        {/* Traditional */}
                        <FadeIn delay={0.1}>
                            <div className="border-[3px] border-black bg-white p-8 shadow-[6px_6px_0px_#000]">
                                <div className="mb-6 flex items-center gap-3 text-lg font-black">
                                    <span className="text-2xl">❌</span>
                                    Traditional Apps
                                </div>
                                {[
                                    'Cluttered interfaces',
                                    'Sluggish performance',
                                    'Constant distractions',
                                    'Opaque data practices',
                                    'Feature bloat',
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 border-b border-black/10 py-3 last:border-0"
                                    >
                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center border-2 border-black/30">
                                            <XIcon
                                                size={10}
                                                className="text-black/40"
                                            />
                                        </div>
                                        <span className="font-['Inter'] text-sm text-black/50 line-through">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>

                        {/* EchoChat */}
                        <FadeIn delay={0.2}>
                            <div className="border-[3px] border-black bg-black p-8 text-white shadow-[6px_6px_0px_#000]">
                                <div className="mb-6 flex items-center gap-3 text-lg font-black">
                                    <span className="text-2xl">✅</span>
                                    EchoChat
                                </div>
                                {[
                                    'Minimal, focused design',
                                    'Under 10ms delivery',
                                    'Zero-distraction mode',
                                    'End-to-end encrypted',
                                    'Built for what matters',
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 border-b border-white/10 py-3 last:border-0"
                                    >
                                        <div className="flex h-5 w-5 shrink-0 items-center justify-center border-2 border-white">
                                            <CheckCheck
                                                size={10}
                                                className="text-white"
                                            />
                                        </div>
                                        <span className="font-['Inter'] text-sm text-white/80">
                                            {item}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ── */}
            <section className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
                <FadeIn>
                    <div className="mb-16 text-center">
                        <p className="mb-4 text-sm font-black tracking-widest text-black/40 uppercase">
                            Testimonials
                        </p>
                        <h2 className="text-4xl font-black lg:text-6xl">
                            Trusted by people
                            <br />
                            who demand the best.
                        </h2>
                    </div>
                </FadeIn>

                <div className="grid gap-5 md:grid-cols-3">
                    {testimonials.map((t, i) => (
                        <FadeIn key={i} delay={i * 0.1}>
                            <motion.div
                                whileHover={{
                                    y: -5,
                                    boxShadow: '8px 8px 0px #000',
                                }}
                                transition={{ duration: 0.18 }}
                                className="flex flex-col gap-5 border-[3px] border-black bg-white p-7 shadow-[5px_5px_0px_#000]"
                            >
                                <div className="-mb-2 text-6xl leading-none font-black text-black/10">
                                    "
                                </div>
                                <p className="flex-1 font-['Inter'] text-sm leading-relaxed text-black/75">
                                    {t.quote}
                                </p>
                                <div className="flex items-center gap-3 border-t-2 border-black pt-5">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center border-2 border-black bg-black text-sm font-black text-white">
                                        {t.name[0]}
                                    </div>
                                    <div>
                                        <div className="text-sm font-black">
                                            {t.name}
                                        </div>
                                        <div className="font-['Inter'] text-xs text-black/50">
                                            {t.role}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </FadeIn>
                    ))}
                </div>
            </section>

            {/* ── FAQ ── */}
            <section id="faq" className="bg-black py-20 text-white lg:py-28">
                <div className="mx-auto max-w-3xl px-6">
                    <FadeIn>
                        <div className="mb-14 text-center">
                            <p className="mb-4 text-sm font-black tracking-widest text-white/40 uppercase">
                                FAQ
                            </p>
                            <h2 className="text-4xl font-black lg:text-6xl">
                                Got questions?
                            </h2>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="flex flex-col gap-3">
                            {faqs.map((f, i) => (
                                <div
                                    key={i}
                                    className="overflow-hidden border-[3px] border-white"
                                >
                                    <FAQItemDark q={f.q} a={f.a} />
                                </div>
                            ))}
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="border-b-[3px] border-black py-24 lg:py-36">
                <FadeIn>
                    <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 px-6 text-center">
                        <p className="text-sm font-black tracking-widest text-black/40 uppercase">
                            Get Started
                        </p>
                        <h2 className="text-5xl leading-[0.9] font-black tracking-tight lg:text-8xl">
                            Ready To
                            <br />
                            Hear The
                            <br />
                            Echo?
                        </h2>
                        <p className="max-w-md font-['Inter'] text-lg leading-relaxed text-black/55">
                            Join thousands of users already communicating
                            through EchoChat. Free forever. No credit card
                            needed.
                        </p>
                        <button className="flex items-center gap-3 border-[3px] border-black bg-black px-10 py-5 text-lg font-black text-white transition-all duration-200 hover:bg-white hover:text-black hover:shadow-[8px_8px_0px_#000]">
                            Start Chatting Free
                            <ArrowRight size={20} strokeWidth={3} />
                        </button>
                        <p className="font-['Inter'] text-sm text-black/40">
                            No credit card required · Free forever · Cancel
                            anytime
                        </p>
                    </div>
                </FadeIn>
            </section>

            {/* ── FOOTER ── */}
            <footer className="bg-black text-white">
                <div className="mx-auto max-w-7xl px-6 py-14">
                    <div className="mb-12 grid gap-10 md:grid-cols-4">
                        {/* Brand */}
                        <div className="md:col-span-1">
                            <div className="mb-4 flex items-center gap-2">
                                <div className="flex h-8 w-8 items-center justify-center border-2 border-white">
                                    <MessageCircle
                                        size={15}
                                        className="text-white"
                                    />
                                </div>
                                <span className="text-lg font-black">
                                    EchoChat
                                </span>
                            </div>
                            <p className="font-['Inter'] text-sm leading-relaxed text-white/45">
                                Messages Fade.
                                <br />
                                Echoes Stay.
                            </p>
                        </div>

                        {/* Links */}
                        {[
                            {
                                title: 'Product',
                                links: [
                                    'Features',
                                    'Pricing',
                                    'Changelog',
                                    'Roadmap',
                                ],
                            },
                            {
                                title: 'Company',
                                links: ['About', 'Blog', 'Careers', 'Press'],
                            },
                            {
                                title: 'Legal',
                                links: [
                                    'Privacy',
                                    'Terms',
                                    'Security',
                                    'Cookie Policy',
                                ],
                            },
                        ].map((col) => (
                            <div key={col.title}>
                                <div className="mb-4 text-xs font-black tracking-widest text-white/40 uppercase">
                                    {col.title}
                                </div>
                                <ul className="flex flex-col gap-2.5">
                                    {col.links.map((l) => (
                                        <li key={l}>
                                            <a
                                                href="#"
                                                className="font-['Inter'] text-sm text-white/60 transition-colors hover:text-white"
                                            >
                                                {l}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col items-center justify-between gap-4 border-t-2 border-white/10 pt-8 md:flex-row">
                        <p className="font-['Inter'] text-sm text-white/40">
                            © {new Date().getFullYear()} EchoChat. All rights
                            reserved.
                        </p>
                        <div className="flex items-center gap-4">
                            {[Twitter, Github, Linkedin].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="flex h-9 w-9 items-center justify-center border-2 border-white/20 transition-all hover:border-white hover:bg-white hover:text-black"
                                    aria-label="Social link"
                                >
                                    <Icon size={15} />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

/* ─── Dark FAQ Item (for FAQ section on black bg) ─── */
function FAQItemDark({ q, a }: { q: string; a: string }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setOpen(!open)}
                className="group flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-white/4"
                aria-expanded={open}
            >
                <span className="pr-4 text-base font-black">{q}</span>
                <motion.div
                    animate={{ rotate: open ? 180 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-white transition-colors group-hover:bg-white group-hover:text-black"
                >
                    <ChevronDown size={16} strokeWidth={2.5} />
                </motion.div>
            </button>
            <AnimatePresence initial={false}>
                {open && (
                    <motion.div
                        key="ans"
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                    >
                        <div className="border-t-2 border-white/20 bg-white/3 px-6 pb-5">
                            <p className="pt-4 font-['Inter'] text-sm leading-relaxed text-white/60">
                                {a}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
