import Link from 'next/link';
import Head from 'next/head';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <>
      <Head>
        <title>Mehdi – Étudiant & Développeur</title>
        <meta name="description" content="Portfolio de Mehdi, étudiant en électronique et cybersécurité. Découvrez mes projets et compétences." />
        <meta property="og:title" content="Mehdi – Étudiant & Développeur" />
        <meta property="og:description" content="Portfolio de Mehdi, étudiant en électronique et cybersécurité." />
      </Head>
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-6">
            Salut, je suis <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400">Mehdi</span> 👋
          </h1>
        </motion.div>

        <motion.p
          className="mt-4 text-lg md:text-2xl text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Étudiant en <span className="font-semibold text-indigo-600 dark:text-indigo-400">électronique</span> & <span className="font-semibold text-purple-600 dark:text-purple-400">cybersécurité</span>.
          <br className="hidden md:block" />
          Passionné par l'IoT, l'embarqué et le web moderne.
        </motion.p>

        <motion.div
          className="mt-10 flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link
            href="/portfolio"
            className="px-8 py-4 bg-indigo-600 text-white rounded-full font-bold text-lg shadow-lg hover:bg-indigo-700 hover:shadow-xl transition-all transform hover:-translate-y-1"
          >
            Voir mes Projets 🚀
          </Link>
          <Link
            href="/contact"
            className="px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full font-bold text-lg shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-all transform hover:-translate-y-1"
          >
            Me contacter 📩
          </Link>
        </motion.div>
      </div>
    </>
  );
}