export const projects = [
    {
        id: "esp32-weather",
        title: "🌦️ Station Météo IoT",
        desc: "Station météo intelligente avec sécurité intégrée. Basée sur ESP32-S3, elle surveille la qualité de l'air (gaz), le son et les mouvements (PIR). Interface OLED et notifications en temps réel via Pushover.",
        descShort: "Station météo et sécurité : ESP32-S3, GPS, capteurs, OLED et notifs",
        tags: ["Embedded", "C++", "IoT", "ESP32"],
        demo: "#",
        repo: "https://github.com/Mastr00/wether",
        image: "/images/projects/esp32-wether.jpg", // Ensure this image path is correct or generic
        created_at: "2024-01-01T00:00:00Z"
    },
    {
        id: "portfolio-v2",
        title: "✨ Mon Portfolio V2",
        desc: "La version actuelle de ce site ! Développé avec Next.js 14 et TailwindCSS. Design 'Glassmorphism', animations fluides avec Framer Motion et une architecture modulaire.",
        descShort: "Site perso : Next.js, Tailwind, Framer Motion",
        tags: ["Next.js", "React", "TailwindCSS", "Framer Motion"],
        demo: "https://mehdi.dev",
        repo: "https://github.com/Mastr00/mon-site-perso",
        image: "/images/projects/portfolio.jpg", // Placeholder
        created_at: "2024-02-15T00:00:00Z"
    },
    {
        id: "dashboard-app",
        title: "📊 Dashboard Personnel",
        desc: "Un tableau de bord interactif pour gérer mes tâches, notes et voir mes stats GitHub. Conçu comme un espace de productivité personnel.",
        descShort: "Dashboard productivité : Widgets, LocalStorage, API",
        tags: ["React", "Dashboard", "API"],
        demo: "/dashboard",
        repo: "#",
        image: "/images/projects/dashboard.jpg", // Placeholder
        created_at: "2024-03-10T00:00:00Z"
    }
];
