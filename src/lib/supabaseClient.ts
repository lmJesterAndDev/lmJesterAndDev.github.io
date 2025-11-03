import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://pwmxtwuzxuhhtkelxstb.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB3bXh0d3V6eHVoaHRrZWx4c3RiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxMTEyOTYsImV4cCI6MjA3NzY4NzI5Nn0.Dxblv6e2nCc7TgJ4XQ6PoCQ5nPJupZOY54j6_BjOZ-M';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
