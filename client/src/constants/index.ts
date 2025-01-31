import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  withdraw,
} from "../assets";
import { configureStore } from "@reduxjs/toolkit";
import walletAddressReducer from "../actions/wallet";
import campaignsReducer from "../actions/campaigns";
export const navlinks = [
  {
    name: "Dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "Create-Campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "Payment",
    imgUrl: payment,
    link: "/",
    disabled: true,
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
        ignoredActions: ["campaigns/setAvailableCampaigns"],
      },
    }),
});
