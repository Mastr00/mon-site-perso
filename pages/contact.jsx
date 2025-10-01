import Head from 'next/head';

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contactez Mehdi</title>
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Contactez-moi 📩
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-md">
          Une question, une collaboration ou juste envie de discuter ? N'hésitez pas à m'envoyer un
          message.
        </p>
        <a
          href="mailto:mehdimamdouh20@gmail.com"
          className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600"
        >
          Envoyer un e-mail
        </a>
      </div>
    </>
  );
}