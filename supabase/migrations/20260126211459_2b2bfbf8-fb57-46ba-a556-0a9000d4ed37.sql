-- Add display_order column to destinations table for homepage sorting
ALTER TABLE public.destinations 
ADD COLUMN display_order INTEGER DEFAULT 0;

-- Add display_order column to packages table for homepage sorting
ALTER TABLE public.packages 
ADD COLUMN display_order INTEGER DEFAULT 0;

-- Create index for faster ordering queries
CREATE INDEX idx_destinations_display_order ON public.destinations(display_order DESC, is_featured DESC);
CREATE INDEX idx_packages_display_order ON public.packages(display_order DESC, is_featured DESC);