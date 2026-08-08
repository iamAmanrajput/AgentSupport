"use client";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@workspace/ui/components/card";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

const plans = [
  {
    name: "Free",
    description:
      "Everything you need to launch your AI customer support in minutes.",
    price: "$0",
    button: "Get Started",
    popular: false,
    items: [
      "Unlimited Organizations",
      "1 Operator",
      "Voice Support",
      "Embeddable Chat Widget",
      "Knowledge Base (Text Files Only)",
      "AI to Human Handoff",
      "Widget Customization",
      "Community Support",
    ],
  },
  {
    name: "Pro",
    description: "Advanced features for growing businesses and support teams.",
    price: "$20",
    button: "Upgrade to Pro",
    popular: true,
    items: [
      "Upto 5 Operators",
      "Knowledge Base (PDF, Images & Text Files)",
      "AI Customer Support",
      "Embeddable Chat Widget",
      "Inhance Message",
      "AI to Human Handoff",
      "Priority Support",
      "Everything in Free",
    ],
  },
];

const Pricing = () => {
  const router = useRouter();
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-medium tracking-[0.2em] text-primary uppercase">
          Pricing
        </p>

        <h2 className="mt-4 font-heading text-4xl tracking-tight sm:text-5xl">
          Simple pricing, no surprises.
        </h2>

        <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted-foreground">
          Start for free and upgrade whenever you need more projects, operators,
          and advanced AI capabilities.
        </p>
      </div>

      <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`rounded-3xl duration-300 hover:cursor-pointer hover:shadow-lg ${
              plan.popular
                ? "border-primary shadow-xl ring-1 ring-primary/20"
                : "border-border/70"
            }`}
          >
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="font-heading text-2xl">
                  {plan.name}
                </CardTitle>

                {plan.popular && <Badge>Most Popular</Badge>}
              </div>

              <p className="pt-2 text-sm text-muted-foreground">
                {plan.description}
              </p>

              <p className="pt-6 font-heading text-5xl">
                {plan.price}
                <span className="font-sans text-base text-muted-foreground">
                  /month
                </span>
              </p>
            </CardHeader>

            <CardContent>
              <div className="space-y-3 text-sm">
                {plan.items.map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <Check className="size-4 text-primary" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <Button
                className="mt-8 w-full"
                onClick={() => {
                  if (plan.popular) {
                    router.push("/billing");
                  } else {
                    router.push("/conversations");
                  }
                }}
                variant={plan.popular ? "default" : "secondary"}
              >
                {plan.button}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Pricing;
