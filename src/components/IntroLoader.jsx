import React, { useState, useEffect } from 'react';

const IntroLoader = ({ onComplete }) => {
  // States: 'unlit' | 'lit' | 'burning' | 'complete'
  const [loaderState, setLoaderState] = useState('unlit');
  const [isFlashActive, setIsFlashActive] = useState(false);

  // Generate 24x24 grid cells for the pixelated burning reveal transition
  const cols = 24;
  const rows = 24;
  const cells = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      // Distance from center cell (11.5, 11.5)
      const dx = c - 11.5;
      const dy = r - 11.5;
      const distance = Math.sqrt(dx * dx + dy * dy);
      cells.push({
        id: `${r}-${c}`,
        distance
      });
    }
  }

  useEffect(() => {
    // 1. Initial State: 'unlit' (starts immediately)
    // 2. Automically Ignite after 1.2 seconds -> transition to 'lit'
    const igniteTimer = setTimeout(() => {
      setLoaderState('lit');
      setIsFlashActive(true);
      
      // Turn off flash overlay after 500ms
      setTimeout(() => {
        setIsFlashActive(false);
      }, 500);
    }, 1200);

    // 3. Trigger the pixelated radial burning transition after 2.0 seconds
    const burnTimer = setTimeout(() => {
      setLoaderState('burning');
    }, 2000);

    // 4. Complete the intro loader sequence after 4.2 seconds
    const completeTimer = setTimeout(() => {
      setLoaderState('complete');
      onComplete();
    }, 4200);

    return () => {
      clearTimeout(igniteTimer);
      clearTimeout(burnTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`intro-loader-container ${loaderState}`}>
      {/* Retro White Screen Flash */}
      {isFlashActive && <div className="intro-flash-overlay" />}

      {/* Grid of pixel-burning blocks */}
      <div className="burn-grid">
        {cells.map(cell => (
          <div
            key={cell.id}
            className="burn-cell"
            style={{
              '--burn-delay': `${cell.distance * 85}ms`
            }}
          />
        ))}
      </div>

      {/* Centered Lighter Artwork Container */}
      <div className="lighter-intro-wrapper">
        <img
          src={loaderState === 'unlit' ? '/images/lighter-unlit.png' : '/images/lighter-lit.png'}
          alt="Pixel art lighter"
          className="lighter-intro-img"
          draggable={false}
        />
        {/* Status text below the lighter */}
        {loaderState !== 'complete' && (
          <div className="lighter-status-text">
            processing...
          </div>
        )}
      </div>
    </div>
  );
};

export default IntroLoader;
