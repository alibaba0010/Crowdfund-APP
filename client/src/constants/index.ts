import {
  createCampaign,
  dashboard,
  logout,
  payment,
  profile,
  thirdweb,
  withdraw,
} from "../assets";
import { configureStore } from "@reduxjs/toolkit";
import walletAddressReducer from "../actions/wallet";
export const navlinks = [
  {
    name: "dashboard",
    imgUrl: dashboard,
    link: "/",
  },
  {
    name: "campaign",
    imgUrl: createCampaign,
    link: "/create-campaign",
  },
  {
    name: "payment",
    imgUrl: payment,
    link: "/",
    disabled: true,
  },
  {
    name: "withdraw",
    imgUrl: withdraw,
    link: "/",
    disabled: true,
  },
  {
    name: "profile",
    imgUrl: profile,
    link: "/profile",
  },
  {
    name: "logout",
    imgUrl: logout,
    link: "/",
    disabled: true,
  },
  {
    name: "Connect Wallet",
    imgUrl: thirdweb,
    link: "/connect-wallet",
    disabled: true,
  },
];
export const store = configureStore({
  reducer: { wallet: walletAddressReducer },
});
