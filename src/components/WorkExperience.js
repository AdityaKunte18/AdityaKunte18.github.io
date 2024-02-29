
import '../styles/styles.css';
import Workex from './Workex';


function WorkExperience() {
  // Adding "Work Experience" to the tabs list
  const experiences = [
    {
      title: 'Intern, Software Engineer',
      company: 'Disruption Lab' ,
      duration: '3 Months',
      location: 'Champaign, Illinois',
      year: '2023',
      description: "Implemented a DAO (decentralized automonous organization) using the Aragon SDK. I also tokenized natural resources (nickel, copper, iron) via a new cryptocurrency called Kula.",
    },
    {
      title: 'Intern, Software Engineer',
      company: 'Sellou' ,
      duration: '3 Months',
      location: 'Tokyo, Japan',
      year: '2023',
      description: "I developed a social-media android app using React-Native for front-end development, and Firebase for the back-end. I  Implemented User-credentialing via login and signup forms. Each user had their own dynamic feed of videos. They could also like,comment, and post content."
    },
    {
      title: 'Intern, Software Engineer',
      company: 'Centelon IT Solutions' ,
      duration: '3 Months',
      location: 'Mumbai, India',
      year: '2022',
      description:  "I was tasked with creating a Generative Adversarial Network (GAN) to generate credit card image. Part of my research included a feasibility studyy, which started with creating an image web-scraper to collect images of credit cards using Python’s Selenium Library. The caveat was that to train a GAN, we needed tons of data, which could not simply be collected through sample images."
    },
  ];
  return (
    <div className="WorkExperiencesContainer">
        {experiences.map((workex, index) => (
        <Workex
          key={index}
          title={workex.title}
          company={workex.company}
          duration={workex.duration}
          location={workex.location}
          year={workex.year}
          description={workex.description}
        />
      ))}
    </div>
  );
}

export default WorkExperience;
