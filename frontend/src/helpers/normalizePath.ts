export const normalizePath = (...parts: string[]) =>
  parts
    .filter(Boolean)
    .join('/')
    .replace(/\/{2,}/g, '/')
    .replace(/\/+$/, '');
