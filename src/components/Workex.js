import React from 'react';
import '../styles/workexstyles.css';

function Workex({ title, company, duration, location, year, description }) {
  return (
    <article className="workexContainer" role="listitem">
      <header className="workexHeader">
        <div className="workexCompanyTitle">
          <h2 className="workexCompany">{company}</h2>
          <h3 className="workexRole">{title}</h3>
        </div>
        <div className="workexMeta" aria-label="Position details">
          <div className="metaRow">
            <span className="badge">{year}</span>
            <span className="muted">•</span>
            <span className="muted">{duration}</span>
          </div>
          <div className="muted">{location}</div>
        </div>
      </header>

      <div className="workexBody">
        <p>{description}</p>
      </div>
    </article>
  );
}

export default Workex;
