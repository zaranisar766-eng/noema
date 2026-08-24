import { brand, articles } from '@/lib/content';
export default function sitemap() {
  const now = new Date();
  return [
    { url: brand.url, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    ...articles.map(a => ({ url: `${brand.url}/insights/${a.slug}`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 })),
  ];
}
