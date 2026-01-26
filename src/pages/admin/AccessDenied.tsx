import { useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldX, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";

const isAdminSubdomain = window.location.hostname.startsWith('admin.');
const loginPath = isAdminSubdomain ? "/login" : "/admin/login";

export default function AccessDenied() {
  const { signOut, user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate(loginPath, { replace: true });
  };

  // Auto sign out after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      handleSignOut();
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-secondary via-background to-secondary/50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md text-center"
      >
        <div className="bg-card rounded-3xl shadow-2xl border p-8">
          <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
            <ShieldX className="h-8 w-8 text-destructive" />
          </div>
          
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            Your account ({user?.email}) does not have admin privileges.
            You will be signed out automatically.
          </p>

          <Button onClick={handleSignOut} variant="outline" className="w-full">
            <LogOut className="mr-2 h-4 w-4" />
            Sign Out Now
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
