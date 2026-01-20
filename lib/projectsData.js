export const projects = [
    {
        id: "esp32-weather",
        title: "🌦️ Station Météo IoT (wether)",
        desc: "Une station météo connectée et autonome conçue pour la surveillance environnementale en temps réel. Elle intègre la géolocalisation et la synchronisation horaire précise.",
        descShort: "Station météo IoT avec GPS, capteurs environnementaux et écran OLED.",
        long: "Ce projet repose sur un ESP32-S3 couplé à des capteurs de température et d'humidité (DHT). Il utilise un module GPS pour la géolocalisation et la synchronisation NTP pour une précision temporelle absolue. Les données sont affichées localement sur un écran OLED SSD1306 et peuvent être consultées via une interface web dédiée. Développé en C++ avec PlatformIO.",
        tags: ["IoT", "ESP32-S3", "C++", "GPS", "OLED"],
        demo: "#",
        repo: "https://github.com/Mastr00/wether",
        image: "/images/projects/esp32-wether.jpg",
        created_at: "2025-10-24T11:31:46Z"
    },
    {
        id: "fall-guard",
        title: "🚨 Fall_guard",
        desc: "Système de sécurité intelligent pour personnes isolées. Ce dispositif détecte les chutes via l'analyse de mouvements et déclenche des alertes SOS géolocalisées.",
        descShort: "Détecteur de chute intelligent avec alertes SOS et suivi GPS.",
        long: "Fall_guard utilise des données d'accéléromètre analysées par des algorithmes personnalisés pour distinguer les chutes réelles des mouvements normaux. Le système vérifie si la personne se relève (analyse post-chute) avant d'envoyer une alerte d'urgence contenant les coordonnées GPS précises aux contacts de sécurité. Conçu pour l'assistance aux personnes âgées ou aux explorateurs.",
        tags: ["Embedded", "C++", "Safety", "Accel", "GPS"],
        demo: "#",
        repo: "https://github.com/Mastr00/Fall_guard",
        image: "/images/projects/fall-guard.jpg",
        created_at: "2024-05-28T11:13:43Z"
    },
    {
        id: "lidar-radar",
        title: "📡 Lidar Radar System",
        desc: "Un système de cartographie et de télémétrie 3D haute performance. Il exploite la technologie Time-of-Flight (ToF) pour visualiser l'environnement spatial.",
        descShort: "Cartographie et ranging 3D via capteur Lidar et interface Web.",
        long: "Basé sur l'ESP32-S3 et le capteur VL53L5CX, ce projet permet la capture de données de distance en 3D. Il intègre un serveur web asynchrone (ESPAsyncWebServer) pour visualiser les données (mapping) en temps réel sur une interface navigateur. Optimisé pour utiliser la PSRAM de l'ESP32 pour le traitement rapide des matrices de distance.",
        tags: ["Lidar", "3D Mapping", "ESP32", "C++", "Web Interface"],
        demo: "#",
        repo: "https://github.com/Mastr00/lidar_radar",
        image: "/images/projects/lidar.jpg",
        created_at: "2025-11-12T17:21:53Z"
    },
    {
        id: "portfolio-v2",
        title: "✨ Mon Portfolio V2",
        desc: "Ce site personnel ! Une vitrine interactive de mes compétences et projets, alliant design moderne et performance technique.",
        descShort: "Portfolio interactif : Next.js, Framer Motion et Glassmorphism.",
        long: "Développé avec Next.js 14 et TailwindCSS, ce portfolio adopte un design 'Glassmorphism' avec des animations fluides gérées par Framer Motion. Il est entièrement Responsive, optimisé pour le SEO et n'utilise désormais plus de base de données (architecture 100% statique) pour une vitesse de chargement maximale.",
        tags: ["Next.js", "React", "Design", "TailwindCSS"],
        demo: "https://mon-site-perso-ten.vercel.app",
        repo: "https://github.com/Mastr00/mon-site-perso",
        image: "/images/projects/portfolio.jpg",
        created_at: "2025-09-24T21:39:13Z"
    }
];
