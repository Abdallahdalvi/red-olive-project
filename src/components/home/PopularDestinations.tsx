import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const destinations = [
  {
    id: 1,
    name: "Dubai",
    country: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
    startingPrice: "₹45,000",
  },
  {
    id: 2,
    name: "Maldives",
    country: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
    startingPrice: "₹85,000",
  },
  {
    id: 3,
    name: "Bali",
    country: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
    startingPrice: "₹55,000",
  },
  {
    id: 4,
    name: "Kashmir",
    country: "India",
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150a4e?q=80&w=2070&auto=format&fit=crop",
    startingPrice: "₹25,000",
  },
  {
    id: 5,
    name: "Switzerland",
    country: "Europe",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
    startingPrice: "₹1,50,000",
  },
  {
    id: 6,
    name: "Thailand",
    country: "Southeast Asia",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop",
    startingPrice: "₹35,000",
  },
];

export function PopularDestinations() {
  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Popular Destinations</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Discover our most sought-after destinations. From exotic beaches to majestic mountains, 
            find your perfect getaway.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination, index) => (
            <Link
              key={destination.id}
              to={`/destinations/${destination.id}`}
              className="group relative overflow-hidden rounded-xl bg-card shadow-lg transition-all hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-1 text-sm text-white/80">
                  <MapPin className="h-4 w-4" />
                  {destination.country}
                </div>
                <h3 className="text-xl font-bold">{destination.name}</h3>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm">
                    Starting from <span className="font-semibold text-primary">{destination.startingPrice}</span>
                  </p>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline">
            <Link to="/destinations">
              View All Destinations
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
