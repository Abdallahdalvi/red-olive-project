import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Star, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-primary tracking-widest uppercase mb-4"
          >
            Exclusive Deals
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Featured Packages
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg max-w-2xl mx-auto"
          >
            Handpicked travel packages with the best value for your dream vacation
          </motion.p>
        </div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="overflow-hidden rounded-3xl bg-card shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <Badge className="absolute left-4 top-4 bg-primary">{pkg.badge}</Badge>
                  <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-card/95 px-3 py-1.5 shadow-lg">
                    <Star className="h-4 w-4 fill-primary text-primary" />
                    <span className="text-sm font-semibold">{pkg.rating}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="mb-3 text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">
                    {pkg.title}
                  </h3>
                  
                  <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      {pkg.destination}
                    </p>
                    <p className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      {pkg.duration}
                    </p>
                    <p className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-primary" />
                      {pkg.groupSize} Persons
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {pkg.highlights.map((highlight) => (
                      <span
                        key={highlight}
                        className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div>
                      <span className="text-xl font-bold text-primary">{pkg.price}</span>
                      <span className="ml-2 text-sm text-muted-foreground line-through">
                        {pkg.originalPrice}
                      </span>
                      <p className="text-xs text-muted-foreground">per person</p>
                    </div>
                    <Button size="sm" className="rounded-full" asChild>
                      <Link to={`/packages/${pkg.id}`}>Book</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" className="rounded-full px-8">
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
