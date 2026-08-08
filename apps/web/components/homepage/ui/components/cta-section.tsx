"use client";
import { Button } from "@workspace/ui/components/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const CtaSection = () => {
  const router = useRouter();
  return (
    <section className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mb-20 rounded-[2rem] bg-primary px-6 py-16 text-center text-primary-foreground lg:mx-auto lg:max-w-7xl">
        <h2 className="font-heading text-4xl tracking-tight sm:text-5xl">
          Start delivering smarter customer support today.
        </h2>
        <p className="mx-auto mt-5 max-w-xl leading-7 opacity-85">
          Deploy an AI-powered support widget, train it on your knowledge base,
          and manage every customer conversation from a unified dashboard.
          Launch in minutes and scale support with confidence.
        </p>
        <Button
          onClick={() => router.push("/sign-up")}
          variant="secondary"
          className="mt-8"
        >
          Start Free <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </section>
  );
};

export default CtaSection;
