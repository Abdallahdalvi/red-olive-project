import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  "Complete Hajj & Umrah packages with guided tours",
  "Comfortable accommodation near Haram",
  "Experienced religious guides",
  "Visa processing included",
  "24/7 support throughout your journey",
  "Group and family packages available",
];

export function HajjUmrahSection() {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-foreground/85" />
      </div>

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="text-white">
            <span className="mb-4 inline-block rounded-full bg-primary/20 px-4 py-1 text-sm font-medium text-primary">
              Sacred Journeys
            </span>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Hajj & Umrah Packages
            </h2>
            <p className="mb-8 text-lg text-white/80">
              Embark on your spiritual journey with peace of mind. Our carefully crafted 
              Hajj and Umrah packages provide complete guidance and comfortable arrangements, 
              allowing you to focus entirely on your worship.
            </p>

            <ul className="mb-8 space-y-3">
              {features.map((feature) => (
                <li key={feature} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-white/90">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/services/hajj-umrah">
                  View Packages
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-foreground" asChild>
                <Link to="/contact">Get Free Consultation</Link>
              </Button>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="aspect-[4/5] overflow-hidden rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1564769625392-651b89c75a05?q=80&w=1974&auto=format&fit=crop"
                alt="Mecca Kaaba"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 rounded-xl bg-card p-6 shadow-xl">
              <p className="text-4xl font-bold text-primary">1000+</p>
              <p className="text-muted-foreground">Pilgrims Served</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
