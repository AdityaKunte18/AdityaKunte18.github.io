
import '../styles/styles.css';

function AboutMe() {
  return (
    <div className="AboutMeContainer">
        <p className="aboutMeText">
            I'm currently a <span className="highlightedText">senior</span> in <span className="highlightedText">Computer Science</span> at the <span className="highlightedText"> University of Illinois at Urbana-Champaign (UIUC)</span> . 
            <br/>Right now, I'm experimenting with both <span className="highlightedText">systems-level programming</span>
            (learning about memory, networks, threads, among other things) 
            and <span className="highlightedText">machine-learning</span> (learning about perceptrons, neural networks, and different types of neural networks).
             I've also had some experience in <span className="highlightedText">embedded systems</span> (soldering and programming microcontrollers at hackathons) 
             as well as <span className="highlightedText">full-stack dev</span> work
             (building applications for Android using <span className="highlightedText">Android Studio</span> and <span className="highlightedText">React Native</span> and building websites in <span className="highlightedText">Next.js</span> and <span className="highlightedText">Bootstrap</span>)
        </p>
      
    </div>
  );
}

export default AboutMe;
