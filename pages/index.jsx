import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mehdi.dev - Portfolio</title>
      </Head>
      <section className="bg-gray-50 min-h-screen flex flex-col justify-center items-center text-center px-6">
        <h1 className="text-5xl font-extrabold text-gray-900">
          Salut, je suis <span className="text-indigo-600">Mehdi</span> 👋
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-2xl">
          Étudiant en électronique & cybersécurité, passionné par les projets embarqués et le développement web.  
          Bienvenue sur mon site perso où je partage mes <b>projets</b>, <b>expériences</b> et <b>idées</b>.
        </p>
        <div className="mt-6 flex gap-4">
          <Link href="/projets" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Voir mes projets
          </Link>
          <Link href="/contact" className="px-6 py-3 border border-gray-400 rounded-lg hover:bg-gray-100">
            Me contacter
          </Link>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center">Pourquoi ce site ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 shadow rounded-xl bg-gray-50">
              <h3 className="font-bold text-lg mb-2">🚀 Portfolio</h3>
              <p>Un aperçu de mes projets étudiants et perso en électronique, IoT et cybersécurité.</p>
            </div>
            <div className="p-6 shadow rounded-xl bg-gray-50">
              <h3 className="font-bold text-lg mb-2">🔒 Sécurisé</h3>
              <p>Authentification avec Auth0 et bonnes pratiques de sécurité intégrées.</p>
            </div>
            <div className="p-6 shadow rounded-xl bg-gray-50">
              <h3 className="font-bold text-lg mb-2">📚 Blog</h3>
              <p>Bientôt disponible : articles techniques, astuces et expériences de projet.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
