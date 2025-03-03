import { createSlice } from "@reduxjs/toolkit";
import type { Campaign } from "../components/DisplayCampaigns";
import { formatEther } from "viem";
import { daysLeft } from "../utils";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  isChanged: false,
  setSearchButton: false,
  availableCampaigns: {
    campaigns: [] as Campaign[],
  },
  pastCampaigns: {
    campaigns: [] as Campaign[],
  },
  availableCreatorCampaigns: {
    campaigns: [] as Campaign[],
  },
  pastCreatorCampaigns: {
    campaigns: [] as Campaign[],
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

    setAllCampaigns(state, action) {
      state.setSearchButton = true;
      const { data, address } = action.payload;
      const parsedCampaigns = parseActionData(data);
      state.availableCampaigns.campaigns = [];
      state.pastCampaigns.campaigns = [];
      state.availableCreatorCampaigns.campaigns = [];
      state.pastCreatorCampaigns.campaigns = [];

      parsedCampaigns.forEach((campaign: any) => {
        if (campaign.reachedDeadline || Number(campaign.deadline) === 0) {
          state.pastCampaigns.campaigns.push(campaign);
          if (campaign.creator === address) {
            state.pastCreatorCampaigns.campaigns.push(campaign);
          }
        } else {
          state.availableCampaigns.campaigns.push(campaign);
          if (campaign.creator === address) {
            state.availableCreatorCampaigns.campaigns.push(campaign);
          }
        }
      });
    },
    setSearchButtonState(state, action) {
      state.setSearchButton = action.payload;
    },
  },
});
const parseActionData = (campaigns: any) => {
  const parsedCampaigns = campaigns.map((campaign: Campaign, i: number) => ({
    creator: campaign.creator,
    name: campaign.name,
    title: campaign.title,
    description: campaign.description,
    targetAmount: formatEther(campaign.targetAmount),
    deadline: daysLeft(campaign.deadline),
    totalDonated: Number(formatEther(campaign.totalDonated)),
    image: campaign.image,
    category: campaign.category,
    donators: campaign.donators,
    reachedDeadline: campaign.reachedDeadline,
    withdrawn: campaign.withdrawn,
    id: i,
    pId: uuidv4(),
  }));
  return parsedCampaigns;
};
export const { refreshCampaigns, setAllCampaigns, setSearchButtonState } =
  campaignsSlice.actions;
export default campaignsSlice.reducer;
