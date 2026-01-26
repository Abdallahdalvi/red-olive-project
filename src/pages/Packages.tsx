import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Clock, Users, Star, ChevronDown } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

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
  };
}

interface Destination {
  id: string;
  name: string;
  country: string;
}

const packageTypes = [
  "Honeymoon",
  "Family",
  "Adventure",
  "Luxury",
  "Budget",
  "Group",
  "Solo",
  "Pilgrimage",
];

export default function Packages() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500000]);
  const [sortBy, setSortBy] = useState<string>("featured");

  useEffect(() => {
    fetchPackages();
    fetchDestinations();
  }, []);

  async function fetchPackages() {
    const { data, error } = await supabase
      .from("packages")
      .select(`
        *,
        destination:destinations(name, country)
      `)
      .eq("is_active", true)
      .order("is_featured", { ascending: false });

    if (!error && data) {
      setPackages(data);
    }
    setLoading(false);
  }

  async function fetchDestinations() {
    const { data, error } = await supabase
      .from("destinations")
      .select("id, name, country")
      .eq("is_active", true)
      .order("name");

    if (!error && data) {
      setDestinations(data);
    }
  }

  const maxPrice = useMemo(() => {
    if (packages.length === 0) return 500000;
    return Math.max(...packages.map(p => p.price));
  }, [packages]);

  const filteredPackages = useMemo(() => {
    let result = packages;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (pkg) =>
          pkg.title.toLowerCase().includes(query) ||
          pkg.description?.toLowerCase().includes(query) ||
          pkg.destination?.name.toLowerCase().includes(query) ||
          pkg.destination?.country.toLowerCase().includes(query)
      );
    }

    // Type filter
    if (selectedTypes.length > 0) {
      result = result.filter((pkg) => pkg.package_type && selectedTypes.includes(pkg.package_type));
    }

    // Destination filter
    if (selectedDestination !== "all") {
      result = result.filter((pkg) => pkg.destination_id === selectedDestination);
    }

    // Price range filter
    result = result.filter((pkg) => pkg.price >= priceRange[0] && pkg.price <= priceRange[1]);

    // Sorting
    switch (sortBy) {
      case "price-low":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "duration":
        result = [...result].sort((a, b) => {
          const daysA = parseInt(a.duration || "0");
          const daysB = parseInt(b.duration || "0");
          return daysA - daysB;
        });
        break;
      case "featured":
      default:
        result = [...result].sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    return result;
  }, [packages, searchQuery, selectedTypes, selectedDestination, priceRange, sortBy]);

  const handleTypeToggle = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTypes([]);
    setSelectedDestination("all");
    setPriceRange([0, maxPrice]);
    setSortBy("featured");
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      {/* Package Types */}
      <div>
        <h4 className="font-semibold mb-3">Package Type</h4>
        <div className="space-y-2">
          {packageTypes.map((type) => (
            <div key={type} className="flex items-center space-x-2">
              <Checkbox
                id={type}
                checked={selectedTypes.includes(type)}
                onCheckedChange={() => handleTypeToggle(type)}
              />
              <Label htmlFor={type} className="text-sm cursor-pointer">
                {type}
              </Label>
            </div>
          ))}
        </div>
      </div>

      {/* Destination */}
      <div>
        <h4 className="font-semibold mb-3">Destination</h4>
        <Select value={selectedDestination} onValueChange={setSelectedDestination}>
          <SelectTrigger>
            <SelectValue placeholder="All Destinations" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Destinations</SelectItem>
            {destinations.map((dest) => (
              <SelectItem key={dest.id} value={dest.id}>
                {dest.name}, {dest.country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold mb-3">Price Range</h4>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={(value) => setPriceRange(value as [number, number])}
            max={maxPrice}
            step={5000}
            className="mb-4"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>₹{priceRange[0].toLocaleString()}</span>
            <span>₹{priceRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      {/* Clear Filters */}
      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4">Explore Our Packages</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel Packages for Every Dream
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover handcrafted travel experiences designed to create unforgettable memories
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search packages, destinations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl border p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
                <FilterSidebar />
              </div>
            </aside>

            {/* Mobile Filter Sheet */}
            <div className="lg:hidden flex items-center justify-between mb-4">
              <p className="text-muted-foreground">
                {filteredPackages.length} packages found
              </p>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filters
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <div className="mt-6">
                    <FilterSidebar />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Packages Grid */}
            <div className="flex-1">
              {/* Sort Bar */}
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {filteredPackages.length} packages found
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured First</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="duration">Duration</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-muted rounded-2xl h-96 animate-pulse" />
                  ))}
                </div>
              ) : filteredPackages.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-xl font-semibold mb-2">No packages found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredPackages.map((pkg, index) => (
                    <motion.div
                      key={pkg.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                        <div className="relative h-52 overflow-hidden">
                          <img
                            src={pkg.image_url || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600"}
                            alt={pkg.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {pkg.is_featured && (
                            <Badge className="absolute top-3 left-3 bg-primary">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          {pkg.original_price && pkg.original_price > pkg.price && (
                            <Badge variant="destructive" className="absolute top-3 right-3">
                              {Math.round(((pkg.original_price - pkg.price) / pkg.original_price) * 100)}% OFF
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-5">
                          {pkg.package_type && (
                            <Badge variant="secondary" className="mb-2">
                              {pkg.package_type}
                            </Badge>
                          )}
                          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {pkg.title}
                          </h3>
                          {pkg.destination && (
                            <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                              <MapPin className="h-4 w-4" />
                              {pkg.destination.name}, {pkg.destination.country}
                            </p>
                          )}
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                            {pkg.duration && (
                              <span className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {pkg.duration}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between pt-4 border-t">
                            <div>
                              {pkg.original_price && pkg.original_price > pkg.price && (
                                <span className="text-sm text-muted-foreground line-through mr-2">
                                  ₹{pkg.original_price.toLocaleString()}
                                </span>
                              )}
                              <span className="text-xl font-bold text-primary">
                                ₹{pkg.price.toLocaleString()}
                              </span>
                              <span className="text-sm text-muted-foreground">/person</span>
                            </div>
                            <Button size="sm" asChild>
                              <Link to="/contact">Book Now</Link>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
