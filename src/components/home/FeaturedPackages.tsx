import { Link } from "react-router-dom";
import { ArrowRight, Calendar, MapPin, Star, Users, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Package { id: string; title: string; description: string | null; duration: string | null; price: number; original_price: number | null; package_type: string | null; image_url: string | null; highlights: string[] | null; destination: { name: string; country: string } | null; }
const packageTypeBadges: Record<string, string> = { honeymoon: "Honeymoon", family: "Family", hajj_umrah: "Hajj & Umrah", corporate: "Corporate", adventure: "Adventure", group: "Group Tour" };

export function FeaturedPackages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchPackages(); }, []);

  async function fetchPackages() {
    const { data, error } = await supabase.from("packages").select(`id, title, description, duration, price, original_price, package_type, image_url, highlights, destination:destinations(name, country)`).eq("is_active", true).eq("is_featured", true).order("display_order", { ascending: false }).limit(4);
    if (!error && data) setPackages(data as Package[]);
    setLoading(false);
  }

  if (loading) return <section className="py-20 md:py-28 bg-background"><div className="container flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div></section>;
  if (packages.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block text-sm font-medium text-primary tracking-widest uppercase mb-4">Exclusive Deals</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">Featured Packages</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg max-w-2xl mx-auto">Handpicked travel packages with the best value for your dream vacation</motion.p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg, index) => (
            <motion.div key={pkg.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="group">
              <div className="overflow-hidden rounded-3xl bg-card shadow-md transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 border">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={pkg.image_url || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=1935&auto=format&fit=crop"} alt={pkg.title} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  {pkg.package_type && <Badge className="absolute left-4 top-4 bg-primary">{packageTypeBadges[pkg.package_type] || pkg.package_type}</Badge>}
                </div>
                <div className="p-5">
                  <h3 className="mb-3 text-lg font-bold line-clamp-1 group-hover:text-primary transition-colors">{pkg.title}</h3>
                  <div className="mb-4 space-y-2 text-sm text-muted-foreground">
                    {pkg.destination && <p className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" />{pkg.destination.name}, {pkg.destination.country}</p>}
                    {pkg.duration && <p className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" />{pkg.duration}</p>}
                  </div>
                  {pkg.highlights && pkg.highlights.length > 0 && (<div className="flex flex-wrap gap-1.5 mb-4">{pkg.highlights.slice(0, 3).map((h) => (<span key={h} className="rounded-full bg-secondary px-2.5 py-1 text-xs text-muted-foreground">{h}</span>))}</div>)}
                  <div className="flex items-center justify-between border-t pt-4">
                    <div><span className="text-xl font-bold text-primary">₹{pkg.price.toLocaleString()}</span>{pkg.original_price && <span className="ml-2 text-sm text-muted-foreground line-through">₹{pkg.original_price.toLocaleString()}</span>}<p className="text-xs text-muted-foreground">per person</p></div>
                    <Button size="sm" className="rounded-full" asChild><Link to={`/packages/${pkg.id}`}>Book</Link></Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 text-center"><Button asChild size="lg" className="rounded-full px-8"><Link to="/packages">View All Packages<ArrowRight className="ml-2 h-4 w-4" /></Link></Button></div>
      </div>
    </section>
  );
}