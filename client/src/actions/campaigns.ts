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
  },
});
export const { refreshCampaigns } = campaignsSlice.actions;
export default campaignsSlice.reducer;
