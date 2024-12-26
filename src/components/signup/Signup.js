import React, { useState } from "react";
import "./signup.css";
import { Stack, Grid, Box, Typography, CircularProgress } from "@mui/material";
import GenderSelection from "../InputFields/GenderSelection";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../../redux/auth/authThunks";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import FormikTextFieldComp from "../InputFields/FormikTextFieldComp";
import { useFormik } from "formik";
import { registerSchema } from "../../schema/authSchema";
import { format } from "date-fns";
import logo from "../../assets/logo.png";
import Ellipse6 from "../../assets/Ellipse6.png";
import login from "../../assets/login2.png";
import cam from "../../assets/cam.png";
import TextFieldComp from "../InputFields/TextFieldComp";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { referredByReferralCode } = useParams();
  const { isSignupLoading } = useSelector((state) => state.auth);

  const [profilePic, setProfilePic] = useState(null);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setshowConfirmPass] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      gender: "",
      password: "",
      confirmPassword: "",
      mobile: "",
      country: "US",
      dateOfBirth: "",
    },
    validationSchema: registerSchema,
    onSubmit: (values) => {
      if (values.password !== values.confirmPassword) {
        return toast.error("Passwords don't match", { theme: "colored" });
      }
      if (!values.gender) {
        return toast.error("Please select a gender", { theme: "colored" });
      }

      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Append the image file to the formData
      if (profilePic) {
        formData.append("photoUrl", profilePic);
      }

      if (referredByReferralCode) {
        formData.append("referredByReferralCode", referredByReferralCode);
      }

      dispatch(userRegister({ userInfo: formData }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex" }} className="signup-main-container">
        <Grid container sx={{ width: "100%", height: "100%" }}>
          <Grid item md={6} className="login-left-side-main-container">
            <div className="login-left-side-1">
              <div className="login-left-side-container1">
                <div className="login-left-text-11">
                Effortlessly manage your loyalty rewards with our innovative Web3 platform. Access personalized offers, real-time rewards, and a host of exclusive benefits, all designed to maximize your rewards experience.
                </div>
              </div>
              <img src={login} className="signup-img-1" alt="" />
            </div>
          </Grid>
          <Grid
            item
            md={6}
            className="signup-right-side-1"
            sx={{ background: "rgb(243,247,249)" }}
          >
            <Box className="signup-right-side-1-form">
              <Stack className="signup-logo-container">
                <img
                  src={logo}
                  style={{
                    width: "186px",
                    height: "69px",
                  }}
                  alt="logo"
                />
              </Stack>
              <div className="add-profile-container">
                <div style={{ position: "relative" }}>
                  <img
                    src={profilePic ? URL.createObjectURL(profilePic) : Ellipse6}
                    style={{
                      width: "106px",
                      height: "106px",
                      borderRadius: "50%",
                      border: "none",
                      color: "white",
                      background: "#FF5833",
                      objectFit: "cover",
                      marginTop:'3rem',
                    }}
                    alt="Your Alt Text"
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "80%",
                      right: "-5%",
                      transform: "translate(-50%, -50%)",
                      border: "none",
                    }}
                  >
                    <input
                      type="file"
                      id="imageInput"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleImageUpload}
                    />
                    <label htmlFor="imageInput">
                      <img
                        style={{
                          width: "30px",
                          height: "30px",
                          cursor: "pointer",
                        }}
                        src={cam}
                        alt="Camera Icon"
                      />
                    </label>
                  </div>
                </div>
              </div>
              <Grid container gap={1.5} sx={{ width: "100%", marginLeft: "0px"}}>
                  <Grid item xs={12} md={5.8}>
                    <FormikTextFieldComp
                      label="First Name"
                      placeholder="Enter First Name"
                      width="98%"
                      name="firstName"
                      backgroundColor="white"
                      type="text"
                      value={values.firstName}
                      onChange={handleChange}
                    />
                    {errors.firstName || touched.firstName ? (
                      <Typography variant="body2" color="error">
                        {errors.firstName}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} md={5.8}>
                    <FormikTextFieldComp
                      label="Last Name"
                      placeholder="Enter Last Name"
                      width="98%"
                      name="lastName"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                    />
                    {errors.lastName || touched.lastName ? (
                      <Typography variant="body2" color="error">
                        {errors.lastName}
                      </Typography>
                    ) : null}
                  </Grid>
                <Grid item xs={12} sx={{marginTop:'16px'}}>
                  <FormikTextFieldComp
                    label="Email"
                    placeholder="Enter your email"
                    width="99%"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                  />
                  {touched.email || errors.email ? (
                    <Typography variant="body2" color="error">
                      {errors.email}
                    </Typography>
                  ) : null}
                </Grid>
                <Grid item xs={12} sx={{marginTop:'16px'}}>
                  <GenderSelection
                    onChange={handleChange}
                    value={values.gender}
                    name="gender"
                  />
                  {errors.gender || touched.gender ? (
                    <Typography variant="body2" color="error">
                      {errors.gender}
                    </Typography>
                  ) : null}
                </Grid>
                  <Grid item xs={12} md={5.8}>
                    <FormikTextFieldComp
                      label="Mobile Number"
                      placeholder="Enter your mobile number"
                      width="98%"
                      name="mobile"
                      value={values.mobile}
                      onChange={handleChange}
                    />
                    {errors.mobile || touched.mobile ? (
                      <Typography variant="body2" color="error">
                        {errors.mobile}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} md={5.8}>
                    <FormikTextFieldComp
                      label="Country"
                      placeholder="Enter your country"
                      width="98%"
                      name="country"
                      value="US"
                      disabled={true}
                    />
                    {errors.country || touched.country ? (
                      <Typography variant="body2" color="error">
                        {errors.country}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} md={5.8}>
                    <Stack>
                      <label
                        style={{
                          fontSize: "14px",
                          color: "#0B7974",
                        }}
                      >
                        Password
                      </label>
                    </Stack>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        border: "1px solid #BDBDBD",
                        backgroundColor: "#FEFEFE",
                        width: "100%",
                        height: "55px",
                        borderRadius: "10px",
                      }}
                    >
                      <input
                        style={{
                          fontSize: "14px",
                          color: "#0B7974",
                          width: "100%",
                          padding: "0 10px",
                          outline: "none",
                          border: "none",
                        }}
                        placeholder="Enter your password"
                        id="standard-password-input"
                        label="Password"
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={values.password}
                        onChange={handleChange}
                      />
                      <div
                        style={{
                          padding: "0 10px",
                          cursor: "pointer",
                        }}
                      >
                        <i onClick={() => setShowPass(!showPass)}>
                          {showPass ? (
                            <PiEyeLight size={20} />
                          ) : (
                            <PiEyeSlash size={20} />
                          )}
                        </i>
                      </div>
                    </Stack>
                    {errors.password || touched.password ? (
                      <Typography variant="body2" color="error">
                        {errors.password}
                      </Typography>
                    ) : null}
                  </Grid>
                  <Grid item xs={12} md={5.8}>
                    <Stack>
                      <label
                        style={{
                          fontSize: "14px",
                          color: "#0B7974",
                        }}
                      >
                        Confirm Password
                      </label>
                    </Stack>
                    <Stack
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        border: "1px solid #BDBDBD",
                        backgroundColor: "#FEFEFE",
                        width: "100%",
                        height: "55px",
                        borderRadius: "10px",
                      }}
                    >
                      <input
                        style={{
                          fontSize: "14px",
                          color: "#0B7974",
                          width: "100%",
                          padding: "0 10px",
                          outline: "none",
                          border: "none",
                        }}
                        placeholder="Confirm your password"
                        id="standard-password-input"
                        label="Password"
                        type={showConfirmPass ? "text" : "password"}
                        name="confirmPassword"
                        value={values.confirmPassword}
                        onChange={handleChange}
                      />
                      <div
                        style={{
                          padding: "10 10px",
                          cursor: "pointer",
                          marginRight: "10px",
                        }}
                      >
                        <i onClick={() => setshowConfirmPass(!showConfirmPass)}>
                          {showConfirmPass ? (
                            <PiEyeLight size={20} />
                          ) : (
                            <PiEyeSlash size={20} />
                          )}
                        </i>
                      </div>
                    </Stack>
                    {errors.confirmPassword || touched.confirmPassword ? (
                      <Typography
                        variant="body2"
                        color="error"
                        sx={{ marginLeft: "30px" }}
                      >
                        {errors.confirmPassword}
                      </Typography>
                    ) : null}
                  </Grid>
                <Grid item xs={12} sx={{marginTop:'16px'}}>
                  <Stack>
                    <TextFieldComp
                      type="date"
                      label="Date Of Birth"
                      placeholder="Enter your DOB"
                      width="100%"
                      name="dateOfBirth"
                      max={format(new Date(), "yyyy-MM-dd")}
                      onChange={(e) => {
                        const formattedDate = format(
                          new Date(e.target.value),
                          "yyyy-MM-dd"
                        );
                        setFieldValue("dateOfBirth", formattedDate);
                      }}
                    />
                    {errors.dateOfBirth || touched.dateOfBirth ? (
                      <Typography variant="body2" color="error">
                        {errors.dateOfBirth}
                      </Typography>
                    ) : null}
                  </Stack>
                </Grid>
                <Grid item xs={12} sx={{marginTop:'25px'}}>
                  <button
                    style={{
                      width: "100%",
                      height: "42px",
                      background: "#0B7974",
                      border: "none",
                      borderRadius: "10px",
                      color: "white",
                    }}
                    type="submit"
                  >
                    {isSignupLoading ? (
                      <CircularProgress style={{ color: "#fff" }} />
                    ) : (
                      "     SIGN UP"
                    )}
                  </button>
                </Grid>
                <Grid item xs={12} sx={{marginTop:'16px'}}>
                  <Stack
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "center",
                      paddingBottom: "60px",
                    }}
                  >
                    <Typography
                      sx={{
                        color: "#0B7974",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                    >
                      Already have an account?
                    </Typography>
                    <Typography
                      sx={{
                        color: "#FF5833",
                        textDecoration: "underline",
                        cursor: "pointer",
                        fontWeight: "500",
                        fontSize: "12px",
                      }}
                      onClick={() => navigate("/")}
                    >
                      Sign In
                    </Typography>
                  </Stack>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Signup;