"use client";
import { useState, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import "../styles/styles.css";
import { CiLinkedin } from "react-icons/ci";
import { FaSquareGithub, FaGithub } from "react-icons/fa6";
import { IoDocumentAttachOutline } from "react-icons/io5";
import { IoSunnyOutline, IoMoonOutline } from "react-icons/io5";

const PDFViewer = dynamic(() => import("@/components/PDFViewer"), {
  ssr: false,
  loading: () => (
    <div style={{ color: "#666", padding: 40 }}>Loading...</div>
  ),
});

/* ═══════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════ */

const TABS = ["About", "Projects", "Experience"];

const PROJECTS = [
  { title: "Fetch", category: "Agent", skills: ["Next.js", "LLM APIs", "Browser Automation", "Full-Stack"], desc: "Open-source agent browser: pick a model, plug in your API key, and let AI browse the web for you.", link: "https://github.com/AdityaKunte18/Fetch", featured: true },
  { title: "FundHub", category: "AI", skills: ["LangGraph-RAG", "Web Scraping", "Diarization"], desc: "Scraped fund manager info from articles and diarized YouTube videos, then built LangGraph verifier + answerer nodes for citation-backed RAG results.", link: "https://github.com/AdityaKunte18/FundHub" },
  { title: "Board2Ticket", category: "AI", skills: ["Computer Vision", "LLMs", "Github API"], desc: "Hackathon winner. CV + audio pipeline identifies whiteboard sections, GPT vision runs inference, outputs actionable GitHub issues.", link: "https://github.com/shiv213/board2ticket" },
  { title: "Healthify", category: "App", skills: ["React Native", "SQL", "Android"], desc: "Workflow productivity app for medical residents in Indian public hospitals with no EHR system.", link: "https://github.com/AdityaKunte18/Healthify" },
  { title: "Mood Music", category: "AI", skills: ["Python", "Spotify API", "ML"], desc: "Wav2Vec2 detects speaker mood, generates matching Spotify playlist.", link: "https://github.com/shiv213/moodmusic" },
  { title: "CricLookup", category: "Data", skills: ["Python", "Web Scraping"], desc: "Scraped 2024 IPL player data from Cricinfo with fuzzy name matching.", link: "https://github.com/AdityaKunte18/cricLookup" },
  { title: "Ascent", category: "Hardware", skills: ["Embedded Systems", "C++"], desc: "Buildspace Hackathon. Muscle sensors measure forearm grip strength and fatigue metrics.", link: "https://github.com/shiv213/ascent" },
  { title: "Pull Up", category: "Full-Stack", skills: ["Full-Stack", "SQL", "Flask", "GCP"], desc: "Centralized event discovery at UIUC with personalized recommendations on Google Cloud.", link: "https://github.com/cs411-alawini/PullUp" },
  { title: "Course Rec System", category: "Full-Stack", skills: ["Full-Stack", "Python"], desc: "Recommends courses via professor ratings, Reddit sentiment analysis, and user prefs.", link: "https://github.com/CS222-UIUC/course-project-group-99" },
  { title: "Community Detection", category: "Algorithms", skills: ["Algorithms", "C++"], desc: "Girvan-Newman clustering + Dijkstra pathfinding on Stanford Facebook dataset.", link: "https://github.com/mbarik2/CS225_final_project/tree/main/CFP" },
  { title: "JLPT N5 Vocab DB", category: "Data", skills: ["Selenium", "Python"], desc: "Scraped and structured N5-level Japanese vocabulary using Selenium + pandas.", link: "https://github.com/AdityaKunte18/jlptn5Verbs" },
];

const EXPERIENCE = [
  { title: "AI Intern", company: "DSP Mutual Funds", year: "2025", location: "Mumbai, India", desc: "Built 'Hawkeye', a full-stack AI compliance platform for monitoring fund manager communications. Developed the frontend in React with a Node.js backend and PostgreSQL database. Implemented JWT-based authentication, built a FastAPI microservice for audio diarization, and fine-tuned OpenAI Whisper using LoRA adapters to improve transcription accuracy on financial domain audio." },
  { title: "Research", company: "CreateLab", year: "2024", location: "Champaign, IL", desc: "Working with Prof. Yongjoo Park on improving causal model parallelism for ML training pipelines. Developed a custom pickle-based threadpool for efficient model serialization across workers. Currently building 'Horizann', a distributed approximate nearest neighbor search system built on top of Hierarchical Navigable Small World graphs." },
  { title: "Software Engineer", company: "Applied Research Institute", year: "2024-25", location: "Champaign, IL", desc: "Built mealplot.com, a web application used by nutrition researchers to visualize and analyze dietary data. Developed the frontend in React.js and designed RESTful Flask API endpoints for data retrieval and processing, enabling researchers to generate custom meal composition plots." },
  { title: "Intern", company: "Disruption Lab", year: "2023", location: "Champaign, IL", desc: "Built a decentralized autonomous organization (DAO) using the Aragon SDK to govern community resource allocation. Designed and implemented a tokenization framework for natural resources through the Kula cryptocurrency, exploring blockchain-based incentive structures for sustainability." },
  { title: "Intern", company: "Sellou", year: "2023", location: "Tokyo, Japan", desc: "Developed a React Native social media application with a Firebase backend. Built core features including user authentication, video feed with infinite scroll, social interactions (likes, comments, follows), and real-time notifications. Shipped the app to both iOS and Android." },
  { title: "Intern", company: "Centelon IT Solutions", year: "2022", location: "Mumbai, India", desc: "Trained a Generative Adversarial Network (GAN) for synthetic credit card image generation to augment training data for OCR models. Built a Selenium-based web scraper for automated data collection and authored a feasibility study on using generative models for financial document processing." },
];

const ABOUT_TEXT = [
  "I\u2019m a Master\u2019s student in Computer Science at the University of Illinois at Urbana-Champaign, where I also completed my Bachelor\u2019s with a minor in Statistics.",
  "My focus is on building systems for AI and AI for systems \u2014 training and deploying ML models at scale, cost-effectively. I work with agentic frameworks like LangGraph, LlamaIndex, and n8n to build tools and pipelines.",
  "I\u2019m also an experienced full-stack developer across React, Next.js, React Native, Node.js, Flask, PostgreSQL, and Firebase.",
];

const SKILLS = [
  { label: "Languages", items: "Python, C++, JavaScript, TypeScript, SQL" },
  { label: "AI / ML", items: "LangGraph, LlamaIndex, Whisper, PyTorch" },
  { label: "Frontend", items: "React, Next.js, React Native" },
  { label: "Backend", items: "Node.js, Flask, PostgreSQL, Firebase" },
];

/* ═══════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════ */

function useTypewriter(text, speed = 60, startDelay = 0) {
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);
  useEffect(() => {
    let i = 0;
    let timeout;
    const start = setTimeout(() => {
      const tick = () => {
        if (i <= text.length) {
          setDisplayed(text.slice(0, i));
          i++;
          timeout = setTimeout(tick, speed);
        } else {
          setDone(true);
        }
      };
      tick();
    }, startDelay);
    return () => { clearTimeout(start); clearTimeout(timeout); };
  }, [text, speed, startDelay]);
  return { displayed, done };
}

