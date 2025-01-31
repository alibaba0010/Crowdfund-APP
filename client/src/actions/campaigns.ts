import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChanged: false,
  availableCampaigns: {
    title: "",
    isLoading: false,
    data: [],
  },
};

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    refreshCampaigns(state) {
      state.isChanged = !state.isChanged;
    },
    setAvailableCampaigns(state, action) {
      console.log("Available: ", action.payload);
      // state.availableCampaigns = {
      //   ...state.availableCampaigns,
      //   ...action.payload,
      // };
      Object.assign(state.availableCampaigns, action.payload);
    },
  },
});
export const { refreshCampaigns, setAvailableCampaigns } =
  campaignsSlice.actions;
export default campaignsSlice.reducer;
