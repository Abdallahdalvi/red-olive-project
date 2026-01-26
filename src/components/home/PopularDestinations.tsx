import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const destinations = [
  {
    id: 1,
    name: "Maldives Paradise",
    location: "Maldives",
    image: "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=1965&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Dubai Adventure",
    location: "UAE",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Bali Retreat",
    location: "Indonesia",
    image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1938&auto=format&fit=crop",
    rating: 4.7,
  },
  {
    id: 4,
    name: "Swiss Alps",
    location: "Switzerland",
    image: "https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?q=80&w=2070&auto=format&fit=crop",
    rating: 4.9,
  },
  {
    id: 5,
    name: "Kashmir Valley",
    location: "India",
    image: "https://images.unsplash.com/photo-1597074866923-dc0589150a4e?q=80&w=2070&auto=format&fit=crop",
    rating: 4.8,
  },
  {
    id: 6,
    name: "Thailand Beach",
    location: "Thailand",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?q=80&w=2070&auto=format&fit=crop",
    rating: 4.6,
  },
];

export function PopularDestinations() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, destinations.length - itemsPerView);

  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Destination</h2>
            <p className="text-muted-foreground text-lg max-w-md">
              Unleash Your Wanderlust With Red Olive Vacations
            </p>
          </div>
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full h-12 w-12"
              onClick={prev}
              disabled={currentIndex === 0}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <Button 
              variant="default" 
              size="icon" 
              className="rounded-full h-12 w-12"
              onClick={next}
              disabled={currentIndex >= maxIndex}
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Destinations Carousel */}
        <div className="overflow-hidden">
          <motion.div 
            className="flex gap-6"
            animate={{ x: -currentIndex * (100 / itemsPerView + 2) + "%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {destinations.map((destination, index) => (
              <motion.div
                key={destination.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]"
              >
                <Link
                  to={`/destinations/${destination.id}`}
                  className="group block"
                >
                  <div className="relative rounded-3xl overflow-hidden bg-card shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    
                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-1 text-sm text-white/80">
                          <MapPin className="h-4 w-4" />
                          {destination.location}
                        </p>
                        <div className="flex items-center gap-1 bg-card/90 text-foreground px-3 py-1 rounded-full">
                          <Star className="h-3 w-3 fill-primary text-primary" />
                          <span className="text-sm font-medium">{destination.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
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
