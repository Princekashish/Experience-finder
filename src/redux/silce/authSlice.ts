import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';

// Define a type for the slice state
interface AuthState {
  user: User | null;
  error: string | null;
}

// Set the initial state with types
const initialState: AuthState = {
  user: null,
  error: null,
};

// Create the auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.error = null;
    },
  },
});

// Export actions
export const { setUser, setError, clearUser } = authSlice.actions;

// Export the reducer to configure the store
export default authSlice.reducer;
