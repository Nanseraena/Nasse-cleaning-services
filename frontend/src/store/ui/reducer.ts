import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UiState = { adminSidebarOpen: boolean };
const initialState: UiState = { adminSidebarOpen: true };

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setAdminSidebarOpen(state, action: PayloadAction<boolean>) { state.adminSidebarOpen = action.payload; },
    toggleAdminSidebar(state) { state.adminSidebarOpen = !state.adminSidebarOpen; },
  },
});

export const { setAdminSidebarOpen, toggleAdminSidebar } = uiSlice.actions;
export default uiSlice.reducer;
