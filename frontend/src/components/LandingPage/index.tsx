import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useState } from 'react';

import styles from './LandingPage.module.scss';

type IconName =
  | 'arrowRight'
  | 'arrowUp'
  | 'arrowUpRight'
  | 'calendar'
  | 'check'
  | 'clock'
  | 'dribbble'
  | 'github'
  | 'linkedin'
  | 'mail'
  | 'menu'
  | 'message'
  | 'play'
  | 'smile'
  | 'twitter'
  | 'user'
  | 'zap';

type IconProps = {
  className?: string;
  name: IconName;
};

const profileImage =
  'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/f804111a-fe24-4660-b754-0f3654213f91_320w.jpg';

const navItems = [
  { label: 'Work', href: '#work' },
  { label: 'Skills', href: '#skills' },
  { label: 'Process', href: '#process' },
  { label: 'Contact', href: '#contact' },
] as const;

const tickerItems = ['AI Agents', 'LLM Workflows', 'RAG', 'Python', 'MLOps', 'Explainable AI'];

const services = [
  {
    title: 'AI Agent Engineering',
    description:
      'Design and build agentic systems that can reason over tasks, use tools, retrieve context, and produce reliable outputs.',
    bullets: ['Tool calling', 'Agent workflows', 'Memory design', 'Human-in-the-loop review'],
  },
  {
    title: 'Machine Learning Engineering',
    description:
      'Develop practical ML pipelines from data preparation and modeling through evaluation, deployment, and monitoring.',
    bullets: ['Python ML stack', 'Model evaluation', 'MLOps pipelines', 'Statistical modeling'],
  },
  {
    title: 'Explainable AI',
    description:
      'Make model behavior easier to inspect, communicate, and improve with interpretable methods and research discipline.',
    bullets: ['Interpretable ML', 'XAI methods', 'Experiment design', 'Responsible AI'],
  },
] as const;

const selectedWork = [
  {
    title: 'Incept AI',
    category: 'Personal Site',
    image:
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/a6ea5042-fd78-4888-b5e1-47f268a0569b_800w.jpg',
  },
  {
    title: 'Qonnex AI',
    category: 'Web Platform',
    image:
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/78877756-9e45-410e-b630-78c3dfb8e94c_1600w.jpg',
  },
  {
    title: 'Okas AI',
    category: 'E-commerce',
    image:
      'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/7ee361ca-4978-4130-bab8-b605105c04b4_1600w.jpg',
  },
] as const;

const aboutImages = [
  {
    src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/b6453140-0e66-40b1-89b8-06321fdcdc09_1600w.jpg',
    alt: 'Laptop workspace',
  },
  {
    src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/dfbdff07-910b-401f-9b3c-472e23555ca7_800w.jpg',
    alt: 'Design workspace setup',
  },
  {
    src: 'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/72c8b3bf-292e-4424-b26d-4fcb776f58d6_800w.jpg',
    alt: 'Interface design reference',
  },
] as const;

const aboutHighlights = [
  { icon: 'zap', text: 'Several years of machine learning engineering industry experience.' },
  { icon: 'message', text: 'Researcher and Ph.D. candidate with academic research experience.' },
  { icon: 'smile', text: 'Specialized in Explainable AI, Interpretable Machine Learning, and Statistical Modeling.' },
] as const;

const codeLines = [
  '// Resume interface',
  'const focus = {',
  '  role: "AI Engineer",',
  '  stack: ["Python", "LLMs", "RAG", "MLOps"],',
  '  goal: "ship reliable AI agents"',
  '};',
] as const;

