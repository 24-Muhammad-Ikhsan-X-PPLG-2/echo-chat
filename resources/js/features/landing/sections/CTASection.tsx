import { ArrowRight } from 'lucide-react';
import React from 'react';
import FadeIn from '../components/FadeIn';

const CTASection = () => {
    return (
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
                        Join thousands of users already communicating through
                        EchoChat. Free forever. No credit card needed.
                    </p>
                    <button className="flex items-center gap-3 border-[3px] border-black bg-black px-10 py-5 text-lg font-black text-white transition-all duration-200 hover:bg-white hover:text-black hover:shadow-[8px_8px_0px_#000]">
                        Start Chatting Free
                        <ArrowRight size={20} strokeWidth={3} />
                    </button>
                    <p className="font-['Inter'] text-sm text-black/40">
                        No credit card required · Free forever · Cancel anytime
                    </p>
                </div>
            </FadeIn>
        </section>
    );
};

export default CTASection;
