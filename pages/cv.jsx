import Head from "next/head";
import { Download, Briefcase, GraduationCap, Wrench, Languages, Car, Heart, Calendar, Zap, Github, Linkedin, Code2, Cpu, Cog, FileCode, Monitor, Globe } from "lucide-react";
import { useLanguage } from '../context/LanguageContext';
import { motion } from 'framer-motion';

export default function CE() {
    const { t } = useLanguage();

    const experiences = [
        {
            role: "Night Room Service",
            company: "HOTEL MARTINEZ",
            location: "Cannes",
            period: "2024 - 2025",
            tasks: [
                "Préparer et livrer les commandes clients avec rapidité et courtoisie",
                "Gérer les demandes spéciales ou allergies des clients",
                "Respecter les normes de sécurité et d'hygiène en vigueur"
            ]
        },
        {
            role: "FabLab Manager / Superviseur",
            company: "UNICA",
            location: "Nice",
            period: "2023 - 2025",
            tasks: [
                "Former les utilisateurs à l'utilisation des machines et outils (CNC, Imprimantes 3D)",
                "Gérer l'entretien et la maintenance des équipements du FabLab",
                "Assurer la sécurité et la conformité des espaces de travail"
            ]
        },
        {
            role: "Accueil des clients",
            company: "K.T.I. VOYAGES",
            location: "Casablanca ; Marrakech",
            period: "2022 - 2022",
            tasks: [
                "Accueil des clients à l'aéroport de Casablanca et Marrakech",
                "Accompagnement et assistance logistique (hôtels, transports)",
                "Planification des guides et moyens de transports"
            ]
        },
        {
            role: "Commercial et vendeur",
            company: "GRAND COMPTOIR",
            location: "Tanger",
            period: "2022 - 2022",
            tasks: [
                "Réception de marchandises",
                "Relation avec les fournisseurs/clients et gestion des stocks"
            ]
        }
    ];

    const education = [
        {
            degree: "Deuxième année en licence en électronique",
            school: "UNIVERSITÉ CÔTE D'AZUR",
            year: "2025",
            location: "Nice"
        },
        {
            degree: "Première année en licence sciences et technologies",
            school: "UNIVERSITÉ CÔTE D'AZUR",
            year: "2024",
            location: "Nice"
        },
        {
            degree: "Baccalauréat en sciences physiques",
            school: "Lycée",
            year: "2023",
            location: "Maroc"
        }
    ];

    const skills = [
        { name: "C / C++", level: "Avancé", icon: Code2 },
        { name: "Python", level: "Avancé", icon: FileCode },
        { name: "Autodesk Fusion 360", level: "Expert", icon: Cog },
        { name: "Programmation G-code", level: "Expert", icon: Cpu },
        { name: "Microsoft Office", level: "Expert", icon: Monitor },
        { name: "HTML/CSS/JS", level: "Intermédiaire", icon: Globe },
    ];

    const languages = [
        { name: "Arabe", level: "Langue maternelle" },
        { name: "Français", level: "Courant" },
        { name: "Anglais", level: "Intermédiaire" }
    ];

    const levelsMap = { "Débutant": 25, "Intermédiaire": 50, "Avancé": 75, "Expert": 95, "Langue maternelle": 100, "Courant": 85 };

    return (
        <>
            <Head>
                <title>CV – Mehdi Mamdouh</title>
            </Head>

            <div className="min-h-screen bg-cyber-50 dark:bg-cyber-950 py-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto bg-cyber-50 dark:bg-cyber-900 rounded-sm overflow-hidden border border-cyber-200 dark:border-cyber-800 print:shadow-none print:max-w-full print:border-none">

                    {/* Header */}
                    <div className="bg-cyber-100 dark:bg-cyber-800/50 border-b border-cyber-200 dark:border-cyber-800 p-8 text-cyber-950 dark:text-cyber-100 flex flex-col md:flex-row justify-between items-center gap-6 print:bg-none print:text-black">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold font-mono tracking-tight mb-2 text-cyber-accent">Mehdi Mamdouh</h1>
                            <p className="text-cyber-500 dark:text-cyber-400 flex items-center gap-2 justify-center md:justify-start">
                                <Calendar size={18} />
                                {t.cv.born} 28/06/2005
                            </p>
                            <p className="text-cyber-500 dark:text-cyber-400 mt-1">{t.cv.studentDesc}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            <a
                                href="https://github.com/Mastr00"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 bg-cyber-200 dark:bg-cyber-800 text-cyber-500 hover:text-cyber-accent hover:bg-cyber-200 dark:hover:bg-cyber-800 rounded-full transition-colors print:hidden"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mehdi-mamdouh-8493162b3/"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 bg-cyber-200 dark:bg-cyber-800 text-cyber-500 hover:text-cyber-accent hover:bg-cyber-200 dark:hover:bg-cyber-800 rounded-full transition-colors print:hidden"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <button
                                onClick={() => window.print()}
                                className="flex items-center gap-2 px-5 py-2 bg-cyber-cta text-white hover:bg-cyber-accent rounded-sm transition-colors print:hidden"
                            >
                                <Download size={18} />
                                <span className="text-sm font-medium">{t.cv.download}</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3">

                        {/* Sidebar */}
                        <div className="bg-cyber-50 dark:bg-cyber-900 border-r border-cyber-200 dark:border-cyber-800 text-cyber-950 dark:text-cyber-100 p-8 md:col-span-1 space-y-8 print:border-none print:bg-white print:text-black">

                            {/* Skills */}
                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-lg font-mono font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2 text-cyber-950 dark:text-cyber-100">
                                    <Wrench size={18} className="text-cyber-accent" /> {t.cv.skills}
                                </h3>
                                <div className="space-y-4">
                                    {skills.map(s => {
                                        const Icon = s.icon;
                                        return (
                                            <div key={s.name} className="flex flex-col">
                                                <div className="flex items-center justify-between mb-1.5">
                                                    <div className="flex items-center gap-2">
                                                        <Icon size={14} className="text-cyber-500" />
                                                        <span className="font-semibold text-[13px]">{s.name}</span>
                                                    </div>
                                                    <span className="text-[11px] font-bold text-cyber-400">{s.level}</span>
                                                </div>
                                                <div className="w-full h-[6px] bg-cyber-200 dark:bg-cyber-800 rounded-[3px] overflow-hidden">
                                                    <motion.div
                                                        className="h-full bg-cyber-accent"
                                                        initial={{ width: 0 }}
                                                        whileInView={{ width: `${levelsMap[s.level] || 50}%` }}
                                                        viewport={{ once: true }}
                                                        transition={{ duration: 1, ease: "easeOut" }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </motion.section>

                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-lg font-mono font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2 text-cyber-950 dark:text-cyber-100">
                                    <Zap size={18} className="text-cyber-accent" /> {t.cv.machines}
                                </h3>
                                <div className="text-sm leading-relaxed text-cyber-500 dark:text-cyber-400">
                                    <span className="block mb-1 text-cyber-accent font-semibold">{t.cv.machinesTitle}</span>
                                    {t.cv.machinesDesc}
                                    <ul className="list-disc list-inside mt-2 ml-1 space-y-1 text-[13px]">
                                        <li><strong>CNC</strong></li>
                                        <li><strong>Impression 3D</strong> (FDM, SLA)</li>
                                        <li><strong>Laser</strong></li>
                                    </ul>
                                </div>
                            </motion.section>

                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h3 className="text-lg font-mono font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2 text-cyber-950 dark:text-cyber-100">
                                    <Languages size={18} className="text-cyber-accent" /> {t.cv.languages}
                                </h3>
                                <ul className="space-y-4 text-sm text-cyber-700 dark:text-cyber-100">
                                    {languages.map(l => (
                                        <li key={l.name} className="flex flex-col">
                                            <div className="flex justify-between items-center mb-1.5">
                                                <span className="font-semibold text-[13px]">{l.name}</span>
                                                <span className="text-[11px] font-bold text-cyber-400">{l.level}</span>
                                            </div>
                                            <div className="w-full h-[6px] bg-cyber-200 dark:bg-cyber-800 rounded-[3px] overflow-hidden">
                                                <motion.div
                                                    className="h-full bg-cyber-accent"
                                                    initial={{ width: 0 }}
                                                    whileInView={{ width: `${levelsMap[l.level] || 50}%` }}
                                                    viewport={{ once: true }}
                                                    transition={{ duration: 1, ease: "easeOut" }}
                                                />
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </motion.section>
                        </div>

                        {/* Main Content (Right) */}
                        <div className="p-8 md:col-span-2 space-y-12 bg-cyber-50 dark:bg-cyber-900 print:bg-white print:text-black">

                            {/* Experience */}
                            <motion.section initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                                <h2 className="text-2xl font-mono font-bold text-cyber-accent mb-8 pb-2 flex items-center gap-2">
                                    <Briefcase size={22} className="text-cyber-accent" /> {t.cv.experience}
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
                                            <ul className="list-disc list-inside text-cyber-500 dark:text-cyber-400 text-[13px] space-y-1.5 leading-relaxed">
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
                                <h2 className="text-2xl font-mono font-bold text-cyber-accent mb-8 pb-2 flex items-center gap-2">
                                    <GraduationCap size={22} className="text-cyber-accent" /> {t.cv.education}
                                </h2>
                                <div className="border-l-2 border-cyber-200 dark:border-cyber-800 ml-2.5 pl-8 space-y-8 relative">
                                    {education.map((edu, i) => (
                                        <div key={i} className="relative">
                                            <span className="absolute -left-[37.5px] top-1.5 w-[10px] h-[10px] bg-cyber-accent rounded-full border-2 border-cyber-50 dark:border-cyber-900 box-content"></span>
                                            <h3 className="text-[17px] font-bold text-cyber-950 dark:text-cyber-100">{edu.school}</h3>
                                            <p className="text-cyber-500 dark:text-cyber-400 text-sm mt-0.5 mb-2">{edu.degree}</p>
                                            <div className="flex gap-2 items-center">
                                                <span className="inline-block px-2.5 py-0.5 border border-cyber-200 dark:border-cyber-700 bg-cyber-100 dark:bg-cyber-800 text-cyber-accent text-[11px] rounded-[3px] font-mono font-bold">
                                                    {edu.year}
                                                </span>
                                                <span className="text-xs text-cyber-400">{edu.location}</span>
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
