import React, { useState, useEffect, useRef } from 'react';

const COLORS = [
  '#000000', '#ffffff', '#797979', '#c0c0c0', 
  '#ff0000', '#00ff00', '#0000ff', '#ffff00', 
  '#ff00ff', '#00ffff', '#800000', '#008000', 
  '#000080', '#808000', '#800080', '#008080'
];

const PaintApp = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');
  const [brushSize, setBrushSize] = useState(4);
  const [tool, setTool] = useState('brush'); // 'brush' | 'eraser'

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    // Fill white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.strokeStyle = tool === 'eraser' ? '#ffffff' : color;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const downloadDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const image = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = image;
    link.download = 'bhande-os-painting.png';
    link.click();
  };

  return (
    <div className="paint-container">
      {/* Top Toolbar */}
      <div className="paint-toolbar">
        {/* Tool selector */}
        <div className="paint-tool-group">
          <button
            className={`paint-tool-btn ${tool === 'brush' ? 'active' : ''}`}
            onClick={() => setTool('brush')}
            title="Brush"
          >
            ✏️ Brush
          </button>
          <button
            className={`paint-tool-btn ${tool === 'eraser' ? 'active' : ''}`}
            onClick={() => setTool('eraser')}
            title="Eraser"
          >
            🧹 Eraser
          </button>
        </div>

        {/* Brush Size Slider */}
        <div className="paint-tool-group">
          <span className="paint-label">Size: {brushSize}px</span>
          <input
            type="range"
            min="1"
            max="30"
            value={brushSize}
            onChange={(e) => setBrushSize(parseInt(e.target.value))}
            className="paint-slider"
          />
        </div>

        {/* Action Buttons */}
        <div className="paint-tool-group">
          <button className="paint-tool-btn danger" onClick={clearCanvas} title="Clear Canvas">
            🗑️ Clear
          </button>
          <button className="paint-tool-btn primary" onClick={downloadDrawing} title="Download PNG">
            💾 Save PNG
          </button>
        </div>
      </div>

      {/* Main Drawing Canvas */}
      <div className="paint-canvas-wrapper">
        <canvas
          ref={canvasRef}
          width={680}
          height={400}
          className="paint-canvas"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      {/* Bottom Color Palette */}
      <div className="paint-color-palette">
        <div className="current-color-preview" style={{ backgroundColor: tool === 'eraser' ? '#ffffff' : color }} />
        <div className="color-swatches">
          {COLORS.map(c => (
            <button
              key={c}
              className={`color-swatch ${color === c && tool === 'brush' ? 'selected' : ''}`}
              style={{ backgroundColor: c }}
              onClick={() => {
                setColor(c);
                setTool('brush');
              }}
            />
          ))}
        </div>
        <input
          type="color"
          value={color}
          onChange={(e) => {
            setColor(e.target.value);
            setTool('brush');
          }}
          className="custom-color-input"
          title="Custom Color Picker"
        />
      </div>
    </div>
  );
};

export default PaintApp;
