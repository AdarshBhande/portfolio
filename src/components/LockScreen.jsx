import React, { useState, useEffect } from 'react';
import desktopWallpaper from '../assets/desktop-wallpaper-new.jpeg';

const LockScreen = ({ onUnlock, onLogout }) => {
  const [time, setTime] = useState('');
  const [dateStr, setDateStr] = useState('');
  const [slideUp, setSlideUp] = useState(false);

  // Update clock and date inside lock screen
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      
      // Clock: HH:MM AM/PM
      let hours = now.getHours();
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 should be 12
      setTime(`${String(hours).padStart(2, '0')}:${minutes} ${ampm}`);

      // Date: Day, DD Month, YYYY
      const options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
      setDateStr(now.toLocaleDateString('en-US', options));
    };

    updateTime();
    const interval = setInterval(updateTime, 60000); // Update every minute
    return () => clearInterval(interval);
  }, []);

  const handleScreenClick = () => {
    if (!slideUp) {
      setSlideUp(true);
      // Wait for slide-up animation (600ms) to complete before transitioning views
      setTimeout(() => {
        onUnlock();
      }, 600);
    }
  };

  // Keyboard support to unlock
  useEffect(() => {
    const handleKeyDown = () => {
      handleScreenClick();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [slideUp]);

  const handleLogoutClick = (e) => {
    e.stopPropagation(); // Prevent triggering lock screen unlock
    if (onLogout) onLogout();
  };

  return (
    <div 
      className="lockscreen-root" 
      onClick={handleScreenClick}
      style={{
        width: '100vw',
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 99999,
        overflow: 'hidden',
        fontFamily: "var(--font-display)",
        userSelect: 'none',
        // Layered background using Miles Morales wallpaper
        background: `url(${desktopWallpaper}) no-repeat center center`,
        backgroundSize: 'cover',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
      }}
    >
      {/* Blurred overlay backdrop to make text pop */}
      <div 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backdropFilter: 'blur(5px)',
          zIndex: 1
        }}
      ></div>

      {/* Lock Screen Cover Screen (Slides Up) */}
      <div 
        className={`lockscreen-cover ${slideUp ? 'slide-up-out' : ''}`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '40px 60px',
          zIndex: 10,
          transition: 'transform 0.6s cubic-bezier(0.85, 0, 0.15, 1)',
          transform: slideUp ? 'translateY(-100%)' : 'translateY(0)'
        }}
      >
        {/* Weather Indicator */}
        <div 
          style={{
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontSize: '1rem',
            fontWeight: 500,
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            position: 'absolute',
            bottom: '40px',
            left: '40px',
            zIndex: 12
          }}
        >
          <span style={{ fontSize: '1.5rem' }}>☁️</span>
          <div>
            <div>22°C</div>
            <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>Cloudy (India)</div>
          </div>
        </div>

        {/* Log Out Button at Lockscreen (Bottom Right) */}
        <button
          onClick={handleLogoutClick}
          onMouseDown={(e) => e.stopPropagation()}
          className="lockscreen-logout-btn"
        >
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ pointerEvents: 'none' }}>
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Log Out
        </button>

        {/* Center Clock & Date */}
        <div 
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#ffffff',
            textAlign: 'center',
            marginTop: '-5%',
            zIndex: 12
          }}
        >
          <div 
            style={{
              fontSize: '5.5rem',
              fontWeight: 700,
              textShadow: '0 4px 12px rgba(0,0,0,0.6)',
              letterSpacing: '-1px',
              fontFamily: 'var(--font-mono)'
            }}
          >
            {time.split(' ')[0]}
            <span style={{ fontSize: '2rem', marginLeft: '8px' }}>{time.split(' ')[1]}</span>
          </div>
          <div 
            style={{
              fontSize: '2rem',
              fontWeight: 500,
              opacity: 0.9,
              marginTop: '10px',
              textShadow: '0 2px 8px rgba(0,0,0,0.6)'
            }}
          >
            {dateStr}
          </div>

          {/* Central Lock Icon (Vector Lock Screen Symbol) */}
          <div 
            style={{
              marginTop: '32px',
              marginBottom: '16px',
              animation: 'bounce 2.5s infinite',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <svg 
              viewBox="0 0 24 24" 
              width="44" 
              height="44" 
              fill="#ffffff"
              style={{
                filter: 'drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45))'
              }}
            >
              <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
            </svg>
          </div>

          <div 
            style={{
              fontSize: '1.1rem',
              opacity: 0.8,
              marginTop: '20px',
              textShadow: '0 1px 4px rgba(0,0,0,0.6)',
              fontWeight: 600
            }}
          >
            🖱️ Click or press any key to swipe up
          </div>
        </div>
      </div>
    </div>
  );
};

export default LockScreen;
