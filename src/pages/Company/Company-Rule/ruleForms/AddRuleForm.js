import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import './ruleform.css'
import {
  CircularProgress,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar3";
import Header from "../../../../components/Layout/Header";
import ScenarioComp from "../../../../components/ruleFormComponent/Scenerio";
import ReferralComp from "../../../../components/ruleFormComponent/Refferal";
import MultiplyComp from "../../../../components/ruleFormComponent/Muliply";
import GeneralComp from "../../../../components/ruleFormComponent/General";
import GeolocationComp from "../../../../components/ruleFormComponent/Geolocation";
import ProductComp from "../../../../components/ruleFormComponent/Product";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addEarningRule,
  getRulesForEventCreation,
} from "../../../../redux/company/companyThunks";
import { useFormik } from "formik";
import {
  addEarningRuleSchema,
  generalSchema,
  geolocationSchema,
  multiplySchema,
  productSchema,
  referralSchema,
  scenarioSchema,
} from "../../../../schema/eventSchema";

const AddRuleForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { rulesForEventCreation, isCreateEarnRuleLoading } = useSelector(
    (state) => state.company
  );

  const [eventId, setEventId] = useState(null);
  const [validationSchema, setValidationSchema] =
    useState(addEarningRuleSchema);

  const getSchemaByEventId = (eventId) => {
    switch (eventId) {
      case 1:
        return scenarioSchema;
      case 2:
        return referralSchema;
      case 3:
        return generalSchema;
      case 4:
        return geolocationSchema;
      case 5:
        return multiplySchema;
      case 6:
        return productSchema;
      default:
        return addEarningRuleSchema;
    }
  };

  const formik = useFormik({
    initialValues: {
      eventId: "",
      name: "",
      description: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(addEarningRule({ values, navigate }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    dispatch(getRulesForEventCreation());
  }, []);

  useEffect(() => {
    setValidationSchema(getSchemaByEventId(eventId));
    formik.setFieldValue("name", "");
    formik.setFieldValue("description", "");
  }, [eventId]);

  useEffect(() => {
    formik.setErrors(null);
  }, [validationSchema]);

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack
       className="company-main-height"
      >
        <Header />
        <form onSubmit={formik.handleSubmit}>
          <Stack
            // sx={{
            //   width: "auto",
            //   height: "90vh",
            //   background: "white",
            //   borderRadius: "10px",
            //   marginTop: "20px",
            //   marginLeft: "20px",
            //   overflowY: "auto",
            // }} 
            className="company-dashboard-main-div"
          >
            <div
              style={{
                display: "flex",
                background: "white",
                marginTop: "20px",
              }}
            >
              <div
                style={{
                  width: "16px",
                  height: "32px",
                  background: "#0B7974",
                  borderRadius: "10px",
                  // marginLeft: "30px",
                }}
              ></div>
              <div
                style={{
                  fontSize: "23px",
                  fontWeight: "500",
                  color: "#black",
                  paddingLeft: "30px",
                }}
              >
                Add an Earning Rule
              </div>
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: "#black",
                // paddingLeft: "30px",
                paddingTop: "20px",
              }}
            >
              Basic Information
            </div>
            <div style={{ display: "flex" }}>
              <Stack sx={{ marginTop: "30px",width:'50%' }}>
                <label
                  style={{
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "500",
                    paddingBottom: "10px",
                  }}
                >
                  Select Rule Type*
                </label>
                <Autocomplete
                  disablePortal
                  id="combo-box-demo"
                  options={rulesForEventCreation}
                  sx={{
                    width: "100%",
                    height: "30px",
                    "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root ": {
                      borderRadius: "15px",
                    },
                  }}
                  onChange={(event, newValue) => {
                    formik.setFieldValue("eventId", newValue?.value);
                    setEventId(newValue?.value);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} placeholder="Select Rule Type" />
                  )}
                />
                {formik?.touched?.eventId || formik?.errors?.eventId ? (
                  <FormHelperText style={{ paddingTop: "25px" }} error>
                    {formik?.errors?.eventId}
                  </FormHelperText>
                ) : null}
              </Stack>
              <Stack sx={{ marginLeft: "50px", marginTop: "30px",width:'50%' }}>
                <label
                  style={{
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  Rule Name *
                </label>
                <input
                  style={{
                    fontSize: "12px",
                    color: "#0B7974",
                    width: "100%",
                    height: "50px",
                    borderRadius: "15px",
                    outline: "none",
                    border: "1px solid #BDBDBD",
                    paddingLeft: "15px",
                    marginTop: "10px",
                  }}
                  name="name"
                  type="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  placeholder="Enter Rule Name"
                />
                {formik?.touched?.name || formik?.errors?.name ? (
                  <FormHelperText style={{}} error>
                    {formik?.errors?.name}
                  </FormHelperText>
                ) : null}
              </Stack>
            </div>
            <Stack sx={{ marginTop: "30px", }}>
              <label
                style={{
                  fontSize: "14px",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                Rule Description *
              </label>
              <input
                placeholder="Enter Rule Description"
                style={{
                  fontSize: "12px",
                  color: "#0B7974",
                  width: "100%",
                  height: "50px",
                  borderRadius: "15px",
                  outline: "none",
                  border: "1px solid #BDBDBD",
                  paddingLeft: "15px",
                  marginTop: "10px",
                }}
                name="description"
                value={formik.values.description}
                onChange={formik.handleChange}
                type="text"
              />
              {formik?.touched?.description || formik?.errors?.description ? (
                <FormHelperText style={{}} error>
                  {formik?.errors?.description}
                </FormHelperText>
              ) : null}
            </Stack>
            {formik.values.eventId === 1 && <ScenarioComp formik={formik} />}
            {formik.values.eventId === 2 && <ReferralComp formik={formik} />}
            {formik.values.eventId === 3 && <GeneralComp formik={formik} />}
            {formik.values.eventId === 4 && <GeolocationComp formik={formik} />}
            {formik.values.eventId === 5 && <MultiplyComp formik={formik} />}
            {formik.values.eventId === 6 && <ProductComp formik={formik} />}
            <div style={{ display: "flex",justifyContent:'flex-end', marginBottom: "20px" }}>
              <button
                className="company-earningrules-addform-cancel-btn"
                type="button"
                onClick={() => navigate("/company_rules")}
              >
                Cancel
              </button>
              <button
                
                className="company-earningrules-addform-submit-btn"
                type="submit"
              >
                {isCreateEarnRuleLoading ? (
                  <CircularProgress style={{ color: "#fff" }} />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default AddRuleForm;
