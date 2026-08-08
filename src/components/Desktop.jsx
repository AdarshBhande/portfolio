import React, { useState, useEffect, useRef } from 'react';
import { portfolioData } from '../data/portfolioData';
import WindowFrame from './WindowFrame';
import Terminal from './Terminal';
import MusicPlayer from './MusicPlayer';
import Minesweeper from './Minesweeper';
import Solitaire from './Solitaire';
import PaintApp from './PaintApp';
import GuestBook from './GuestBook';
import PhotoshopGallery from './PhotoshopGallery';

const Desktop = ({ 
  activeWindows, 
  minimizedWindows = {},
  maximizedWindows = {},
  toggleWindow, 
  onMinimizeWindow,
  onMaximizeWindow,
  onTaskbarClick,
  activeTheme, 
  setActiveTheme,
  onLock,
  onLogout,
  currentTrackIndex,
  setCurrentTrackIndex,
  isPlayingMusic,
  setIsPlayingMusic,
  isLocked,
  currentScene
}) => {
  const [clockTime, setClockTime] = useState('');
  const [openApp, setOpenApp] = useState(null); // Notepad/Paint mock viewer
  const [showStartMenu, setShowStartMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentDateStr, setCurrentDateStr] = useState('');
  
  const startMenuRef = useRef(null);
  const startButtonRef = useRef(null);

  // Update clock and date every second
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      const timeStr = `${String(hours).padStart(2, '0')}:${minutes} ${ampm}`;
      setClockTime(timeStr);

      // Date formatted as MM/DD/YYYY
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const day = String(now.getDate()).padStart(2, '0');
      const year = now.getFullYear();
      setCurrentDateStr(`${month}/${day}/${year}`);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Dismiss Start Menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showStartMenu && 
        startMenuRef.current && 
        !startMenuRef.current.contains(e.target) &&
        startButtonRef.current &&
        !startButtonRef.current.contains(e.target)
      ) {
        setShowStartMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showStartMenu]);

  // Desktop screen icons
  const desktopIcons = [
    // Column 1 (Leftmost column)
    { id: 'photoshop', label: 'Photoshop Works', icon: '🎨', type: 'window', windowName: 'photoshop' },
    { id: 'paint', label: 'MS Paint', icon: '🖌️', type: 'window', windowName: 'paint' },
    { id: 'minesweeper', label: 'Minesweeper', icon: '💣', type: 'window', windowName: 'minesweeper' },
    { id: 'solitaire', label: 'Solitaire', icon: '🃏', type: 'window', windowName: 'solitaire' },
    { id: 'projects', label: 'Dev Projects', icon: '📁', type: 'window', windowName: 'projects' },
    { id: 'guestbook', label: 'Guest Book', icon: '📒', type: 'window', windowName: 'guestbook' },
    { id: 'instagram', label: 'Instagram', icon: '📸', type: 'link', url: 'https://instagram.com/adarshbhande-mock' },
    
    // Column 2 (Middle column)
    { id: 'resume', label: 'Resume.pdf', icon: '📄', type: 'link', url: portfolioData.personalInfo.resumeUrl },
    { id: 'github', label: 'GitHub', icon: '🐙', type: 'link', url: portfolioData.personalInfo.github },
    { id: 'about', label: 'About Me', icon: '👤', type: 'window', windowName: 'about' },
    { id: 'contact', label: 'Contact', icon: '📞', type: 'window', windowName: 'contact' },
    { id: 'music', label: 'Music Player', icon: '🎵', type: 'window', windowName: 'music' },
    { id: 'my-computer', label: 'My Computer', icon: '🖥️', type: 'window', windowName: 'projects' },
    { id: 'recycle', label: 'Recycle Bin', icon: '🗑️', type: 'mock', message: 'Recycle Bin is empty. (0 items)' },
    { id: 'terminal', label: 'cmd.exe', icon: '💻', type: 'terminal' },
    
    // Column 3 (Right column)
    { id: 'readme', label: 'README.txt', icon: '📝', type: 'readme' },
    { id: 'achievements', label: 'Achievements', icon: '🏆', type: 'window', windowName: 'skills' }
  ];


  // Windows 11 Start Menu Pinned items
  const w11PinnedApps = [
    { id: 'resume', label: 'Resume.pdf', icon: '📄', type: 'link', url: portfolioData.personalInfo.resumeUrl },
    { id: 'about', label: 'About Me', icon: '👤', type: 'window', windowName: 'about' },
    { id: 'projects', label: 'Projects', icon: '📁', type: 'window', windowName: 'projects' },
    { id: 'skills', label: 'Skills', icon: '🏆', type: 'window', windowName: 'skills' },
    { id: 'contact', label: 'Contact', icon: '📞', type: 'window', windowName: 'contact' },
    { id: 'terminal', label: 'cmd.exe', icon: '💻', type: 'terminal' },
    { id: 'photoshop', label: 'Photoshop Works', icon: '🎨', type: 'window', windowName: 'photoshop' },
    { id: 'paint', label: 'MS Paint', icon: '🖌️', type: 'window', windowName: 'paint' },
    { id: 'minesweeper', label: 'Minesweeper', icon: '💣', type: 'window', windowName: 'minesweeper' },
    { id: 'solitaire', label: 'Solitaire', icon: '🃏', type: 'window', windowName: 'solitaire' },
    { id: 'guestbook', label: 'Guest Book', icon: '📒', type: 'window', windowName: 'guestbook' },
    { id: 'music', label: 'Music Player', icon: '🎵', type: 'window', windowName: 'music' },
    { id: 'github', label: 'GitHub', icon: '🐙', type: 'link', url: portfolioData.personalInfo.github }
  ];


  // Windows 11 Start Menu Recommended files
  const w11RecommendedFiles = [
    { id: 'rec-readme', label: 'README.txt', icon: '📝', subtitle: 'Recently added', type: 'readme' },
    { id: 'rec-about', label: 'about.md', icon: '📝', subtitle: '15m ago', type: 'mock-file', content: portfolioData.fileSystem['about.md'] },
    { id: 'rec-skills', label: 'skills.json', icon: '📝', subtitle: 'From your browsing history', type: 'mock-file', content: portfolioData.fileSystem['skills.json'] },
    { id: 'rec-contact', label: 'contact.txt', icon: '📝', subtitle: 'From your browsing history', type: 'mock-file', content: portfolioData.fileSystem['contact.txt'] }
  ];

  const handleIconClick = (icon) => {
    setShowStartMenu(false);
    if (icon.type === 'window') {
      toggleWindow(icon.windowName, true);
    } else if (icon.type === 'terminal') {
      toggleWindow('terminal', true);
    } else if (icon.type === 'link') {
      window.open(icon.url, '_blank');
    } else if (icon.type === 'mock') {
      setOpenApp({ title: icon.label, icon: icon.icon, content: icon.message });
    } else if (icon.type === 'readme') {
      setOpenApp({ 
        title: 'README.txt — Notepad', 
        icon: '📝', 
        content: `File Name: README.txt\nOwner: Adarsh Bhande\n\nWelcome to my Creative OS Portfolio!\n\nThis application simulates a classic Windows XP shell.\nUse the terminal (cmd.exe) to explore the system at a developer level,\nor navigate the desktop folders to check my skills and project phases.\n\nEnjoy the trip down memory lane!` 
      });
    } else if (icon.type === 'mock-file') {
      setOpenApp({
        title: `${icon.label} — Notepad`,
        icon: '📝',
        content: icon.content
      });
    }
  };

  const handleStartMenuToggle = () => {
    setShowStartMenu(!showStartMenu);
  };

  const handleStartMenuLock = () => {
    setShowStartMenu(false);
    onLock();
  };

  const handleStartMenuLogout = () => {
    setShowStartMenu(false);
    if (onLogout) onLogout();
  };

  const filteredPinnedApps = searchQuery 
    ? w11PinnedApps.filter(app => app.label.toLowerCase().includes(searchQuery.toLowerCase()))
    : w11PinnedApps;

  // Check if a taskbar tab is open and currently active (not minimized)
  const isTabActive = (name) => {
    return activeWindows[name] && !minimizedWindows[name];
  };

  return (
    <div className="os-desktop-container" id="os-desktop">
      
      {/* Icon Grid */}
      <div className="desktop-grid">
        {desktopIcons.map((icon) => (
          <div 
            key={icon.id} 
            className="desktop-icon" 
            onClick={() => handleIconClick(icon)} 
            id={`icon-${icon.id}`}
          >
            <div className="desktop-icon-image">{icon.icon}</div>
            <div className="desktop-icon-label">{icon.label}</div>
          </div>
        ))}
      </div>

      {/* Windows 11 Centered Start Menu Popup Overlay */}
      {showStartMenu && (
        <div className="w11-start-menu" ref={startMenuRef} id="w11-start-menu">
          
          {/* Search bar at top */}
          <div className="w11-search-container">
            <span className="w11-search-icon">🔍</span>
            <input 
              type="text" 
              className="w11-search-input" 
              placeholder="Search for apps, settings, and documents"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>

          {/* Pinned section */}
          <div className="w11-section-header">
            <span className="w11-section-title">Pinned</span>
            <span className="w11-section-link" onClick={() => setSearchQuery('')}>All apps</span>
          </div>

          <div className="w11-pinned-grid">
            {filteredPinnedApps.map((app) => (
              <div 
                key={app.id} 
                className="w11-pinned-item"
                onClick={() => handleIconClick(app)}
                id={`pinned-${app.id}`}
              >
                <span className="w11-pinned-icon">{app.icon}</span>
                <span className="w11-pinned-label">{app.label}</span>
              </div>
            ))}
            {filteredPinnedApps.length === 0 && (
              <div style={{ gridColumn: 'span 6', textAlign: 'center', fontSize: '0.75rem', opacity: 0.6, marginTop: '20px' }}>
                No matching applications found.
              </div>
            )}
          </div>

          {/* Recommended section */}
          <div className="w11-section-header">
            <span className="w11-section-title">Recommended</span>
            <span className="w11-section-link">More &gt;</span>
          </div>

          <div className="w11-recommended-grid">
            {w11RecommendedFiles.map((file) => (
              <div 
                key={file.id} 
                className="w11-recommended-item"
                onClick={() => handleIconClick(file)}
              >
                <span className="w11-recommended-icon">{file.icon}</span>
                <div className="w11-recommended-details">
                  <span className="w11-recommended-title">{file.label}</span>
                  <span className="w11-recommended-time">{file.subtitle}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Footer bar */}
          <div className="w11-start-footer">
            {/* User Profile */}
            <div className="w11-footer-profile" onClick={() => handleIconClick({ type: 'window', windowName: 'about' })}>
              <div className="w11-footer-avatar"></div>
              <span className="w11-footer-name">Adarsh Bhande</span>
            </div>

            {/* Controls (Theme Switcher and Direct Lock Option) */}
            <div className="w11-footer-controls">
              {/* Settings Icon toggles theme */}
              <button 
                className="w11-footer-icon-btn" 
                title="Change UI Theme" 
                onClick={() => setActiveTheme(activeTheme === 'dark' ? 'light' : 'dark')}
              >
                ⚙️
              </button>
              
              {/* Direct Lock Button - Lock directly on click with custom keyhole padlock SVG */}
              <button 
                className="w11-footer-icon-btn" 
                title="Lock Session"
                onClick={handleStartMenuLock}
                id="w11-lock-button"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <defs>
                    <mask id="lock-btn-mask">
                      {/* White part is solid visible */}
                      <rect width="24" height="24" fill="#ffffff" />
                      {/* Black part cuts out the keyhole */}
                      <circle cx="12" cy="14.5" r="1.8" fill="#000000" />
                      <path d="M11.2 14.5h1.6v3.2a0.8 0.8 0 0 1-1.6 0z" fill="#000000" />
                    </mask>
                  </defs>
                  {/* Lock body with keyhole cutout mask */}
                  <g mask="url(#lock-btn-mask)">
                    {/* Shackle */}
                    <path d="M12 2C8.69 2 6 4.69 6 8v3.5h12V8c0-3.31-2.69-6-6-6zm3.5 9.5h-7V8c0-1.93 1.57-3.5 3.5-3.5s3.5 1.57 3.5 3.5v3.5z" />
                    {/* Body */}
                    <rect x="4" y="11" width="16" height="11" rx="2" />
                  </g>
                </svg>
              </button>

              {/* Log Out Button — exits OS and zooms back to room scene */}
              <button 
                className="w11-footer-icon-btn w11-logout-btn" 
                title="Log Out"
                onClick={handleStartMenuLogout}
                id="w11-logout-button"
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* Desktop Windows/Modals */}
      
      {/* ABOUT ME WINDOW */}
      {activeWindows.about && (
        <WindowFrame 
          title="About Me — Adarsh Bhande" 
          icon="👤"
          onClose={() => toggleWindow('about', false)}
          onMinimize={() => onMinimizeWindow('about')}
          onMaximize={() => onMaximizeWindow('about')}
          isMaximized={maximizedWindows.about}
          isMinimized={minimizedWindows.about}
        >
          <div className="modal-header">
            <h2 className="modal-title">Adarsh Bhande</h2>
            <div className="modal-subtitle">Creative Developer | Student of Software Engineering & IT</div>
          </div>
          <div className="modal-body">
            {portfolioData.personalInfo.bio.map((p, idx) => (
              <p key={idx} className="about-paragraph">{p}</p>
            ))}

            <div className="about-timeline">
              <h3 className="about-timeline-title">🎯 Current Interests</h3>
              <p>Developing robust reactive applications, researching browser graphics (WebGL, Canvas), optimizing styling setups (Vanilla CSS variables), and configuring command-line shell interpreters.</p>
            </div>
          </div>
        </WindowFrame>
      )}

      {/* PROJECTS WINDOW */}
      {activeWindows.projects && (
        <WindowFrame 
          title="Portfolio Project Phases" 
          icon="📁"
          onClose={() => toggleWindow('projects', false)}
          onMinimize={() => onMinimizeWindow('projects')}
          onMaximize={() => onMaximizeWindow('projects')}
          isMaximized={maximizedWindows.projects}
          isMinimized={minimizedWindows.projects}
        >
          <div className="modal-header">
            <h2 className="modal-title">Interactive Portfolio Project</h2>
            <div className="modal-subtitle">One Unified Showcase, Crafted and Built in Stages</div>
          </div>
          <div className="modal-body">
            <div className="projects-grid">
              {portfolioData.projects.map((proj) => (
                <div key={proj.id} className="project-card" id={`project-${proj.id}`}>
                  <div className="project-card-header">
                    <h3 className="project-name">{proj.name}</h3>
                    <span className="project-phase-badge">{proj.id.toUpperCase()}</span>
                  </div>
                  <p className="project-tagline">{proj.tagline}</p>
                  <p className="project-desc">{proj.description}</p>
                  <div className="project-tags">
                    {proj.tags.map((t, index) => (
                      <span key={index} className="project-tag">{t}</span>
                    ))}
                  </div>
                  <div className="project-links">
                    <a 
                      href={proj.demo} 
                      className="project-link-btn primary"
                      target="_blank" 
                      rel="noopener noreferrer"
                      onClick={(e) => proj.demo === '#' && e.preventDefault()}
                    >
                      🔗 Live Demo
                    </a>
                    <a 
                      href={proj.github} 
                      className="project-link-btn secondary"
                      target="_blank" 
                      rel="noopener noreferrer"
                    >
                      📁 Source Code
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WindowFrame>
      )}

      {/* SKILLS WINDOW (Achievements) */}
      {activeWindows.skills && (
        <WindowFrame 
          title="Technical Competence & Skills" 
          icon="🏆"
          onClose={() => toggleWindow('skills', false)}
          onMinimize={() => onMinimizeWindow('skills')}
          onMaximize={() => onMaximizeWindow('skills')}
          isMaximized={maximizedWindows.skills}
          isMinimized={minimizedWindows.skills}
        >
          <div className="modal-header">
            <h2 className="modal-title">Tech Stack & Fluency</h2>
            <div className="modal-subtitle">Grouped technologies and language fluencies</div>
          </div>
          <div className="modal-body">
            <div className="skills-container">
              {portfolioData.skills.map((cat, idx) => (
                <div key={idx} className="skills-category">
                  <h3 className="skills-category-title">{cat.category}</h3>
                  <div className="skills-list">
                    {cat.items.map((skill, sIdx) => (
                      <div key={sIdx} className="skill-item">
                        <span className="skill-icon">🔹</span>
                        <span className="skill-name">{skill.name}</span>
                        <span style={{ fontSize: '0.75rem', opacity: 0.6 }}>({skill.level})</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </WindowFrame>
      )}

      {/* CONTACT WINDOW */}
      {activeWindows.contact && (
        <WindowFrame 
          title="Get in Touch" 
          icon="📞"
          onClose={() => toggleWindow('contact', false)}
          onMinimize={() => onMinimizeWindow('contact')}
          onMaximize={() => onMaximizeWindow('contact')}
          isMaximized={maximizedWindows.contact}
          isMinimized={minimizedWindows.contact}
        >
          <div className="modal-header">
            <h2 className="modal-title">Contact Channels</h2>
            <div className="modal-subtitle">Feel free to connect or drop a message!</div>
          </div>
          <div className="modal-body">
            <div className="contact-list">
              <a href={`mailto:${portfolioData.personalInfo.email}`} className="contact-card" id="contact-email">
                <span className="contact-icon">📧</span>
                <div className="contact-details">
                  <span className="contact-label">Email</span>
                  <span className="contact-value">{portfolioData.personalInfo.email}</span>
                </div>
              </a>

              <a href={portfolioData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="contact-card" id="contact-github">
                <span className="contact-icon">🐙</span>
                <div className="contact-details">
                  <span className="contact-label">GitHub</span>
                  <span className="contact-value">github.com/adarshbhande-mock</span>
                </div>
              </a>

              <a href={portfolioData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="contact-card" id="contact-linkedin">
                <span className="contact-icon">🔗</span>
                <div className="contact-details">
                  <span className="contact-label">LinkedIn</span>
                  <span className="contact-value">linkedin.com/in/adarshbhande-mock</span>
                </div>
              </a>
            </div>
          </div>
        </WindowFrame>
      )}

      {/* TERMINAL WINDOW (Integrated as standard desktop app window) */}
      {activeWindows.terminal && (
        <WindowFrame
          title="Command Prompt"
          icon="💻"
          className="terminal-window"
          onClose={() => toggleWindow('terminal', false)}
          onMinimize={() => onMinimizeWindow('terminal')}
          onMaximize={() => onMaximizeWindow('terminal')}
          isMaximized={maximizedWindows.terminal}
          isMinimized={minimizedWindows.terminal}
        >
          <Terminal 
            activeTheme={activeTheme}
            setActiveTheme={setActiveTheme}
            onClose={() => toggleWindow('terminal', false)}
          />
        </WindowFrame>
      )}

      {/* MUSIC PLAYER APPLICATION WINDOW */}
      {activeWindows.music && (
        <WindowFrame
          title="Groove Music — Player"
          icon="🎵"
          onClose={() => toggleWindow('music', false)}
          onMinimize={() => onMinimizeWindow('music')}
          onMaximize={() => onMaximizeWindow('music')}
          isMinimized={minimizedWindows.music}
          isMaximized={maximizedWindows.music}
        >
          <MusicPlayer
            currentTrackIndex={currentTrackIndex}
            setCurrentTrackIndex={setCurrentTrackIndex}
            isPlaying={isPlayingMusic}
            setIsPlaying={setIsPlayingMusic}
            isLocked={isLocked}
            currentScene={currentScene}
          />
        </WindowFrame>
      )}

      {/* MINESWEEPER GAME WINDOW */}
      {activeWindows.minesweeper && (
        <WindowFrame
          title="Minesweeper"
          icon="💣"
          onClose={() => toggleWindow('minesweeper', false)}
          onMinimize={() => onMinimizeWindow('minesweeper')}
          onMaximize={() => onMaximizeWindow('minesweeper')}
          isMinimized={minimizedWindows.minesweeper}
          isMaximized={maximizedWindows.minesweeper}
        >
          <Minesweeper />
        </WindowFrame>
      )}

      {/* SOLITAIRE CARD GAME WINDOW */}
      {activeWindows.solitaire && (
        <WindowFrame
          title="Solitaire"
          icon="🃏"
          onClose={() => toggleWindow('solitaire', false)}
          onMinimize={() => onMinimizeWindow('solitaire')}
          onMaximize={() => onMaximizeWindow('solitaire')}
          isMinimized={minimizedWindows.solitaire}
          isMaximized={maximizedWindows.solitaire}
        >
          <Solitaire />
        </WindowFrame>
      )}

      {/* MS PAINT DRAWING WINDOW */}
      {activeWindows.paint && (
        <WindowFrame
          title="MS Paint — Canvas"
          icon="🖌️"
          onClose={() => toggleWindow('paint', false)}
          onMinimize={() => onMinimizeWindow('paint')}
          onMaximize={() => onMaximizeWindow('paint')}
          isMinimized={minimizedWindows.paint}
          isMaximized={maximizedWindows.paint}
        >
          <PaintApp />
        </WindowFrame>
      )}

      {/* GUEST BOOK WINDOW */}
      {activeWindows.guestbook && (
        <WindowFrame
          title="Visitor Guest Book"
          icon="📒"
          onClose={() => toggleWindow('guestbook', false)}
          onMinimize={() => onMinimizeWindow('guestbook')}
          onMaximize={() => onMaximizeWindow('guestbook')}
          isMinimized={minimizedWindows.guestbook}
          isMaximized={maximizedWindows.guestbook}
        >
          <GuestBook />
        </WindowFrame>
      )}

      {/* PHOTOSHOP CREATIVE GALLERY WINDOW */}
      {activeWindows.photoshop && (
        <WindowFrame
          title="Photoshop & Design Showcase"
          icon="🎨"
          onClose={() => toggleWindow('photoshop', false)}
          onMinimize={() => onMinimizeWindow('photoshop')}
          onMaximize={() => onMaximizeWindow('photoshop')}
          isMinimized={minimizedWindows.photoshop}
          isMaximized={maximizedWindows.photoshop}
        >
          <PhotoshopGallery />
        </WindowFrame>
      )}


      {/* MOCK APPLICATION NOTEPAD/WINDOWS */}
      {openApp && (
        <WindowFrame
          title={openApp.title}
          icon={openApp.icon}
          onClose={() => setOpenApp(null)}
        >
          <div style={{ whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-dark)', lineHeight: 1.6 }}>
            {openApp.content}
          </div>
        </WindowFrame>
      )}

      {/* Windows 11 Center-Aligned Taskbar */}
      <div className="w11-taskbar">
        
        {/* Left Side: Weather Widget */}
        <div className="w11-taskbar-weather" title="Local Weather: India">
          <span style={{ fontSize: '1.25rem' }}>☁️</span>
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.2 }}>
            <span>22°C</span>
            <span style={{ fontSize: '0.6rem', opacity: 0.7 }}>Cloudy</span>
          </div>
        </div>

        {/* Center Side: App Launcher & Icons (Centered) */}
        <div className="w11-taskbar-center">
          {/* Windows Start Button (SVG Windows Logo) */}
          <button 
            className={`w11-taskbar-btn ${showStartMenu ? 'active' : ''}`}
            ref={startButtonRef}
            onClick={handleStartMenuToggle}
            id="xp-start-button"
            title="Start"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <span className="w11-taskbar-icon">
              <svg viewBox="0 0 100 100" width="18" height="18">
                <rect x="0" y="0" width="46" height="46" fill="#0078d4" />
                <rect x="54" y="0" width="46" height="46" fill="#0078d4" />
                <rect x="0" y="54" width="46" height="46" fill="#0078d4" />
                <rect x="54" y="54" width="46" height="46" fill="#0078d4" />
              </svg>
            </span>
            <div className="w11-taskbar-indicator"></div>
          </button>

          {/* About Me Tab */}
          <button 
            className={`w11-taskbar-btn ${isTabActive('about') ? 'active' : ''}`}
            onClick={() => onTaskbarClick('about')}
            title="About Me"
            style={{ display: activeWindows.about ? 'flex' : 'none' }}
          >
            <span className="w11-taskbar-icon">👤</span>
            <div className="w11-taskbar-indicator"></div>
          </button>

          {/* Projects Tab */}
          <button 
            className={`w11-taskbar-btn ${isTabActive('projects') ? 'active' : ''}`}
            onClick={() => onTaskbarClick('projects')}
            title="Projects"
            style={{ display: activeWindows.projects ? 'flex' : 'none' }}
          >
            <span className="w11-taskbar-icon">📁</span>
            <div className="w11-taskbar-indicator"></div>
          </button>

          {/* Skills Tab */}
          <button 
            className={`w11-taskbar-btn ${isTabActive('skills') ? 'active' : ''}`}
            onClick={() => onTaskbarClick('skills')}
            title="Skills"
            style={{ display: activeWindows.skills ? 'flex' : 'none' }}
          >
            <span className="w11-taskbar-icon">🏆</span>
            <div className="w11-taskbar-indicator"></div>
          </button>

          {/* Contact Tab */}
          <button 
            className={`w11-taskbar-btn ${isTabActive('contact') ? 'active' : ''}`}
            onClick={() => onTaskbarClick('contact')}
            title="Contact"
            style={{ display: activeWindows.contact ? 'flex' : 'none' }}
          >
            <span className="w11-taskbar-icon">📞</span>
            <div className="w11-taskbar-indicator"></div>
          </button>

          {/* Terminal Command Prompt Trigger */}
          <button 
            className={`w11-taskbar-btn ${isTabActive('terminal') ? 'active' : ''}`}
            onClick={() => onTaskbarClick('terminal')}
            title="Command Prompt"
            style={{ display: activeWindows.terminal ? 'flex' : 'none' }}
          >
            <span className="w11-taskbar-icon">💻</span>
            <div className="w11-taskbar-indicator"></div>
          </button>

          {/* Music Player Tab */}
          <button 
            className={`w11-taskbar-btn ${isTabActive('music') ? 'active' : ''}`}
            onClick={() => onTaskbarClick('music')}
            title="Music Player"
            style={{ display: activeWindows.music ? 'flex' : 'none' }}
          >
            <span className="w11-taskbar-icon">🎵</span>
            <div className="w11-taskbar-indicator"></div>
          </button>

          {/* Minesweeper Tab */}
          <button 
            className={`w11-taskbar-btn ${isTabActive('minesweeper') ? 'active' : ''}`}
            onClick={() => onTaskbarClick('minesweeper')}
            title="Minesweeper"
            style={{ display: activeWindows.minesweeper ? 'flex' : 'none' }}
          >
            <span className="w11-taskbar-icon">💣</span>
            <div className="w11-taskbar-indicator"></div>
          </button>

          {/* Solitaire Tab */}
          <button 
            className={`w11-taskbar-btn ${isTabActive('solitaire') ? 'active' : ''}`}
            onClick={() => onTaskbarClick('solitaire')}
            title="Solitaire"
            style={{ display: activeWindows.solitaire ? 'flex' : 'none' }}
          >
            <span className="w11-taskbar-icon">🃏</span>
            <div className="w11-taskbar-indicator"></div>
          </button>

          {/* MS Paint Tab */}
          <button 
            className={`w11-taskbar-btn ${isTabActive('paint') ? 'active' : ''}`}
            onClick={() => onTaskbarClick('paint')}
            title="MS Paint"
            style={{ display: activeWindows.paint ? 'flex' : 'none' }}
          >
            <span className="w11-taskbar-icon">🖌️</span>
            <div className="w11-taskbar-indicator"></div>
          </button>

          {/* Guest Book Tab */}
          <button 
            className={`w11-taskbar-btn ${isTabActive('guestbook') ? 'active' : ''}`}
            onClick={() => onTaskbarClick('guestbook')}
            title="Guest Book"
            style={{ display: activeWindows.guestbook ? 'flex' : 'none' }}
          >
            <span className="w11-taskbar-icon">📒</span>
            <div className="w11-taskbar-indicator"></div>
          </button>

          {/* Photoshop Works Tab */}
          <button 
            className={`w11-taskbar-btn ${isTabActive('photoshop') ? 'active' : ''}`}
            onClick={() => onTaskbarClick('photoshop')}
            title="Photoshop Works"
            style={{ display: activeWindows.photoshop ? 'flex' : 'none' }}
          >
            <span className="w11-taskbar-icon">🎨</span>
            <div className="w11-taskbar-indicator"></div>
          </button>


          {/* Mock open document Notepad viewer tab */}
          {openApp && (
            <button 
              className="w11-taskbar-btn active"
              onClick={() => setOpenApp(null)}
              title={openApp.title}
            >
              <span className="w11-taskbar-icon">{openApp.icon}</span>
              <div className="w11-taskbar-indicator"></div>
            </button>
          )}
        </div>

        {/* Right Side: Tray Info & Vertically Stacked Clock */}
        <div className="w11-taskbar-right">
          <div className="w11-taskbar-tray">
            <span title="Volume 100%">🔊</span>
            <span title="Connected to Network">📶</span>
            <span title="Battery: Charging 100%">🔋</span>
          </div>
          
          {/* Stacked clock and date */}
          <div className="w11-taskbar-clock-box">
            <span>{clockTime}</span>
            <span style={{ fontSize: '0.65rem', opacity: 0.85 }}>{currentDateStr}</span>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Desktop;
