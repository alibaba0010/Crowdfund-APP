import { createSlice } from "@reduxjs/toolkit";
import { Campaign } from "../components/DisplayCampaigns";
import { formatEther } from "viem";
import { daysLeft } from "../utils";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  isChanged: false,
  availableCampaigns: {
    title: "Available Campaigns",
    campaigns: [],
  },
  campaignDetails: {},
};

const campaignsSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    refreshCampaigns(state) {
      state.isChanged = !state.isChanged;
    },
    setAvailableCampaigns(state, action) {
      const parsedCampaigns = action.payload.data.map(
        (campaign: Campaign, i: number) => ({
          creator: campaign.creator,
          name: campaign.name,
          title: campaign.title,
          description: campaign.description,
          targetAmount: formatEther(campaign.targetAmount),
          deadline: daysLeft(campaign.deadline),
          totalDonated: Number(formatEther(campaign.totalDonated)),
          image: campaign.image,
          // createdAt: campaign.createdAt,
          donators: campaign.donators,
          id: i,
          pId: uuidv4(),
        })
      );
      state.availableCampaigns = {
        title: action.payload.title,
        campaigns: parsedCampaigns,
      };
    },
    getCampaignById(state, action) {
      const { campaign } = action.payload;
      console.log("Data: " + campaign);

      state.campaignDetails = {
        creator: campaign.creator,
        name: campaign.name,
        title: campaign.title,
        description: campaign.description,
        targetAmount: formatEther(campaign.targetAmount),
        deadline: daysLeft(campaign.deadline),
        totalDonated: Number(formatEther(campaign.totalDonated)),
        image: campaign.image,
        // createdAt: campaign.createdAt,
        donators: campaign.donators,
        id: campaign.id,
        pId: campaign.pId,
      };
    },
  },
});
export const { refreshCampaigns, setAvailableCampaigns, getCampaignById } =
  campaignsSlice.actions;
export default campaignsSlice.reducer;
