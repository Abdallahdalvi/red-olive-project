import { useEffect, useState } from "react";
import { Package, MapPin, FileText, MessageSquare, Users, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";

interface Stats {
  destinations: number;
  packages: number;
  blogPosts: number;
  inquiries: number;
  testimonials: number;
  newInquiries: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    destinations: 0,
    packages: 0,
    blogPosts: 0,
    inquiries: 0,
    testimonials: 0,
    newInquiries: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      const [destinations, packages, blogPosts, inquiries, testimonials, newInquiries] = await Promise.all([
        supabase.from("destinations").select("id", { count: "exact", head: true }),
        supabase.from("packages").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
      ]);

      setStats({
        destinations: destinations.count || 0,
        packages: packages.count || 0,
        blogPosts: blogPosts.count || 0,
        inquiries: inquiries.count || 0,
        testimonials: testimonials.count || 0,
        newInquiries: newInquiries.count || 0,
      });
      setLoading(false);
    }

    fetchStats();
  }, []);

  const statCards = [
    { title: "Total Destinations", value: stats.destinations, icon: MapPin, color: "text-blue-500" },
    { title: "Total Packages", value: stats.packages, icon: Package, color: "text-green-500" },
    { title: "Blog Posts", value: stats.blogPosts, icon: FileText, color: "text-purple-500" },
    { title: "Total Inquiries", value: stats.inquiries, icon: MessageSquare, color: "text-orange-500" },
    { title: "New Inquiries", value: stats.newInquiries, icon: TrendingUp, color: "text-red-500" },
    { title: "Testimonials", value: stats.testimonials, icon: Users, color: "text-cyan-500" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Welcome to Admin Dashboard</h2>
        <p className="text-muted-foreground mt-1">Manage your travel business from here</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {loading ? "..." : stat.value}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Use the sidebar to navigate to different sections. You can manage destinations, packages, 
            blog posts, view customer inquiries, and moderate testimonials.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}