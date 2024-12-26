import { Typography, Stack, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PiEyeLight } from "react-icons/pi";
import { PiEyeSlash } from "react-icons/pi";
import { toast } from "react-toastify";
import { createTheNewPasswords } from "../../redux/auth/authThunks";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordsSchema } from "../../schema/authSchema";
import { useFormik } from "formik";
import logo from "../../assets/logo.png";
import lock from "../../assets/lock.png";
import "./resetPassword.css";

const NewPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isResetLoading } = useSelector((state) => state.auth);
  const [showPass, setShowPass] = useState(false);
  const [showConformPass, setshowConformPass] = useState(false);

  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
    initialValues: {
      newPassword: "",
      newConfirmPassword: "",
    },
    validationSchema: resetPasswordsSchema,
    onSubmit: async (values) => {
      if (values?.newPassword !== values?.newConfirmPassword) {
        return toast.error("Password don't match ", {
          theme: "colored",
        });
      }
      const newPassword = values?.newPassword;
      dispatch(createTheNewPasswords({ token, newPassword, navigate }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <form
      style={{
        width: "100%",
        height: "100%",
        background: "rgb(246, 245, 250)",
        position: "fixed",
      }}
      onSubmit={handleSubmit}
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
          <p className="rest-password-text">Create New Password</p>
        </div>
        <div className="reset-password-inner-box">
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              border: "1px solid #BDBDBD",
              backgroundColor: "#FEFEFE",
              width: "100%",
              height: "50px",
              borderRadius: "10px",
              marginTop: "50px",
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
              placeholder="Enter new password"
              id="standard-password-input"
              label="Password"
              type={showPass ? "text" : "password"}
              name="newPassword"
              value={values?.newPassword}
              onChange={handleChange}
            />
            <div
              style={{
                padding: "0 10px",
                cursor: "pointer",
                marginLeft: "20px",
              }}
            >
              <i onClick={() => setShowPass(!showPass)}>
                {showPass ? <PiEyeLight size={20} /> : <PiEyeSlash size={20} />}
              </i>
            </div>
          </Stack>
          {errors.newPassword || touched.newPassword ? (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginLeft: "30px" }}
            >
              {errors.newPassword}
            </Typography>
          ) : null}
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              border: "1px solid #BDBDBD",
              backgroundColor: "#FEFEFE",
              width: "100%",
              height: "50px",
              borderRadius: "10px",
              marginTop: "20px",
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
              placeholder="Enter confirm password"
              id="standard-password-input"
              label="Password"
              type={showConformPass ? "text" : "password"}
              name="newConfirmPassword"
              value={values?.newConfirmPassword}
              onChange={handleChange}
            />
            <div
              style={{
                padding: "0 10px",
                cursor: "pointer",
                marginLeft: "20px",
              }}
            >
              <i onClick={() => setshowConformPass(!showConformPass)}>
                {showConformPass ? (
                  <PiEyeLight size={20} />
                ) : (
                  <PiEyeSlash size={20} />
                )}
              </i>
            </div>
          </Stack>
          {errors.newConfirmPassword || touched.newConfirmPassword ? (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginLeft: "30px" }}
            >
              {errors.newConfirmPassword}
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
              fontSize: "16px",
              fontWeight: "700",
            }}
            type="submit"
          >
            {isResetLoading ? (
              <CircularProgress style={{ color: "#fff" }} />
            ) : (
              "Update"
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
      </div>
    </form>
  );
};

export default NewPassword;
