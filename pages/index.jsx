import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-4 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white">
        Salut, je suis <span className="text-indigo-600 dark:text-indigo-400">Mehdi</span> 👋
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl">
        Étudiant en électronique & cybersécurité, passionné par les projets embarqués et le
        développement web. Bienvenue sur mon site perso où je partage mes{' '}
        <span className="font-semibold text-gray-800 dark:text-white">projets</span>,{' '}
        <span className="font-semibold text-gray-800 dark:text-white">expériences</span> et{' '}
        <span className="font-semibold text-gray-800 dark:text-white">idées</span>.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-indigo-500 text-white rounded-lg font-medium hover:bg-indigo-600"
        >
          Voir mon Dashboard
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg font-medium hover:bg-gray-300 dark:hover:bg-gray-700"
        >
          Me contacter
        </Link>
      </div>
    </div>
  );
}