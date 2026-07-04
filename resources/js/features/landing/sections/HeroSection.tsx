import { ArrowRight, Play } from 'lucide-react';
import ChatMockup from '../components/ChatMockup';
import FadeIn from '../components/FadeIn';

const HeroSection = () => {
    return (
        <section className="mx-auto grid max-w-7xl items-center gap-12 px-6 pt-16 pb-8 lg:grid-cols-2 lg:gap-8 lg:pt-24 lg:pb-12">
            <FadeIn className="flex flex-col gap-7">
                {/* Badge */}
                <div className="inline-flex w-fit items-center gap-2 border-[3px] border-black px-4 py-2 shadow-[3px_3px_0px_#000]">
                    <span className="text-sm font-black">✦ Now in v2.0</span>
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
                    Communicate instantly with friends, teams, and communities
                    through a messaging experience designed for speed, privacy,
                    and simplicity.
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
            <FadeIn delay={0.2} className="flex justify-center lg:justify-end">
                <ChatMockup />
            </FadeIn>
        </section>
    );
};

export default HeroSection;
