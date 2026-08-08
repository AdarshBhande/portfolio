import React from 'react';

const WindowFrame = ({ 
  title, 
  onClose, 
  onMinimize, 
  onMaximize, 
  isMaximized = false, 
  isMinimized = false,
  children, 
  className = '', 
  icon = '📁' 
}) => {
  // Combine custom classes for maximize and minimize states
  const windowStateClass = `
    ${isMaximized ? 'maximized' : ''} 
    ${isMinimized ? 'minimized' : ''}
  `.trim();

  return (
    <div 
      className={`window-container ${windowStateClass} ${className}`} 
      id={`window-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      {/* Title Bar */}
      <div className="window-titlebar">
        <div className="titlebar-title">
          <span>{icon}</span> {title}
        </div>
        <div className="titlebar-dots">
          <button 
            className="dot dot-minimize" 
            onClick={onMinimize} 
            aria-label="Minimize Window" 
            title="Minimize"
          ></button>
          <button 
            className="dot dot-maximize" 
            onClick={onMaximize} 
            aria-label="Maximize Window" 
            title="Maximize"
          ></button>
          <button 
            className="dot dot-close" 
            onClick={onClose} 
            aria-label="Close Window" 
            title="Close"
          ></button>
        </div>
      </div>

      {/* Content Area */}
      <div className="window-content">
        {children}
      </div>
    </div>
  );
};

export default WindowFrame;
