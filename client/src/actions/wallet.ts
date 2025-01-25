import { createSlice } from "@reduxjs/toolkit";

const initialState = { address: undefined, addresses: [], status: undefined };
export const walletAdressSlice = createSlice({
  name: "wallet",
  initialState,
  reducers: {
    setWalletAdress: (state, action) => {
      console.log(action.payload);
      state.address = action.payload;
    },
  },
});

export const { setWalletAdress } = walletAdressSlice.actions;

export default walletAdressSlice.reducer;
