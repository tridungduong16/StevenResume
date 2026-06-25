export const ROUTE_SEGMENTS = {
  home: '',
  services: 'services',
  portfolio: 'portfolio',
  process: 'process',
  pricing: 'pricing',
} as const;

export const ROUTES = {
  home: '/',
  services: '/services',
  portfolio: '/portfolio',
  process: '/process',
  pricing: '/pricing',
} as const;

export const NAVIGATION_ITEMS = [
  {
    label: 'Services',
    path: ROUTES.services,
  },
  {
    label: 'Portfolio',
    path: ROUTES.portfolio,
  },
  {
    label: 'Process',
    path: ROUTES.process,
  },
  {
    label: 'Pricing',
    path: ROUTES.pricing,
  },
] as const;
