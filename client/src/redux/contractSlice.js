import { createSlice } from "@reduxjs/toolkit";

export const contractSlice = createSlice({
  name: "contract",
  initialState: {
    account: null,
    products: null,
    contractAbi: null,
    contractAddress: null,
    contractLoading: false,
    contractOwner:null,
    isWeb3: false,
  },
  reducers: {
    setAccount: (state, action) => {
      console.log("Set Account", action.payload);
      state.account = action.payload;
    },
    setProducts: (state, action) => {
      console.log("Set Products", action.payload);
      state.products = action.payload;
    },
    setContractAbi: (state, action) => {
      console.log("Set Contract Abi", action.payload);
      state.contractAbi = action.payload;
    },
    setContractAddress: (state, action) => {
      console.log("Set Contract Address", action.payload);
      state.contractAddress = action.payload;
    },
    setContractLoading: (state, action) => {
      state.contractLoading = action.payload;
    },
    setContractOwner: (state, action) => {
      state.contractOwner = action.payload;
    },

    setIsWeb3: (state, action) => {
      state.isWeb3 = action.payload;
    },
  },
});

export const {
  setAccount,
  setProducts,
  setContractAbi,
  setContractAddress,
  setContractLoading,
  setContractOwner,
  setIsWeb3,
} = contractSlice.actions;
export default contractSlice.reducer;
