import React, { useState, useEffect, useRef } from 'react';

export const PLAYLIST = [
  {
    id: 1,
    title: "Sunflower",
    artist: "Post Malone, Swae Lee",
    album: "Spider-Man: Into the Spider-Verse",
    cover: "https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&q=80",
    audioUrl: "./music/sunflower.mp3",
    color: "#e11d48"
  },
  {
    id: 2,
    title: "Him & I",
    artist: "G-Eazy & Halsey",
    album: "The Beautiful & Damned",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&q=80",
    audioUrl: "./music/him-and-i.mp3",
    color: "#8b5cf6"
  },
  {
    id: 3,
    title: "A Thousand Years",
    artist: "Christina Perri / John Michael",
    album: "The Twilight Saga: Breaking Dawn",
    cover: "https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=400&q=80",
    audioUrl: "./music/a-thousand-years.mp3",
    color: "#ec4899"
  },
  {
    id: 4,
    title: "Sailor Song",
    artist: "Gigi Perez",
    album: "Sailor Song - Single",
    cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80",
    audioUrl: "./music/sailor-song.mp3",
    color: "#06b6d4"
  },
  {
    id: 5,
    title: "The Lazy Song",
    artist: "Bruno Mars",
    album: "Doo-Wops & Hooligans",
    cover: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&q=80",
    audioUrl: "./music/the-lazy-song.mp3",
    color: "#f59e0b"
  }
];

const MusicPlayer = ({ 
  currentTrackIndex, 
  setCurrentTrackIndex, 
  isPlaying, 
  setIsPlaying,
  isLocked,
  currentScene
}) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = PLAYLIST[currentTrackIndex] || PLAYLIST[0];

  // Handle Play/Pause when global or local isPlaying changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying && !isLocked && currentScene === 'os') {
      audio.play().catch(err => {
        console.warn("Autoplay interaction fallback:", err);
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, isLocked, currentScene, currentTrackIndex]);

  // Audio event listeners
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      handleNextTrack();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [currentTrackIndex]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNextTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % PLAYLIST.length);
  };

  const handlePrevTrack = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + PLAYLIST.length) % PLAYLIST.length);
  };

  const handleSeek = (e) => {
    const seekTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const formatTime = (timeInSeconds) => {
    if (isNaN(timeInSeconds)) return "0:00";
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="music-player-container">
      {/* Hidden HTML5 Audio Element */}
      <audio
        ref={audioRef}
        src={currentTrack.audioUrl}
        preload="auto"
      />

      {/* Header Banner with Album Art & Now Playing Info */}
      <div className="music-now-playing-banner" style={{ '--accent-color': currentTrack.color }}>
        <div className="music-album-art-wrapper">
          <img 
            src={currentTrack.cover} 
            alt={currentTrack.title} 
            className={`music-album-art ${isPlaying ? 'playing' : ''}`} 
          />
          {isPlaying && (
            <div className="equalizer-overlay">
              <span className="eq-bar eq-bar-1" />
              <span className="eq-bar eq-bar-2" />
              <span className="eq-bar eq-bar-3" />
              <span className="eq-bar eq-bar-4" />
            </div>
          )}
        </div>

        <div className="music-track-details">
          <div className="music-tag">NOW PLAYING</div>
          <h2 className="music-track-title">{currentTrack.title}</h2>
          <p className="music-track-artist">{currentTrack.artist}</p>
          <span className="music-album-name">Album: {currentTrack.album}</span>
        </div>
      </div>

      {/* Player Controls Bar */}
      <div className="music-controls-section">
        {/* Seek / Progress Bar */}
        <div className="music-seek-container">
          <span className="time-display">{formatTime(currentTime)}</span>
          <input
            type="range"
            min="0"
            max={duration || 100}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            className="music-seek-bar"
            style={{
              background: `linear-gradient(to right, ${currentTrack.color} ${(currentTime / (duration || 1)) * 100}%, rgba(255, 255, 255, 0.15) ${(currentTime / (duration || 1)) * 100}%)`
            }}
          />
          <span className="time-display">{formatTime(duration)}</span>
        </div>

        {/* Buttons (Prev, Play/Pause, Next, Volume) */}
        <div className="music-action-buttons">
          <button 
            className="music-btn secondary" 
            onClick={handlePrevTrack}
            title="Previous Track"
          >
            ⏮
          </button>

          <button 
            className="music-btn primary" 
            onClick={togglePlayPause}
            title={isPlaying ? "Pause" : "Play"}
            style={{ backgroundColor: currentTrack.color }}
          >
            {isPlaying ? "⏸" : "▶"}
          </button>

          <button 
            className="music-btn secondary" 
            onClick={handleNextTrack}
            title="Next Track"
          >
            ⏭
          </button>

          <div className="music-volume-control">
            <button 
              className="volume-icon-btn"
              onClick={() => setIsMuted(!isMuted)}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted || volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={isMuted ? 0 : volume}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
                if (isMuted) setIsMuted(false);
              }}
              className="volume-slider"
            />
          </div>
        </div>
      </div>

      {/* Playlist Section */}
      <div className="music-playlist-section">
        <h4 className="playlist-heading">PLAYLIST ({PLAYLIST.length})</h4>
        <div className="playlist-items-list">
          {PLAYLIST.map((track, idx) => {
            const isSelected = idx === currentTrackIndex;
            return (
              <div
                key={track.id}
                className={`playlist-item ${isSelected ? 'active' : ''}`}
                onClick={() => {
                  setCurrentTrackIndex(idx);
                  setIsPlaying(true);
                }}
              >
                <div className="playlist-item-left">
                  <span className="track-number">{isSelected && isPlaying ? "🎵" : idx + 1}</span>
                  <div className="playlist-item-info">
                    <span className="playlist-track-name">{track.title}</span>
                    <span className="playlist-artist-name">{track.artist}</span>
                  </div>
                </div>
                <span className="playlist-album-tag">{track.album}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MusicPlayer;
