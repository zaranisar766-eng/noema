import { brand } from '@/lib/content';
export default function robots() {
  return { rules: [{ userAgent: '*', allow: '/' }], sitemap: `${brand.url}/sitemap.xml` };
}
