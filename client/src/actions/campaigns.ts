import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isChanged: false,
};

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    addCampaign(state, action) {
      state.isChanged = true;
    },
  },
});
export const { addCampaign } = campaignsSlice.actions;
export default campaignsSlice.reducer;
