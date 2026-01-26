import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Youtube, Mail, Phone, MapPin } from "lucide-react";
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
      <div className="container py-12 md:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <img src={logo} alt="Red Olive Vacations" className="h-12 w-auto rounded" />
            </Link>
            <p className="text-sm text-background/70">
              Your trusted travel partner for unforgettable journeys. Explore the world with confidence and comfort.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-primary transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    to={service.href}
                    className="text-sm text-background/70 hover:text-primary transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3 text-sm text-background/70">
              <p className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                123 Travel Street, Mumbai, Maharashtra, India - 400001
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" />
                +91 98765 43210
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" />
                info@redolivevacations.com
              </p>
            </div>
            <div className="pt-2">
              <h4 className="mb-2 text-sm font-medium">Newsletter</h4>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                />
                <Button size="sm">Subscribe</Button>
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
          <div className="flex gap-4 text-sm text-background/60">
            <Link to="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
