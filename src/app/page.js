"use client"
import '../styles/styles.css';
import { useState, useEffect } from 'react';
import { CiLinkedin } from "react-icons/ci";
import { FaSquareGithub } from "react-icons/fa6";
import { CiMail } from "react-icons/ci";
import Image from 'next/image';
import { IoDocumentAttachOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import ContentContainer from '@/components/ContentContainer';

export default function Home() {
  const [showResumeModal, setShowResumeModal] = useState(false);
  
  
  useEffect(() => {
    if (showResumeModal) {
  
      document.body.style.overflow = 'hidden';
    } else {
  
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showResumeModal]);

  return (
    <div className="mainContainer">
      <div className="headerSection">
        <div className="headerLeft">
          <div className="imageContainer">
            <div className="pfpContainer">
              <Image 
                src='/pfp_updated.jpg' 
                alt='my profile picture' 
                width={150} 
                height={150} 
                className="pfp" 
                priority
              />
            </div>
          </div>
        </div>
        <div className="headerCenter">
          <div className="titleContainer">
            <div className="nameContainer">
              <h2 className="title">Hi, I am Aditya!</h2>
            </div>
            <div className="iconContainer">
              <div className="linkedinContainer">
                <a href="https://www.linkedin.com/in/aditya-kunte/" target="_blank" rel="noopener noreferrer">
                  <CiLinkedin className="linkdin"/>
                </a>
                {/* <span className="tooltipText">LinkedIn</span> */}
              </div>
              <div className="githubContainer">
                <a href="https://github.com/AdityaKunte18" target="_blank" rel="noopener noreferrer">
                  <FaSquareGithub className='github'/>
                </a>
                {/* <span className="tooltipText">Github</span> */}
              </div>
              <div className="mailContainer">
                <a href="mailto:akunte2@illinois.edu">
                  <CiMail className='mail'/>
                </a>
                {/* <span className="tooltipText">Email</span> */}
              </div>
              <div className="resumeContainer">
                <a 
                  href="#" 
                  onClick={(e) => {
                    e.preventDefault();
                    setShowResumeModal(true);
                  }}
                >
                  <IoDocumentAttachOutline className='resume'/>
                </a>
                {/* <span className="tooltipText">Resume</span> */}
              </div>
            </div>
          </div>
        </div>
        <div className="headerRight">
          {/* <!-- Empty space for future content --> */}
        </div>
      </div>

      <ContentContainer/>
      
      {/* Resume Modal */}
      {showResumeModal && (
        <div className="resumeModalOverlay" onClick={(e) => {
          // Close modal when clicking outside of content
          if (e.target.className === 'resumeModalOverlay') {
            setShowResumeModal(false);
          }
        }}>
          <div className="resumeModalContent">
            <button 
              className="resumeModalCloseButton"
              onClick={() => setShowResumeModal(false)}
            >
              <IoClose />
            </button>
            <iframe 
              src="/Aditya_Kunte_current.pdf" 
              className="resumeFrame"
            />
          </div>
        </div>
      )}
    </div>
  );
}