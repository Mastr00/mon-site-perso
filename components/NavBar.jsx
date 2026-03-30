import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
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
  const router = useRouter();

  const getLinkStyle = (path) => {
    const isActive = router.pathname === path;
    return isActive
      ? "text-cyber-accent border-b-2 border-cyber-accent transition-colors duration-200 pb-1"
      : "text-cyber-400 hover:text-cyber-100 transition-colors duration-200 pb-1 relative group";
  };

  return (
    <nav className="sticky top-0 z-50 bg-cyber-50/80 dark:bg-cyber-950/80 backdrop-blur-xl border-b border-cyber-200 dark:border-cyber-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-extrabold">
            <img src="/logo.png" alt="Logo" className="h-12 w-12 object-contain" />
            <span className="font-mono font-semibold text-cyber-accent tracking-tighter">MMSA.app</span>
          </Link>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className={getLinkStyle("/")}>{t.nav.home}</Link>
            <Link href="/portfolio" className={getLinkStyle("/portfolio")}>{t.nav.portfolio}</Link>
            <Link href="/cv" className={getLinkStyle("/cv")}>{t.nav.cv}</Link>
            <Link href="/contact" className={getLinkStyle("/contact")}>{t.nav.contact}</Link>
            {user && <Link href="/dashboard" className={getLinkStyle("/dashboard")}>{t.nav.dashboard}</Link>}

            <ThemeToggle />
            <LanguageToggle />

            {!user ? (
              <a
                href="/api/auth/login"
                className="px-4 py-2 bg-cyber-cta text-white rounded-lg font-semibold hover:bg-cyber-accent transition-all duration-300 hover:-translate-y-0.5"
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
              className="text-cyber-950 dark:text-cyber-50 focus:outline-none hover:text-cyber-accent transition-colors"
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
            className="md:hidden bg-cyber-50 dark:bg-cyber-900 border-b border-cyber-200 dark:border-cyber-900 overflow-hidden"
          >
            <div className="flex flex-col items-start p-4 space-y-3">
              <Link href="/" className={getLinkStyle("/")} onClick={() => setIsOpen(false)}>{t.nav.home}</Link>
              <Link href="/portfolio" className={getLinkStyle("/portfolio")} onClick={() => setIsOpen(false)}>{t.nav.portfolio}</Link>
              <Link href="/cv" className={getLinkStyle("/cv")} onClick={() => setIsOpen(false)}>{t.nav.cv}</Link>
              <Link href="/contact" className={getLinkStyle("/contact")} onClick={() => setIsOpen(false)}>{t.nav.contact}</Link>
              {user && (
                <Link href="/dashboard" className={getLinkStyle("/dashboard")} onClick={() => setIsOpen(false)}>{t.nav.dashboard}</Link>
              )}
              <div className="flex gap-4 pt-4 mt-4 border-t border-cyber-200 dark:border-cyber-800 w-full">
                <ThemeToggle />
                <LanguageToggle />
              </div>
              {!user ? (
                <a
                  href="/api/auth/login"
                  className="w-full px-4 py-2 bg-cyber-cta text-white rounded-lg font-semibold text-center hover:bg-cyber-accent transition-all"
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
