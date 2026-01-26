import { Link } from "react-router-dom";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const blogPosts = [
  {
    id: 1,
    title: "Top 10 Destinations in India for Summer 2024",
    excerpt: "Beat the heat with our curated list of cool summer destinations across India, from hill stations to pristine beaches.",
    image: "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2071&auto=format&fit=crop",
    author: "Travel Team",
    date: "Jan 15, 2024",
    category: "Travel Tips",
  },
  {
    id: 2,
    title: "Complete Guide to Hajj: What Every Pilgrim Should Know",
    excerpt: "Everything you need to know before embarking on your sacred Hajj journey, from preparations to rituals.",
    image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=1974&auto=format&fit=crop",
    author: "Islamic Travel",
    date: "Jan 10, 2024",
    category: "Hajj & Umrah",
  },
  {
    id: 3,
    title: "Best Honeymoon Spots in Maldives: A Complete Guide",
    excerpt: "Discover the most romantic resorts and experiences in Maldives for your perfect honeymoon getaway.",
    image: "https://images.unsplash.com/photo-1540202404-a2f29016b523?q=80&w=2033&auto=format&fit=crop",
    author: "Romance Travel",
    date: "Jan 5, 2024",
    category: "Honeymoon",
  },
];

export function BlogSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Latest from Our Blog</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Travel tips, destination guides, and inspiration for your next adventure.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post, index) => (
            <article
              key={post.id}
              className="group overflow-hidden rounded-xl bg-card shadow-md transition-all hover:shadow-xl animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Link to={`/blog/${post.id}`} className="block">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </Link>

              <div className="p-6">
                <span className="mb-2 inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  {post.category}
                </span>
                <Link to={`/blog/${post.id}`}>
                  <h3 className="mb-3 text-xl font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </Link>
                <p className="mb-4 text-muted-foreground line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    {post.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {post.date}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">
              View All Posts
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
