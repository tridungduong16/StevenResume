export const features = [
  {
    title: 'Enterprise Security',
    description:
      'Bank-grade protection with automated threat detection, DDoS mitigation, and SSL management at the edge.',
    icon: 'shield',
  },
  {
    title: 'Lightning Fast',
    description:
      'Global CDN distribution ensures your site loads in milliseconds, optimizing core web vitals instantly.',
    icon: 'bolt',
  },
  {
    title: 'Modern Stack',
    description:
      'Built with the latest frameworks and best practices for maintainable, scalable, and clean codebases.',
    icon: 'cube',
  },
] as const;

export const logoUrls = [
  'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/917d6f93-fb36-439a-8c48-884b67b35381_1600w.jpg',
  'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/4734259a-bad7-422f-981e-ce01e79184f2_1600w.jpg',
  'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/c543a9e1-f226-4ced-80b0-feb8445a75b9_1600w.jpg',
  'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/5bab247f-35d9-400d-a82b-fd87cfe913d2_1600w.webp',
  'https://hoirqrkdgbmvpwutwuwj.supabase.co/storage/v1/object/public/assets/assets/30104e3c-5eea-4b93-93e9-5313698a7156_1600w.webp',
] as const;

export const capabilities = [
  {
    title: 'AI Agent Engineering',
    description:
      'Tool-using agent workflows with retrieval, memory, orchestration, and human review patterns.',
  },
  {
    title: 'Machine Learning Engineering',
    description:
      'Production-minded ML pipelines spanning data preparation, modeling, evaluation, deployment, and monitoring.',
  },
  {
    title: 'Explainable AI',
    description:
      'Interpretable model analysis using statistical modeling, XAI methods, and research-driven evaluation.',
  },
] as const;

export const processTiles = [
  {
    phase: 'Orchestrate',
    title: 'Tool-using Agents',
    alt: 'Abstract AI agent orchestration concept',
    image:
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
    tall: true,
  },
  {
    phase: 'Retrieve',
    title: 'RAG Pipelines',
    alt: 'Code and retrieval workspace',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=800&auto=format&fit=crop',
    tall: false,
  },
  {
    phase: 'Explain',
    title: 'XAI Models',
    alt: 'Model analytics dashboard',
    image:
      'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop',
    tall: false,
  },
  {
    phase: 'Evaluate',
    title: 'Agent Quality',
    alt: 'Future AI evaluation scene',
    image:
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800&auto=format&fit=crop',
    tall: true,
  },
] as const;

export const solutions = [
  {
    title: 'Incept AI',
    description:
      'High-conversion landing pages integrated with analytics and CRM tools. Perfect for product launches.',
    timeline: '2-4 Weeks',
    price: 'From $5k',
    badge: 'Popular',
    alt: 'SaaS analytics dashboard',
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Qonnex AI',
    description:
      'Custom Shopify or headless solutions designed for speed and sales. Inventory and payment integration.',
    timeline: '4-8 Weeks',
    price: 'From $12k',
    badge: undefined,
    alt: 'E-commerce interface',
    image:
      'https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=800&auto=format&fit=crop',
  },
  {
    title: 'Okas AI',
    description:
      'Full-stack application development using React, Next.js, and Node. Complex logic made simple.',
    timeline: '8+ Weeks',
    price: 'Custom Quote',
    badge: undefined,
    alt: 'Web app data dashboard',
    image:
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop',
  },
] as const;

export const pricingPlans = [
  {
    name: 'Starter',
    description: 'Essential digital presence.',
    price: '$2,900',
    suffix: '/project',
    features: ['5 Page Website', 'Basic SEO Setup', 'Mobile Responsive', 'Contact Form'],
    cta: 'Get Started',
    featured: false,
  },
  {
    name: 'Growth',
    description: 'Scale your business.',
    price: '$7,900',
    suffix: '/project',
    features: ['10+ Page Website', 'CMS Integration', 'Advanced Analytics', 'Technical SEO Audit'],
    cta: 'Get Started',
    featured: true,
  },
  {
    name: 'Enterprise',
    description: 'Custom complex solutions.',
    price: 'Custom',
    suffix: undefined,
    features: ['Unlimited Pages', 'Custom Web App', 'Priority Support', 'Dedicated Manager'],
    cta: 'Contact Sales',
    featured: false,
  },
] as const;

export const footerGroups = [
  {
    title: 'Services',
    links: ['Web Design', 'Development', 'SEO & Optimization', 'Content Strategy'],
  },
  {
    title: 'Company',
    links: ['About Us', 'Careers', 'Blog', 'Contact'],
  },
] as const;
