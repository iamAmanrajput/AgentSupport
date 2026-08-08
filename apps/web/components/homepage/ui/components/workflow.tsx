import React from "react";

const Workflow = () => {
  return (
    <section id="workflow" className="bg-secondary/50 px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
            How It Works
          </p>
          <h2 className="mt-4 font-heading text-4xl tracking-tight sm:text-5xl">
            From AI Training to Customer Resolution
          </h2>
        </div>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {[
            [
              "01",
              "Train Your AI",
              "Upload PDFs, documents, and FAQs to build a knowledge base that helps your AI deliver accurate, context-aware responses.",
            ],
            [
              "02",
              "Support Customers Instantly",
              "Embed the chat widget on your website and let AI answer customer questions 24/7 while understanding your business.",
            ],
            [
              "03",
              "Escalate When Needed",
              "Automatically hand off complex conversations to your support team with the full chat history and context.",
            ],
          ].map(([number, title, text]) => (
            <div
              key={number}
              className="relative border-l border-primary/30 pl-6"
            >
              <span className="font-mono text-sm text-primary">{number}</span>
              <h3 className="mt-7 font-heading text-2xl">{title}</h3>
              <p className="mt-3 leading-7 text-muted-foreground">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Workflow;
