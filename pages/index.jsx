import Head from "next/head";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <>
      <Head>
        <title>Mehdi.dev - Portfolio</title>
      </Head>

      {/* Hero Section */}
      <section className="text-center py-16 px-6 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Salut, je suis <span className="text-indigo-600 dark:text-indigo-400">Mehdi</span> 👋
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
        >
          Étudiant en électronique & cybersécurité, passionné par les projets embarqués, le dev web et la tech 🚀.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-6 flex justify-center space-x-4"
        >
          <a href="/projects" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
            Voir mes projets
          </a>
          <a href="/contact" className="px-6 py-3 border border-gray-400 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
            Me contacter
          </a>
        </motion.div>
      </section>

      {/* Section Projets Preview */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center dark:text-white">Mes Projets</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div whileHover={{ scale: 1.05 }} className="p-6 shadow rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white">
              <h3 className="font-bold text-lg mb-2">🚀 i-Cane</h3>
              <p>Canne connectée avec capteurs pour aider les malvoyants.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-6 shadow rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white">
              <h3 className="font-bold text-lg mb-2">🔐 ESP32-C3 Red Team</h3>
              <p>Exfiltration de données via Wi-Fi dans un scénario de cybersécurité.</p>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} className="p-6 shadow rounded-xl bg-gray-50 dark:bg-gray-700 dark:text-white">
              <h3 className="font-bold text-lg mb-2">🌞 Suivi solaire</h3>
              <p>Support motorisé à deux axes pour panneaux solaires.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
