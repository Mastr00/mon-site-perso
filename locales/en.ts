import type { Translations } from '../types';

export const en: Translations = {
  // Navigation
  nav: {
    home: 'Home',
    portfolio: 'Portfolio',
    cv: 'Resume',
    blog: 'Blog',
    contact: 'Contact',
    dashboard: 'Dashboard',
    login: 'Login',
    logout: 'Logout',
  },
  // Home Page
  home: {
    heroTitle: 'Hi, I am',
    role1: 'electronics',
    role2: 'cybersecurity',
    studentIn: 'Student in',
    passion: 'Passionate about',
    iot: 'IoT',
    embedded: 'embedded systems',
    modernWeb: 'modern web',
    heroBtn: 'View My Projects',
    contactBtn: 'Contact Me',
    skillsTitle: 'Technologies & Tools',
  },
  // Portfolio
  portfolio: {
    title: 'My Portfolio',
    subtitle: 'A collection of my projects in IoT, Embedded Systems, and Web.',
    filterAll: 'All',
    viewProject: 'View Project',
    sourceCode: 'Source Code',
    madeWith: 'Made with:',
    idea: 'The Core Idea',
    challenges: 'The Challenges',
    solution: 'Our Solution',
    hardware: 'Hardware & Technologies',
    back: 'Back to Portfolio',
    notFound: 'Project not found',
    demo: 'Presentation / Demo',
  },
  // Contact
  contact: {
    title: "Let's discuss your project",
    subtitle:
      'Open to professional opportunities and technical collaborations. Please feel free to reach out via the form below to discuss your needs.',
    nameLabel: 'Full Name',
    namePlaceholder: 'Your name',
    nameRequired: 'Name is required.',
    emailLabel: 'Email Address',
    emailInvalid: 'Invalid email address.',
    subjectLabel: 'Subject',
    subjectPlaceholder: 'What is this about?',
    subjectRequired: 'Subject is required.',
    messageLabel: 'Your Message',
    messagePlaceholder: 'Describe your project or ask a question...',
    messageRequired: 'Message is required.',
    sendBtn: 'Send Message',
    sending: 'Sending...',
    successTitle: 'Message Sent!',
    successText: 'Thanks for contacting me. I will reply as soon as possible.',
    backHome: 'Back to Home',
    error: 'An error occurred. Please try again.',
  },
  // CV
  cv: {
    download: 'Download Resume',
    born: 'Born on',
    studentDesc: 'Electronics Student & Tech Enthusiast',
    subtitle: 'Electronic Engineering Student',
    bio: "2nd year Electronic Engineering student at Université Côte d'Azur, passionate about embedded systems, IoT and web development. 3 years of experience at FabLab UniCA as Manager/Supervisor: digital fabrication (CNC, 3D printing, laser cutting), user training and equipment maintenance. Personal projects in robotics, computer vision and connected sensors.",
    skills: 'Technical Skills',
    languages: 'Languages',
    interests: 'Interests',
    interestsList: 'Photography, Cycling, Painting',
    license: 'License',
    licenseType: 'Class B',
    experience: 'Professional Experience',
    education: 'Education',
    machines: 'Hardware & Machines',
    machinesTitle: 'Digital Manufacturing Expertise:',
    machinesDesc: 'Complete mastery of manufacturing processes:',
    qualities: 'Qualities',
    technicalProjects: 'Technical Projects',
    academicProjects: 'Academic Projects',
    machinesList: [
      'CNC (Milling, calibration)',
      '3D Printing (FDM, SLA)',
      'Laser Cutting & Engraving',
    ],
    qualitiesList: [
      'Autonomy & curiosity',
      'Team spirit',
      'Adaptability',
      'Communication',
      'Organizational skills',
    ],
    skillCategories: [
      { category: 'Languages', items: 'C/C++ · Python · VHDL · Assembly' },
      { category: 'Web', items: 'HTML/CSS/JS · Next.js · React' },
      { category: 'Embedded/IoT', items: 'ESP32 · Arduino · MQTT' },
      { category: 'Tools', items: 'Git · Linux · PlatformIO' },
      { category: 'CAD/CAM', items: 'Fusion 360 · G-code' },
      { category: 'Office', items: 'Microsoft Office' },
    ],
    languagesList: [
      { name: 'Arabic', level: 'Native' },
      { name: 'French', level: 'C2' },
      { name: 'English', level: 'B2' },
    ],
    experiences: [
      {
        role: 'FabLab Manager / Supervisor',
        company: "FabLab UNICA — Université Côte d'Azur",
        location: 'Nice',
        period: '2023 – 2026',
        tasks: [
          'Full FabLab management: reception, planning, supervision',
          'Training users on CNC machines, 3D printers (FDM, SLA) and laser cutters',
          'Designing and manufacturing parts with Autodesk Fusion 360 and G-code',
          'Preventive and corrective maintenance of all equipment',
          'Mentoring student projects and technical support',
          'STMicroelectronics training on NUCLEO-N657X0-Q board',
          'Technology watch and continuous process improvement',
        ],
      },
    ],
    educationList: [
      {
        degree: '2nd Year — BSc Electronic Engineering',
        school: "Université Côte d'Azur",
        year: '2024 – 2025',
        location: 'Nice',
      },
      {
        degree: '1st Year — BSc Science & Technology',
        school: "Université Côte d'Azur",
        year: '2023 – 2024',
        location: 'Nice',
      },
    ],
    technicalProjectsList: [
      {
        title: 'IoT Connected Weather Station',
        desc: 'Autonomous weather station with GPS geolocation and time synchronization. Real-time environmental monitoring with OLED display.',
        tags: ['ESP32-S3', 'C++', 'GPS', 'OLED', 'IoT'],
      },
      {
        title: 'TrailNav GPS Companion',
        desc: 'Open-source alternative to commercial GPS computers (like Garmin Edge) for trail running and cycling, giving total control over data.',
        tags: ['ESP32-S3', 'C++', 'GPS', '6-Axis IMU', 'TFT SPI', 'SD'],
      },
      {
        title: 'Fall Guard — Fall Detection',
        desc: 'Smart safety system for isolated individuals. Fall detection through motion analysis and geolocated SOS alerts.',
        tags: ['C++', 'Accelerometer', 'GPS', 'Safety'],
      },
      {
        title: 'IA-Cam — Face Tracking Robot',
        desc: 'Robot capable of detecting and tracking a face in real-time using computer vision. Servomotor control for smooth and autonomous tracking.',
        tags: ['ESP32-CAM', 'Python', 'OpenCV', 'IoT'],
      },
      {
        title: 'LSB Steganography on WAV Files',
        desc: 'C program for hiding data within WAV audio files using Least Significant Bit (LSB) modification.',
        tags: ['C', 'Signal Processing', 'Audio'],
      },
    ],
    academicProjectsList: [
      {
        title: '4WD Autonomous Robot — Bluetooth Control',
        desc: 'Design and assembly of an autonomous robot on a 4WD chassis. Implementation of remote Bluetooth control for navigation and driving.',
        tags: ['Arduino', 'Bluetooth', '4WD', 'C++'],
      },
    ],
  },
  // Footer
  footer: {
    rights: 'All rights reserved.',
    by: 'by',
    easterEggTitle: 'Well done!',
    easterEggText: 'You found the secret easter egg! Curious mind, I like that. 😎',
    easterEggClose: 'Click anywhere to close',
  },
  // 404
  notFound: {
    title: 'Page not found',
    subtitle: "The page you're looking for doesn't exist or has been moved.",
    backHome: 'Back to Home',
  },
  // Dashboard
  dashboard: {
    greeting: 'Hello,',
    subtitle: "Here's your personal dashboard.",
  },
  // Common
  loading: 'Loading...',
  error: 'An error occurred',
};
