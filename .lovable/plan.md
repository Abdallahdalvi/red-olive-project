

# Google Sheets as Your Dashboard - Using n8n

Since your organization blocks API key creation, we'll use your existing **n8n setup** as the middleware for all Google Sheets operations. This means **no API keys needed** - n8n handles Google authentication!

## Architecture Overview

```text
+------------------+       +-------------+       +------------------+
|   Your Website   | <---> |    n8n      | <---> |  Google Sheets   |
|   (Database)     |       | (Middleware)|       |  (Dashboard)     |
+------------------+       +-------------+       +------------------+

Flow 1: Inquiries → Sheets (already working!)
Flow 2: Content Sheets → Website (new - via n8n webhook)
```

## What You'll Get

**Manage in Google Sheets:**
- Destinations
- Packages  
- Blog Posts
- Testimonials

**Receive in Google Sheets:**
- Contact Inquiries (already working)
- Booking Inquiries (needs fix - missing departure city)

## Implementation Steps

### Step 1: Google Sheets Templates

Create 5 Google Sheets (or tabs in one sheet) with these columns:

**Destinations Sheet:**
| id | name | country | region | description | image_url | price_from | is_featured | is_active | display_order |

**Packages Sheet:**
| id | title | description | destination_name | duration | price | original_price | package_type | image_url | highlights | is_featured | is_active | display_order |

**Blog Posts Sheet:**
| id | slug | title | excerpt | content | author | category | image_url | is_published | published_at |

**Testimonials Sheet:**
| id | name | location | destination | content | rating | avatar_url | is_featured | is_approved |

**Inquiries Sheet (already have via existing webhook):**
| id | name | email | phone | from_city | destination | travel_date | travelers | budget | message | inquiry_type | source | status | created_at |

### Step 2: Fix Booking Modal (Missing from_city field)

The current booking modal collects "From City" but doesn't save it to the database. We need to add this field when inserting the inquiry.

**File:** `src/components/BookingModal.tsx`
- Add `from_city: formData.from` to the supabase insert

### Step 3: Create Content Sync Edge Function

Create a new edge function that receives data from n8n and syncs it to your database.

**File:** `supabase/functions/sync-sheets-to-db/index.ts`

This function will:
- Accept POST requests from n8n with sheet data
- Validate the data structure
- Upsert records to the appropriate table (destinations, packages, blog_posts, testimonials)
- Return success/error response

### Step 4: Add Sync Button to Admin Dashboard

Add a "Sync from Sheets" button to the admin dashboard that triggers the n8n workflow.

**File:** `src/pages/admin/Dashboard.tsx`
- Add a new button in the Quick Actions section
- When clicked, calls an n8n webhook to trigger the sync

### Step 5: n8n Workflow Setup (You do this in n8n)

You'll create 2 n8n workflows:

**Workflow 1: Inquiries to Sheets (extend existing)**
- Already working for basic inquiries
- Just ensure all fields including `from_city` are mapped

**Workflow 2: Sheets to Website (new)**
- Trigger: Webhook (called when you click "Sync from Sheets")
- Steps:
  1. Read Google Sheets (Destinations, Packages, Blogs, Testimonials)
  2. For each sheet, POST data to your edge function
  3. Edge function upserts to database
- This workflow URL will be configured in your app

## Technical Details

### Edge Function: sync-sheets-to-db

```typescript
// Accepts data from n8n and syncs to database
interface SyncRequest {
  table: 'destinations' | 'packages' | 'blog_posts' | 'testimonials';
  data: Record<string, any>[];
  mode: 'upsert' | 'replace'; // upsert = update or insert, replace = delete all first
}
```

### Admin Dashboard Changes

- Add "Sync from Sheets" button with loading state
- Show last sync timestamp (optional - stored in localStorage)
- Display sync results (success/error counts)

### Config Updates

**File:** `supabase/config.toml`
- Add new function configuration for `sync-sheets-to-db`

## Security Considerations

- The sync edge function should validate the request format
- Consider adding a simple shared secret for n8n-to-edge-function calls
- The sync function uses service role, so RLS is bypassed for admin operations

## Files to Create/Modify

| File | Action |
|------|--------|
| `src/components/BookingModal.tsx` | Fix: Add `from_city` field |
| `supabase/functions/sync-sheets-to-db/index.ts` | Create: New edge function |
| `src/pages/admin/Dashboard.tsx` | Modify: Add sync button |
| `supabase/config.toml` | Modify: Add function config |

## n8n Webhook URLs You'll Need

After creating the n8n workflow, you'll provide:
1. **Sync trigger webhook URL** - Called when you click "Sync from Sheets" button

The edge function URL your n8n will call:
- `https://pmyndcfuvcpuuybnyyte.supabase.co/functions/v1/sync-sheets-to-db`

## Summary

This approach:
- Uses your existing n8n setup (no new credentials needed)
- Keeps Google Sheets as your single source of truth for content
- Automatically sends all inquiries to Google Sheets
- Gives you a one-click sync button for content updates
- Requires no Google API keys on the Lovable side

