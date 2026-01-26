import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Calendar, User, ArrowRight, Tag } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category: string | null;
  author: string | null;
  published_at: string | null;
  created_at: string;
}

const categories = [
  "All",
  "Travel Tips",
  "Destinations",
  "Hajj & Umrah",
  "Adventure",
  "Culture",
  "Food & Cuisine",
  "Budget Travel",
];

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });

    if (!error && data) {
      setPosts(data);
    }
    setLoading(false);
  }

  const filteredPosts = useMemo(() => {
    let result = posts;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt?.toLowerCase().includes(query) ||
          post.category?.toLowerCase().includes(query) ||
          post.author?.toLowerCase().includes(query)
      );
    }

    // Category filter
    if (selectedCategory !== "All") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    return result;
  }, [posts, searchQuery, selectedCategory]);

  const featuredPost = filteredPosts[0];
  const otherPosts = filteredPosts.slice(1);

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
            <Badge className="mb-4">Our Blog</Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Travel Stories & Tips
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover travel guides, tips, and inspiring stories from around the world
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg rounded-full"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="container">
          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="rounded-full"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-12">
        <div className="container">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-muted rounded-2xl h-96 animate-pulse" />
              ))}
            </div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">📝</div>
              <h3 className="text-xl font-semibold mb-2">No articles found</h3>
              <p className="text-muted-foreground mb-4">
                Try adjusting your search or category filter
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-12"
                >
                  <Link to={`/blog/${featuredPost.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
                      <div className="grid md:grid-cols-2 gap-0">
                        <div className="relative h-64 md:h-96 overflow-hidden">
                          <img
                            src={featuredPost.image_url || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800"}
                            alt={featuredPost.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <Badge className="absolute top-4 left-4 bg-primary">Featured</Badge>
                        </div>
                        <CardContent className="p-8 flex flex-col justify-center">
                          {featuredPost.category && (
                            <Badge variant="secondary" className="w-fit mb-4">
                              <Tag className="h-3 w-3 mr-1" />
                              {featuredPost.category}
                            </Badge>
                          )}
                          <h2 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-primary transition-colors">
                            {featuredPost.title}
                          </h2>
                          <p className="text-muted-foreground mb-6 line-clamp-3">
                            {featuredPost.excerpt || "Read this amazing travel story..."}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                            {featuredPost.author && (
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {featuredPost.author}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {format(new Date(featuredPost.published_at || featuredPost.created_at), "MMM dd, yyyy")}
                            </span>
                          </div>
                          <Button className="w-fit group/btn">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                </motion.div>
              )}

              {/* Other Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link to={`/blog/${post.slug}`}>
                      <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 h-full">
                        <div className="relative h-52 overflow-hidden">
                          <img
                            src={post.image_url || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          {post.category && (
                            <Badge variant="secondary" className="absolute top-3 left-3">
                              {post.category}
                            </Badge>
                          )}
                        </div>
                        <CardContent className="p-5">
                          <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                            {post.excerpt || "Click to read more..."}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            {post.author && (
                              <span className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                {post.author}
                              </span>
                            )}
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {format(new Date(post.published_at || post.created_at), "MMM dd, yyyy")}
                            </span>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
