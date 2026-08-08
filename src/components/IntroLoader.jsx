import React, { useState, useEffect, useRef } from 'react';
import cheesesteakGif from '../assets/cheesesteak-horror.gif';

const DURATION = 3000;
const TOTAL_BLOCKS = 20; // number of pixel blocks in the bar

const IntroLoader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loaderState, setLoaderState] = useState('visible');
  const [dots, setDots] = useState('...');
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  // Animate dots: . -> .. -> ... -> . 
  useEffect(() => {
    const id = setInterval(() => {
      setDots(d => d.length >= 3 ? '.' : d + '.');
    }, 400);
    return () => clearInterval(id);
  }, []);

  // Animate progress bar
  useEffect(() => {
    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setLoaderState('fading');
        setTimeout(() => {
          setLoaderState('complete');
          onComplete();
        }, 900);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  const filledBlocks = Math.floor((progress / 100) * TOTAL_BLOCKS);

  return (
    <div className={`intro-loader-container ${loaderState}`}>
      <div className="loader-inner">
        {/* GIF */}
        <img
          src={cheesesteakGif}
          alt="Loading"
          className="loader-gif-img"
          draggable={false}
        />



        {/* Retro loading bar */}
        <div className="retro-loader">
          <div className="retro-loading-text">LOADING {dots}</div>
          <div className="retro-bar-outer">
            <span className="retro-cap retro-cap-left">&#9632;</span>
            <div className="retro-bar-inner">
              {Array.from({ length: TOTAL_BLOCKS }).map((_, i) => (
                <div
                  key={i}
                  className={`retro-block ${i < filledBlocks ? 'filled' : ''}`}
                />
              ))}
            </div>
            <span className="retro-cap retro-cap-right">&#9632;</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IntroLoader;
