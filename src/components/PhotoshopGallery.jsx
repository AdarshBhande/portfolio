import React, { useState } from 'react';

const CREATIVE_WORKS = [
  {
    id: 1,
    title: "Miles Morales Spider-Man Wallpaper",
    category: "Posters",
    image: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=800&q=80",
    description: "High-octane comic style poster design featuring Spider-Man falling through neon skyscraper reflections.",
    tools: ["Photoshop CS6", "Color Grading", "Lighting Overlay"]
  },
  {
    id: 2,
    title: "Pixel Art Cyberpunk Bedroom",
    category: "Pixel Art",
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    description: "Retro 16-bit isometric pixel environment with animated monitor scanlines and glowing neon lamps.",
    tools: ["Aseprite", "Photoshop", "Pixel Art"]
  },
  {
    id: 3,
    title: "Bhande OS Windows 11 UI Design",
    category: "UI/UX",
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&q=80",
    description: "Sleek dark glassmorphism operating system layout with custom taskbar widgets and floating windows.",
    tools: ["Figma", "Photoshop", "React"]
  },
  {
    id: 4,
    title: "Abstract Neon Audio Visualizer",
    category: "3D Renders",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800&q=80",
    description: "3D volumetric light animation rendered in Blender for music equalizer visualizations.",
    tools: ["Blender 3.0", "Octane Render", "Photoshop"]
  },
  {
    id: 5,
    title: "Retro Lighter Vector Artwork",
    category: "Pixel Art",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&q=80",
    description: "Classic Zippo lighter animation frame-by-frame sprite artwork with flame particles.",
    tools: ["Photoshop", "Vector Graphics"]
  },
  {
    id: 6,
    title: "Sunset Cat Rooftop Perspective",
    category: "Posters",
    image: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&q=80",
    description: "Serene sunset aesthetic wallpaper featuring city skyline silhouettes and warm color gradient.",
    tools: ["Photoshop CS6", "Digital Painting"]
  }
];

const CATEGORIES = ["All", "Pixel Art", "Posters", "UI/UX", "3D Renders"];

const PhotoshopGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeItem, setActiveItem] = useState(null);

  const filteredWorks = selectedCategory === "All"
    ? CREATIVE_WORKS
    : CREATIVE_WORKS.filter(w => w.category === selectedCategory);

  return (
    <div className="ps-gallery-container">
      {/* Header Bar */}
      <div className="ps-gallery-header">
        <div className="ps-header-left">
          <span className="ps-icon">🎨</span>
          <div>
            <h2>Photoshop & Design Showcase</h2>
            <p>Curated graphic designs, pixel art, posters, and UI concepts by Adarsh Bhande</p>
          </div>
        </div>

        {/* Category Filters */}
        <div className="ps-category-filters">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              className={`ps-filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="ps-gallery-grid">
        {filteredWorks.map(item => (
          <div
            key={item.id}
            className="ps-card"
            onClick={() => setActiveItem(item)}
          >
            <div className="ps-card-img-wrap">
              <img src={item.image} alt={item.title} className="ps-card-img" />
              <span className="ps-card-tag">{item.category}</span>
            </div>
            <div className="ps-card-info">
              <h3 className="ps-card-title">{item.title}</h3>
              <div className="ps-card-tools">
                {item.tools.map((t, idx) => (
                  <span key={idx} className="ps-tool-chip">{t}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal View */}
      {activeItem && (
        <div className="ps-lightbox-overlay" onClick={() => setActiveItem(null)}>
          <div className="ps-lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ps-lightbox-close" onClick={() => setActiveItem(null)}>×</button>
            <div className="ps-lightbox-body">
              <img src={activeItem.image} alt={activeItem.title} className="ps-lightbox-img" />
              <div className="ps-lightbox-details">
                <span className="ps-lightbox-tag">{activeItem.category}</span>
                <h2>{activeItem.title}</h2>
                <p>{activeItem.description}</p>
                <div className="ps-lightbox-tools">
                  <strong>Tools Used:</strong>
                  <div className="ps-card-tools" style={{ marginTop: '6px' }}>
                    {activeItem.tools.map((t, idx) => (
                      <span key={idx} className="ps-tool-chip">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoshopGallery;
