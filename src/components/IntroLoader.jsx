import React, { useState, useEffect } from 'react';

const IntroLoader = ({ onComplete }) => {
  // States: 'visible' | 'fading' | 'complete'
  const [loaderState, setLoaderState] = useState('visible');

  useEffect(() => {
    // 1. Show GIF for 3 seconds then start smooth fade
    const fadeTimer = setTimeout(() => {
      setLoaderState('fading');
    }, 3000);

    // 2. Complete after fade animation finishes (0.8s)
    const completeTimer = setTimeout(() => {
      setLoaderState('complete');
      onComplete();
    }, 3800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`intro-loader-container ${loaderState}`}>
      {/* Centered GIF Loading Screen */}
      <div className="loader-gif-wrapper">
        <img
          src="/images/cheesesteak-horror.gif"
          alt="Loading animation"
          className="loader-gif-img"
          draggable={false}
        />
      </div>
    </div>
  );
};

export default IntroLoader;
