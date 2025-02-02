import { createSlice } from "@reduxjs/toolkit";
import { Campaign } from "../components/DisplayCampaigns";
import { formatEther } from "viem";
import { daysLeft } from "../utils";

const initialState = {
  isChanged: false,
  availableCampaigns: {
    title: "Available Campaigns",
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
          name: campaign.name,
          title: campaign.title,
          description: campaign.description,
          targetAmount: formatEther(campaign.targetAmount),
          deadline: daysLeft(campaign.deadline),
          totalDonated: Number(campaign.totalDonated),
          image: campaign.image,
          // createdAt: campaign.createdAt,
          donators: campaign.donators,
          pId: i,
        })
      );
      state.availableCampaigns = {
        title: action.payload.title,
        campaigns: parsedCampaings,
      };
    },
  },
});
export const { refreshCampaigns, setAvailableCampaigns } =
  campaignsSlice.actions;
export default campaignsSlice.reducer;
