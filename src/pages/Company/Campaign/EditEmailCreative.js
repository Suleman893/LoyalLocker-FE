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
import {
  editEmailTemplate,
  getSingleTemplate,
} from "../../../redux/company/companyThunks";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { addTemplateSchema } from "../../../schema/campaignSchema";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditEmailCreative = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { singleEmailTemplate, isEditEmailLoading, isLoading } = useSelector(
    (state) => state.company
  );

  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(getSingleTemplate({ id }));
  }, []);

  useEffect(() => {
    if (singleEmailTemplate) {
      setValues({
        templateName: singleEmailTemplate?.name || "",
        templateDescription: singleEmailTemplate?.description || "",
      });
    }
  }, [singleEmailTemplate]);

  const {
    values,
    errors,
    touched,
    setValues,
    handleChange,
    handleSubmit,
    resetForm,
  } = useFormik({
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
        dispatch(editEmailTemplate({ templateData, navigate, id }));
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
            callback({
              html: singleEmailTemplate?.html || "<p>No template loaded</p>",
            });
            // setLoading(false);
            // callback({ html: html, css: css });
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
    if (singleEmailTemplate?.html) {
      loadDemoTemplate(initPlugin);
    }
    return () => {
      // Stop the Stripo editor when the component is unmounted
      window?.StripoApi && window.StripoApi.stop();
    };
  }, [singleEmailTemplate?.html]);

  return (
    <form
      style={{ width: "100%", minHeight: "100vh", display: "flex" }}
      onSubmit={handleSubmit}
    >
      <SideBar3 />
      <Stack className="company-main-height">
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="company-dashboard-main-div">
          <div
            className="ptl-main-div"
            style={{ overflow: "scroll", height: "800px" }}
          >
            <div className=" ptl-header-div">
              <div style={{ display: "flex" }}>
                {" "}
                <div className="ptl-title-design"></div>
                <div className="ptl-title">Edit Email Creative</div>
              </div>
            </div>
            {isLoading ? (
              <CircularProgress />
            ) : (
              <>
                <Grid
                  container
                  sx={{
                    gap: "16px",
                    "@media (max-width: 1328px)": {
                      gap: "10px",
                    },
                  }}
                >
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
                    {errors.templateDescription ||
                    touched.templateDescription ? (
                      <p style={{ fontSize: "12px", color: "red" }}>
                        {errors.templateDescription}
                      </p>
                    ) : null}
                  </Grid>
                </Grid>
                <Box
                  sx={{
                    marginTop: "40px",
                    //   height: "400px",
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
                    <div
                      id="stripoSettingsContainer"
                      style={{ width: "50%" }}
                    />
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
                      {isEditEmailLoading ? (
                        <CircularProgress style={{ color: "#0B7974" }} />
                      ) : (
                        "Edit"
                      )}
                    </Button>
                  </Stack>
                )}
              </>
            )}
          </div>
        </Stack>
      </Stack>
    </form>
  );
};

export default EditEmailCreative;
