import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wixafbbadrjlqppqupbt.supabase.co';
const supabaseKey =
  ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndpeGFmYmJhZHJqbHFwcHF1cGJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0Mjc4MTgsImV4cCI6MjAzNjAwMzgxOH0.CcL7OCTNg6mLPrG8IFEqe7ok3ozKgnX-HCcT4CRxYww';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
