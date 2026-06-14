import { Container } from "@/components/layout/container";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Head of Support",
    company: "TechFlow",
    review:
      "AgentSupport reduced our average response time from minutes to seconds. Our customers love it.",
  },
  {
    name: "Michael Chen",
    role: "Founder",
    company: "ScaleHub",
    review:
      "The AI agents handle repetitive questions automatically, allowing our team to focus on complex issues.",
  },
  {
    name: "Emily Davis",
    role: "Customer Success Manager",
    company: "Nova AI",
    review:
      "Implementation was effortless and the impact was visible within the first week.",
  },
];

const Testimonial = () => {
  return (
    <section className="py-24">
      <Container>
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">
            Loved by modern teams
          </h2>

          <p className="mt-4 text-lg text-muted-foreground">
            See how teams are transforming customer support with AgentSupport.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.name}
              className="
                group
                cursor-pointer
                border
                bg-card
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
                hover:border-foreground/10
              "
            >
              <CardContent className="p-5">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-3.5 w-3.5 fill-current text-foreground"
                      />
                    ))}
                  </div>

                  <span className="text-4xl leading-none text-muted-foreground/20">
                    "
                  </span>
                </div>

                {/* Review */}
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {testimonial.review}
                </p>

                {/* Footer */}
                <div className="mt-5 flex items-center gap-3 border-t pt-4">
                  <Avatar className="h-10 w-10 border">
                    <AvatarImage
                      src={`https://api.dicebear.com/9.x/initials/svg?seed=${testimonial.name}`}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="text-sm font-semibold font-mono">
                      {testimonial.name}
                    </h4>

                    <p className="text-xs text-muted-foreground">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonial;
