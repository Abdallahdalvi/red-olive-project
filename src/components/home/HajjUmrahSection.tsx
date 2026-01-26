import { Link } from "react-router-dom";
import { CheckCircle, ArrowRight, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

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
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-foreground" />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
      </div>

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image Stack */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1564769625392-651b89c75a05?q=80&w=1974&auto=format&fit=crop"
                  alt="Mecca Kaaba"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              
              {/* Floating Stats Card */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-8 -right-8 bg-card rounded-2xl p-6 shadow-2xl"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <Star className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-foreground">1000+</p>
                    <p className="text-muted-foreground">Pilgrims Served</p>
                  </div>
                </div>
              </motion.div>

              {/* Decorative Circle */}
              <div className="absolute -top-6 -left-6 w-24 h-24 rounded-full border-4 border-primary/30" />
            </div>
          </motion.div>

          {/* Right - Content */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-background"
          >
            <span className="inline-block text-sm font-medium text-primary tracking-widest uppercase mb-4">
              Sacred Journeys
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Hajj & Umrah Packages
            </h2>
            <p className="text-lg text-background/80 mb-8">
              Embark on your spiritual journey with peace of mind. Our carefully crafted 
              Hajj and Umrah packages provide complete guidance and comfortable arrangements, 
              allowing you to focus entirely on your worship.
            </p>

            <ul className="space-y-4 mb-10">
              {features.map((feature, index) => (
                <motion.li 
                  key={feature} 
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <CheckCircle className="h-6 w-6 flex-shrink-0 text-primary mt-0.5" />
                  <span className="text-background/90">{feature}</span>
                </motion.li>
              ))}
            </ul>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="rounded-full px-8" asChild>
                <Link to="/services/hajj-umrah">
                  View Packages
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="rounded-full px-8 border-background/30 text-background hover:bg-background hover:text-foreground" 
                asChild
              >
                <Link to="/contact">Free Consultation</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
