import { combineReducers } from '@reduxjs/toolkit';

import { appReducer } from './app/appSlice';

export const rootReducer = combineReducers({
  app: appReducer,
});
