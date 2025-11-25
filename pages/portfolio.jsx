import Head from "next/head";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Portfolio() {
  const projects = [
    {
      id: "esp32-wether",
      title: "🌦️ esp32-Wether",
      desc: "Station météo et sécurité : ESP32-S3, GPS, capteurs (gaz, son, PIR), OLED et notifs Pushover.",
      tags: ["ESP32-S3", "IoT", "C++", "Security"],
      demo: "#",
      repo: "https://github.com/Mastr00/wether",
      image: "/images/projects/esp32-wether.jpg"
    },
    {
      id: "fall_guard",
      title: "⚠️ Fall_guard — Détecteur de chute",
      descShort: "Détecteur de chute autonome avec envoi d'un SOS + coordonnées GPS si la personne ne se relève pas.",
      long: `As part of a project for our study in electronics and wireless communication we made a fall detector.

All people have a risk of having a serious fall in an isolated place, whether it is an elderly person in a bathtub or an explorer on a mountain.         Our idea is simple: detect falls and inform emergency services and the victim's relatives as quickly as possible. When the person falls, the fall is automatically detected by the accelerometer. The system analyzes the fall and, if the person does not get up, the device directly sends an "SOS" and GPS coordinates to help and loved ones.`,
      tags: ["Safety", "Wearable", "GPS", "Accelerometer"],
      canva: "https://www.canva.com/design/DAGEGtVhnBw/0-vhrQnHjY428aMI4KPUaQ/view?utm_content=DAGEGtVhnBw&utm_campaign=designshare&utm_medium=link&utm_source=editor",
      repo: "https://github.com/Mastr00/Fall_guard",
      image: "/images/projects/fall_guard.jpg"
    },
    {
      id: "dashboard-perso",
      title: "📊 Dashboard perso",
      desc: "Mon site perso (mmsa.app) — Next.js + Auth0 + Tailwind + Recharts.",
      tags: ["Next.js", "Auth0", "Tailwind", "Recharts"],
      demo: "https://mmsa.app",
      repo: "https://github.com/Mastr00/mon-site-perso",
      image: "/images/projects/dashboard-perso.jpg"
    },
    {
      id: "lidar_radar",
      title: "📡 Radar ESP32-S3 + VL53L5CX",
      desc: "Solution radar/lidar pour détection et monitoring temps réel.",
      tags: ["ESP32-S3", "lidar"],
      demo: "#",
      repo: "https://github.com/Mastr00/lidar_radar",
      image: "/images/projects/lidar_radar.jpg"
    },
    {
      id: "suivi-solaire",
      title: "🌞 Suivi solaire avec GPS",
      desc: "Support motorisé à deux axes pour panneaux solaires (contrôle Arduino/ESP32).",
      tags: ["Énergie", "Arduino", "ESP32"],
      demo: "#",
      repo: "#",
      image: "/images/projects/suivi-solaire.jpg"
    },
    {
      id: "esp32-redteam",
      title: "🕵️ ESP32 Marauder",
      desc: "Expérimentations : exfiltration Wi-Fi, sniff BLE — benchs pour tests de sécurité.",
      tags: ["Sécurité", "ESP32-C3", "RedTeam"],
      demo: "#",
      repo: "#",
      image: "/images/projects/esp32-redteam.jpg"
    }
  ];

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
            {projects.map((p, index) => (
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
