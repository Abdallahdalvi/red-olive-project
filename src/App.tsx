import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminDestinations from "./pages/admin/Destinations";
import AdminPackages from "./pages/admin/Packages";
import AdminBlogPosts from "./pages/admin/BlogPosts";
import AdminInquiries from "./pages/admin/Inquiries";
import AdminTestimonials from "./pages/admin/Testimonials";
import { AdminLayout } from "./components/admin/AdminLayout";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
            <Route path="/admin/destinations" element={<AdminLayout><AdminDestinations /></AdminLayout>} />
            <Route path="/admin/packages" element={<AdminLayout><AdminPackages /></AdminLayout>} />
            <Route path="/admin/blog" element={<AdminLayout><AdminBlogPosts /></AdminLayout>} />
            <Route path="/admin/inquiries" element={<AdminLayout><AdminInquiries /></AdminLayout>} />
            <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
