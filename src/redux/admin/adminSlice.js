import { createSlice } from "@reduxjs/toolkit";
import {
  allMembers,
  allMerchants,
  createMerchant,
  merchantStatus,
  allTransferPoints,
  manualPointTransfer,
  addEvent,
  allEvents,
  changeEventStatus,
  changeMemberStatus,
  allTransferMembers,
  getRuleByEvent,
  changeRuleStatus,
  getSpecificCompanyDetail,
  updateMerchantInfo,
  allTransactions,
  getAllMerchantForDashboard,
  adminDashboard,
} from "./adminThunks";

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  isUpdate: false,
  isRuleTypeAddLoading: false,
  isMerchantUpdateLoading: false,
  message: "",
  members: [],
  companies: [],
  defaultRules: [],
  transferPoints: [],
  events: [],
  transferMembers: [],
  ruleOfEvent: [],
  //For all stats in dashboard top banner
  dashboardInfo: null,
  dashboardEvents: null,
  allMerchantsForDD: null,
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isError = false;
    //   state.isSuccess = false;
    //   state.isLoading = false;
    //   state.isUpdate = false;
    //   state.isMerchantUpdateLoading = false;
    //   state.message = "";
    //   state.members = [];
    //   state.companies = [];
    //   state.defaultRules = [];
    //   state.transferPoints = [];
    //   state.events = [];
    //   state.transferMembers = [];
    //   state.ruleOfEvent = [];
    // },
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dashboardInfo = action.payload.response;
        state.dashboardEvents = [
          ["", ""],
          ["Scenario", action.payload.response?.rulesOfEvents?.[0]?.count || 0],
          ["Referral", action.payload.response?.rulesOfEvents?.[1]?.count || 0],
          [
            "General Spending",
            action.payload.response?.rulesOfEvents?.[2]?.count || 0,
          ],
          [
            "Geolocation",
            action.payload.response.rulesOfEvents?.[3]?.count || 0,
          ],
          [
            "Multiply Earned Points",
            action.payload.response?.rulesOfEvents?.[4]?.count || 0,
          ],
          [
            "Product Purchase",
            action.payload.response?.rulesOfEvents?.[5]?.count || 0,
          ],
        ];
      })
      .addCase(adminDashboard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getAllMerchantForDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllMerchantForDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allMerchantsForDD = action.payload;
      })
      .addCase(getAllMerchantForDashboard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allMembers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.members = action.payload;
      })
      .addCase(allMembers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allTransferMembers.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(allTransferMembers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.transferMembers = action.payload?.response;
      })
      .addCase(allTransferMembers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(changeMemberStatus.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(changeMemberStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // state.isUpdate = !state.isUpdate;
      })
      .addCase(changeMemberStatus.rejected, (state) => {
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
      })
      .addCase(manualPointTransfer.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(manualPointTransfer.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(manualPointTransfer.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createMerchant.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createMerchant.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createMerchant.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allMerchants.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allMerchants.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.companies = action.payload.response;
      })
      .addCase(allMerchants.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(merchantStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(merchantStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(merchantStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addEvent.pending, (state) => {
        state.isRuleTypeAddLoading = true;
      })
      .addCase(addEvent.fulfilled, (state, action) => {
        state.isRuleTypeAddLoading = false;
        state.isSuccess = true;
      })
      .addCase(addEvent.rejected, (state) => {
        state.isRuleTypeAddLoading = false;
        state.isError = true;
      })
      .addCase(allEvents.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allEvents.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.events = action.payload;
      })
      .addCase(allEvents.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(changeEventStatus.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(changeEventStatus.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(changeEventStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getRuleByEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRuleByEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.ruleOfEvent = action.payload;
      })
      .addCase(getRuleByEvent.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(changeRuleStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeRuleStatus.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(changeRuleStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getSpecificCompanyDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpecificCompanyDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleCompany = action.payload;
      })
      .addCase(getSpecificCompanyDetail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateMerchantInfo.pending, (state) => {
        state.isMerchantUpdateLoading = true;
      })
      .addCase(updateMerchantInfo.fulfilled, (state, action) => {
        state.isMerchantUpdateLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateMerchantInfo.rejected, (state) => {
        state.isMerchantUpdateLoading = false;
        state.isError = true;
      });
  },
});

export const { reset, logout } = adminSlice.actions;
export default adminSlice.reducer;
