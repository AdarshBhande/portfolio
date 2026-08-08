import React, { useState, useEffect } from 'react';

const INITIAL_ENTRIES = [
  {
    id: 1,
    name: "Alex Rivera",
    avatar: "🚀",
    message: "Mind-blowing portfolio OS! Love the interactive terminal and room scene!",
    date: "2026-08-08 14:20"
  },
  {
    id: 2,
    name: "Sarah Chen",
    avatar: "🎨",
    message: "The design aesthetics and retro Windows XP/11 vibes are immaculate. Great work Adarsh!",
    date: "2026-08-08 18:45"
  },
  {
    id: 3,
    name: "Devon Marcus",
    avatar: "💻",
    message: "Loved the music player integration! Sunflower slaps!",
    date: "2026-08-09 00:10"
  }
];

const EMOJIS = ["🚀", "🎨", "💻", "⚡", "🔥", "👾", "🎧", "🌟"];

const GuestBook = () => {
  const [entries, setEntries] = useState([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('🚀');
  const [submittedMessage, setSubmittedMessage] = useState('');

  // Load entries from localStorage or fallback to defaults
  useEffect(() => {
    const saved = localStorage.getItem('spidey_os_guestbook');
    if (saved) {
      try {
        setEntries(JSON.parse(saved));
      } catch {
        setEntries(INITIAL_ENTRIES);
      }
    } else {
      setEntries(INITIAL_ENTRIES);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;

    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;

    const newEntry = {
      id: Date.now(),
      name: name.trim(),
      avatar: selectedEmoji,
      message: message.trim(),
      date: formattedDate
    };

    const updated = [newEntry, ...entries];
    setEntries(updated);
    localStorage.setItem('spidey_os_guestbook', JSON.stringify(updated));

    setName('');
    setMessage('');
    setSubmittedMessage('Thank you! Your note has been published to the Guest Book! 🎉');
    setTimeout(() => setSubmittedMessage(''), 4000);
  };

  return (
    <div className="guestbook-container">
      {/* Header Banner */}
      <div className="guestbook-header">
        <div className="guestbook-title-wrap">
          <h2>📒 Visitor Guest Book</h2>
          <p>Leave a note or feedback for Adarsh Bhande!</p>
        </div>
        <span className="guestbook-badge">{entries.length} Entries</span>
      </div>

      {/* Form Section */}
      <form className="guestbook-form" onSubmit={handleSubmit}>
        <h3>Sign the Guest Book</h3>

        {submittedMessage && (
          <div className="guestbook-success-msg">{submittedMessage}</div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Your Name:</label>
            <input
              type="text"
              placeholder="e.g. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={30}
              required
            />
          </div>

          <div className="form-group">
            <label>Choose Avatar:</label>
            <div className="emoji-picker-row">
              {EMOJIS.map(emoji => (
                <button
                  type="button"
                  key={emoji}
                  className={`emoji-btn ${selectedEmoji === emoji ? 'active' : ''}`}
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Your Message:</label>
          <textarea
            placeholder="Write a quick comment, feedback, or greeting..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            maxLength={250}
            required
          />
        </div>

        <button type="submit" className="guestbook-submit-btn">
          ✍️ Post to Guest Book
        </button>
      </form>

      {/* Entries List */}
      <div className="guestbook-feed">
        <h3>Recent Visitor Messages</h3>
        <div className="entries-list">
          {entries.map(entry => (
            <div key={entry.id} className="guestbook-card">
              <div className="card-avatar">{entry.avatar}</div>
              <div className="card-content">
                <div className="card-top">
                  <span className="card-author">{entry.name}</span>
                  <span className="card-date">{entry.date}</span>
                </div>
                <p className="card-body">{entry.message}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GuestBook;
