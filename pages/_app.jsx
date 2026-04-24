import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { Inter, JetBrains_Mono } from 'next/font/google';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import PageLoader from '../components/PageLoader';
import { LanguageProvider } from '../context/LanguageContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <LanguageProvider>
        <style jsx global>{`
          :root {
            --font-inter: ${inter.style.fontFamily};
            --font-jetbrains: ${jetbrainsMono.style.fontFamily};
          }
        `}</style>
        <div className={`${inter.variable} ${jetbrainsMono.variable}`}>
          <PageLoader />
          <div className="flex flex-col min-h-screen">
            <NavBar />
            <main className="flex-grow">
              <Component {...pageProps} />
            </main>
            <Footer />
          </div>
          <Analytics />
          <SpeedInsights />
        </div>
      </LanguageProvider>
    </UserProvider>
  );
}
