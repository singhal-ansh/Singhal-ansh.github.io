import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Home", "Skills", "Projects", "Experience", "Contact"];

const SKILLS = {
  "Languages": ["Java", "C++", "Python", "JavaScript (ES6+)", "SQL", "HTML5", "CSS3"],
  "Frontend": ["React.js", "Angular", "Next.js", "Bootstrap"],
  "Backend": ["Spring Boot", "Node.js", "Express.js", "Django/Flask", "REST API"],
  "Databases": ["PostgreSQL", "MySQL", "MongoDB", "MariaDB"],
  "DevOps & Tools": ["Docker", "Jenkins", "Git/GitHub", "CI/CD (GitHub Actions)", "Postman"],
  "Core CS": ["DSA", "OOP", "MVC Architecture", "Design Patterns", "API Security"],
};

const SKILL_ICONS = {
  "Languages": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
  "Frontend": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="3" width="20" height="14" rx="2"/><polyline points="8 21 12 17 16 21"/>
    </svg>
  ),
  "Backend": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/>
      <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/>
    </svg>
  ),
  "Databases": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>
    </svg>
  ),
  "DevOps & Tools": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
    </svg>
  ),
  "Core CS": (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/>
      <line x1="9" y1="2" x2="9" y2="4"/><line x1="15" y1="2" x2="15" y2="4"/>
      <line x1="9" y1="20" x2="9" y2="22"/><line x1="15" y1="20" x2="15" y2="22"/>
      <line x1="20" y1="9" x2="22" y2="9"/><line x1="20" y1="14" x2="22" y2="14"/>
      <line x1="2" y1="9" x2="4" y2="9"/><line x1="2" y1="14" x2="4" y2="14"/>
    </svg>
  ),
};

const PROJECTS = [
  {
    name: "Digital Gold Wallet",
    desc: "Secure backend for digital gold transactions, wallet management & payment processing. JWT auth, Razorpay integration, and Dockerized deployment for scalable handling.",
    tags: ["Spring Boot", "PostgreSQL", "Docker", "JWT", "Razorpay"],
    code: "https://github.com/singhal-ansh/digigold-backend",
    live: "https://digigold-frontend-production.up.railway.app/",
    icon: "💰",
  },
  {
    name: "Wanderlust",
    desc: "Full-stack property listing platform with authentication, CRUD operations, REST API integration, and cloud-based image storage via Cloudinary.",
    tags: ["MongoDB", "Express.js", "Node.js", "REST API", "MVC"],
    code: "https://github.com/Singhal-ansh/wanderlust",
    live: "https://wanderlust-znk4.onrender.com/listings",
    icon: "🏠",
  },
  {
    name: "Movie Explorer",
    desc: "Responsive movie discovery platform with dynamic search, favorites management, and real-time TMDB API integration with reusable React components.",
    tags: ["React.js", "TMDb API", "JavaScript", "Responsive UI"],
    code: "https://github.com/Singhal-ansh/Movie-List-using-React",
    live: "https://react-movie-explorer.onrender.com/",
    icon: "🎬",
  },
];

const EXPERIENCE = [
  {
    role: "Software Developer Intern",
    company: "Carvemylife Coaching Services Pvt Ltd",
    location: "Bangalore, India",
    period: "June 2025 – Oct 2025",
    type: "internship",
    bullets: [
      "Engineered 5+ ERP modules using Python, JavaScript, and Frappe, reducing manual operational effort through workflow automation.",
      "Built 10+ REST APIs and automated backend jobs across core business workflows to improve operational efficiency.",
      "Collaborated in Agile development using Git/GitHub and Docker-based environments for scalable feature deployment.",
    ],
  },
  {
    role: "Java Full Stack Trainee",
    company: "Capgemini",
    location: "India",
    period: "Jan 2026 – May 2026",
    type: "training",
    bullets: [
      "Designed and developed RESTful APIs using Spring Boot, PostgreSQL, and JPA/Hibernate for authentication and business workflows.",
      "Integrated Angular frontend applications with Spring Boot backend services following MVC architecture practices.",
    ],
  },
];

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

function AnimSection({ children, className = "", delay = 0 }) {
  const ref = useRef();
  const inView = useInView(ref);
  return (
    <div
  ref={ref}
  className={className}
  style={{
    height: "100%",
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(40px)",
    transition: `opacity 0.7s ease ${delay}s, transform 0.7s ease ${delay}s`,
  }}
>
      {children}
    </div>
  );
}

