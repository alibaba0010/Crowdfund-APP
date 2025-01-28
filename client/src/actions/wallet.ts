import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: undefined,
  addresses: [],
  status: "disconnected",
  isWalletConnectOpen: false,
};
const walletAdressSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    toggleWalletConnect: (state) => {
      state.isWalletConnectOpen = !state.isWalletConnectOpen;
    },
    setWalletAdress: (state, action) => {
      const { address, addresses, status } = action.payload;
      state.address = address;
      state.addresses = addresses;
      state.status = status;
    },
  },
});

export const { setWalletAdress, toggleWalletConnect } =
  walletAdressSlice.actions;

export default walletAdressSlice.reducer;
