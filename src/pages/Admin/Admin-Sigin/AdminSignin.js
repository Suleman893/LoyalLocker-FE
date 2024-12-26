import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Grid,
  Box,
  Typography,
  CircularProgress,
  FormHelperText,
} from "@mui/material";
import "./login.css";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { adminLogin } from "../../../redux/auth/authThunks";
import { loginSchema } from "../../../schema/authSchema";
import CustomButton from "../../../components/Buttons/CustomButton";
import login from "../../../assets/login2.png";

function AdminSignin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPass, setShowPass] = useState(false);

  const { isLoading } = useSelector((state) => state.auth);

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(adminLogin({ values, navigate }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box sx={{ display: "flex" }}>
        <Grid container className="login-main-container">
          <Grid item xs>
            <div className="login-left-side">
              <div className="login-left-text-2">
                Effortlessly manage and track customer loyalty rewards with our
                intuitive admin dashboard.
              </div>
              {/* <p className="login-lect-text-1">
                Streamline your program, analyze engagement, and drive customer
                satisfaction to new heights.
              </p> */}
              <img src={login} className="login-img" alt="" />
            </div>
          </Grid>
          <Grid>
            <Box className="login-right-side">
              <Stack>
                <img className="login-logo" src="./images/logo.png" alt="" />
                <Typography className="login-text">Admin Login</Typography>
              </Stack>
              <div className="admin-login-inputs">
                <Stack spacing={2}>
                  <label
                    style={{
                      fontSize: "14px",
                      color: "#0B7974",
                      paddingTop: "50px",
                    }}
                  >
                    Email
                  </label>
                  <input
                    placeholder="Enter your email"
                    style={{
                      fontSize: "14px",
                      color: "#0B7974",
                      width: "480px",
                      height: "52px",
                      borderRadius: "10px",
                      border: "1px solid #BDBDBD",
                      paddingLeft: "10px",
                      backgroundColor: "white",
                      outline: "none",
                    }}
                    label="Email"
                    name="username"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />

                  {formik.touched.username || formik.errors.username ? (
                    <FormHelperText style={{}} error>
                      {formik.errors.username}
                    </FormHelperText>
                  ) : null}
                  <div style={{ marginTop: "10px" }}>
                    <label
                      style={{
                        fontSize: "14px",
                        color: "#0B7974",
                      }}
                    >
                      Password
                    </label>
                    <Stack
                      spacing={2}
                      sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        border: "1px solid #BDBDBD",
                        backgroundColor: "#FEFEFE",
                        width: "495px",
                        height: "50px",
                        borderRadius: "10px",
                        marginTop: "10px",
                      }}
                    >
                      <input
                        style={{
                          fontSize: "14px",
                          color: "#0B7974",
                          width: "480px",
                          padding: "0 10px",
                          outline: "none",
                          border: "none",
                        }}
                        placeholder="Enter your password"
                        id="standard-password-input"
                        label="Password"
                        type={showPass ? "text" : "password"}
                        name="password"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                      />

                      <div
                        style={{
                          padding: "0 10px",
                          cursor: "pointer",
                          marginLeft: "20px",
                        }}
                      >
                        <i onClick={() => setShowPass(!showPass)}>
                          {showPass ? (
                            <PiEyeSlash size={20} />
                          ) : (
                            <PiEyeLight size={20} />
                          )}
                        </i>
                      </div>
                    </Stack>
                    {formik.touched.password || formik.errors.password ? (
                      <FormHelperText style={{}} error>
                        {formik.errors.password}
                      </FormHelperText>
                    ) : null}
                  </div>
                </Stack>

                <Stack
                  sx={{
                    paddingTop: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", flexDirection: "row" }}></div>
                </Stack>
                <Stack>
                  <CustomButton
                    text={
                      isLoading ? (
                        <CircularProgress style={{ color: "#fff" }} />
                      ) : (
                        "Get Started"
                      )
                    }
                    width="500px"
                    type="submit"
                  />
                </Stack>
                <Stack
                  sx={{
                    paddingTop: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                ></Stack>
              </div>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default AdminSignin;
