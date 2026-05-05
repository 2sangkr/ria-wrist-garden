import { cache } from 'react';
import { supabase } from './supabase';
import type { Artist, Work } from './artists';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapWork(w: any): Work {
  return {
    slug: w.slug,
    title: w.title,
    image: w.image,
    materials: w.materials,
    created_at: w.created_at,
    age: w.age ?? undefined,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapArtist(a: any, works?: Work[]): Artist {
  return {
    id: a.id,
    slug: a.slug,
    name: a.name,
    tags: a.tags,
    bio: a.bio,
    profileColor: a.profile_color,
    isEmpty: a.is_empty,
    works,
  };
}

export const getArtists = cache(async (): Promise<Artist[]> => {
  const { data } = await supabase.from('artists').select('*').order('sort_order');
  return (data ?? []).map((a) => mapArtist(a));
});

export const getArtistWithWorks = cache(async (slug: string): Promise<Artist | null> => {
  const { data: a } = await supabase.from('artists').select('*').eq('slug', slug).single();
  if (!a) return null;

  const { data: works } = await supabase
    .from('works')
    .select('*')
    .eq('artist_id', a.id)
    .order('created_at', { ascending: false });

  return mapArtist(a, (works ?? []).map(mapWork));
});

export const getAllArtistsWithWorks = cache(async (): Promise<Artist[]> => {
  const { data: artists } = await supabase.from('artists').select('*').order('sort_order');
  if (!artists) return [];

  const { data: works } = await supabase.from('works').select('*');

  return artists
    .filter((a) => !a.is_empty)
    .map((a) =>
      mapArtist(
        a,
        (works ?? []).filter((w) => w.artist_id === a.id).map(mapWork)
      )
    );
});
