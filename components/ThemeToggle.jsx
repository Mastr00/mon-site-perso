
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    try {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
      const initial = stored || (prefersDark ? "dark" : "light");
      setTheme(initial);
      if (initial === "dark") document.documentElement.classList.add("dark");
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    try { localStorage.setItem("theme", next); } catch {}
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-lg border bg-gray-200 dark:bg-gray-700 dark:text-white"
      aria-label="Toggle theme"
    >
      {theme === "light" ? "🌙 Sombre" : "☀️ Clair"}
    </button>
  );
}
