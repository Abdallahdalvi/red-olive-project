import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  MapPin, Clock, Star, Check, X, Calendar, Users, Phone, 
  Mail, ArrowLeft, Share2, Heart, Shield, Plane, Hotel, 
  Utensils, Camera, Bus
} from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

interface Package {
  id: string;
  title: string;
  description: string | null;
  destination_id: string | null;
  duration: string | null;
  price: number;
  original_price: number | null;
  package_type: string | null;
  image_url: string | null;
  highlights: string[] | null;
  is_featured: boolean | null;
  destination?: {
    name: string;
    country: string;
  } | null;
}

// Sample itinerary data (in production, this would come from the database)
const sampleItinerary = [
  {
    day: 1,
    title: "Arrival & Welcome",
    description: "Arrive at the destination airport. Meet and greet by our representative. Transfer to hotel and check-in. Evening at leisure to explore the surroundings. Welcome dinner at the hotel.",
    meals: ["Dinner"],
    accommodation: "5-Star Hotel"
  },
  {
    day: 2,
    title: "City Tour & Landmarks",
    description: "After breakfast, embark on a comprehensive city tour. Visit major landmarks, historical sites, and cultural attractions. Enjoy lunch at a local restaurant. Afternoon shopping at local markets. Return to hotel for rest.",
    meals: ["Breakfast", "Lunch"],
    accommodation: "5-Star Hotel"
  },
  {
    day: 3,
    title: "Adventure & Exploration",
    description: "Full day excursion to nearby attractions. Experience local activities and adventures. Enjoy scenic views and photo opportunities. Packed lunch provided. Evening cultural show and dinner.",
    meals: ["Breakfast", "Lunch", "Dinner"],
    accommodation: "5-Star Hotel"
  },
  {
    day: 4,
    title: "Leisure & Departure",
    description: "Morning at leisure for last-minute shopping or relaxation. Late checkout available. Transfer to airport for departure with beautiful memories.",
    meals: ["Breakfast"],
    accommodation: "N/A"
  }
];

const inclusions = [
  "Return economy class airfare",
  "Airport transfers",
  "Hotel accommodation as per itinerary",
  "Daily breakfast",
  "Sightseeing as per itinerary",
  "All applicable taxes",
  "Visa assistance",
  "Travel insurance",
  "24/7 customer support"
];

const exclusions = [
  "Personal expenses",
  "Tips and gratuities",
  "Optional tours and activities",
  "Meals not mentioned in itinerary",
  "Travel insurance upgrade",
  "Visa fees (if applicable)",
  "Early check-in / late checkout",
  "Anything not mentioned in inclusions"
];

