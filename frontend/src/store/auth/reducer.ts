import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AdminUser } from "@/types";

type AuthState = {
  user: AdminUser | null;
  isAuthenticated: boolean;
  initialized: boolean;
};

const initialState: AuthState = { user: null, isAuthenticated: false, initialized: false };

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<AdminUser>) {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.initialized = true;
    },
    clearSession(state) {
      state.user = null;
      state.isAuthenticated = false;
      state.initialized = true;
    },
    setInitialized(state) { state.initialized = true; },
    logoutRequested() {},
  },
});

export const { setSession, clearSession, setInitialized, logoutRequested } = authSlice.actions;
export default authSlice.reducer;
