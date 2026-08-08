import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://kutqixnvalbqukfwcrrs.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt1dHFpeG52YWxicXVrZndjcnJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYyMTY5MzAsImV4cCI6MjEwMTc5MjkzMH0.nsFkZCrFsygFF6l1hFnY3dm2cbam1WX6G7xU7__CQ90';

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
