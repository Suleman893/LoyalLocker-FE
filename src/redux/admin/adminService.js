import { toast } from "react-toastify";
import API from "../../utils/axiosSetup";

const adminDashboard = async (obj) => {
  let API_URL = `/admin/dashboard/${obj.id}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const changeMemberStatus = async (obj) => {
  let API_URL = `/admin/consumer/${obj?.id}/activate`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    toast.success("Member status changed", { theme: "colored" });
    return res.data;
  }
};

const allMembers = async ({ page, pageSize, startDate, endDate, text }) => {
  let API_URL = `/admin/all-consumers?page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&text=${text}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const allTransferMembers = async () => {
  let API_URL = `/admin/all-transfer-members`;
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
  let API_URL = `/admin/all-transfer-points?page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&text=${text}`;
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
  let API_URL = `/admin/all-transactions?page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}&text=${text}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data;
  }
};

const manualPointTransfer = async (obj) => {
  let API_URL = `/admin/manual-transfer-point`;
  const res = await API.post(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    toast.success("Points transferred successfully", { theme: "colored" });
    obj.navigate("/admin_transfers");
    return res.data;
  }
};

const createNewMerchant = async (obj) => {
  let API_URL = `/admin/merchant`;
  const res = await API.post(API_URL, obj?.values);
  if (res.status === 200 || res.status === 201) {
    toast.success("Merchant invited", { theme: "colored" });
    obj.navigate("/all_companies");
  }
};

const getAllMerchants = async (obj) => {
  let API_URL = `/admin/merchants?isActive=${obj?.activeStatus}&page=${obj?.page}&pageSize=${obj?.pageSize}&startDate=${obj?.startDate}&endDate=${obj?.endDate}&text=${obj?.text}`;
  const res = await API.get(API_URL);
  return res.data;
};

const changeMerchantStatus = async (obj) => {
  let API_URL = `/admin/merchants/${obj?.statusChangeItem?.id}/activate`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    toast.success("Company status changed", { theme: "colored" });
    return res.data;
  }
};

const getAllEvents = async (obj) => {
  let API_URL = `/admin/event?page=${obj.page}&pageSize=${obj.pageSize}`;
  const res = await API.get(API_URL);
  return res.data;
};

const addEvent = async (obj) => {
  let API_URL = `admin/event`;
  const res = await API.post(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    toast.success("New rule type created", { theme: "colored" });
    obj.navigate("/admin_ruletypes");
    return res.data;
  }
};

const changeEventStatus = async (obj) => {
  let API_URL = `/update-event-status/${obj.id}`;
  const res = await API.patch(API_URL);
  if (res.status === 200 || res.status === 201) {
    toast.success("Rule type status updated", { theme: "colored" });
    return res.data;
  }
};

const getRuleByEvent = async (obj) => {
  let API_URL = `/rule/${obj.id}?page=${obj?.page}&pageSize=${obj?.pageSize}`;
  const res = await API.get(API_URL);
  return res.data;
};

const changeRuleStatus = async (obj) => {
  let API_URL = `/update-rule-status/${obj.id}`;
  const res = await API.patch(API_URL, obj);
  if (res.status === 200 || res.status === 201) {
    toast.success("Rule status updated", { theme: "colored" });
    return res.data;
  }
};

const getSpecificCompanyDetail = async (obj) => {
  let API_URL = `/admin/specific-company-detail/${obj.id}`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data.response;
  }
};

const updateMerchantInfo = async (obj) => {
  let API_URL = `/admin/merchant/${obj.id}`;
  const res = await API.put(API_URL, obj.values);
  if (res.status === 200 || res.status === 201) {
    toast.success("Merchant information updated", { theme: "colored" });
    return res.data.response;
  }
};

const getAllMerchantForDashboard = async (obj) => {
  let API_URL = `/admin/dashboard/all-merchants`;
  const res = await API.get(API_URL);
  if (res.status === 200 || res.status === 201) {
    return res.data.response;
  }
};

const adminService = {
  adminDashboard,
  getAllMerchantForDashboard,
  changeMemberStatus,
  allMembers,
  allTransferMembers,
  getAllMerchants,
  manualPointTransfer,
  changeMerchantStatus,
  createNewMerchant,
  allTransferPoints,
  getAllEvents,
  addEvent,
  changeEventStatus,
  getRuleByEvent,
  changeRuleStatus,
  getSpecificCompanyDetail,
  updateMerchantInfo,
  allTransactions,
};

export default adminService;
