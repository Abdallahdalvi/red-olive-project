import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import Contact from "./pages/Contact";
import Packages from "./pages/Packages";
import Destinations from "./pages/Destinations";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminDestinations from "./pages/admin/Destinations";
import AdminPackages from "./pages/admin/Packages";
import AdminBlogPosts from "./pages/admin/BlogPosts";
import AdminInquiries from "./pages/admin/Inquiries";
import AdminTestimonials from "./pages/admin/Testimonials";
import AccessDenied from "./pages/admin/AccessDenied";
import { AdminLayout } from "./components/admin/AdminLayout";

const queryClient = new QueryClient();

// Check if we're on the admin subdomain
const isAdminSubdomain = window.location.hostname.startsWith('admin.');

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {isAdminSubdomain ? (
                // Admin subdomain routes - no /admin prefix needed
                <>
                  <Route path="/login" element={<AdminLogin />} />
                  <Route path="/access-denied" element={<AccessDenied />} />
                  <Route path="/" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                  <Route path="/destinations" element={<AdminLayout><AdminDestinations /></AdminLayout>} />
                  <Route path="/packages" element={<AdminLayout><AdminPackages /></AdminLayout>} />
                  <Route path="/blog" element={<AdminLayout><AdminBlogPosts /></AdminLayout>} />
                  <Route path="/inquiries" element={<AdminLayout><AdminInquiries /></AdminLayout>} />
                  <Route path="/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </>
              ) : (
                // Main domain routes
                <>
                  <Route path="/" element={<Index />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/packages" element={<Packages />} />
                  <Route path="/destinations" element={<Destinations />} />
                  
                  {/* Admin Routes - also available on main domain */}
                  <Route path="/admin/login" element={<AdminLogin />} />
                  <Route path="/admin/access-denied" element={<AccessDenied />} />
                  <Route path="/admin" element={<AdminLayout><AdminDashboard /></AdminLayout>} />
                  <Route path="/admin/destinations" element={<AdminLayout><AdminDestinations /></AdminLayout>} />
                  <Route path="/admin/packages" element={<AdminLayout><AdminPackages /></AdminLayout>} />
                  <Route path="/admin/blog" element={<AdminLayout><AdminBlogPosts /></AdminLayout>} />
                  <Route path="/admin/inquiries" element={<AdminLayout><AdminInquiries /></AdminLayout>} />
                  <Route path="/admin/testimonials" element={<AdminLayout><AdminTestimonials /></AdminLayout>} />
                  
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </>
              )}
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
