import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html lang="fr">
            <Head>
                {/* Site Metadata & Icons */}
                <link rel="icon" href="/favicon.png" type="image/png" />
                <link rel="shortcut icon" href="/favicon.png" type="image/png" />
                <link rel="apple-touch-icon" href="/favicon.png" />

                {/* Fonts */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />

                {/* Theme Color */}
                <meta name="theme-color" content="#38BDF8" />
            </Head>
            <body className="antialiased">
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
