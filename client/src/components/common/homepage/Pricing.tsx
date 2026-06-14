import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "$0",
    description: "Perfect for individuals and small projects.",
    features: [
      "1 Project",
      "1 Operator",
      "Basic AI Support",
      "Community Support",
    ],
    buttonText: "Start Free",
    popular: false,
  },
  {
    name: "Pro",
    price: "$29",
    description: "Built for growing teams and businesses.",
    features: [
      "10 Projects",
      "5 Operators",
      "Advanced AI Agents",
      "Analytics Dashboard",
      "Priority Support",
    ],
    buttonText: "Upgrade to Pro",
    popular: true,
  },
];

const Pricing = () => {
  return (
    <section className="bg-background py-16">
      <Container className="max-w-4xl">
        {/* Header Section */}
        <div className="text-center">
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Start free. Upgrade only when your team grows.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="mx-auto mt-10 grid max-w-2xl items-stretch gap-5 sm:grid-cols-2">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative flex flex-col bg-card transition-all duration-200 ${
                plan.popular
                  ? "border-primary shadow-sm ring-1 ring-primary/5 sm:scale-[1.02]"
                  : "border-border shadow-xs hover:shadow-sm"
              }`}
            >
              {/* Card Header */}
              <CardHeader className="p-5 pb-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {plan.name}
                </p>

                <div className="mt-2 flex items-baseline gap-0.5">
                  <span className="font-mono text-4xl font-bold tracking-tight text-foreground">
                    {plan.price}
                  </span>
                  {plan.price !== "$0" && (
                    <span className="text-xs font-medium text-muted-foreground">
                      /mo
                    </span>
                  )}
                </div>

                <p className="mt-2 text-xs leading-normal text-muted-foreground">
                  {plan.description}
                </p>
              </CardHeader>

              {/* Card Content & Features */}
              <CardContent className="flex flex-1 flex-col p-5 pt-0">
                <div className="mb-6 space-y-2.5 border-t border-border pt-4">
                  {plan.features.map((feature) => (
                    <div key={feature} className="flex items-start gap-2">
                      <div className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-primary/10">
                        <Check className="h-2.5 w-2.5 text-primary stroke-3" />
                      </div>
                      <span className="text-xs font-medium text-foreground/90">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Call to Action Button */}
                <div className="mt-auto">
                  <Button
                    className="w-full text-xs font-medium h-9"
                    size="sm"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    {plan.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Pricing;
