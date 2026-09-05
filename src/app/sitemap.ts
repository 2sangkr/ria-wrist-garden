import { MetadataRoute } from 'next';
import { getAllArtistsWithWorks } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const artists = await getAllArtistsWithWorks();

  const artistUrls: MetadataRoute.Sitemap = artists.map((artist) => ({
    url: `https://mymomo.gallery/artist/${artist.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const workUrls: MetadataRoute.Sitemap = artists.flatMap((artist) =>
    (artist.works ?? []).map((work) => ({
      url: `https://mymomo.gallery/artist/${artist.slug}/${work.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6,
    }))
  );

  return [
    {
      url: 'https://mymomo.gallery',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://mymomo.gallery/artists',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    ...artistUrls,
    ...workUrls,
  ];
}
