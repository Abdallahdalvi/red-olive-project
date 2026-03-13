import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.jpg";

const quickLinks = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about" },
  { name: "Destinations", href: "/destinations" },
  { name: "Packages", href: "/packages" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

const services = [
  { name: "Domestic Tours", href: "/services" },
  { name: "International Tours", href: "/services" },
  { name: "Hajj & Umrah", href: "/services/hajj-umrah" },
  { name: "Honeymoon Packages", href: "/services/honeymoon" },
  { name: "Corporate Travel", href: "/services/corporate" },
  { name: "Visa Assistance", href: "/services/visa" },
];

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container py-16 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Red Olive Vacations" className="h-14 w-auto rounded-lg" />
            </Link>
            <p className="text-background/70 mb-6 leading-relaxed">
              Your trusted travel partner for unforgettable journeys. Explore the world with confidence and comfort.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"><Facebook className="h-4 w-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"><Instagram className="h-4 w-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"><Twitter className="h-4 w-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-background/10 hover:bg-primary flex items-center justify-center transition-colors"><Youtube className="h-4 w-4" /></a>
            </div>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-background/70 hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Our Services</h3>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service.name}>
                  <Link to={service.href} className="text-background/70 hover:text-primary transition-colors inline-flex items-center gap-2 group">
                    <ArrowRight className="h-3 w-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-6 text-lg font-bold">Contact Us</h3>
            <div className="space-y-4 text-background/70 mb-8">
              <p className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0 text-primary" />
                309, 3rd Floor, Crystal Plaza, New Link Rd, opp. Infiniti Mall, Saraswati Baug, Natwar Nagar, Andheri West, Mumbai, Maharashtra 400060
              </p>
              <p className="flex items-center gap-3">
                <Phone className="h-5 w-5 flex-shrink-0 text-primary" />
                +91 93268 99470
              </p>
              <p className="flex items-center gap-3">
                <Mail className="h-5 w-5 flex-shrink-0 text-primary" />
                info@redolivevnl.com
              </p>
            </div>
            <div>
              <h4 className="mb-3 font-medium">Newsletter</h4>
              <div className="flex gap-2">
                <Input type="email" placeholder="Your email" className="bg-background/10 border-background/20 text-background placeholder:text-background/50 rounded-full" />
                <Button size="icon" className="rounded-full flex-shrink-0"><ArrowRight className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="border-t border-background/10">
        <div className="container flex flex-col items-center justify-between gap-4 py-6 md:flex-row">
          <p className="text-sm text-background/60">
            © {new Date().getFullYear()} Red Olive Vacations & Travels. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-background/60">
            <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}