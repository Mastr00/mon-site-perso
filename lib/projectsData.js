export const projects = [
    {
        id: "esp32-weather",
        title: { fr: "🌦️ Station Météo IoT", en: "🌦️ IoT Weather Station" },
        desc: { 
            fr: "Une station météo connectée et autonome conçue pour la surveillance environnementale en temps réel. Elle intègre la géolocalisation et la synchronisation horaire précise.",
            en: "An autonomous connected weather station designed for real-time environmental monitoring. It integrates geolocation and precise time synchronization."
        },
        descShort: {
            fr: "Station météo IoT avec GPS, capteurs environnementaux et écran OLED.",
            en: "IoT weather station with GPS, environmental sensors, and OLED display."
        },
        idea: {
            fr: "Créer une station météorologique entièrement autonome capable de récolter des données environnementales précises géolocalisées, sans dépendre d'une connexion internet permanente.",
            en: "Create a fully autonomous weather station capable of collecting precise geolocated environmental data, without relying on a constant internet connection."
        },
        challenges: {
            fr: "Le principal défi technique était de gérer la synchronisation entre les lectures capricieuses du capteur GPS (qui perd parfois le signal) et les lectures des capteurs I2C (écran OLED, DHT) sans bloquer la boucle principale du programme ESP32.",
            en: "The main technical challenge was managing the synchronization between erratic GPS sensor readings (signal loss) and I2C sensors (OLED, DHT) without blocking the ESP32 main loop."
        },
        solution: {
            fr: "Mise en place d'une architecture asynchrone (FreeRTOS) sur l'ESP32 pour que chaque module (Acquisition GPS, Capteurs, Affichage, Web Server) tourne sur sa propre tâche avec des mutex de sécurité.",
            en: "Implemented an asynchronous architecture (FreeRTOS) on the ESP32 so that each module (GPS, Sensors, Display, Web Server) runs on its own task safely using mutexes."
        },
        tags: ["IoT", "ESP32-S3", "C++", "GPS", "OLED"],
        demo: "https://canva.link/fcqwl3ulhqz81rs",
        repo: "https://github.com/Mastr00/wether",
        image: "/images/projects/esp32-wether.webp",
        hardware: ["ESP32-S3", "Module GPS Neo-6M/8M", "Capteur Temp/Hum DHT22", "Écran OLED SSD1306 0.96\""]
    },
    {
        id: "trail-gps",
        title: { fr: "🧭 TrailNav GPS Companion", en: "🧭 TrailNav GPS Companion" },
        desc: {
            fr: "Compagnon GPS sur mesure basé sur ESP32-S3. Un appareil all-in-one offrant écran interactif, gestion SD, capteurs IMU (boussole/accéléromètre) et stockage persistant.",
            en: "Custom GPS companion based on ESP32-S3. An all-in-one device acting as interactive display, SD manager, IMU tracker (compass) and offering persistent storage."
        },
        descShort: {
            fr: "Traceur GPS avec affichage TFT optimisé, boussole et module SD.",
            en: "GPS tracker with optimized TFT display, compass and SD module."
        },
        idea: {
            fr: "Développer une alternative open-source et personnalisable aux compteurs GPS commerciaux (type Edge) destinée au trail et au cyclisme, offrant un contrôle total sur ses données.",
            en: "Develop an open-source, customizable alternative to commercial cycling GPS computers (like Edge), giving users total control over their data."
        },
        challenges: {
            fr: "Afficher une boussole et des jauges en temps réel sur l'écran TFT sans effets de scintillement (flickering), et gérer la perte occasionnelle du lecteur de carte SD en pleine utilisation à cause des vibrations.",
            en: "Displaying a real-time compass and gauges on the TFT screen without flickering, and managing occasional SD card reader disconnects due to vibrations in use."
        },
        solution: {
            fr: "Utilisation poussée de la librairie TFT_eSprite (buffer en RAM / double buffering) pour envoyer l'image calculée en un seul bloc SPI à l'écran. Développement d'un watchdog pour réinitialiser le bus SPI de la carte SD en cas d'erreur.",
            en: "Heavy use of TFT_eSprite (RAM double buffering) to send the entire frame at once via SPI to the screen. Developed a watchdog to reset the SD card SPI bus on errors."
        },
        tags: ["C++", "ESP32-S3", "GPS", "IoT", "Embedded"],
        demo: "https://canva.link/ejz8w3khle6447l",
        repo: "https://github.com/Mastr00/trail_GPS",
        image: "/images/projects/trail-gps.png",
        hardware: ["ESP32-S3", "Écran TFT 2.0\" SPI", "Lecteur Carte MicroSD", "Module GPS Intégré", "Capteur IMU 6-Axes (Boussole)"]
    },
    {
        id: "fall-guard",
        title: { fr: "🚨 Fall_guard", en: "🚨 Fall_guard" },
        desc: {
            fr: "Système de sécurité intelligent pour personnes isolées. Ce dispositif détecte les chutes via l'analyse de mouvements et déclenche des alertes SOS géolocalisées.",
            en: "Smart safety system for isolated individuals. It detects falls through motion analysis and triggers geolocated SOS alerts."
        },
        descShort: {
            fr: "Détecteur de chute intelligent avec alertes SOS et suivi GPS.",
            en: "Smart fall detector with SOS alerts and GPS tracking."
        },
        idea: {
            fr: "Concevoir un petit module portable de sécurité vitale capable de détecter de manière fiable une chute brutale (personne âgée ou randonneur isolé) pour envoyer un signal au réseau.",
            en: "Design a small, wearable life-safety module capable of reliably detecting hard falls (for elderly or lone hikers) and signaling the network."
        },
        challenges: {
            fr: "Le filtrage des faux positifs (trébuchement léger, s'asseoir brusquement) et la détection infaillible de la perte absolue d'équilibre suivi par une période d'immobilité.",
            en: "Filtering out false positives (slight stumbles, sitting down abruptly) and guaranteeing absolute detection of severe falls followed by immobility."
        },
        solution: {
            fr: "Algorithme basé sur les seuils d'accélération différentielle : on guette un pic de 'Free Fall' suivi d'un impact soudain, couplé ensuite à un délai de 30 secondes d'immobilité. Si les trois conditions sont réunies, on déclenche l'alerte GPS.",
            en: "Algorithm based on differential acceleration thresholds: watching for a 'Free Fall' spike followed by a sudden impact, combined with 30s of immobility. All 3 must trigger."
        },
        tags: ["Embedded", "C++", "Safety", "Accel", "GPS"],
        demo: "https://www.canva.com/design/DAGEGtVhnBw/0-vhrQnHjY428aMI4KPUaQ/view?utm_content=DAGEGtVhnBw&utm_campaign=designshare&utm_medium=link&utm_source=editor",
        repo: "https://github.com/Mastr00/Fall_guard",
        image: "/images/projects/fall-guard.png",
        hardware: ["Microcontrôleur Basse Consommation", "Accéléromètre MPU6050", "Module GSM/GPS (Connectivité)"]
    },
    {
        id: "ia-cam",
        title: { fr: "🤖 IA-Cam - Robot Suiveur", en: "🤖 IA-Cam - Follow Robot" },
        desc: {
            fr: "Robot suiveur capable de détecter et suivre un visage en temps réel grâce à l'IA. Combine vision par ordinateur et contrôle de servomoteurs pour un suivi fluide.",
            en: "Tracking robot capable of real-time face detection using AI. It combines computer vision with servomotor controls for fluid following."
        },
        descShort: {
            fr: "Robot avec reconnaissance faciale et suivi automatique pan/tilt.",
            en: "Robot featuring facial recognition and auto pan/tilt tracking."
        },
        idea: {
            fr: "Mettre en pratique la vision par ordinateur en temps réel (machine learning) en l'intégrant au monde physique via une tourelle robotique Pan/Tilt qui suit ma tête.",
            en: "Apply real-time computer vision (machine learning) dynamically by integrating it into the physical world via a Pan/Tilt robotic turret that tracks a face."
        },
        challenges: {
            fr: "L'ESP32-CAM manquait de puissance brute pour faire tourner un modèle OpenCV complexe à haut framerate sans surchauffer ou figer le stream vidéo.",
            en: "The ESP32-CAM lacked the raw compute to run a complex OpenCV model at high framerates without overheating or stuttering the video stream."
        },
        solution: {
            fr: "Délégation du calcul ! L'ESP-CAM ne fait plus qu'envoyer le flux vidéo brut (MJPEG) vers un script Python sur PC. Le script fait la détection OpenCV et envoie seulement de petits paquets via WebSocket (ex: 'X+2, Y-1') à l'ESP pour ajuster les servomoteurs.",
            en: "Computing delegation! ESP-CAM simply streams raw MJPEG to a Python script on PC. Python does the OpenCV heavy lifting and sends back mini WebSocket packets (e.g. 'X+2') to adjust the servos."
        },
        tags: ["ESP32-CAM", "Python", "OpenCV", "IoT", "Robotique"],
        demo: "https://canva.link/1nzeb6rmtnxb628",
        repo: "https://github.com/Mastr00/IA-Cam",
        image: "/images/projects/ia-cam.png",
        hardware: ["ESP32-CAM (Caméra OV2640)", "Servomoteurs SG90 (Axe Pan & Tilt)", "Support Robotique Imprimé 3D"]
    },
    {
        id: "portfolio-v2",
        title: { fr: "✨ Mon Portfolio V2", en: "✨ My Portfolio v2" },
        desc: {
            fr: "Ce site personnel ! Une vitrine interactive de mes compétences et projets, alliant design moderne et performance technique.",
            en: "This personal website! An interactive showcase of my skills combining modern design with peak technical performance."
        },
        descShort: {
            fr: "Portfolio interactif : Next.js, Framer Motion et Glassmorphism.",
            en: "Interactive Portfolio : Next.js, Framer Motion, Glassmorphism."
        },
        idea: {
            fr: "Refondre mon portfolio statique pour refléter véritablement mes compétences actuelles, en intégrant des animations next-gen, un support multilingue et un CMS statique.",
            en: "Redesign my static portfolio to genuinely reflect my current skill set, integrating next-gen animations, multi-language support, and a fast static CMS."
        },
        challenges: {
            fr: "Gérer un système de mode Clair / Sombre complexe (car le design d'origine \"Neon/Hacker\" est prévu pour être sombre) tout en gardant le style lisible sur fond clair.",
            en: "Handling a complex Light / Dark mode toggle (since the original 'Neon/Hacker' design was inherently dark) while preserving readability and style on white backgrounds."
        },
        solution: {
            fr: "Exploitation profonde et complète des classes `dark:` de Tailwind avec des abstractions de couleurs pour un basculement de thème parfait. Le routing dynamique de Next.js permet de générer des pages par projet sans effort base de données.",
            en: "Complete exploitation of Tailwind's `dark:` utility classes and python injection for flawless theme toggling. Next.js dynamic routing powers the individual project pages natively."
        },
        tags: ["Next.js", "React", "Design", "TailwindCSS"],
        demo: "https://mmsa.app/",
        repo: "https://github.com/Mastr00/mon-site-perso",
        image: "/images/projects/portfolio.jpg",
        hardware: ["Next.js 14", "TailwindCSS + Framer Motion", "Vercel Hosting"]
    },
    {
        id: "lidar-radar",
        title: { fr: "📡 Lidar Radar System", en: "📡 Lidar Radar System" },
        desc: {
            fr: "Un système de cartographie et de télémétrie 3D haute performance. Il exploite la technologie Time-of-Flight (ToF) pour visualiser l'environnement spatial.",
            en: "High-performance 3D telemetry/mapping system utilizing underlying Time-of-Flight (ToF) sensor to visualize the spatial environment."
        },
        descShort: {
            fr: "Cartographie et ranging 3D via capteur Lidar et interface Web.",
            en: "3D mapping and ranging via Lidar sensor with a Web interface."
        },
        idea: {
            fr: "Transformer un simple capteur ToF multi-zones en un véritable scanner 3D / Radar embarqué qui transmet la cartographie spatiale sans délai (temps réel) vers le web.",
            en: "Transform a basic multi-zone ToF sensor into an advanced onboard 3D scanner/Radar, broadcasting the spatial map rapidly to the browser."
        },
        challenges: {
            fr: "Traiter la montagne de données générée à 15 Hz par la matrice 8x8 du capteur Lidar (soit des milliers de pixels de distance convertis à la seconde) et l'envoyer par Wi-Fi sans bégaiement côté navigateur.",
            en: "Processing the mountain of raw data gathered at 15Hz by the 8x8 Lidar matrix (converting thousands of distance pixels a second) and sending it efficiently over Wi-Fi without browser stutter."
        },
        solution: {
            fr: "Activation et utilisation de la PSRAM (RAM externe) de l'ESP32-S3 pour accumuler le buffer de la matrice. Envoi structuré en JSON via Server-Sent Events (SSE) asynchrone pour que le front-end reçoive la frame fluide et dessine la heatmap.",
            en: "Enabled ESP32-S3 PSRAM (external RAM) to accumulate the heavy matrix buffer. Structured the shipment mechanism as asynchronous JSON via Server-Sent Events (SSE) for fluid heatmap frontend drawing."
        },
        tags: ["Lidar", "3D Mapping", "ESP32", "C++", "Web Interface"],
        demo: "#",
        repo: "https://github.com/Mastr00/lidar_radar",
        image: "/images/projects/lidar.jpg",
        hardware: ["ESP32-S3 avec PSRAM", "Capteur Lidar multi-zones ToF (VL53L5CX)"]
    }
];
