import React, { useEffect, useState } from "react";
import {
  Stack,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar3";
import Header from "../../../../components/Layout/Header";
import TextFieldComp from "../../../../components/InputFields/TextFieldComp";
import { useNavigate } from "react-router-dom";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { addTheStore } from "../../../../redux/company/companyThunks";
import { useFormik } from "formik";
import { addStore } from "../../../../schema/storeSchema";
import { Loader } from "@googlemaps/js-api-loader";
import { toast } from "react-toastify";

const AddStore = () => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const loader = new Loader({
          apiKey: process.env.REACT_APP_GOOGLE_MAP_API,
          version: "weekly",
        });
        loader.load().then(() => {
          const geocoder = new window.google.maps.Geocoder();
          const latlng = { lat: latitude, lng: longitude };
          geocoder.geocode({ location: latlng }, (results, status) => {
            if (status === "OK") {
              if (results[0]) {
                const addressComponents = results[0]?.address_components;
                addressComponents.forEach((component) => {
                  const types = component?.types;
                  if (types.includes("country")) {
                    formik.setFieldValue("country", component?.long_name || "");
                  }
                  if (types.includes("locality")) {
                    formik.setFieldValue("city", component?.long_name || "");
                  }
                  if (types.includes("administrative_area_level_1")) {
                    formik.setFieldValue("state", component?.long_name || "");
                  }
                  if (types.includes("postal_code")) {
                    formik.setFieldValue(
                      "postalCode",
                      component?.long_name || ""
                    );
                  }
                  if (results[0]?.formatted_address) {
                    formik.setFieldValue(
                      "address",
                      results[0]?.formatted_address || ""
                    );
                  }
                });
              }
            } else {
              return toast.error("Geocoder failed ", { theme: "colored" });
            }
          });
        });
      },
      (error) => {
        return toast.error("Error getting position ", { theme: "colored" });
      }
    );
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading } = useSelector((state) => state.company);

  const [collapsed, setCollapsed] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      identifier: "",
      phoneNo: "",
      status: "",
      description: "",
      country: "",
      city: "",
      address: "",
      state: "",
      postalCode: "",
    },
    validationSchema: addStore,
    onSubmit: async (values) => {
      dispatch(addTheStore({ navigate, values }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <form style={{ width:'100%',minHeight:'100vh',display: "flex" }} onSubmit={formik.handleSubmit}>
      <SideBar />
      <Stack
       className="company-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack
        className="company-dashboard-main-div"
        >
          <div className="company-add-store-main-div">
            <div className="csf-header-div">
              <div style={{ display: "flex" }}>
                <div className="csf-title-design"></div>
                <div className="csf-title">Add Store</div>
              </div>
            </div>
            <div style={{ padding: "20px 0px", fontWeight: "bold" }}>
              Basic Information
            </div>
            <Stack sx={{ display: "flex", flexDirection: "row" }}>
              <Stack style={{width:'50%'}} >
                <TextFieldComp
                  label="Name *"
                  placeholder="Enter Store Name"
                  width="100%"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
                {formik.touched.name || formik.errors.name ? (
                  <FormHelperText style={{}} error>
                    {formik.errors.name}
                  </FormHelperText>
                ) : null}
              </Stack>
              <Stack sx={{ marginLeft: "50px",width:'50%' }}>
                <TextFieldComp
                  label="Identifier *"
                  placeholder="Enter Identifier"
                  width="100%"
                  name="identifier"
                  value={formik.values.identifier}
                  onChange={formik.handleChange}
                />
                {formik.touched.identifier || formik.errors.identifier ? (
                  <FormHelperText style={{}} error>
                    {formik.errors.identifier}
                  </FormHelperText>
                ) : null}
              </Stack>
            </Stack>
            <div style={{ display: "flex",paddingTop:'5px' }}>
              <Stack sx={{ marginTop: "10px",width:'50%' }}>
                <TextFieldComp
                  label="Phone Number *"
                  placeholder="Enter Phone no"
                  width="100%"
                  name="phoneNo"
                  value={formik.values.phoneNo}
                  onChange={formik.handleChange}
                />
                {formik.touched.phoneNo || formik.errors.phoneNo ? (
                  <FormHelperText style={{}} error>
                    {formik.errors.phoneNo}
                  </FormHelperText>
                ) : null}
              </Stack>
              <Stack sx={{ marginLeft: "50px", marginTop: "10px",width:'50%' }}>
                <label
                  style={{
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "500",
                    paddingBottom: "10px",
                  }}
                >
                  Status *
                </label>
                <Stack >
                  <FormControl>
                    <Select
                      value={formik.values.status}
                      onChange={(event) =>
                        formik.setFieldValue("status", event.target.value)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Select Status" }}
                      sx={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "55px",
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Status
                      </MenuItem>
                      {[
                        { label: "Active", value: "ACTIVE" },
                        { label: "In Active", value: "INACTIVE" },
                      ]?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                    {formik.touched.status || formik.errors.status ? (
                      <FormHelperText error>
                        {formik.errors.status}
                      </FormHelperText>
                    ) : null}
                  </FormControl>
                </Stack>
              </Stack>
            </div>
            <Stack sx={{ marginTop: "10px",paddingTop:'5px' }}>
              <TextFieldComp
                label="Description"
                placeholder="Enter description"
                width="100%"
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
              {formik.touched.description || formik.errors.description ? (
                <FormHelperText error>
                  {formik.errors.description}
                </FormHelperText>
              ) : null}
            </Stack>
            <div style={{ padding: "20px 0px", fontWeight: "bold" }}>
              Localization
            </div>
            <div style={{ display: "flex" }}>
              <Stack sx={{  marginTop: "10px",width:'50%' }}>
                <TextFieldComp
                  label="Country*"
                  placeholder="Country"
                  width="100%"
                  name="country"
                  value={formik.values.country}
                  disabled={true}
                />
                {formik.touched.country || formik.errors.country ? (
                  <FormHelperText error>{formik.errors.country}</FormHelperText>
                ) : null}
              </Stack>
              <Stack sx={{ marginLeft: "50px", marginTop: "10px",width:'50%' }}>
                <TextFieldComp
                  label="City *"
                  placeholder="City"
                  width="100%"
                  name="city"
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  disabled={true}
                />
                {formik.touched.city || formik.errors.city ? (
                  <FormHelperText error>{formik.errors.city}</FormHelperText>
                ) : null}
              </Stack>
            </div>
            <div style={{ display: "flex",paddingTop:'5px' }}>
              <Stack sx={{  marginTop: "10px",width:'33.3%' }}>
                <TextFieldComp
                  label="Address*"
                  placeholder="Address"
                  width="100%"
                  name="address"
                  value={formik.values.address}
                  disabled={true}
                />
                {formik.touched.address || formik.errors.address ? (
                  <FormHelperText error>{formik.errors.address}</FormHelperText>
                ) : null}
              </Stack>
              <Stack sx={{ marginLeft: "50px", marginTop: "10px",width:'33.3%' }}>
                <TextFieldComp
                  label="State/Province  *"
                  placeholder="State/Province *"
                  width="100%"
                  name="state"
                  value={formik.values.state}
                  disabled={true}
                />
                {formik.touched.state || formik.errors.state ? (
                  <FormHelperText error>{formik.errors.state}</FormHelperText>
                ) : null}
              </Stack>
              <Stack sx={{ marginLeft: "50px", marginTop: "10px",width:'33.3%' }}>
                <TextFieldComp
                  label="Postal Code *"
                  placeholder="Enter Postal Code"
                  width="100%"
                  name="postalCode"
                  value={formik.values.postalCode}
                  disabled={formik.values.postalCode ? true : false}
                  onChange={formik.handleChange}
                />
                {formik.touched.postalCode || formik.errors.postalCode ? (
                  <FormHelperText error>
                    {formik.errors.postalCode}
                  </FormHelperText>
                ) : null}
              </Stack>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                className="csf-back-btn"
                onClick={() => navigate("/company_stores")}
                type="button"
                style={{ cursor: "pointer" }}
              >
                Back
              </button>
              <button
                className="csf-update-btn"
                type="submit"
                style={{ cursor: "pointer" }}
              >
                {isLoading ? (
                  <CircularProgress style={{ color: "#fff" }} />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </div>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddStore;
