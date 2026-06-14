import { Container } from "@/components/layout/container";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import {
  Bot,
  MessageSquare,
  BarChart3,
  Zap,
  Shield,
  Clock3,
} from "lucide-react";

const features = [
  {
    icon: Bot,
    title: "AI Agents",
    description:
      "Automate customer conversations with intelligent AI-powered agents.",
  },
  {
    icon: MessageSquare,
    title: "Shared Inbox",
    description: "Manage all customer conversations from a single dashboard.",
  },
  {
    icon: Clock3,
    title: "24/7 Availability",
    description: "Provide instant responses to customers around the clock.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Track support performance and customer satisfaction in real time.",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    description: "Enterprise-grade security to keep customer data protected.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Reduce response times and resolve tickets faster than ever.",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-secondary/50">
      <Container>
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Everything you need to
            <span className="block text-muted-foreground">
              deliver exceptional support
            </span>
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            Powerful tools designed to help teams automate workflows, improve
            response times, and delight customers.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-lg bg-secondary hover:cursor-pointer"
              >
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border-2 bg-muted">
                    <Icon className="h-6 w-6" />
                  </div>

                  <CardTitle className="font-mono">{feature.title}</CardTitle>

                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>

                <CardContent />
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Features;
