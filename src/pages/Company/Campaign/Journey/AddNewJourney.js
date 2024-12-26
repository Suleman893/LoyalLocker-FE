import React, { useState } from "react";
import Header from "../../../../components/Layout/Header";
import {
  Stack,
  Grid,
  Box,
  Typography,
  InputLabel,
  TextField,
  Button as MuiButton,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import "../style.css";
import "../CampaignListing.css";
import SideBar3 from "../../../../components/Layout/SideBar3";
import addAction from "../../../../assets/Company images/template-add-action.png";
import timerImage from "../../../../assets/Company images/timer-image.png";
import emailImage from "../../../../assets/Company images/email-image.png";
import bottomVector from "../../../../assets/Company images/bottom-vector.png";
import JourneyModal from "./JourneyModal";
import AllSegmentModal from "../modals/AllSegmentModal";
import { useFormik } from "formik";
import { addJourney } from "../../../../redux/company/companyThunks";
import { addJourneySchema } from "../../../../schema/campaignSchema";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddNewJourney = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpens, setModalOpen] = useState(false);
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        segments: [],
        segmentId: null,
        journeySteps: [],
      },
      validationSchema: addJourneySchema,
      onSubmit: async (values) => {
        dispatch(addJourney({ journey: values, navigate }));
      },
      validateOnChange: false,
      validateOnBlur: true,
    });
    
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const formatSendTime = (timeInMilliseconds) => {
    const hours = Math.floor(timeInMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeInMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((timeInMilliseconds % (1000 * 60)) / 1000);
    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  const handleSegmentRemove = (segment) => {
    handleChange({
      target: {
        name: "segments",
        value: [],
      },
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
        <SideBar3 />
        <Stack
       className="company-main-height"
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack className="company-dashboard-main-div">
            <div
              className="ptl-main-div"
              style={{ height: "auto" }}
            >
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
                    Add Journey
                  </Typography>
                </Stack>
              </Stack>
              <Grid
                gap={2}
                container
                sx={{ marginTop: "30px", alignItems: "center" }}
              >
                <Grid item lg={5.9} md={12}>
                  <InputLabel
                    htmlFor="username"
                    sx={{
                      color: "#232323",
                      fontSize: "14px",
                      paddingBottom: "5px",
                    }}
                  >
                    Journey name *
                  </InputLabel>
                  <TextField
                    id="username"
                    variant="outlined"
                    placeholder="Enter journey name here"
                    sx={{
                      width: "100%",
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "12px",
                      },
                    }}
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                  {errors.name || touched.name ? (
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {errors.name}
                    </p>
                  ) : null}
                </Grid>
                <Grid item lg={5.9} md={12}>
                  <Box
                    sx={{
                      marginTop: "25px",
                      padding: "0px 10px",
                      height: "52px",
                      border: "1px solid #BDBDBD",
                      borderRadius: "12px",
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Stack sx={{ flexDirection: "row" }}>
                      {values?.segments?.map((value) => (
                        <Box
                          key={value?.id}
                          sx={{
                            border: "1px solid #BDBDBD",
                            borderRadius: "12px",
                            padding: "8px 16px",
                            marginRight: "8px",
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography
                            sx={{
                              marginRight: "8px",
                              fontSize: "12px",
                              color: "#A2A1A7",
                            }}
                          >
                            {value?.name || "Select segment"}
                          </Typography>
                          <IconButton
                            size="small"
                            onClick={() => handleSegmentRemove(value)}
                            sx={{ marginLeft: "auto", padding: 0 }}
                          >
                            <CloseIcon sx={{ width: "14px", height: "14px" }} />
                          </IconButton>
                        </Box>
                      ))}
                      <Typography
                        sx={{
                          marginRight: "8px",
                          fontSize: "12px",
                          color: "#A2A1A7",
                        }}
                      >
                        {!values?.segments?.length ? "Select Segment" : null}
                      </Typography>
                    </Stack>
                    <MuiButton
                      onClick={openModal}
                      style={{
                        width: "56px",
                        height: "40px",
                        padding: "8px 16px",
                        background: "#FF5833",
                        color: "#FFFFFF",
                        fontSize: "20px",
                        borderRadius: "12px",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      +
                    </MuiButton>
                  </Box>
                  {touched.segments || errors.segments ? (
                    <p style={{ fontSize: "12px", color: "red" }}>
                      {" "}
                      {errors.segments}
                    </p>
                  ) : null}
                </Grid>
              </Grid>
              <AllSegmentModal
                open={isModalOpens}
                handleClose={closeModal}
                segments={values?.segments}
                segment={values?.segmentId}
                setFieldValue={setFieldValue}
              />
              <Stack sx={{ marginTop: "30px" }}>
                <InputLabel
                  htmlFor="username"
                  sx={{
                    color: "#232323",
                    fontSize: "14px",
                    paddingBottom: "5px",
                  }}
                >
                  Job Description
                </InputLabel>
                <TextField
                  placeholder="Journey description here...."
                  multiline
                  rows={6}
                  sx={{
                    "& .css-dpjnhs-MuiInputBase-root-MuiOutlinedInput-root ": {
                      borderRadius: "12px",
                    },
                  }}
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                />
                {touched.description || errors.description ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errors.description}
                  </p>
                ) : null}
              </Stack>
              <Stack
                sx={{
                  marginTop: "30px",
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
                    Select Emails and Conditions
                  </Typography>
                </Stack>
              </Stack>
              <Stack sx={{ marginTop: "30px", textAlign: "center" }}>
                <Typography
                  sx={{ fontSize: "18px", fontWeight: 600, color: "#1A1D1F" }}
                >
                  Select Email Template for your Automation
                </Typography>
                <Typography sx={{ fontSize: "16px", color: "#6F767E" }}>
                  You can choose to send a single email or create a series of
                  email to be sent at time delays you define.
                </Typography>
              </Stack>
              <Stack sx={{ flexDirection: "row", justifyContent: "center" }}>
                <Stack
                  gap={2}
                  sx={{
                    marginTop: "30px",
                    width: "177px",
                    height: "80px",
                    background: "#0B79741A",
                    borderRadius: "12px",
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    border: "none",
                  }}
                >
                  <img
                    src={addAction}
                    alt=""
                    width="48px"
                    height="48px"
                    style={{ cursor: "pointer" }}
                    onClick={handleOpenModal}
                  />
                  <Typography
                    sx={{ fontSize: "13px", fontWeight: 600, color: "#33383F" }}
                  >
                    Add Action
                  </Typography>
                  <JourneyModal
                    onOpen={isModalOpen}
                    onClose={handleCloseModal}
                    journeySteps={values?.journeySteps}
                    handleChange={handleChange}
                  />
                </Stack>
              </Stack>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {touched.journeySteps || errors.journeySteps ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errors.journeySteps}
                  </p>
                ) : null}
              </div>
              {/* //Start */}
              {values?.journeySteps?.map((itm, idx) => (
                <Box key={idx}>
                  <Stack
                    sx={{
                      marginTop: "20px",
                      flexDirection: "row",
                      justifyContent: "center",
                    }}
                  >
                    <Stack
                      gap={2}
                      sx={{
                        padding: "16px",
                        background:
                          itm.type === "delay" ? "#0B79741A" : "#FF58331A",
                        borderRadius: "12px",
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={itm.type === "delay" ? timerImage : emailImage}
                        alt=""
                        width="48px"
                        height="48px"
                      />
                      {itm?.actionType === "email" ? (
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#33383F",
                          }}
                        >
                          {itm?.emailTemplateName} Email
                        </Typography>
                      ) : (
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            color: "#33383F",
                          }}
                        >
                          Send email after {formatSendTime(itm.time)}
                        </Typography>
                      )}
                    </Stack>
                  </Stack>
                  {itm.actionType === "email" && (
                    <Box
                      sx={{
                        marginTop: "5px",
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                      }}
                    >
                      <img src={bottomVector} alt="" />
                    </Box>
                  )}
                </Box>
              ))}
              <Stack
                gap={2}
                sx={{
                  marginTop: "20px",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <MuiButton
                  sx={{
                    color: "#0B7974",
                    border: "1px solid #0B7974",
                    borderRadius: "10px",
                    height: "52px",
                    width: "240px",
                    textTransform: "none",
                  }}
                >
                  Cancel
                </MuiButton>
                <MuiButton
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
                  Save
                </MuiButton>
              </Stack>
            </div>
          </Stack>
        </Stack>
      </div>
    </form>
  );
};

export default AddNewJourney;
