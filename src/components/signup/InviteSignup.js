import React, { useState } from "react";
import "./signup.css";
import {
  Stack,
  Grid,
  Box,
  Typography,
  Button,
  FormControlLabel,
} from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import { toast } from "react-toastify";
import axios from "axios";

const InviteSignup = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    mobileNo: "",
    country: "US",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    upload: "",
  });

  const handleChange = (target) => {
    const { name, value } = target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const apiUrl = "http://localhost:5001/api/v2/admin/invite-merchant";
    if (userInfo.password !== userInfo.confirmPassword) {
      return toast.error("Passwords don't match", { theme: "colored" });
    }
    try {
      const res = await axios.post(apiUrl, userInfo, {
        withCredentials: true,
      });
      if (res.status === 200 || res.status === 201) {
        return toast.success("Check email to activate account", {
          theme: "colored",
        });
      }
    } catch (err) {
      toast.error("Error while registering", { theme: "colored" });
    }
  };

  return (
    <div>
      <Box sx={{ display: "flex" }}>
        <Grid item xs={6}>
          <img
            src="./images/login-side.png"
            style={{
              width: "950px",
              height: "100vh",
            }}
            alt="login-side"
          />
        </Grid>
        <Grid item xs={6}>
          <img
            src="./images/logo.png"
            style={{
              width: "186px",
              height: "69px",
              marginLeft: "400px",
              marginTop: "100px",
            }}
            alt="logo"
          />
          <div style={{ marginLeft: "200px" }}>
            <p
              style={{
                paddingLeft: "160px",
                paddingTop: "20px",
                fontWeight: "500",
                color: "#0B7974",
                fontSize: "23px",
                display: "flex",
              }}
            >
              Welcome to{" "}
              <Typography
                sx={{
                  color: "#FF5833",
                  fontWeight: "500",
                  fontSize: "23px",
                  paddingLeft: "10px",
                }}
              >
                Loyal
              </Typography>
              <Typography
                sx={{ color: "#0B7974", fontWeight: "500", fontSize: "23px" }}
              >
                Locker
              </Typography>
            </p>
          </div>
          <button
            style={{
              width: "166px",
              height: "40px",
              borderRadius: "10px",
              border: "none",
              color: "white",
              background: "#FF5833",
              marginLeft: "400px",
              marginBottom: "20px",
              paddingLeft: "10px",
            }}
          >
            Provide your detail
          </button>
          <div style={{ marginLeft: "200px" }}>
            <div style={{ display: "flex" }}>
              <Stack sx={{ marginLeft: "30px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    color: "#0B7974",
                    fontWeight: "500",
                  }}
                >
                  First Name
                </label>
                <input
                  placeholder="Enter First Name"
                  style={{
                    fontSize: "12px",
                    color: "#0B7974",
                    width: "240px",
                    height: "45px",
                    borderRadius: "10px",
                    border: "1px solid #BDBDBD",
                    paddingLeft: "10px",
                    paddingLeft: "10px",
                  }}
                  type="text"
                  name="firstName"
                  value={userInfo.firstName}
                  onChange={({ target }) => handleChange(target)}
                />
              </Stack>
              <Stack sx={{ marginLeft: "30px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    color: "#0B7974",
                    fontWeight: "500",
                  }}
                >
                  Last Name
                </label>
                <input
                  placeholder="Enter your last name"
                  style={{
                    fontSize: "14px",
                    color: "#0B7974",
                    width: "240px",
                    height: "45px",
                    borderRadius: "10px",
                    border: "1px solid #BDBDBD",
                    paddingLeft: "10px",
                  }}
                  type="text"
                  name="lastName"
                  value={userInfo.lastName}
                  onChange={({ target }) => handleChange(target)}
                />
              </Stack>
            </div>
            <Stack sx={{ marginLeft: "30px", marginTop: "10px" }}>
              <label
                style={{
                  fontSize: "14px",
                  color: "#0B7974",
                  fontWeight: "500",
                }}
              >
                Email
              </label>
              <input
                placeholder="Enter your email"
                style={{
                  fontSize: "14px",
                  color: "#0B7974",
                  width: "520px",
                  height: "45px",
                  borderRadius: "10px",
                  border: "1px solid #BDBDBD",
                  paddingLeft: "10px",
                }}
                name="email"
                value={userInfo.email}
                onChange={({ target }) => handleChange(target)}
              />
            </Stack>

            <div sx={{ display: "flex" }}>
              <RadioGroup
                sx={{
                  marginTop: "20px",
                  color: "#0B7974",
                  fontWeight: "700",
                }}
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                <p style={{ paddingLeft: "30px", paddingRight: "30px" }}>
                  Gender
                </p>
                <FormControlLabel
                  value="female"
                  control={
                    <Radio
                      sx={{
                        color: "#0B7974",
                        "&.Mui-checked": {
                          color: "#0B7974",
                        },
                      }}
                    />
                  }
                  label="Female"
                />
                <FormControlLabel
                  value="male"
                  control={
                    <Radio
                      sx={{
                        color: "#0B7974",
                        "&.Mui-checked": {
                          color: "#0B7974",
                        },
                      }}
                    />
                  }
                  label="Male"
                />
                <FormControlLabel
                  value="other"
                  control={
                    <Radio
                      sx={{
                        color: "#0B7974",
                        "&.Mui-checked": {
                          color: "#0B7974",
                        },
                      }}
                    />
                  }
                  label="Other"
                />
              </RadioGroup>
              <div style={{ display: "flex" }}>
                <Stack sx={{ marginLeft: "30px", marginTop: "10px" }}>
                  <label
                    style={{
                      fontSize: "14px",
                      color: "#0B7974",
                      fontWeight: "500",
                    }}
                  >
                    Mobile Number
                  </label>
                  <input
                    placeholder="Enter your mobile number"
                    style={{
                      fontSize: "14px",
                      color: "#0B7974",
                      width: "240px",
                      height: "45px",
                      borderRadius: "10px",
                      border: "1px solid #BDBDBD",
                      paddingLeft: "10px",
                    }}
                    type="text"
                    name="mobileNo"
                    value={userInfo.mobileNo}
                    onChange={({ target }) => handleChange(target)}
                  />
                </Stack>
                <Stack sx={{ marginLeft: "30px", marginTop: "10px" }}>
                  <label
                    style={{
                      fontSize: "14px",
                      color: "#0B7974",
                      fontWeight: "500",
                    }}
                  >
                    Country
                  </label>
                  <input
                    placeholder="Enter your country"
                    style={{
                      fontSize: "14px",
                      color: "#0B7974",
                      width: "240px",
                      height: "45px",
                      borderRadius: "10px",
                      border: "1px solid #BDBDBD",
                      paddingLeft: "10px",
                    }}
                    type="text"
                    name="country"
                    value={userInfo.country}
                    onChange={({ target }) => handleChange(target)}
                  />
                </Stack>
              </div>
              <div style={{ display: "flex", marginTop: "10px" }}>
                <Stack sx={{ marginLeft: "30px" }}>
                  <label
                    style={{
                      fontSize: "14px",
                      color: "#0B7974",
                      fontWeight: "500",
                    }}
                  >
                    Password
                  </label>
                  <input
                    placeholder="Enter your password"
                    style={{
                      fontSize: "14px",
                      color: "#0B7974",
                      width: "240px",
                      height: "45px",
                      borderRadius: "10px",
                      border: "1px solid #BDBDBD",
                      paddingLeft: "10px",
                    }}
                    type="password"
                    name="password"
                    value={userInfo.password}
                    onChange={({ target }) => handleChange(target)}
                  />
                </Stack>
                <Stack sx={{ marginLeft: "30px", marginTop: "10px" }}>
                  <label
                    style={{
                      fontSize: "14px",
                      color: "#0B7974",
                      fontWeight: "500",
                    }}
                  >
                    Confirm Password
                  </label>
                  <input
                    placeholder="Enter confirm password"
                    style={{
                      fontSize: "14px",
                      color: "#0B7974",
                      width: "240px",
                      height: "45px",
                      borderRadius: "10px",
                      border: "1px solid #BDBDBD",
                      paddingLeft: "10px",
                    }}
                    type="password"
                    name="confirmPassword"
                    value={userInfo.confirmPassword}
                    onChange={({ target }) => handleChange(target)}
                  />
                </Stack>
              </div>

              <Stack sx={{ marginLeft: "30px", marginTop: "10px" }}>
                <label
                  style={{
                    fontSize: "14px",
                    color: "#0B7974",
                    fontWeight: "500",
                  }}
                >
                  Date of Birth
                </label>
                <input
                  placeholder="Enter DOB"
                  style={{
                    fontSize: "14px",
                    color: "#0B7974",
                    width: "515px",
                    height: "45px",
                    borderRadius: "10px",
                    border: "1px solid #BDBDBD",
                    paddingLeft: "10px",
                  }}
                  label="Username"
                  type="number"
                  name="dateOfBirth"
                  value={userInfo.dateOfBirth}
                  onChange={({ target }) => handleChange(target)}
                />
              </Stack>

              <button
                onClick={handleSubmit}
                style={{
                  width: "530px",
                  height: "42px",
                  background: "#0B7974",
                  border: "none",
                  borderRadius: "10px",
                  marginLeft: "30px",
                  color: "white",
                  marginTop: "20px",
                }}
              >
                SignUp
              </button>
            </div>
          </div>
        </Grid>
      </Box>
    </div>
  );
};

export default InviteSignup;
