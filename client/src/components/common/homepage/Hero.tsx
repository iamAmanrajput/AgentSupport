import { Container } from "@/components/layout/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden py-24 lg:py-25">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-20 h-72 w-72 -translate-x-1/2 rounded-full bg-muted blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-muted/60 blur-3xl" />
      </div>

      <Container>
        <div className="mx-auto max-w-5xl text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-border/60 px-4 py-2 text-sm font-medium shadow-xl">
            <Badge>NEW</Badge>
            <span className="text-muted-foreground">
              AI-powered customer support automation
            </span>
          </div>

          {/* Heading */}
          <h1 className="mt-8 text-2xl font-mono font-bold tracking-tight sm:text-6xl">
            Transform Customer Support
            <span className="block bg-linear-to-r from-foreground to-muted-foreground bg-clip-text text-transparent sm:mt-3 sm:text-5xl">
              With Intelligent AI Agents
            </span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Automate responses, resolve tickets faster, and deliver exceptional
            customer experiences with AI-powered support agents that work 24/7.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="h-12 px-8">
              Get Started Free
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button size="lg" variant="outline" className="h-12 px-8">
              Watch Demo
            </Button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <Star className="h-4 w-4 fill-current text-yellow-400" />
            Trusted by 500+ teams worldwide
          </div>
        </div>

        {/* Dashboard Preview */}
        <div className="mx-auto mt-20 max-w-5xl">
          <div className="rounded-3xl border bg-background/70 p-4 shadow-xl backdrop-blur-xl">
            <div className="rounded-2xl border bg-card p-8">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-3">
                <div className="rounded-xl border p-5">
                  <p className="text-sm text-muted-foreground">
                    Tickets Resolved
                  </p>
                  <h3 className="mt-2 text-3xl font-bold">92%</h3>
                </div>

                <div className="rounded-xl border p-5">
                  <p className="text-sm text-muted-foreground">
                    Avg Response Time
                  </p>
                  <h3 className="mt-2 text-3xl font-bold">12s</h3>
                </div>

                <div className="rounded-xl border p-5">
                  <p className="text-sm text-muted-foreground">
                    Customer Satisfaction
                  </p>
                  <h3 className="mt-2 text-3xl font-bold">4.9★</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
