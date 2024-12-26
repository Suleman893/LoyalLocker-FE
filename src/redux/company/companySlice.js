import { createSlice } from "@reduxjs/toolkit";
import {
  addTheStore,
  allStores,
  changeStoreStatus,
  merchantDashboard,
  allTransferPoints,
  allSegments,
  allCampaigns,
  allEmailTemplates,
  allJourneys,
  createCampaign,
  getStripoCredentials,
  addEarningRule,
  allMembers,
  allTransferMembers,
  manualPointTransfer,
  getMerchantStoresForOffer,
  createReward,
  getRewards,
  getOffers,
  getRuleOfMerchantByEvent,
  getRulesForEventCreation,
  inviteMember,
  createOffer,
  getSpecificOfferDetail,
  getSpecificRewardDetail,
  editReward,
  merchantProducts,
  integrateShopify,
  merchantProductsForDropDown,
  editOffer,
  checkIntegrationStatus,
  editShopify,
  editPointStatus,
  duplicateEarningRule,
  createEmailTemplate,
  createSegment,
  getMailChimpAccountStatus,
  getSingleTemplate,
  editEmailTemplate,
  getSingleRule,
  executeJourney,
  allTransactions,
  editEarningRule,
  getCouponInfo,
  integrateMailchimp,
  editMailchimp,
} from "./companyThunks";

const initialState = {
  userInfo: null,
  isLoading: false,
  isInviteMemberLoading: false,
  isRewardLoading: false,
  isAddPointsLoading: false,
  isMerchantStoresLoading: false,
  isCreateEarnRuleLoading: false,
  isUpdateEarnRuleLoading: false,
  isOfferLoading: false,
  isEditOfferLoading: false,
  isEditRewardLoading: false,
  isCreateEmailLoading: false,
  isCreateSegmentLoading: false,
  isSuccess: false,
  isError: false,
  isUpdate: false,
  message: "",
  stores: [],
  singleRule: null,
  integrationStatus: null,
  singleEmailTemplate: null,
  isEditEmailLoading: null,
  couponInfo: null,
  isMailchimpCreatedLoading: false,
  isShopifyCreatedLoading: false,
  //Campaign module
  segments: [],
  campaigns: [],
  emailTemplates: [],
  journeys: [],
  stripoCredentials: null,
  transferPoints: [],
  transactions: [],
  transferTypes: [],
  earningRules: [],
  transferMembers: [],
  rulesForEventCreation: [],
  shopifyProducts: null,
  shopifyProductsForDD: null,
  //For all stats in dashboard top banner
  dashboardInfo: null,
  dashboardEvents: null,
};

