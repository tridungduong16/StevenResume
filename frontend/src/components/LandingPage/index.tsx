import clsx from 'clsx';
import { Link, NavLink } from 'react-router-dom';

import { NAVIGATION_ITEMS, ROUTES } from '@/constants/routes';
import {
  capabilities,
  features,
  footerGroups,
  logoUrls,
  pricingPlans,
  processTiles,
  solutions,
} from './landingData';
import { ArrowRightIcon, CheckIcon, CodeIcon, FeatureIcon, SocialIcon } from './icons';
import styles from './LandingPage.module.scss';

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link className={styles.brand} to={ROUTES.home} aria-label="Asterix home">
      <span className={clsx(styles.brandIcon, compact && styles.brandIconCompact)}>A*</span>
      <span className={clsx(styles.brandName, compact && styles.brandNameCompact)}>Asterix</span>
    </Link>
  );
}

function AnimatedButton() {
  const primaryText = 'Start Now'.split('');
  const focusText = "Let's Go".split('');

  return (
    <Link className={styles.generateButton} to={ROUTES.pricing} aria-label="Start building">
      <CodeIcon className={styles.generateIcon} />
      <span className={styles.generateText}>
        <span className={styles.generateTextPrimary}>
          {primaryText.map((letter, index) => (
            <span
              className={clsx(styles.generateLetter, letter === ' ' && styles.generateSpace)}
              key={`${letter}-${index}`}
            >
              {letter}
            </span>
          ))}
        </span>
        <span className={styles.generateTextSecondary}>
          {focusText.map((letter, index) => (
            <span
              className={clsx(styles.generateLetter, letter === ' ' && styles.generateSpace)}
              key={`${letter}-${index}`}
            >
              {letter}
            </span>
          ))}
        </span>
      </span>
    </Link>
  );
}

