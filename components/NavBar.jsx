
import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { useUser } from "@auth0/nextjs-auth0/client";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const { user } = useUser();

  const NavLinks = () => (
    <>
      <li><Link href="/">Accueil</Link></li>
      {user && <li><Link href="/dashboard">Dashboard</Link></li>}
      <li><Link href="/contact">Contact</Link></li>
    </>
  );

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 dark:text-white shadow-md relative">
      <Link href="/" className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">Mehdi.dev</Link>

      {/* Desktop */}
      <ul className="hidden md:flex space-x-6 font-medium items-center">
        <NavLinks />
        <li><ThemeToggle /></li>
        <li>
          {user ? (
            <a href="/api/auth/logout" className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Se déconnecter</a>
          ) : (
            <a href="/api/auth/login" className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Se connecter</a>
          )}
        </li>
      </ul>

      {/* Burger (mobile) */}
      <button onClick={() => setOpen(!open)} className="md:hidden text-2xl" aria-label="Ouvrir le menu">
        ☰
      </button>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center space-y-4 py-6 md:hidden z-50"
          >
            <NavLinks />
            <li><ThemeToggle /></li>
            <li>
              {user ? (
                <a href="/api/auth/logout" className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">Se déconnecter</a>
              ) : (
                <a href="/api/auth/login" className="px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Se connecter</a>
              )}
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
