import Head from 'next/head';
import { useRouter } from 'next/router';

const SITE_URL = 'https://mmsa.app';
const DEFAULT_TITLE = 'Mehdi Mamdouh - Électronique, IoT & cybersécurité à Nice';
const DEFAULT_DESCRIPTION =
  'Portfolio de Mehdi Mamdouh, étudiant en électronique à Nice, développeur IoT, systèmes embarqués, ESP32, C/C++, Python et web moderne.';
const DEFAULT_KEYWORDS = [
  'Mehdi Mamdouh',
  'Mehdi Mamdouh Nice',
  'électronique Nice',
  'electronique Nice',
  'étudiant électronique Nice',
  'etudiant electronique Nice',
  'développeur IoT Nice',
  'developpeur IoT Nice',
  'systèmes embarqués',
  'systemes embarques',
  'cybersécurité',
  'cybersecurite',
  'ESP32',
  'Arduino',
  'C++',
  'Python',
  'OpenCV',
  'FabLab Nice',
  'Université Côte d Azur',
  'Universite Cote d Azur',
  'portfolio électronique',
  'portfolio electronique',
  'portfolio IoT',
  'developpeur web Next.js',
  'React',
  'MMSA',
  'mmsa.app',
];

type SEOProps = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  keywords?: string[];
  type?: 'website' | 'profile' | 'article';
  structuredData?: Record<string, unknown> | Array<Record<string, unknown>>;
};

function toAbsoluteUrl(value: string): string {
  if (value.startsWith('http://') || value.startsWith('https://')) return value;
  return `${SITE_URL}${value.startsWith('/') ? value : `/${value}`}`;
}

function uniqueKeywords(keywords: string[]): string[] {
  return Array.from(new Set(keywords.map((keyword) => keyword.trim()).filter(Boolean)));
}

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image,
  url,
  keywords = [],
  type = 'website',
  structuredData = [],
}: SEOProps) {
  const router = useRouter();
  const canonicalUrl = url || `${SITE_URL}${router.asPath.split('?')[0]}`;
  const fullTitle = title.includes('Mehdi') ? title : `${title} - Mehdi Mamdouh`;
  const ogImage =
    image ||
    `/api/og?title=${encodeURIComponent(title)}&subtitle=${encodeURIComponent(description.slice(0, 120))}`;
  const absoluteImage = toAbsoluteUrl(ogImage);
  const pageKeywords = uniqueKeywords([...DEFAULT_KEYWORDS, ...keywords]);
  const extraStructuredData = Array.isArray(structuredData) ? structuredData : [structuredData];
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${SITE_URL}/#mehdi-mamdouh`,
        name: 'Mehdi Mamdouh',
        givenName: 'Mehdi',
        familyName: 'Mamdouh',
        url: SITE_URL,
        image: `${SITE_URL}/images/profile.jpeg`,
        jobTitle: 'Étudiant en électronique, développeur IoT et systèmes embarqués',
        description: DEFAULT_DESCRIPTION,
        email: 'mailto:mehdimamdouh20@gmail.com',
        homeLocation: {
          '@type': 'Place',
          name: 'Nice, France',
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Nice',
            addressRegion: "Provence-Alpes-Côte d'Azur",
            postalCode: '06000',
            addressCountry: 'FR',
          },
        },
        affiliation: {
          '@type': 'EducationalOrganization',
          name: "Université Côte d'Azur",
          address: {
            '@type': 'PostalAddress',
            addressLocality: 'Nice',
            addressCountry: 'FR',
          },
        },
        knowsAbout: [
          'Électronique',
          'IoT',
          'Systèmes embarqués',
          'Cybersécurité',
          'ESP32',
          'Arduino',
          'C/C++',
          'Python',
          'OpenCV',
          'Next.js',
          'React',
          'FabLab',
          'Fabrication numérique',
        ],
        sameAs: [
          'https://github.com/Mastr00',
          'https://www.linkedin.com/in/mehdi-mamdouh-8493162b3/',
        ],
        mainEntityOfPage: SITE_URL,
      },
      {
        '@type': 'WebSite',
        '@id': `${SITE_URL}/#website`,
        name: 'Mehdi Mamdouh - Portfolio électronique & IoT',
        alternateName: ['MMSA', 'mmsa.app', 'Portfolio Mehdi Mamdouh'],
        url: SITE_URL,
        inLanguage: 'fr-FR',
        description: DEFAULT_DESCRIPTION,
        publisher: {
          '@id': `${SITE_URL}/#mehdi-mamdouh`,
        },
      },
      {
        '@type': 'WebPage',
        '@id': canonicalUrl,
        url: canonicalUrl,
        name: fullTitle,
        description,
        inLanguage: 'fr-FR',
        isPartOf: {
          '@id': `${SITE_URL}/#website`,
        },
        about: {
          '@id': `${SITE_URL}/#mehdi-mamdouh`,
        },
        primaryImageOfPage: {
          '@type': 'ImageObject',
          url: absoluteImage,
        },
      },
      ...extraStructuredData.filter(Boolean),
    ],
  };

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={pageKeywords.join(', ')} />
      <meta name="author" content="Mehdi Mamdouh" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-image-preview:large" />
      <meta name="bingbot" content="index, follow, max-image-preview:large" />
      <link rel="canonical" href={canonicalUrl} />

      <link rel="icon" type="image/png" href="/favicon.png" />
      <link rel="shortcut icon" type="image/png" href="/favicon.png" />
      <link rel="apple-touch-icon" href="/favicon.png" />

      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={absoluteImage} />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:site_name" content="Mehdi Mamdouh - MMSA.app" />
      <meta property="og:locale" content="fr_FR" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={absoluteImage} />
      <meta property="twitter:image:alt" content={fullTitle} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd),
        }}
      />
    </Head>
  );
}
