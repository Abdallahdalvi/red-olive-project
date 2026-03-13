import { Link } from "react-router-dom";
import { ArrowRight, ArrowLeft, MapPin, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";

interface Destination { id: string; name: string; country: string; image_url: string | null; price_from: number | null; }

export function PopularDestinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  useEffect(() => { fetchDestinations(); }, []);

  async function fetchDestinations() {
    const { data, error } = await supabase.from("destinations").select("id, name, country, image_url, price_from").eq("is_active", true).eq("is_featured", true).order("display_order", { ascending: false }).limit(8);
    if (!error && data) setDestinations(data);
    setLoading(false);
  }

  const maxIndex = Math.max(0, destinations.length - itemsPerView);
  const next = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prev = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  if (loading) return <section className="py-20 md:py-28 bg-background"><div className="container flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></section>;
  if (destinations.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div><h2 className="text-4xl md:text-5xl font-bold mb-4">Popular Destination</h2><p className="text-muted-foreground text-lg max-w-md">Unleash Your Wanderlust With Red Olive Vacations</p></div>
          <div className="flex gap-3">
            <Button variant="outline" size="icon" className="rounded-full h-12 w-12" onClick={prev} disabled={currentIndex === 0}><ArrowLeft className="h-5 w-5" /></Button>
            <Button variant="default" size="icon" className="rounded-full h-12 w-12" onClick={next} disabled={currentIndex >= maxIndex}><ArrowRight className="h-5 w-5" /></Button>
          </div>
        </div>
        <div className="overflow-hidden">
          <motion.div className="flex gap-6" animate={{ x: -currentIndex * (100 / itemsPerView + 2) + "%" }} transition={{ type: "spring", stiffness: 300, damping: 30 }}>
            {destinations.map((destination, index) => (
              <motion.div key={destination.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }} viewport={{ once: true }} className="flex-shrink-0 w-full md:w-[calc(33.333%-1rem)]">
                <Link to="/destinations" className="group block">
                  <div className="relative rounded-3xl overflow-hidden bg-card shadow-lg hover:shadow-2xl transition-all duration-500">
                    <div className="aspect-[4/5] overflow-hidden"><img src={destination.image_url || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop"} alt={destination.name} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" /></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-xl font-bold mb-2">{destination.name}</h3>
                      <div className="flex items-center justify-between">
                        <p className="flex items-center gap-1 text-sm text-white/80"><MapPin className="h-4 w-4" />{destination.country}</p>
                        {destination.price_from && (<div className="bg-card/90 text-foreground px-3 py-1 rounded-full"><span className="text-sm font-medium">From ₹{destination.price_from.toLocaleString()}</span></div>)}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
        <div className="mt-12 text-center"><Button asChild size="lg" variant="outline" className="rounded-full px-8"><Link to="/destinations">View All Destinations<ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
      </div>
    </section>
  );
}