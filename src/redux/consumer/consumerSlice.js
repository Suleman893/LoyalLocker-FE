import { createSlice } from "@reduxjs/toolkit";
import {
  allMerchantsOffers,
  allMerchantRewards,
  totalBalance,
  allTransferPoints,
  inviteFriend,
  allReferredFriends,
  allTransactions,
  consumerDashboard,
} from "./consumerThunk";

const initialState = {
  isLoading: false,
  isRewardLoading:false,
  isOfferLoading:false,
  isSuccess: false,
  isError: false,
  isAllReferredLoading: false,
  isUpdate: false,
  allOffer: null,
  allReward: null,
  totalPoints: 0,
  transferPoints: [],
  transactions: [],
  referredFriends: [],
  dashboard: null,
  openSidebar: false,
};

export const consumerSlice = createSlice({
  name: "consumer",
  initialState,
  reducers: {
    reset: () => initialState,
    toggleSidebar: (state) => {
      state.openSidebar = !state.openSidebar; // toggle sidebar state
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(consumerDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(consumerDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dashboard = action.payload.response;
      })
      .addCase(consumerDashboard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allMerchantsOffers.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(allMerchantsOffers.fulfilled, (state, action) => {
        state.isOfferLoading = false;
        state.isSuccess = true;
        state.allOffer = action.payload.response;
      })
      .addCase(allMerchantsOffers.rejected, (state) => {
        state.isOfferLoading = false;
        state.isError = true;
      })
      .addCase(allMerchantRewards.pending, (state) => {
        state.isRewardLoading = true;
      })
      .addCase(allMerchantRewards.fulfilled, (state, action) => {
        state.isRewardLoading = false;
        state.isSuccess = true;
        state.allReward = action.payload.response;
      })
      .addCase(allMerchantRewards.rejected, (state) => {
        state.isRewardLoading = false;
        state.isError = true;
      })
      .addCase(totalBalance.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(totalBalance.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.totalPoints = action.payload.response;
      })
      .addCase(totalBalance.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allTransferPoints.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allTransferPoints.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transferPoints = action.payload;
      })
      .addCase(allTransferPoints.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(inviteFriend.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(inviteFriend.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isUpdate = !state.isUpdate;
        state.isSuccess = true;
      })
      .addCase(inviteFriend.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allReferredFriends.pending, (state) => {
        state.isAllReferredLoading = true;
      })
      .addCase(allReferredFriends.fulfilled, (state, action) => {
        state.isAllReferredLoading = false;
        state.isSuccess = true;
        state.referredFriends = action.payload;
      })
      .addCase(allReferredFriends.rejected, (state) => {
        state.isAllReferredLoading = false;
        state.isError = true;
      })
      .addCase(allTransactions.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transactions = action.payload;
      })
      .addCase(allTransactions.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset, toggleSidebar  } = consumerSlice.actions;
export default consumerSlice.reducer;
