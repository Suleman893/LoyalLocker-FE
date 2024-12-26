import React, { useState } from "react";
import "./style.css";
import { CircularProgress, FormHelperText, Stack } from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar";
import Header from "../../../../components/Layout/Header";
import TextFieldComp from "../../../../components/InputFields/TextFieldComp";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createMerchant } from "../../../../redux/admin/adminThunks";
import { useFormik } from "formik";
import { addCompany } from "../../../../schema/companySchema";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const CompanyForm = () => {
  const { isLoading } = useSelector((state) => state.admin);
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currencies = [{ label: "$", value: "$" }];

  const formik = useFormik({
    initialValues: {
      brandName: "",
      apiEnabled: false,
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      currency: "",
      password: "",
      sendEmail: true,
    },
    validationSchema: addCompany,
    onSubmit: async (values) => {
      dispatch(createMerchant({ navigate, values }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  const generateRandomPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const passwordLength = 10;
    let generatedPassword = "";
    for (let i = 0; i < passwordLength; i++) {
      generatedPassword += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    formik.setFieldValue("password", generatedPassword);
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
          <SideBar />
          <Stack
       className="admin-main-height"
          >
            <Header setCollapsed={setCollapsed} collapsed={collapsed} />
            <Stack className="admin-dashboard-main-div">
              <div style={{ display: "flex" }}>
                <div className="cf-title-design"></div>
                <div className="cf-title">Add New Company / Brand</div>
              </div>
              <div style={{ display: "flex" }}>
                <Stack direction="column" className="cf-fields">
                  <TextFieldComp
                    label="Company/Brand"
                    placeholder="Enter Brand and Company Name"
                    width="100%"
                    height="50px"
                    name="brandName"
                    value={formik.values.brandName}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.brandName || formik.errors.brandName ? (
                    <FormHelperText style={{}} error>
                      {formik.errors.brandName}
                    </FormHelperText>
                  ) : null}
                </Stack>
                <Stack className="cf-fields">
                  <label
                    style={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "500",
                      paddingBottom: "10px",
                    }}
                  >
                    API Enabled
                  </label>

                  <FormControl>
                    <Select
                      value={formik.values.apiEnabled}
                      onChange={(event) =>
                        formik.setFieldValue("apiEnabled", event.target.value)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Select api enabled" }}
                      sx={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "55px",
                      }}
                      disabled={true}
                      name="apiEnabled"
                    >
                      <MenuItem value="" disabled>
                        API Enabled
                      </MenuItem>
                      {[
                        { label: "True", value: true },
                        { label: "False", value: false },
                      ]?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.apiEnabled || formik.errors.apiEnabled ? (
                      <FormHelperText error>
                        {formik.errors.apiEnabled}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Stack>
              </div>
              <div style={{ display: "flex" }}>
                <Stack className="cf-fields">
                  <TextFieldComp
                    label="First Name"
                    placeholder="Enter First Name"
                    width="100%"
                    name="firstName"
                    value={formik.values.firstName}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.firstName || formik.errors.firstName ? (
                    <FormHelperText style={{}} error>
                      {formik.errors.firstName}
                    </FormHelperText>
                  ) : null}
                </Stack>
                <Stack className="cf-fields">
                  <TextFieldComp
                    label="Last Name"
                    placeholder="Enter First Name"
                    width="100%"
                    name="lastName"
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.lastName || formik.errors.lastName ? (
                    <FormHelperText style={{}} error>
                      {formik.errors.lastName}
                    </FormHelperText>
                  ) : null}
                </Stack>
              </div>
              <div style={{ display: "flex" }}>
                <Stack className="cf-fields">
                  <TextFieldComp
                    label="Phone Number"
                    placeholder="Enter Phone number"
                    width="100%"
                    name="mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                  />

                  {formik.touched.mobile || formik.errors.mobile ? (
                    <FormHelperText style={{}} error>
                      {formik.errors.mobile}
                    </FormHelperText>
                  ) : null}
                </Stack>
                <Stack className="cf-fields">
                  <label
                    style={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "500",
                      paddingBottom: "10px",
                    }}
                  >
                    Currency *
                  </label>

                  <FormControl>
                    <Select
                      value={formik.values.currency}
                      onChange={(event) =>
                        formik.setFieldValue("currency", event.target.value)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Select currency" }}
                      sx={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "55px",
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Currency
                      </MenuItem>
                      {currencies?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.currency || formik.errors.currency ? (
                      <FormHelperText error>
                        {formik.errors.currency}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Stack>
              </div>
              <div style={{ display: "flex" }}>
                <Stack className="cf-fields">
                  <TextFieldComp
                    label="Primary Email"
                    placeholder="Enter Primary Email"
                    width="100%"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.email || formik.errors.email ? (
                    <FormHelperText style={{}} error>
                      {formik.errors.email}
                    </FormHelperText>
                  ) : null}
                </Stack>
                <Stack className="cf-fields">
                  <TextFieldComp
                    label="Password"
                    placeholder="Enter password"
                    width="100%"
                    name="password"
                    showButton={true}
                    text="Auto Generate"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onClick={generateRandomPassword}
                  />
                  {formik.touched.password || formik.errors.password ? (
                    <FormHelperText style={{}} error>
                      {formik.errors.password}
                    </FormHelperText>
                  ) : null}
                </Stack>
              </div>
              <FormControlLabel
                sx={{ color: "rgba(162, 161, 167, 1)" }}
                label="Send login details"
                control={
                  <Checkbox
                    name="sendEmail"
                    checked={formik.values.sendEmail}
                    onChange={formik.handleChange}
                    sx={{
                      marginLeft: "50px",
                      color: "#0B7974",
                      "&.Mui-checked": {
                        color: "#0B7974",
                      },
                    }}
                  />
                }
              />
              <div style={{ display: "flex",justifyContent:'flex-end' }}>
                <button className="cf-back-btn" onClick={() => navigate(-1)}>
                  Back
                </button>
                <button className="cf-save-btn" type="submit">
                  {isLoading ? (
                    <CircularProgress style={{ color: "#fff" }} />
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </Stack>
          </Stack>
        </div>
      </form>
    </>
  );
};

export default CompanyForm;
