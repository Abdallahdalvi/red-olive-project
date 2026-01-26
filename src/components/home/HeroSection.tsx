import { Link } from "react-router-dom";
import { Search, Shield, Users, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/50 to-foreground/70" />
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center text-white py-20">
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl animate-fade-in">
          Explore the World with
          <span className="block text-primary">Red Olive Vacations</span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-white/80 sm:text-xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Your trusted travel partner for unforgettable domestic and international journeys. 
          From holy pilgrimages to dream honeymoons, we craft experiences that last a lifetime.
        </p>

        {/* Search Bar */}
        <div className="mx-auto mb-12 max-w-xl animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Where do you want to go?"
                className="h-12 pl-10 bg-background text-foreground"
              />
            </div>
            <Button size="lg" className="h-12 px-8">
              Explore Destinations
            </Button>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 sm:gap-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <Award className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">15+ Years</p>
              <p className="text-xs text-white/70">Experience</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <Users className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">10,000+</p>
              <p className="text-xs text-white/70">Happy Travelers</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/20">
              <Shield className="h-5 w-5 text-primary" />
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold">100%</p>
              <p className="text-xs text-white/70">Secure Booking</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
