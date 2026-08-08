import React from 'react';

const ResumeBanner = ({ resumeUrl = '#' }) => {
  const handleClick = (e) => {
    e.preventDefault();
    alert("Resume download triggered! (Mock PDF Placeholder)");
  };

  return (
    <a 
      href={resumeUrl}
      onClick={handleClick}
      className="resume-banner-pinned"
      target="_blank"
      rel="noopener noreferrer"
      title="View Adarsh's Resume"
      id="resume-banner"
    >
      <span>📄</span> VIEW RESUME
    </a>
  );
};

export default ResumeBanner;
