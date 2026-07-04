import Navbar from '@/features/landing/components/Navbar';
import CTASection from '@/features/landing/sections/CTASection';
import FAQSection from '@/features/landing/sections/FAQSection';
import FeaturesSection from '@/features/landing/sections/FeaturesSection';
import Footer from '@/features/landing/sections/Footer';
import HeroSection from '@/features/landing/sections/HeroSection';
import ProductShowcaseSection from '@/features/landing/sections/ProductShowcaseSection';
import StatsSection from '@/features/landing/sections/StatsSection';
import TestimonialsSection from '@/features/landing/sections/TestimonialsSection';
import WhyEchochat from '@/features/landing/sections/WhyEchochat';

export default function App() {
    return (
        <div className="overflow-x-hidden bg-white font-['Space_Grotesk'] text-black">
            <Navbar />

            {/* ── HERO ── */}
            <HeroSection />

            {/* ── STATS ── */}
            <StatsSection />

            {/* ── FEATURES ── */}
            <FeaturesSection />

            {/* ── PRODUCT SHOWCASE ── */}
            <ProductShowcaseSection />

            {/* ── WHY ECHOCHAT ── */}
            <WhyEchochat />

            {/* ── TESTIMONIALS ── */}
            <TestimonialsSection />

            {/* ── FAQ ── */}
            <FAQSection />

            {/* ── CTA ── */}
            <CTASection />

            {/* ── FOOTER ── */}
            <Footer />
        </div>
    );
}
