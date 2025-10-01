import Link from 'next/link';
import { useUser } from '@auth0/nextjs-auth0/client';
import ThemeToggle from './ThemeToggle';

export default function NavBar() {
  const { user } = useUser();

  return (
    <nav className="sticky top-0 z-50 flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow-md">
      {/* Left side: site name */}
      <Link href="/" className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
        Mehdi.dev🚀
      </Link>

      {/* Center links (desktop) */}
      <ul className="hidden md:flex space-x-6 font-medium text-gray-700 dark:text-gray-300">
        <li>
          <Link href="/">Accueil</Link>
        </li>
        {user && (
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>
        )}
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      <div className="flex items-center space-x-3">
        {/* Toggle theme */}
        <ThemeToggle />
        {/* Auth button */}
        {user ? (
          <a
            href="/api/auth/logout"
            className="px-4 py-2 bg-red-500 text-white rounded-lg text-sm hover:bg-red-600"
          >
            Se déconnecter
          </a>
        ) : (
          <a
            href="/api/auth/login"
            className="px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm hover:bg-indigo-600"
          >
            Se connecter
          </a>
        )}
      </div>
    </nav>
  );
}