export default function Portfolio() {
  const [activeNav, setActiveNav] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [heroVisible, setHeroVisible] = useState(false);

  const titles = ["Full-Stack Developer", "Java & Spring Boot Dev", "MERN Stack Engineer", "Problem Solver"];
  const titleRef = useRef({ ti: 0, ci: 0, deleting: false, wait: 0 });

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
    const interval = setInterval(() => {
      const s = titleRef.current;
      const word = titles[s.ti];
      if (s.wait > 0) { s.wait--; return; }
      if (!s.deleting) {
        if (s.ci <= word.length) { setTyped(word.slice(0, s.ci)); s.ci++; }
        else { s.deleting = true; s.wait = 30; }
      } else {
        if (s.ci > 0) { s.ci--; setTyped(word.slice(0, s.ci)); }
        else { s.deleting = false; s.ti = (s.ti + 1) % titles.length; s.wait = 5; }
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const sections = NAV_LINKS.map(n => document.getElementById(n.toLowerCase()));
      const scrollY = window.scrollY + 120;
      sections.forEach((s, i) => {
        if (s && scrollY >= s.offsetTop) setActiveNav(NAV_LINKS[i]);
      });
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#050A14", color: "#E8EDF5", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&family=JetBrains+Mono:wght@400;500&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: #050A14; } ::-webkit-scrollbar-thumb { background: #00FFB2; border-radius: 2px; }
        .tag { background: rgba(0,255,178,0.08); color: #00FFB2; border: 1px solid rgba(0,255,178,0.2); padding: 3px 10px; border-radius: 20px; font-size: 11px; font-family: 'JetBrains Mono', monospace; }
        .btn-primary { background: #00FFB2; color: #050A14; border: none; padding: 12px 28px; border-radius: 6px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
        .btn-primary:hover { background: #00e0a0; transform: translateY(-2px); box-shadow: 0 8px 30px rgba(0,255,178,0.3); }
        .btn-outline { background: transparent; color: #00FFB2; border: 1.5px solid #00FFB2; padding: 11px 28px; border-radius: 6px; font-family: 'Syne', sans-serif; font-weight: 700; font-size: 14px; cursor: pointer; transition: all 0.2s; text-decoration: none; display: inline-block; }
        .btn-outline:hover { background: rgba(0,255,178,0.1); transform: translateY(-2px); }
        .card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; transition: all 0.3s; }
        .card:hover { border-color: rgba(0,255,178,0.3); transform: translateY(-4px); box-shadow: 0 20px 60px rgba(0,0,0,0.4); }
        .glow { text-shadow: 0 0 40px rgba(0,255,178,0.4); }
        .dot { width: 8px; height: 8px; border-radius: 50%; background: #00FFB2; display: inline-block; margin-right: 8px; animation: pulse 2s infinite; }
        @keyframes pulse { 0%,100%{opacity:1;} 50%{opacity:0.3;} }
        .grid-bg { background-image: linear-gradient(rgba(0,255,178,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,178,0.03) 1px, transparent 1px); background-size: 50px 50px; }
        .skill-pill { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px; padding: 10px 16px; font-size: 13px; transition: all 0.2s; cursor: default; font-family: 'JetBrains Mono', monospace; }
        .skill-pill:hover { background: rgba(0,255,178,0.1); border-color: #00FFB2; color: #00FFB2; transform: scale(1.05); }
        .nav-link { color: #9BA8BB; text-decoration: none; font-size: 14px; font-weight: 500; transition: color 0.2s; cursor: pointer; padding: 6px 0; }
        .nav-link:hover, .nav-link.active { color: #00FFB2; }
        .nav-link.active { border-bottom: 2px solid #00FFB2; }
        .exp-badge { padding: 4px 12px; border-radius: 20px; font-size: 11px; font-weight: 600; font-family: 'JetBrains Mono', monospace; }
        .section-label { color: #00FFB2; font-family: 'JetBrains Mono', monospace; font-size: 12px; letter-spacing: 3px; text-transform: uppercase; margin-bottom: 12px; }
        .section-title { font-family: 'Syne', sans-serif; font-size: clamp(32px, 5vw, 52px); font-weight: 800; line-height: 1.1; }
        a { color: inherit; text-decoration: none; }
        .social-icon { width: 40px; height: 40px; border-radius: 10px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; transition: all 0.2s; cursor: pointer; }
        .social-icon:hover { background: rgba(0,255,178,0.15); border-color: #00FFB2; transform: translateY(-3px); }
        .cursor-blink { border-right: 2px solid #00FFB2; animation: blink 0.7s step-end infinite; padding-right: 2px; }
        @keyframes blink { 0%,100%{border-color:#00FFB2;} 50%{border-color:transparent;} }
        .float { animation: float 6s ease-in-out infinite; }
        @keyframes float { 0%,100%{transform:translateY(0);} 50%{transform:translateY(-12px);} }
        .orb { position: absolute; border-radius: 50%; filter: blur(80px); pointer-events: none; }
      `}</style>

      {/* NAV */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(5,10,20,0.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 20, color: "#00FFB2" }}>AS<span style={{ color: "#E8EDF5" }}>.</span></span>
          <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
            {NAV_LINKS.map(l => (
              <span key={l} className={`nav-link${activeNav === l ? " active" : ""}`} onClick={() => scrollTo(l)}>{l}</span>
            ))}
          </div>
          <a className="btn-primary" href="mailto:anshsighal0507@gmail.com" style={{ padding: "9px 20px", fontSize: 13 }}>Hire Me</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="grid-bg" style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        <div className="orb" style={{ width: 600, height: 600, background: "rgba(0,255,178,0.06)", top: -100, right: -200 }} />
        <div className="orb" style={{ width: 400, height: 400, background: "rgba(0,100,255,0.05)", bottom: 0, left: -100 }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "100px 24px 60px", width: "100%", display: "flex", alignItems: "center", gap: 60, flexWrap: "wrap" }}>
          <div style={{ flex: "1 1 480px", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateY(30px)", transition: "all 0.9s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
              <span className="dot" />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#9BA8BB" }}>Available for opportunities</span>
            </div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(42px, 7vw, 76px)", lineHeight: 1.05, marginBottom: 16 }}>
              Hi, I'm <span style={{ color: "#00FFB2" }} className="glow">Ansh</span><br />Singhal
            </h1>
            <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(18px, 2.5vw, 26px)", color: "#9BA8BB", marginBottom: 24, height: 36 }}>
              <span style={{ color: "#E8EDF5" }} className="cursor-blink">{typed}</span>
            </div>
            <p style={{ color: "#7A8799", fontSize: 16, lineHeight: 1.75, maxWidth: 520, marginBottom: 36 }}>
              CS graduate with hands-on experience across the full stack — from React & Angular frontends to Spring Boot microservices & Node.js backends.
              Shipped real products during my internship, trained at Capgemini, and ready to contribute from day one.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 40 }}>
              <a className="btn-primary" href="#projects" onClick={e => { e.preventDefault(); scrollTo("Projects"); }}>View Projects</a>
              <a className="btn-outline" href="#contact" onClick={e => { e.preventDefault(); scrollTo("Contact"); }}>Let's Connect</a>
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { href: "https://github.com/singhal-ansh", label: "GH", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg> },
                { href: "https://www.linkedin.com/in/ansh-singhal-b79b2730b/", label: "LI", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg> },
                { href: "https://leetcode.com/u/ansh_singhal/", label: "LC", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M13.483 0a1.374 1.374 0 0 0-.961.438L7.116 6.226l-3.854 4.126a5.266 5.266 0 0 0-1.209 2.104 5.35 5.35 0 0 0-.125.513 5.527 5.527 0 0 0 .062 2.362 5.83 5.83 0 0 0 .349 1.017 5.938 5.938 0 0 0 1.271 1.818l4.277 4.193.039.038c2.248 2.165 5.852 2.133 8.063-.074l2.396-2.392c.54-.54.54-1.414.003-1.955a1.378 1.378 0 0 0-1.951-.003l-2.396 2.392a3.021 3.021 0 0 1-4.205.038l-.02-.019-4.276-4.193c-.652-.64-.972-1.469-.948-2.263a2.68 2.68 0 0 1 .066-.523 2.545 2.545 0 0 1 .619-1.164L9.13 8.114c1.058-1.134 3.204-1.27 4.43-.278l3.501 2.831c.593.48 1.461.387 1.94-.207a1.384 1.384 0 0 0-.207-1.943l-3.5-2.831c-.8-.647-1.766-1.045-2.774-1.202l2.015-2.158A1.384 1.384 0 0 0 13.483 0zm-2.866 12.815a1.38 1.38 0 0 0-1.38 1.382 1.38 1.38 0 0 0 1.38 1.382H19.61a1.38 1.38 0 0 0 1.38-1.382 1.38 1.38 0 0 0-1.38-1.382z" /></svg> },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" className="social-icon" style={{ color: "#9BA8BB" }}>{s.icon}</a>
              ))}
            </div>
          </div>

          {/* Avatar Card */}
          <div style={{ flex: "0 0 auto", opacity: heroVisible ? 1 : 0, transform: heroVisible ? "none" : "translateX(40px)", transition: "all 1.1s ease 0.2s" }} className="float">
            <div style={{ width: 320, height: 380, position: "relative" }}>
              <div style={{ position: "absolute", inset: 0, borderRadius: 24, background: "linear-gradient(135deg, rgba(0,255,178,0.15), rgba(0,100,255,0.1))", border: "1px solid rgba(0,255,178,0.2)" }} />
              <div style={{ position: "absolute", inset: 12, borderRadius: 16, background: "rgba(255,255,255,0.02)", backdropFilter: "blur(10px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <div style={{ width: 110, height: 110, borderRadius: "50%", background: "linear-gradient(135deg, #00FFB2, #0066FF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 44, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#050A14" }}>A</div>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20 }}>Ansh Singhal</div>
                  <div style={{ color: "#00FFB2", fontSize: 13, fontFamily: "'JetBrains Mono', monospace", marginTop: 4 }}>Full-Stack Developer</div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "center", padding: "0 16px" }}>
                  {["Java", "React", "Spring Boot", "Angular"].map(t => <span key={t} className="tag">{t}</span>)}
                </div>
                <div style={{ display: "flex", gap: 24, marginTop: 8 }}>
                  {[["3+", "Projects"], ["1", "Internship"], ["DSA", "Strong"]].map(([n, l]) => (
                    <div key={l} style={{ textAlign: "center" }}>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#00FFB2" }}>{n}</div>
                      <div style={{ fontSize: 11, color: "#7A8799" }}>{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 30, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 6, opacity: 0.5 }}>
          <span style={{ fontSize: 11, fontFamily: "'JetBrains Mono', monospace", color: "#9BA8BB" }}>scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(to bottom, #00FFB2, transparent)" }} />
        </div>
      </section>

      {/* SKILLS */}
<section id="skills" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
  <AnimSection>
    <div className="section-label">// 01. expertise</div>
    <h2 className="section-title" style={{ marginBottom: 16 }}>Technical <span style={{ color: "#00FFB2" }}>Skills</span></h2>
    <p style={{ color: "#7A8799", maxWidth: 500, marginBottom: 60 }}>A curated stack built through projects, internships & enterprise training.</p>
  </AnimSection>
  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24, alignItems: "stretch" }}>
    {Object.entries(SKILLS).map(([cat, items], i) => (
      <AnimSection key={cat} delay={i * 0.08}>
        <div className="card" style={{ padding: 28, height: "100%", boxSizing: "border-box" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <span style={{ color: "#00FFB2" }}>{SKILL_ICONS[cat]}</span>
            <div style={{ color: "#00FFB2", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: 1 }}>{cat.toUpperCase()}</div>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {items.map(s => <span key={s} className="skill-pill">{s}</span>)}
          </div>
        </div>
      </AnimSection>
    ))}
  </div>
</section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "100px 24px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <AnimSection>
            <div className="section-label">// 02. work</div>
            <h2 className="section-title" style={{ marginBottom: 16 }}>Featured <span style={{ color: "#00FFB2" }}>Projects</span></h2>
            <p style={{ color: "#7A8799", maxWidth: 500, marginBottom: 60 }}>Real-world applications built with modern technologies.</p>
          </AnimSection>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 24 }}>
            {PROJECTS.map((p, i) => (
              <AnimSection key={p.name} delay={i * 0.1}>
                <div className="card" style={{ padding: 32, height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: 40, marginBottom: 16 }}>{p.icon}</div>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 12 }}>{p.name}</h3>
                  <p style={{ color: "#7A8799", fontSize: 14, lineHeight: 1.7, flex: 1, marginBottom: 20 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 24 }}>
                    {p.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <div style={{ display: "flex", gap: 12 }}>
                    <a href={p.code} target="_blank" rel="noreferrer" className="btn-outline" style={{ padding: "8px 18px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>
                      Code
                    </a>
                    <a href={p.live} target="_blank" rel="noreferrer" className="btn-primary" style={{ padding: "8px 18px", fontSize: 13, display: "flex", alignItems: "center", gap: 6 }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>
                      Live
                    </a>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" style={{ padding: "100px 24px", maxWidth: 1100, margin: "0 auto" }}>
        <AnimSection>
          <div className="section-label">// 03. journey</div>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Experience & <span style={{ color: "#00FFB2" }}>Training</span></h2>
          <p style={{ color: "#7A8799", maxWidth: 500, marginBottom: 60 }}>Professional experience and enterprise-grade training.</p>
        </AnimSection>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {EXPERIENCE.map((e, i) => (
            <AnimSection key={e.company} delay={i * 0.15}>
              <div className="card" style={{ padding: 36 }}>
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 16, marginBottom: 20 }}>
                  <div>
                    <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 6 }}>{e.role}</h3>
                    <div style={{ color: "#00FFB2", fontWeight: 500, marginBottom: 4 }}>{e.company}</div>
                    <div style={{ color: "#7A8799", fontSize: 13 }}>{e.location}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                    <span className="exp-badge" style={{ background: e.type === "internship" ? "rgba(0,255,178,0.1)" : "rgba(0,100,255,0.1)", color: e.type === "internship" ? "#00FFB2" : "#6699FF", border: `1px solid ${e.type === "internship" ? "rgba(0,255,178,0.3)" : "rgba(0,100,255,0.3)"}` }}>
                      {e.type === "internship" ? "Internship" : "Training"}
                    </span>
                    <span style={{ fontSize: 13, color: "#9BA8BB", fontFamily: "'JetBrains Mono', monospace" }}>{e.period}</span>
                  </div>
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                  {e.bullets.map((b, j) => (
                    <li key={j} style={{ display: "flex", gap: 12, color: "#9BA8BB", fontSize: 14, lineHeight: 1.6 }}>
                      <span style={{ color: "#00FFB2", marginTop: 4, flexShrink: 0 }}>▸</span>
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "100px 24px", background: "rgba(255,255,255,0.01)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto", textAlign: "center" }}>
          <AnimSection>
            <div className="section-label" style={{ display: "inline-block" }}>// 04. contact</div>
            <h2 className="section-title" style={{ margin: "12px 0 20px" }}>Let's Build <span style={{ color: "#00FFB2" }}>Together</span></h2>
            <p style={{ color: "#7A8799", fontSize: 16, lineHeight: 1.75, marginBottom: 48 }}>
              I'm actively looking for full-time opportunities. Whether you have a role, a project, or just want to connect — my inbox is always open.
            </p>
            <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap", marginBottom: 60 }}>
              <a className="btn-primary" href="mailto:anshsighal0507@gmail.com" style={{ fontSize: 15, padding: "14px 36px" }}>Say Hello 👋</a>
              <a className="btn-outline" href="https://www.linkedin.com/in/ansh-singhal-b79b2730b/" target="_blank" rel="noreferrer" style={{ fontSize: 15, padding: "14px 36px" }}>LinkedIn</a>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {[
                { label: "Email", val: "anshsighal0507@gmail.com", href: "mailto:anshsighal0507@gmail.com" },
                { label: "Phone", val: "+91-8630426800", href: "tel:+918630426800" },
                { label: "Location", val: "Ghaziabad, UP, India", href: null },
              ].map(c => (
                <div key={c.label} className="card" style={{ padding: 20 }}>
                  <div style={{ color: "#00FFB2", fontSize: 11, fontFamily: "'JetBrains Mono', monospace", marginBottom: 8 }}>{c.label}</div>
                  {c.href ? <a href={c.href} style={{ color: "#E8EDF5", fontSize: 13, wordBreak: "break-all" }}>{c.val}</a>
                    : <span style={{ color: "#E8EDF5", fontSize: 13 }}>{c.val}</span>}
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", padding: "28px 24px", textAlign: "center" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: 16, justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 18, color: "#00FFB2" }}>AS<span style={{ color: "#E8EDF5" }}>.</span></span>
          <span style={{ color: "#4A5568", fontSize: 13, fontFamily: "'JetBrains Mono', monospace" }}>© 2026 Ansh Singhal — Built with React</span>
          <div style={{ display: "flex", gap: 24 }}>
            {NAV_LINKS.map(l => <span key={l} className="nav-link" style={{ fontSize: 13 }} onClick={() => scrollTo(l)}>{l}</span>)}
          </div>
        </div>
      </footer>
    </div>
  );
}