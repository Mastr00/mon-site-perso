import Head from "next/head";
import Link from "next/link";

export default function Portfolio() {
  const projects = [
    {
      id: "i-cane",
      title: "🦯 i-Cane",
      desc: "Canne connectée pour malvoyants — capteurs distance, vibration d'alerte, interface mobile.",
      tags: ["IoT", "ESP32", "Accessibilité"],
      demo: "#",
      repo: "#"
    },
    {
      id: "suivi-solaire",
      title: "🌞 Suivi solaire avec GPS",
      desc: "Support motorisé à deux axes pour panneaux solaires (contrôle Arduino/ESP32).",
      tags: ["Énergie", "Arduino", "ESP32"],
      demo: "#",
      repo: "#"
    },
    {
      id: "radar-esp32",
      title: "📡 Radar ESP32-C6 + HC-SR04",
      desc: "Solution radar/ultrason pour détection et monitoring temps réel.",
      tags: ["ESP32-C6", "Ultrason"],
      demo: "#",
      repo: "#"
    },
    {
      id: "esp32-redteam",
      title: "🔐 ESP32-C3 — Red Team",
      desc: "Expérimentations : exfiltration Wi-Fi, sniff BLE — benchs pour tests de sécurité.",
      tags: ["Sécurité", "ESP32-C3", "RedTeam"],
      demo: "#",
      repo: "#"
    },
    {
      id: "fall_guard",
      title: "⚠️ Fall_guard — Détecteur de chute",
      descShort: "Détecteur de chute autonome avec envoi d'un SOS + coordonnées GPS si la personne ne se relève pas.",
      long: `As part of a project for our study in electronics and wireless communication we made a fall detector.

All people have a risk of having a serious fall in an isolated place, whether it is an elderly person in a bathtub or an explorer on a mountain.         Our idea is simple: detect falls and inform emergency services and the victim's relatives as quickly as possible. When the person falls, the fall is automatically detected by the accelerometer. The system analyzes the fall and, if the person does not get up, the device directly sends an "SOS" and GPS coordinates to help and loved ones.`,
      tags: ["Safety", "Wearable", "GPS", "Accelerometer"],
      canva: "https://www.canva.com/design/DAGEGtVhnBw/0-vhrQnHjY428aMI4KPUaQ/view?utm_content=DAGEGtVhnBw&utm_campaign=designshare&utm_medium=link&utm_source=editor",
      repo: "https://github.com/Mastr00/Fall_guard"
    },
    {
      id: "dashboard-perso",
      title: "📊 Dashboard perso",
      desc: "Mon site perso (mmsa.app) — Next.js + Auth0 + Tailwind + Recharts.",
      tags: ["Next.js", "Auth0", "Tailwind", "Recharts"],
      demo: "https://mmsa.app",
      repo: "#"
    }
  ];

  return (
    <>
      <Head>
        <title>Portfolio – Mehdi</title>
      </Head>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-6">🚀 Mes Projets</h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-10">
            Voici une sélection de mes projets en électronique, IoT, cybersécurité et développement web.
            Clique sur "Voir plus" pour les détails.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p) => (
              <article key={p.id} className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition">
                {/* Placeholder image */}
                <div className="h-40 mb-4 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-gray-400">
                  Image / Schéma
                </div>

                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">{p.title}</h2>

                <p className="text-gray-600 dark:text-gray-300">
                  {p.descShort ? p.descShort : p.desc}
                </p>

                {/* If long description (like Fall_guard), show a small excerpt and a modal-like detail link */}
                {p.long && (
                  <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{p.long.slice(0, 140)}...</p>
                )}

                <div className="flex flex-wrap gap-2 mt-4">
                  {p.tags.map((t) => (
                    <span key={t} className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-sm rounded-full text-gray-700 dark:text-gray-200">
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-4 flex gap-3">
                  {/* Voir plus ouvre la page externe (Canva) pour Fall_guard or demo */}
                  <a
                    href={p.canva ?? p.demo ?? p.repo ?? "#"}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
                  >
                    Voir plus
                  </a>

                  {p.repo && (
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block px-4 py-2 border rounded text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Code
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
