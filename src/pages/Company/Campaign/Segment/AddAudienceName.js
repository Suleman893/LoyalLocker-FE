import React, { useState } from "react";
import Header from "../../../../components/Layout/Header";
import {
  Stack,
  Typography,
  Button,
  InputLabel,
  TextField,
  CircularProgress,
} from "@mui/material";
import "../style.css";
import SideBar3 from "../../../../components/Layout/SideBar3";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createSegment } from "../../../../redux/company/companyThunks";
import { addSegmentSchema } from "../../../../schema/campaignSchema";

const AddAudienceName = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { isCreateSegmentLoading } = useSelector((state) => state.company);
  const { state } = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      segmentName: "",
    },
    validationSchema: addSegmentSchema,
    onSubmit: async (values) => {
      const payload = {
        queryToSend: state?.queryToSend,
        segmentName: values.segmentName,
      };
      dispatch(createSegment({ navigate, payload }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: "flex" }}>
        <SideBar3 />
        <Stack
          sx={{
            width: "100%",
            padding: "0px",
            background: "#FAFAFA",
            height: "100vh",
          }}
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack sx={{ padding: "0px 30px" }}>
            <div className="ptl-main-div">
              <Stack
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  gap={2}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div
                    className="ptl-title-design"
                    style={{ marginTop: "0px", marginLeft: "0px" }}
                  ></div>
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 600, color: "#1A1D1F" }}
                  >
                   
                    Add Audience
                  </Typography>
                </Stack>
              </Stack>

              <Stack sx={{ marginTop: "50px" }}>
                <InputLabel
                  htmlFor="username"
                  sx={{
                    color: "#232323",
                    fontSize: "14px",
                    paddingBottom: "5px",
                  }}
                >
                  Audience Name
                </InputLabel>
                <TextField
                  id="segmentName"
                  variant="outlined"
                  placeholder="Enter Audience name here"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                  type="text"
                  value={values.segmentName}
                  onChange={handleChange}
                />
              </Stack>
              <p style={{ fontSize: "12px", color: "red" }}>
                {errors?.segmentName}
              </p>
              <Stack
                gap={2}
                sx={{
                  marginTop: "10px",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  sx={{
                    color: "#0B7974",
                    border: "1px solid #0B7974",
                    borderRadius: "10px",
                    height: "52px",
                    width: "240px",
                    textTransform: "none",
                  }}
                  onClick={() => resetForm()}
                >
                  Cancel
                </Button>
                <Button
                  sx={{
                    width: "240px",
                    height: "52px",
                    borderRadius: "10px",
                    background: "#0B7974",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      cursor: "pointer",
                      background: "#0B7974",
                    },
                  }}
                  type="submit"
                >
                  {isCreateSegmentLoading ? (
                    <CircularProgress style={{ color: "#fff" }} />
                  ) : (
                    "Save"
                  )}
                </Button>
              </Stack>
            </div>
          </Stack>
        </Stack>
      </div>
    </form>
  );
};

export default AddAudienceName;