function Icon({ className, name }: IconProps) {
  const paths: Record<IconName, ReactNode> = {
    arrowRight: (
      <>
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </>
    ),
    arrowUp: <path d="M12 19V6m-7 7 7-7 7 7" />,
    arrowUpRight: (
      <>
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </>
    ),
    calendar: (
      <>
        <path d="M8 2v4" />
        <path d="M16 2v4" />
        <rect width="18" height="18" x="3" y="4" rx="2" />
        <path d="M3 10h18" />
      </>
    ),
    check: <path d="M20 6 9 17l-5-5" />,
    clock: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </>
    ),
    dribbble: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
        <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
        <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
      </>
    ),
    github: (
      <>
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </>
    ),
    linkedin: (
      <>
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </>
    ),
    mail: (
      <>
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" />
      </>
    ),
    menu: (
      <>
        <path d="M4 12h16" />
        <path d="M4 18h16" />
        <path d="M4 6h16" />
      </>
    ),
    message: <path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719" />,
    play: <path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z" />,
    smile: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01" />
        <path d="M15 9h.01" />
      </>
    ),
    twitter: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
    user: (
      <>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </>
    ),
    zap: <path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z" />,
  };

  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      {paths[name]}
    </svg>
  );
}

function BrandMark() {
  return (
    <a className={styles.brand} href="#hero">
      <span>SD</span>
      <strong>Steven</strong>
    </a>
  );
}

function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.navShell}>
        <div className={styles.navBar}>
          <BrandMark />
          <nav aria-label="Primary navigation" className={styles.navLinks}>
            {navItems.map((item) => (
              <a href={item.href} key={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className={styles.connectButton} href="#contact">
            <Icon name="arrowRight" />
            Let's connect
          </a>
          <button
            aria-expanded={isOpen}
            aria-label="Toggle navigation"
            className={styles.menuButton}
            onClick={() => setIsOpen((value) => !value)}
            type="button"
          >
            <Icon name="menu" />
          </button>
        </div>
        {isOpen ? (
          <nav aria-label="Mobile navigation" className={styles.mobileNav}>
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={() => setIsOpen(false)}>
                {item.label}
              </a>
            ))}
            <a className={styles.mobileConnect} href="#contact" onClick={() => setIsOpen(false)}>
              <Icon name="arrowRight" />
              Let's connect
            </a>
          </nav>
        ) : null}
      </div>
    </header>
  );
}

function StatusIndicator() {
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <button className={styles.statusIndicator} onClick={scrollToContact} type="button">
      <span className={styles.statusDot} />
      <span>Available for projects</span>
      <Icon name="arrowUpRight" />
    </button>
  );
}