export const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    // reset: (state) => {
    //   state.isError = false;
    //   state.isSuccess = false;
    //   state.isLoading = false;
    //   state.isInviteMemberLoading = false;
    //   state.message = "";
    //   state.stores = [];
    // },
    reset: () => initialState,
    clearCoupon: (state) => {
      state.couponInfo = null;
    },
    clearSingleTemplate: (state) => {
      state.singleEmailTemplate = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(inviteMember.pending, (state) => {
        state.isInviteMemberLoading = true;
      })
      .addCase(inviteMember.fulfilled, (state, action) => {
        state.isInviteMemberLoading = false;
        state.isSuccess = true;
      })
      .addCase(inviteMember.rejected, (state) => {
        state.isInviteMemberLoading = false;
        state.isError = true;
      })
      .addCase(checkIntegrationStatus.pending, (state) => {
        state.isIntegrationLoading = true;
      })
      .addCase(checkIntegrationStatus.fulfilled, (state, action) => {
        state.isIntegrationLoading = false;
        state.integrationStatus = action.payload.response;
        state.isSuccess = true;
      })
      .addCase(checkIntegrationStatus.rejected, (state) => {
        state.isIntegrationLoading = false;
        state.isError = true;
      })
      .addCase(integrateShopify.pending, (state) => {
        state.isShopifyCreatedLoading = true;
      })
      .addCase(integrateShopify.fulfilled, (state, action) => {
        state.isShopifyCreatedLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(integrateShopify.rejected, (state) => {
        state.isShopifyCreatedLoading = false;
        state.isError = true;
      })
      .addCase(integrateMailchimp.pending, (state) => {
        state.isMailchimpCreatedLoading = true;
      })
      .addCase(integrateMailchimp.fulfilled, (state, action) => {
        state.isMailchimpCreatedLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(integrateMailchimp.rejected, (state) => {
        state.isMailchimpCreatedLoading = false;
        state.isError = true;
      })
      .addCase(editMailchimp.pending, (state) => {
        state.isMailchimpCreatedLoading = true;
      })
      .addCase(editMailchimp.fulfilled, (state, action) => {
        state.isMailchimpCreatedLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(editMailchimp.rejected, (state) => {
        state.isMailchimpCreatedLoading = false;
        state.isError = true;
      })
      .addCase(allStores.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allStores.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stores = action.payload;
      })
      .addCase(allStores.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getCouponInfo.pending, (state) => {
        state.isCouponInfoLoading = true;
      })
      .addCase(getCouponInfo.fulfilled, (state, action) => {
        state.isCouponInfoLoading = false;
        state.isSuccess = true;
        state.couponInfo = action.payload?.response;
      })
      .addCase(getCouponInfo.rejected, (state) => {
        state.isCouponInfoLoading = false;
        state.isError = true;
      })

      .addCase(addTheStore.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTheStore.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(addTheStore.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(changeStoreStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(changeStoreStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(changeStoreStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allTransferMembers.pending, (state) => {
        state.isLoading = true;
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
      .addCase(getRuleOfMerchantByEvent.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRuleOfMerchantByEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ruleOfEvent = action.payload;
        state.isSuccess = true;
      })
      .addCase(getRuleOfMerchantByEvent.rejected, (state) => {
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
      .addCase(getRulesForEventCreation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRulesForEventCreation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.rulesForEventCreation = action.payload.response;
      })
      .addCase(getRulesForEventCreation.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getRewards.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getRewards.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allRewards = action.payload;
      })
      .addCase(getRewards.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getOffers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOffers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.allOffers = action.payload;
      })
      .addCase(getOffers.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createReward.pending, (state) => {
        state.isRewardLoading = true;
      })
      .addCase(createReward.fulfilled, (state, action) => {
        state.isRewardLoading = false;
        state.isSuccess = true;
      })
      .addCase(createReward.rejected, (state) => {
        state.isRewardLoading = false;
        state.isError = true;
      })
      .addCase(createOffer.pending, (state) => {
        state.isOfferLoading = true;
      })
      .addCase(createOffer.fulfilled, (state, action) => {
        state.isOfferLoading = false;
        state.isSuccess = true;
      })
      .addCase(createOffer.rejected, (state) => {
        state.isOfferLoading = false;
        state.isError = true;
      })
      .addCase(editReward.pending, (state) => {
        state.isEditRewardLoading = true;
      })
      .addCase(editReward.fulfilled, (state, action) => {
        state.isEditRewardLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(editReward.rejected, (state) => {
        state.isEditRewardLoading = false;
        state.isError = true;
      })
      .addCase(editOffer.pending, (state) => {
        state.isEditOfferLoading = true;
      })
      .addCase(editOffer.fulfilled, (state, action) => {
        state.isEditOfferLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(editOffer.rejected, (state) => {
        state.isEditOfferLoading = false;
        state.isError = true;
      })
      .addCase(getMerchantStoresForOffer.pending, (state) => {
        state.isMerchantStoresLoading = true;
      })
      .addCase(getMerchantStoresForOffer.fulfilled, (state, action) => {
        state.isMerchantStoresLoading = false;
        state.isSuccess = true;
        state.offersStores = action.payload.response;
      })
      .addCase(getMerchantStoresForOffer.rejected, (state) => {
        state.isMerchantStoresLoading = false;
        state.isError = true;
      })
      .addCase(manualPointTransfer.pending, (state) => {
        state.isAddPointsLoading = true;
      })
      .addCase(manualPointTransfer.fulfilled, (state, action) => {
        state.isAddPointsLoading = false;
        state.isSuccess = true;
        state.couponInfo = null;
      })
      .addCase(manualPointTransfer.rejected, (state) => {
        state.isAddPointsLoading = false;
        state.isError = true;
        state.couponInfo = null;
      })
      .addCase(allSegments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allSegments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.segments = action.payload.response;
      })
      .addCase(allSegments.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allCampaigns.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allCampaigns.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.campaigns = action.payload.response;
      })
      .addCase(allCampaigns.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allEmailTemplates.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allEmailTemplates.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.emailTemplates = action.payload.response;
      })
      .addCase(allEmailTemplates.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(allJourneys.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(allJourneys.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.journeys = action.payload.response;
      })
      .addCase(allJourneys.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createCampaign.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(createCampaign.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getStripoCredentials.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getStripoCredentials.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.stripoCredentials = action.payload.response;
      })
      .addCase(getStripoCredentials.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getSingleTemplate.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleTemplate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleEmailTemplate = action.payload.response;
      })
      .addCase(getSingleTemplate.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(addEarningRule.pending, (state) => {
        state.isCreateEarnRuleLoading = true;
      })
      .addCase(addEarningRule.fulfilled, (state, action) => {
        state.isCreateEarnRuleLoading = false;
        state.isSuccess = true;
      })
      .addCase(addEarningRule.rejected, (state) => {
        state.isCreateEarnRuleLoading = false;
        state.isError = true;
      })
      .addCase(editEarningRule.pending, (state) => {
        state.isUpdateEarnRuleLoading = true;
      })
      .addCase(editEarningRule.fulfilled, (state, action) => {
        state.isUpdateEarnRuleLoading = false;
        state.isSuccess = true;
      })
      .addCase(editEarningRule.rejected, (state) => {
        state.isUpdateEarnRuleLoading = false;
        state.isError = true;
      })
      .addCase(getSpecificRewardDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpecificRewardDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
        state.specificReward = action.payload.response;
      })
      .addCase(getSpecificRewardDetail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getSpecificOfferDetail.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSpecificOfferDetail.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
        state.specificOffer = action.payload.response;
      })
      .addCase(getSpecificOfferDetail.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(merchantProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(merchantProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.shopifyProducts = action.payload;
      })
      .addCase(merchantProducts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(merchantProductsForDropDown.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(merchantProductsForDropDown.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
        state.shopifyProductsForDD = action.payload.response;
      })
      .addCase(merchantProductsForDropDown.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(editShopify.pending, (state) => {
        state.isShopifyCreatedLoading = true;
      })
      .addCase(editShopify.fulfilled, (state, action) => {
        state.isShopifyCreatedLoading = false;
        state.isSuccess = true;
      })
      .addCase(editShopify.rejected, (state) => {
        state.isShopifyCreatedLoading = false;
        state.isError = true;
      })
      .addCase(editPointStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editPointStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(editPointStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(duplicateEarningRule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(duplicateEarningRule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(duplicateEarningRule.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(createEmailTemplate.pending, (state) => {
        state.isCreateEmailLoading = true;
      })
      .addCase(createEmailTemplate.fulfilled, (state, action) => {
        state.isCreateEmailLoading = false;
        state.isSuccess = true;
      })
      .addCase(createEmailTemplate.rejected, (state) => {
        state.isCreateEmailLoading = false;
        state.isError = true;
      })
      .addCase(editEmailTemplate.pending, (state) => {
        state.isEditEmailLoading = true;
      })
      .addCase(editEmailTemplate.fulfilled, (state, action) => {
        state.isEditEmailLoading = false;
        state.isSuccess = true;
      })
      .addCase(editEmailTemplate.rejected, (state) => {
        state.isEditEmailLoading = false;
        state.isError = true;
      })
      .addCase(createSegment.pending, (state) => {
        state.isCreateSegmentLoading = true;
      })
      .addCase(createSegment.fulfilled, (state, action) => {
        state.isCreateSegmentLoading = false;
        state.isSuccess = true;
      })
      .addCase(createSegment.rejected, (state) => {
        state.isCreateSegmentLoading = false;
        state.isError = true;
      })
      .addCase(getMailChimpAccountStatus.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMailChimpAccountStatus.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.accountInfo = action.payload.response;
      })
      .addCase(getMailChimpAccountStatus.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getSingleRule.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSingleRule.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.singleRule = action.payload.response;
      })
      .addCase(getSingleRule.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      // .addCase(executeJourney.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(executeJourney.fulfilled, (state, action) => {
        state.isUpdate = !state.isUpdate;
        state.isSuccess = true;
      })
      .addCase(executeJourney.rejected, (state) => {
        state.isUpdate = false;
        state.isError = true;
      })
      .addCase(merchantDashboard.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(merchantDashboard.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.dashboardInfo = action.payload.response;
        state.dashboardEvents = [
          ["", ""],
          ["Scenario", action.payload.response?.rulesOfEvents[0]?.count || 0],
          ["Referral", action.payload.response?.rulesOfEvents[1]?.count || 0],
          [
            "General Spending",
            action.payload.response?.rulesOfEvents[2]?.count || 0,
          ],
          [
            "Geolocation",
            action.payload.response?.rulesOfEvents[3]?.count || 0,
          ],
          [
            "Multiply Earned Points",
            action.payload.response?.rulesOfEvents[4]?.count || 0,
          ],
          [
            "Product Purchase",
            action.payload.response?.rulesOfEvents[5]?.count || 0,
          ],
        ];
      })
      .addCase(merchantDashboard.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export const { reset, clearSingleTemplate, clearCoupon } = companySlice.actions;
export default companySlice.reducer;
