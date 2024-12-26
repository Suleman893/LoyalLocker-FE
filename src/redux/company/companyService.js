import { toast } from "react-toastify";
import API from "../../utils/axiosSetup";

const merchantProducts = async (obj) => {
  let API_URL = `/merchant/products?page=${obj?.page}&pageSize=${obj?.pageSize}&startDate=${obj?.startDate}&endDate=${obj?.endDate}&text=${obj?.text}`;
  const res = await API.get(API_URL);
  return res.data;
};

const merchantProductsForDropDown = async (obj) => {
  let API_URL = `/merchant/products/all`;
  const res = await API.get(API_URL);
  return res.data;
};

const inviteMember = async (obj) => {
  let API_URL = `/merchant/invite-member`;
  const res = await API.post(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    toast.success("Member invited successfully", { theme: "colored" });
    obj.navigate("/company_members");
    return res.data;
  }
};

const getAllStores = async (obj) => {
  let API_URL = `/merchant/stores?active=${obj.activeStatus}`;
  const res = await API.get(API_URL);
  return res.data.response;
};

const addStore = async (obj) => {
  let API_URL = `/merchant/store`;
  const res = await API.post(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    toast.success("Store created", { theme: "colored" });
    obj?.navigate("/company_stores");
    return res.data;
  }
};

