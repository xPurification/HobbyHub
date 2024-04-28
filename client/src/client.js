import { createClient } from '@supabase/supabase-js'

const URL = 'https://gtfqkqzwsptvafctpmly.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0ZnFrcXp3c3B0dmFmY3RwbWx5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI2ODQ3MjUsImV4cCI6MjAyODI2MDcyNX0.2VvM0KhQgvi8Dlf5CQSsaapJkcHkbYi0AQOX7VmY4RI';

export const supabase = createClient(URL, API_KEY);

