import React from 'react';
import '../styles/projectstyles.css';
import { FaGithub } from "react-icons/fa";

function Project({ title, skills, description, githubLink }) {
  return (
    <article className="projectContainer">
      <header className="prtitle">
        <h3 className="projectTitle">{title}</h3>

        {/* Single-line, scrollable skills row */}
        <ul
          className="skillChips"
          aria-label="Skills (scroll horizontally)"
          tabIndex="0"
          title="Scroll horizontally to see all skills"
        >
          {skills.map((s) => (
            <li className="chip" key={s}>{s}</li>
          ))}
        </ul>
      </header>

      <p className="prdescription">{description}</p>

      {/* Always pinned at the bottom via CSS */}
      <div className="actions">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn"
          aria-label={`Open ${title} on GitHub`}
        >
          
 
      <FaGithub />
        </a>
      </div>
    </article>
  );
}

export default Project;
