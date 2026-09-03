import { useState } from "react";
import "./App.css";
import "./portfolio.css";

const projects = [
  {
    title: "Shopping App",
    type: "Web apps",
    description: "Responsive e-commerce app with dark mode.",
    detail: "A focused storefront experience with reusable product cards, cart interactions, and a theme switcher.",
    tags: ["React", "Redux", "Tailwind"],
  },
  {
    title: "Task Manager",
    type: "Productivity",
    description: "Personal productivity app with dynamic headers.",
    detail: "A lightweight workspace for sorting priorities, tracking progress, and keeping daily work visible.",
    tags: ["Firebase", "Next.js", "DnD"],
  },
  {
    title: "NGO Website",
    type: "Websites",
    description: "Modern NGO site with animations and branding.",
    detail: "An accessible storytelling site that makes campaigns, impact, and volunteer actions easy to find.",
    tags: ["Framer Motion", "SEO", "A11y"],
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const visibleProjects = filter === "All" 
    ? projects 
    : projects.filter((p) => p.type === filter);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    e.currentTarget.reset();
  };

  return (
    <div className={`App ${darkMode ? "dark" : ""}`}>
      <header className="navbar">
        <nav className="nav-inner">
          <h1 className="logo">Amit Kumar<span>.</span></h1>
          <div className="nav-links">
              {["Home", "About", "Projects", "Contact"].map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`}>{item}</a>
              ))}
          </div>
          <button className="theme-toggle" type="button" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle color theme">
            {darkMode ? "Light" : "Dark"}
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
            <div className="eyebrow">Available for new projects</div>
            <p className="hero-kicker">Frontend developer / AI enthusiast</p>
            <h2>Building the <em>future</em> of the web.</h2>
            <p className="hero-copy">
              I craft immersive, responsive, and high-performance digital experiences that make complex ideas feel simple.
            </p>
            <button className="btn hero-btn" type="button" onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}>
              Explore my work <span aria-hidden="true">↘</span>
            </button>
        </section>

        <section id="about" className="about">
          <p className="section-label">01 / About</p>
          <h2>Thoughtful interfaces, built with intent.</h2>
          <p>I specialize in building responsive web apps, integrating AI tools, and crafting modern UI experiences with a sharp eye for detail.</p>
        </section>

        <section id="projects" className="projects">
          <div className="section-heading">
            <div><p className="section-label">02 / Selected work</p><h2>Things I've made.</h2></div>
            <div className="filters" role="group" aria-label="Filter projects">
              {["All", "Web apps", "Productivity", "Websites"].map((opt) => (
                <button key={opt} type="button" onClick={() => setFilter(opt)} className={`filter ${filter === opt ? "active" : ""}`} aria-pressed={filter === opt}>{opt}</button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <button key={project.title} type="button" onClick={() => setSelectedProject(project)} className={`card project-card card-${index + 1}`}>
                <span className="project-number">0{index + 1}</span>
                <span className="project-type">{project.type}</span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <span className="card-link">View case study <span aria-hidden="true">↗</span></span>
              </button>
            ))}
          </div>
        </section>

        <section id="contact" className="contact">
          <div><p className="section-label">03 / Say hello</p><h2>Have a good idea?</h2><p>Have a question or want to work together? Send a note and let’s start a conversation.</p></div>
          <form onSubmit={handleSubmit}>
            <div className="form-row"><input type="text" placeholder="Name" required /><input type="email" placeholder="Email" required /></div>
            <textarea placeholder="Tell me a little about your project" rows="5" required></textarea>
            <button className="btn" type="submit">Send message <span aria-hidden="true">↗</span></button>
            {submitted && <p className="form-success" role="status">Thanks! I’ll get back to you soon.</p>}
          </form>
        </section>
      </main>

      {selectedProject && (
        <div className="modal-backdrop" role="presentation" onClick={() => setSelectedProject(null)}>
          <div className="modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" type="button" onClick={() => setSelectedProject(null)} aria-label="Close project details">Close</button>
            <span className="project-type">{selectedProject.type}</span>
            <h2 id="project-title">{selectedProject.title}</h2>
            <p>{selectedProject.detail}</p>
            <div className="modal-tags">{selectedProject.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </div>
        </div>
      )}

      <footer><p>© 2026 Amit Kumar <span>•</span> Design & Code</p></footer>
    </div>
  );
}

export default App;