function SiteHeader() {
  return (
    <header className={styles.header} id="top">
      <div className={styles.container}>
        <div className={styles.navbar}>
          <BrandMark />
          <nav className={styles.navLinks} aria-label="Primary navigation">
            {NAVIGATION_ITEMS.map((item) => (
              <NavLink
                className={({ isActive }) => clsx(isActive && styles.navLinkActive)}
                to={item.path}
                key={item.path}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className={styles.navActions}>
            <Link className={styles.signIn} to={ROUTES.home}>
              Sign in
            </Link>
            <Link className={styles.projectLink} to={ROUTES.pricing}>
              <span />
              Start Project
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroContent}>
          <div className={styles.statusBadge}>
            <span className={styles.statusDot}>
              <span />
            </span>
            Accepting New Clients
          </div>
          <h1>
            Build the web of
            <br />
            <span>
              tomorrow.
              <svg viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            </span>
          </h1>
          <p>
            Asterix engineers high-performance digital experiences. From pixel-perfect design to
            scalable architecture, we create websites that convert visitors into loyal customers.
          </p>
          <div className={styles.heroActions}>
            <AnimatedButton />
            <Link className={styles.secondaryButton} to={ROUTES.portfolio}>
              View Portfolio
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
        <FeatureGrid />
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <div className={styles.featureGrid}>
      {features.map((feature) => (
        <article className={styles.featureCard} key={feature.title}>
          <div className={styles.featureGlow} />
          <span className={styles.featureIcon}>
            <FeatureIcon name={feature.icon} />
          </span>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </article>
      ))}
    </div>
  );
}

function LogoMarquee() {
  const logos = [...logoUrls, ...logoUrls, logoUrls[0], logoUrls[1]];

  return (
    <section className={styles.logoSection}>
      <div className={styles.container}>
        <p>Trusted by 500+ innovative companies</p>
        <div className={styles.logoMask}>
          <div className={styles.logoTrack}>
            {logos.map((logo, index) => (
              <img src={logo} alt={`Client logo ${index + 1}`} key={`${logo}-${index}`} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section className={styles.services} id="services">
      <div className={styles.container}>
        <div className={styles.servicesSingle}>
          <div className={styles.servicesCopy}>
            <h2>
              Websites that
              <br />
              <span>perform & convert.</span>
            </h2>
            <p>
              We don't just build websites; we engineer digital ecosystems. Our approach combines
              data-driven design with cutting-edge technology to deliver results that matter.
            </p>
            <div className={styles.capabilityList}>
              {capabilities.map((capability) => (
                <article className={styles.capabilityItem} key={capability.title}>
                  <h3>{capability.title}</h3>
                  <p>{capability.description}</p>
                </article>
              ))}
            </div>
            <Link className={styles.textLink} to={ROUTES.portfolio}>
              Explore Capabilities
              <ArrowRightIcon />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProcessSection() {
  const leftTiles = processTiles.slice(0, 2);
  const rightTiles = processTiles.slice(2);

  return (
    <section className={styles.services} id="process">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Process</h2>
            <p>From early structure to scalable launch, each stage has a clear purpose.</p>
          </div>
          <Link to={ROUTES.pricing}>
            Start a project
            <span>
              <ArrowRightIcon />
            </span>
          </Link>
        </div>
        <div className={styles.processGridPage}>
          <div className={styles.tileColumnOffset}>
            {leftTiles.map((tile) => (
              <ProcessTile tile={tile} key={tile.title} />
            ))}
          </div>
          <div className={styles.tileColumn}>
            {rightTiles.map((tile) => (
              <ProcessTile tile={tile} key={tile.title} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessTile({ tile }: { tile: (typeof processTiles)[number] }) {
  return (
    <article className={clsx(styles.processTile, tile.tall && styles.processTileTall)}>
      <img src={tile.image} alt={tile.alt} />
      <div className={styles.imageOverlay} />
      <div>
        <p>{tile.phase}</p>
        <h3>{tile.title}</h3>
      </div>
    </article>
  );
}

export function WorkSection() {
  return (
    <section className={styles.work} id="work">
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div>
            <h2>Curated Solutions</h2>
            <p>Tailored packages for every stage of your digital journey.</p>
          </div>
          <Link to={ROUTES.pricing}>
            View all projects
            <span>
              <ArrowRightIcon />
            </span>
          </Link>
        </div>
        <div className={styles.solutionGrid}>
          {solutions.map((solution) => (
            <article className={styles.solutionCard} key={solution.title}>
              <div className={styles.solutionImage}>
                <img src={solution.image} alt={solution.alt} />
                <div className={styles.imageOverlay} />
                {solution.badge ? <span>{solution.badge}</span> : null}
              </div>
              <div className={styles.solutionBody}>
                <h3>{solution.title}</h3>
                <p>{solution.description}</p>
                <div>
                  <span>{solution.timeline}</span>
                  <strong>{solution.price}</strong>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PricingSection() {
  return (
    <section className={styles.pricing} id="pricing">
      <div className={styles.container}>
        <div className={styles.pricingIntro}>
          <h2>Transparent Pricing</h2>
          <p>Choose the plan that fits your growth stage.</p>
        </div>
        <div className={styles.pricingGrid}>
          {pricingPlans.map((plan) => (
            <article
              className={clsx(styles.pricingCard, plan.featured && styles.pricingCardFeatured)}
              key={plan.name}
            >
              {plan.featured ? <span className={styles.popularBadge}>Most Popular</span> : null}
              <h3>{plan.name}</h3>
              <p>{plan.description}</p>
              <div className={styles.priceLine}>
                <strong>{plan.price}</strong>
                {plan.suffix ? <span>{plan.suffix}</span> : null}
              </div>
              <ul>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <CheckIcon />
                    {feature}
                  </li>
                ))}
              </ul>
              <a
                className={clsx(styles.pricingButton, plan.featured && styles.pricingButtonPrimary)}
                href="#"
              >
                {plan.cta}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaSection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaWash} />
      <div className={styles.ctaGlow} />
      <div className={styles.ctaContent}>
        <h2>Ready to elevate your digital presence?</h2>
        <p>
          Join the visionaries who trust Asterix to build their future. We turn complex
          requirements into elegant, high-performance websites.
        </p>
        <div>
          <Link className={styles.ctaPrimary} to={ROUTES.pricing}>
            Start Your Project
            <ArrowRightIcon />
          </Link>
          <Link className={styles.ctaSecondary} to={ROUTES.home}>
            Book Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <BrandMark compact />
            <p>
              We are a digital product studio crafting experiences that merge art, technology, and
              strategy. Based in San Francisco, serving the world.
            </p>
            <div className={styles.socialLinks}>
              {(['twitter', 'instagram', 'linkedin'] as const).map((social) => (
                <Link to={ROUTES.home} aria-label={social} key={social}>
                  <SocialIcon name={social} />
                </Link>
              ))}
            </div>
          </div>
          {footerGroups.map((group) => (
            <nav aria-label={group.title} key={group.title}>
              <h2>{group.title}</h2>
              <ul>
                {group.links.map((link) => (
                  <li key={link}>
                    <Link to={ROUTES.home}>{link}</Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className={styles.footerBottom}>
          <p>© 2024 Asterix Digital. All rights reserved.</p>
          <div>
            <Link to={ROUTES.home}>Privacy Policy</Link>
            <Link to={ROUTES.home}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function LandingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.page}>
      <div className={styles.background} aria-hidden="true">
        <div className={styles.backgroundGlow} />
        <div className={styles.backgroundGrid} />
      </div>
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}

export function HomeLanding() {
  return (
    <LandingShell>
      <HeroSection />
      <LogoMarquee />
      <CtaSection />
    </LandingShell>
  );
}
