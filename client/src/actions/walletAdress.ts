import { createSlice } from "@reduxjs/toolkit";

export const walletAdressSlice = createSlice({
  name: "walletAdress",
  initialState: {
    walletAdress: null,
  },
  reducers: {
    setWalletAdress: (state, action) => {
      console.log("setWalletAdress: ", action.payload);
      state.walletAdress = action.payload;
    },
  },
});

export const { setWalletAdress } = walletAdressSlice.actions;

export default walletAdressSlice.reducer;
