import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";

const projets = [
  {
    title: "🚀 i-Cane",
    description: "Canne connectée avec capteurs pour aider les malvoyants.",
    link: "#",
    tags: ["IoT", "Accessibilité", "ESP32"]
  },
  {
    title: "🔐 ESP32-C3 Red Team",
    description: "Exfiltration de données via Wi-Fi dans un scénario de cybersécurité.",
    link: "#",
    tags: ["Sécurité", "Wi-Fi", "Embarqué"]
  },
  {
    title: "🌞 Suivi solaire",
    description: "Support motorisé à deux axes pour panneaux solaires.",
    link: "#",
    tags: ["Énergie", "Arduino", "Automatisation"]
  }
];

function Projets() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Mes Projets
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {projets.map((projet, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-md hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-3">
                {projet.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {projet.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {projet.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 text-sm rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <a
                href={projet.link}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition"
              >
                Voir le projet
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// protection Auth0
export default withPageAuthRequired(Projets);
