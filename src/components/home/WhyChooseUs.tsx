import { Clock, CreditCard, Headphones, Shield, Star, Users } from "lucide-react";

const reasons = [
  {
    icon: CreditCard,
    title: "Affordable Pricing",
    description: "Best value packages with transparent pricing and no hidden costs.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock customer support throughout your journey.",
  },
  {
    icon: Star,
    title: "Personalized Itineraries",
    description: "Customized travel plans tailored to your preferences and budget.",
  },
  {
    icon: Shield,
    title: "Trusted Since 2009",
    description: "Over 15 years of experience serving thousands of happy travelers.",
  },
  {
    icon: Clock,
    title: "Easy Visa Processing",
    description: "Hassle-free visa assistance with high success rate.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Experienced travel consultants to guide you every step of the way.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Choose Us</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We're committed to making your travel experience seamless, memorable, and stress-free.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reasons.map((reason, index) => (
            <div
              key={reason.title}
              className="text-center animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <reason.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">{reason.title}</h3>
              <p className="text-muted-foreground">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
