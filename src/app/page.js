import '../styles/styles.css';
import { CiLinkedin } from "react-icons/ci";
import { SlSocialLinkedin } from "react-icons/sl";
import { FaSquareGithub } from "react-icons/fa6";
import { VscMail } from "react-icons/vsc";
import { CiMail } from "react-icons/ci";

export default function Home() {
  return (
    <div className="mainContainer">
      <div className="headerSection">
        <div className="imageContainer">
          <h1>My PFP Here!</h1>
        </div>
        <div className="titleContainer">
          <div className="nameContainer">
            <h2 style={{fontSize:80}}>Chut</h2>
          </div>
          <div className="iconContainer">
            <CiLinkedin size={60}/>
            <FaSquareGithub size={52} />
            <CiMail size={50}/>
          </div>
        </div>
        <div>
          <h1>light mode/ dark mode container here</h1>
        </div>
       <div>

       </div>
      </div>
    </div>
  );
}
