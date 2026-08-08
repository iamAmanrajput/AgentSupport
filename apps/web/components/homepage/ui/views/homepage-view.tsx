import React from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import HeroSection from "../components/hero-section";
import Features from "../components/features";
import Workflow from "../components/workflow";
import Performance from "../components/performance";
import Testimonials from "../components/testimonials";
import Faq from "../components/faq";
import CtaSection from "../components/cta-section";
import Pricing from "../components/pricing";

const HomepageView = () => {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <Features />
        <Workflow />
        <Performance />
        <Testimonials />
        <Pricing />
        <Faq />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
};

export default HomepageView;
