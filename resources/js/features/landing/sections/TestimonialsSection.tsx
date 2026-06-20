import FadeIn from '../components/FadeIn';
import { testimonials } from '../constant';
import { motion } from 'motion/react';

const TestimonialsSection = () => {
    return (
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
    );
};

export default TestimonialsSection;
