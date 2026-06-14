import { Container } from "@/components/layout/container";

const stats = [
  {
    value: "12K+",
    label: "Active Teams",
  },
  {
    value: "98%",
    label: "Customer Satisfaction",
  },
  {
    value: "4.9 ★",
    label: "Average Rating",
  },
  {
    value: "99.9%",
    label: "Uptime SLA",
  },
];

const Impact = () => {
  return (
    <section className="border-y bg-secondary/50 py-15">
      <Container>
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="group text-center">
              <h3 className="text-4xl font-bold tracking-tight transition-transform duration-300 group-hover:scale-105">
                {stat.value}
              </h3>

              <p className="mt-3 text-sm text-muted-foreground font-mono">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Impact;
