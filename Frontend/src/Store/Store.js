
import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from './Slice/AuthSlice.js';

export const store = configureStore({
  reducer: {
    auth: AuthReducer
  }
});
