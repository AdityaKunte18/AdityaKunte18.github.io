import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.css';
import AboutMe from './AboutMe';
import Projects from './Projects';
import WorkExperience from './WorkExperience';

function ContentContainer() {
  const tabs = ["About Me", "My Projects", "Work Experience"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const underlineRef = useRef(null);
  const tabRefs = useRef(tabs.map(() => React.createRef()));
  const tabsContainerRef = useRef(null);

  useEffect(() => {
    const currentTab = tabRefs.current[tabs.indexOf(selectedTab)].current;
    const underline = underlineRef.current;
    
    if (currentTab && underline) {
      underline.style.width = `${currentTab.offsetWidth}px`;
      underline.style.left = `${currentTab.offsetLeft}px`;
    }
    
    const handleResize = () => {
      if (currentTab && underline) {
        underline.style.width = `${currentTab.offsetWidth}px`;
        underline.style.left = `${currentTab.offsetLeft}px`;
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [selectedTab]);

  const renderComponent = () => {
    switch(selectedTab) {
      case 'About Me':
        return <AboutMe />;
      case 'My Projects':
        return <Projects />;
      case 'Work Experience':
        return <WorkExperience />;
      default:
        return <div>Tab not found</div>;
    }
  };

  return (
    <div className="contentContainer">
      <div className="optionsContainer">
        <div className="tabsContainer" ref={tabsContainerRef}>
          {tabs.map((tab, index) => (
            <h1 key={tab} ref={tabRefs.current[index]} onClick={() => setSelectedTab(tab)}>
              {tab}
            </h1>
          ))}
          <div className="underline" ref={underlineRef}></div>
        </div>
      </div>

      <div className="bodyContainer fadeInUp" key={selectedTab}>
        {renderComponent()}
      </div>

      <div className="footerContainer">
        <h1 style={{fontFamily:'monospace'}}>Made with <span style={{fontSize:'18pt'}}>☕️</span> and <span style={{fontSize:'18pt'}}>❤️</span> By Aditya </h1>
      </div>
    </div>
  );
}

export default ContentContainer;