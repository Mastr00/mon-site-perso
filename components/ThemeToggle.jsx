import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    } else {
      setTheme("light");
      document.documentElement.classList.remove("dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="px-3 py-2 rounded-lg border bg-gray-200 dark:bg-gray-700 dark:text-white"
    >
      {theme === "light" ? "🌙 Sombre" : "☀️ Clair"}
    </button>
  );
}