const getSingleRule = async (obj) => {
  let API_URL = `/single-rule/${obj.id}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const merchantDashboard = async () => {
  let API_URL = `/merchant/dashboard`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const changeStoreStatus = async (obj) => {
  let API_URL = `/merchant/store/${obj?.statusChangeItem?.id}/activate`;
  const res = await API.patch(API_URL);
  if (res.status === 200 || res.status === 201) {
    toast.success("Store status changed", { theme: "colored" });
    return res.data;
  }
};

const allMembers = async ({ page, pageSize, startDate, endDate, text }) => {
  let API_URL = `/merchant/merchant-consumers?page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&text=${text}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const allTransferPoints = async ({
  page,
  pageSize,
  startDate,
  endDate,
  text,
}) => {
  let API_URL = `/merchant/all-transfer-points?page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&text=${text}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const getRuleOfMerchantByEvent = async (obj) => {
  let API_URL = `/merchant/rule/${obj.id}?page=${obj?.page}&pageSize=${obj?.pageSize}`;
  const res = await API.get(API_URL);
  return res.data;
};

const getRulesForEventCreation = async (obj) => {
  let API_URL = `/events-for-rule-creation`;
  const res = await API.get(API_URL);
  return res.data;
};

const createReward = async (obj) => {
  let API_URL = `/merchant/reward`;
  const res = await API.post(API_URL, obj.formData);
  if (res.status === 200 || res.status === 201) {
    obj.navigate("/reward_offer");
    toast.success("Reward created", { theme: "colored" });
  }
};

const editReward = async (obj) => {
  let API_URL = `/merchant/reward/${obj.id}`;
  const res = await API.put(API_URL, obj.formData);
  if (res.status === 200 || res.status === 201) {
    toast.success("Reward updated", { theme: "colored" });
    obj?.navigate("/reward_offer");
    return res.data;
  }
};

const editOffer = async (obj) => {
  let API_URL = `/merchant/offer/${obj.id}`;
  const res = await API.put(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    toast.success("Offer updated", { theme: "colored" });
    obj?.navigate("/reward_offer");
    return res.data;
  }
};

const createOffer = async (obj) => {
  let API_URL = `/merchant/offer`;
  const res = await API.post(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    obj.navigate("/reward_offer");
    toast.success("Offer created", { theme: "colored" });
  }
};

const allRewards = async ({ page, pageSize }) => {
  let API_URL = `/merchant/rewards?page=${page}&pageSize=${pageSize}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const allOffers = async ({ page, pageSize }) => {
  let API_URL = `/merchant/offers?page=${page}&pageSize=${pageSize}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const getSpecificOfferDetail = async (obj) => {
  let API_URL = `/merchant/specific-offer/${obj.id}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const getSpecificRewardDetail = async (obj) => {
  let API_URL = `/merchant/specific-reward/${obj.id}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const allSegments = async () => {
  let API_URL = `/merchant/all-segments`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const allCampaigns = async () => {
  let API_URL = `/merchant/all-campaigns`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const allEmailTemplates = async () => {
  let API_URL = `/merchant/email-templates`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const createEmailTemplate = async (obj) => {
  let API_URL = `/merchant/create-email-template`;
  const res = await API.post(API_URL, obj.templateData);
  if (res.status === 200 || res.status === 201) {
    obj.navigate("/email_templates");
    toast.success("Template created", { theme: "colored" });
  }
};

const getSingleTemplate = async (obj) => {
  let API_URL = `/merchant/single-email-template/${obj.id}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const editEmailTemplate = async (obj) => {
  let API_URL = `/merchant/edit-email-template/${obj.id}`;
  const res = await API.put(API_URL, obj.templateData);
  if (res.status === 200 || res.status === 201) {
    obj.navigate("/email_templates");
    toast.success("Template updated", { theme: "colored" });
  }
};

const allJourneys = async () => {
  let API_URL = `/merchant/all-journeys`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const createCampaign = async (obj) => {
  let API_URL = `/merchant/create-campaign`;
  const res = await API.post(API_URL, obj.campaignInfo);
  if (res.status === 200 || res.status === 201) {
    obj.navigate("/campaigns");
    toast.success("Campaign created", { theme: "colored" });
  }
};

const getStripoCredentials = async (obj) => {
  let API_URL = `/merchant/get-stripo-credentials`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const createSegment = async (obj) => {
  let API_URL = `/merchant/create-segment`;
  const res = await API.post(API_URL, obj.payload);
  if (res.status === 200 || res.status === 201) {
    obj.navigate("/audience");
    toast.success("Segment created", { theme: "colored" });
  }
};

const addJourney = async (obj) => {
  let API_URL = `/merchant/create-campaign-journey`;
  const res = await API.post(API_URL, obj.journey);
  if (res.status === 200 || res.status === 201) {
    obj.navigate("/journeys");
    toast.success("Journey created", { theme: "colored" });
  }
};

const executeJourney = async (obj) => {
  let API_URL = `/merchant/execute-journey/${obj.journeyId}`;
  const scheduledTime = { scheduleTime: obj?.scheduleTime };
  const res = await API.post(API_URL, scheduledTime);
  if (res.status === 200 || res.status === 201) {
    toast.success("Journey executed", { theme: "colored" });
  }
};

const addEarningRule = async (obj) => {
  let API_URL = `/merchant/rule`;
  const res = await API.post(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    toast.success("Rule created", { theme: "colored" });
    obj.navigate("/company_rules");
  }
};

const editEarningRule = async (obj) => {
  let API_URL = `/merchant/rule/${obj.id}`;
  const res = await API.put(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    toast.success("Rule updated", { theme: "colored" });
    obj.navigate("/company_rules");
  }
};

const duplicateEarningRule = async (obj) => {
  let API_URL = `/merchant/duplicate-rule/${obj.id}`;
  const res = await API.post(API_URL);
  if (res.status === 200 || res.status === 201) {
    toast.success("Rule duplicated", { theme: "colored" });
  }
};

const allTransferMembers = async () => {
  let API_URL = `/merchant/all-transfer-members`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const changeMemberStatus = async (obj) => {
  let API_URL = `/merchant/consumer/${obj?.id}/activate`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    toast.success("Member status changed", { theme: "colored" });
    return res.data;
  }
};

const changeRewardStatus = async (obj) => {
  let API_URL = `/merchant/reward-status-change/${obj?.id}`;
  const res = await API.patch(API_URL);
  if (res.status === 200 || res.status === 201) {
    toast.success("Reward status changed", { theme: "colored" });
    return res.data;
  }
};

const changeOfferStatus = async (obj) => {
  let API_URL = `/merchant/offer-status-change/${obj?.id}`;
  const res = await API.patch(API_URL);
  if (res.status === 200 || res.status === 201) {
    toast.success("Offer status changed", { theme: "colored" });
    return res.data;
  }
};

const manualPointTransfer = async (obj) => {
  let API_URL = `/merchant/manual-transfer-point`;
  const res = await API.post(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    if (obj.values.transferType === "SPEND" && obj?.values?.couponCode) {
      toast.success("Points spend by member", {
        theme: "colored",
      });
      obj.navigate("/company_transactions");
    } else if (obj.values.transferType === "SPEND") {
      toast.success("Points spend by member", {
        theme: "colored",
      });
      obj.navigate("/company_transfers");
    } else {
      obj.navigate("/company_transfers");
      toast.success("Points earned by member", {
        theme: "colored",
      });
    }
    return res.data;
  }
};

const getMerchantStoresForOffer = async (obj) => {
  let API_URL = `/merchant/all-stores`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const checkIntegrationStatus = async (obj) => {
  let API_URL = `/merchant/check-integration-status`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const integrateShopify = async (obj) => {
  let API_URL = "/merchant/integrate-shopify";
  const res = await API.post(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    obj.closeModal();
    return toast.success(res.data?.response, { theme: "colored" });
  }
};

const editShopify = async (obj) => {
  let API_URL = `/merchant/edit-shopify-integration`;
  const res = await API.put(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    obj.closeModal();
    return toast.success(res.data?.response, { theme: "colored" });
  }
};

const integrateMailChimp = async (obj) => {
  let API_URL = "/merchant/add-mailchimp-credential";
  const res = await API.post(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    obj.closeModal();
    return toast.success(res.data?.response, { theme: "colored" });
  }
};

const editMailChimp = async (obj) => {
  let API_URL = "/merchant/edit-mailchimp-credential";
  const res = await API.put(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    obj.closeModal();
    return toast.success(res.data?.response, { theme: "colored" });
  }
};

const editPointStatus = async (obj) => {
  let API_URL = `/merchant/point/${obj.id}/activate`;
  const res = await API.patch(API_URL, obj);
  if (res.status === 200 || res.status === 201) {
    return toast.success(res.data?.response, { theme: "colored" });
  }
};

const getMailChimpAccountStatus = async (obj) => {
  let API_URL = `/merchant/get-account-info`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const getCouponInfo = async (obj) => {
  let API_URL = `/merchant/coupon-info/${obj?.couponCode}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const allTransactions = async ({
  page,
  pageSize,
  startDate,
  endDate,
  text,
}) => {
  let API_URL = `/merchant/all-transactions?page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&text=${text}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const companyService = {
  allTransactions,
  getMailChimpAccountStatus,
  checkIntegrationStatus,
  editShopify,
  integrateShopify,
  integrateMailChimp,
  merchantProducts,
  merchantProductsForDropDown,
  inviteMember,
  getAllStores,
  addStore,
  changeStoreStatus,
  allMembers,
  allTransferPoints,
  getRuleOfMerchantByEvent,
  getRulesForEventCreation,
  createReward,
  createOffer,
  allSegments,
  allCampaigns,
  allRewards,
  allOffers,
  allEmailTemplates,
  editEmailTemplate,
  createEmailTemplate,
  getSingleTemplate,
  allJourneys,
  createCampaign,
  getStripoCredentials,
  createSegment,
  addJourney,
  executeJourney,
  changeMemberStatus,
  addEarningRule,
  allTransferMembers,
  manualPointTransfer,
  getMerchantStoresForOffer,
  changeRewardStatus,
  changeOfferStatus,
  getSpecificOfferDetail,
  getSpecificRewardDetail,
  editReward,
  editOffer,
  editPointStatus,
  duplicateEarningRule,
  getSingleRule,
  getCouponInfo,
  editEarningRule,
  merchantDashboard,
  editMailChimp,
};

export default companyService;
