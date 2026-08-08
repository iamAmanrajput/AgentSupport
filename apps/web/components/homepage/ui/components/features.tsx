import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { BookOpen, MessageSquareMore, Sparkles } from "lucide-react";
import React from "react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Conversations",
    text: "Deliver instant, accurate responses using AI trained on your own knowledge base, reducing response times and improving customer satisfaction.",
  },
  {
    icon: MessageSquareMore,
    title: "Unified Inbox",
    text: "Manage AI and human conversations from one dashboard with seamless handoffs, shared context, and real-time collaboration.",
  },
  {
    icon: BookOpen,
    title: "Knowledge Base",
    text: "Upload PDFs and documents to create a powerful AI knowledge base that provides context-aware answers powered by RAG.",
  },
];

const Features = () => {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="max-w-xl">
        <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
          A better baseline
        </p>
        <h2 className="mt-4 font-heading text-4xl tracking-tight text-balance sm:text-5xl">
          Everything your team needs to do its best work.
        </h2>
      </div>
      <div className="mt-12 grid gap-5 md:grid-cols-3">
        {features.map((feature) => (
          <Card
            key={feature.title}
            className="group rounded-3xl border-border/70 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:cursor-pointer hover:shadow-lg"
          >
            <CardHeader>
              <div className="mb-5 grid size-11 place-items-center rounded-2xl bg-secondary text-primary group-hover:bg-primary group-hover:text-primary-foreground">
                <feature.icon className="size-5" />
              </div>
              <CardTitle className="font-heading text-2xl">
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="leading-7 text-muted-foreground">{feature.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Features;
