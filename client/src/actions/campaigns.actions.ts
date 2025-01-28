import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isDarkMode: false,
  isMenuOpen: false,
};

const allCampaigns = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
  },
});
