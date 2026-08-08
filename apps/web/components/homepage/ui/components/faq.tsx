import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import React from "react";
const faqs = [
  [
    "What does AgentSupport do?",
    "AgentSupport is an AI customer support platform that combines an embeddable website chat widget, a knowledge-powered AI assistant, and a unified operator dashboard to help teams resolve customer conversations faster.",
  ],
  [
    "How quickly can I add the widget to my website?",
    "You can deploy the widget in minutes using a simple embed snippet for HTML, React, Next.js, or JavaScript without rebuilding your existing website.",
  ],
  [
    "Can the AI answer using our own documentation?",
    "Yes. Upload your PDFs, text files, and other support content to build a knowledge base. AgentSupport uses retrieval-augmented generation (RAG) to provide responses based on your organization's documentation.",
  ],
  [
    "What happens if the AI can't answer a question?",
    "When a conversation requires human assistance, AgentSupport seamlessly escalates it to your support team with the full conversation history and context.",
  ],
  [
    "Does AgentSupport support voice interactions?",
    "Yes. You can optionally enable voice support through Vapi integration, allowing customers to interact with AI using voice in addition to chat.",
  ],
  [
    "Is AgentSupport built for multiple organizations?",
    "Absolutely. AgentSupport is a multi-tenant platform where every organization has its own knowledge base, conversations, operators, settings, and access controls.",
  ],
];

const Faq = () => {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24 lg:px-8">
      <div className="text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
          Questions, answered
        </p>
        <h2 className="mt-4 font-heading text-4xl tracking-tight">
          A little more clarity.
        </h2>
      </div>
      <Accordion className="mt-10">
        {faqs.map(([question, answer], index) => (
          <AccordionItem key={question} value={`item-${index}`}>
            <AccordionTrigger className="text-left text-base">
              {question}
            </AccordionTrigger>
            <AccordionContent className="leading-7 text-muted-foreground">
              {answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};

export default Faq;
