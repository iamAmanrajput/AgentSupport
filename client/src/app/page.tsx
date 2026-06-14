import Faq from "@/components/common/homepage/Faq";
import Features from "@/components/common/homepage/Features";
import Footer from "@/components/common/homepage/Footer";
import Header from "@/components/common/homepage/Header";
import Hero from "@/components/common/homepage/Hero";
import Impact from "@/components/common/homepage/Impact";
import Pricing from "@/components/common/homepage/Pricing";
import Testimonial from "@/components/common/homepage/Testimonials";
import React from "react";

const HomePage = () => {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <Testimonial />
        <Impact />
        <Pricing />
        <Faq />
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
