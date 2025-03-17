import { createClient } from '@supabase/supabase-js'

const URL = 'https://ahvrxniwhbxlhualkzgt.supabase.co';
const API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFodnJ4bml3aGJ4bGh1YWxremd0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIyNDE3MDYsImV4cCI6MjA1NzgxNzcwNn0.Douk2itMQ0GnfbUG1ZTX5bvaqvzDQEUheEjm38MF-FA';

export const supabase = createClient(URL, API_KEY);

