import {
  createCampaign,
  dashboard,
  logout,
  profile,
  withdraw,
} from "../assets";
import { configureStore } from "@reduxjs/toolkit";
import walletAddressReducer from "../actions/wallet";
import campaignsReducer from "../actions/campaigns";
export const navlinks = [
  {
    name: "Available Campaigns",
    imgUrl: dashboard,
    link: "/campaigns/available",
  },
  {
    name: "Past Campaigns",
    imgUrl: dashboard,
    link: "/campaigns/past",
  },
  {
    name: "Create-Campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },

  {
    name: "Withdraw",
    imgUrl: withdraw,
    link: "/",
    disabled: true,
  },
  {
    name: "Profile",
    imgUrl: profile,
    link: "/profile",
  },

  {
    name: "Logout",
    imgUrl: logout,
    link: "/",
    disabled: true,
  },
];
export const store = configureStore({
  reducer: { wallet: walletAddressReducer, campaigns: campaignsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "campaigns/setAllCampaigns",
          "campaigns/getCampaignById",
        ],
      },
    }),
});
export const categories = [
  { logo: "logo", name: "Education" },
  { logo: "logo", name: "Emergencies" },
  { logo: "logo", name: "Health" },
  { logo: "logo", name: "Community Support" },
];
