import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  CircularProgress,
  Stack,
  Grid,
  FormHelperText,
} from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar";
import Header from "../../../../components/Layout/Header";
import TextFieldComp from "../../../../components/InputFields/TextFieldComp";
import "./style.css";
import "../../../../components/dashboard/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../../../../redux/auth/authThunks";
import { useFormik } from "formik";
import { updateProfileSchema } from "../../../../schema/authSchema";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MerchantSidebar from "../../../../components/Layout/SideBar3";
import ConsumerSidebar from "../../../../components/Layout/SideBar2";
import Ellipse6 from "../../../../assets/Ellipse6.png";
import { format } from "date-fns";

const ConsumerDetail = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selected, setSelected] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo, isUpdate, isLoading } = useSelector((state) => state.auth);

  const fileInputRef = useRef(null);

  useEffect(() => {
    setSelected(null);
    formik.setFieldValue("photoUrl", userInfo?.photoUrl);
  }, [isUpdate]);

  const handleFileChange = (event) => {
    formik.setFieldValue("photoUrl", event.target.files[0]);
    setSelected(URL.createObjectURL(event.target.files[0]));
  };

  const handleUpdateImageClick = () => {
    fileInputRef.current.click();
  };

  const formik = useFormik({
    initialValues: {
      firstName: userInfo?.firstName,
      lastName: userInfo?.lastName,
      gender: userInfo?.gender,
      email: userInfo?.email,
      mobile: userInfo?.mobile,
      country: userInfo?.country,
      dateOfBirth: userInfo?.dateOfBirth,
      photoUrl: userInfo?.photoUrl,
    },
    validationSchema: updateProfileSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      dispatch(updateProfile({ formData }));
    },
  });

  return (
    <div>
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
                  <div className="uc-title">User Profile</div>
                </div>
                <div style={{ display: "flex", paddingTop: "20px" }}>
                  <img
                    className="uc-avatar"
                    src={selected || formik?.values?.photoUrl || Ellipse6}
                    alt="user"
                  />
                  <div className="consumer-update-profile-user">
                    <p>{userInfo?.firstName + " " + userInfo?.lastName}</p>
                    <p style={{ color: "grey" }}>{userInfo?.email}</p>
                  </div>
                </div>
                <div style={{ marginLeft: "30px" }}>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                  <button
                    style={{
                      width: "130px",
                      height: "48px",
                      borderRadius: "10px",
                      background: "#0B7974",
                      color: "white",
                      border: "none",
                    }}
                    onClick={handleUpdateImageClick}
                    type="button"
                  >
                    Update Image
                  </button>
                </div>
                <Grid
                  container
                  spacing={2}
                  className="consumer-update-profile-form"
                >
                  <Grid item xs={12}>
                    <p
                      style={{
                        fontSize: "18px",
                        fontWeight: "700",
                      }}
                    >
                      Profile Detail
                    </p>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack className="uc-field">
                      <TextFieldComp
                        label="First Name *"
                        placeholder="Enter First Name"
                        width="100%"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.firstName || formik.touched.firstName ? (
                        <p variant="body2" color="error">
                          {formik.errors.firstName}
                        </p>
                      ) : null}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack className="uc-field">
                      <TextFieldComp
                        label="Last Name"
                        placeholder="Enter last Name"
                        width="100%"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.lastName || formik.touched.lastName ? (
                        <p variant="body2" color="error">
                          {formik.errors.lastName}
                        </p>
                      ) : null}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack className="uc-field">
                      <TextFieldComp
                        label="Mobile Number *"
                        placeholder="Enter your mobile number"
                        width="100%"
                        name="mobile"
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                      />
                      {formik.errors.mobile || formik.touched.mobile ? (
                        <p variant="body2" color="error">
                          {formik.errors.mobile}
                        </p>
                      ) : null}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack>
                      <label
                        style={{
                          fontSize: "14px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        Gender *
                      </label>
                      <FormControl>
                        <Select
                          value={formik.values.gender}
                          onChange={(event) =>
                            formik.setFieldValue("gender", event.target.value)
                          }
                          displayEmpty
                          inputProps={{ "aria-label": "Select Gender" }}
                          sx={{
                            borderRadius: "10px",
                            width: "100%",
                            height: "55px",
                            marginTop: "5px",
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Gender
                          </MenuItem>
                          {[
                            { label: "Male", value: "M" },
                            { label: "Female", value: "F" },
                            { label: "Unknown", value: "U" },
                          ]?.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {formik.touched.gender || formik.errors.gender ? (
                          <FormHelperText
                            style={{
                              marginTop: "30px",
                            }}
                            error
                          >
                            {formik.errors.gender}
                          </FormHelperText>
                        ) : null}
                      </FormControl>
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack className="uc-field">
                      <TextFieldComp
                        type="date"
                        label="Date of Birth *"
                        placeholder="Enter your DOB"
                        width="100%"
                        name="dateOfBirth"
                        value={formik.values.dateOfBirth}
                        max={format(new Date(), "yyyy-MM-dd")}
                        onChange={(e) => {
                          const formattedDate = format(
                            new Date(e.target.value),
                            "yyyy-MM-dd"
                          );
                          formik.setFieldValue("dateOfBirth", formattedDate);
                        }}
                      />
                      {formik.errors.dateOfBirth ||
                      formik.touched.dateOfBirth ? (
                        <p variant="body2" color="error">
                          {formik.errors.dateOfBirth}
                        </p>
                      ) : null}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Stack className="uc-field">
                      <TextFieldComp
                        disabled={true}
                        label="Country *"
                        placeholder="Enter your country"
                        width="100%"
                        name="country"
                        value="US"
                        onChange={formik.handleChange}
                      />

                      {formik.errors.country || formik.touched.country ? (
                        <p variant="body2" color="error">
                          {formik.errors.country}
                        </p>
                      ) : null}
                    </Stack>
                  </Grid>
                  <Grid item xs={12} md={12} sx={{ marginTop: "10px" }}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <button
                        type="button"
                        className="uc-update-btn"
                        onClick={() => navigate("/update_password")}
                        style={{ marginRight: "10px" }}
                      >
                        Update Password
                      </button>
                      <button className="uc-update-btn" type="submit">
                        {isLoading ? (
                          <CircularProgress style={{ color: "#fff" }} />
                        ) : (
                          "Save"
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
    </div>
  );
};

export default ConsumerDetail;
