import FadeIn from '../components/FadeIn';
import { stats } from '../constant';
import { motion } from 'motion/react';

const StatsSection = () => {
    return (
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
    );
};

export default StatsSection;
