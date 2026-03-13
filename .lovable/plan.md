

# Plan: Import Red Olive Vacations from Existing Project

## Summary

Your original project [Dream Weaver Travels](/projects/a8eaf684-d5be-43a0-83ce-b8347b08f276) (redolive) exists in your workspace. I can copy all the files directly from it into this project using cross-project tools.

## What the project contains

**Red Olive Vacations** - A travel agency website with:
- 9 pages: Home, About, Contact, Services, Packages, PackageDetail, Destinations, Blog, BlogPost
- 10 home section components (Hero, Destinations, Services, Packages, Hajj/Umrah, WhyChooseUs, Testimonials, Blog, Stats, ContactCTA)
- Layout components (Navbar, Footer, DevBanner)
- BookingModal component
- Supabase integration (client + types) with env-based config
- Supabase edge functions (sync-inquiry-to-sheets, sync-sheets-to-db)
- 5 database migrations
- Logo asset
- Uses `framer-motion`, `@supabase/supabase-js`, DM Sans font

## Files to copy (all from the redolive project)

### Config & styles (4 files)
- `src/App.tsx`, `src/index.css`, `src/main.tsx`, `tailwind.config.ts`

### Pages (9 files)
- `src/pages/Index.tsx`, `About.tsx`, `Blog.tsx`, `BlogPost.tsx`, `Contact.tsx`, `Destinations.tsx`, `Packages.tsx`, `PackageDetail.tsx`, `Services.tsx`

### Components (14 files)
- `src/components/BookingModal.tsx`
- `src/components/layout/Navbar.tsx`, `Footer.tsx`, `DevBanner.tsx`
- `src/components/home/` (10 files: HeroSection, PopularDestinations, ServicesSection, FeaturedPackages, HajjUmrahSection, WhyChooseUs, TestimonialsSection, BlogSection, StatsSection, ContactCTA)

### Supabase integration (2 files)
- `src/integrations/supabase/client.ts`, `types.ts`

### Assets (1 file)
- `src/assets/logo.jpg`

### Supabase config & migrations (6+ files)
- `supabase/config.toml`, 5 migration files, 2 edge function directories

### Dependencies to add
- `framer-motion` (^12.29.2)
- `@supabase/supabase-js` (^2.93.0)

## Technical notes

- The Supabase client reads from `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` env vars -- you will need to set these up (either connect Supabase or add the secrets manually)
- The original project had a `.env` file with these values; those will need to be configured in this project's settings
- Edge functions and migrations will be copied but will only work once Supabase is connected

## Steps

1. Add `framer-motion` and `@supabase/supabase-js` dependencies
2. Copy all source files listed above (pages, components, layout, home, integrations, assets)
3. Update `src/App.tsx` with routing for all pages
4. Update `src/index.css` and `tailwind.config.ts` with the project's design system
5. Copy Supabase migrations and edge functions
6. Verify the app builds and renders correctly