function HeroSection() {
  const [cursor, setCursor] = useState({ active: false, x: 0, y: 0 });
  const heroStyle = {
    '--cursor-x': `${cursor.x}px`,
    '--cursor-y': `${cursor.y}px`,
  } as CSSProperties;

  return (
    <section
      className={`${styles.hero} ${cursor.active ? styles.cursorActive : ''}`}
      id="hero"
      onMouseEnter={() => setCursor((value) => ({ ...value, active: true }))}
      onMouseLeave={() => setCursor((value) => ({ ...value, active: false }))}
      onMouseMove={(event) => setCursor({ active: true, x: event.clientX, y: event.clientY })}
      style={heroStyle}
    >
      <div className={styles.container}>
        <div className={styles.heroInner}>
          <div className={`${styles.profileWrap} ${styles.scaleIn}`}>
            <img alt="Steven Duong" src={profileImage} />
          </div>
          <p className={`${styles.eyebrow} ${styles.slideUp}`}>Steven Duong</p>
          <h1 className={`${styles.heroTitle} ${styles.slideUp} ${styles.delay1}`}>
            <span>AI</span>
            <span>Engineer</span>
          </h1>
          <p className={`${styles.heroCopy} ${styles.slideUp} ${styles.delay2}`}>
            I build machine learning systems and AI agents with practical engineering, research
            depth, and a focus on reliable model behavior.
          </p>
          <div className={`${styles.heroActions} ${styles.slideUp} ${styles.delay3}`}>
            <a className={styles.primaryButton} href="#work">
              <Icon name="play" />
              View my work
              <Icon name="arrowRight" />
            </a>
            <a className={styles.secondaryButton} href="#about">
              <Icon name="user" />
              About me
            </a>
          </div>
          <div className={`${styles.heroStats} ${styles.fadeIn} ${styles.delay4}`}>
            <div>
              <strong>LLM Agents</strong>
              <span>Agent systems</span>
            </div>
            <div>
              <strong>RAG</strong>
              <span>Retrieval workflows</span>
            </div>
            <div>
              <strong>XAI</strong>
              <span>Interpretability</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function TrustedTicker() {
  const items = [...tickerItems, ...tickerItems, ...tickerItems];

  return (
    <section className={styles.tickerSection}>
      <div className={styles.container}>
        <p>Core AI engineering toolkit</p>
        <div className={styles.tickerMask}>
          <div className={styles.tickerTrack}>
            {items.map((item, index) => (
              <span key={`${item}-${index}`}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className={styles.services} id="skills">
      <div className={styles.container}>
        <SectionIntro
          kicker="What I do"
          title="AI engineering for agentic products."
          body="Skills focused on LLM agents, machine learning systems, retrieval workflows, and interpretable model behavior."
        />
        <div className={styles.serviceGrid}>
          {services.map((service, index) => (
            <article className={styles.serviceCard} key={service.title} style={{ '--card-index': index } as CSSProperties}>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
              <ul>
                {service.bullets.map((bullet) => (
                  <li key={bullet}>
                    <Icon name="check" />
                    {bullet}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function WorkSection() {
  return (
    <section className={styles.work} id="work">
      <div className={styles.container}>
        <div className={styles.sectionRow}>
          <div>
            <span>Selected Work</span>
            <h2>Project snapshots</h2>
          </div>
          <a href="#contact">
            Start a conversation
            <Icon name="arrowUpRight" />
          </a>
        </div>
        <div className={styles.workGrid}>
          {selectedWork.map((work) => (
            <article className={styles.workCard} key={work.title}>
              <img alt={work.title} src={work.image} />
              <div className={styles.workOverlay} />
              <div className={styles.workMeta}>
                <strong>{work.title}</strong>
                <span>{work.category}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section className={styles.about} id="about">
      <div className={styles.container}>
        <SectionIntro kicker="About me" title="Curious about Steven?" />
        <div className={styles.aboutGrid}>
          <div className={styles.aboutMedia}>
            <img alt={aboutImages[0].alt} className={styles.aboutHeroImage} src={aboutImages[0].src} />
            <div className={styles.aboutThumbs}>
              {aboutImages.slice(1).map((image) => (
                <img alt={image.alt} key={image.src} src={image.src} />
              ))}
            </div>
          </div>
          <div className={styles.aboutCopy}>
            <h3>Machine learning engineering and applied research.</h3>
            <p>
              I am a highly experienced professional with a diverse background in the field of
              machine learning engineering, having gained several years of industry experience and
              honed my research skills as a researcher and Ph.D. candidate in the academic sphere.
            </p>
            <p>
              I possess a comprehensive understanding of machine learning algorithms, probability,
              and statistics, and through my participation in various empirical and academic
              projects, I have acquired a great deal of specialized expertise in the areas of
              Explainable AI, Interpretable Machine Learning, Statistical Modeling, and software
              development best practices.
            </p>
            <ul className={styles.aboutHighlights}>
              {aboutHighlights.map((item) => (
                <li key={item.text}>
                  <span>
                    <Icon name={item.icon} />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className={styles.process} id="process">
      <div className={styles.container}>
        <SectionIntro
          kicker="Process"
          title="From structure to polished delivery."
          body="The process cards preserve template2's glass panels, code window, and metrics treatment without relying on external scripts."
        />
        <div className={styles.processGrid}>
          <article className={styles.processCard}>
            <ResearchIllustration />
            <span className={styles.processMeta}>
              <Icon name="clock" />
              Discovery
            </span>
            <h3>Research and structure</h3>
            <p>
              Start by clarifying the user path, content hierarchy, and technical constraints before
              investing in final visuals.
            </p>
          </article>
          <article className={styles.processCard}>
            <CodeWindow />
            <span className={styles.processMeta}>
              <Icon name="clock" />
              Build
            </span>
            <h3>Design and implementation</h3>
            <p>
              Translate the layout into maintainable React components, scoped styles, and smooth
              interaction states.
            </p>
          </article>
          <article className={styles.processCard}>
            <MetricsIllustration />
            <span className={styles.processMeta}>
              <Icon name="clock" />
              Refine
            </span>
            <h3>Test and refine</h3>
            <p>
              Check the interface across breakpoints, trim layout shifts, and polish small details
              before handoff.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  return <ProcessSection />;
}

export function CtaSection() {
  return <ContactSection />;
}

function SectionIntro({ body, kicker, title }: { body?: string; kicker: string; title: string }) {
  return (
    <div className={styles.sectionIntro}>
      <span>{kicker}</span>
      <h2>{title}</h2>
      {body ? <p>{body}</p> : null}
    </div>
  );
}

function ResearchIllustration() {
  return (
    <div className={styles.researchIllustration} aria-hidden="true">
      <div className={styles.researchGrid}>
        <div className={styles.researchPanelSmall}>User Journey</div>
        <div className={styles.researchPanelLarge}>
          <span />
          <span />
          <span />
        </div>
        <div className={styles.researchPanelCircle}>Personas</div>
      </div>
    </div>
  );
}

function CodeWindow() {
  return (
    <div className={styles.codeWindow} aria-label="AI engineering code sample">
      <div className={styles.windowChrome}>
        <span />
        <span />
        <span />
      </div>
      <pre>
        {codeLines.map((line, index) => (
          <code key={line} style={{ '--line-index': index } as CSSProperties}>
            {line}
          </code>
        ))}
      </pre>
    </div>
  );
}

function MetricsIllustration() {
  return (
    <div className={styles.metricsIllustration} aria-hidden="true">
      <div className={styles.metricPanelLarge}>
        <span>USABILITY</span>
        <svg viewBox="0 0 260 90">
          <path d="M20 70 C60 44 78 56 110 36 S170 18 230 12" />
          {Array.from({ length: 9 }, (_, index) => (
            <rect height={25 + index * 4} key={index} width="4" x={24 + index * 24} y={64 - index * 4} />
          ))}
        </svg>
      </div>
      <div className={styles.metricPanelSmall}>
        <strong>94%</strong>
        <span>Task success</span>
      </div>
    </div>
  );
}

function ContactSection() {
  return (
    <footer className={styles.contact} id="contact">
      <div className={styles.container}>
        <div className={styles.contactGrid}>
          <div>
            <h2>Let's create something useful together</h2>
            <p>
              Ready to discuss a frontend role, product UI, or a resume review? I keep the
              conversation focused on what needs to ship.
            </p>
            <div className={styles.contactActions}>
              <a className={styles.primaryButton} href="mailto:hello@stevenduong.dev">
                <Icon name="mail" />
                hello@stevenduong.dev
              </a>
              <a className={styles.secondaryButton} href="#work">
                <Icon name="calendar" />
                Review work
              </a>
            </div>
            <div className={styles.socials}>
              {(['dribbble', 'twitter', 'linkedin', 'github'] as const).map((name) => (
                <a aria-label={name} href="#" key={name}>
                  <Icon name={name} />
                </a>
              ))}
            </div>
          </div>
          <div className={styles.quickLinks}>
            <h3>Quick Links</h3>
            <div>
              <nav aria-label="Footer resume links">
                {navItems.map((item) => (
                  <a href={item.href} key={item.href}>
                    {item.label}
                  </a>
                ))}
              </nav>
              <nav aria-label="Footer focus links">
                {['AI Agents', 'RAG', 'Explainable AI', 'MLOps'].map((item) => (
                  <a href="#skills" key={item}>
                    {item}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <div>
            <span>SD</span>
            <p>(c) 2026 Steven Duong. All rights reserved.</p>
          </div>
          <p>Designed from template2, rebuilt as React components.</p>
        </div>
      </div>
    </footer>
  );
}

function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      aria-label="Go to top"
      className={`${styles.scrollTop} ${visible ? styles.scrollTopVisible : ''}`}
      onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
      type="button"
    >
      <Icon name="arrowUp" />
    </button>
  );
}

export function LandingShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <div className={styles.background} aria-hidden="true" />
      <StatusIndicator />
      <SiteHeader />
      <main>{children}</main>
      <ScrollTopButton />
    </div>
  );
}

export function HomeLanding() {
  return (
    <LandingShell>
      <HeroSection />
      <TrustedTicker />
      <ServicesSection />
      <WorkSection />
      <AboutSection />
      <ProcessSection />
      <ContactSection />
    </LandingShell>
  );
}
