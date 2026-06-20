import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

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

export default FAQItem;
