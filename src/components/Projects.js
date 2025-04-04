import '../styles/projectstyles.css';
import React from 'react';
import Project from './Project';

function Projects() {
  
  const projects = [
    {
      title: 'Healthify',
      skills: ['React.JS', 'SQL'],
      description: "A straightforward workflow productivity app for medical residents in India. Residents are usually overworked daily, and have no electronic health record system (at least for those in public hospitals). This app makes their work easier.",
      githubLink: 'https://github.com/AdityaKunte18/Healthify',
    },
    {
      title: 'Mood Music',
      skills: ['Python', 'SpotifyAPI', 'ML'],
      description: "Using the Wav2Vec2 model to determine a speaker's mood, and then generating a spotify playlist based on that mood.",
      githubLink: 'https://github.com/shiv213/moodmusic',
    },
    {
      title: 'CricLookup',
      skills: ['Python', "web-scraping", "data-manipulation"],
      description: "For the 2024 Cricket IPL, I fetched player data (runs and wickets) from cricinfo. This involved a lot of string parsing to determine the type of wicket (caught-out, LBW) and the number of runs. I used fuzzy matching to match player scores to player names in a dictionary.",
      githubLink: 'https://github.com/AdityaKunte18/cricLookup'
    },
    {
      title: 'Ascent Rock Climbing Tool',
      skills: ["Embedded Systems", "C++"],
      description: "This was my team's project for the Buildspace Hackathon. We used muscle sensors to measure forearm grip strength, and returned metrics like fatigue-periods, max grip strength, etc.." ,
      githubLink: 'https://github.com/shiv213/ascent',
    },
    {
      title: 'Pull Up',
      skills: ["Full-Stack", "SQL", "Flask", "Cloud"],
      description: "Pull Up is an app designed to centralize event discovery at UIUC, allowing organizations to list events and users to receive personalized recommendations. It uses a SQL server on the Google Cloud Platform to ensure up-to-date event information.",
      githubLink: 'https://github.com/cs411-alawini/PullUp',
    },
    {
      title: 'Course Recommendation System',
      skills: ['Full-Stack', 'Python'],
      description: 'A course recommendation system that considers user-selected courses, professor ratings, sentiment analysis from Reddit comments, and other academic factors.',
      githubLink: 'https://github.com/CS222-UIUC/course-project-group-99',
    },
    {
      title: 'Community Detection',
      skills: ['Algorithms', 'C++'],
      description: "Parsed a Stanford musae dataset that contained relationships between users on facebook, based off of if a user was friends or not. We used the Girvan-Newman algorithm to create node clusters, and then used Dijkstra's to find out node relationships for a given user." ,
      githubLink: 'https://github.com/mbarik2/CS225_final_project/tree/main/CFP',
    },
    {
      title: 'JLPT N5 Vocab database',
      skills: ['Selenium', 'Python'],
      description: 'Created a database of \'N5\' level words, including verbs, adjectives, nouns, and kanji, scraped using Selenium and then processed with pandas.' ,
      githubLink: 'https://github.com/AdityaKunte18/jlptn5Verbs',
    }
    // Add more projects here
  ];

  return (
    <div className="projectsContainer">
      {projects.map((project, index) => (
        <Project
          key={index}
          title={project.title}
          skills={project.skills}
          description={project.description}
          githubLink={project.githubLink}
        />
      ))}
    </div>
  );
}

export default Projects;