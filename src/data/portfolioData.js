export const portfolioData = {
  personalInfo: {
    name: "Adarsh Bhande",
    role: "Creative Developer",
    location: "India",
    username: "adarsh@bhande-os",
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
      id: "phase-1",
      name: "Portfolio Phase 1: Core Shell & Desktop",
      tagline: "The base dual-surface OS environment.",
      description: "Features a CLI terminal parser with autocomplete, history buffers, and mobile command chips alongside a classic grid-icon OS desktop. Users can browse the terminal or click icons to open panels.",
      tags: ["React", "ViteJS", "Vanilla CSS", "Google Fonts"],
      github: "https://github.com/AdarshBhande/portfolio",
      demo: "https://adarshbhande.github.io/portfolio/",
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
      github: "https://github.com/AdarshBhande/portfolio",
      demo: "https://adarshbhande.github.io/portfolio/",
      readme: `# Phase 2: Lock Screen & Hack Event
- Simulated operating system sign-in form.
- Digital clock and greeting message tailored to user local times.
- Scripted hack overlay animation playing warning console texts to create a playful narrative hook.
- Auto-spawns the Phase 1 terminal upon resolving.`
    },
    {
      id: "phase-3",
      name: "Portfolio Phase 3: Interactive Room & Music Player",
      tagline: "First-person perspective landing space & background music.",
      description: "Displays a first-person room view with clickable laptop monitor zoom. Features a background Music Player app auto-starting Sunflower (Spider-Verse) with pause/resume state preservation.",
      tags: ["2D SVG Layout", "Camera Transitions", "HTML5 Audio API", "Groove Music UI"],
      github: "https://github.com/AdarshBhande/portfolio",
      demo: "https://adarshbhande.github.io/portfolio/",
      readme: `# Phase 3: Interactive Room & Music Player
- Implements a stylized bedroom/office scene featuring desks, shelves, and interactive elements.
- Pins the resume banner as a clickable physical room object (like a wall poster).
- Uses CSS transforms to transition the viewport smoothly from the room perspective directly into the computer screen bootloader.
- Integrated background Music Player app with 5 real MP3 tracks and lock/logout pause-resume lifecycle.`
    },
    {
      id: "phase-4",
      name: "Portfolio Phase 4: Interactive Apps & Games Suite",
      tagline: "Minesweeper, Solitaire, MS Paint, Guest Book, and Photoshop Gallery.",
      description: "Full suite of interactive desktop applications including Minesweeper (9x9 grid), Klondike Solitaire card game, MS Paint canvas drawing board with PNG download, Guest Book with localStorage, and Photoshop Showcase.",
      tags: ["HTML5 Canvas", "State Machines", "LocalStorage", "React Window Manager"],
      github: "https://github.com/AdarshBhande/portfolio",
      demo: "https://adarshbhande.github.io/portfolio/",
      readme: `# Phase 4: Interactive Apps & Games Suite
- Playable 9x9 Minesweeper game engine with mine counter, game timer, flags, and smiley face reset.
- Playable Klondike Solitaire card game with stock deck, tableau columns, and move tracker.
- MS Paint freehand drawing board with brush size slider, color palette, eraser, and PNG download.
- Visitor Guest Book with comment feed saved in localStorage so notes stay preserved between reloads.
- Photoshop Creative Works gallery with category filters and lightbox image zoom.`
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

