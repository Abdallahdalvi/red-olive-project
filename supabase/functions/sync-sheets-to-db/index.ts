import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SyncRequest {
  table: 'destinations' | 'packages' | 'blog_posts' | 'testimonials';
  data: Record<string, any>[];
  mode: 'upsert' | 'replace';
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: SyncRequest = await req.json();
    
    // Validate request structure
    if (!body.table || !body.data || !Array.isArray(body.data)) {
      return new Response(
        JSON.stringify({ error: 'Invalid request. Required: table, data (array)' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const validTables = ['destinations', 'packages', 'blog_posts', 'testimonials'];
    if (!validTables.includes(body.table)) {
      return new Response(
        JSON.stringify({ error: `Invalid table. Must be one of: ${validTables.join(', ')}` }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const mode = body.mode || 'upsert';
    
    // Create Supabase client with service role for admin operations
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    console.log(`Syncing ${body.data.length} records to ${body.table} (mode: ${mode})`);

    let results = { inserted: 0, updated: 0, errors: [] as string[] };

    // If replace mode, delete all existing records first
    if (mode === 'replace') {
      const { error: deleteError } = await supabase
        .from(body.table)
        .delete()
        .neq('id', '00000000-0000-0000-0000-000000000000'); // Delete all
      
      if (deleteError) {
        console.error('Delete error:', deleteError);
        results.errors.push(`Delete failed: ${deleteError.message}`);
      }
    }

    // Process each record
    for (const record of body.data) {
      try {
        // Transform data based on table
        const transformedRecord = transformRecord(body.table, record);
        
        if (!transformedRecord.id) {
          // Insert new record
          const { error } = await supabase
            .from(body.table)
            .insert(transformedRecord);
          
          if (error) {
            results.errors.push(`Insert error for record: ${error.message}`);
          } else {
            results.inserted++;
          }
        } else {
          // Upsert with id
          const { error } = await supabase
            .from(body.table)
            .upsert(transformedRecord, { onConflict: 'id' });
          
          if (error) {
            results.errors.push(`Upsert error for ${transformedRecord.id}: ${error.message}`);
          } else {
            results.updated++;
          }
        }
      } catch (e) {
        results.errors.push(`Processing error: ${e instanceof Error ? e.message : 'Unknown error'}`);
      }
    }

    console.log(`Sync complete. Inserted: ${results.inserted}, Updated: ${results.updated}, Errors: ${results.errors.length}`);

    return new Response(
      JSON.stringify({
        success: true,
        table: body.table,
        mode,
        results,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Sync error:', errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

function transformRecord(table: string, record: Record<string, any>): Record<string, any> {
  // Clean up and transform the record based on table schema
  const transformed: Record<string, any> = {};

  switch (table) {
    case 'destinations':
      if (record.id) transformed.id = record.id;
      transformed.name = record.name || '';
      transformed.country = record.country || '';
      transformed.region = record.region || null;
      transformed.description = record.description || null;
      transformed.image_url = record.image_url || null;
      transformed.price_from = parseFloat(record.price_from) || null;
      transformed.is_featured = parseBool(record.is_featured);
      transformed.is_active = parseBool(record.is_active, true);
      transformed.display_order = parseInt(record.display_order) || 0;
      break;

    case 'packages':
      if (record.id) transformed.id = record.id;
      transformed.title = record.title || '';
      transformed.description = record.description || null;
      transformed.duration = record.duration || null;
      transformed.price = parseFloat(record.price) || 0;
      transformed.original_price = parseFloat(record.original_price) || null;
      transformed.package_type = record.package_type || null;
      transformed.image_url = record.image_url || null;
      transformed.highlights = parseArray(record.highlights);
      transformed.is_featured = parseBool(record.is_featured);
      transformed.is_active = parseBool(record.is_active, true);
      transformed.display_order = parseInt(record.display_order) || 0;
      // Note: destination_id needs to be resolved from destination_name if provided
      if (record.destination_id) {
        transformed.destination_id = record.destination_id;
      }
      break;

    case 'blog_posts':
      if (record.id) transformed.id = record.id;
      transformed.slug = record.slug || '';
      transformed.title = record.title || '';
      transformed.excerpt = record.excerpt || null;
      transformed.content = record.content || null;
      transformed.author = record.author || null;
      transformed.category = record.category || null;
      transformed.image_url = record.image_url || null;
      transformed.is_published = parseBool(record.is_published);
      transformed.published_at = record.published_at || null;
      break;

    case 'testimonials':
      if (record.id) transformed.id = record.id;
      transformed.name = record.name || '';
      transformed.location = record.location || null;
      transformed.destination = record.destination || null;
      transformed.content = record.content || '';
      transformed.rating = parseInt(record.rating) || null;
      transformed.avatar_url = record.avatar_url || null;
      transformed.is_featured = parseBool(record.is_featured);
      transformed.is_approved = parseBool(record.is_approved);
      break;

    default:
      return record;
  }

  return transformed;
}

function parseBool(value: any, defaultValue: boolean = false): boolean {
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    return value.toLowerCase() === 'true' || value === '1' || value.toLowerCase() === 'yes';
  }
  return defaultValue;
}

function parseArray(value: any): string[] | null {
  if (Array.isArray(value)) return value;
  if (typeof value === 'string' && value.trim()) {
    // Handle comma-separated strings
    return value.split(',').map(s => s.trim()).filter(Boolean);
  }
  return null;
}
