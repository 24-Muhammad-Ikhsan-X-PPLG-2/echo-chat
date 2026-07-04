import React from 'react';
import FadeIn from '../components/FadeIn';
import FAQItemDark from '../components/FAQItemDark';
import { faqs } from '../constant';

const FAQSection = () => {
    return (
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
    );
};

export default FAQSection;
