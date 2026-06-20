import Navbar from '@/features/landing/components/Navbar';
import HeroSection from '@/features/landing/sections/HeroSection';
import StatsSection from '@/features/landing/sections/StatsSection';
import FeaturesSection from '@/features/landing/sections/FeaturesSection';
import ProductShowcaseSection from '@/features/landing/sections/ProductShowcaseSection';
import WhyEchochat from '@/features/landing/sections/WhyEchochat';
import TestimonialsSection from '@/features/landing/sections/TestimonialsSection';
import FAQSection from '@/features/landing/sections/FAQSection';
import CTASection from '@/features/landing/sections/CTASection';
import Footer from '@/features/landing/sections/Footer';

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
