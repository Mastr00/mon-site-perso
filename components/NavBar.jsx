import { useState } from "react";
import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";

export default function NavBar() {
  const { user } = useUser();
  const { t } = useLanguage();
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
            className="flex items-center gap-2 text-xl font-bold text-indigo-600 dark:text-indigo-400"
          >
            <img src="/logo.png" alt="Logo" className="h-12 w-12 object-contain" />
            MMSA.app
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={linkStyle}>{t.nav.home}</Link>
            <Link href="/portfolio" className={linkStyle}>{t.nav.portfolio}</Link>
            <Link href="/cv" className={linkStyle}>{t.nav.cv}</Link>

            <Link href="/contact" className={linkStyle}>{t.nav.contact}</Link>
            {user && <Link href="/dashboard" className={linkStyle}>{t.nav.dashboard}</Link>}

            <ThemeToggle />
            <LanguageToggle />

            {!user ? (
              <a
                href="/api/auth/login"
                className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              >
                {t.nav.login}
              </a>
            ) : (
              <a
                href="/api/auth/logout"
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                {t.nav.logout}
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
            className="md:hidden bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 overflow-hidden"
          >
            <div className="flex flex-col items-start p-4 space-y-3">
              <Link href="/" className={linkStyle} onClick={() => setIsOpen(false)}>{t.nav.home}</Link>
              <Link href="/portfolio" className={linkStyle} onClick={() => setIsOpen(false)}>{t.nav.portfolio}</Link>
              <Link href="/cv" className={linkStyle} onClick={() => setIsOpen(false)}>{t.nav.cv}</Link>
              <Link href="/blog" className={linkStyle} onClick={() => setIsOpen(false)}>{t.nav.blog}</Link>
              <Link href="/contact" className={linkStyle} onClick={() => setIsOpen(false)}>{t.nav.contact}</Link>
              {user && (
                <Link href="/dashboard" className={linkStyle} onClick={() => setIsOpen(false)}>{t.nav.dashboard}</Link>
              )}
              <div className="flex gap-4 pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 w-full">
                <ThemeToggle />
                <LanguageToggle />
              </div>
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
