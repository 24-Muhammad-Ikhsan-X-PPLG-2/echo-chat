import { motion } from 'motion/react';
import FadeIn from '../components/FadeIn';
import { features } from '../constant';

const FeaturesSection = () => {
    return (
        <section id="features" className="bg-black py-20 text-white lg:py-28">
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
                            Every feature is thoughtfully designed around the
                            way people actually communicate — fast, natural, and
                            private.
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
    );
};

export default FeaturesSection;
