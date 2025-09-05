import '../styles/workexstyles.css';
import Workex from './Workex';

function WorkExperience() {
  const experiences = [
    {
      title: 'Research',
      company: 'CreateLab',
      duration: 'May - Present',
      location: 'Champaign, Illinois',
      year: '2024',
      description: "Working with Professor Yongjoo Park to look for improvements in causal models by improving its parallelism. Also working on optimizing random forest models by improving their parallelism. \n I also worked on Python's pickle module, where I designed a custom threadpool which I used to 'parallely serialize' Python objects. \n Currently working on 'Horizann', a distributed system which runs ANNS (approximate nearest neighbor search) using HNSWs (hierarchical navigable small-world graphs)."
    },
    {
      title: 'Software Engineer',
      company: 'Applied Research Institute',
      duration: 'May - Present',
      location: 'Champaign, Illinois',
      year: '2024',
      description: "Implemented mealplot.com, a website used by researchers, using React.js. Also implemented Flask API-endpoints that served data to the React website.",
    },
    {
      title: 'Intern, Software Engineer',
      company: 'Disruption Lab',
      duration: '3 Months',
      location: 'Champaign, Illinois',
      year: '2023',
      description: "Implemented a DAO (decentralized autonomous organization) using the Aragon SDK. I also tokenized natural resources (nickel, copper, iron) via a new cryptocurrency called Kula.",
    },
    {
      title: 'Intern, Software Engineer',
      company: 'Sellou',
      duration: '3 Months',
      location: 'Tokyo, Japan',
      year: '2023',
      description: "I developed a social-media android app using React-Native for front-end development, and Firebase for the back-end. I Implemented User-credentialing via login and signup forms. Each user had their own dynamic feed of videos. They could also like, comment, and post content."
    },
    {
      title: 'Intern, Software Engineer',
      company: 'Centelon IT Solutions',
      duration: '3 Months',
      location: 'Mumbai, India',
      year: '2022',
      description: "I was tasked with creating a Generative Adversarial Network (GAN) to generate credit card image. Part of my research included a feasibility study, which started with creating an image web-scraper to collect images of credit cards using Python's Selenium Library. The caveat was that to train a GAN, we needed tons of data, which could not simply be collected through sample images."
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