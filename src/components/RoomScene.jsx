import React, { useState, useEffect, useRef } from 'react';
import roomGif from '../assets/pixel-art-room.gif';

const RoomScene = ({ onEnterLaptop }) => {
  const [showArrow, setShowArrow] = useState(false);
  const [gifKey, setGifKey] = useState(Date.now());

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

        {/* Clickable laptop screen hotspot (Red box in user reference) */}
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
