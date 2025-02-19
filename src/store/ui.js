import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  // It is necessary to create the state for modal data, to pass that information to the state
  // modalData, collect the input values in ui, because modal is part the UI
  // it os just for editing purposes
  initialState: { sidebarOpen: false, modalData: {} },
  reducers: {
    toggleMenu(state) {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setModalData(state, action) {
      state.modalData = action.payload;
    },
  },
});

const uiReducer = uiSlice.reducer;
const uiActions = uiSlice.actions;

export { uiReducer, uiActions };

// It is necessary to use this slice because more than one component use this slice, to updte the state for the open
