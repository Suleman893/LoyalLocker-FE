import React, { useEffect, useState } from "react";
import { CircularProgress, FormHelperText, Stack } from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar3";
import Header from "../../../../components/Layout/Header";
import ScenarioComp from "../../../../components/ruleFormComponent/Scenerio";
import ReferralComp from "../../../../components/ruleFormComponent/Refferal";
import MultiplyComp from "../../../../components/ruleFormComponent/Muliply";
import GeneralComp from "../../../../components/ruleFormComponent/General";
import GeolocationComp from "../../../../components/ruleFormComponent/Geolocation";
import ProductComp from "../../../../components/ruleFormComponent/Product";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { editEarningRule } from "../../../../redux/company/companyThunks";
import { useFormik } from "formik";
import { format, parseISO } from "date-fns";

import {
  addEarningRuleSchema,
  generalSchema,
  geolocationSchema,
  multiplySchema,
  productSchema,
  referralSchema,
  scenarioSchema,
} from "../../../../schema/eventSchema";

const EditRuleForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { id } = useParams();
  const { data } = location.state;

  const { isUpdateEarnRuleLoading } = useSelector((state) => state.company);

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
      eventId: data?.eventId || "",
      name: data?.name || "",
      description: data?.description || "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(editEarningRule({ values, id, navigate }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    formik.setFieldValue("eventId", data?.eventId);
    formik.setFieldValue("name", data?.name);
    formik.setFieldValue("description", data?.description);
    setValidationSchema(getSchemaByEventId(data?.eventId));
    if (data?.eventId === 1) {
      formik.setFieldValue("points", data?.points);
      formik.setFieldValue("minTransactionValue", data?.minTransactionValue);

      formik.setFieldValue("pointsType", data?.pointsType);
      formik.setFieldValue("purchaseType", data?.purchaseType);
      formik.setFieldValue(
        "storeId",
        data?.storeInfo?.length ? data?.storeInfo?.map((item) => item?.id) : []
      );
      formik.setFieldValue("storeInfo", data?.storeInfo || "");
    } else if (data.eventId === 2) {
      formik.setFieldValue("points", data?.points);
      formik.setFieldValue("pointsType", data?.pointsType);
      formik.setFieldValue("purchaseType", data?.purchaseType);
    } else if (data.eventId === 3) {
      formik.setFieldValue("points", data?.points);
      formik.setFieldValue("minTransactionValue", data?.minTransactionValue);
      formik.setFieldValue("pointsType", data?.pointsType);
      formik.setFieldValue("purchaseType", data?.purchaseType);
      formik.setFieldValue(
        "storeId",
        data?.storeInfo?.length ? data?.storeInfo?.map((item) => item?.id) : []
      );
      formik.setFieldValue("storeInfo", data?.storeInfo || "");
    } else if (data.eventId === 4) {
      formik.setFieldValue("points", data?.points);
      formik.setFieldValue("distanceFromStore", data?.distanceFromStore);
      formik.setFieldValue("pointsType", data?.pointsType);
      formik.setFieldValue("purchaseType", data?.purchaseType);

      formik.setFieldValue(
        "storeId",
        data?.storeInfo?.length ? data?.storeInfo?.map((item) => item?.id) : []
      );
      formik.setFieldValue("storeInfo", data?.storeInfo || "");
    } else if (data.eventId === 5) {
      formik.setFieldValue("points", data?.points);
      formik.setFieldValue("multiplier", data?.multiplier);
      formik.setFieldValue("pointsType", data?.pointsType);
      formik.setFieldValue("purchaseType", data?.purchaseType);
      formik.setFieldValue(
        "storeId",
        data?.storeInfo?.length ? data?.storeInfo?.map((item) => item?.id) : []
      );
      formik.setFieldValue("storeInfo", data?.storeInfo || "");
    } else if (data.eventId === 6) {
      formik.setFieldValue("points", data?.points);
      formik.setFieldValue("pointsType", data?.pointsType);
      formik.setFieldValue("purchaseType", data?.purchaseType);
      formik.setFieldValue(
        "storeId",
        data?.storeInfo?.length ? data?.storeInfo?.map((item) => item?.id) : []
      );
      formik.setFieldValue("storeInfo", data?.storeInfo || "");
    }
    formik.setFieldValue("status", data?.status);
    if (data.status === "ACTIVE") {
      formik.setFieldValue("startAt", data?.startAt);
      formik.setFieldValue("endAt", data?.endAt);
    }
  }, [data?.eventId]);

  useEffect(() => {
    formik.setErrors(null);
  }, [validationSchema]);

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack
      className='company-main-height'
      >
        <Header />
        <form onSubmit={formik.handleSubmit}>
          <Stack
            // sx={{
            //   width: "1635px",
            //   height: "90vh",
            //   background: "white",
            //   borderRadius: "10px",
            //   marginTop: "20px",
            //   marginLeft: "20px",
            //   overflowY: "auto",
            // }}
            className='company-dashboard-main-div'
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
                  marginLeft: "30px",
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
                paddingLeft: "30px",
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
                  name="eventId"
                  type="text"
                  defaultValue={data?.eventInfo?.name}
                  onChange={formik.handleChange}
                  placeholder="Enter Event"
                  disabled={true}
                />
                {formik?.touched?.eventId || formik?.errors?.eventId ? (
                  <FormHelperText style={{ paddingTop: "25px" }} error>
                    {formik?.errors?.eventId}
                  </FormHelperText>
                ) : null}
              </Stack>
              <Stack sx={{ marginLeft: "50px", marginTop: "40px",width:'50%' }}>
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
                  defaultValue={data.name}
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
            <Stack sx={{ marginTop: "30px" }}>
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
                  // width: "1530px",
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
                defaultValue={data.description}
              />
              {formik?.touched?.description || formik?.errors?.description ? (
                <FormHelperText style={{}} error>
                  {formik?.errors?.description}
                </FormHelperText>
              ) : null}
            </Stack>
            {formik.values.eventId === 1 && (
              <ScenarioComp formik={formik} data={data} />
            )}
            {formik.values.eventId === 2 && (
              <ReferralComp formik={formik} data={data} />
            )}
            {formik.values.eventId === 3 && (
              <GeneralComp formik={formik} data={data} />
            )}
            {formik.values.eventId === 4 && (
              <GeolocationComp formik={formik} data={data} />
            )}
            {formik.values.eventId === 5 && (
              <MultiplyComp formik={formik} data={data} />
            )}
            {formik.values.eventId === 6 && (
              <ProductComp formik={formik} data={data} />
            )}
            <div style={{ display: "flex",justifyContent:'flex-end', marginBottom: "20px" }}>
              <button
                style={{
                  width: "240px",
                  height: "52px",
                  border: "1px solid #0B7974",
                  color: "#0B7974",
                  background: "white",
                  borderRadius: "10px",
                  marginTop: "30px",
                  // marginLeft: "1100px",
                }}
                type="button"
                onClick={() => navigate("/company_rules")}
              >
                Cancel
              </button>
              <button
                style={{
                  width: "240px",
                  height: "52px",
                  border: "none",
                  color: "white",
                  background: "#0B7974",
                  borderRadius: "10px",
                  marginTop: "30px",
                  marginLeft: "20px",
                }}
                type="submit"
              >
                {isUpdateEarnRuleLoading ? (
                  <CircularProgress style={{ color: "#fff" }} />
                ) : (
                  "Update"
                )}
              </button>
            </div>
          </Stack>
        </form>
      </Stack>
    </div>
  );
};

export default EditRuleForm;
