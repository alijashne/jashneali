import Head from "next/head";
import { useEffect, useMemo, useState } from "react";

const stats = [
  { value: 100, suffix: "+", label: "Projects worked on" },
  { value: 50, suffix: "+", label: "Happy clients" },
  { value: 3, suffix: "+", label: "Years experience" },
  { value: 10, suffix: "+", label: "Industries" },
];

const services = [
  {
    number: "01",
    icon: "↗",
    title: "Web Development",
    description: "Fast, responsive products that turn complex ideas into simple, useful experiences.",
    tags: ["React.js", "Next.js", "TypeScript"],
  },
  {
    number: "02",
    icon: "◌",
    title: "Mobile Development",
    description: "Cross-platform mobile apps that feel native, launch confidently and scale with you.",
    tags: ["React Native", "iOS", "Android"],
  },
  {
    number: "03",
    icon: "⌁",
    title: "Backend & APIs",
    description: "Reliable services, integrations and data flows that keep your product moving.",
    tags: ["Node.js", "REST APIs", "Firebase"],
  },
  {
    number: "04",
    icon: "✦",
    title: "UI/UX Implementation",
    description: "Thoughtful interfaces from Figma to pixel-precise, accessible production code.",
    tags: ["Figma", "Design systems", "Sass"],
  },
  {
    number: "05",
    icon: "✳",
    title: "AI & Automation",
    description: "Practical AI features and intelligent workflows that create a measurable advantage.",
    tags: ["AI integrations", "Automation", "Workflows"],
  },
  {
    number: "06",
    icon: "⌂",
    title: "Deployment & DevOps",
    description: "A calm path to production with cloud deployment, release support and maintenance.",
    tags: ["AWS", "CI/CD", "Production support"],
  },
];

const projects = [
  {
    title: "Pi Manager",
    category: "SaaS platform",
    description: "A focused management platform designed to make everyday operations easier to understand and run.",
    tags: ["Web app", "Dashboard", "React"],
    className: "",
    visual: "pi",
  },
  {
    title: "Rapicue",
    category: "Healthcare · Emergency Services",
    description: "An emergency healthcare platform connecting patients to hospitals, doctors and ambulances in real time.",
    tags: ["Healthcare", "Patient Management", "Ambulance Booking", "React Native"],
    className: "",
    visual: "rapicue",
    url: "https://www.rapicue.com",
    images: ["/projects/rapicue/rapicue-home.webp", "/projects/rapicue/rapicue-about.webp"],
    detail: "Rapicue is an emergency healthcare app built to get patients help faster. Patients can register and manage their own medical history, book an ambulance through a live token and queue system, discover nearby hospitals and clinics with real-time availability, run a guided self-assessment and book consultations with doctors — all from a single account.",
    features: [
      "Patient self-registration & self-managed medical history",
      "Real-time ambulance token & queue booking",
      "Nearby hospital & clinic discovery with live availability",
      "Guided self-assessment & doctor consultation booking",
      "Secure, patient-owned health records",
    ],
    role: "I worked as the end-to-end product partner on Rapicue — covering product architecture, UX flows, frontend and backend development, QA and production deployment, coordinated with my development team where needed.",
  },
  {
    title: "Shooting Pro Timer",
    category: "Sports Tech · Shot Timer",
    description: "A sound-detection shot timer for competitive shooters, built for iOS and Android with ISSF and IPSC training modes.",
    tags: ["iOS", "Android", "React Native", "Sound Detection"],
    className: "",
    visual: "shootingtimer",
    status: "Pre-launch · in testing",
    images: [
      "/projects/shooting-pro-timer/home.webp",
      "/projects/shooting-pro-timer/issf-qualification.webp",
      "/projects/shooting-pro-timer/ipsc-listening.webp",
      "/projects/shooting-pro-timer/live-shot-detection.webp",
    ],
    detail: "Shooting Pro Timer is a shot timer app I'm building end-to-end for iOS and Android, aimed at competitive shooters training for ISSF and IPSC/IDPA events. It listens through the device microphone and detects each shot the instant it's fired, logging precise time and split — the same job a stand-alone electronic shot timer does, without the hardware. It runs the same command flow used in real competition, so practice sessions build the exact muscle memory and timing pressure of match day.",
    features: [
      "Real-time, sound-based shot detection — no external timer hardware needed",
      "ISSF qualification timings: 25m Pistol, Rapid Fire Pistol, Standard Pistol",
      "IPSC/IDPA practical modes: Comstock, Par Time, Virginia, hit-factor calculators",
      "Quick workout-style drills (4s / 8s series) for reaction-speed training",
      "Per-shot timing & split analytics, streaks and weekly training goals",
      "Synced profile with favourites, equipment control and subscription tiers",
    ],
    role: "I'm building Shooting Pro Timer end-to-end — the sound-detection engine, the native iOS and Android app, the ISSF/IPSC training modes, and the analytics and account system behind it. Currently in closed testing ahead of launch.",
  },
  {
    title: "Inspection 360",
    category: "Operations platform",
    description: "A structured workflow for capturing information, collaborating and keeping work moving.",
    tags: ["Platform", "API", "Next.js"],
    className: "",
    visual: "inspection",
  },
];

