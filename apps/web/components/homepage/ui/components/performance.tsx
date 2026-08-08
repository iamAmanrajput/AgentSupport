import { Card, CardContent } from "@workspace/ui/components/card";
import { Check, ShieldCheck } from "lucide-react";
import React from "react";

const Performance = () => {
  return (
    <section className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:px-8">
      <div>
        <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
          AI-Powered Support
        </p>
        <h2 className="mt-4 font-heading text-4xl tracking-tight sm:text-5xl">
          Faster responses. Smarter resolutions.
        </h2>
        <p className="mt-6 max-w-lg leading-7 text-muted-foreground">
          Deliver instant answers with AI trained on your knowledge base while
          giving your support team complete control over complex conversations.
          Reduce repetitive work, improve response quality, and scale customer
          support without scaling your team.
        </p>
        <div className="mt-8 grid grid-cols-2 gap-6">
          <div>
            <p className="font-heading text-4xl text-primary">24/7</p>
            <p className="mt-1 text-sm text-muted-foreground">
              AI support for every website visitor
            </p>
          </div>
          <div>
            <p className="font-heading text-4xl text-primary">1 Min</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Widget deployment with a simple embed script
            </p>
          </div>
        </div>
      </div>
      <Card className="rounded-[2rem] border-border/70 bg-primary/20 p-3 text-background shadow-xl duration-300 hover:cursor-pointer hover:shadow-2xl">
        <CardContent className="rounded-[1.5rem] bg-background p-7 text-foreground">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">
                {" "}
                Support Performance
              </p>
              <p className="mt-1 font-heading text-3xl">
                {" "}
                AI working with your team
              </p>
            </div>
            <div className="grid size-11 place-items-center rounded-full bg-secondary text-primary">
              <ShieldCheck className="size-5" />
            </div>
          </div>
          <div className="mt-9 flex flex-col gap-4">
            <div className="flex items-center justify-between text-sm">
              <span>Knowledge Base Coverage</span>
              <span className="text-muted-foreground">100%</span>
            </div>
            <div className="h-2 rounded-full bg-secondary">
              <div className="h-full w-full rounded-full bg-primary" />
            </div>
            {[
              "AI answers powered by your knowledge base",
              "Automatic handoff to human operators",
              "Unified dashboard for every conversation",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-xl border border-border p-3 text-sm"
              >
                <span className="grid size-6 place-items-center rounded-full bg-secondary text-primary">
                  <Check className="size-3.5" />
                </span>
                {item}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default Performance;
