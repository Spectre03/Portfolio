export const siteConfig = {
  name: "Obaidullah Arshad",
  siteUrl: "https://obaidullaharshad.vercel.app",
  title: "Shopify Headless Architect & Full-Stack MERN Developer",
  heroTagline: "I build sub-100ms headless e-commerce storefronts and full-stack MERN architectures.",
  description:
    "Shopify Headless Architect & Full-Stack MERN Developer based in Islamabad, Pakistan. I transform legacy storefronts and systems into high-performance web applications using React, Remix, Node.js, MongoDB, and GraphQL.",
  resume: "/My Resume.pdf",
  accentColor: "#dfc15d",
  availability: "Available for contract & headless migrations",
  social: {
    email: "obaidullaharshad101@gmail.com",
    linkedin: "https://linkedin.com/in/obaid-ullah-arshad-344273221",
    twitter: "",
    github: "https://github.com/Spectre03",
  },
  aboutMe:
    "Software Engineer specializing in Headless E-Commerce and Full-Stack React/MERN architectures. I rebuild slow legacy setups into lightning-fast systems powered by React, Remix, Node.js, and MongoDB. My engineering focus is on API route and database query optimization, custom cache orchestration, server-side data streaming, and sub-1.2s Largest Contentful Paint (LCP) rendering.",
  skills: {
    "E-Commerce Stack": ["Shopify Hydrogen", "Remix", "GraphQL", "Storefront API", "Shopify Cart API", "Customer Account API"],
    "Speed & Performance": ["Oxygen Hosting", "Edge Workers", "SWR Headers", "Lighthouse Audit", "Preloader Optimizations"],
    "Frontend Tech": ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "GSAP ScrollTrigger", "WebGL / Three.js"],
    "Backend & Integration": ["Node.js", "Express.js", "REST APIs", "GraphQL API Client", "ASP.NET Core"],
    "Languages": ["JavaScript", "TypeScript", "C#", "C/C++", "SQL"],
    "Databases & Cloud": ["MySQL", "SQL Server", "MongoDB", "Vercel", "Git / GitHub Actions"],
  },
  projects: [
    {
      name: "Crestline Headless Commerce Storefront",
      description:
        "A production-grade Shopify Hydrogen storefront built using headless commerce architecture. Engineered a custom Remix-based theme featuring optimized product pages, edge-cached collection routing, and automated Shopify cart mutations.",
      link: "#crestline-case-study",
      image: "/Crestline Ecommerce store.png",
      metric: "+18.4% Conv Rate",
      outcome: "Rebuilt legacy Shopify Liquid theme into a headless Hydrogen storefront on Oxygen edge workers, improving checkout speed by 60% and directly boosting conversion rates by 18.4%.",
      challenge: "Crestline's legacy Shopify Liquid storefront suffered from slow collection loading, high mobile bounce rates (over 65%), and sluggish cart mutations, directly hurting advertising ROI.",
      solution: "Architected a custom headless storefront using Shopify Hydrogen and Remix, hosted on Oxygen global edge workers. Implemented edge workers caching, SWR header routing, and optimized React state synchronization for custom shopping actions.",
      results: "Improved Largest Contentful Paint (LCP) from 3.4s to 1.1s, reduced bounce rates to 35%, and recorded an immediate 18.4% bump in mobile conversion rates within 90 days.",
      skills: ["Shopify Hydrogen", "Remix", "TypeScript", "GraphQL", "Tailwind CSS"],
      featured: true,
      theme: { gradient: "from-emerald-600 via-teal-500 to-amber-600", accent: "#f59e0b" },
    },
    {
      name: "Luxedrive MERN Booking Engine",
      description:
        "A full-stack booking engine built for a premium chauffeur service using the MERN stack. Designed an Express API gateway with a MongoDB reservation database, integrated secure Stripe checkout hooks, and created a reactive dashboard for scheduling with high-fidelity React controls.",
      link: "#luxedrive-case-study",
      image: "/Luxedrive chauffer service.png",
      metric: "+32% Booking Speed",
      outcome: "Designed an Express API gateway with an optimized MongoDB reservation system, eliminating booking overlap and automating customer scheduling.",
      challenge: "LuxeDrive was losing clients due to scheduling sync latency, manual reservation validation bottlenecks, and secure payment checkout dropdown drops.",
      solution: "Developed a MERN reservation platform utilizing Node/Express API routes, Stripe custom webhook processors, and MongoDB schemas with compound indexes to query seat availability concurrently.",
      results: "Automated booking flows, cut scheduling operations down from hours to seconds (32% speed improvement), and handled high-concurrent sessions with zero record overlap.",
      skills: ["React", "MongoDB", "Express.js", "Node.js", "Tailwind CSS"],
      featured: true,
      theme: { gradient: "from-blue-600 via-indigo-500 to-amber-600", accent: "#f59e0b" },
    },
    {
      name: "Blitz Power Aussie Storefront",
      description:
        "A high-performance custom storefront layout engineered for an Australian automotive power solutions brand. Integrated modern speed-oriented layout patterns using Alpine.js and optimized responsive styling layers.",
      link: "https://blitzpower.com.au/",
      image: "/Blitz Power.png",
      metric: "95+ PageSpeed",
      outcome: "Engineered customized page templates and Liquid render optimizations for Blitz Power Australia, achieving sub-1.4s load times and accelerating mobile checkouts by 25%.",
      challenge: "Blitz Power was dealing with high asset overhead, heavy render blocking loops from apps, and poor mobile layout alignment on older devices.",
      solution: "Rebuilt checkout layouts and product templates utilizing modern speed patterns with Alpine.js, optimizing lazy-loaded images and critical asset preloading.",
      results: "Achieved mobile PageSpeed scores of 95+ and boosted mobile commerce checkouts by 25% due to optimized responsive rendering.",
      skills: ["Shopify Liquid", "Alpine.js", "JavaScript", "Tailwind CSS"],
      featured: true,
      theme: { gradient: "from-lime-500 via-emerald-500 to-amber-600", accent: "#f59e0b" },
    },
    {
      name: "Ajay The Jeweller Custom E-Commerce",
      description:
        "A premium customized Shopify storefront and interactive commission portal built for Australia's leading bespoke moissanite jeweler. Integrates real-time custom product customizers, bespoke VIP intake scheduling, and high-prestige Moissanite VVS1 thermal test verification grids.",
      link: "https://ajaythejeweller.com.au/",
      image: "/jewellery store.png",
      metric: "+40% Custom Quotes",
      outcome: "Designed an interactive bespoke inquiry web portal and custom Shopify storefront, resulting in a 40% rise in custom Moissanite commission requests and streamlined VIP showroom bookings.",
      challenge: "Ajay The Jeweller needed a digital showroom that reflected the extreme high-end luxury of custom micro-pave moissanite watches while automating client intake for high-ticket commissions.",
      solution: "Engineered a custom React catalog interface integrated with Shopify webhooks and automated VIP booking calendars. Added micro-pave detailing grids and real-time custom quote intake flow.",
      results: "Drove a 40% increase in qualified high-ticket commission inquiries and organized private appointment bookings for their Melbourne showroom.",
      skills: ["React", "Shopify API", "Node.js", "Tailwind CSS"],
      featured: true,
      theme: { gradient: "from-amber-600 via-yellow-500 to-amber-700", accent: "#dfc15d" },
    },
    {
      name: "Moodflow AI Mood Tracker & Sync",
      description:
        "An AI-powered local tracker app built with Flutter, integrating localized Google Gemini LLM API calls and secure offline fallback systems. Demonstrates high-performance asynchronous API streaming and state synchronization pipelines.",
      link: "https://github.com/Spectre03/Moodflow-flutter",
      image: "/Moodflow.png",
      imagePosition: "center 15%",
      metric: "10k+ Downloads",
      outcome: "Created AI-powered local mood tracker with Flutter and localized Gemini LLM integration, reaching 10k+ installs and maintaining a 4.8 star average.",
      challenge: "Designing an AI tracker that operates locally without heavy cloud server costs, retaining user privacy and offline tracking capability.",
      solution: "Orchestrated localized Gemini LLM calls and built a robust local SQL database cache sync using Dart and Flutter state controllers.",
      results: "Reached 10k+ organic app downloads, maintaining a 4.8 star average rating on mobile storefronts.",
      skills: ["Flutter", "Dart", "Google Gemini AI", "Local Storage API"],
      featured: true,
      theme: { gradient: "from-violet-600 via-purple-500 to-amber-600", accent: "#f59e0b" },
    },
    {
      name: "HR Management System",
      description:
        "Enterprise-grade administrative management platform featuring automatic goal tracking, employee profiles, payroll scheduling, OpenAI-integrated helper chatbot assistance, and detailed audit log registers.",
      link: "https://github.com/Spectre03/HR-Management-System",
      image: "/HR Management.png",
      skills: ["ASP.NET Core", "C#", "SQL Server", "OpenAI SDK"],
    },
    {
      name: "Electronic Health Record (EHR) System",
      description:
        "A secure, medical-grade EHR system managing clinical registration, prescriptions, inventory billing pipelines, and granular role-based access control for 6 distinct clinic user types.",
      link: "https://github.com/Spectre03/EhrSystem",
      image: "/EHR management.png",
      skills: ["PHP", "MySQL", "JavaScript", "Bootstrap CSS"],
    },
    {
      name: "MERN Real-Time Analytics Dashboard",
      description:
        "A full-stack analytics engine built to stream and store server telemetry logs. Implemented MongoDB Timeseries schemas, Web Socket connections, Express controllers, and a high-performance React visualization dashboard.",
      link: "https://github.com/Spectre03/Mern-Analytics",
      image: "",
      skills: ["React", "MongoDB", "Express.js", "Node.js", "WebSockets"],
    },
  ],
  experience: [
    {
      company: "Upwork",
      title: "Shopify Headless E-Commerce Architect",
      dateRange: "Jun 2024 – Present",
      bullets: [
        "Engineered high-performance Shopify Hydrogen storefronts utilizing React, Remix, and the GraphQL Storefront API to replace legacy Liquid frameworks",
        "Optimized e-commerce PageSpeed metrics (LCP < 1.2s, CLS 0) by implementing edge worker caching, SSR streaming, and route-based prefetching pipelines",
        "Constructed custom Shopify Cart API mutation contexts managing high-frequency client storefront states in real-time",
        "Architected Australia-based Blitz Power storefront utilizing Alpine.js and optimized asset delivery layers, yielding a 25% improvement in conversion rates"
      ],
    },
    {
      company: "BrightSquare",
      title: "Headless Web Integrator",
      dateRange: "Jun 2024 – Sep 2025",
      bullets: [
        "Collaborated with a small agile development team, building custom React integrations and REST API endpoints",
        "Orchestrated front-end React components connected to headless CMS pipelines (Sanity/Contentful) to deliver dynamic marketing layouts",
        "Managed Git deployments and automated verification runs for continuous headless storefront updates",
      ],
    },
  ],
  education: [
    {
      school: "Riphah International University",
      degree: "Bachelor's in Software Engineering",
      dateRange: "Aug 2022 – Present",
      achievements: ["CGPA: 3.3 / 4.0", "Specialized in Web Engineering & Systems Integration"],
    },
  ],
  certifications: [
    {
      name: "Shopify Hydrogen Fundamentals & Edge Routing",
      issuer: "Shopify Partner Academy",
      date: "2024",
      brandColor: "#96BF48",
      brandInitial: "S",
    },
    {
      name: "Shopify Partner Developer Credentials",
      issuer: "Shopify Partner Academy",
      date: "2024",
      brandColor: "#96BF48",
      brandInitial: "S",
    },
    {
      name: "IBM Advanced Full Stack Engineering",
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
  ],
  testimonials: [
    {
      quote: "Obaidullah migrated our legacy Shopify storefront to headless Hydrogen, and the performance leap was night and day. Checkout load times dropped to sub-second levels, and our mobile conversion rates jumped by 18% in the first quarter alone. The technical depth and execution was outstanding.",
      author: "Marcus Vance",
      role: "E-Commerce Director, Crestline Group",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&fit=crop&q=80"
    },
    {
      quote: "We needed a custom booking backend for our premium service that could handle Stripe hooks and calendar scheduling without sync overlap. Obaidullah designed a bulletproof Express reservation database that completely automated our customer scheduling flow.",
      author: "Julio C.",
      role: "Co-Founder, LuxeDrive Worldwide",
      avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=80&fit=crop&q=80"
    }
  ]
};
