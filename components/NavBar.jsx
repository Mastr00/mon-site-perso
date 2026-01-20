import { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import ThemeToggle from "./ThemeToggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const linkStyle =
    "text-gray-800 dark:text-gray-200 hover:text-indigo-600 dark:hover:text-indigo-400";

  return (
    <nav className="sticky top-0 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-800/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="text-xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            MMSA.app🚀
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={linkStyle}>Accueil</Link>
            <Link href="/portfolio" className={linkStyle}>Portfolio</Link>
            <Link href="/contact" className={linkStyle}>Contact</Link>
            {user && <Link href="/dashboard" className={linkStyle}>Dashboard</Link>}

            <ThemeToggle />

            {!user ? (
              <a
                href="/api/auth/login"
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                Se connecter
              </a>
            ) : (
              <a
                href="/api/auth/logout"
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Se déconnecter
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden bg-white dark:bg-gray-900 shadow-lg overflow-hidden"
          >
            <div className="flex flex-col items-start p-4 space-y-3">
              <Link href="/" className={linkStyle} onClick={() => setIsOpen(false)}>Accueil</Link>
              <Link href="/portfolio" className={linkStyle} onClick={() => setIsOpen(false)}>Portfolio</Link>
              <Link href="/contact" className={linkStyle} onClick={() => setIsOpen(false)}>Contact</Link>
              {user && (
                <Link href="/dashboard" className={linkStyle} onClick={() => setIsOpen(false)}>Dashboard</Link>
              )}
              <ThemeToggle />
              {!user ? (
                <a
                  href="/api/auth/login"
                  className="w-full px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Se connecter
                </a>
              ) : (
                <a
                  href="/api/auth/logout"
                  className="w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-center"
                  onClick={() => setIsOpen(false)}
                >
                  Se déconnecter
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
