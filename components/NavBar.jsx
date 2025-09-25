import { useState } from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";
import { motion, AnimatePresence } from "framer-motion";

export default function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 dark:text-white shadow-md relative">
      <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">Mehdi.dev</h1>

      {/* Menu Desktop */}
      <ul className="hidden md:flex space-x-6 font-medium">
        <li><Link href="/">Accueil</Link></li>
        <li><Link href="/projects">Projets</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/contact">Contact</Link></li>
      </ul>

      <div className="hidden md:block">
        <ThemeToggle />
      </div>

      {/* Burger menu */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-2xl"
      >
        ☰
      </button>

      {/* Menu Mobile animé */}
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center space-y-4 py-6 md:hidden"
          >
            <li><Link href="/">Accueil</Link></li>
            <li><Link href="/projects">Projets</Link></li>
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/contact">Contact</Link></li>
            <ThemeToggle />
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
}
