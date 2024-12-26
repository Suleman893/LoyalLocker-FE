import React, { useState } from "react";
import TextFieldComp from "../../../../components/InputFields/TextFieldComp";
import { Box, CircularProgress, Stack, Grid } from "@mui/material";
import Header from "../../../../components/Layout/Header";
import SideBar from "../../../../components/Layout/SideBar";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { updatePassword } from "../../../../redux/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import { updatePasswordSchema } from "../../../../schema/authSchema";
import { toast } from "react-toastify";
import MerchantSidebar from "../../../../components/Layout/SideBar3";
import ConsumerSidebar from "../../../../components/Layout/SideBar2";
import "../../../../components/dashboard/Dashboard.css";

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, isLoading } = useSelector((state) => state.auth);
  const [collapsed, setCollapsed] = useState(false);

  const formik = useFormik({
    initialValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: updatePasswordSchema,
    onSubmit: async (values) => {
      if (values.newPassword !== values.confirmPassword) {
        return toast.info("Confirm Password don't match", { theme: "colored" });
      }
      const { confirmPassword, ...updatedValues } = values;
      dispatch(updatePassword({ updatedValues, navigate }));
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ width: "100%", minHeight: "100vh", display: "flex" }}>
        {userInfo?.role === "ROLE_ADMIN" ? (
          <SideBar />
        ) : userInfo?.role === "ROLE_MERCHANT" ? (
          <MerchantSidebar />
        ) : userInfo?.role === "ROLE_USER" ? (
          <ConsumerSidebar />
        ) : null}
        <Stack className="main-height">
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack sx={{ padding: "0px 30px" }}></Stack>
          <Box className="dashboard-main-div">
            <Stack className="uc-main-div">
              <div style={{ display: "flex" }}>
                <div className="uc-title-design"></div>
                <div className="uc-title">Update Password</div>
              </div>
              <Grid container spacing={2} className="consumer-update-profile-form">
                <Grid item xs={12} md={9} lg={7} xl={6.5}>
                  <Stack className="uc-field">
                    <TextFieldComp
                      label="Old Password *"
                      placeholder="Enter "
                      width="100%"
                      name="currentPassword"
                      value={formik.values.currentPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.currentPassword ||
                    formik.errors.currentPassword ? (
                      <p>{formik.errors.currentPassword}</p>
                    ) : null}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={9} lg={7} xl={6.5}>
                  <Stack className="uc-field">
                    <TextFieldComp
                      label="New Password *"
                      placeholder="Enter"
                      width="100%"
                      name="newPassword"
                      value={formik.values.newPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.newPassword || formik.errors.newPassword ? (
                      <p>{formik.errors.newPassword}</p>
                    ) : null}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={9} lg={7} xl={6.5}>
                  <Stack className="uc-field">
                    <TextFieldComp
                      label="Confirm Password *"
                      placeholder="Enter "
                      width="100%"
                      name="confirmPassword"
                      value={formik.values.confirmPassword}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.confirmPassword ||
                    formik.errors.confirmPassword ? (
                      <p>{formik.errors.confirmPassword}</p>
                    ) : null}
                  </Stack>
                </Grid>
                <Grid item xs={12} md={12}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                    }}
                  >
                    <button
                      className="uc-back-btn"
                      onClick={() => navigate(-1)}
                      type="button"
                      style={{ marginRight: '10px' }}
                    >
                      Back
                    </button>
                    <button className="uc-update-btn" type="submit">
                      {isLoading ? (
                        <CircularProgress style={{ color: "#fff" }} />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </Grid>
              </Grid>
            </Stack>
          </Box>
        </Stack>
      </div>
    </form>
  );
};

export default ChangePassword;
