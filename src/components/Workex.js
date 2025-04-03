import React from 'react';
import '../styles/workexstyles.css';

function Workex({ title, company, duration, location, year, description }) {
  return (
    <div className="workexContainer">
      <div className="workextitlecomp">
        <div>
          <h2 style={{color:'white'}}>{company}</h2>
          <h3 style={{color:'slategrey'}}>{title}</h3>
        </div>
        <div>
          <h2>{year}</h2>
          <h3>{duration}</h3>
          <h2>{location}</h2>
        </div>
      </div>
      <div className='workexfooter'>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default Workex;