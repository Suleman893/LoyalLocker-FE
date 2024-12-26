import adminService from "./adminService";
import { toast } from "react-toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const adminDashboard = createAsyncThunk(
  "admin/adminDashboard",
  async (obj, thunkAPI) => {
    try {
      return await adminService.adminDashboard(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getAllMerchantForDashboard = createAsyncThunk(
  "admin/getAllMerchantForDashboard",
  async (obj, thunkAPI) => {
    try {
      return await adminService.getAllMerchantForDashboard(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allMembers = createAsyncThunk(
  "admin/allMembers",
  async (obj, thunkAPI) => {
    try {
      return await adminService.allMembers(obj);
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
      return await adminService.allTransferMembers(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allTransferPoints = createAsyncThunk(
  "admin/transfers",
  async (obj, thunkAPI) => {
    try {
      return await adminService.allTransferPoints(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allTransactions = createAsyncThunk(
  "admin/allTransactions",
  async (obj, thunkAPI) => {
    try {
      return await adminService.allTransactions(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const manualPointTransfer = createAsyncThunk(
  "admin/manualPointTransfer",
  async (obj, thunkAPI) => {
    try {
      return await adminService.manualPointTransfer(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createMerchant = createAsyncThunk(
  "admin/createMerchant",
  async (obj, thunkAPI) => {
    try {
      return await adminService.createNewMerchant(obj);
    } catch (err) {
      const message = err?.response?.data?.error;
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allMerchants = createAsyncThunk(
  "admin/merchants",
  async (obj, thunkAPI) => {
    try {
      return await adminService.getAllMerchants(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const merchantStatus = createAsyncThunk(
  "admin/merchantStatus",
  async (obj, thunkAPI) => {
    try {
      return await adminService.changeMerchantStatus(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changeMemberStatus = createAsyncThunk(
  "admin/changeMemberStatus",
  async (obj, thunkAPI) => {
    try {
      return await adminService.changeMemberStatus(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const allEvents = createAsyncThunk(
  "admin/events",
  async (obj, thunkAPI) => {
    try {
      return await adminService.getAllEvents(obj);
    } catch (err) {
      const message = err.message;
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const addEvent = createAsyncThunk(
  "admin/event",
  async (obj, thunkAPI) => {
    try {
      return await adminService.addEvent(obj);
    } catch (err) {
      const message = err?.response?.data?.response;
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changeEventStatus = createAsyncThunk(
  "admin/changeEventStatus",
  async (obj, thunkAPI) => {
    try {
      return await adminService.changeEventStatus(obj);
    } catch (err) {
      const message = err?.response?.data?.response;
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getRuleByEvent = createAsyncThunk(
  "admin/getRuleByEvent",
  async (obj, thunkAPI) => {
    try {
      return await adminService.getRuleByEvent(obj);
    } catch (err) {
      const message = "Server Error";
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const changeRuleStatus = createAsyncThunk(
  "admin/updateRuleStatus",
  async (obj, thunkAPI) => {
    try {
      return await adminService.changeRuleStatus(obj);
    } catch (err) {
      const message = "Server Error";
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const getSpecificCompanyDetail = createAsyncThunk(
  "admin/getSpecificCompanyDetail",
  async (obj, thunkAPI) => {
    try {
      return await adminService.getSpecificCompanyDetail(obj);
    } catch (err) {
      const message = "Server Error";
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateMerchantInfo = createAsyncThunk(
  "admin/updateMerchantInfo",
  async (obj, thunkAPI) => {
    try {
      return await adminService.updateMerchantInfo(obj);
    } catch (err) {
      const message = "Server Error";
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);
