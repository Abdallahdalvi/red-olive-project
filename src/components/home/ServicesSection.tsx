import { Link } from "react-router-dom";
import { Plane, Globe, Heart, Briefcase, FileCheck, Moon, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  { icon: Plane, title: "Domestic Tours", description: "Explore India's diverse beauty with curated packages.", href: "/services", color: "from-blue-500/20 to-blue-600/20" },
  { icon: Globe, title: "International Tours", description: "World-famous destinations with hassle-free planning.", href: "/services", color: "from-purple-500/20 to-purple-600/20" },
  { icon: Moon, title: "Hajj & Umrah", description: "Sacred pilgrimages with complete guidance.", href: "/services/hajj-umrah", color: "from-emerald-500/20 to-emerald-600/20" },
  { icon: Heart, title: "Honeymoon", description: "Romantic getaways for lasting memories.", href: "/services/honeymoon", color: "from-pink-500/20 to-pink-600/20" },
  { icon: Briefcase, title: "Corporate Travel", description: "Professional solutions for business events.", href: "/services/corporate", color: "from-amber-500/20 to-amber-600/20" },
  { icon: FileCheck, title: "Visa Assistance", description: "Complete visa processing support.", href: "/services/visa", color: "from-cyan-500/20 to-cyan-600/20" },
];

export function ServicesSection() {
  return (
    <section className="py-20 md:py-28 bg-secondary/50">
      <div className="container">
        <div className="text-center mb-16">
          <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block text-sm font-medium text-primary tracking-widest uppercase mb-4">What We Offer</motion.span>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-4xl md:text-5xl font-bold mb-4">Our Services</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-muted-foreground text-lg max-w-2xl mx-auto">Comprehensive travel services to make your journey seamless and memorable</motion.p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div key={service.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Link to={service.href} className="group block h-full rounded-3xl bg-card border p-8 transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1">
                <div className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${service.color}`}><service.icon className="h-8 w-8 text-primary" /></div>
                <h3 className="mb-3 text-xl font-bold group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <div className="flex items-center text-primary font-medium">Learn More<ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-2" /></div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}