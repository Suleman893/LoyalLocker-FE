import { toast } from "react-toastify";
import API from "../../utils/axiosSetup";

const registerUser = async (obj) => {
  let API_URL = "/auth/register";
  const res = await API.post(API_URL, obj.userInfo);
  if (res.status === 200) {
    toast.success("Check email to activate account", { theme: "colored" });
  }
};

const loginUser = async (obj) => {
  const res = await API.post(
    obj.role === 2 ? "/auth/merchant/login" : "/auth/login",
    obj.userInfo
  );
  if (res.status === 200) {
    if (res.data.error === "Account is set as inactive") {
      return toast.error("Company is set as inactive", { theme: "colored" });
    }
    if (res.data.role === "ROLE_USER") {
      obj.navigate("/consumer_dashboard");
    } else if (res.data.role === "ROLE_MERCHANT") {
      obj.navigate("/company_dashboard");
    }
    return res.data;
  }
};

const loginAdmin = async ({ values, navigate }) => {
  const res = await API.post("/auth/admin/login", values);
  if (res.status === 200) {
    if (res.data.role === "ROLE_ADMIN") {
      navigate("/admin_dashboard");
      return res.data;
    }
  }
};

const resetPassword = async (obj) => {
  let API_URL = `/auth/forgot-password/${obj?.email}`;
  const res = await API.get(API_URL);
  if (res.status === 200) {
    return toast.success("Password reset email sent. ", {
      theme: "colored",
    });
  }
};

const createNewPassword = async (obj) => {
  let API_URL = `/auth/reset-password/${obj.token}`;
  const res = await API.post(API_URL, { newPassword: obj.newPassword });
  if (res.status === 200 || res.status === 201) {
    toast.success("Password updated successfully", { theme: "colored" });
    obj?.navigate("/reset_password_success");
    return res.data;
  }
};

const updateProfile = async (obj) => {
  let API_URL = `auth/profile`;
  const res = await API.put(API_URL, obj.formData);
  if (res.status === 200 || res.status === 201) {
    toast.success("Profile updated", { theme: "colored" });
    return res.data.response;
  }
};

const updatePassword = async (obj) => {
  let API_URL = `/auth/change-password`;
  const res = await API.put(API_URL, obj.updatedValues);
  if (res.status === 200 || res.status === 201) {
    toast.success("Password updated successfully", { theme: "colored" });
    obj?.navigate("/profile_update");
    return res.data;
  }
};

// const logoutUser = async (obj) => {
//   let API_URL = "/auth/logout";
//   const res = await API.post(API_URL);
//   if (res.status === 200) obj.navigate("/");
// };

const authService = {
  registerUser,
  loginUser,
  loginAdmin,
  resetPassword,
  updateProfile,
  createNewPassword,
  updatePassword,
  // logoutUser,
};

export default authService;
