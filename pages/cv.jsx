import Head from "next/head";
import { Download, Briefcase, GraduationCap, Wrench, Languages, Car, Heart, Calendar } from "lucide-react";

export default function CE() { // CV - Curriculum Vitae
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
            year: "2023", // Estimated based on path
            location: "Maroc"
        }
    ];

    const skills = [
        { name: "C / C++", level: 80 },
        { name: "Python", level: 75 },
        { name: "Autodesk Fusion 360", level: 85 },
        { name: "CNC / Gcode", level: 90 },
        { name: "Microsoft Office", level: 90 },
        { name: "HTML/CSS/JS", level: 70 },
    ];

    const languages = [
        { name: "Arabe", level: "Langue maternelle" },
        { name: "Français", level: "Courant" },
        { name: "Anglais", level: "Intermédiaire" }
    ];

    return (
        <>
            <Head>
                <title>CV – Mehdi Mamdouh</title>
            </Head>

            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden print:shadow-none print:max-w-full">

                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-white flex flex-col md:flex-row justify-between items-center gap-6 print:bg-none print:text-black">
                        <div className="text-center md:text-left">
                            <h1 className="text-4xl font-bold mb-2">Mehdi Mamdouh</h1>
                            <p className="text-indigo-100 flex items-center gap-2 justify-center md:justify-start">
                                <Calendar size={18} />
                                Né le 28/06/2005
                            </p>
                            <p className="text-indigo-100 mt-1">Étudiant en Électronique & Passionné Tech</p>
                        </div>

                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 px-6 py-2 bg-white/20 hover:bg-white/30 backdrop-blur rounded-full transition-all print:hidden"
                        >
                            <Download size={20} />
                            <span>Télécharger PDF</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3">

                        {/* Sidebar (Left) */}
                        <div className="bg-gray-900 text-white p-8 md:col-span-1 space-y-8 print:bg-gray-200 print:text-black">

                            {/* Skills */}
                            <section>
                                <h3 className="text-xl font-bold border-b-2 border-indigo-500 pb-2 mb-4 flex items-center gap-2">
                                    <Wrench size={20} className="text-indigo-400" /> Compétences
                                </h3>
                                <div className="space-y-4">
                                    {skills.map(s => (
                                        <div key={s.name}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{s.name}</span>
                                                <span className="text-gray-400 print:text-gray-600">{s.level}%</span>
                                            </div>
                                            <div className="w-full bg-gray-700 rounded-full h-2 print:bg-gray-400">
                                                <div
                                                    className="bg-indigo-500 h-2 rounded-full"
                                                    style={{ width: `${s.level}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>

                            {/* Languages */}
                            <section>
                                <h3 className="text-xl font-bold border-b-2 border-indigo-500 pb-2 mb-4 flex items-center gap-2">
                                    <Languages size={20} className="text-indigo-400" /> Langues
                                </h3>
                                <ul className="space-y-2 text-sm text-gray-300 print:text-black">
                                    {languages.map(l => (
                                        <li key={l.name} className="flex justify-between">
                                            <span className="font-semibold">{l.name}</span>
                                            <span className="opacity-80">{l.level}</span>
                                        </li>
                                    ))}
                                </ul>
                            </section>

                            {/* Interests & Others */}
                            <section>
                                <h3 className="text-xl font-bold border-b-2 border-indigo-500 pb-2 mb-4 flex items-center gap-2">
                                    <Heart size={20} className="text-indigo-400" /> Intérêts
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {["Photographie", "Peinture", "Cyclisme"].map(i => (
                                        <span key={i} className="px-2 py-1 bg-gray-800 rounded text-xs print:border print:border-black">
                                            {i}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xl font-bold border-b-2 border-indigo-500 pb-2 mb-4 flex items-center gap-2">
                                    <Car size={20} className="text-indigo-400" /> Permis
                                </h3>
                                <p className="text-gray-300 print:text-black">Permis B</p>
                            </section>

                        </div>

                        {/* Main Content (Right) */}
                        <div className="p-8 md:col-span-2 space-y-10 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">

                            {/* Experience */}
                            <section>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2 flex items-center gap-2">
                                    <Briefcase className="text-indigo-600 dark:text-indigo-400" /> Expériences Professionnelles
                                </h2>
                                <div className="space-y-8 border-l-2 border-indigo-100 dark:border-gray-700 ml-3 pl-8 relative">
                                    {experiences.map((exp, i) => (
                                        <div key={i} className="relative">
                                            <span className="absolute -left-[41px] top-1 w-5 h-5 bg-indigo-600 rounded-full border-4 border-white dark:border-gray-800"></span>
                                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                                            <div className="text-indigo-600 dark:text-indigo-400 font-medium mb-2">
                                                {exp.company} | <span className="text-sm text-gray-500 dark:text-gray-400">{exp.location}</span>
                                            </div>
                                            <span className="inline-block px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded mb-3 text-gray-600 dark:text-gray-300">
                                                {exp.period}
                                            </span>
                                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-1 text-sm">
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
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 border-b pb-2 flex items-center gap-2">
                                    <GraduationCap className="text-indigo-600 dark:text-indigo-400" /> Éducation
                                </h2>
                                <div className="space-y-6">
                                    {education.map((edu, i) => (
                                        <div key={i} className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                                            <div>
                                                <h3 className="font-bold text-gray-900 dark:text-white">{edu.school}</h3>
                                                <p className="text-gray-700 dark:text-gray-300">{edu.degree}</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-indigo-600 dark:text-indigo-400 font-bold block">{edu.year}</span>
                                                <span className="text-xs text-gray-500">{edu.location}</span>
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
