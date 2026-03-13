import { Clock, CreditCard, Headphones, Shield, Star, Users } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
  { icon: CreditCard, title: "Affordable Pricing", description: "Best value packages with transparent pricing and no hidden costs." },
  { icon: Headphones, title: "24/7 Support", description: "Round-the-clock customer support throughout your journey." },
  { icon: Star, title: "Personalized Itineraries", description: "Customized travel plans tailored to your preferences." },
  { icon: Shield, title: "Trusted Since 2009", description: "Over 15 years of experience serving happy travelers." },
  { icon: Clock, title: "Easy Visa Processing", description: "Hassle-free visa assistance with high success rate." },
  { icon: Users, title: "Expert Team", description: "Experienced consultants to guide you every step." },
];

export function WhyChooseUs() {
  return (
    <section className="py-20 md:py-28 bg-secondary/50 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="container relative z-10">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block text-sm font-medium text-primary tracking-widest uppercase mb-4">Why Red Olive</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">Why Choose Us</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg max-w-2xl mx-auto">We're committed to making your travel experience seamless, memorable, and stress-free</motion.p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div key={reason.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="text-center group">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-card shadow-lg group-hover:shadow-xl transition-shadow border"><reason.icon className="h-10 w-10 text-primary" /></div>
              <h3 className="mb-3 text-xl font-bold">{reason.title}</h3><p className="text-muted-foreground">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}