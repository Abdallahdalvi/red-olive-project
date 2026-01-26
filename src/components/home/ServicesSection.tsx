import { Link } from "react-router-dom";
import { Plane, Globe, Heart, Briefcase, FileCheck, Moon } from "lucide-react";

const services = [
  {
    icon: Plane,
    title: "Domestic Tours",
    description: "Explore the diverse beauty of India with our curated domestic packages.",
    href: "/services",
  },
  {
    icon: Globe,
    title: "International Tours",
    description: "Discover world-famous destinations with hassle-free international packages.",
    href: "/services",
  },
  {
    icon: Moon,
    title: "Hajj & Umrah",
    description: "Sacred pilgrimages with complete guidance and comfortable arrangements.",
    href: "/services/hajj-umrah",
  },
  {
    icon: Heart,
    title: "Honeymoon Packages",
    description: "Romantic getaways designed to create memories that last forever.",
    href: "/services/honeymoon",
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    description: "Professional travel solutions for businesses and corporate events.",
    href: "/services/corporate",
  },
  {
    icon: FileCheck,
    title: "Visa Assistance",
    description: "Complete visa processing support for stress-free international travel.",
    href: "/services/visa",
  },
];

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Services</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            We offer a comprehensive range of travel services to make your journey seamless and memorable.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Link
              key={service.title}
              to={service.href}
              className="group rounded-xl border bg-card p-6 transition-all hover:border-primary hover:shadow-lg animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <service.icon className="h-7 w-7" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">{service.title}</h3>
              <p className="text-muted-foreground">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
