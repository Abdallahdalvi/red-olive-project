import { useState } from "react";
import { ArrowRight, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { BookingModal } from "@/components/BookingModal";

export function HeroSection() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-secondary via-background to-secondary/50">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      

      <div className="container relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <span className="inline-block text-sm font-medium text-muted-foreground tracking-widest uppercase">
              Elevate Your Travel Journey
            </span>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              Experience
              <br />
              <span className="text-primary">The Magic Of</span>
              <br />
              Travel!
            </h1>

            <p className="text-lg text-muted-foreground max-w-md">
              Discover breathtaking destinations with Red Olive Vacations. 
              Your journey to unforgettable experiences starts here.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                className="rounded-full px-8 h-14 text-base"
                onClick={() => setIsBookingOpen(true)}
              >
                Book A Trip Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full h-14 w-14 p-0">
                <Play className="h-5 w-5 ml-1" />
              </Button>
            </div>

            <BookingModal open={isBookingOpen} onOpenChange={setIsBookingOpen} />

            {/* Stats Cards */}
            <div className="flex gap-8 pt-8">
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">12K+</p>
                <p className="text-sm text-muted-foreground">Happy Clients</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">4.8</p>
                <p className="text-sm text-muted-foreground">Overall Rating</p>
              </div>
              <div className="h-12 w-px bg-border" />
              <div className="text-center">
                <p className="text-3xl font-bold text-foreground">50+</p>
                <p className="text-sm text-muted-foreground">Destinations</p>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Hero Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop"
                alt="Airplane flying"
                className="w-full h-[500px] lg:h-[600px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/20 via-transparent to-transparent" />
            </div>

            {/* Floating Card - Know More */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-6 -left-6 bg-card rounded-2xl shadow-xl p-5 border"
            >
              <div className="flex items-center gap-4">
                <div className="flex -space-x-3">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" alt="" className="w-10 h-10 rounded-full border-2 border-background" />
                  <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" alt="" className="w-10 h-10 rounded-full border-2 border-background" />
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" alt="" className="w-10 h-10 rounded-full border-2 border-background" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Know More</p>
                  <p className="text-xs text-muted-foreground">Discover The World</p>
                </div>
                <ArrowRight className="h-5 w-5 text-primary" />
              </div>
            </motion.div>

            {/* Floating Card - Awesome Places */}
            <motion.div 
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -top-4 -right-4 bg-card rounded-2xl shadow-xl p-4 border"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=100&h=100&fit=crop" alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <p className="font-semibold text-sm">Awesome Places</p>
                  <p className="text-xs text-muted-foreground">One Adventure At A Time!</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Partner Logos */}
      <div className="border-t bg-card/50 backdrop-blur-sm">
        <div className="container py-6">
          <div className="flex flex-wrap items-center justify-between gap-8">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Follow</span>
              <div className="flex gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-xs">f</a>
                <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">in</a>
                <a href="#" className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground text-xs">tw</a>
              </div>
            </div>
            <div className="flex flex-wrap items-center gap-8 md:gap-12">
              <span className="text-lg font-semibold text-muted-foreground/50">airbnb</span>
              <span className="text-lg font-semibold text-muted-foreground/50">Booking.com</span>
              <span className="text-lg font-semibold text-muted-foreground/50">trivago</span>
              <span className="text-lg font-semibold text-muted-foreground/50">Expedia</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
