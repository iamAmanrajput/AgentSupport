import { Card } from "@workspace/ui/components/card";
import React from "react";

const Testimonials = () => {
  return (
    <section className="bg-secondary/50 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-5 md:grid-cols-2">
          <Card className="rounded-3xl border-0 bg-primary p-8 text-primary-foreground shadow-lg duration-300 hover:cursor-pointer hover:shadow-xl">
            <p className="text-sm opacity-80">
              “Reduce repetitive support work.”
            </p>
            <p className="mt-10 font-heading text-2xl leading-snug">
              “Let AI answer common questions so your support team can focus on
              high-value customer conversations.”
            </p>
            <p className="mt-8 text-sm opacity-80">
              Aman Singh · Founder, Nexlib
            </p>
          </Card>
          <Card className="rounded-3xl border-border/70 p-8 duration-300 hover:cursor-pointer hover:shadow-xl">
            <p className="text-sm text-muted-foreground">
              “One platform for modern customer support.”
            </p>
            <p className="mt-10 font-heading text-2xl leading-snug">
              “Manage AI chats, human replies, knowledge bases, and optional
              voice support from a unified dashboard.”
            </p>
            <p className="mt-8 text-sm text-muted-foreground">
              Jon Bell · Founder, Arc Studio
            </p>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
