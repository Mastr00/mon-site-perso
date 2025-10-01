import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NavBar() {
  const { user } = useUser();

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 shadow">
      {/* Left side */}
      <div className="flex gap-6">
        <Link href="/" className="text-gray-800 dark:text-white hover:text-indigo-500">
          Accueil
        </Link>
        {user && (
          <Link href="/dashboard" className="text-gray-800 dark:text-white hover:text-indigo-500">
            Dashboard
          </Link>
        )}
      </div>

      {/* Right side */}
      <div>
        {user ? (
          <a
            href="/api/auth/logout"
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Se déconnecter
          </a>
        ) : (
          <a
            href="/api/auth/login"
            className="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
          >
            Se connecter
          </a>
        )}
      </div>
    </nav>
  );
}
