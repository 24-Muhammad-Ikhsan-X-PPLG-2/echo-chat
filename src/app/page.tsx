import CTA from "@/components/Landing/CTA";
import Features from "@/components/Landing/Features";
import Footer from "@/components/Landing/Footer";
import { Header } from "@/components/Landing/Header";
import Hero from "@/components/Landing/Hero";
import HowItWorks from "@/components/Landing/HowItWorks";
import WhyEchoChat from "@/components/Landing/WhyEchoChat";

const Landing = () => {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-background">
        <Header />
        <main>
          <Hero />
          <Features />
          <HowItWorks />
          <WhyEchoChat />
          <CTA />
        </main>
        <Footer />
      </div>
    </>
  );
};
export default Landing;
