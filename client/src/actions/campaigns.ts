import { createSlice } from "@reduxjs/toolkit";
import { Campaign } from "../components/DisplayCampaigns";
import { formatEther } from "viem";
import { daysLeft } from "../utils";

const initialState = {
  isChanged: false,
  availableCampaigns: {
    title: "",
    isLoading: false,
    campaigns: [],
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
      const parsedCampaings = action.payload.data.map(
        (campaign: Campaign, i: number) => ({
          creator: campaign.creator,
          title: campaign.title,
          description: campaign.description,
          targetAmount: formatEther(campaign.targetAmount),
          deadline: daysLeft(campaign.deadline),
          totalDonated: Number(campaign.totalDonated),
          image: campaign.image,
          pId: i,
        })
      );
      state.availableCampaigns = {
        title: action.payload.title,
        isLoading: action.payload.isLoading,
        campaigns: parsedCampaings,
      };
    },
  },
});
export const { refreshCampaigns, setAvailableCampaigns } =
  campaignsSlice.actions;
export default campaignsSlice.reducer;