const process = [
  ["01", "Understand", "We discuss your idea, users, requirements and the outcome that matters."],
  ["02", "Plan", "We define scope, milestones, technology and a delivery rhythm you can trust."],
  ["03", "Design", "User flows, wireframes and a visual direction that make the product feel right."],
  ["04", "Build", "Web, mobile, backend and integrations coordinated through one accountable lead."],
  ["05", "Test", "Responsive checks, QA, refinement and performance work before release."],
  ["06", "Launch", "Production deployment, store submissions and the final details that ship well."],
  ["07", "Support", "Ongoing improvements, fixes and new features after the first version is live."],
];

const technologies = ["React", "Next.js", "React Native", "JavaScript", "TypeScript", "Node.js", "Express", "MongoDB", "Firebase", "AWS", "REST API", "Git", "Figma", "Sass", "Bootstrap", "Material UI"];

const contactConfig = {
  email: "YOUR_EMAIL",
  whatsapp: "YOUR_WHATSAPP",
  upwork: "YOUR_UPWORK_URL",
  linkedin: "YOUR_LINKEDIN_URL",
  github: "YOUR_GITHUB_URL",
};

function Reveal({ children, className = "" }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

function Counter({ value, suffix, active }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / 1200, 1);
      setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, value]);
  return <>{count}{suffix}</>;
}

function ProductVisual() {
  return (
    <div className="product-scene" aria-label="Product development dashboard illustration">
      <div className="scene-glow scene-glow-one" />
      <div className="scene-glow scene-glow-two" />
      <div className="dashboard-card">
        <div className="dashboard-top">
          <div className="window-dots"><i /><i /><i /></div>
          <span>product-flow / overview</span>
          <b>•••</b>
        </div>
        <div className="dashboard-body">
          <div className="dashboard-sidebar">
            <span className="side-mark">JA</span>
            <i className="side-active">⌂</i><i>◌</i><i>▦</i><i>⌁</i><i>⚙</i>
          </div>
          <div className="dashboard-content">
            <div className="dashboard-heading">
              <div><small>MONDAY, SEPTEMBER 16</small><h3>Build something <em>meaningful.</em></h3></div>
              <span className="avatar">JA</span>
            </div>
            <div className="metric-row">
              <div className="metric-card"><small>PROJECT HEALTH</small><strong>94.8%</strong><span className="positive">↗ 12.4%</span><div className="mini-chart"><i /><i /><i /><i /><i /><i /><i /></div></div>
              <div className="metric-card purple"><small>DELIVERY STATUS</small><strong>On track</strong><span className="status-dot">●  8 tasks in progress</span><div className="progress"><i /></div></div>
            </div>
            <div className="roadmap">
              <div className="roadmap-title"><span>Product roadmap</span><small>View all →</small></div>
              <div className="roadmap-line"><span className="done">01</span><b>Design system</b><em>Complete</em></div>
              <div className="roadmap-line"><span className="current">02</span><b>Core experience</b><em>In progress</em></div>
              <div className="roadmap-line"><span>03</span><b>Launch & learn</b><em>Next up</em></div>
            </div>
          </div>
        </div>
      </div>
      <div className="float-card float-design"><span>✦</span><div><b>UI/UX Design</b><small>Crafting the experience</small></div></div>
      <div className="float-card float-api"><span>⌁</span><div><b>API Connected</b><small>Everything talking nicely</small></div><strong>✓</strong></div>
      <div className="float-card float-deployed"><span>↗</span><div><b>Deployed</b><small>Ready for the world</small></div><strong>✓</strong></div>
    </div>
  );
}

