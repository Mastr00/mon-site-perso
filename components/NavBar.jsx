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
    "text-slate-300 dark:text-slate-300 hover:text-neon-cyan transition-colors duration-300 relative group";

  const linkStyleLight =
    "text-slate-600 hover:text-neon-violet transition-colors duration-300 relative group";

  return (
    <nav className="sticky top-0 z-50 bg-[#020617]/80 dark:bg-[#020617]/80 backdrop-blur-xl border-b border-neon-violet/20 dark:border-neon-violet/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-extrabold"
          >
            <img src="/logo.png" alt="Logo" className="h-12 w-12 object-contain" />
            <span className="neon-text">MMSA.app</span>
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
                className="px-4 py-2 bg-gradient-to-r from-neon-violet to-neon-magenta text-white rounded-lg font-semibold hover:shadow-neon transition-all duration-300 hover:-translate-y-0.5"
              >
                {t.nav.login}
              </a>
            ) : (
              <a
                href="/api/auth/logout"
                className="px-4 py-2 bg-red-500/80 text-white rounded-lg font-semibold hover:bg-red-500 transition-all duration-300"
              >
                {t.nav.logout}
              </a>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-200 dark:text-slate-200 focus:outline-none hover:text-neon-cyan transition-colors"
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
            className="md:hidden bg-[#0F172A] dark:bg-[#0F172A] border-b border-neon-violet/20 overflow-hidden"
          >
            <div className="flex flex-col items-start p-4 space-y-3">
              <Link href="/" className={linkStyle} onClick={() => setIsOpen(false)}>{t.nav.home}</Link>
              <Link href="/portfolio" className={linkStyle} onClick={() => setIsOpen(false)}>{t.nav.portfolio}</Link>
              <Link href="/cv" className={linkStyle} onClick={() => setIsOpen(false)}>{t.nav.cv}</Link>
              <Link href="/contact" className={linkStyle} onClick={() => setIsOpen(false)}>{t.nav.contact}</Link>
              {user && (
                <Link href="/dashboard" className={linkStyle} onClick={() => setIsOpen(false)}>{t.nav.dashboard}</Link>
              )}
              <div className="flex gap-4 pt-4 mt-4 border-t border-neon-violet/20 w-full">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              {!user ? (
                <a
                  href="/api/auth/login"
                  className="w-full px-4 py-2 bg-gradient-to-r from-neon-violet to-neon-magenta text-white rounded-lg font-semibold text-center hover:shadow-neon transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {t.nav.login}
                </a>
              ) : (
                <a
                  href="/api/auth/logout"
                  className="w-full px-4 py-2 bg-red-500/80 text-white rounded-lg font-semibold text-center hover:bg-red-500 transition-all"
                  onClick={() => setIsOpen(false)}
                >
                  {t.nav.logout}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
