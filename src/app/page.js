import '../styles/styles.css';
import { CiLinkedin } from "react-icons/ci";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaSquareGithub } from "react-icons/fa6";
import { VscMail } from "react-icons/vsc";
import { CiMail } from "react-icons/ci";
import Image from 'next/image';

export default function Home() {
  return (
    <div className="mainContainer">
      <div className="headerSection">
        <div className="imageContainer">
          <div className="pfpContainer">
            <Image src = '/pfp_updated.jpg' alt='my pfp here'  width={150} height={150} className="pfp"/>
            
          </div>
        </div>
        <div className="titleContainer">
          <div className="nameContainer">
            <h2 style={{fontSize:50}}>Hi, I'm Aditya!</h2>
          </div>
          <div className="iconContainer">
            <CiLinkedin size={55}/>
            <FaSquareGithub size={45} />
            <CiMail size={47}/>
          </div>
        </div>
        <div>
        </div>
       <div style={{width:'33%'}}>

       </div>
      </div>
      <div className="footerContainer">
      <h1 style={{fontFamily:'monospace'}}>Made with <span style={{fontSize:'18pt'}}>☕️</span> and <span style={{fontSize:'18pt'}}>❤️</span> By Aditya </h1>
      </div>
    </div>
  );
}
