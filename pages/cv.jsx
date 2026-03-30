import Head from "next/head";
import { Download, Briefcase, GraduationCap, Wrench, Languages, Car, Heart, Zap, Github, Linkedin, Mail, Phone, MapPin, Globe, CheckCircle2, Server, Lightbulb, Code2 } from "lucide-react";
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export default function CE() {
    const { t } = useLanguage();

    const experiences = [
        {
            role: "FabLab Manager / Superviseur",
            company: "FabLab UNICA — Université Côte d'Azur",
            location: "Nice",
            period: "2023 – 2026",
            tasks: [
                "Gestion complète du FabLab : accueil, planification, supervision",
                "Formation des utilisateurs aux machines CNC, imprimantes 3D (FDM, SLA) et découpe laser",
                "Conception et réalisation de pièces sur Autodesk Fusion 360 et programmation G-code",
                "Maintenance préventive et curative de l'ensemble des équipements",
                "Encadrement de projets étudiants et accompagnement technique",
                "Formation STMicroelectronics sur carte NUCLEO-N657X0-Q",
                "Veille technologique et amélioration continue des procédés de fabrication"
            ]
        }
    ];

    const education = [
        {
            degree: "2e année Licence Électronique",
            school: "Université Côte d'Azur",
            year: "2024 – 2025",
            location: "Nice"
        },
        {
            degree: "1re année Licence Sciences et Technologies",
            school: "Université Côte d'Azur",
            year: "2023 – 2024",
            location: "Nice"
        }
    ];

    const technicalProjects = [
        {
            title: "Station Météo IoT Connectée",
            desc: "Station météo autonome avec géolocalisation GPS et synchronisation horaire. Surveillance environnementale en temps réel avec affichage OLED.",
            tags: ["ESP32-S3", "C++", "GPS", "OLED", "IoT"]
        },
        {
            title: "TrailNav GPS Companion",
            desc: "Alternative open-source aux compteurs GPS commerciaux (type Garmin Edge) pour trail et cyclisme, offrant un contrôle total sur ses données.",
            tags: ["ESP32-S3", "C++", "GPS", "IMU 6-Axes", "TFT SPI", "SD"]
        },
        {
            title: "Fall Guard — Détection de Chutes",
            desc: "Système de sécurité intelligent pour personnes isolées. Détection de chutes via analyse de mouvements et envoi d'alertes SOS géolocalisées.",
            tags: ["C++", "Accéléromètre", "GPS", "Sécurité"]
        },
        {
            title: "IA-Cam — Robot Suiveur de Visage",
            desc: "Robot capable de détecter et suivre un visage en temps réel grâce à la vision par ordinateur. Contrôle de servomoteurs pour un suivi fluide et autonome.",
            tags: ["ESP32-CAM", "Python", "OpenCV", "IoT"]
        },
        {
            title: "Stéganographie LSB sur Fichiers WAV",
            desc: "Programme en C permettant de dissimuler des données dans des fichiers audio WAV par modification des bits de poids faible (LSB).",
            tags: ["C", "Traitement du signal", "Audio"]
        }
    ];

    const academicProjects = [
        {
            title: "Robot Autonome 4WD — Contrôle Bluetooth",
            desc: "Conception et réalisation d'un robot autonome sur châssis 4WD. Implémentation du contrôle à distance via Bluetooth pour la navigation et le pilotage.",
            tags: ["Arduino", "Bluetooth", "4WD", "C++"]
        }
    ];

    const skillsByCategory = [
        { category: "Langages", items: "C/C++ · Python · VHDL · Assembleur" },
        { category: "Web", items: "HTML/CSS/JS · Next.js · React" },
        { category: "Embarqué/IoT", items: "ESP32 · Arduino · MQTT" },
        { category: "Outils", items: "Git · Linux · PlatformIO" },
        { category: "DAO/FAO", items: "Fusion 360 · G-code" },
        { category: "Bureautique", items: "Microsoft Office" }
    ];

    const qualities = [
        "Autonomie & curiosité",
        "Esprit d'équipe",
        "Adaptabilité",
        "Communication",
        "Capacités d'organisation"
    ];

    const languages = [
        { name: "Arabe", level: "Langue maternelle" },
        { name: "Français", level: "C2" },
        { name: "Anglais", level: "B2" }
    ];

    const levelsMap = { "Langue maternelle": 100, "C2": 95, "B2": 65 };

    return (
        <>
            <Head>
                <title>CV – Mehdi Mamdouh</title>
            </Head>

            <div className="min-h-screen bg-cyber-50 dark:bg-cyber-950 py-12 px-4 sm:px-6">
                <div className="max-w-5xl mx-auto bg-cyber-50 dark:bg-cyber-900 rounded-sm overflow-hidden border border-cyber-200 dark:border-cyber-800 print:shadow-none print:max-w-full print:border-none">

                    {/* Header */}
                    <div className="bg-cyber-100 dark:bg-cyber-800/50 border-b border-cyber-200 dark:border-cyber-800 p-8 text-cyber-950 dark:text-cyber-100 grid grid-cols-1 md:grid-cols-2 gap-8 print:bg-none print:text-black">
                        <div>
                            <h1 className="text-4xl font-bold font-mono tracking-tight mb-1 text-cyber-accent">Mehdi Mamdouh</h1>
                            <h2 className="text-lg font-bold text-cyber-950 dark:text-cyber-100 mb-4">Étudiant en Licence Électronique</h2>
                            <p className="text-cyber-600 dark:text-cyber-300 text-[13px] leading-relaxed mb-4 text-justify">
                                Étudiant en L2 Électronique à l'Université Côte d'Azur, passionné par les systèmes embarqués, l'IoT et le développement web. 3 ans d'expérience au FabLab UniCA en tant que Manager/Superviseur : fabrication numérique (CNC, impression 3D, découpe laser), formation des utilisateurs et maintenance des équipements. Projets personnels en robotique, vision par ordinateur et capteurs connectés.
                            </p>
                        </div>

                        <div className="flex flex-col justify-center gap-3 text-sm text-cyber-700 dark:text-cyber-300 font-mono">
                            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8">
                                <div className="space-y-3">
                                    <a href="mailto:mehdimamdouh20@gmail.com" className="flex items-center gap-2 hover:text-cyber-accent transition-colors">
                                        <Mail size={16} className="text-cyber-500" /> mehdimamdouh20@gmail.com
                                    </a>
                                    <span className="flex items-center gap-2">
                                        <MapPin size={16} className="text-cyber-500" /> 06000 Nice
                                    </span>
                                    <div className="flex items-center gap-3 pt-1">
                                        <a href="https://github.com/Mastr00" target="_blank" rel="noreferrer" className="p-2 bg-cyber-100 dark:bg-cyber-800 rounded-sm hover:text-cyber-accent transition-colors">
                                            <Github size={16} className="text-cyber-500 hover:text-cyber-accent" />
                                        </a>
                                        <a href="https://linkedin.com/in/mehdi-mamdouh" target="_blank" rel="noreferrer" className="p-2 bg-cyber-100 dark:bg-cyber-800 rounded-sm hover:text-cyber-accent transition-colors">
                                            <Linkedin size={16} className="text-cyber-500 hover:text-cyber-accent" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => window.print()}
                                className="mt-4 flex items-center justify-center gap-2 px-5 py-2.5 bg-cyber-cta text-white font-bold hover:bg-cyber-accent rounded-sm transition-colors w-full sm:w-auto self-start print:hidden"
                            >
                                <Download size={18} /> Télécharger le CV
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3">

                        {/* Sidebar */}
                        <div className="bg-cyber-50 dark:bg-cyber-900 border-r border-cyber-200 dark:border-cyber-800 text-cyber-950 dark:text-cyber-100 p-8 md:col-span-1 space-y-8 print:border-none print:bg-white print:text-black">

                            {/* Skills */}
                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-[17px] font-mono font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2 text-cyber-950 dark:text-cyber-100">
                                    <Wrench size={18} className="text-cyber-accent" /> Compétences techniques
                                </h3>
                                <div className="space-y-3">
                                    {skillsByCategory.map((skill, idx) => (
                                        <div key={idx} className="flex flex-col">
                                            <span className="text-cyber-accent font-semibold text-[13px] mb-0.5">{skill.category}</span>
                                            <span className="text-cyber-700 dark:text-cyber-300 text-[13px]">{skill.items}</span>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Qualities */}
                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-[17px] font-mono font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2 text-cyber-950 dark:text-cyber-100">
                                    <Heart size={18} className="text-cyber-accent" /> Qualités
                                </h3>
                                <ul className="space-y-1.5">
                                    {qualities.map((quality, idx) => (
                                        <li key={idx} className="flex items-center gap-2 text-cyber-700 dark:text-cyber-300 text-[13px]">
                                            <CheckCircle2 size={14} className="text-cyber-500" /> {quality}
                                        </li>
                                    ))}
                                </ul>
                            </motion.section>

                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-[17px] font-mono font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2 text-cyber-950 dark:text-cyber-100">
                                    <Zap size={18} className="text-cyber-accent" /> Matériel & Machines
                                </h3>
                                <ul className="space-y-1.5 text-cyber-700 dark:text-cyber-300 text-[13px]">
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyber-500 mt-1">●</span> CNC (Fraisage, réglage)
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyber-500 mt-1">●</span> Impression 3D (FDM, SLA)
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-cyber-500 mt-1">●</span> Découpe & Gravure Laser
                                    </li>
                                </ul>
                            </motion.section>

                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-[17px] font-mono font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2 text-cyber-950 dark:text-cyber-100">
                                    <Languages size={18} className="text-cyber-accent" /> Langues
                                </h3>
                                <ul className="space-y-2 text-[13px] text-cyber-700 dark:text-cyber-300 font-medium">
                                    {languages.map(l => (
                                        <li key={l.name} className="flex justify-between items-center pb-2 border-b border-cyber-200 dark:border-cyber-800/50 last:border-0 last:pb-0">
                                            <span className="font-semibold text-cyber-950 dark:text-cyber-100">{l.name}</span>
                                            <span className="text-cyber-500">{l.level}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.section>

                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex justify-between items-start gap-4">
                                <div>
                                    <h3 className="text-[17px] font-mono font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2 text-cyber-950 dark:text-cyber-100">
                                        <Lightbulb size={18} className="text-cyber-accent" /> Intérêts
                                    </h3>
                                    <div className="text-[13px] text-cyber-700 dark:text-cyber-300">Photographie, Cyclisme, Peinture</div>
                                </div>
                                <div className="text-right">
                                    <h3 className="text-[17px] font-mono font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center justify-end gap-2 text-cyber-950 dark:text-cyber-100">
                                        <Car size={18} className="text-cyber-accent" /> Permis
                                    </h3>
                                    <div className="text-[13px] text-cyber-700 dark:text-cyber-300 mr-1">Permis B</div>
                                </div>
                            </motion.section>
                        </div>

                        {/* Main Content (Right) */}
                        <div className="p-8 lg:col-span-2 space-y-12 bg-cyber-50 dark:bg-cyber-900 print:bg-white print:text-black border-t lg:border-t-0 border-cyber-200 dark:border-cyber-800">

                            {/* Experience */}
                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h2 className="text-[22px] font-mono font-bold text-cyber-accent mb-8 pb-2 flex items-center gap-2 border-b border-cyber-200 dark:border-cyber-800">
                                    <Briefcase size={22} className="text-cyber-accent" /> Expérience Professionnelle
                                </h2>
                                <div className="border-l-2 border-cyber-200 dark:border-cyber-800 ml-2.5 pl-8 space-y-10 relative">
                                    {experiences.map((exp, i) => (
                                        <div key={i} className="relative">
                                            <span className="absolute -left-[37.5px] top-1.5 w-[10px] h-[10px] bg-cyber-accent rounded-full border-2 border-cyber-50 dark:border-cyber-900 box-content"></span>
                                            <h3 className="text-[17px] font-bold text-cyber-950 dark:text-cyber-100">{exp.role}</h3>
                                            <div className="text-cyber-accent text-sm font-semibold mt-0.5 mb-2">
                                                {exp.company} <span className="text-cyber-400 font-normal">| {exp.location}</span>
                                            </div>
                                            <span className="inline-block px-2.5 py-0.5 border border-cyber-200 dark:border-cyber-700 bg-cyber-100 dark:bg-cyber-800 text-cyber-500 text-[11px] rounded-[3px] mb-3 font-mono font-semibold">
                                                {exp.period}
                                            </span>
                                            <ul className="list-disc list-inside text-cyber-500 dark:text-cyber-300 text-[13px] space-y-1.5 leading-relaxed">
                                                {exp.tasks.map((task, j) => (
                                                    <li key={j} className="marker:text-cyber-accent">{task}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Education */}
                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h2 className="text-[22px] font-mono font-bold text-cyber-accent mb-8 pb-2 flex items-center gap-2 border-b border-cyber-200 dark:border-cyber-800">
                                    <GraduationCap size={22} className="text-cyber-accent" /> Formation
                                </h2>
                                <div className="border-l-2 border-cyber-200 dark:border-cyber-800 ml-2.5 pl-8 space-y-8 relative">
                                    {education.map((edu, i) => (
                                        <div key={i} className="relative">
                                            <span className="absolute -left-[37.5px] top-1.5 w-[10px] h-[10px] bg-cyber-accent rounded-full border-2 border-cyber-50 dark:border-cyber-900 box-content"></span>
                                            <h3 className="text-[17px] font-bold text-cyber-950 dark:text-cyber-100">{edu.degree}</h3>
                                            <p className="text-cyber-500 dark:text-cyber-300 text-[13px] mt-0.5 mb-2">{edu.school} — {edu.location}</p>
                                            <span className="inline-block px-2.5 py-0.5 border border-cyber-200 dark:border-cyber-700 bg-cyber-100 dark:bg-cyber-800 text-cyber-accent text-[11px] rounded-[3px] font-mono font-bold">
                                                {edu.year}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Projets techniques */}
                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h2 className="text-[22px] font-mono font-bold text-cyber-accent mb-8 pb-2 flex items-center gap-2 border-b border-cyber-200 dark:border-cyber-800">
                                    <Server size={22} className="text-cyber-accent" /> Projets techniques
                                </h2>
                                <div className="border-l-2 border-cyber-200 dark:border-cyber-800 ml-2.5 pl-8 space-y-8 relative">
                                    {technicalProjects.map((proj, i) => (
                                        <div key={i} className="relative">
                                            <span className="absolute -left-[37.5px] top-1.5 w-[10px] h-[10px] bg-cyber-accent rounded-full border-2 border-cyber-50 dark:border-cyber-900 box-content"></span>
                                            <h3 className="text-[17px] font-bold text-cyber-950 dark:text-cyber-100 mb-2">{proj.title}</h3>
                                            <p className="text-cyber-600 dark:text-cyber-300 text-[13px] leading-relaxed mb-3">
                                                {proj.desc}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {proj.tags.map((tag, j) => (
                                                    <span key={j} className="px-2 py-0.5 bg-cyber-100 dark:bg-cyber-800 text-cyber-500 border border-cyber-200 dark:border-cyber-700 rounded-[3px] text-[11px] font-semibold">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>

                            {/* Projets académiques */}
                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h2 className="text-[22px] font-mono font-bold text-cyber-accent mb-8 pb-2 flex items-center gap-2 border-b border-cyber-200 dark:border-cyber-800">
                                    <Code2 size={22} className="text-cyber-accent" /> Projets académiques
                                </h2>
                                <div className="border-l-2 border-cyber-200 dark:border-cyber-800 ml-2.5 pl-8 space-y-8 relative">
                                    {academicProjects.map((proj, i) => (
                                        <div key={i} className="relative">
                                            <span className="absolute -left-[37.5px] top-1.5 w-[10px] h-[10px] bg-cyber-accent rounded-full border-2 border-cyber-50 dark:border-cyber-900 box-content"></span>
                                            <h3 className="text-[17px] font-bold text-cyber-950 dark:text-cyber-100 mb-2">{proj.title}</h3>
                                            <p className="text-cyber-600 dark:text-cyber-300 text-[13px] leading-relaxed mb-3">
                                                {proj.desc}
                                            </p>
                                            <div className="flex flex-wrap gap-1.5">
                                                {proj.tags.map((tag, j) => (
                                                    <span key={j} className="px-2 py-0.5 bg-cyber-100 dark:bg-cyber-800 text-cyber-500 border border-cyber-200 dark:border-cyber-700 rounded-[3px] text-[11px] font-semibold">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.section>
                            
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
