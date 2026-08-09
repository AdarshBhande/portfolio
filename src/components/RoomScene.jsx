import React, { useState, useEffect } from 'react';
import roomGif from '../assets/pixel-art-room.gif';

// Hotspot data — each item has an invisible hover zone + a label that appears at the edge
const ROOM_HOTSPOTS = [
  {
    id: 'rainy-city',
    title: 'RAINY CITY VIEW',
    description: 'The window shows a calm, rainy city with lights from buildings.',
    // Invisible hover zone over the object
    top: '2%', left: '22%', width: '42%', height: '47%',
    // Label position (where the text appears, edge of image)
    labelTop: '6%', labelLeft: '2%',
    arrowDir: 'right',
  },
  {
    id: 'computer-monitor',
    title: 'COMPUTER MONITOR',
    description: 'Used for work or browsing. The open windows on screen show an active setup.',
    top: '28%', left: '2%', width: '19%', height: '42%',
    labelTop: '34%', labelLeft: '2%',
    arrowDir: 'right',
  },
  {
    id: 'cat-window',
    title: 'CAT BY THE WINDOW',
    description: 'Curious and calm, enjoying the sound of rain and city lights.',
    top: '26%', left: '22%', width: '12%', height: '40%',
    labelTop: '28%', labelLeft: '22%',
    arrowDir: 'down',
  },
  {
    id: 'keyboard-mouse',
    title: 'KEYBOARD & MOUSE',
    description: 'Essential tools for getting things done.',
    top: '76%', left: '2%', width: '26%', height: '12%',
    labelTop: '82%', labelLeft: '2%',
    arrowDir: null,
  },
  {
    id: 'desk-lamp',
    title: 'DESK LAMP',
    description: 'Provides warm light for focused work at night.',
    top: '14%', left: '42%', width: '14%', height: '30%',
    labelTop: '36%', labelLeft: '54%',
    arrowDir: null,
  },
  {
    id: 'books-notebooks',
    title: 'BOOKS & NOTEBOOKS',
    description: 'For ideas, planning, and staying organized.',
    top: '55%', left: '56%', width: '12%', height: '28%',
    labelTop: '82%', labelLeft: '47%',
    arrowDir: null,
  },
  {
    id: 'wall-grid',
    title: 'WALL GRID',
    description: 'For notes, schedules, and important reminders.',
    top: '2%', left: '68%', width: '14%', height: '18%',
    labelTop: '5%', labelLeft: '84%',
    arrowDir: null,
  },
  {
    id: 'black-cat',
    title: 'BLACK CAT',
    description: 'The silent guardian of the room.',
    top: '18%', left: '76%', width: '14%', height: '22%',
    labelTop: '22%', labelLeft: '84%',
    arrowDir: null,
  },
  {
    id: 'fish-tank',
    title: 'FISH TANK',
    description: 'A touch of life and calm in the workspace.',
    top: '34%', left: '68%', width: '30%', height: '38%',
    labelTop: '48%', labelLeft: '84%',
    arrowDir: null,
  },
  {
    id: 'bookshelf',
    title: 'BOOKSHELF',
    description: 'Filled with stories, knowledge, and inspiration.',
    top: '76%', left: '70%', width: '28%', height: '22%',
    labelTop: '82%', labelLeft: '84%',
    arrowDir: null,
  },
];

const RoomScene = ({ onEnterLaptop }) => {
  const [showArrow, setShowArrow] = useState(false);
  const [gifKey, setGifKey] = useState(Date.now());
  const [activeHotspot, setActiveHotspot] = useState(null);

  // Delay arrow appearance slightly for dramatic effect
  useEffect(() => {
    const timer = setTimeout(() => setShowArrow(true), 800);
    return () => clearTimeout(timer);
  }, []);

  // Force GIF restart by changing key (busts browser cache for animation restart)
  useEffect(() => {
    setGifKey(Date.now());
  }, []);

  const handleLaptopClick = () => {
    onEnterLaptop();
  };

  return (
    <div className="room-scene" id="room-scene">
      {/* 16:9 Aspect Ratio Centered Stage Container */}
      <div className="room-stage">
        {/* Pixel Art GIF Background */}
        <img
          key={gifKey}
          src={roomGif}
          alt="Pixel art room with laptop"
          className="room-gif"
          draggable={false}
        />

        {/* Laptop screen glow effect */}
        <div className="room-laptop-glow"></div>

        {/* Clickable laptop screen hotspot */}
        <div
          className="room-laptop-hotspot"
          onClick={handleLaptopClick}
          title="Click laptop screen to enter"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') handleLaptopClick();
          }}
        ></div>

        {/* Invisible hover zones over each object */}
        {ROOM_HOTSPOTS.map((h) => (
          <div
            key={h.id}
            className="room-hotspot"
            style={{
              top: h.top,
              left: h.left,
              width: h.width,
              height: h.height,
              cursor: h.isClickable ? "url('./assets/spiderman-cursor.cur'), pointer" : "url('./assets/spiderman-cursor.cur'), default",
            }}
            onMouseEnter={() => setActiveHotspot(h.id)}
            onMouseLeave={() => setActiveHotspot(null)}
            onClick={h.isClickable ? handleLaptopClick : undefined}
          />
        ))}

        {/* Labels that appear on hover — positioned at edges like annotated diagram */}
        {ROOM_HOTSPOTS.map((h) => (
          <div
            key={`label-${h.id}`}
            className={`room-label ${activeHotspot === h.id ? 'room-label--visible' : ''}`}
            style={{ top: h.labelTop, left: h.labelLeft }}
          >
            <span className="room-label__title">{h.title}</span>
            <span className="room-label__desc">{h.description}</span>
            {h.arrowDir && (
              <div className={`room-label__arrow room-label__arrow--${h.arrowDir}`}></div>
            )}
          </div>
        ))}

        {/* Bouncing Arrow Indicator directly above laptop screen */}
        {showArrow && (
          <div className="room-arrow-container">
            <div className="room-arrow">
              <div className="pixel-arrow">
                <div className="pixel-arrow-shaft"></div>
                <div className="pixel-arrow-head">
                  <div className="pixel-arrow-head-row pixel-row-1"></div>
                  <div className="pixel-arrow-head-row pixel-row-2"></div>
                  <div className="pixel-arrow-head-row pixel-row-3"></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Retro scanline overlay */}
        <div className="room-scanlines"></div>
      </div>
    </div>
  );
};

export default RoomScene;
