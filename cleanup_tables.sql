-- Run this in your Supabase SQL Editor to delete the unused tables
DROP TABLE IF EXISTS public.reports;
DROP TABLE IF EXISTS public.canonical_moves;
DROP TABLE IF EXISTS public.chess_openings;
DROP TABLE IF EXISTS public.visits;
DROP TABLE IF EXISTS public.profiles;

-- Note: We are keeping 'public.shortened_urls' as it is the core table.
