import { toast } from "react-toastify";
import API from "../../utils/axiosSetup";

const allMerchantsOffers = async ({ page, pageSize }) => {
  let API_URL = `/consumer/offers?page=${page}&pageSize=${pageSize}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const allMerchantRewards = async ({ page, pageSize }) => {
  let API_URL = `/consumer/rewards?page=${page}&pageSize=${pageSize}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const totalBalance = async () => {
  let API_URL = `/consumer/total-balance`;
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
  let API_URL = `/consumer/all-transactions?page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&text=${text}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const availReward = async (obj) => {
  let API_URL = `/consumer/avail-reward/${obj.id}`;
  const res = await API.post(API_URL, { couponCode: obj?.couponCode });
  if (res.status === 200 || res.status === 201) {
    toast.success("Coupon availed for reward", { theme: "colored" });
  }
};

const availOffer = async (obj) => {
  let API_URL = `/consumer/avail-offer/${obj.id}`;
  const res = await API.post(API_URL, { couponCode: obj?.couponCode });
  if (res.status === 200 || res.status === 201) {
    toast.success("Coupon availed for offer", { theme: "colored" });
  }
};

const availEarningRule = async (obj) => {
  let API_URL = `/consumer/avail-rule/${obj.id}`;
  const res = await API.post(API_URL, { couponCode: obj?.couponCode });
  if (res.status === 200 || res.status === 201) {
    toast.success("Coupon availed for rule", { theme: "colored" });
  }
};

const allTransferPoints = async ({
  page,
  pageSize,
  startDate,
  endDate,
  text,
}) => {
  let API_URL = `/consumer/transfers?page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&text=${text}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const inviteFriend = async (obj) => {
  let API_URL = `/consumer/friend`;
  const res = await API.post(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    toast.success("Friend invited", { theme: "colored" });
    obj.setShowCreateModal(false);
    return res.data;
  }
};

const allReferredFriends = async () => {
  let API_URL = `/consumer/referred-friends`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const consumerDashboard = async () => {
  let API_URL = `/consumer/dashboard`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const companyService = {
  allMerchantsOffers,
  allMerchantRewards,
  totalBalance,
  allTransferPoints,
  inviteFriend,
  allReferredFriends,
  availReward,
  availOffer,
  availEarningRule,
  allTransactions,
  consumerDashboard,
};

export default companyService;
