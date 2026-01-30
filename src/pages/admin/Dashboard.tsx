import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  Package, MapPin, FileText, MessageSquare, Users, TrendingUp,
  ArrowUpRight, Clock, Plus, RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { toast } from "@/hooks/use-toast";

interface Stats {
  destinations: number;
  packages: number;
  blogPosts: number;
  inquiries: number;
  testimonials: number;
  newInquiries: number;
}

interface RecentInquiry {
  id: string;
  name: string;
  email: string;
  destination: string | null;
  status: string | null;
  created_at: string;
}

const isAdminSubdomain = window.location.hostname.startsWith('admin.');
const prefix = isAdminSubdomain ? '' : '/admin';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<Stats>({
    destinations: 0,
    packages: 0,
    blogPosts: 0,
    inquiries: 0,
    testimonials: 0,
    newInquiries: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState<RecentInquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSyncFromSheets = async () => {
    const webhookUrl = localStorage.getItem('n8n_sync_webhook_url');
    
    if (!webhookUrl) {
      const url = prompt('Enter your n8n "Sync from Sheets" webhook URL:');
      if (!url) return;
      localStorage.setItem('n8n_sync_webhook_url', url);
    }

    const finalUrl = localStorage.getItem('n8n_sync_webhook_url');
    if (!finalUrl) return;

    setIsSyncing(true);
    try {
      const response = await fetch(finalUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'sync' }),
      });

      if (!response.ok) {
        throw new Error(`Sync failed: ${response.status}`);
      }

      localStorage.setItem('last_sheets_sync', new Date().toISOString());
      
      toast({
        title: "Sync Triggered!",
        description: "n8n is syncing data from Google Sheets. Refresh in a moment to see updates.",
      });
    } catch (error) {
      console.error('Sync error:', error);
      toast({
        title: "Sync Failed",
        description: error instanceof Error ? error.message : "Failed to trigger sync",
        variant: "destructive",
      });
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const [destinations, packages, blogPosts, inquiries, testimonials, newInquiries, recent] = await Promise.all([
        supabase.from("destinations").select("id", { count: "exact", head: true }),
        supabase.from("packages").select("id", { count: "exact", head: true }),
        supabase.from("blog_posts").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
        supabase.from("inquiries").select("id", { count: "exact", head: true }).eq("status", "new"),
        supabase.from("inquiries").select("id, name, email, destination, status, created_at").order("created_at", { ascending: false }).limit(5),
      ]);

      setStats({
        destinations: destinations.count || 0,
        packages: packages.count || 0,
        blogPosts: blogPosts.count || 0,
        inquiries: inquiries.count || 0,
        testimonials: testimonials.count || 0,
        newInquiries: newInquiries.count || 0,
      });
      
      setRecentInquiries(recent.data || []);
      setLoading(false);
    }

    fetchData();
  }, []);

  const statCards = [
    { 
      title: "Destinations", 
      value: stats.destinations, 
      icon: MapPin, 
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-500/10",
      link: `${prefix}/destinations`
    },
    { 
      title: "Packages", 
      value: stats.packages, 
      icon: Package, 
      color: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-500/10",
      link: `${prefix}/packages`
    },
    { 
      title: "Blog Posts", 
      value: stats.blogPosts, 
      icon: FileText, 
      color: "from-purple-500 to-purple-600",
      bgColor: "bg-purple-500/10",
      link: `${prefix}/blog`
    },
    { 
      title: "Testimonials", 
      value: stats.testimonials, 
      icon: Users, 
      color: "from-amber-500 to-amber-600",
      bgColor: "bg-amber-500/10",
      link: `${prefix}/testimonials`
    },
  ];

  const quickActions = [
    { title: "Add Destination", icon: MapPin, link: `${prefix}/destinations` },
    { title: "Create Package", icon: Package, link: `${prefix}/packages` },
    { title: "Write Blog Post", icon: FileText, link: `${prefix}/blog` },
  ];

  const lastSyncTime = localStorage.getItem('last_sheets_sync');

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case 'new': return 'bg-blue-500/10 text-blue-600 border-blue-200';
      case 'contacted': return 'bg-amber-500/10 text-amber-600 border-amber-200';
      case 'converted': return 'bg-emerald-500/10 text-emerald-600 border-emerald-200';
      case 'closed': return 'bg-muted text-muted-foreground border-border';
      default: return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}! 👋
          </h1>
          <p className="text-muted-foreground mt-1">
            Here's what's happening with your travel business today.
          </p>
        </div>
        
        {stats.newInquiries > 0 && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Button 
              onClick={() => navigate(`${prefix}/inquiries`)}
              className="bg-gradient-to-r from-primary to-primary/80 shadow-lg"
            >
              <MessageSquare className="mr-2 h-4 w-4" />
              {stats.newInquiries} New {stats.newInquiries === 1 ? 'Inquiry' : 'Inquiries'}
              <ArrowUpRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </motion.div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card 
              className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md"
              onClick={() => navigate(stat.link)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold mt-1">
                      {loading ? (
                        <span className="animate-pulse">...</span>
                      ) : (
                        stat.value
                      )}
                    </p>
                  </div>
                  <div className={`p-3 rounded-xl ${stat.bgColor}`}>
                    <stat.icon className={`h-6 w-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} style={{ stroke: `url(#${stat.title})` }} />
                    <stat.icon className={`h-6 w-6 text-${stat.color.split('-')[1]}-500`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Inquiries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2"
        >
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-4">
              <div>
                <CardTitle className="text-lg font-semibold">Recent Inquiries</CardTitle>
                <p className="text-sm text-muted-foreground">Latest customer requests</p>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => navigate(`${prefix}/inquiries`)}
              >
                View All
                <ArrowUpRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse flex items-center gap-4">
                      <div className="h-10 w-10 bg-muted rounded-full" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 bg-muted rounded w-1/4" />
                        <div className="h-3 bg-muted rounded w-1/3" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : recentInquiries.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No inquiries yet</p>
                  <p className="text-sm">Customer inquiries will appear here</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentInquiries.map((inquiry, index) => (
                    <motion.div
                      key={inquiry.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => navigate(`${prefix}/inquiries`)}
                    >
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-primary">
                          {inquiry.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{inquiry.name}</p>
                        <p className="text-sm text-muted-foreground truncate">
                          {inquiry.destination || inquiry.email}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <Badge variant="outline" className={getStatusColor(inquiry.status)}>
                          {inquiry.status || 'new'}
                        </Badge>
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {format(new Date(inquiry.created_at), 'MMM d')}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
              <p className="text-sm text-muted-foreground">Common tasks</p>
            </CardHeader>
            <CardContent className="space-y-3">
              {/* Sync from Sheets Button */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 }}
              >
                <Button
                  variant="outline"
                  className="w-full justify-start h-12 border-dashed border-2 hover:bg-primary hover:text-primary-foreground transition-all"
                  onClick={handleSyncFromSheets}
                  disabled={isSyncing}
                >
                  <div className="p-1.5 rounded-md bg-primary/10 mr-3">
                    <RefreshCw className={`h-4 w-4 text-primary ${isSyncing ? 'animate-spin' : ''}`} />
                  </div>
                  {isSyncing ? 'Syncing...' : 'Sync from Sheets'}
                  {lastSyncTime && !isSyncing && (
                    <span className="ml-auto text-xs text-muted-foreground">
                      {format(new Date(lastSyncTime), 'MMM d, HH:mm')}
                    </span>
                  )}
                </Button>
              </motion.div>

              {quickActions.map((action, index) => (
                <motion.div
                  key={action.title}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                >
                  <Button
                    variant="outline"
                    className="w-full justify-start h-12 hover:bg-primary hover:text-primary-foreground transition-all"
                    onClick={() => navigate(action.link)}
                  >
                    <div className="p-1.5 rounded-md bg-primary/10 mr-3">
                      <action.icon className="h-4 w-4 text-primary" />
                    </div>
                    {action.title}
                    <Plus className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </motion.div>
              ))}
            </CardContent>
          </Card>

          {/* Total Inquiries Summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-6"
          >
            <Card className="border-0 shadow-md bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-white/20">
                    <TrendingUp className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm opacity-90">Total Inquiries</p>
                    <p className="text-3xl font-bold">
                      {loading ? '...' : stats.inquiries}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
