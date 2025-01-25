import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: undefined,
  addresses: [],
  status: "disconnected",
};
export const walletAdressSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletAdress: (state, action) => {
      const { address, addresses, status } = action.payload;
      state.address = address;
      state.addresses = addresses;
      state.status = status;
    },
  },
});

export const { setWalletAdress } = walletAdressSlice.actions;

export default walletAdressSlice.reducer;
