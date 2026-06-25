import type { RootState } from '@/store';

export const selectAppStatus = (state: RootState) => state.app.isBootstrapped;
export const selectAppTheme = (state: RootState) => state.app.theme;