function ProjectVisual({ type }) {
  return (
    <div className={`project-visual visual-${type}`}>
      <div className="visual-window">
        <div className="visual-bar"><i /><i /><i /><span>{type === "pi" ? "pi manager" : type === "inspection" ? "inspection 360" : type === "rapicue" ? "rapicue.com" : type === "shootingtimer" ? "shooting pro timer" : type}</span></div>
        {type === "pi" && <><div className="visual-nav"><b>Overview</b><span>Activity</span><span>Reports</span><span>Settings</span></div><div className="visual-pi-grid"><div className="visual-stat">Monthly revenue<strong>$48,290</strong></div><div className="visual-stat">Active projects<strong>28 <small>↗ 18%</small></strong></div><div className="visual-bars"><i /><i /><i /><i /><i /><i /><i /></div></div></>}
        {type === "rapicue" && <div className="visual-screenshot"><img src="/projects/rapicue/rapicue-home.webp" alt="Rapicue emergency healthcare app home screen" loading="lazy" /></div>}
        {type === "shootingtimer" && <div className="visual-screenshot visual-screenshot-phone"><img src="/projects/shooting-pro-timer/live-shot-detection.webp" alt="Shooting Pro Timer live shot-detection screen" loading="lazy" /></div>}
        {type === "inspection" && <><div className="inspection-heading"><small>INSPECTION OVERVIEW</small><h4>Field operations at a glance.</h4></div><div className="inspection-rows"><div><b>Westfield / Unit 04</b><span>In review <i /></span></div><div><b>Oak Avenue / Unit 12</b><span>Complete <i /></span></div><div><b>Park Lane / Unit 07</b><span>Scheduled <i /></span></div></div></>}
      </div>
    </div>
  );
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return;
    document.body.style.overflow = "hidden";
    const onKey = (event) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div className="project-modal-overlay" onClick={onClose}>
      <div className="project-modal" onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true" aria-label={`${project.title} project details`}>
        <button className="project-modal-close" onClick={onClose} aria-label="Close project details">✕</button>
        {project.images ? (
          <div className={`project-modal-gallery ${project.images.length > 2 ? "gallery-grid" : ""}`}>
            {project.images.map((src) => <img key={src} src={src} alt={`${project.title} product screenshot`} loading="lazy" />)}
          </div>
        ) : (
          <div className="project-modal-visual"><ProjectVisual type={project.visual} /></div>
        )}
        <div className="project-modal-body">
          <span className="project-category">{project.category}</span>
          <div className="project-modal-heading">
            <h3>{project.title}</h3>
            {project.url && <a className="button button-primary" href={project.url} target="_blank" rel="noreferrer">Visit live site <span>↗</span></a>}
            {!project.url && project.status && <span className="project-status-pill">{project.status}</span>}
          </div>
          <p className="project-modal-detail">{project.detail || project.description}</p>
          {project.features && (
            <div className="project-modal-features">
              <span className="section-kicker">What it does</span>
              <ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            </div>
          )}
          {project.role && (
            <div className="project-modal-role"><span className="section-kicker">My role</span><p>{project.role}</p></div>
          )}
          <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [statsActive, setStatsActive] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [activeProject, setActiveProject] = useState(null);
  const visibleProjects = useMemo(() => projects, []);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (entry.target.id === "stats") setStatsActive(true);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal, #stats").forEach((el) => observer.observe(el));
    window.addEventListener("scroll", onScroll);
    return () => { observer.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, []);

  const handleMouseMove = (event) => {
    if (window.innerWidth < 900) return;
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;
    setMouse({ x, y });
  };

  const scrollTo = (id) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Head>
        <title>Jashne Ali — Software Developer & Product Development Partner</title>
        <meta name="description" content="Jashne Ali builds modern web and mobile products with a dedicated development team, from idea to launch and beyond." />
        <meta property="og:title" content="Jashne Ali — Software Developer & Product Development Partner" />
        <meta property="og:description" content="One accountable developer for your complete product development journey." />
        <meta property="og:type" content="website" />
      </Head>
      <div className="site-shell" onMouseMove={handleMouseMove}>
        <header className={`site-nav ${scrolled ? "nav-scrolled" : ""}`}>
          <a className="brand" href="#home" onClick={() => setMenuOpen(false)}><span>J</span><div><strong>Jashne Ali</strong><small>Software Developer</small></div></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation"><span /><span /><span /></button>
          <nav className={menuOpen ? "open" : ""}>
            {["home", "services", "work", "process", "testimonials", "about", "contact"].map((item) => <a key={item} href={`#${item}`} onClick={() => setMenuOpen(false)}>{item[0].toUpperCase() + item.slice(1)}</a>)}
            <a className="nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>Let&apos;s work together <span>↗</span></a>
          </nav>
        </header>

        <main>
          <section className="hero section-pad" id="home">
            <div className="blob blob-violet" /><div className="blob blob-cyan" /><div className="blob blob-blue" />
            <div className="hero-copy">
              <div className="eyebrow"><i /> Available for new projects</div>
              <h1>I build digital products <span>from idea to launch.</span></h1>
              <p className="hero-lead">Software development, product design and end-to-end delivery — with one point of contact.</p>
              <p className="hero-description">I&apos;m Jashne Ali, a software developer working with a dedicated development team to design, build, launch and support modern web and mobile products.</p>
              <div className="hero-actions"><a className="button button-primary" href="#contact">Start a project <span>↗</span></a><a className="button button-quiet" href="#work">View my work <span>↓</span></a></div>
              <div className="hero-trust"><span>Web</span><i>•</i><span>Mobile</span><i>•</i><span>Backend</span><i>•</i><span>UI/UX</span><i>•</i><span>AI</span><i>•</i><span>DevOps</span></div>
            </div>
            <div className="hero-art" style={{ transform: `translate(${mouse.x * 7}px, ${mouse.y * 5}px)` }}><ProductVisual /></div>
            <div className="hero-bottom"><span>Scroll to explore</span><div className="scroll-line" /><span>01 <b>/ 07</b></span></div>
          </section>

          <section className="stats-section section-pad" id="stats">
            <div className="stats-intro"><span className="section-kicker">A little context</span><h2>Built for momentum.<br /><em>Designed for people.</em></h2></div>
            <div className="stats-grid">{stats.map((stat) => <div className="stat" key={stat.label}><strong><Counter {...stat} active={statsActive} /></strong><span>{stat.label}</span></div>)}<div className="stat stat-global"><strong>Global</strong><span>Client experience</span></div></div>
          </section>

          <section className="intro-section section-pad" id="about">
            <Reveal className="section-heading"><span className="section-kicker">The way I work</span><h2>One developer. A complete<br /><em>development team behind the delivery.</em></h2><p>I work directly with clients as the primary point of contact. For larger or specialized requirements, I coordinate with my development team across frontend, mobile, backend, UI/UX, QA and DevOps.</p></Reveal>
            <Reveal className="delivery-flow"><div className="flow-node client"><span>01</span><b>You</b><small>the client</small></div><div className="flow-connector" /><div className="flow-node jashne"><span>02</span><b>Jashne Ali</b><small>your point of contact</small></div><div className="flow-connector" /><div className="flow-node team"><span>03</span><b>My team</b><small>built around the work</small></div><div className="flow-connector" /><div className="flow-node production"><span>04</span><b>Production</b><small>live & supported</small></div></Reveal>
            <div className="flow-caption"><strong>You talk to Jashne.</strong><span>Jashne manages the project.</span><strong>The team handles the execution.</strong></div>
          </section>

          <section className="services-section section-pad" id="services">
            <Reveal className="section-heading heading-row"><div><span className="section-kicker">Capabilities</span><h2>What I can help<br /><em>you build.</em></h2></div><p>From a focused first version to a full product ecosystem, I bring the right people and practices around the work.</p></Reveal>
            <div className="services-grid">{services.map((service) => <Reveal key={service.title} className="service-card"><div className="service-top"><span className="service-number">{service.number}</span><span className="service-icon">{service.icon}</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="tag-row">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href="#contact" aria-label={`Discuss ${service.title}`}>Explore capability <b>↗</b></a></Reveal>)}</div>
          </section>

          <section className="work-section section-pad" id="work">
            <Reveal className="section-heading heading-row"><div><span className="section-kicker">Selected work</span><h2>A few things I&apos;ve<br /><em>helped bring to life.</em></h2></div><p>Some of the products and applications I&apos;ve worked on across web, mobile and SaaS.</p></Reveal>
            <div className="projects-grid">{visibleProjects.map((project, index) => <Reveal key={project.title} className={`project-card ${project.className}`}><ProjectVisual type={project.visual} /><div className="project-info"><div><div className="project-meta-row"><span className="project-category">{project.category}</span>{!project.url && project.status && <span className="project-status-pill">{project.status}</span>}</div><h3>{project.title}</h3><p>{project.description}</p><div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div><a href="#work" onClick={(event) => { event.preventDefault(); setActiveProject(project); }} aria-label={`View ${project.title} project details`}>View project <b>↗</b></a></div></Reveal>)}</div>
          </section>

          <section className="lifecycle-section section-pad">
            <Reveal className="lifecycle-wrap"><div className="lifecycle-copy"><span className="section-kicker">The full picture</span><h2>From a spark of an idea<br />to something <em>people use.</em></h2><p>A good product journey has momentum. I help keep the thinking, making and shipping connected.</p><a className="text-link" href="#contact">Let&apos;s map yours out <span>↗</span></a></div><div className="lifecycle"><div className="life-path" />{["Idea", "Design", "Build", "Test", "Launch", "Grow"].map((item, i) => <div className={`life-step step-${i + 1}`} key={item}><span>{String(i + 1).padStart(2, "0")}</span><b>{item}</b></div>)}</div></Reveal>
          </section>

          <section className="process-section section-pad" id="process">
            <Reveal className="section-heading"><span className="section-kicker">How I work</span><h2>From first conversation<br /><em>to production.</em></h2></Reveal>
            <div className="process-list">{process.map(([number, title, description]) => <Reveal className="process-item" key={number}><span className="process-number">{number}</span><h3>{title}</h3><p>{description}</p><span className="process-arrow">↗</span></Reveal>)}</div>
          </section>

          <section className="support-section section-pad">
            <Reveal className="support-panel"><div className="support-copy"><span className="section-kicker">After launch</span><h2>Support doesn&apos;t end<br />when the project <em>goes live.</em></h2><p>Products evolve. I can stay close to the work with the same context, care and clarity that got you to launch.</p></div><div className="support-grid">{["Bug fixing", "New features", "UI improvements", "Performance", "API changes", "App updates", "Cloud support", "Product scaling"].map((item, i) => <div key={item} style={{ "--delay": `${i * 60}ms` }}><span>0{i + 1}</span>{item}<b>↗</b></div>)}</div></Reveal>
          </section>

          <section className="why-section section-pad">
            <Reveal className="section-heading"><span className="section-kicker">A better working relationship</span><h2>Why clients choose<br /><em>to work with me.</em></h2></Reveal>
            <div className="why-grid">{[["One point of contact", "You communicate directly with Jashne throughout the project."], ["Full product capability", "Frontend, mobile, backend, UI/UX, QA and deployment under one workflow."], ["Clear milestones", "Work organized into understandable milestones and deliverables."], ["Modern technology", "The right current technologies for the project, not technology for its own sake."], ["Long-term collaboration", "Support can continue after the initial product launch."], ["Business-focused development", "Solving the actual product requirement, not only writing code."]].map(([title, desc], i) => <Reveal className="why-card" key={title}><span>0{i + 1}</span><h3>{title}</h3><p>{desc}</p></Reveal>)}</div>
          </section>

          <section className="tech-section section-pad">
            <Reveal className="section-heading heading-row"><div><span className="section-kicker">The toolkit</span><h2>Technologies I<br /><em>work with.</em></h2></div><p>Tools are only useful when they serve the outcome. These are some of the tools I use to make that happen.</p></Reveal>
            <div className="tech-wall">{technologies.map((tech, i) => <span key={tech} className={`tech-pill tech-${i % 4}`}>{tech}</span>)}</div>
          </section>

          <section className="testimonial-section section-pad" id="testimonials">
            <Reveal className="testimonial-card"><div className="testimonial-mark">“</div><span className="section-kicker">Client perspective</span><blockquote>Add an approved client testimonial here.</blockquote><div className="testimonial-person"><div className="avatar-placeholder">+</div><div><strong>Client name</strong><span>Company · Project</span></div><small>Placeholder for genuine feedback</small></div><div className="carousel-dots"><i className="active" /><i /><i /></div></Reveal>
          </section>

          <section className="upwork-section section-pad">
            <Reveal className="upwork-card"><div className="upwork-symbol">↗</div><div><span className="section-kicker">A simple way to start</span><h2>Working with me<br /><em>on Upwork.</em></h2><p>Proposal <b>→</b> Discussion <b>→</b> Milestones <b>→</b> Development <b>→</b> Delivery <b>→</b> Support</p></div><a className="button button-dark" href={contactConfig.upwork.startsWith("http") ? contactConfig.upwork : "#contact"} target="_blank" rel="noreferrer">View my Upwork profile <span>↗</span></a></Reveal>
          </section>

          <section className="contact-section section-pad" id="contact">
            <Reveal className="contact-grid"><div className="contact-copy"><span className="section-kicker">Start a conversation</span><h2>Have a project<br /><em>in mind?</em></h2><p>Tell me what you&apos;re building and I&apos;ll get back to you with the next steps.</p><div className="contact-details"><a href={contactConfig.email.startsWith("YOUR") ? "#contact-form" : `mailto:${contactConfig.email}`}>Email me <span>↗</span></a><a href="#home">Back to top <span>↑</span></a></div></div><form id="contact-form" className="inquiry-form" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}><div className="form-row"><label>Name<input required name="name" placeholder="Your name" /></label><label>Email<input required type="email" name="email" placeholder="you@company.com" /></label></div><div className="form-row"><label>Project type<select name="type" defaultValue=""><option value="" disabled>Select one</option><option>Web application</option><option>Mobile application</option><option>Backend & API</option><option>Something else</option></select></label><label>Budget<select name="budget" defaultValue=""><option value="" disabled>Choose a range</option><option>$1k – $5k</option><option>$5k – $15k</option><option>$15k+</option></select></label></div><label>Tell me about it<textarea required name="message" rows="4" placeholder="What are you looking to build?" /></label><button className="button button-primary" type="submit">{submitted ? "Thanks — I'll be in touch" : "Let's discuss your project"} <span>↗</span></button><small className="form-note">No database, no fuss. This form is frontend-only and ready to connect to your preferred inbox.</small></form></Reveal>
          </section>

          <section className="final-cta section-pad"><Reveal><span className="section-kicker">The next chapter</span><h2>Let&apos;s turn your idea<br />into a <em>product.</em></h2><p>From a first concept to a production-ready application, I can help coordinate the complete development journey.</p><div className="hero-actions"><a className="button button-light" href="#contact">Start a conversation <span>↗</span></a><a className="button button-outline-light" href="#work">View my work <span>↓</span></a></div></Reveal></section>
        </main>
        <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
        <footer className="site-footer section-pad"><div className="footer-main"><a className="brand" href="#home"><span>J</span><div><strong>Jashne Ali</strong><small>Software Developer</small></div></a><p>Software Developer <i>•</i> Product Development <i>•</i> Web & Mobile</p><div className="footer-links"><a href="#home">Home</a><a href="#services">Services</a><a href="#work">Work</a><a href="#process">Process</a><a href="#testimonials">Testimonials</a><a href="#contact">Contact</a></div></div><div className="footer-bottom"><span>© {currentYear} Jashne Ali. All rights reserved.</span><div><a href={contactConfig.upwork.startsWith("http") ? contactConfig.upwork : "#contact"}>Upwork</a><a href={contactConfig.linkedin.startsWith("http") ? contactConfig.linkedin : "#contact"}>LinkedIn</a><a href={contactConfig.github.startsWith("http") ? contactConfig.github : "#contact"}>GitHub</a><a href="#contact">Email</a></div><span>Designed with intention.</span></div></footer>
      </div>
    </>
  );
}
