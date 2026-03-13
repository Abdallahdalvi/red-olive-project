import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Tag, Share2, Clock } from "lucide-react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
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

export default function BlogPostPage() {
  const { slug } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  async function fetchPost() {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .eq("is_published", true)
      .maybeSingle();

    if (!error && data) {
      setPost(data);
      fetchRelatedPosts(data.category, data.id);
    }
    setLoading(false);
  }

  async function fetchRelatedPosts(category: string | null, currentId: string) {
    const query = supabase
      .from("blog_posts")
      .select("*")
      .eq("is_published", true)
      .neq("id", currentId)
      .limit(3);

    if (category) {
      query.eq("category", category);
    }

    const { data } = await query.order("published_at", { ascending: false });
    if (data) {
      setRelatedPosts(data);
    }
  }

  const estimateReadTime = (content: string | null) => {
    if (!content) return "3 min read";
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 200);
    return `${minutes} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20">
          <div className="max-w-4xl mx-auto">
            <div className="h-96 bg-muted rounded-2xl animate-pulse mb-8" />
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded animate-pulse w-3/4" />
              <div className="h-4 bg-muted rounded animate-pulse" />
              <div className="h-4 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-20 text-center">
          <div className="text-6xl mb-4">📄</div>
          <h1 className="text-2xl font-bold mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The article you're looking for doesn't exist or has been removed.
          </p>
          <Button asChild>
            <Link to="/blog">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src={post.image_url || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1600"}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </section>

      <section className="relative -mt-32 pb-16">
        <div className="container">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            <Button variant="outline" size="sm" asChild className="mb-6">
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Link>
            </Button>

            <div className="bg-card rounded-2xl p-8 shadow-lg mb-8">
              <div className="flex flex-wrap gap-2 mb-4">
                {post.category && (
                  <Badge variant="secondary">
                    <Tag className="h-3 w-3 mr-1" />
                    {post.category}
                  </Badge>
                )}
                <Badge variant="outline">
                  <Clock className="h-3 w-3 mr-1" />
                  {estimateReadTime(post.content)}
                </Badge>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold mb-6">{post.title}</h1>

              <div className="flex flex-wrap items-center gap-6 text-muted-foreground">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{post.author}</p>
                      <p className="text-sm">Author</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{format(new Date(post.published_at || post.created_at), "MMMM dd, yyyy")}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={() => navigator.share?.({ title: post.title, url: window.location.href })}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            <div className="bg-card rounded-2xl p-8 shadow-lg prose prose-lg max-w-none">
              {post.excerpt && (
                <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-medium">
                  {post.excerpt}
                </p>
              )}
              <div 
                className="text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{ __html: post.content || "<p>Content coming soon...</p>" }}
              />
            </div>

            <Card className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Ready to Start Your Journey?</h3>
                <p className="text-muted-foreground mb-6">
                  Let us help you plan the perfect trip based on the destinations mentioned in this article.
                </p>
                <Button size="lg" asChild>
                  <Link to="/contact">Plan Your Trip</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.article>

          {relatedPosts.length > 0 && (
            <div className="max-w-4xl mx-auto mt-16">
              <h2 className="text-2xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Link key={relatedPost.id} to={`/blog/${relatedPost.slug}`}>
                    <Card className="group overflow-hidden hover:shadow-lg transition-all h-full">
                      <div className="relative h-40 overflow-hidden">
                        <img
                          src={relatedPost.image_url || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400"}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}