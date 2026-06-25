const trimTrailingSlash = (value: string) => value.replace(/\/+$/, '');

export const env = {
  apiUrl: trimTrailingSlash(import.meta.env.VITE_API_URL ?? ''),
  wsUrl: trimTrailingSlash(import.meta.env.VITE_WS_URL ?? ''),
  publicStaticsUrl: trimTrailingSlash(import.meta.env.VITE_PUBLIC_STATICS_URL ?? ''),
  appEnv: import.meta.env.VITE_APP_ENV ?? import.meta.env.MODE,
} as const;
