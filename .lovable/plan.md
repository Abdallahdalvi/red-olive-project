

## Fix Testimonials Sync and Display

### Problem Summary
The n8n sync is running but creating duplicate records. The database currently has **22 testimonial rows** instead of 5. This is because n8n sends one HTTP request per row (5 rows = 5 requests), each with the full dataset, causing race conditions.

---

### Step 1: Clean Up Duplicate Data (Database Fix)

Run a SQL migration to remove all duplicate testimonials, keeping only one copy of each unique review.

```sql
DELETE FROM testimonials
WHERE id NOT IN (
  SELECT DISTINCT ON (name, content) id
  FROM testimonials
  ORDER BY name, content, created_at DESC
);
```

This will reduce the 22 rows down to 5 unique testimonials.

---

### Step 2: Fix n8n Workflow (Your Action Required)

The current issue: n8n's HTTP Request node runs **once per item** by default. Since Google Sheets returns 5 rows, it sends 5 separate requests.

**Fix**: Add an **Aggregate** node between the Google Sheets node and the HTTP Request node:

```text
Google Sheets (Get rows)
       |
       v
  Aggregate Node  <-- ADD THIS
  (Combine all items into one)
       |
       v
HTTP Request Node
  (Sends 1 request with all 5 rows)
```

**Aggregate Node Settings:**
- Type: "Aggregate All Item Data"
- Output Field Name: `items`

**Then update the HTTP Request JSON body to:**
```
={{ JSON.stringify({ "table": "testimonials", "data": $json.items, "mode": "replace" }) }}
```

This ensures only 1 HTTP request is sent with all rows combined.

---

### Step 3: No Code Changes Needed

The frontend component (`TestimonialsSection.tsx`) is already correctly configured:
- Fetches from the `testimonials` table
- Filters by `is_approved = true` AND `is_featured = true`
- Uses React Query with auto-refresh on window focus

The website will show the updated reviews once:
1. Duplicates are cleaned up
2. User navigates to the homepage (testimonials are on `/`, not `/blog`)

---

### Summary

| Task | Who | What |
|------|-----|------|
| Remove duplicate rows | Lovable (SQL migration) | Clean database to 5 unique rows |
| Fix n8n workflow | You (in n8n) | Add Aggregate node before HTTP Request |
| Verify on homepage | You (in browser) | Navigate to `/` to see updated reviews |

