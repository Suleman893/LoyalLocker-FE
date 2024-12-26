import { Typography, Stack } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import lock from "../../assets/lock.png";
import "./resetPassword.css";

const ResetPassSuccess = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "rgb(246, 245, 250)",
        position: "fixed",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <img
          src={logo}
          style={{
            width: "150px",
            height: "59px",
            marginLeft: "100px",
            marginTop: "40px",
          }}
          alt="logo"
        />
      </div>
      <div className="reset-password-card">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={lock} alt="lock" />
          <p className="rest-password-text">Reset Password Success</p>
          <p style={{ fontSize: "14px" }}>
            Please check your email for instructions to reset your password
          </p>
        </div>

        <div className="reset-password-inner-box">
          <button
            style={{
              width: "100%",
              height: "56px",
              color: "white",
              background: "#0B7974",
              borderRadius: "10px",
              border: "none",
              marginTop: "50px",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            Back to log in page
          </button>
          <Stack
            sx={{
              paddingTop: "20px",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <Typography sx={{ color: "#0B7974", fontWeight: "500" }}>
              Don’t receive an email?
            </Typography>
            <Typography
              sx={{
                color: "#FF5833",
                textDecoration: "underline",
                cursor: "pointer",
                paddingLeft: "5px",
                fontWeight: "500",
              }}
              // onClick={() => navigate("/signup")}
            >
              Resend
            </Typography>
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default ResetPassSuccess;
