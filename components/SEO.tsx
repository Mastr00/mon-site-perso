import Head from 'next/head';
import { useRouter } from 'next/router';

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
};

export default function SEO({
  title = 'Mehdi Mamdouh',
  description = 'Portfolio de Mehdi Mamdouh, étudiant en électronique et développeur IoT basé à Nice, France.',
  image,
  url,
}: SEOProps) {
  const router = useRouter();
  const siteUrl = 'https://mmsa.app';
  const canonicalUrl = url || `${siteUrl}${router.asPath.split('?')[0]}`;
  const fullTitle = title.includes('Mehdi') ? title : `${title} – Mehdi Mamdouh`;
  const ogImage =
    image ||
    `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.slice(0, 120))}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="author" content="Mehdi Mamdouh" />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={canonicalUrl} />

      {/* Favicon */}
      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Mehdi Mamdouh" />
      <meta property="og:locale" content="fr_FR" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={ogImage} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: 'Mehdi Mamdouh',
            url: canonicalUrl,
            image: ogImage,
            jobTitle: 'Étudiant en Électronique & Développeur IoT',
            worksFor: {
              '@type': 'EducationalOrganization',
              name: "Université Côte d'Azur",
            },
            sameAs: [
              'https://github.com/Mastr00',
              'https://www.linkedin.com/in/mehdi-mamdouh-8493162b3/',
            ],
          }),
        }}
      />
    </Head>
  );
}
