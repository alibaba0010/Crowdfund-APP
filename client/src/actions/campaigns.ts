import { createSlice } from "@reduxjs/toolkit";
import { Campaign } from "../components/DisplayCampaigns";
import { formatEther } from "viem";
import { daysLeft } from "../utils";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  isChanged: false,
  availableCampaigns: {
    campaigns: [],
  },
  pastCampaigns: {
    campaigns: [],
  },
  creatorCampaigns: {
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
      const campaigns = parseActionData(action.payload.data);

      state.availableCampaigns = {
        campaigns,
      };
    },
    setPastCampaigns(state, action) {
      const campaigns = parseActionData(action.payload.data);

      state.pastCampaigns = {
        campaigns,
      };
    },
    setCreatorCampaigns(state, action) {
      const campaigns = parseActionData(action.payload.data);

      state.creatorCampaigns = {
        campaigns,
      };
    },
    getCampaignById(state, action) {
      const { campaign } = action.payload;

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
    // createdAt: campaign.createdAt,
    donators: campaign.donators,
    id: i,
    pId: uuidv4(),
  }));
  return parsedCampaigns;
};
export const {
  refreshCampaigns,
  setAvailableCampaigns,
  setPastCampaigns,
  getCampaignById,
  setCreatorCampaigns,
} = campaignsSlice.actions;
export default campaignsSlice.reducer;
