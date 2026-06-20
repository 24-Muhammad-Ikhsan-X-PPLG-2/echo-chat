import React from 'react';
import FadeIn from '../components/FadeIn';
import { CheckCheck, X } from 'lucide-react';

const WhyEchochat = () => {
    return (
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
                                        <X
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
    );
};

export default WhyEchochat;
