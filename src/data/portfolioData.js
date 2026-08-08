export const portfolioData = {
  personalInfo: {
    name: "Adarsh Bhande",
    role: "Creative Developer",
    location: "India",
    username: "adarsh@bhande-os",
    email: "adarsh.bhande@mockmail.com",
    github: "https://github.com/adarshbhande-mock",
    linkedin: "https://linkedin.com/in/adarshbhande-mock",
    twitter: "https://twitter.com/adarshbhande_mock",
    resumeUrl: "#", // Placeholder link
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
      id: "phase-1",
      name: "Portfolio Phase 1: Core Shell & Desktop",
      tagline: "The base dual-surface OS environment.",
      description: "Features a CLI terminal parser with autocomplete, history buffers, and mobile command chips alongside a classic grid-icon OS desktop. Users can browse the terminal or click icons to open panels.",
      tags: ["React", "ViteJS", "Vanilla CSS", "Google Fonts"],
      github: "https://github.com/adarshbhande-mock/portfolio-core",
      demo: "https://portfolio-two-gray-37.vercel.app/",
      readme: `# Phase 1: Core Shell & Desktop
- Implements the foundational command-line interface with parsed commands (ls, cd, cat, theme).
- Designed with standard OS dock clock, taskbar tabs, and desktop grids.
- Complete keyboard history memory (Up/Down arrow key) and auto-tab completion.
- Features dual-view synchronization: terminal updates reflect on desktop widgets.`
    },
    {
      id: "phase-2",
      name: "Portfolio Phase 2: Lock Screen & Hack Event",
      tagline: "Scripted security glitch sequence.",
      description: "Adds a simulated OS lock screen that requires a cosmetic login, leading to a temporary desktop before a playful 'glitch override' terminal pops up with digital rain text overlays.",
      tags: ["CSS Animations", "React Hooks", "SVG Glitch Effect"],
      github: "https://github.com/adarshbhande-mock/portfolio-glitch",
      demo: "https://debuuuuu-potfolio.vercel.app/",
      readme: `# Phase 2: Lock Screen & Hack Event
- Simulated operating system sign-in form (cosmetic only, no actual login needed).
- Digital clock and greeting message tailored to user local times.
- Scripted hack overlay animation playing warning console texts to create a playful narrative hooks.
- Auto-spawns the Phase 1 terminal upon resolving.`
    },
    {
      id: "phase-3",
      name: "Portfolio Phase 3: Interactive Room Scene",
      tagline: "First-person perspective landing space.",
      description: "Displays a first-person room view (flat vector/pixel art) with clickable components. Clicking the computer monitor zooms the camera in to trigger Phase 2's boot sequence.",
      tags: ["2D SVG Layout", "Camera Transitions", "Web Audio API"],
      github: "https://github.com/adarshbhande-mock/portfolio-room",
      demo: "#",
      readme: `# Phase 3: Interactive Room Scene
- Implements a stylized bedroom/office scene featuring desks, shelves, and interactive elements.
- Pins the resume banner as a clickable physical room object (like a wall poster).
- Uses CSS transforms to transition the viewport smoothly from the room perspective directly into the computer screen bootloader.`
    },
    {
      id: "phase-4",
      name: "Portfolio Phase 4: Polish & Deployment",
      tagline: "Optimization, accessibility, and session control.",
      description: "Polishes responsive viewports, introduces session storage to remember skipping intro animations, respects user prefers-reduced-motion, and completes deployments.",
      tags: ["Accessibility (a11y)", "Session State", "Production Build"],
      github: "https://github.com/adarshbhande-mock/portfolio-finished",
      demo: "#",
      readme: `# Phase 4: Polish & Deployment
- Integrates session caching to remember whether a user has watched the intro, saving repeat visitors time.
- Implements skip buttons active from frame one on all animation wrappers.
- Keyboard-only focus state handling and screen reader support (ARIA live outputs).`
    }
  ],

  // Simulating the virtual filesystem in memory
  fileSystem: {
    "about.md": `## About Adarsh Bhande
I am a Creative Developer based in India, pursuing Software Engineering from IT.
I build web applications that look premium and offer memorable interactions.
Use 'theme light' or 'theme dark' to switch visual styles.`,
    
    "skills.json": `{\n  "programming_languages": ["JavaScript", "TypeScript", "C++", "Java", "HTML/CSS"],\n  "frameworks": ["React", "Next.js", "Vite"],\n  "tools": ["Git", "npm", "Vercel", "Docker"]\n}`,
    
    "contact.txt": `Email: adarsh.bhande@mockmail.com\nGitHub: https://github.com/adarshbhande-mock\nLinkedIn: https://linkedin.com/in/adarshbhande-mock\nTwitter: https://twitter.com/adarshbhande_mock`,
    
    "projects": {
      "phase-1.md": `# Phase 1: Core Shell & Desktop\nCore terminal and desktop views. Status: Active`,
      "phase-2.md": `# Phase 2: Lock Screen & Hack\nGlitch animations and lock panel. Status: In Progress`,
      "phase-3.md": `# Phase 3: Interactive Room\n3D/2D room zoom transition. Status: Planned`,
      "phase-4.md": `# Phase 4: Optimization\nAccessibility, speed, and session state. Status: Planned`
    }
  }
};
