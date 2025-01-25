import { createSlice } from "@reduxjs/toolkit";

export const walletAdressSlice = createSlice({
  name: "address",
  initialState: {
    walletAddress: null,
  },
  reducers: {
    setWalletAdress: (state, action) => {
      state.walletAddress = action.payload;
    },
  },
});

export const { setWalletAdress } = walletAdressSlice.actions;

export default walletAdressSlice.reducer;
