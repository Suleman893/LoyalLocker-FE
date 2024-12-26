import { createAsyncThunk } from "@reduxjs/toolkit";
import consumerService from "./consumerService";
import { toast } from "react-toastify";

export const allMerchantsOffers = createAsyncThunk(
  "consumer/allMerchantsOffers",
  async (obj, thunkAPI) => {
    try {
      return await consumerService.allMerchantsOffers(obj);
    } catch (err) {
      let message;
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allMerchantRewards = createAsyncThunk(
  "consumer/allMerchantRewards",
  async (obj, thunkAPI) => {
    try {
      return await consumerService.allMerchantRewards(obj);
    } catch (err) {
      let message;
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allTransactions = createAsyncThunk(
  "consumer/allTransactions",
  async (obj, thunkAPI) => {
    try {
      return await consumerService.allTransactions(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const totalBalance = createAsyncThunk(
  "consumer/totalBalance",
  async (obj, thunkAPI) => {
    try {
      return await consumerService.totalBalance(obj);
    } catch (err) {
      let message;
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allTransferPoints = createAsyncThunk(
  "consumer/transfers",
  async (obj, thunkAPI) => {
    try {
      return await consumerService.allTransferPoints(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const inviteFriend = createAsyncThunk(
  "consumer/inviteFriend",
  async (obj, thunkAPI) => {
    try {
      return await consumerService.inviteFriend(obj);
    } catch (err) {
      if (err?.response?.data?.response && err?.response?.status === 400)
        toast.error(err.response.data.response, { theme: "colored" });
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allReferredFriends = createAsyncThunk(
  "consumer/allReferredFriends",
  async (obj, thunkAPI) => {
    try {
      return await consumerService.allReferredFriends(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const availReward = createAsyncThunk(
  "consumer/availReward",
  async (obj, thunkAPI) => {
    try {
      return await consumerService.availReward(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const availOffer = createAsyncThunk(
  "consumer/availOffer",
  async (obj, thunkAPI) => {
    try {
      return await consumerService.availOffer(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const availEarningRule = createAsyncThunk(
  "consumer/availEarningRule",
  async (obj, thunkAPI) => {
    try {
      return await consumerService.availEarningRule(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const consumerDashboard = createAsyncThunk(
  "consumer/consumerDashboard",
  async (obj, thunkAPI) => {
    try {
      return await consumerService.consumerDashboard(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
