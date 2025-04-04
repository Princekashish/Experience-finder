import { configureStore } from '@reduxjs/toolkit';
import authReducer from './silce/authSlice';

// Configure the Redux store
const store = configureStore({
  reducer: {
    auth: authReducer, // auth slice for user data
  },
});

// Define RootState type from the store's state
export type RootState = ReturnType<typeof store.getState>;

// Export the store
export default store;
