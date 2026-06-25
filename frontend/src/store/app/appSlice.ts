import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type AppTheme = 'dark' | 'light';

interface AppState {
  isBootstrapped: boolean;
  theme: AppTheme;
}

const initialState: AppState = {
  isBootstrapped: true,
  theme: 'dark',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setBootstrapped(state, action: PayloadAction<boolean>) {
      state.isBootstrapped = action.payload;
    },
    setTheme(state, action: PayloadAction<AppTheme>) {
      state.theme = action.payload;
    },
  },
});

export const { setBootstrapped, setTheme } = appSlice.actions;
export const appReducer = appSlice.reducer;
