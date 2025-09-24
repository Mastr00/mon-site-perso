import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

export default function NavBar() {
  const { user } = useUser();

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-extrabold text-indigo-600">
          Mehdi.dev 🚀
        </Link>
        <div className="space-x-6">
          <Link href="/" className="hover:text-indigo-600">Accueil</Link>
          <Link href="/dashboard" className="hover:text-indigo-600">Dashboard</Link>
          <Link href="/projets" className="hover:text-indigo-600">Projets</Link>
          <Link href="/contact" className="hover:text-indigo-600">Contact</Link>
        </div>
        <div>
          {user ? (
            <Link href="/api/auth/logout" className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
              Se déconnecter
            </Link>
          ) : (
            <Link href="/api/auth/login" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
              Se connecter
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
