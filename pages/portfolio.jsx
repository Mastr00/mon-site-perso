import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

import { supabase } from '../lib/supabaseClient';

export default function Portfolio({ projects }) {
  // Static fallback projects if DB is empty or fails
  const staticProjects = [
    {
      id: "esp32-wether",
      title: "🌦️ esp32-Wether",
      desc: "Station météo et sécurité : ESP32-S3, GPS, capteurs (gaz, son, PIR), OLED et notifs Pushover.",
      tags: ["ESP32-S3", "IoT", "C++", "Security"],
      demo: "#",
      repo: "https://github.com/Mastr00/wether",
      image: "/images/projects/esp32-wether.jpg"
    },
    // ... (other static projects can remain as fallback or be removed if migrated)
  ];

  const displayProjects = projects && projects.length > 0 ? projects : staticProjects;

  return (
    <>
      <Head>
        <title>Portfolio – Mehdi</title>
        <meta property="og:title" content="Portfolio – Mehdi" />
        <meta property="og:description" content="Découvrez mes projets en électronique, IoT et développement web." />
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">🚀 Mes Projets</h1>
            <p className="text-center text-gray-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto">
              Voici une sélection de mes projets en électronique, IoT, cybersécurité et développement web.
              Clique sur "Voir plus" pour les détails.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayProjects.map((p, index) => (
              <motion.article
                key={p.id}
                className="flex flex-col bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                {/* Image Section */}
                <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      // Fallback si l'image n'existe pas encore
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback placeholder */}
                  <div className="hidden absolute inset-0 items-center justify-center text-gray-400 text-sm font-medium">
                    Image bientôt disponible
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{p.title}</h2>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">
                    {p.descShort ? p.descShort : p.desc}
                  </p>

                  {p.long && (
                    <p className="mb-4 text-sm text-gray-500 dark:text-gray-400 line-clamp-3">
                      {p.long}
                    </p>
                  )}

                  <div className="flex flex-wrap gap-2 mb-6">
                    {p.tags.map((t) => (
                      <span key={t} className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full">
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="mt-auto flex gap-3">
                    <a
                      href={p.canva ?? p.demo ?? p.repo ?? "#"}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 text-center px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
                    >
                      Voir plus
                    </a>

                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


export async function getServerSideProps() {
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error("Error fetching projects:", error);
    return { props: { projects: [] } };
  }

  return {
    props: {
      projects: projects || [],
    },
  };
}
