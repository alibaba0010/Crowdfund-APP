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
  availableCreatorCampaigns: {
    campaigns: [],
  },
  pastCreatorCampaigns: {
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

    setAllCampaigns(state, action) {
      const { data, address } = action.payload;
      // sort data
      // i. if reachedDeadline is true campaigns will be set to past campaigns
      // ii. else campaigns will be set to available campaigns
      /// iii. if reached deadline is true and creator is  equal to address set past creator campaign
      // if reachedDeadline is false and creator is equal to address set available creator campaign
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
    reachedDeadline: campaign.reachedDeadline,
    withdrawn: campaign.withdrawn,
    id: i,
    pId: uuidv4(),
  }));
  return parsedCampaigns;
};
export const { refreshCampaigns, setAllCampaigns } = campaignsSlice.actions;
export default campaignsSlice.reducer;
