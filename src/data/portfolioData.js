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
      name: "Spidey OS — Interactive Web Operating System",
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
      id: "groove-music",
      name: "Groove Music — Browser Audio Suite",
      tagline: "Background audio player with equalizer visualizers & playlist control.",
      description: "Features background MP3 audio playback auto-starting Sunflower with full playlist controls, dynamic equalizer visualizers, volume slider, seek bar, and state preservation across lock screen transitions.",
      tags: ["React Hooks", "HTML5 Audio API", "CSS Animations", "Web Audio"],
      github: "https://github.com/AdarshBhande/portfolio",
      demo: "https://adarshbhande.github.io/portfolio/",
      readme: `# Groove Music — Browser Audio Suite
- 5 real MP3 tracks (Sunflower, Him & I, A Thousand Years, Sailor Song, The Lazy Song).
- Animated equalizer visualizer bars.
- Full playlist selector, seek bar, volume control, and auto-resume on unlock.`
    },
    {
      id: "retro-games",
      name: "Retro Games Suite (Minesweeper & Solitaire)",
      tagline: "Full playable 9x9 Minesweeper & Klondike Solitaire engines.",
      description: "Fully interactive browser implementations of classic desktop games. Features 9x9 Minesweeper with first-click safety, digital timer/mine counter, and Klondike Solitaire card game with stock deck and foundation piles.",
      tags: ["JavaScript ES6+", "State Machines", "Game Logic", "CSS Grid"],
      github: "https://github.com/AdarshBhande/portfolio",
      demo: "https://adarshbhande.github.io/portfolio/",
      readme: `# Retro Games Suite
- 9x9 Minesweeper with 10 mines, first-click safety, right-click/touch flagging, digital timer, and smiley face reset.
- Klondike Solitaire with draw pile, 4 foundation slots, 7 tableau columns, score tracker, and move counter.`
    },
    {
      id: "paint-guestbook",
      name: "MS Paint & Real-Time Cloud Guest Book",
      tagline: "HTML5 Canvas drawing board & Supabase real-time visitor database.",
      description: "Includes an interactive HTML5 Canvas drawing board with custom colors, brush size slider, eraser, and PNG download, alongside a real-time visitor feedback Guest Book powered by a Supabase PostgreSQL cloud database.",
      tags: ["HTML5 Canvas", "Supabase PostgreSQL", "Real-Time Subscriptions", "PNG Export"],
      github: "https://github.com/AdarshBhande/portfolio",
      demo: "https://adarshbhande.github.io/portfolio/",
      readme: `# MS Paint & Real-Time Cloud Guest Book
- MS Paint freehand drawing canvas with color swatches, brush size slider, eraser, and PNG export.
- Real-time Visitor Guest Book connected directly to Supabase cloud database with live websocket subscriptions.`
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

