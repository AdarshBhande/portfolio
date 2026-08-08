import React, { useState, useEffect, useRef } from 'react';
import IntroLoader from './components/IntroLoader';
import RoomScene from './components/RoomScene';
import LockScreen from './components/LockScreen';
import Desktop from './components/Desktop';
import './index.css';

function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  // Scene state machine: 'room' | 'zooming-in' | 'os' | 'zooming-out'
  const [currentScene, setCurrentScene] = useState('room');

  const [isLocked, setIsLocked] = useState(true);
  const [isGlitching, setIsGlitching] = useState(false);
  const [hasGlitched, setHasGlitched] = useState(false);
  const [activeTheme, setActiveTheme] = useState('dark');

  // New States for periodic glitching and Windows 11 style notification toast
  const [isSubtleGlitching, setIsSubtleGlitching] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastFadeIn, setToastFadeIn] = useState(false);

  // Keep track of the current periodic glitch timer interval (starts at 10s)
  const currentGlitchInterval = useRef(10);

  // Track if windows are running/open (present in taskbar)
  const [activeWindows, setActiveWindows] = useState({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    terminal: false
  });

  // Track if windows are minimized
  const [minimizedWindows, setMinimizedWindows] = useState({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    terminal: false
  });

  // Track if windows are maximized (covering workspace)
  const [maximizedWindows, setMaximizedWindows] = useState({
    about: false,
    projects: false,
    skills: false,
    contact: false,
    terminal: false
  });

  // Apply light/dark theme global variables
  useEffect(() => {
    const root = document.documentElement;
    if (activeTheme === 'light') {
      root.classList.add('light');
    } else {
      root.classList.remove('light');
    }
  }, [activeTheme]);

  // ─── ROOM SCENE TRANSITIONS ───────────────────────────────────

  // Handle clicking the laptop in the room scene
  const handleEnterLaptop = () => {
    setCurrentScene('zooming-in');

    // After zoom-in animation completes, switch to OS
    setTimeout(() => {
      setCurrentScene('os');
      setIsLocked(true);
    }, 900);
  };

  // Handle logging out from the OS back to the room
  const handleLogout = () => {
    // Close all windows first
    setActiveWindows({
      about: false, projects: false, skills: false, contact: false, terminal: false
    });
    setMinimizedWindows({
      about: false, projects: false, skills: false, contact: false, terminal: false
    });
    setMaximizedWindows({
      about: false, projects: false, skills: false, contact: false, terminal: false
    });

    // Dismiss any active toast
    setShowToast(false);
    setToastFadeIn(false);

    setCurrentScene('zooming-out');

    // After zoom-out animation, return to room
    setTimeout(() => {
      setCurrentScene('room');
      setIsLocked(true);
      setHasGlitched(false);
      setIsGlitching(false);
      setIsSubtleGlitching(false);
      currentGlitchInterval.current = 10;
    }, 900);
  };

  // ─── LOCK SCREEN HANDLERS ─────────────────────────────────────

  // Handle swipe unlock
  const handleUnlock = () => {
    setIsLocked(false);
  };

  // Handle lock screen trigger (from start menu lock button)
  const handleLock = () => {
    setIsLocked(true);
    // DO NOT reset hasGlitched, so subsequent unlocks skip auto-opening the terminal
  };

  // ─── GLITCH SEQUENCES ─────────────────────────────────────────

  // Scripted glitch sequence on first-time login
  useEffect(() => {
    if (currentScene !== 'os') return;
    if (!isLocked && !hasGlitched) {
      const timer = setTimeout(() => {
        setIsGlitching(true);
        
        const glitchDuration = setTimeout(() => {
          setIsGlitching(false);
          setHasGlitched(true);
          // Auto-open terminal window inside the desktop environment
          setActiveWindows(prev => ({ ...prev, terminal: true }));
          setMinimizedWindows(prev => ({ ...prev, terminal: false }));
          setMaximizedWindows(prev => ({ ...prev, terminal: false }));

          // Trigger Windows 11 toast notification 600ms after glitch ends
          setTimeout(() => {
            setShowToast(true);
            setTimeout(() => setToastFadeIn(true), 50);
          }, 600);

        }, 2500);

        return () => clearTimeout(glitchDuration);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isLocked, hasGlitched, currentScene]);

  // Toast Dismissal Handler
  const handleDismissToast = () => {
    setToastFadeIn(false);
    setTimeout(() => {
      setShowToast(false);
    }, 400); // Matches transition duration
  };

  // Auto-dismiss notification toast after 8 seconds
  useEffect(() => {
    if (showToast) {
      const autoDismissTimer = setTimeout(() => {
        handleDismissToast();
      }, 8000);
      return () => clearTimeout(autoDismissTimer);
    }
  }, [showToast]);

  // Recurring screen glitch blur/flicker effect
  useEffect(() => {
    if (currentScene !== 'os' || isLocked) return;

    let timeoutId = null;

    const triggerSubtleGlitch = () => {
      setIsSubtleGlitching(true);

      // Subtle glitch overlay runs for 1.4 seconds
      setTimeout(() => {
        setIsSubtleGlitching(false);
      }, 1400);

      // Increment interval by 10 seconds
      currentGlitchInterval.current = currentGlitchInterval.current + 10;
      const delayMs = currentGlitchInterval.current * 1000;

      timeoutId = setTimeout(triggerSubtleGlitch, delayMs);
    };

    // First glitch scheduled at 10 seconds
    timeoutId = setTimeout(triggerSubtleGlitch, 10000);

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [isLocked, currentScene]);

  // ─── WINDOW MANAGEMENT ────────────────────────────────────────

  // Toggle running state of a window
  const toggleWindow = (windowName, isOpen) => {
    setActiveWindows(prev => ({
      ...prev,
      [windowName]: isOpen
    }));
    if (isOpen) {
      // Restore window if opened
      setMinimizedWindows(prev => ({ ...prev, [windowName]: false }));
    }
  };

  // Minimize a window
  const handleMinimizeWindow = (windowName) => {
    setMinimizedWindows(prev => ({
      ...prev,
      [windowName]: true
    }));
  };

  // Maximize or restore a window
  const handleMaximizeWindow = (windowName) => {
    setMaximizedWindows(prev => ({
      ...prev,
      [windowName]: !prev[windowName]
    }));
  };

  // Taskbar icon click handler
  const handleTaskbarClick = (windowName) => {
    if (!activeWindows[windowName]) {
      // App is closed, launch it
      toggleWindow(windowName, true);
    } else if (minimizedWindows[windowName]) {
      // App is minimized, restore it
      setMinimizedWindows(prev => ({ ...prev, [windowName]: false }));
    } else {
      // App is open and visible, minimize it
      setMinimizedWindows(prev => ({ ...prev, [windowName]: true }));
    }
  };

  return (
    <div className={`app-container ${isSubtleGlitching ? 'subtle-glitch-active' : ''}`}>

      {/* INTRO LOAD SCREEN — Pixel-art lighter ignition overlay */}
      {!isIntroComplete && (
        <IntroLoader onComplete={() => setIsIntroComplete(true)} />
      )}

      {/* ROOM SCENE — Pixel art GIF landing */}
      {currentScene === 'room' && (
        <RoomScene onEnterLaptop={handleEnterLaptop} />
      )}

      {/* ZOOM-IN TRANSITION — Room → OS */}
      {currentScene === 'zooming-in' && (
        <div className="zoom-transition zoom-in-active">
          <div className="zoom-room-layer">
            <div className="room-stage">
              <img
                src={`/images/pixel-art-room.gif?t=${Date.now()}`}
                alt="Pixel art room"
                className="room-gif"
                draggable={false}
              />
            </div>
          </div>
          <div className="zoom-os-layer">
            <div className="zoom-os-placeholder">
              <div className="zoom-boot-text">
                <span className="boot-dot">●</span> Booting BHANDE OS...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ZOOM-OUT TRANSITION — OS → Room */}
      {currentScene === 'zooming-out' && (
        <div className="zoom-transition zoom-out-active">
          <div className="zoom-room-layer">
            <div className="room-stage">
              <img
                src={`/images/pixel-art-room.gif?t=${Date.now()}`}
                alt="Pixel art room"
                className="room-gif"
                draggable={false}
              />
            </div>
          </div>
          <div className="zoom-os-layer">
            <div className="zoom-os-placeholder">
              <div className="zoom-boot-text">
                <span className="boot-dot">●</span> Logging out...
              </div>
            </div>
          </div>
        </div>
      )}

      {/* OS ENVIRONMENT — Lock Screen + Desktop */}
      {currentScene === 'os' && (
        <>
          {/* 1. LOCK SCREEN */}
          {isLocked && <LockScreen onUnlock={handleUnlock} onLogout={handleLogout} />}

          {/* 2. SECURITY GLITCH SEQUENCE (Only runs once) */}
          {isGlitching && (
            <div className="glitch-overlay">
              <div className="glitch-scanlines"></div>
              <div style={{ zIndex: 1000001, textShadow: '0 0 5px rgba(57, 255, 20, 0.8)' }}>
                <p className="terminal-log-system">&gt;&gt;&gt; [system] warning: security override detected...</p>
                <p className="terminal-log-error">&gt;&gt;&gt; [system] port 5173 vulnerability triggered.</p>
                <p className="terminal-log-highlight" style={{ margin: '15px 0' }}>&gt;&gt;&gt; bypass terminal initializing...</p>
                <p>&gt;&gt;&gt; establishing secure handshake...</p>
                <p>&gt;&gt;&gt; loading memory segments...</p>
                <p className="terminal-log-success" style={{ margin: '15px 0' }}>&gt;&gt;&gt; [system] creative control transferred to Adarsh Bhande.</p>
                <p>&gt;&gt;&gt; launching diagnostics.exe...</p>
                <div className="cursor-blink" style={{ backgroundColor: '#39ff14', width: '10px', height: '18px', marginTop: '10px' }}></div>
              </div>
            </div>
          )}

          {/* 3. CORE DESKTOP SYSTEM */}
          {!isLocked && (
            <>
              <Desktop 
                activeTheme={activeTheme}
                setActiveTheme={setActiveTheme}
                activeWindows={activeWindows}
                minimizedWindows={minimizedWindows}
                maximizedWindows={maximizedWindows}
                toggleWindow={toggleWindow}
                onMinimizeWindow={handleMinimizeWindow}
                onMaximizeWindow={handleMaximizeWindow}
                onTaskbarClick={handleTaskbarClick}
                onLock={handleLock}
                onLogout={handleLogout}
              />
            </>
          )}

          {/* 4. WINDOWS 11 STYLE NOTIFICATION TOAST */}
          {showToast && (
            <div className="w11-toast-container">
              <div className={`w11-toast ${toastFadeIn ? 'show' : ''}`}>
                <div className="w11-toast-header">
                  <div className="w11-toast-app-info">
                    <div className="w11-toast-app-icon">💻</div>
                    <span>Command Prompt</span>
                  </div>
                  <button className="w11-toast-close" onClick={handleDismissToast} aria-label="Dismiss Notification">×</button>
                </div>
                <div className="w11-toast-body">
                  <div className="w11-toast-title">Access Override Successful</div>
                  <div className="w11-toast-message">
                    System control has been successfully granted to Adarsh Bhande. I can see you...
                  </div>
                </div>
                <div className="w11-toast-actions">
                  <button className="w11-toast-btn primary" onClick={() => { handleDismissToast(); toggleWindow('terminal', true); }}>
                    Open Terminal
                  </button>
                  <button className="w11-toast-btn" onClick={handleDismissToast}>
                    Dismiss
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
