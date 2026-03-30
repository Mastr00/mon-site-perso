import Head from "next/head";
import { Download, Briefcase, GraduationCap, Wrench, Languages, Car, Heart, Calendar, Zap, Github, Linkedin, Code2, Cpu, Cog, FileCode, Monitor, Globe } from "lucide-react";
import { useLanguage } from '../context/LanguageContext';

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

    const levelColor = (level) => {
        if (level === 'Expert') return 'text-cyber-accent bg-cyber-accent/10 border-cyber-accent/30';
        if (level === 'Avancé') return 'text-cyber-500 bg-cyber-500/10 border-cyber-500/30';
        return 'text-cyber-500 bg-cyber-500/10 border-cyber-500/30';
    };

    return (
        <>
            <Head>
                <title>CV – Mehdi Mamdouh</title>
            </Head>

            <div className="min-h-screen bg-cyber-50 dark:bg-cyber-950 py-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto bg-cyber-50 dark:bg-cyber-900 shadow-[0_0_15px_rgba(56,189,248,0.2)] rounded-2xl overflow-hidden border border-cyber-500/20 print:shadow-none print:max-w-full print:border-none">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-cyber-500 to-cyber-500 p-8 text-cyber-950 dark:text-cyber-100 flex flex-col md:flex-row justify-between items-center gap-6 print:bg-none print:text-black">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold mb-2">Mehdi Mamdouh</h1>
                            <p className="text-violet-100 flex items-center gap-2 justify-center md:justify-start">
                                <Calendar size={18} />
                                {t.cv.born} 28/06/2005
                            </p>
                            <p className="text-violet-100 mt-1">{t.cv.studentDesc}</p>
                        </div>

                        <div className="flex items-center gap-3">
                            {/* Social buttons */}
                            <a
                                href="https://github.com/Mastr00"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 bg-cyber-50/20 hover:bg-cyber-50/30 backdrop-blur rounded-full transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href="https://www.linkedin.com/in/mehdi-mamdouh-8493162b3/"
                                target="_blank"
                                rel="noreferrer"
                                className="p-2.5 bg-cyber-50/20 hover:bg-cyber-50/30 backdrop-blur rounded-full transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <button
                                onClick={() => window.print()}
                                className="flex items-center gap-2 px-5 py-2 bg-cyber-50/20 hover:bg-cyber-50/30 backdrop-blur rounded-full transition-all hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] print:hidden"
                            >
                                <Download size={18} />
                                <span className="text-sm font-medium">{t.cv.download}</span>
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3">

                        {/* Sidebar */}
                        <div className="bg-cyber-50 dark:bg-cyber-900 text-cyber-950 dark:text-cyber-100 p-8 md:col-span-1 space-y-8 print:bg-gray-200 print:text-black">

                            {/* Skills with icons and written levels */}
                            <section>
                                <h3 className="text-xl font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2">
                                    <Wrench size={20} className="text-cyber-accent" /> {t.cv.skills}
                                </h3>
                                <div className="space-y-3">
                                    {skills.map(s => {
                                        const Icon = s.icon;
                                        return (
                                            <div key={s.name} className="flex items-center justify-between p-3 bg-cyber-100 dark:bg-cyber-800 rounded-xl border border-cyber-500/10 hover:border-cyber-500/30 transition-colors">
                                                <div className="flex items-center gap-3">
                                                    <div className="p-1.5 bg-cyber-500/15 rounded-lg">
                                                        <Icon size={16} className="text-cyber-500" />
                                                    </div>
                                                    <span className="font-medium text-sm">{s.name}</span>
                                                </div>
                                                <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${levelColor(s.level)}`}>
                                                    {s.level}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>

                            {/* Machines & Hardware */}
                            <section>
                                <h3 className="text-xl font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2">
                                    <Zap size={20} className="text-cyber-accent" /> {t.cv.machines}
                                </h3>
                                <div className="p-4 bg-cyber-100 dark:bg-cyber-800 rounded-lg border border-cyber-500/10 print:bg-gray-300 print:text-black">
                                    <p className="text-sm leading-relaxed text-cyber-700 dark:text-cyber-100 print:text-black">
                                        <span className="text-cyber-accent font-bold block mb-1">{t.cv.machinesTitle}</span>
                                        {t.cv.machinesDesc}
                                        <ul className="list-disc list-inside mt-1 ml-1 space-y-0.5">
                                            <li><strong>CNC</strong> (Fraisage, réglage, maintenance)</li>
                                            <li><strong>Impression 3D</strong> (FDM, SLA, Maintenance)</li>
                                            <li><strong>Découpe & Gravure Laser</strong></li>
                                        </ul>
                                    </p>
                                </div>
                            </section>

                            {/* Languages */}
                            <section>
                                <h3 className="text-xl font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2">
                                    <Languages size={20} className="text-cyber-accent" /> {t.cv.languages}
                                </h3>
                                <ul className="space-y-2 text-sm text-cyber-700 dark:text-cyber-100 print:text-black">
                                    {languages.map(l => (
                                        <li key={l.name} className="flex justify-between items-center p-2 bg-cyber-100 dark:bg-cyber-800/50 rounded-lg">
                                            <span className="font-semibold">{l.name}</span>
                                            <span className="text-cyber-accent/80 text-xs font-medium">{l.level}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Interests */}
                            <section>
                                <h3 className="text-xl font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2">
                                    <Heart size={20} className="text-neon-pink" /> {t.cv.interests}
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Photographie", "Peinture", "Cyclisme"].map(i => (
                                        <span key={i} className="px-3 py-1 bg-cyber-500/15 text-cyber-500 border border-cyber-500/30 rounded-lg text-xs font-semibold print:border-black print:text-black">
                                            {i}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold border-b-2 border-cyber-accent pb-2 mb-4 flex items-center gap-2">
                                    <Car size={20} className="text-cyber-accent" /> {t.cv.license}
                                </h3>
                                <p className="text-cyber-700 dark:text-cyber-100 print:text-black">Permis B</p>
                            </section>
                        </div>

                        {/* Main Content (Right) */}
                        <div className="p-8 md:col-span-2 space-y-10 bg-cyber-50 dark:bg-cyber-900 text-cyber-50">

                            {/* Experience */}
                            <section>
                                <h2 className="text-2xl font-bold text-cyber-950 dark:text-cyber-100 mb-6 border-b border-cyber-500/20 pb-2 flex items-center gap-2">
                                    <Briefcase className="text-cyber-500" /> {t.cv.experience}
                                </h2>
                                <div className="space-y-8 border-l-2 border-cyber-500/30 ml-3 pl-8 relative">
                                    {experiences.map((exp, i) => (
                                        <div key={i} className="relative">
                                            <span className="absolute -left-[41px] top-1 w-5 h-5 bg-gradient-to-r from-cyber-500 to-cyber-500 rounded-full border-4 border-cyber-900 shadow-[0_0_15px_rgba(56,189,248,0.2)]"></span>
                                            <h3 className="text-lg font-bold text-cyber-950 dark:text-cyber-100">{exp.role}</h3>
                                            <div className="text-cyber-500 font-medium mb-2">
                                                {exp.company} | <span className="text-sm text-cyber-500 dark:text-cyber-400">{exp.location}</span>
                                            </div>
                                            <span className="inline-block px-3 py-1 bg-cyber-500/15 text-cyber-500 text-xs rounded-lg mb-3 font-semibold border border-cyber-500/20">
                                                {exp.period}
                                            </span>
                                            <ul className="list-disc list-inside text-cyber-500 dark:text-cyber-400 space-y-1 text-sm">
                                                {exp.tasks.map((task, j) => (
                                                    <li key={j}>{task}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Education */}
                            <section>
                                <h2 className="text-2xl font-bold text-cyber-950 dark:text-cyber-100 mb-6 border-b border-cyber-500/20 pb-2 flex items-center gap-2">
                                    <GraduationCap className="text-cyber-accent" /> {t.cv.education}
                                </h2>
                                <div className="space-y-6">
                                    {education.map((edu, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 p-4 bg-cyber-100 dark:bg-cyber-800/50 rounded-xl border border-cyber-500/10 hover:border-cyber-500/30 transition-colors">
                                            <div>
                                                <h3 className="font-bold text-cyber-950 dark:text-cyber-100">{edu.school}</h3>
                                                <p className="text-cyber-500 dark:text-cyber-400">{edu.degree}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-cyber-accent font-bold block">{edu.year}</span>
                                                <span className="text-xs text-cyber-500">{edu.location}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
