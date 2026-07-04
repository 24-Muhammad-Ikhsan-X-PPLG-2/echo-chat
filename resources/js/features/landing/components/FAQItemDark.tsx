import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

/* ─── Dark FAQ Item (for FAQ section on black bg) ─── */
export default function FAQItemDark({ q, a }: { q: string; a: string }) {
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
