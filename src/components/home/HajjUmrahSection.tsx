import { useState } from "react";
import { CheckCircle, ArrowRight, Star, Plane, Building, Users, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookingModal } from "@/components/BookingModal";

const packages = [
  {
    id: 1,
    title: "Umrah Economy",
    duration: "10 Days",
    price: "₹85,000",
    features: ["3-Star Hotel", "Return Flights", "Visa Included", "Ziyarat Tours"],
    popular: false,
  },
  {
    id: 2,
    title: "Umrah Premium",
    duration: "12 Days",
    price: "₹1,75,000",
    features: ["5-Star Hotel", "Business Class", "VIP Services", "Private Ziyarat"],
    popular: true,
  },
  {
    id: 3,
    title: "Hajj 2025",
    duration: "21 Days",
    price: "₹4,50,000",
    features: ["Complete Package", "All Meals", "Expert Guide", "Mecca & Medina"],
    popular: false,
  },
];

const highlights = [
  { icon: Plane, title: "Flight Included", desc: "Return airfare" },
  { icon: Building, title: "Near Haram", desc: "Walking distance" },
  { icon: Users, title: "Expert Guides", desc: "Religious scholars" },
  { icon: Clock, title: "24/7 Support", desc: "Always available" },
];

export function HajjUmrahSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="py-20 md:py-28 relative overflow-hidden bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460]">
      {/* Islamic Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Glowing Orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl" />

      <div className="container relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-amber-400 tracking-widest uppercase mb-4">
            <Star className="h-4 w-4 fill-amber-400" />
            Sacred Journeys
            <Star className="h-4 w-4 fill-amber-400" />
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Hajj & Umrah Packages
          </h2>
          <p className="text-lg text-white/70">
            Embark on your spiritual journey with complete peace of mind. 
            Our packages are designed to provide comfort and guidance throughout your pilgrimage.
          </p>
        </motion.div>

        {/* Highlight Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {highlights.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto mb-4">
                <item.icon className="h-7 w-7 text-white" />
              </div>
              <h4 className="font-semibold text-white mb-1">{item.title}</h4>
              <p className="text-sm text-white/60">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Package Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className={`relative rounded-3xl p-8 ${
                pkg.popular 
                  ? "bg-gradient-to-br from-amber-400 to-amber-600 text-foreground" 
                  : "bg-white/10 backdrop-blur-sm border border-white/20 text-white"
              }`}
            >
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-foreground text-background text-xs font-bold rounded-full">
                  MOST POPULAR
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold mb-2">{pkg.title}</h3>
                <p className={`text-sm ${pkg.popular ? "text-foreground/70" : "text-white/60"}`}>
                  {pkg.duration}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">{pkg.price}</span>
                <span className={`text-sm ${pkg.popular ? "text-foreground/70" : "text-white/60"}`}>/person</span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <CheckCircle className={`h-5 w-5 flex-shrink-0 ${pkg.popular ? "text-foreground" : "text-amber-400"}`} />
                    <span className={pkg.popular ? "text-foreground/90" : "text-white/80"}>{feature}</span>
                  </li>
                ))}
              </ul>

              <Button 
                className={`w-full rounded-xl h-12 ${
                  pkg.popular 
                    ? "bg-foreground text-background hover:bg-foreground/90" 
                    : "bg-white/20 hover:bg-white/30 text-white border-0"
                }`}
                onClick={() => setIsBookingOpen(true)}
              >
                Book Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <p className="text-white/60 mb-4">
            Need a customized package? We can tailor the perfect pilgrimage for you.
          </p>
          <Button 
            variant="outline" 
            size="lg" 
            className="rounded-full px-8 border-2 border-white bg-transparent text-white hover:bg-white hover:text-foreground"
            onClick={() => setIsBookingOpen(true)}
          >
            Get Custom Quote
          </Button>
        </motion.div>
      </div>

      <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />
    </section>
  );
}