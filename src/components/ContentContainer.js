import React, { useState, useEffect, useRef } from 'react';
import '../styles/styles.css';

function ContentContainer() {
  // Adding "Work Experience" to the tabs list
  const tabs = ["About Me", "My Projects", "Work Experience"];
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const underlineRef = useRef(null);
  const tabRefs = useRef(tabs.map(() => React.createRef()));

  useEffect(() => {
    const currentTab = tabRefs.current[tabs.indexOf(selectedTab)].current;
    const underline = underlineRef.current;
    underline.style.width = `${currentTab.offsetWidth}px`;
    underline.style.left = `${currentTab.offsetLeft}px`;
  }, [selectedTab]);

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

      <div className="bodyContainer">
        <h1>{selectedTab} content here!</h1>
      </div>

      <div style={{width:'33%'}}>
      </div>
    </div>
  );
}

export default ContentContainer;
