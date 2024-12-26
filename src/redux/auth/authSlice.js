import { createSlice } from "@reduxjs/toolkit";
import {
  userRegister,
  userLogin,
  // userLogout,
  adminLogin,
  updateProfile,
  updatePassword,
  resetPassword,
  createTheNewPasswords,
} from "./authThunks";

const initialState = {
  isLoginLoading: false,
  userInfo: null,
  isLoading: false,
  isSignupLoading: false,
  isSuccess: false,
  isError: false,
  isUpdate: false,
  isResetLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoginLoading = false;
      state.userInfo = null;
      state.isLoading = false;
      state.isSignupLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.isUpdate = false;
      state.isResetLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userRegister.pending, (state) => {
        state.isSignupLoading = true;
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.isSignupLoading = false;
        state.isSuccess = true;
      })
      .addCase(userRegister.rejected, (state) => {
        state.isSignupLoading = false;
        state.isError = true;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoginLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, action) => {
        state.isLoginLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoginLoading = false;
        state.isError = true;
      })
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
      })
      .addCase(adminLogin.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(resetPassword.pending, (state) => {
        state.isResetLoading = true;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isResetLoading = false;
        state.isSuccess = true;
      })
      .addCase(resetPassword.rejected, (state) => {
        state.isResetLoading = false;
        state.isError = true;
      })
      .addCase(createTheNewPasswords.pending, (state) => {
        state.isResetLoading = true;
      })
      .addCase(createTheNewPasswords.fulfilled, (state, action) => {
        state.isResetLoading = false;
        state.isSuccess = true;
      })
      .addCase(createTheNewPasswords.rejected, (state) => {
        state.isResetLoading = false;
        state.isError = true;
      })
      .addCase(updateProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.userInfo = action.payload;
        state.isUpdate = !state.isUpdate;
      })
      .addCase(updateProfile.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updatePassword.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset, logout } = authSlice.actions;
export default authSlice.reducer;