export default function PackageDetail() {
  const { id } = useParams();
  const [pkg, setPkg] = useState<Package | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    from_city: "",
    travelers: "2",
    travel_date: "",
    message: ""
  });

  useEffect(() => {
    if (id) {
      fetchPackage();
    }
  }, [id]);

  async function fetchPackage() {
    const { data, error } = await supabase
      .from("packages")
      .select(`
        *,
        destination:destinations(name, country)
      `)
      .eq("id", id)
      .eq("is_active", true)
      .maybeSingle();

    if (!error && data) {
      setPkg(data);
    }
    setLoading(false);
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    // Read from DOM to handle browser autofill bypassing React state
    const formEl = e.currentTarget;
    const fromCityInput = formEl.elements.namedItem("from_city") as HTMLInputElement | null;
    const fromCity = (fromCityInput?.value ?? formData.from_city).trim();

    const { error } = await supabase.from("inquiries").insert({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      from_city: fromCity || null,
      travelers: parseInt(formData.travelers),
      travel_date: formData.travel_date || null,
      message: `Package Inquiry: ${pkg?.title}\n\n${formData.message}`,
      destination: pkg?.destination?.name || pkg?.title,
      inquiry_type: "booking",
      source: "package_detail"
    });

    setSubmitting(false);

    if (error) {
      toast({
        title: "Error",
        description: "Failed to submit inquiry. Please try again.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Inquiry Submitted!",
        description: "Our travel expert will contact you within 24 hours."
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        from_city: "",
        travelers: "2",
        travel_date: "",
        message: ""
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20">
          <div className="h-96 bg-muted rounded-2xl animate-pulse mb-8" />
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-4 bg-muted rounded animate-pulse" />
            </div>
            <div className="h-96 bg-muted rounded-2xl animate-pulse" />
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!pkg) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <div className="text-6xl mb-4">📦</div>
          <h1 className="text-2xl font-bold mb-4">Package Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The package you're looking for doesn't exist or is no longer available.
          </p>
          <Button asChild>
            <Link to="/packages">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse All Packages
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const discount = pkg.original_price 
    ? Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100) 
    : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src={pkg.image_url || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1600"}
          alt={pkg.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          {pkg.is_featured && (
            <Badge className="bg-primary">
              <Star className="h-3 w-3 mr-1" />
              Featured
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="destructive">{discount}% OFF</Badge>
          )}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button variant="secondary" size="icon" onClick={() => navigator.share?.({ title: pkg.title, url: window.location.href })}>
            <Share2 className="h-4 w-4" />
          </Button>
          <Button variant="secondary" size="icon">
            <Heart className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Main Content */}
      <section className="relative -mt-20 pb-16">
        <div className="container">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Package Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-2"
            >
              {/* Back Button */}
              <Button variant="outline" size="sm" asChild className="mb-6">
                <Link to="/packages">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  All Packages
                </Link>
              </Button>

              {/* Package Header */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {pkg.package_type && (
                      <Badge variant="secondary">{pkg.package_type}</Badge>
                    )}
                    {pkg.duration && (
                      <Badge variant="outline">
                        <Clock className="h-3 w-3 mr-1" />
                        {pkg.duration}
                      </Badge>
                    )}
                  </div>

                  <h1 className="text-3xl md:text-4xl font-bold mb-4">{pkg.title}</h1>

                  {pkg.destination && (
                    <p className="text-lg text-muted-foreground flex items-center gap-2 mb-4">
                      <MapPin className="h-5 w-5 text-primary" />
                      {pkg.destination.name}, {pkg.destination.country}
                    </p>
                  )}

                  <p className="text-muted-foreground leading-relaxed">
                    {pkg.description || "Experience an unforgettable journey with our carefully curated travel package."}
                  </p>

                  {/* Highlights */}
                  {pkg.highlights && pkg.highlights.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">Package Highlights</h3>
                      <div className="flex flex-wrap gap-2">
                        {pkg.highlights.map((highlight, index) => (
                          <Badge key={index} variant="outline" className="py-1.5">
                            <Check className="h-3 w-3 mr-1 text-green-500" />
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Tabs for Itinerary, Inclusions, etc. */}
              <Tabs defaultValue="itinerary" className="mb-6">
                <TabsList className="w-full justify-start overflow-x-auto">
                  <TabsTrigger value="itinerary">Itinerary</TabsTrigger>
                  <TabsTrigger value="inclusions">Inclusions</TabsTrigger>
                  <TabsTrigger value="exclusions">Exclusions</TabsTrigger>
                  <TabsTrigger value="policy">Policy</TabsTrigger>
                </TabsList>

                <TabsContent value="itinerary" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Day-by-Day Itinerary</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {sampleItinerary.map((day) => (
                        <div key={day.day} className="relative pl-8 pb-6 border-l-2 border-primary/20 last:border-0 last:pb-0">
                          <div className="absolute -left-3 top-0 w-6 h-6 rounded-full bg-primary text-primary-foreground text-sm flex items-center justify-center font-bold">
                            {day.day}
                          </div>
                          <h4 className="text-lg font-semibold mb-2">{day.title}</h4>
                          <p className="text-muted-foreground mb-3">{day.description}</p>
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Utensils className="h-4 w-4" />
                              <span>{day.meals.join(", ")}</span>
                            </div>
                            <div className="flex items-center gap-1 text-muted-foreground">
                              <Hotel className="h-4 w-4" />
                              <span>{day.accommodation}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="inclusions" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-green-600">
                        <Check className="h-5 w-5" />
                        What's Included
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {inclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="exclusions" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-red-600">
                        <X className="h-5 w-5" />
                        What's Not Included
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {exclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <X className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="policy" className="mt-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Booking & Cancellation Policy</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4 text-muted-foreground">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Booking Policy</h4>
                        <p>A 30% deposit is required at the time of booking. The balance amount is due 30 days before departure.</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Cancellation Policy</h4>
                        <ul className="list-disc list-inside space-y-1">
                          <li>30+ days before departure: Full refund minus processing fee</li>
                          <li>15-30 days before departure: 50% refund</li>
                          <li>Less than 15 days: No refund</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Important Notes</h4>
                        <p>Prices are subject to availability. Festival and peak season surcharges may apply. Valid passport required.</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </motion.div>

            {/* Right Column - Booking Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:sticky lg:top-24 h-fit"
            >
              <Card className="shadow-xl">
                <CardHeader className="bg-gradient-to-r from-primary/10 to-secondary/10">
                  <CardTitle className="flex items-center justify-between">
                    <span>Book This Package</span>
                    <div className="text-right">
                      {pkg.original_price && pkg.original_price > pkg.price && (
                        <span className="text-sm text-muted-foreground line-through block">
                          ₹{pkg.original_price.toLocaleString()}
                        </span>
                      )}
                      <span className="text-2xl font-bold text-primary">
                        ₹{pkg.price.toLocaleString()}
                      </span>
                      <span className="text-sm text-muted-foreground">/person</span>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="from_city">From (Departure City) *</Label>
                      <Input
                        id="from_city"
                        name="from_city"
                        value={formData.from_city}
                        onChange={(e) => setFormData({ ...formData, from_city: e.target.value })}
                        placeholder="Where are you traveling from?"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="travelers">Travelers</Label>
                        <Select value={formData.travelers} onValueChange={(val) => setFormData({ ...formData, travelers: val })}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                              <SelectItem key={num} value={num.toString()}>
                                {num} {num === 1 ? "Person" : "People"}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="travel_date">Travel Date</Label>
                        <Input
                          id="travel_date"
                          type="date"
                          value={formData.travel_date}
                          onChange={(e) => setFormData({ ...formData, travel_date: e.target.value })}
                          min={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="message">Special Requirements</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Any special requests or questions?"
                        rows={3}
                      />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                      {submitting ? "Submitting..." : "Send Inquiry"}
                    </Button>

                    <p className="text-xs text-muted-foreground text-center">
                      Our travel expert will contact you within 24 hours
                    </p>
                  </form>

                  {/* Contact Options */}
                  <div className="mt-6 pt-6 border-t space-y-3">
                    <p className="text-sm font-medium text-center mb-4">Or contact us directly</p>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="tel:+919326899470">
                        <Phone className="h-4 w-4 mr-2" />
                        +91 93268 99470
                      </a>
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                      <a href="https://wa.me/919326899470" target="_blank" rel="noopener noreferrer">
                        <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                      </a>
                    </Button>
                  </div>

                  {/* Trust Badges */}
                  <div className="mt-6 pt-6 border-t">
                    <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4 text-green-500" />
                        <span>Secure Booking</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span>Best Price Guarantee</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
