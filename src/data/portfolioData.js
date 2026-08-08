export const portfolioData = {
  personalInfo: {
    name: "Adarsh Bhande",
    role: "Creative Developer",
    location: "India",
    username: "adarsh@spidey-os",

    email: "bhandeadarsh2006@gmail.com",
    github: "https://github.com/AdarshBhande",
    linkedin: "https://www.linkedin.com/in/adarsh-bhande",
    twitter: null,
    resumeUrl: "https://drive.google.com/file/d/1IJus1mJqHD_NWEA6GaVHiV7WHQQ125D4/view?usp=sharing",
    bio: [
      "I am a passionate Creative Developer based in India, currently pursuing my software engineering studies in Information Technology. I am driven by the intersection of solid engineering principles and expressive, interactive design.",
      "My goal is to construct digital interfaces that feel alive, responsive, and memorable. Rather than building static text-based sites, I enjoy coding web experiences, simulated operating systems, and interactive canvas components.",
      "Currently exploring advanced React patterns, browser graphics, state machinery, and performance tuning for rich, interactive frontends."
    ]
  },
  
  skills: [
    {
      category: "Programming Languages",
      items: [
        { name: "JavaScript", level: "Advanced" },
        { name: "TypeScript", level: "Intermediate" },
        { name: "C++", level: "Intermediate" },
        { name: "Java", level: "Intermediate" },
        { name: "HTML5/CSS3", level: "Expert" }
      ]
    },
    {
      category: "Frontend Libraries & Frameworks",
      items: [
        { name: "React", level: "Advanced" },
        { name: "Vite", level: "Advanced" },
        { name: "Next.js", level: "Intermediate" },
        { name: "Canvas API / SVG", level: "Intermediate" }
      ]
    },
    {
      category: "Developer Tools & Platforms",
      items: [
        { name: "Git & GitHub", level: "Advanced" },
        { name: "npm / Yarn", level: "Advanced" },
        { name: "Vercel / Netlify", level: "Advanced" },
        { name: "VS Code", level: "Expert" },
        { name: "Docker", level: "Beginner" }
      ]
    }
  ],

  projects: [
    {
      id: "spidey-os",
      name: "Spidey OS — Web Portfolio",
      tagline: "Dual-surface CLI terminal and Windows 11 desktop environment.",
      description: "A full dual-surface operating system portfolio featuring an interactive CLI terminal parser, desktop window manager, playable retro games (Minesweeper & Solitaire), MS Paint drawing board with PNG download, and real-time Guest Book powered by Supabase.",
      tags: ["React", "ViteJS", "Supabase", "Vanilla CSS", "Google Fonts"],
      github: "https://github.com/AdarshBhande/portfolio",
      demo: "https://adarshbhande.github.io/portfolio/",
      readme: `# Spidey OS — Interactive Web Operating System
- Dual-surface CLI terminal and modern Windows 11 desktop experience.
- Groove Music Player auto-playing Sunflower (Spider-Verse) with lock screen pause/resume lifecycle.
- Full suite of retro desktop games: 9x9 Minesweeper with flagging & Klondike Solitaire card game.
- MS Paint freehand drawing canvas with color swatches and PNG image export.
- Real-time Visitor Guest Book connected directly to Supabase cloud database.`
    },
    {
      id: "kjei-hostel-tracker",
      name: "KJEI Hostel Complaint Tracker",
      tagline: "Online complaint management system for K.J. Educational Institutes.",
      description: "A web application built for students at K.J. Educational Institutes (KJEI) to easily submit, track, and resolve hostel-related complaints online, replacing manual paper logs with a streamlined digital system.",
      tags: ["HTML5", "CSS3", "JavaScript", "Web App"],
      github: "https://github.com/AdarshBhande/KJEI_HOSTEL_COMPLAINT_TRACKER",
      demo: "https://github.com/AdarshBhande/KJEI_HOSTEL_COMPLAINT_TRACKER",
      readme: `# KJEI Hostel Complaint Tracker
- Replaces traditional paper complaint books with an online tracking dashboard.
- Student authentication and complaint submission form.
- Real-time status update tracking for hostel management.`
    },
    {
      id: "pragati-self-dev",
      name: "PRAGATI — Personal Progress Platform",
      tagline: "Goal setting and habit tracking web application.",
      description: "PRAGATI (named after the Hindi word for 'progress') is a personal development web platform designed to help users set goals, track daily habits, and transform ambitions into achievements.",
      tags: ["HTML5", "CSS3", "JavaScript", "Web App"],
      github: "https://github.com/AdarshBhande/PRAGATI-SELF-DEVELOPMENT-",
      demo: "https://github.com/AdarshBhande/PRAGATI-SELF-DEVELOPMENT-",
      readme: `# PRAGATI — Self Development Platform
- Goal tracking dashboard and milestone planner.
- Interactive habit building interface.
- Personal progress analytics.`
    },
    {
      id: "msmv-escorp",
      name: "Escorp Industries Customer Portal",
      tagline: "Web portal for Escorp Industries customer management.",
      description: "Custom web platform built for customers of Escorp Industries to explore product catalogs, submit service inquiries, and view company updates.",
      tags: ["HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/AdarshBhande/MSMV_PROJECT",
      demo: "https://github.com/AdarshBhande/MSMV_PROJECT",
      readme: `# Escorp Industries Customer Portal
- Product showcase and service catalog.
- Customer contact and inquiry submission.
- Responsive layout designed for desktop and mobile devices.`
    },
    {
      id: "nss-tcoer",
      name: "NSS TCOER Student Chapter Portal",
      tagline: "National Service Scheme portal for TCOER student community.",
      description: "Community web portal for the National Service Scheme (NSS) chapter at TCOER to coordinate social service drives, student volunteer registrations, and community initiative updates.",
      tags: ["HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/AdarshBhande/NSS-TCOER-",
      demo: "https://github.com/AdarshBhande/NSS-TCOER-",
      readme: `# NSS TCOER Student Chapter Portal
- Social initiative event announcements and volunteer signup forms.
- Community gallery showcasing NSS outreach programs.`
    }
  ],



  // Simulating the virtual filesystem in memory
  fileSystem: {
    "about.md": `===========================================================
                   ABOUT ADARSH BHANDE
===========================================================

Name:       Adarsh Bhande
Role:       Creative Developer
Education:  Software Engineering (Information Technology)
Location:   India
Email:      bhandeadarsh2006@gmail.com
GitHub:     https://github.com/AdarshBhande
LinkedIn:   https://www.linkedin.com/in/adarsh-bhande
Resume:     https://drive.google.com/file/d/1IJus1mJqHD_NWEA6GaVHiV7WHQQ125D4/view?usp=sharing

-----------------------------------------------------------
BIOGRAPHY:
-----------------------------------------------------------
I am a passionate Creative Developer based in India, currently pursuing my 
software engineering studies in Information Technology. 

I am driven by the intersection of solid engineering principles and expressive, 
interactive user experiences. Rather than building static text-based sites, 
I build interactive web applications, simulated operating systems, canvas-based 
drawing boards, and custom audio experiences.

Currently exploring advanced React patterns, browser graphics (Canvas API / SVG), 
state machines, and performance tuning for rich, interactive frontends.
===========================================================`,
    
    "skills.json": `{\n  "name": "Adarsh Bhande",\n  "programming_languages": ["JavaScript (ES6+)", "TypeScript", "C++", "Java", "HTML5", "CSS3"],\n  "frontend_frameworks": ["React.js", "Vite", "Next.js", "Canvas API", "HTML5 Audio API"],\n  "developer_tools": ["Git", "GitHub", "npm / Yarn", "Vercel", "GitHub Pages", "VS Code", "Docker"]\n}`,
    
    "contact.txt": `===========================================================
              ADARSH BHANDE — CONTACT DETAILS
===========================================================
Name:     Adarsh Bhande
Role:     Creative Developer
Email:    bhandeadarsh2006@gmail.com
GitHub:   https://github.com/AdarshBhande
LinkedIn: https://www.linkedin.com/in/adarsh-bhande
Resume:   https://drive.google.com/file/d/1IJus1mJqHD_NWEA6GaVHiV7WHQQ125D4/view?usp=sharing
===========================================================`,
    
    "projects": {
      "phase-1.md": `# Phase 1: Core Shell & Desktop\nCore CLI terminal parser and OS desktop grid view. Status: Active`,
      "phase-2.md": `# Phase 2: Lock Screen & Hack Event\nGlitch animations, login screen, and lock panel. Status: Complete`,
      "phase-3.md": `# Phase 3: Interactive Room & Music Player\nFirst-person room zoom transition and Music Player startup app. Status: Complete`,
      "phase-4.md": `# Phase 4: Apps & Games Suite\nMinesweeper, Solitaire, MS Paint (PNG download), Guest Book, and Photoshop Gallery. Status: Complete`
    }
  }
};

