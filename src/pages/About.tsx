import { motion } from "framer-motion";
import { 
  Users, Target, Heart, Award, Globe, Calendar, 
  CheckCircle, Star, Plane, MapPin, Shield, Clock
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Mohammed Dalvi",
    role: "Founder & CEO",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400",
    description: "20+ years of experience in the travel industry"
  },
  {
    name: "Fatima Khan",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
    description: "Expert in Hajj & Umrah pilgrimage planning"
  },
  {
    name: "Ahmed Sheikh",
    role: "Travel Consultant",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
    description: "Specializes in luxury & honeymoon packages"
  },
  {
    name: "Priya Sharma",
    role: "Customer Relations",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
    description: "Dedicated to exceptional customer service"
  }
];

const values = [
  {
    icon: Heart,
    title: "Customer First",
    description: "Your satisfaction and safety are our top priorities in every journey we plan."
  },
  {
    icon: Shield,
    title: "Trust & Transparency",
    description: "Honest pricing with no hidden costs. What we promise is what we deliver."
  },
  {
    icon: Star,
    title: "Excellence",
    description: "We strive for perfection in every detail of your travel experience."
  },
  {
    icon: Globe,
    title: "Global Expertise",
    description: "Deep knowledge of destinations worldwide with local insights and connections."
  }
];

const timeline = [
  {
    year: "2005",
    title: "Company Founded",
    description: "Red Olive Vacations was established in Mumbai with a vision to make travel accessible to all."
  },
  {
    year: "2010",
    title: "Hajj & Umrah Division",
    description: "Launched dedicated pilgrimage services, becoming a trusted name for religious travel."
  },
  {
    year: "2015",
    title: "10,000+ Happy Travelers",
    description: "Celebrated the milestone of serving over 10,000 satisfied customers."
  },
  {
    year: "2018",
    title: "International Expansion",
    description: "Expanded partnerships with global airlines and luxury hotel chains."
  },
  {
    year: "2020",
    title: "Digital Transformation",
    description: "Launched online booking platform and 24/7 customer support services."
  },
  {
    year: "2024",
    title: "Industry Recognition",
    description: "Awarded 'Best Travel Agency' by Maharashtra Tourism Association."
  }
];

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "50,000+", label: "Happy Travelers" },
  { value: "100+", label: "Destinations" },
  { value: "98%", label: "Satisfaction Rate" }
];

export default function About() {
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
            <Badge className="mb-4">About Us</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Your Trusted Travel Partner Since 2005
            </h1>
            <p className="text-lg text-muted-foreground">
              At Red Olive Vacations & Travels, we believe that every journey should be extraordinary. 
              With two decades of experience, we've been crafting unforgettable travel experiences 
              for thousands of happy travelers.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-primary text-primary-foreground">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.value}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Badge className="mb-4">Our Story</Badge>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                From a Small Office to a Leading Travel Agency
              </h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Red Olive Vacations & Travels began its journey in 2005 from a small office in 
                  Andheri West, Mumbai. Founded by passionate travelers with a dream to make 
                  world-class travel experiences accessible to everyone.
                </p>
                <p>
                  What started as a family business has now grown into one of Maharashtra's most 
                  trusted travel agencies. Our specialization in Hajj & Umrah pilgrimages, combined 
                  with our expertise in leisure and corporate travel, has earned us the trust of 
                  over 50,000 travelers.
                </p>
                <p>
                  Today, we continue to operate with the same values that defined us from day one: 
                  integrity, personalized service, and an unwavering commitment to creating 
                  memorable journeys.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button asChild>
                  <Link to="/contact">Start Your Journey</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/packages">View Packages</Link>
                </Button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400"
                  alt="Travel destination"
                  className="rounded-2xl w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1564769625905-50e93615e769?w=400"
                  alt="Hajj pilgrimage"
                  className="rounded-2xl w-full h-48 object-cover mt-8"
                />
                <img
                  src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=400"
                  alt="Dubai skyline"
                  className="rounded-2xl w-full h-48 object-cover"
                />
                <img
                  src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400"
                  alt="Bali temple"
                  className="rounded-2xl w-full h-48 object-cover mt-8"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-card rounded-2xl p-6 shadow-xl border">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">Award Winning</p>
                    <p className="text-sm text-muted-foreground">Best Travel Agency 2024</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Values Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge className="mb-4">Mission & Values</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Drives Us Every Day
            </h2>
            <p className="text-muted-foreground">
              Our mission is to transform travel dreams into reality while upholding the 
              highest standards of service and integrity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                      <value.icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge className="mb-4">Our Team</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Meet the Experts Behind Your Journeys
            </h2>
            <p className="text-muted-foreground">
              Our dedicated team of travel professionals is committed to making your 
              travel experience seamless and memorable.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden group hover:shadow-xl transition-all">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-lg font-semibold text-foreground">{member.name}</h3>
                      <p className="text-primary font-medium">{member.role}</p>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground">{member.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-secondary/30">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <Badge className="mb-4">Our Journey</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Milestones That Define Us
            </h2>
            <p className="text-muted-foreground">
              A look back at the key moments that shaped Red Olive Vacations into 
              the trusted travel partner we are today.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

              {timeline.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center gap-8 mb-8 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : "md:text-left"} hidden md:block`}>
                    <Card className="inline-block">
                      <CardContent className="p-6">
                        <Badge className="mb-2">{item.year}</Badge>
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-8 h-8 rounded-full bg-primary flex items-center justify-center -translate-x-1/2 z-10">
                    <CheckCircle className="h-4 w-4 text-primary-foreground" />
                  </div>

                  <div className="flex-1 hidden md:block" />

                  {/* Mobile card */}
                  <Card className="ml-12 md:hidden">
                    <CardContent className="p-4">
                      <Badge className="mb-2">{item.year}</Badge>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
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
                  Ready to Start Your Journey?
                </h2>
                <p className="text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                  Join the 50,000+ travelers who have trusted us with their dream vacations. 
                  Let's plan your next adventure together.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Button size="lg" variant="secondary" asChild>
                    <Link to="/contact">Contact Us</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="border-primary-foreground/30 hover:bg-primary-foreground/10" asChild>
                    <a href="tel:+919326899470">
                      Call +91 93268 99470
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
