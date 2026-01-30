-- Create trigger to automatically sync new inquiries to Google Sheets via edge function
CREATE OR REPLACE FUNCTION public.trigger_sync_inquiry_to_sheets()
RETURNS TRIGGER AS $$
BEGIN
  -- Call the edge function via pg_net
  PERFORM net.http_post(
    url := 'https://pmyndcfuvcpuuybnyyte.supabase.co/functions/v1/sync-inquiry-to-sheets',
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBteW5kY2Z1dmNwdXV5Ym55eXRlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0MzY2MjksImV4cCI6MjA4NTAxMjYyOX0.u-SlgnF6fOB8MC8ZAcIbWIEUaceHSzos1zMYu1F5Ijg'
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
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Drop existing trigger if it exists and create new one
DROP TRIGGER IF EXISTS on_inquiry_insert_sync_to_sheets ON public.inquiries;

CREATE TRIGGER on_inquiry_insert_sync_to_sheets
  AFTER INSERT ON public.inquiries
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_sync_inquiry_to_sheets();