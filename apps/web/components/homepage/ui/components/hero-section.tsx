"use client";
import React from "react";
import HeroPreview from "./hero-preview";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="relative overflow-hidden">
      {/* Background Glow */}
      <div className="pointer-events-none absolute top-0 left-1/2 -z-10 size-168 -translate-x-1/2 rounded-full bg-secondary/70 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 pt-20 pb-24 lg:px-8 lg:pt-32 lg:pb-32">
        {/* Hero Content */}
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-5xl leading-[1.05] tracking-tight text-balance sm:text-7xl lg:text-8xl">
            Automate Customer Support with{" "}
            <span className="cursive-text text-primary">AI</span>
          </h1>

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-muted-foreground">
            Deliver instant AI-powered support, manage every conversation from
            one dashboard, and resolve customer questions using your own
            knowledge base.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button onClick={() => router.push("/sign-up")} size="lg">
              Start Free
              <ArrowRight className="ml-2 size-4" />
            </Button>

            <Button
              size="lg"
              onClick={() => router.push("#pricing")}
              variant="secondary"
              className="border border-primary/70"
            >
              View Pricing <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>

          <p className="mt-5 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500/60"></span>
              <span className="relative inline-flex size-2.5 rounded-full border border-emerald-500 bg-emerald-500"></span>
            </span>

            <span>No credit card required • Setup in minutes</span>
          </p>
        </div>

        {/* Hero Preview */}
        <div className="mx-auto mt-20 w-full max-w-6xl">
          <HeroPreview />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
