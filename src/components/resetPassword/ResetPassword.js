import { Typography, Stack, CircularProgress, Box } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { resetPassword } from "../../redux/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordEmail } from "../../schema/authSchema";
import { useFormik } from "formik";
import lock from "../../assets/lock.png";
import logo from "../../assets/logo.png";
import "./resetPassword.css";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isResetLoading } = useSelector((state) => state.auth);
  const { values, errors, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: resetPasswordEmail,
    onSubmit: async (values) => {
      sessionStorage.setItem("reset_email", JSON.stringify(values?.email));
      dispatch(resetPassword({ email: values.email }));
    },
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <form
      style={{
        width: "100%",
        height: "100%",
        background: "rgb(247, 249, 252)",
        position: "fixed",
      }}
      onClick={handleSubmit}
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
          <p className="rest-password-text">
            Reset Password
          </p>
          <p style={{ fontSize: "14px" }}>
            Enter your email address to receive a reset link
          </p>
        </div>
        <div className="reset-password-inner-box">
          <input
            placeholder="Email"
            style={{
              fontSize: "14px",
              color: "#0B7974",
              width: "97%",
              height: "52px",
              borderRadius: "10px",
              border: "1px solid #BDBDBD",
              marginTop: "20px",
              paddingLeft: "10px",
              backgroundColor: "white",
            }}
            label="Email"
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
          />
          {errors.email ? (
            <Typography variant="body2" color="error">
              {errors.email}
            </Typography>
          ) : null}

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
            type="submit"
          >
            {isResetLoading ? (
              <CircularProgress style={{ color: "#fff" }} />
            ) : (
              "Reset Password"
            )}
          </button>

          <Stack
            sx={{
              paddingTop: "20px",
              display: "flex",
              flexDirection: "row",
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
        {/* <button
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
          type="submit"
        >
          {isResetLoading ? (
            <CircularProgress style={{ color: "#fff" }} />
          ) : (
            "Reset"
          )}
        </button> */}
      </div>
    </form>
  );
};

export default ResetPassword;
