import { Menu, MessageCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useState } from 'react';

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const links = ['Features', 'Product', 'Why Us', 'FAQ'];

    return (
        <nav className="fixed top-0 z-50 w-full border-b-[3px] border-black bg-white">
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
                    {open ? <X size={18} /> : <Menu size={18} />}
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
};

export default Navbar;
