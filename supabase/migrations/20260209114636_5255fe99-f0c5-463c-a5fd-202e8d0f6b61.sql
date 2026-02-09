
-- Clean up duplicates again
DELETE FROM testimonials
WHERE id NOT IN (
  SELECT DISTINCT ON (name, content) id
  FROM testimonials
  ORDER BY name, content, created_at DESC
);

-- Add unique constraint to prevent future duplicates
ALTER TABLE testimonials ADD CONSTRAINT testimonials_name_content_unique UNIQUE (name, content);
