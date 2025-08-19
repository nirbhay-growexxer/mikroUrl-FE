import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import featureFlagReducer from './featureFlagSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    featureFlags: featureFlagReducer, // dynamically import to avoid circular dependency
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