function useTheme() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.dataset.theme = saved;
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next;
      localStorage.setItem("theme", next);
      return next;
    });
  }, []);

  return { theme, toggle };
}

/* ═══════════════════════════════════════════
   COMPONENTS
   ═══════════════════════════════════════════ */

/* ─── CONSTELLATION BACKGROUND ─── */
const NODE_COUNT = 50;
const LINK_DIST = 150;

function FloatingParticles() {
  const canvasRef = useRef(null);
  const nodes = useRef([]);
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* seed nodes */
    nodes.current = Array.from({ length: NODE_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 1,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cs = getComputedStyle(document.documentElement);
      const dotColor = cs.getPropertyValue("--particle").trim();
      const lineColor = cs.getPropertyValue("--particle-line").trim();
      const pts = nodes.current;

      /* move */
      for (const p of pts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;
      }

      /* draw connecting lines */
      ctx.lineWidth = 0.8;
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x;
          const dy = pts[i].y - pts[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < LINK_DIST) {
            const opacity = 1 - dist / LINK_DIST;
            ctx.globalAlpha = opacity;
            ctx.strokeStyle = lineColor;
            ctx.beginPath();
            ctx.moveTo(pts[i].x, pts[i].y);
            ctx.lineTo(pts[j].x, pts[j].y);
            ctx.stroke();
          }
        }
      }

      /* draw dots */
      ctx.globalAlpha = 1;
      for (const p of pts) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", resize);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}

export default function Home() {
  const [entered, setEntered] = useState(false);
  const { theme, toggle } = useTheme();
  const handleEnter = useCallback(() => setEntered(true), []);

  return (
    <>
      <FloatingParticles />
      {!entered && <HeroScreen onEnter={handleEnter} />}
      {entered && (
        <div className="world">
          <MainContent theme={theme} onToggleTheme={toggle} />
        </div>
      )}
    </>
  );
}

/* ─── HERO ─── */
function HeroScreen({ onEnter }) {
  const name = useTypewriter("Aditya Kunte", 90, 400);
  const [showSub, setShowSub] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (name.done) setShowSub(true);
  }, [name.done]);

  useEffect(() => {
    const t = setTimeout(() => setReady(true), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="hero" onClick={ready ? onEnter : undefined}>
      <div className="grid-floor" />

      <div className="hero-center">
        <h1 className="hero-name">
          {name.displayed}
          {!name.done && <span className="cursor">|</span>}
        </h1>

        <p className={`hero-sub ${showSub ? "hero-sub--visible" : ""}`}>
          Software Engineer &nbsp;/&nbsp; CS @ UIUC &nbsp;/&nbsp; AI &amp; Systems
        </p>

        <div className={`hero-enter ${ready ? "hero-enter--visible" : ""}`}>
          <div className="hero-arrow">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── MAIN CONTENT (tabs) ─── */
function MainContent({ theme, onToggleTheme }) {
  const [tab, setTab] = useState(TABS[0]);
  const [animKey, setAnimKey] = useState(0);

  const switchTab = (t) => {
    if (t === tab) return;
    setTab(t);
    setAnimKey((k) => k + 1);
  };

  return (
    <div className="app">
      <nav className="nav">
        <div className="nav-tabs">
          {TABS.map((t) => (
            <button
              key={t}
              className={`nav-tab ${tab === t ? "nav-tab--active" : ""}`}
              onClick={() => switchTab(t)}
            >
              {t}
            </button>
          ))}
        </div>
        <div className="nav-icons">
          <span className="nav-email">akunte2 [at] illinois [dot] edu</span>
          <a href="https://www.linkedin.com/in/aditya-kunte/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><CiLinkedin /></a>
          <a href="https://github.com/AdityaKunte18" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaSquareGithub /></a>
          <a href="/Aditya_Kunte_current.pdf" target="_blank" rel="noopener noreferrer" aria-label="Resume"><IoDocumentAttachOutline /></a>
          <button className="theme-toggle" onClick={onToggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <IoSunnyOutline /> : <IoMoonOutline />}
          </button>
        </div>
      </nav>

      <main className="content" key={animKey}>
        {tab === "About" && <AboutTab />}
        {tab === "Projects" && <ProjectsTab />}
        {tab === "Experience" && <ExperienceTab />}
      </main>

      <footer className="site-footer">
        <span className="footer-email">akunte2 @ illinois dot edu</span>
        <span>Built by Aditya Kunte</span>
      </footer>
    </div>
  );
}

/* ─── ABOUT ─── */
function AboutTab() {
  return (
    <div className="about">
      <div className="about-prose">
        {ABOUT_TEXT.map((t, i) => <p key={i}>{t}</p>)}
      </div>

      <div className="about-skills">
        {SKILLS.map(({ label, items }) => (
          <div key={label} className="skill-row">
            <span className="skill-label">{label}</span>
            <span className="skill-items">{items}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── PROJECTS ─── */
function ProjectsTab() {
  const [expanded, setExpanded] = useState(null);
  const featured = PROJECTS.filter((p) => p.featured);
  const regular = PROJECTS.filter((p) => !p.featured);

  const renderCard = (p, i, isFeatured) => {
    const isOpen = expanded === p.title;
    return (
      <div
        key={p.title}
        className={`proj-card ${isFeatured ? "proj-card--featured" : ""} ${isOpen ? "proj-card--open" : ""}`}
        style={{ animationDelay: `${i * 0.05}s` }}
        onClick={() => setExpanded(isOpen ? null : p.title)}
      >
        <div className="proj-card-top">
          <div className="proj-card-badges">
            <span className={`proj-cat proj-cat--${p.category.toLowerCase().replace("-", "")}`}>{p.category}</span>
            {isFeatured && <span className="proj-badge-current">Currently Working On</span>}
          </div>
          <a
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="proj-gh"
            onClick={(e) => e.stopPropagation()}
          >
            <FaGithub />
          </a>
        </div>
        <h3 className="proj-name">{p.title}</h3>
        <p className="proj-summary">{p.desc}</p>
        {isOpen && (
          <div className="proj-detail">
            <div className="proj-tags">
              {p.skills.map((s) => (
                <span key={s} className="tag">{s}</span>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="proj-section">
      {featured.map((p, i) => renderCard(p, i, true))}
      <div className="proj-grid">
        {regular.map((p, i) => renderCard(p, featured.length + i, false))}
      </div>
    </div>
  );
}

/* ─── EXPERIENCE ─── */
function ExperienceTab() {
  return (
    <div className="timeline">
      {EXPERIENCE.map((exp, i) => (
        <div key={i} className="tl-row" style={{ animationDelay: `${i * 0.07}s` }}>
          <div className="tl-left">
            <div className="tl-dot" />
            {i < EXPERIENCE.length - 1 && <div className="tl-stem" />}
          </div>
          <div className="tl-card">
            <div className="tl-top">
              <div>
                <h3 className="tl-company">{exp.company}</h3>
                <p className="tl-role">{exp.title}</p>
              </div>
              <div className="tl-info">
                <span className="tl-year">{exp.year}</span>
                <span className="tl-loc">{exp.location}</span>
              </div>
            </div>
            <p className="tl-desc">{exp.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─── RESUME MODAL ─── */
function ResumeModal({ onClose }) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);
  return (
    <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-bar">
          <a className="modal-btn" href="/Aditya_Kunte_current.pdf" download>Download</a>
          <a className="modal-btn" href="/Aditya_Kunte_current.pdf" target="_blank" rel="noopener noreferrer">New Tab</a>
          <button className="modal-x" onClick={onClose} aria-label="Close">&times;</button>
        </div>
        <div className="modal-body"><PDFViewer /></div>
      </div>
    </div>
  );
}
