import React, { useState, useEffect } from "react";
import Header from "../../../components/Layout/Header";
import {
  Stack,
  Box,
  Grid,
  InputLabel,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import "./style.css";
import SideBar3 from "../../../components/Layout/SideBar3";
import { useDispatch, useSelector } from "react-redux";
import { createEmailTemplate } from "../../../redux/company/companyThunks";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { addTemplateSchema } from "../../../schema/campaignSchema";
import { toast } from "react-toastify";

const AddEmailCreative = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(true);
  const { isCreateEmailLoading } = useSelector((state) => state.company);
  const { values, errors, touched, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        templateName: "",
        templateDescription: "",
      },
      validationSchema: addTemplateSchema,
      onSubmit: async (values) => {
        // This function will be useful for previewing in the browser or sending the ready email template through the email service. This method returns compiled and compressed HTML code.
        window.StripoApi.compileEmail((error, html, ampHtml, ampErrors) => {
          // Use the callback to set the state after receiving the compiled HTML
          const templateData = {
            name: values?.templateName,
            description: values?.templateDescription,
            html: html,
          };
          dispatch(createEmailTemplate({ templateData, navigate }));
        });
      },
      validateOnChange: false,
      validateOnBlur: true,
    });

  //Load demo template brings Stripo based templates from stripo server
  function loadDemoTemplate(callback) {
    request(
      "GET",
      "https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/Basic-Templates/Trigger%20newsletter%20mockup/Trigger%20newsletter%20mockup.html",
      null,
      function (html) {
        request(
          "GET",
          "https://raw.githubusercontent.com/ardas/stripo-plugin/master/Public-Templates/Basic-Templates/Trigger%20newsletter%20mockup/Trigger%20newsletter%20mockup.css",
          null,
          function (css) {
            callback({ html: html, css: css });
          }
        );
      }
    );
  }

  function request(method, url, data, callback) {
    var req = new XMLHttpRequest();
    req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        callback(req.responseText);
      } else if (req.readyState === 4 && req.status !== 200) {
        toast.error("Invalid PLUGIN ID OR SECRET KEY", { theme: "colored" });
      }
    };
    req.open(method, url, true);
    if (method !== "GET") {
      req.setRequestHeader("content-type", "application/json");
    }
    req.send(data);
  }

  useEffect(() => {
    function initPlugin(template) {
      const apiRequestData = {
        emailId: 1,
      };
      const script = document.createElement("script");
      script.id = "stripoScript";
      script.type = "text/javascript";
      script.src = "https://plugins.stripo.email/static/latest/stripo.js";
      script.onload = function () {
        window.Stripo.init({
          settingsId: "stripoSettingsContainer",
          previewId: "stripoPreviewContainer",
          html: template?.html,
          css: template?.css,
          // codeEditorButtonId: "codeEditor",
          // undoButtonId: "undoButton",
          // redoButtonId: "redoButton",
          apiRequestData: apiRequestData,
          userFullName: "Loyal Locker",
          versionHistory: {
            changeHistoryLinkId: "changeHistoryLink",
            onInitialized: function (lastChangeIndoText) {
              document.getElementById("changeHistoryContainer").style.display =
                "block";
            },
          },
          getAuthToken: function (callback) {
            request(
              "POST",
              "https://plugins.stripo.email/api/v1/auth",
              JSON.stringify({
                pluginId: process.env.REACT_APP_STRIPO_PLUGIN_ID,
                secretKey: process.env.REACT_APP_STRIPO_SECRET_KEY,
              }),
              function (data) {
                callback(JSON.parse(data).token);
              }
            );
          },
          onTemplateLoaded: function () {
            setLoading(false);
          },
        });
      };
      document?.body?.appendChild(script);
    }
    loadDemoTemplate(initPlugin);
    return () => {
      // Stop the Stripo editor when the component is unmounted
      window?.StripoApi && window.StripoApi.stop();
    };
  }, []);

  return (
    <form style={{ display: "flex" }} onSubmit={handleSubmit}>
      <SideBar3 />
      <Stack
        sx={{
          width: "100%",
          padding: "0px",
           height: "100vh",
          background: "#FAFAFA",
        }}
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack sx={{ padding: "0px 30px",overflowY:"scroll" }}>
          <div
            className="ptl-main-div"
            // style={{ height: "800px" }}
          >
            <div className=" ptl-header-div">
              <div style={{ display: "flex" }}>
                {" "}
                <div className="ptl-title-design"></div>
                <div className="ptl-title">Add Email Creative</div>
              </div>
            </div>
             <Grid container gap={1}>
              <Grid item md={5.9}>
                <InputLabel
                  htmlFor="username"
                  sx={{ color: "#232323", fontSize: "14px" }}
                >
                  Name *
                </InputLabel>
                <TextField
                  id="username"
                  variant="outlined"
                  placeholder="Add template name"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                  name="templateName"
                  value={values?.templateName}
                  onChange={handleChange}
                />
                {errors.templateName || touched.templateName ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errors.templateName}
                  </p>
                ) : null}
              </Grid>

              <Grid item md={5.9}>
                <InputLabel
                  htmlFor="username"
                  sx={{ color: "#232323", fontSize: "14px" }}
                >
                  Description *
                </InputLabel>
                <TextField
                  id="description"
                  variant="outlined"
                  placeholder="Add template description"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                  name="templateDescription"
                  value={values?.templateDescription}
                  onChange={handleChange}
                />
                {errors.templateDescription || touched.templateDescription ? (
                  <p style={{ fontSize: "12px", color: "red" }}>
                    {errors.templateDescription}
                  </p>
                ) : null}
              </Grid>
            </Grid> 
            <Box
              sx={{
                marginTop: "40px",
                background: "#FAFAFA",
                width: "100%",
              }}
            >
              {/* <div id="externalSystemContainer"> */}
              {/* <button id="undoButton" className="control-button">
                    Undo
                  </button>
                  <button id="redoButton" className="control-button">
                    Redo
                  </button>
                  <button id="codeEditor" className="control-button">
                    Code editor
                  </button> */}
              {/* <span id="changeHistoryContainer" style={{ display: "none" }}>
                    Last change: <a id="changeHistoryLink"></a>
                  </span> */}
              {/* </div> */}
              <div style={{ display: loading ? "block" : "none" }}>
                <CircularProgress />
              </div>
              <div
                style={{
                  display: "flex",
                  gridGap: "10px",
                  width: "100%",
                
                }}
              >
                <div id="stripoSettingsContainer" style={{ width: "50%" }} />
                <div id="stripoPreviewContainer" style={{ width: "50%" }} />
              </div>
            </Box>
            {!loading && (
              <Stack
                gap={2}
                sx={{
                  flexDirection: "row",
                  justifyContent: "flex-end",
                  margin: "20px",
                }}
              >
                <Button
                  sx={{
                    color: "#0B7974",
                    border: "1px solid #0B7974",
                    borderRadius: "10px",
                    height: "52px",
                    width: "240px",
                    marginTop: "15px",
                    textTransform: "none",
                  }}
                  onClick={() => resetForm()}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  sx={{
                    color: "#0B7974",
                    border: "1px solid #0B7974",
                    borderRadius: "10px",
                    height: "52px",
                    width: "240px",
                    marginTop: "15px",
                    textTransform: "none",
                  }}
                >
                  {isCreateEmailLoading ? (
                    <CircularProgress style={{ color: "#0B7974" }} />
                  ) : (
                    "Save"
                  )}
                </Button>
              </Stack>
            )}
          </div>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddEmailCreative;
