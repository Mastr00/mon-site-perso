import Head from "next/head";

export default function Projets() {
  return (
    <>
      <Head>
        <title>Mes Projets - Mehdi.dev</title>
      </Head>
      <div className="max-w-5xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6">🚀 Mes Projets</h1>
        <p className="text-gray-600 mb-8">
          Voici quelques-uns de mes projets en électronique, IoT et cybersécurité.
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">📡 i-Cane</h2>
            <p className="mt-2 text-gray-600">
              Une canne connectée avec capteurs pour aider les malvoyants à mieux percevoir leur environnement.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">🔐 Projet Red Team ESP32-C3</h2>
            <p className="mt-2 text-gray-600">
              Exfiltration de données via Wi-Fi avec un microcontrôleur, dans un scénario de cybersécurité offensive.
            </p>
          </div>

          <div className="p-6 border rounded-xl shadow hover:shadow-lg transition">
            <h2 className="text-xl font-semibold">🌞 Suivi solaire Arduino/ESP32</h2>
            <p className="mt-2 text-gray-600">
              Support motorisé à deux axes pour panneaux solaires, avec calcul GPS et asservissement.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
