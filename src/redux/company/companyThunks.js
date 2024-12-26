import { createAsyncThunk } from "@reduxjs/toolkit";
import companyService from "./companyService";
import { toast } from "react-toastify";

export const checkIntegrationStatus = createAsyncThunk(
  "company/checkIntegrationStatus",
  async (obj, thunkAPI) => {
    try {
      return await companyService.checkIntegrationStatus(obj);
    } catch (err) {
      let message;
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const merchantDashboard = createAsyncThunk(
  "merchant/merchantDashboard",
  async (obj, thunkAPI) => {
    try {
      return await companyService.merchantDashboard(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const integrateShopify = createAsyncThunk(
  "company/integrateShopify",
  async (obj, thunkAPI) => {
    try {
      return await companyService.integrateShopify(obj);
    } catch (err) {
      let message;
      if (err.response.status === 409) {
        message = err.response.data.response;
        toast.info(message, { theme: "colored" });
      }
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allTransactions = createAsyncThunk(
  "company/allTransactions",
  async (obj, thunkAPI) => {
    try {
      return await companyService.allTransactions(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editShopify = createAsyncThunk(
  "company/editShopify",
  async (obj, thunkAPI) => {
    try {
      return await companyService.editShopify(obj);
    } catch (err) {
      let message;
      if (err.response.status === 400) {
        message = err.response.data.message;
        toast.error(message, { theme: "colored" });
      }
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSingleRule = createAsyncThunk(
  "company/getSingleRule",
  async (obj, thunkAPI) => {
    try {
      return await companyService.getSingleRule(obj);
    } catch (err) {
      let message;
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const integrateMailchimp = createAsyncThunk(
  "company/integrateMailchimp",
  async (obj, thunkAPI) => {
    try {
      return await companyService.integrateMailChimp(obj);
    } catch (err) {
      let message;
      if (err.response.status === 409) {
        message = err.response.data.message;
        toast.error(message, { theme: "colored" });
      } else if (err) {
        toast.error("Server error", { theme: "colored" });
      }
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editMailchimp = createAsyncThunk(
  "company/editMailchimp",
  async (obj, thunkAPI) => {
    try {
      return await companyService.editMailChimp(obj);
    } catch (err) {
      let message;
      if (err.response.status === 409) {
        message = err.response.data.message;
        toast.error(message, { theme: "colored" });
      }
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editPointStatus = createAsyncThunk(
  "company/editPointStatus",
  async (obj, thunkAPI) => {
    try {
      return await companyService.editPointStatus(obj);
    } catch (err) {
      let message;
      if (err.response.status === 400) {
        message = err.response.data.message;
        toast.error(message, { theme: "colored" });
      }
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const merchantProducts = createAsyncThunk(
  "company/merchantProducts",
  async (obj, thunkAPI) => {
    try {
      return await companyService.merchantProducts(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const merchantProductsForDropDown = createAsyncThunk(
  "company/merchantProductsForDropDown",
  async (obj, thunkAPI) => {
    try {
      return await companyService.merchantProductsForDropDown(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const inviteMember = createAsyncThunk(
  "company/inviteTheMembers",
  async (obj, thunkAPI) => {
    try {
      return await companyService.inviteMember(obj);
    } catch (err) {
      let message;
      if (err.response?.status === 400) {
        message = err.response.data.response;
        toast.info(message, { theme: "colored" });
      }
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allStores = createAsyncThunk(
  "company/allStores",
  async (obj, thunkAPI) => {
    try {
      return await companyService.getAllStores(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addTheStore = createAsyncThunk(
  "company/addStore",
  async (obj, thunkAPI) => {
    try {
      return await companyService.addStore(obj);
    } catch (err) {
      let message;
      if (err.response.status === 409) {
        message = err.response.data.response;
        toast.info(message, { theme: "colored" });
      }
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changeStoreStatus = createAsyncThunk(
  "company/changeStoreStatus",
  async (obj, thunkAPI) => {
    try {
      return await companyService.changeStoreStatus(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allMembers = createAsyncThunk(
  "company/allMembers",
  async (obj, thunkAPI) => {
    try {
      return await companyService.allMembers(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allTransferMembers = createAsyncThunk(
  "admin/allTransferMembers",
  async (obj, thunkAPI) => {
    try {
      return await companyService.allTransferMembers(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const manualPointTransfer = createAsyncThunk(
  "company/manualPointTransfer",
  async (obj, thunkAPI) => {
    try {
      return await companyService.manualPointTransfer(obj);
    } catch (err) {
      let message;
      if (err.response.status === 400) {
        message = err.response.data.message;
        toast.error(message, { theme: "colored" });
      }
      message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changeMemberStatus = createAsyncThunk(
  "company/changeMemberStatus",
  async (obj, thunkAPI) => {
    try {
      return await companyService.changeMemberStatus(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changeRewardStatus = createAsyncThunk(
  "company/changeRewardStatus",
  async (obj, thunkAPI) => {
    try {
      return await companyService.changeRewardStatus(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changeOfferStatus = createAsyncThunk(
  "company/changeOfferStatus",
  async (obj, thunkAPI) => {
    try {
      return await companyService.changeOfferStatus(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMerchantStoresForOffer = createAsyncThunk(
  "company/getMerchantStoresForOffer",
  async (obj, thunkAPI) => {
    try {
      return await companyService.getMerchantStoresForOffer(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allTransferPoints = createAsyncThunk(
  "company/transfers",
  async (obj, thunkAPI) => {
    try {
      return await companyService.allTransferPoints(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRuleOfMerchantByEvent = createAsyncThunk(
  "company/getRuleOfMerchantByEvent",
  async (obj, thunkAPI) => {
    try {
      return await companyService.getRuleOfMerchantByEvent(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);
export const createReward = createAsyncThunk(
  "company/createReward",
  async (obj, thunkAPI) => {
    try {
      return await companyService.createReward(obj);
    } catch (err) {
      let message = "";
      if (err.response.status === 400) {
        message = err.response.data.error;
        toast.error(message, { theme: "colored" });
      } else message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRulesForEventCreation = createAsyncThunk(
  "company/getRulesForEventCreation",
  async (obj, thunkAPI) => {
    try {
      return await companyService.getRulesForEventCreation(obj);
    } catch (err) {
      let message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createOffer = createAsyncThunk(
  "company/createOffer",
  async (obj, thunkAPI) => {
    try {
      return await companyService.createOffer(obj);
    } catch (err) {
      let message = "";
      if (err.response.status === 400) {
        message = err.response.data.error;
        toast.error(message, { theme: "colored" });
      } else message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editReward = createAsyncThunk(
  "company/editReward",
  async (obj, thunkAPI) => {
    try {
      return await companyService.editReward(obj);
    } catch (err) {
      let message = "";
      if (err.response.status === 400) {
        message = err.response.data.error;
        toast.error(message, { theme: "colored" });
      } else message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editOffer = createAsyncThunk(
  "company/editOffer",
  async (obj, thunkAPI) => {
    try {
      return await companyService.editOffer(obj);
    } catch (err) {
      let message = "";
      if (err.response.status === 400) {
        message = err.response.data.error;
        toast.error(message, { theme: "colored" });
      } else message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRewards = createAsyncThunk(
  "company/getRewards",
  async (obj, thunkAPI) => {
    try {
      return await companyService.allRewards(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getOffers = createAsyncThunk(
  "company/getOffers",
  async (obj, thunkAPI) => {
    try {
      return await companyService.allOffers(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSpecificOfferDetail = createAsyncThunk(
  "company/getSpecificOfferDetail",
  async (obj, thunkAPI) => {
    try {
      return await companyService.getSpecificOfferDetail(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSpecificRewardDetail = createAsyncThunk(
  "company/getSpecificRewardDetail",
  async (obj, thunkAPI) => {
    try {
      return await companyService.getSpecificRewardDetail(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allSegments = createAsyncThunk(
  "company/allSegments",
  async (obj, thunkAPI) => {
    try {
      return await companyService.allSegments(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allCampaigns = createAsyncThunk(
  "company/getAllCampaigns",
  async (obj, thunkAPI) => {
    try {
      return await companyService.allCampaigns(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allEmailTemplates = createAsyncThunk(
  "company/getEmailTemplates",
  async (obj, thunkAPI) => {
    try {
      return await companyService.allEmailTemplates(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createEmailTemplate = createAsyncThunk(
  "company/createEmailTemplate",
  async (obj, thunkAPI) => {
    try {
      return await companyService.createEmailTemplate(obj);
    } catch (err) {
      let message;
      if (err.response.status === 409) {
        message = err.response.data.response;
        toast.error(message, { theme: "colored" });
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editEmailTemplate = createAsyncThunk(
  "company/editEmailTemplate",
  async (obj, thunkAPI) => {
    try {
      return await companyService.editEmailTemplate(obj);
    } catch (err) {
      let message;
      if (err.response.status === 409) {
        message = err.response.data.response;
        toast.error(message, { theme: "colored" });
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allJourneys = createAsyncThunk(
  "company/allJourneys",
  async (obj, thunkAPI) => {
    try {
      return await companyService.allJourneys(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createCampaign = createAsyncThunk(
  "company/createCampaign",
  async (obj, thunkAPI) => {
    try {
      return await companyService.createCampaign(obj);
    } catch (err) {
      let message = "";
      if (
        err.response.status === 400 ||
        err.response.status === 409 ||
        err.response.status === 404
      ) {
        message = err.response.data.response;
        toast.error(message, { theme: "colored" });
      } else toast.error("Server error", { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getStripoCredentials = createAsyncThunk(
  "company/getStripoCredentials",
  async (obj, thunkAPI) => {
    try {
      return await companyService.getStripoCredentials(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSingleTemplate = createAsyncThunk(
  "company/getSingleTemplate",
  async (obj, thunkAPI) => {
    try {
      return await companyService.getSingleTemplate(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createSegment = createAsyncThunk(
  "company/createSegment",
  async (obj, thunkAPI) => {
    try {
      return await companyService.createSegment(obj);
    } catch (err) {
      let message;
      if (err.response.status === 409 || err.response.status === 404) {
        message = err.response.data.response;
        toast.error(message, { theme: "colored" });
      } else toast.error("Server error", { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addJourney = createAsyncThunk(
  "company/addJourney",
  async (obj, thunkAPI) => {
    try {
      return await companyService.addJourney(obj);
    } catch (err) {
      const message = err.response.data.response;
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const executeJourney = createAsyncThunk(
  "company/executeJourney",
  async (obj, thunkAPI) => {
    try {
      return await companyService.executeJourney(obj);
    } catch (err) {
      const message = err.response.data.response;
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addEarningRule = createAsyncThunk(
  "company/addEarningRule",
  async (obj, thunkAPI) => {
    try {
      return await companyService.addEarningRule(obj);
    } catch (err) {
      const message = err.response.data.response;
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const editEarningRule = createAsyncThunk(
  "company/editEarningRule",
  async (obj, thunkAPI) => {
    try {
      return await companyService.editEarningRule(obj);
    } catch (err) {
      const message = err.response.data.response;
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const duplicateEarningRule = createAsyncThunk(
  "company/duplicateEarningRule",
  async (obj, thunkAPI) => {
    try {
      return await companyService.duplicateEarningRule(obj);
    } catch (err) {
      const message = err.response.data.response;
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getMailChimpAccountStatus = createAsyncThunk(
  "company/getMailChimpAccountStatus",
  async (obj, thunkAPI) => {
    try {
      return await companyService.getMailChimpAccountStatus(obj);
    } catch (err) {
      const message = err.response.data.response;
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getCouponInfo = createAsyncThunk(
  "company/getCouponInfo",
  async (obj, thunkAPI) => {
    try {
      return await companyService.getCouponInfo(obj);
    } catch (err) {
      const message = err.response.data.message;
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);
