import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.css';
import AboutMe from './AboutMe';
import Projects from './Projects';
import WorkExperience from './WorkExperience';


function ContentContainer() {
  // Adding "Work Experience" to the tabs list
  const tabs = ["About Me", "My Projects", "Work Experience"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const underlineRef = useRef(null);
  const tabRefs = useRef(tabs.map(() => React.createRef()));
//   const [renderKey, setRenderKey] = useState(0); // Added for re-triggering animations

  useEffect(() => {
    const currentTab = tabRefs.current[tabs.indexOf(selectedTab)].current;
    const underline = underlineRef.current;
    underline.style.width = `${currentTab.offsetWidth}px`;
    underline.style.left = `${currentTab.offsetLeft}px`;
    // setRenderKey(prevKey => prevKey + 1); // Increment renderKey to re-trigger animation
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
        <div style={{width:'36%'}}></div>
        <div className="tabsContainer">
          {tabs.map((tab, index) => (
            <h1 key={tab} ref={tabRefs.current[index]} onClick={() => setSelectedTab(tab)}>
              {tab}
            </h1>
          ))}
          <div className="underline" ref={underlineRef}></div>
        </div>
        <div style={{width:'33%'}}></div>
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
