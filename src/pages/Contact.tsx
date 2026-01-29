import { useState } from "react";
import { Send, Phone, Mail, MapPin, Clock, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    travelDate: "",
    travelers: "",
    budget: "",
    inquiryType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { error } = await supabase.from("inquiries").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      destination: formData.destination,
      travel_date: formData.travelDate || null,
      travelers: formData.travelers ? parseInt(formData.travelers) : null,
      budget: formData.budget || null,
      inquiry_type: formData.inquiryType || null,
      message: formData.message,
      source: "contact_page",
      status: "new",
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Inquiry Submitted!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        destination: "",
        travelDate: "",
        travelers: "",
        budget: "",
        inquiryType: "",
        message: "",
      });
    }
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      value: "+91 93268 99470",
      link: "tel:+919326899470",
    },
    {
      icon: Mail,
      title: "Email",
      value: "info@redolivevnl.com",
      link: "mailto:info@redolivevnl.com",
    },
    {
      icon: MapPin,
      title: "Office",
      value: "309, 3rd Floor, Crystal Plaza, New Link Rd, opp. Infiniti Mall, Saraswati Baug, Natwar Nagar, Andheri West, Mumbai, Maharashtra 400060",
      link: "https://maps.google.com/?q=Crystal+Plaza+New+Link+Road+Andheri+West+Mumbai",
    },
    {
      icon: Clock,
      title: "Working Hours",
      value: "Mon - Sat: 10:00 AM - 7:00 PM",
      link: null,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-primary/5 py-20 md:py-28">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920')] bg-cover bg-center opacity-10" />
          <div className="container relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="inline-block text-sm font-medium text-primary tracking-widest uppercase mb-4">
                Get In Touch
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Contact Us
              </h1>
              <p className="text-lg text-muted-foreground">
                Ready to start your journey? Get in touch with our travel experts and let us help you plan the perfect vacation.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-12 -mt-10 relative z-20">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {info.link ? (
                    <a
                      href={info.link}
                      target={info.link.startsWith("http") ? "_blank" : undefined}
                      rel={info.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="block h-full"
                    >
                      <div className="bg-card rounded-2xl p-6 shadow-lg border h-full hover:shadow-xl transition-shadow">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                          <info.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                        <p className="text-muted-foreground text-sm">{info.value}</p>
                      </div>
                    </a>
                  ) : (
                    <div className="bg-card rounded-2xl p-6 shadow-lg border h-full">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                        <info.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-bold text-lg mb-2">{info.title}</h3>
                      <p className="text-muted-foreground text-sm">{info.value}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Form & Map Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-start">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="bg-card rounded-3xl p-8 md:p-10 shadow-2xl border"
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-2">Send Us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and our team will get back to you within 24 hours.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      name="name"
                      placeholder="Your Name *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl"
                    />
                    <Input
                      name="phone"
                      type="tel"
                      placeholder="Phone Number *"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <Input
                    name="email"
                    type="email"
                    placeholder="Email Address *"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-12 rounded-xl"
                  />

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      name="destination"
                      placeholder="Interested Destination"
                      value={formData.destination}
                      onChange={handleChange}
                      className="h-12 rounded-xl"
                    />
                    <Input
                      name="travelDate"
                      type="date"
                      placeholder="Travel Date"
                      value={formData.travelDate}
                      onChange={handleChange}
                      className="h-12 rounded-xl"
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Input
                      name="travelers"
                      type="number"
                      min="1"
                      placeholder="Number of Travelers"
                      value={formData.travelers}
                      onChange={handleChange}
                      className="h-12 rounded-xl"
                    />
                    <Select
                      value={formData.budget}
                      onValueChange={(value) => setFormData((prev) => ({ ...prev, budget: value }))}
                    >
                      <SelectTrigger className="h-12 rounded-xl">
                        <SelectValue placeholder="Budget Range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="under-50k">Under ₹50,000</SelectItem>
                        <SelectItem value="50k-1lakh">₹50,000 - ₹1,00,000</SelectItem>
                        <SelectItem value="1lakh-2lakh">₹1,00,000 - ₹2,00,000</SelectItem>
                        <SelectItem value="2lakh-5lakh">₹2,00,000 - ₹5,00,000</SelectItem>
                        <SelectItem value="above-5lakh">Above ₹5,00,000</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Select
                    value={formData.inquiryType}
                    onValueChange={(value) => setFormData((prev) => ({ ...prev, inquiryType: value }))}
                  >
                    <SelectTrigger className="h-12 rounded-xl">
                      <SelectValue placeholder="Inquiry Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="holiday-package">Holiday Package</SelectItem>
                      <SelectItem value="honeymoon">Honeymoon</SelectItem>
                      <SelectItem value="hajj-umrah">Hajj & Umrah</SelectItem>
                      <SelectItem value="corporate">Corporate Travel</SelectItem>
                      <SelectItem value="visa-services">Visa Services</SelectItem>
                      <SelectItem value="flight-booking">Flight Booking</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>

                  <Textarea
                    name="message"
                    placeholder="Your Message (Optional)"
                    value={formData.message}
                    onChange={handleChange}
                    rows={4}
                    className="rounded-xl resize-none"
                  />

                  <Button type="submit" className="w-full h-12 rounded-xl text-base" disabled={isSubmitting}>
                    {isSubmitting ? (
                      "Sending..."
                    ) : (
                      <>
                        Send Inquiry
                        <Send className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>

                <div className="mt-8 pt-6 border-t">
                  <p className="text-sm text-muted-foreground mb-4">Or reach us directly via WhatsApp</p>
                  <a
                    href="https://wa.me/919326899470"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-3 rounded-full bg-[#25D366] px-6 py-3 text-white font-medium transition-all hover:shadow-lg hover:-translate-y-1"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </motion.div>

              {/* Map */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="space-y-6"
              >
                <div className="rounded-3xl overflow-hidden shadow-2xl border h-[400px] lg:h-[500px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3769.2!2d72.8358!3d19.1380!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b63aceef0c69%3A0x2aa80cf2287df8d7!2s309%2C%20Crystal%20Plaza%2C%20New%20Link%20Rd%2C%20opp.%20Infiniti%20Mall%2C%20Saraswati%20Baug%2C%20Natwar%20Nagar%2C%20Andheri%20West%2C%20Mumbai%2C%20Maharashtra%20400060!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Red Olive Vacations Office Location"
                  />
                </div>

                <div className="bg-card rounded-2xl p-6 shadow-lg border">
                  <h3 className="font-bold text-lg mb-4">Why Choose Red Olive Vacations?</h3>
                  <ul className="space-y-3">
                    {[
                      "24/7 Customer Support",
                      "Best Price Guarantee",
                      "Customized Itineraries",
                      "Expert Travel Consultants",
                      "Hassle-free Visa Assistance",
                    ].map((item) => (
                      <li key={item} className="flex items-center gap-3 text-muted-foreground">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
