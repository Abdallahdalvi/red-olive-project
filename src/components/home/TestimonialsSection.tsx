import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Amazing experience with Red Olive Vacations! Our Kashmir trip was perfectly organized. The team was very professional and responsive throughout our journey. Highly recommended!",
  },
  {
    id: 2,
    name: "Fatima Khan",
    location: "Delhi, India",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Our Umrah package was exceptional. Everything from visa to accommodation was handled smoothly. The guides were knowledgeable and caring. Will definitely book again!",
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Ahmedabad, India",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Best honeymoon package to Maldives! The water villa was breathtaking and all arrangements were top-notch. Thank you Red Olive team for making our trip memorable!",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Decorative Quote */}
      <div className="absolute top-20 left-10 opacity-5">
        <Quote className="h-64 w-64" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-sm font-medium text-primary tracking-widest uppercase mb-4"
          >
            Testimonials
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Loved By Over Thousand Travelers
          </motion.h2>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="bg-card rounded-3xl p-8 md:p-12 shadow-xl border"
              >
                <div className="flex flex-col md:flex-row gap-8 items-center">
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <div className="relative">
                      <img
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover"
                      />
                      <div className="absolute -bottom-3 -right-3 bg-primary text-primary-foreground rounded-full p-2">
                        <Quote className="h-4 w-4" />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex justify-center md:justify-start gap-1 mb-4">
                      {Array.from({ length: testimonials[currentIndex].rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                      "{testimonials[currentIndex].text}"
                    </p>
                    <div>
                      <h4 className="text-lg font-bold">{testimonials[currentIndex].name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonials[currentIndex].location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12"
                onClick={prev}
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex ? "w-8 bg-primary" : "w-2 bg-primary/20"
                    }`}
                    onClick={() => setCurrentIndex(index)}
                  />
                ))}
              </div>

              <Button
                variant="default"
                size="icon"
                className="rounded-full h-12 w-12"
                onClick={next}
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
