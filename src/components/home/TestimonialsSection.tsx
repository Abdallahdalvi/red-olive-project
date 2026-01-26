import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    id: 1,
    name: "Rahul Sharma",
    location: "Mumbai, India",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Amazing experience with Red Olive Vacations! Our Kashmir trip was perfectly organized. The team was very professional and responsive throughout our journey.",
  },
  {
    id: 2,
    name: "Fatima Khan",
    location: "Delhi, India",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Our Umrah package was exceptional. Everything from visa to accommodation was handled smoothly. Highly recommend their services for pilgrimages.",
  },
  {
    id: 3,
    name: "Amit Patel",
    location: "Ahmedabad, India",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop",
    rating: 5,
    text: "Best honeymoon package to Maldives! The water villa was breathtaking and all arrangements were top-notch. Thank you Red Olive team!",
  },
  {
    id: 4,
    name: "Priya Menon",
    location: "Bangalore, India",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop",
    rating: 5,
    text: "Excellent corporate travel management for our team retreat. Professional service and great attention to detail. Will definitely use again!",
  },
];

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-secondary">
      <div className="container">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">What Our Travelers Say</h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Don't just take our word for it. Here's what our happy customers have to say about their experiences.
          </p>
        </div>

        <div className="relative mx-auto max-w-4xl">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="rounded-2xl bg-card p-8 text-center shadow-lg">
                    <Quote className="mx-auto mb-6 h-10 w-10 text-primary/30" />
                    <p className="mb-6 text-lg text-muted-foreground leading-relaxed">
                      "{testimonial.text}"
                    </p>
                    <div className="mb-4 flex justify-center gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                      ))}
                    </div>
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="mx-auto mb-3 h-16 w-16 rounded-full object-cover"
                    />
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 rounded-full"
            onClick={prev}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 rounded-full"
            onClick={next}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <div className="mt-8 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`h-2 w-2 rounded-full transition-colors ${
                  index === currentIndex ? "bg-primary" : "bg-primary/20"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
