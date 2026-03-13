import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Filter, MapPin, Globe, Sparkles } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";

interface Destination {
  id: string;
  name: string;
  country: string;
  region: string | null;
  description: string | null;
  image_url: string | null;
  price_from: number | null;
  is_featured: boolean | null;
}

const regions = [
  "South Asia",
  "Southeast Asia",
  "Middle East",
  "Europe",
  "Africa",
  "North America",
  "South America",
  "Oceania",
  "Domestic",
];

export default function Destinations() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>("all");
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const [sortBy, setSortBy] = useState<string>("featured");

  useEffect(() => {
    fetchDestinations();
  }, []);

  async function fetchDestinations() {
    const { data, error } = await supabase
      .from("destinations")
      .select("*")
      .eq("is_active", true)
      .order("is_featured", { ascending: false });

    if (!error && data) {
      setDestinations(data);
    }
    setLoading(false);
  }

  const countries = useMemo(() => {
    const uniqueCountries = [...new Set(destinations.map((d) => d.country))];
    return uniqueCountries.sort();
  }, [destinations]);

  const filteredDestinations = useMemo(() => {
    let result = destinations;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (dest) =>
          dest.name.toLowerCase().includes(query) ||
          dest.country.toLowerCase().includes(query) ||
          dest.description?.toLowerCase().includes(query) ||
          dest.region?.toLowerCase().includes(query)
      );
    }

    if (selectedRegions.length > 0) {
      result = result.filter((dest) => dest.region && selectedRegions.includes(dest.region));
    }

    if (selectedCountry !== "all") {
      result = result.filter((dest) => dest.country === selectedCountry);
    }

    if (showFeaturedOnly) {
      result = result.filter((dest) => dest.is_featured);
    }

    switch (sortBy) {
      case "name-asc":
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        result = [...result].sort((a, b) => b.name.localeCompare(a.name));
        break;
      case "price-low":
        result = [...result].sort((a, b) => (a.price_from || 0) - (b.price_from || 0));
        break;
      case "price-high":
        result = [...result].sort((a, b) => (b.price_from || 0) - (a.price_from || 0));
        break;
      case "featured":
      default:
        result = [...result].sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
    }

    return result;
  }, [destinations, searchQuery, selectedRegions, selectedCountry, showFeaturedOnly, sortBy]);

  const handleRegionToggle = (region: string) => {
    setSelectedRegions((prev) =>
      prev.includes(region) ? prev.filter((r) => r !== region) : [...prev, region]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedRegions([]);
    setSelectedCountry("all");
    setShowFeaturedOnly(false);
    setSortBy("featured");
  };

  const FilterSidebar = () => (
    <div className="space-y-6">
      <div>
        <h4 className="font-semibold mb-3">Region</h4>
        <div className="space-y-2">
          {regions.map((region) => (
            <div key={region} className="flex items-center space-x-2">
              <Checkbox
                id={region}
                checked={selectedRegions.includes(region)}
                onCheckedChange={() => handleRegionToggle(region)}
              />
              <Label htmlFor={region} className="text-sm cursor-pointer">
                {region}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-3">Country</h4>
        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
          <SelectTrigger>
            <SelectValue placeholder="All Countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Countries</SelectItem>
            {countries.map((country) => (
              <SelectItem key={country} value={country}>
                {country}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id="featured-only"
          checked={showFeaturedOnly}
          onCheckedChange={(checked) => setShowFeaturedOnly(checked === true)}
        />
        <Label htmlFor="featured-only" className="text-sm cursor-pointer">
          Featured destinations only
        </Label>
      </div>

      <Button variant="outline" onClick={clearFilters} className="w-full">
        Clear All Filters
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative py-20 bg-gradient-to-br from-secondary/30 via-background to-primary/10">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge className="mb-4">
              <Globe className="h-3 w-3 mr-1" />
              Explore the World
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Discover Amazing Destinations
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              From serene beaches to majestic mountains, find your perfect getaway
            </p>

            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search destinations, countries..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-12">
        <div className="container">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="hidden lg:block w-72 shrink-0">
              <div className="sticky top-24 bg-card rounded-2xl border p-6">
                <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </h3>
                <FilterSidebar />
              </div>
            </aside>

            <div className="lg:hidden flex items-center justify-between mb-4">
              <p className="text-muted-foreground">
                {filteredDestinations.length} destinations found
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

            <div className="flex-1">
              <div className="hidden lg:flex items-center justify-between mb-6">
                <p className="text-muted-foreground">
                  {filteredDestinations.length} destinations found
                </p>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="featured">Featured First</SelectItem>
                    <SelectItem value="name-asc">Name: A to Z</SelectItem>
                    <SelectItem value="name-desc">Name: Z to A</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-muted rounded-2xl h-80 animate-pulse" />
                  ))}
                </div>
              ) : filteredDestinations.length === 0 ? (
                <div className="text-center py-16">
                  <div className="text-6xl mb-4">🌍</div>
                  <h3 className="text-xl font-semibold mb-2">No destinations found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search query
                  </p>
                  <Button onClick={clearFilters}>Clear Filters</Button>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredDestinations.map((dest, index) => (
                    <motion.div
                      key={dest.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                        <div className="relative h-56 overflow-hidden">
                          <img
                            src={dest.image_url || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600"}
                            alt={dest.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                          {dest.is_featured && (
                            <Badge className="absolute top-3 left-3 bg-primary">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <h3 className="text-xl font-bold mb-1">{dest.name}</h3>
                            <p className="text-sm opacity-90 flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              {dest.country}
                              {dest.region && ` • ${dest.region}`}
                            </p>
                          </div>
                        </div>
                        <CardContent className="p-5">
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                            {dest.description || "Discover the beauty and culture of this amazing destination."}
                          </p>
                          <div className="flex items-center justify-between">
                            <div>
                              {dest.price_from && (
                                <>
                                  <span className="text-sm text-muted-foreground">From </span>
                                  <span className="text-lg font-bold text-primary">
                                    ₹{dest.price_from.toLocaleString()}
                                  </span>
                                </>
                              )}
                            </div>
                            <Button size="sm" asChild>
                              <Link to={`/packages?destination=${dest.id}`}>
                                View Packages
                              </Link>
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