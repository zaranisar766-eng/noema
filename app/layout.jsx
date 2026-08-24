import { Instrument_Serif, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/providers/SmoothScroll';
import Cursor from '@/components/ui/Cursor';
import ScrollProgress from '@/components/ui/ScrollProgress';
import Preloader from '@/components/ui/Preloader';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import { brand } from '@/lib/content';

const display = Instrument_Serif({ subsets: ['latin'], weight: '400', style: ['normal','italic'], variable: '--font-display', display: 'swap' });
const sans    = Inter({ subsets: ['latin'], weight: ['300','400','500','600'], variable: '--font-sans', display: 'swap' });
const mono    = JetBrains_Mono({ subsets: ['latin'], weight: ['400','500'], variable: '--font-mono', display: 'swap' });

export const metadata = {
  metadataBase: new URL(brand.url),
  title: { default: `${brand.name} — ${brand.category} | ${brand.tagline}`, template: `%s | ${brand.name}` },
  description: brand.description,
  keywords: ['EEG headband','neurofeedback','cognitive training','focus tracking','mental fitness','on-device EEG'],
  authors: [{ name: `${brand.name} Systems AG` }],
  openGraph: {
    type: 'website', url: brand.url, siteName: brand.name,
    title: `${brand.name} — ${brand.category}`,
    description: brand.description,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: `${brand.name} — ${brand.tagline}` }],
  },
  twitter: { card: 'summary_large_image', title: `${brand.name} — ${brand.category}`, description: brand.tagline },
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
};

export const viewport = { themeColor: '#05070A', width: 'device-width', initialScale: 1, viewportFit: 'cover' };

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Product',
  name: `${brand.name} Gen 3`,
  description: brand.description,
  brand: { '@type': 'Brand', name: brand.name },
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.9', reviewCount: '6400' },
  offers: { '@type': 'Offer', priceCurrency: 'USD', price: '49', availability: 'https://schema.org/PreOrder' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`no-js ${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.remove('no-js')" }} />
        <a href="#hero" className="skip">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="grain" aria-hidden="true" />
        <Preloader />
        <ScrollProgress />
        <Cursor />
        <SmoothScroll>
          <Nav />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
