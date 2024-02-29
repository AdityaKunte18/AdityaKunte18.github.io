import React from 'react';
import '../styles/projectstyles.css';

function Project({ title, skills, description, githubLink }) {
  return (
    <div className="projectContainer">
      <div className="prtitle">
        <h1>{title}</h1>
        <p>{skills.join(' | ')}</p>
      </div>
      <p className="prdescription">{description}</p>
      <a href={githubLink} target="_blank" rel="noopener noreferrer" className="prgithub">View on GitHub</a>
    </div>
  );
}

export default Project;