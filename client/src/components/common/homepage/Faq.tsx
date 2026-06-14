import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What is AgentSupport?",
    answer:
      "AgentSupport is an AI-powered customer support platform that helps teams automate conversations, resolve tickets faster, and improve customer satisfaction.",
  },
  {
    question: "Can I start with the free plan?",
    answer:
      "Yes. The Free plan includes 1 project, 1 operator, and basic AI support so you can explore the platform before upgrading.",
  },
  {
    question: "What happens when I upgrade to Pro?",
    answer:
      "The Pro plan unlocks up to 10 projects, 5 operators, advanced AI agents, analytics, and priority support.",
  },
  {
    question: "Do you offer a free trial for Pro?",
    answer:
      "Yes. You can try Pro features before committing to a subscription.",
  },
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Absolutely. You can upgrade, downgrade, or cancel your subscription whenever you want.",
  },
  {
    question: "Is customer data secure?",
    answer:
      "Yes. We use industry-standard security practices to ensure your customer data remains protected and private.",
  },
];

const Faq = () => {
  return (
    <section className="bg-secondary/50 py-16 border-t border-border/40 backdrop-blur-xs">
      <Container className="max-w-3xl">
        {/* Header */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Frequently asked questions
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Everything you need to know about AgentSupport.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-2xl border bg-secondary px-6"
              >
                <AccordionTrigger className="cursor-pointer text-left font-medium hover:no-underline">
                  {faq.question}
                </AccordionTrigger>

                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Container>
    </section>
  );
};

export default Faq;
