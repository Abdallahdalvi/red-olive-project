

## Remove Admin Dashboard & Make Google Sheets the Primary CMS

This plan will remove the admin dashboard from the website and configure Google Sheets as the sole content management interface for your travel business.

---

### What Will Change

**Removed from Website:**
- All admin pages (`/admin/*` routes)
- Admin subdomain routing logic
- Admin login/signup functionality
- "Sync from Sheets" button (no longer needed - syncing will be automatic)
- Admin components (sidebar, layout)

**Kept on Website:**
- All public pages (home, packages, destinations, blog, contact, etc.)
- Authentication hook (may be useful for future features)
- Edge functions for syncing data

**New Sync Architecture:**
- Content sync triggered directly from n8n (on schedule or via Google Sheets button)
- No website admin interface required

---

### Files to Remove

| File/Folder | Purpose |
|-------------|---------|
| `src/pages/admin/` (all 8 files) | Admin dashboard pages |
| `src/components/admin/` (2 files) | Admin layout and sidebar |

---

### Files to Modify

**1. `src/App.tsx`**
- Remove all admin route imports
- Remove all `/admin/*` routes
- Remove admin subdomain detection logic
- Keep only public website routes

**2. `src/components/home/TestimonialsSection.tsx`**
- Convert from hardcoded data to fetch from database
- Display approved testimonials synced from Google Sheets

**3. `src/components/home/BlogSection.tsx`**
- Convert from hardcoded data to fetch from database
- Display published blog posts synced from Google Sheets

---

### New Sync Workflow (Google Sheets Triggered)

Instead of clicking "Sync from Sheets" in the admin panel, syncing will happen:

**Option A: Scheduled Sync (Recommended)**
- n8n runs every 15-30 minutes
- Reads data from your Google Sheets
- Posts to the `sync-sheets-to-db` edge function

**Option B: Manual Button in Google Sheets**
- Add a custom menu in Google Sheets with Apps Script
- Click "Sync to Website" to trigger n8n webhook

```text
+------------------+     +---------+     +---------------------+     +----------+
| Google Sheets    | --> | n8n     | --> | sync-sheets-to-db   | --> | Database |
| (Edit Content)   |     | Webhook |     | (Edge Function)     |     |          |
+------------------+     +---------+     +---------------------+     +----------+
        ^                                                                  |
        |                                                                  v
        +--------------------------------------------------------------+  Website
                         Inquiries auto-sync via trigger                 (Reads DB)
```

---

### Technical Details

**Cleanup Tasks:**
1. Remove admin subdomain check (`isAdminSubdomain` variable)
2. Remove `AuthProvider` wrapper if auth is not needed for public site
3. Update `NotFound` page to handle any `/admin` routes gracefully

**Dynamic Content Components:**
Both `TestimonialsSection` and `BlogSection` will be updated to:
- Fetch data from database using `@tanstack/react-query`
- Show loading skeletons while fetching
- Display "No content" gracefully if sheets not synced yet

**Inquiries Still Work:**
- New inquiries submitted on website automatically sync to Google Sheets
- Database trigger remains in place
- n8n webhook continues receiving new leads

---

### n8n Configuration Required

After removing the admin dashboard, configure n8n to trigger syncs:

**For Scheduled Sync:**
```
Trigger: Schedule (every 15-30 min)
  ↓
Google Sheets: Get rows from each tab
  ↓
HTTP Request: POST to sync-sheets-to-db
  - URL: https://pmyndcfuvcpuuybnyyte.supabase.co/functions/v1/sync-sheets-to-db
  - Body: { table: "destinations", data: [...], mode: "replace" }
```

**For Manual Google Sheets Button (Optional):**
Add an Apps Script to your spreadsheet that calls your n8n webhook when you want to sync.

---

### Summary of Changes

| Category | Before | After |
|----------|--------|-------|
| Content Management | Admin dashboard + Sheets | Google Sheets only |
| Sync Trigger | Manual button in admin | n8n scheduled/manual |
| Website Routes | Public + Admin | Public only |
| Testimonials | Hardcoded | Database-driven |
| Blog Section | Hardcoded | Database-driven |
| Inquiries | Auto-sync to Sheets | No change |

