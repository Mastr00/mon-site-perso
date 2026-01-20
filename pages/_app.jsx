import '../styles/globals.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';

import { LanguageProvider } from '../context/LanguageContext';

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <LanguageProvider>
        <div className="flex flex-col min-h-screen">
          <NavBar />
          <main className="flex-grow">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </LanguageProvider>
    </UserProvider>
  );
}