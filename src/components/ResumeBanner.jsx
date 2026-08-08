import React from 'react';
import { portfolioData } from '../data/portfolioData';

const ResumeBanner = () => {
  const resumeUrl = portfolioData.personalInfo.resumeUrl;

  return (
    <a 
      href={resumeUrl}
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

