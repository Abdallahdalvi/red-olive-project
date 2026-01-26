import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const packages = [
  {
    id: 1,
    title: "Dubai Deluxe Experience",
    destination: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    price: "₹65,000",
    originalPrice: "₹75,000",
    image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?q=80&w=1974&auto=format&fit=crop",
    rating: 4.9,
    groupSize: "2-10",
    highlights: ["Burj Khalifa", "Desert Safari", "Dubai Mall"],
    badge: "Best Seller",
  },
  {
    id: 2,
    title: "Maldives Honeymoon Special",
    destination: "Maldives",
    duration: "6 Days / 5 Nights",
    price: "₹1,20,000",
    originalPrice: "₹1,40,000",
    image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?q=80&w=1974&auto=format&fit=crop",
    rating: 5.0,
    groupSize: "2",
    highlights: ["Water Villa", "Spa & Wellness", "Snorkeling"],
    badge: "Honeymoon",
  },
  {
    id: 3,
    title: "Kashmir Paradise Tour",
    destination: "Kashmir, India",
    duration: "7 Days / 6 Nights",
    price: "₹35,000",
    originalPrice: "₹42,000",
    image: "https://images.unsplash.com/photo-1596402184320-417e7178b2cd?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
    groupSize: "2-15",
    highlights: ["Shikara Ride", "Gulmarg", "Pahalgam"],
    badge: "Popular",
  },
  {
    id: 4,
    title: "Thailand Adventure",
    destination: "Bangkok & Phuket",
    duration: "6 Days / 5 Nights",
    price: "₹45,000",
    originalPrice: "₹52,000",
    image: "https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?q=80&w=2039&auto=format&fit=crop",
    rating: 4.7,
    groupSize: "2-12",
    highlights: ["Island Hopping", "Thai Cuisine", "Night Markets"],
    badge: "Adventure",
  },
];

export function FeaturedPackages() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Featured Packages</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Handpicked travel packages with the best value. Book now and save on your dream vacation.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {packages.map((pkg, index) => (
            <div
              key={pkg.id}
              className="group overflow-hidden rounded-xl bg-card shadow-md transition-all hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <Badge className="absolute left-3 top-3">{pkg.badge}</Badge>
                <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-foreground/80 px-2 py-1 text-sm text-background">
                  <Star className="h-3 w-3 fill-primary text-primary" />
                  {pkg.rating}
                </div>
              </div>

              <div className="p-4">
                <h3 className="mb-2 text-lg font-semibold line-clamp-1">{pkg.title}</h3>
                
                <div className="mb-3 space-y-1 text-sm text-muted-foreground">
                  <p className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    {pkg.destination}
                  </p>
                  <p className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {pkg.duration}
                  </p>
                  <p className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    {pkg.groupSize} Persons
                  </p>
                </div>

                <div className="mb-3 flex flex-wrap gap-1">
                  {pkg.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="rounded-full bg-secondary px-2 py-0.5 text-xs text-muted-foreground"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between border-t pt-3">
                  <div>
                    <span className="text-lg font-bold text-primary">{pkg.price}</span>
                    <span className="ml-2 text-sm text-muted-foreground line-through">
                      {pkg.originalPrice}
                    </span>
                    <p className="text-xs text-muted-foreground">per person</p>
                  </div>
                  <Button size="sm" asChild>
                    <Link to={`/packages/${pkg.id}`}>Enquire</Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link to="/packages">
              View All Packages
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
