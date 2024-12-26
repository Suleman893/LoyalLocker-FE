import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useNavigate } from "react-router-dom";
import {
  Stack,
  Grid,
  Box,
  Typography,
  CircularProgress,
  Divider,
} from "@mui/material";
import "./login.css";
import { userLogin } from "../../redux/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { loginSchema } from "../../schema/authSchema";
import FormikCustomButton from "../Buttons/FormikCustomButton";
import login from "../../assets/login2.png";
// import login from "../../assets/login.png";

import logo from "../../assets/logo.png";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoginLoading } = useSelector((state) => state.auth);

  const [role, setRole] = useState(null);
  const [showPass, setShowPass] = useState(false);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: loginSchema,
    onSubmit: async (values) => {
      if (!role) {
        toast.error("Please select role", { theme: "colored" });
        return;
      }
      dispatch(userLogin({ navigate, userInfo: values, role: role }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <form onSubmit={handleSubmit}>
      <Box sx={{ display: "flex" }}>
        <Grid container className="login-main-container-1">
          <Grid item md={6} className="login-left-side-main-container">
            <div className="login-left-side-1">
              <div className="login-left-side-container1">
                <div className="login-left-text-11">
                Effortlessly manage your loyalty rewards with our innovative Web3 platform. Access personalized offers, real-time rewards, and a host of exclusive benefits, all designed to maximize your rewards experience.
                </div>
                {/* <p className="login-lect-text-11">
                  Streamline your program, analyze engagement, and drive
                  customer satisfaction to new heights.
                </p> */}
              </div>
              <img src={login} className="login-img-1" alt="" />
            </div>
          </Grid>
          <Grid item md={6} className="login-right-side-1">
            <Box className="login-right-side-1-form">
              <Stack className="login-logo-container">
                <img className="login-logo-1" src={logo} alt="" />
                {/* <Typography className="login-text-1">Login</Typography> */}
              </Stack>
              {/* <div className="divider">
                <Divider>
                  <Typography sx={{ color: "grey" }}>Select Role</Typography>
                </Divider>
              </div> */}
              <div className="select-rol-container">
                <RadioGroup
                  sx={{
                    marginTop: "40px",
                    color: "#0B7974",
                    fontWeight: "700",
                  }}
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                >
                  {/* <p style={{ paddingLeft: "30px", paddingRight: "30px" }}>Gender</p> */}
                  <FormControlLabel
                    value="F"
                    control={
                      <Radio
                        sx={{
                          color: "#0B7974",
                          "&.Mui-checked": {
                            color: "#0B7974",
                          },
                        }}
                        onChange={(e) => setRole(3)}
                      />
                    }
                    label="Loyal Member"
                  />
                  <FormControlLabel
                    value="M"
                    control={
                      <Radio
                        sx={{
                          color: "#0B7974",
                          "&.Mui-checked": {
                            color: "#0B7974",
                          },
                        }}
                        onChange={(e) => setRole(2)}
                      />
                    }
                    label="Company"
                  />
                </RadioGroup>
              </div>
              {/* <a href="http://localhost:5001/api/v2/auth/facebook">Facebook</a>
              <a href="http://localhost:5001/api/v2/auth/google">Google</a> */}
              <div>
                <Stack spacing={2} sx={{ width: "100%" }}>
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
                      height: "52px",
                      borderRadius: "10px",
                      border: "1px solid #BDBDBD",
                      paddingLeft: "10px",
                      backgroundColor: "white",
                    }}
                    label="email"
                    name="username"
                    value={values.username}
                    onChange={handleChange}
                  />
                  {touched.username || errors.username ? (
                    <Typography variant="body2" color="error">
                      {errors.username}
                    </Typography>
                  ) : null}
                  <Stack spacing={2} sx={{ width: "100%" }}>
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
                        width: "100%",
                        height: "50px",
                        borderRadius: "10px",
                        marginTop: "10px",
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
                        type={showPass ? "text" : "password"}
                        name="password"
                        label="password"
                        onChange={handleChange}
                        value={values.password}
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
                            <PiEyeLight size={20} />
                          ) : (
                            <PiEyeSlash size={20} />
                          )}
                        </i>
                      </div>
                    </Stack>
                    {touched.password || errors.password ? (
                      <Typography variant="body2" color="error">
                        {errors.password}
                      </Typography>
                    ) : null}
                  </Stack>
                </Stack>

                <Typography
                  paddingTop={1}
                  sx={{
                    cursor: "pointer",
                    fontSize: "14px",
                    fontWeight: "500",
                    color: "#0B7974",
                    textAlign: "end",
                  }}
                  onClick={() => navigate("/reset_password")}
                >
                  Forgot password
                </Typography>
                <Stack
                  sx={{
                    paddingTop: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  {/* <Switcher checked={opend} onChange={opend ? handleClosed : handleOpend}  label="Remember me"/>   */}
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    {/* <Checkbox {...label} /> */}
                    {/* <p
                      style={{
                        fontSize: "14px",
                        fontWeight: "500",
                        color: "#0B7974",
                        // paddingLeft:'180px',

                      }}
                    >
                      Remember me
                    </p> */}
                  </div>
                </Stack>

                <FormikCustomButton
                  text={
                    isLoginLoading ? (
                      <CircularProgress style={{ color: "#fff" }} />
                    ) : (
                      "LOG IN"
                    )
                  }
                  width="100%"
                  type="submit"
                >
                  Click
                </FormikCustomButton>

                <Stack
                  sx={{
                    paddingTop: "20px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                  }}
                >
                  <Typography sx={{ color: "#0B7974", fontWeight: "500" }}>
                    Don’t have an account?
                  </Typography>
                  <Typography
                    sx={{
                      color: "#FF5833",
                      textDecoration: "underline",
                      cursor: "pointer",
                      paddingLeft: "5px",
                      fontWeight: "500",
                    }}
                    onClick={() => navigate("/signup")}
                  >
                    Sign Up
                  </Typography>
                </Stack>
              </div>
              {/* <Stack gap={2} sx={{ paddingTop: '20px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                <AiFillFacebook
                                    style={{
                                        fontSize: '30px',
                                        color: '#3C5D96',
                                    }}
                                />
                                <AiFillGoogleSquare
                                    style={{
                                        fontSize: '30px',
                                        color: '#CF5D46',
                                    }}
                                />
                            </Stack>
                            <Stack sx={{ paddingTop: '80px', display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                                <Typography sx={{ color: '#2222224D' }}>Login as</Typography>
                                <Typography sx={{ color: '#1F074F', opacity: 1, textDecoration: 'underline', cursor: 'pointer', padding: '0px 5px' }}>Admin</Typography>
                                <Typography sx={{ color: '#2222224D', paddingRight: '5px' }}>OR</Typography>
                                <Typography sx={{ color: '#1F074F', textDecoration: 'underline', cursor: 'pointer' }}>Company</Typography>
                            </Stack> */}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
}

export default Login;
