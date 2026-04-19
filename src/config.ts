export const siteConfig = {
  name: "Obaidullah Arshad",
  siteUrl: "https://obaidullaharshad.vercel.app", // TODO: update when you have a custom domain
  title: "Shopify Hydrogen & Full Stack Developer",
  heroTagline: "I build storefronts that convert and apps that ship.",
  description:
    "Shopify Hydrogen specialist and full-stack developer based in Islamabad, Pakistan. I build headless storefronts that perform, full-stack web apps that ship, and mobile experiences that stick.",
  resume: "/My Resume.pdf",
  accentColor: "#7c3aed",
  availability: "Available for freelance & open to full-time",
  social: {
    email: "obaidullaharshad101@gmail.com",
    linkedin: "https://linkedin.com/in/obaid-ullah-arshad-344273221",
    twitter: "",
    github: "https://github.com/Spectre03",
  },
  aboutMe:
    "SE student at Riphah, freelancing since my second year. I've built across a lot of ground: Shopify Hydrogen storefronts, full-stack apps in .NET, PHP, and MERN, and mobile with Flutter. The stack changes with the project, the standard doesn't. I care about ownership — understanding what the product actually needs and making sure it gets there, from the first commit to after it ships.",
  skills: {
    "E-Commerce": ["Shopify", "Hydrogen", "GraphQL", "Storefront API"],
    "Frontend": ["React", "Next.js", "TypeScript", "Tailwind CSS", "Astro"],
    "Backend": ["Node.js", "Express.js", "ASP.NET", ".NET Framework", "PHP"],
    "Mobile": ["Flutter", "Dart"],
    "Languages": ["JavaScript", "TypeScript", "Python", "Java", "C#", "C/C++"],
    "Databases": ["MySQL", "MongoDB", "SQL Server", "Oracle"],
    "Tools": ["Docker", "Git", "REST APIs", "Vercel", "XAMPP"],
  },
  projects: [
    {
      name: "Crestline Ecommerce Store",
      description:
        "A production Shopify Hydrogen storefront built with headless commerce architecture. Custom Remix-based theme with optimized product pages, cart, and checkout flows that prioritize performance and conversion.",
      link: "",
      image: "/Crestline Ecommerce store.png",
      isPrivate: true,
      skills: ["Shopify Hydrogen", "Remix", "TypeScript", "GraphQL", "Tailwind CSS"],
      featured: true,
      theme: { gradient: "from-emerald-600 via-teal-500 to-cyan-600", accent: "#14b8a6" },
    },
    {
      name: "Moodflow — AI Mood Tracker",
      description:
        "A Flutter mood tracker that uses color-coded emotions, a visual calendar history, and an AI chat powered by Google Gemini. Built with a hybrid AI system: real Gemini on desktop, smart offline fallback on mobile. All data stored locally, no account needed.",
      link: "https://github.com/Spectre03/Moodflow-flutter",
      image: "/Moodflow.png",
      imagePosition: "center 15%",
      skills: ["Flutter", "Dart", "Google Gemini AI", "Local Storage"],
      featured: true,
      theme: { gradient: "from-violet-600 via-purple-500 to-fuchsia-500", accent: "#a855f7" },
    },
    {
      name: "Chauffeur Booking Platform",
      description:
        "A full-stack TypeScript booking platform for chauffeur services, built in collaboration with a co-developer. Features real-time availability, booking management, and a client-facing interface.",
      link: "",
      image: "/Luxedrive chauffer service.png",
      isPrivate: true,
      skills: ["TypeScript", "Node.js", "React", "REST APIs"],
      featured: true,
      theme: { gradient: "from-blue-600 via-indigo-500 to-slate-700", accent: "#6366f1" },
    },
    {
      name: "HR Management System",
      description:
        "Feature-rich web app for employee profiles, goals, attendance, payroll, and performance evaluations. Ships with an OpenAI-powered admin chatbot, email/SMS notifications, role-based access control, and full audit logging.",
      link: "https://github.com/Spectre03/HR-Management-System",
      image: "/HR Management.png",
      skills: ["ASP.NET", "C#", "SQL Server", "OpenAI API"],
    },
    {
      name: "Electronic Health Record (EHR) System",
      description:
        "Clinic-grade EHR system handling patient registration, clinical encounters, vitals, diagnoses, appointment scheduling, billing, inventory management, and role-based access for 6 user types.",
      link: "https://github.com/Spectre03/EhrSystem",
      image: "/EHR management.png",
      skills: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
    },
    {
      name: "Task & Performance Management System",
      description:
        "Desktop system for task tracking, performance evaluations, employee recognition, training management, wellness features, and automated feedback loops.",
      link: "",
      image: "",
      skills: ["Python", "Flet", "MySQL"],
    },
    {
      name: "Personal Assistant — Desktop App",
      description:
        "Intelligent Python desktop assistant that responds to voice and text commands, manages tasks, sets reminders, and runs automated operations through a GUI interface.",
      link: "",
      image: "",
      skills: ["Python", "Tkinter", "Speech Recognition", "APIs"],
    },
  ],
  experience: [
    {
      company: "BrightSquare",
      title: "Full Stack Developer Intern",
      dateRange: "May 2025 – Aug 2025",
      bullets: [
        "Shipped features across an Android app and multiple web projects as part of a small dev team",
        "Worked full-stack, covering UI components through to backend API integrations with senior developer guidance",
        "Took part in code reviews and sprint cycles, delivering iteratively in an agile setup",
      ],
    },
    {
      company: "Ezline Software House",
      title: "Front-End Developer Intern",
      dateRange: "Jun 2024 – Aug 2024",
      bullets: [
        "Built and maintained responsive UI components across live web projects",
        "Converted design mockups into working, cross-browser compatible pages",
      ],
    },
  ],
  education: [
    {
      school: "Riphah International University",
      degree: "Bachelor's in Software Engineering",
      dateRange: "Aug 2022 – Present",
      achievements: ["CGPA: 3.3"],
    },
    {
      school: "Dr. Rashad College",
      degree: "Intermediate",
      dateRange: "Jan 2019 – Jan 2021",
      achievements: [],
    },
  ],
  certifications: [
    {
      name: "Shopify Hydrogen Fundamentals",
      issuer: "Shopify",
      date: "2024",
      brandColor: "#96BF48",
      brandInitial: "S",
    },
    {
      name: "Shopify Partner Developer Track",
      issuer: "Shopify",
      date: "2024",
      brandColor: "#96BF48",
      brandInitial: "S",
    },
    {
      name: "IBM Full Stack Developer",
      issuer: "IBM / Coursera",
      date: "Mar 2025",
      brandColor: "#1F70C1",
      brandInitial: "IBM",
    },
    {
      name: "MERN Stack Professional Certificate",
      issuer: "Coursera",
      date: "2024",
      brandColor: "#0056D2",
      brandInitial: "C",
    },
    {
      name: "Responsive Web Design & JavaScript Algorithms",
      issuer: "freeCodeCamp",
      date: "2023",
      brandColor: "#3CD69D",
      brandInitial: "FCC",
    },
    {
      name: "Google Analytics & SEO Fundamentals",
      issuer: "Google",
      date: "2024",
      brandColor: "#4285F4",
      brandInitial: "G",
    },
    {
      name: "Python Essentials 1 & 2",
      issuer: "Cisco",
      date: "Dec 2024",
      brandColor: "#1BA0D7",
      brandInitial: "Ci",
    },
    {
      name: "JavaScript Essentials 1 & 2",
      issuer: "Cisco",
      date: "Mar 2023",
      brandColor: "#1BA0D7",
      brandInitial: "Ci",
    },
    {
      name: "Networking Basics",
      issuer: "Cisco",
      date: "Oct 2024",
      brandColor: "#1BA0D7",
      brandInitial: "Ci",
    },
  ],
};
