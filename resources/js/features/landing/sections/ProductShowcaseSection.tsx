import DesktopMockup from '../components/DesktopMockup';
import FadeIn from '../components/FadeIn';
import MobileMockup from '../components/MobileMockup';

const ProductShowcaseSection = () => {
    return (
        <section id="product" className="mx-auto max-w-7xl px-6 py-20 lg:py-32">
            <FadeIn>
                <div className="mb-16 text-center">
                    <p className="mb-4 text-sm font-black tracking-widest text-black/40 uppercase">
                        Product
                    </p>
                    <h2 className="text-4xl leading-tight font-black lg:text-6xl">
                        Every screen.
                        <br />
                        Perfectly crafted.
                    </h2>
                </div>
            </FadeIn>

            <FadeIn delay={0.15}>
                <div className="flex flex-col items-center justify-center gap-8 lg:flex-row lg:items-end">
                    <div className="w-full max-w-2xl">
                        <DesktopMockup />
                    </div>
                    <div className="shrink-0">
                        <MobileMockup />
                    </div>
                </div>
            </FadeIn>
        </section>
    );
};

export default ProductShowcaseSection;
