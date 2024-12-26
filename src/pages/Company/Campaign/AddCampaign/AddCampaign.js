import React, { useState, useEffect } from "react";
import Header from "../../../../components/Layout/Header";
import {
  Stepper,
  Step,
  StepLabel,
  Stack,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import "../style.css";
import "../CampaignListing.css";
import { Link, useNavigate } from "react-router-dom";
import SideBar3 from "../../../../components/Layout/SideBar3";
import CampaignName from "./CampaignName";
import SelectEmailCreative from "./SelectEmailCreative";
import SelectSegment from "./SelectSegment";
import EmailDeployment from "./EmailDeployment";
import { useFormik } from "formik";
import { createCampaign } from "../../../../redux/company/companyThunks";
import { toast } from "react-toastify";
import { addCampaignSchema } from "../../../../schema/campaignSchema";
import { getMailChimpAccountStatus } from "../../../../redux/company/companyThunks";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";

const steps = ["Step 1", "Step 2", "Step 3", "Step 4"];

const AddCampaign = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { accountInfo, isLoading } = useSelector((state) => state.company);

  const [collapsed, setCollapsed] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [sendNow, setSendNow] = useState("now");

  useEffect(() => {
    dispatch(getMailChimpAccountStatus());
  }, []);

  const {
    values,
    errors,
    touched,
    handleChange,
    handleSubmit,
    validateForm,
    setFieldValue,
  } = useFormik({
    initialValues: {
      emailTemplateId: null,
      segmentId: null,
      mailChimpSegmentId: null,
      campaignName: "",
      scheduleTime: null,
      channel: "email",
      emailSubject: "",
      senderEmail: "",
      senderName: "",
      allDone: false,
    },
    validationSchema: addCampaignSchema,
    onSubmit: async (values) => {
      if (!values.allDone) {
        return;
      }
      if (!values?.emailTemplateId) {
        return;
      }
      if (!values?.segmentId || !values?.mailChimpSegmentId) {
        return;
      }
      if (sendNow === "later" && values?.scheduleTime === null) {
        return toast.error("Select valid date", { theme: "colored" });
      }
      if (values?.scheduleTime) {
        const scheduleTime = dayjs(values.scheduleTime);
        if (scheduleTime.minute() % 15 !== 0) {
          toast.error(
            "Mailchimp campaign scheduling requires 15-minute intervals, e.g. 13:15, 13:30, etc.",
            { theme: "colored" }
          );
          return;
        }
      }
      dispatch(createCampaign({ navigate, campaignInfo: values }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleNext = () => {
    validateForm().then((errors) => {
      if (activeStep === 0) {
        if (
          !errors.campaignName &&
          !errors.emailSubject &&
          !errors.senderEmail &&
          !errors.senderName
        ) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        }
      }
      if (activeStep === 1) {
        if (!errors.emailTemplateId) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          toast.info("Please select email template", { theme: "colored" });
        }
      }
      if (activeStep === 2) {
        if (!errors.mailChimpSegmentId && !errors.segmentId) {
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        } else {
          toast.info("Please select segment", { theme: "colored" });
        }
      }
    });
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CampaignName
            campaignName={values.campaignName}
            handleChange={handleChange}
            emailSubject={values.emailSubject}
            senderEmail={values.senderEmail}
            senderName={values.senderName}
            errors={errors}
            touched={touched}
          />
        );
      case 1:
        return (
          <SelectEmailCreative
            setFieldValue={setFieldValue}
            validateForm={validateForm}
          />
        );
      case 2:
        return (
          <SelectSegment
            validateForm={validateForm}
            setFieldValue={setFieldValue}
          />
        );
      case 3:
        return (
          <EmailDeployment
            setFieldValue={setFieldValue}
            accountInfo={accountInfo}
            value={values}
            sendNow={sendNow}
            setSendNow={setSendNow}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar3 />
      <Stack
      className="company-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="company-dashboard-main-div">
          <div className="ptl-main-div">
            <Stack
              sx={{
                marginTop: "20px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Stack gap={2} style={{ display: "flex", flexDirection: "row" }}>
                {" "}
                <div
                  className="ptl-title-design"
                  style={{ marginTop: "0px", marginLeft: "0px" }}
                ></div>
                <Typography
                  sx={{ fontSize: "20px", fontWeight: 600, color: "#1A1D1F" }}
                >
                  Add Campaign
                </Typography>
              </Stack>
              {(activeStep === 1 || activeStep === 2) && (
                <Link to="/add_email">
                  <Button
                    sx={{
                      padding: "8px 16px",
                      height: "40px",
                      background: "#FF5833",
                      color: "#FFFFFF",
                      borderRadius: "12px",
                      textTransform: "none",
                    }}
                  >
                    Create an Email Creative
                  </Button>
                </Link>
              )}
            </Stack>

            <Stack
              sx={{
                marginTop: "10px",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Stepper
                activeStep={activeStep}
                alternativeLabel
                sx={{
                  width: "400px",
                  "& .MuiStepLabel-root .Mui-active": {
                    color: "#0B7974",
                  },
                  "& .MuiStepLabel-root .Mui-completed": {
                    color: "#0B7974",
                  },
                }}
              >
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Stack>
            <form onSubmit={handleSubmit}>
              {getStepContent(activeStep)}
              <Stack
                gap={2}
                sx={{
                  marginTop: "20px",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                {activeStep == 0 && (
                  <Button
                    sx={{
                      color: "#0B7974",
                      border: "1px solid #0B7974",
                      borderRadius: "10px",
                      height: "52px",
                      width: "240px",
                      textTransform: "none",
                    }}
                    onClick={() => navigate("/campaigns")}
                  >
                    Cancel
                  </Button>
                )}
                {activeStep !== 0 && (
                  <Button
                    onClick={handleBack}
                    sx={{
                      color: "#0B7974",
                      border: "1px solid #0B7974",
                      borderRadius: "10px",
                      height: "52px",
                      width: "240px",
                      textTransform: "none",
                    }}
                  >
                    Previous
                  </Button>
                )}
                {activeStep === steps.length - 1 ? (
                  <Button
                    type="submit"
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
                    onClick={() => setFieldValue("allDone", true)}
                  >
                    {isLoading ? (
                      <CircularProgress style={{ color: "#fff" }} />
                    ) : (
                      "Publish"
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
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
                    type="button"
                  >
                    Next
                  </Button>
                )}
              </Stack>
            </form>
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default AddCampaign;
