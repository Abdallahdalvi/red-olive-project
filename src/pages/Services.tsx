import { motion } from "framer-motion";
import { 
  Plane, FileText, Shield, Hotel, CreditCard, Briefcase, 
  Globe, Headphones, Users, Car, Camera, Utensils, 
  CheckCircle, ArrowRight, Phone, Star
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const mainServices = [
  {
    icon: Plane,
    title: "Flight Bookings",
    description: "Domestic and international flight bookings with best deals on all major airlines. We offer competitive prices and flexible booking options.",
    features: [
      "Best price guarantee",
      "All major airlines covered",
      "24/7 booking support",
      "Free cancellation options",
      "Group booking discounts"
    ],
    color: "bg-blue-500/10 text-blue-600"
  },
  {
    icon: FileText,
    title: "Visa Assistance",
    description: "Complete visa processing services for all countries. Our experts handle documentation, appointments, and follow-ups for hassle-free visa approval.",
    features: [
      "Document preparation",
      "Application submission",
      "Interview preparation",
      "Express processing",
      "High approval rate"
    ],
    color: "bg-green-500/10 text-green-600"
  },
  {
    icon: Shield,
    title: "Travel Insurance",
    description: "Comprehensive travel insurance covering medical emergencies, trip cancellation, lost baggage, and more for peace of mind during your travels.",
    features: [
      "Medical coverage worldwide",
      "Trip cancellation protection",
      "Lost baggage coverage",
      "Emergency evacuation",
      "24/7 claim assistance"
    ],
    color: "bg-purple-500/10 text-purple-600"
  },
  {
    icon: Hotel,
    title: "Hotel Bookings",
    description: "Handpicked hotels from budget to luxury across the globe. We ensure the best rates and verified reviews for comfortable stays.",
    features: [
      "Best rate guarantee",
      "Verified properties only",
      "Free cancellation options",
      "Loyalty rewards",
      "Special honeymoon packages"
    ],
    color: "bg-orange-500/10 text-orange-600"
  },
  {
    icon: CreditCard,
    title: "Forex Services",
    description: "Competitive foreign exchange rates with doorstep delivery. Get forex cards, currency exchange, and international money transfers.",
    features: [
      "Best exchange rates",
      "Forex travel cards",
      "Multi-currency options",
      "Doorstep delivery",
      "Zero hidden charges"
    ],
    color: "bg-emerald-500/10 text-emerald-600"
  },
  {
    icon: Briefcase,
    title: "Corporate Travel",
    description: "End-to-end corporate travel management including MICE, team outings, conferences, and business travel arrangements.",
    features: [
      "Dedicated account manager",
      "Cost optimization",
      "Policy compliance",
      "Expense reporting",
      "24/7 travel support"
    ],
    color: "bg-indigo-500/10 text-indigo-600"
  }
];

const additionalServices = [
  {
    icon: Globe,
    title: "Hajj & Umrah Packages",
    description: "Complete pilgrimage packages with visa, flights, accommodation, and guided tours."
  },
  {
    icon: Car,
    title: "Airport Transfers",
    description: "Reliable pickup and drop services at all major airports worldwide."
  },
  {
    icon: Camera,
    title: "Sightseeing Tours",
    description: "Guided tours with local experts at popular destinations."
  },
  {
    icon: Users,
    title: "Group Tours",
    description: "Specially curated group packages for families and friends."
  },
  {
    icon: Utensils,
    title: "Cruise Bookings",
    description: "Luxury cruise packages across popular routes worldwide."
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Round-the-clock assistance for all your travel needs."
  }
];

const whyChooseUs = [
  {
    title: "20+ Years Experience",
    description: "Two decades of expertise in crafting perfect travel experiences"
  },
  {
    title: "Best Price Guarantee",
    description: "Competitive pricing with no hidden costs or surprises"
  },
  {
    title: "Personalized Service",
    description: "Tailored travel solutions based on your preferences"
  },
  {
    title: "Trusted by 50,000+",
    description: "Join our community of satisfied travelers"
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4">Our Services</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Complete Travel Solutions Under One Roof
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From visa processing to hotel bookings, flight reservations to travel insurance – 
              we handle everything so you can focus on enjoying your journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link to="/contact">Get a Quote</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <a href="tel:+919326899470">
                  <Phone className="h-4 w-4 mr-2" />
                  Call Us Now
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Services Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge className="mb-4">Core Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Your Travel
            </h2>
            <p className="text-muted-foreground">
              Comprehensive travel services designed to make your journey seamless from start to finish.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mainServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group">
                  <CardHeader>
                    <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <service.icon className="h-7 w-7" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-6">{service.description}</p>
                    <ul className="space-y-2">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button variant="ghost" className="w-full mt-6 group/btn" asChild>
                      <Link to="/contact">
                        Get Started
                        <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge className="mb-4">More Services</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Additional Travel Services
            </h2>
            <p className="text-muted-foreground">
              Beyond the basics, we offer a range of specialized services to enhance your travel experience.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-lg transition-all group">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <service.icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{service.title}</h3>
                      <p className="text-sm text-muted-foreground">{service.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4">Why Choose Us</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Your Journey, Our Expertise
              </h2>
              <p className="text-muted-foreground mb-8">
                With over two decades of experience in the travel industry, we've built a 
                reputation for reliability, personalized service, and attention to detail 
                that sets us apart.
              </p>

              <div className="grid sm:grid-cols-2 gap-6">
                {whyChooseUs.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{item.title}</h4>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <Button size="lg" className="mt-8" asChild>
                <Link to="/about">Learn More About Us</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"
                alt="Travel services"
                className="rounded-2xl shadow-2xl w-full"
              />
              <Card className="absolute -bottom-6 -left-6 shadow-xl">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center">
                      <Headphones className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-bold text-2xl">24/7</p>
                      <p className="text-sm text-muted-foreground">Customer Support</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge className="mb-4">How It Works</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple Steps to Your Dream Trip
            </h2>
            <p className="text-muted-foreground">
              We've streamlined the booking process to make planning your trip as easy as possible.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Share Your Plans", description: "Tell us about your dream destination and travel preferences" },
              { step: 2, title: "Get Custom Quote", description: "Receive a personalized itinerary and competitive pricing" },
              { step: 3, title: "Confirm & Pay", description: "Review, finalize and make secure payment" },
              { step: 4, title: "Travel Happy", description: "Enjoy your trip with our 24/7 support" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground text-2xl font-bold flex items-center justify-center mx-auto mb-4">
                  {item.step}
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-0.5 bg-primary/20" />
                )}
                <h3 className="font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground overflow-hidden">
              <CardContent className="p-8 md:p-12 text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Need Help Planning Your Trip?
                </h2>
                <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                  Our travel experts are ready to help you plan the perfect getaway. 
                  Get in touch for a free consultation and personalized quote.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/contact">Request a Quote</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                    <a href="https://wa.me/919326899470" target="_blank" rel="noopener noreferrer">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp Us
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
