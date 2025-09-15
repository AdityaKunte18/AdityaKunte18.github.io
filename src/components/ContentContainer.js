import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.css';
import AboutMe from './AboutMe';
import Projects from './Projects';
import WorkExperience from './WorkExperience';
import { FaCoffee, FaHeart } from "react-icons/fa";

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
    switch (selectedTab) {
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
        <div className="footerText">
          <span>Made with</span>
          <FaCoffee className="footerIcon" aria-label="coffee" />
          <span>and</span>
          <FaHeart className="footerIcon" aria-label="love" />
          <span>by Aditya</span>
        </div>
      </div>

    </div>
  );
}

export default ContentContainer;