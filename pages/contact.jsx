import Head from "next/head";

export default function Contact() {
  return (
    <>
      <Head>
        <title>Contact - Mehdi.dev</title>
      </Head>
      <div className="max-w-3xl mx-auto px-6 py-12 text-center">
        <h1 className="text-4xl font-bold mb-6">📬 Me Contacter</h1>
        <p className="text-gray-600 mb-8">
          Tu veux discuter d’un projet, d’une collaboration ou juste dire bonjour ?  
          N’hésite pas à m’envoyer un message.
        </p>

        <a
          href="mailto:mehdi@example.com"
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          ✉️ Envoyer un email
        </a>
      </div>
    </>
  );
}
