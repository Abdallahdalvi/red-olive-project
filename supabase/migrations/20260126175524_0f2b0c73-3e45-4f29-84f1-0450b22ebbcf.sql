-- Enable the pg_net extension for making HTTP requests from triggers
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Create a function to sync inquiry to Google Sheets via edge function
CREATE OR REPLACE FUNCTION public.sync_inquiry_to_sheets()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  supabase_url text;
  service_role_key text;
BEGIN
  -- Get Supabase URL and service role key from vault or environment
  supabase_url := current_setting('app.settings.supabase_url', true);
  service_role_key := current_setting('app.settings.service_role_key', true);
  
  -- If settings not available, try to construct URL from project reference
  IF supabase_url IS NULL THEN
    supabase_url := 'https://pmyndcfuvcpuuybnyyte.supabase.co';
  END IF;
  
  -- Make HTTP POST to the edge function
  PERFORM net.http_post(
    url := supabase_url || '/functions/v1/sync-inquiry-to-sheets',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer ' || COALESCE(service_role_key, current_setting('request.jwt.claims', true)::json->>'sub')
    ),
    body := jsonb_build_object('record', row_to_json(NEW))
  );
  
  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log error but don't fail the insert
    RAISE WARNING 'Failed to sync inquiry to sheets: %', SQLERRM;
    RETURN NEW;
END;
$$;

-- Create trigger on inquiries table
DROP TRIGGER IF EXISTS on_inquiry_created_sync_sheets ON public.inquiries;
CREATE TRIGGER on_inquiry_created_sync_sheets
  AFTER INSERT ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.sync_inquiry_to_sheets();