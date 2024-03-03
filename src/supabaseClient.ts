import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://qidhpalcsskmphjpdkus.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpZGhwYWxjc3NrbXBoanBka3VzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDg2MTg0MjMsImV4cCI6MjAyNDE5NDQyM30.DjWGEvfjgxeFr3AkH1MOE2eqoSf8oQqHl0-q8xOEwpI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
