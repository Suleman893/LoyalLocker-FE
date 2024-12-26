import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";
import { toast } from "react-toastify";

export const userRegister = createAsyncThunk(
  "auth/userRegister",
  async (obj, thunkAPI) => {
    try {
      return await authService.registerUser(obj);
    } catch (err) {
      let message;
      if (err?.response?.data?.response) {
        message = err?.response?.data?.response;
        return toast.error(message, {
          theme: "colored",
        });
      }
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/userLogin",
  async (obj, thunkAPI) => {
    try {
      return await authService.loginUser(obj);
    } catch (err) {
      const message = "Failed to login";
      toast.error(err?.response?.data?.response || message, {
        theme: "colored",
      });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const adminLogin = createAsyncThunk(
  "admin/adminLogin",
  async (obj, thunkAPI) => {
    try {
      return await authService.loginAdmin(obj);
    } catch (err) {
      const message = "Failed to login";
      toast.error(err?.response?.data?.response || message, {
        theme: "colored",
      });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// export const userLogout = createAsyncThunk(
//   "auth/userLogout",
//   async (obj, thunkAPI) => {
//     try {
//       return await authService.logoutUser(obj);
//     } catch (err) {
//       const message = err.message;
//       toast.error(message, { theme: "colored" });
//       return thunkAPI.rejectWithValue(message);
//     }
//   }
// );

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (obj, thunkAPI) => {
    try {
      return await authService.resetPassword(obj);
    } catch (err) {
      const message = err.response.data.response;
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const createTheNewPasswords = createAsyncThunk(
  "auth/createTheNewPasswords",
  async (obj, thunkAPI) => {
    try {
      return await authService.createNewPassword(obj);
    } catch (err) {
      const message = err.message;
      toast.error("Error updating password", { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (obj, thunkAPI) => {
    try {
      return await authService.updateProfile(obj);
    } catch (err) {
      const message = err.message;
      toast.error(message, { theme: "colored" });
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "auth/updatePassword",
  async (obj, thunkAPI) => {
    try {
      return await authService.updatePassword(obj);
    } catch (err) {
      if (err.response.status === 403) {
        toast.error("Invalid credentials", { theme: "colored" });
      }
      return thunkAPI.rejectWithValue("Server Error");
    }
  }
);
