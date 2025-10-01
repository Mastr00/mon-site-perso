
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
      <h1 className="text-4xl md:text-6xl font-bold text-center text-gray-900 dark:text-white">
        Salut, je suis <span className="text-indigo-500">Mehdi</span> 👋
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 text-center max-w-2xl">
        Étudiant en électronique & cybersécurité, passionné par l'embarqué et le web.
        Découvre mon espace perso, sécurisé avec Auth0.
      </p>
      <div className="mt-8 flex gap-4">
        <Link href="/dashboard" className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
          Voir mon Dashboard
        </Link>
        <Link href="/contact" className="px-6 py-3 bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700 transition">
          Me contacter
        </Link>
      </div>
    </div>
  );
}
