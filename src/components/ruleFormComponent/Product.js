import React, { useEffect, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import {
  CircularProgress,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import TextFieldComp from "../InputFields/TextFieldComp";
import {
  pointsTypeOptions,
  purchaseTypeOptions,
  statusOptions,
} from "../../data/ruleOptions";
import { useDispatch, useSelector } from "react-redux";
import StoreDetailRadio from "../InputFields/StoreDetailRadio";
import {
  getMerchantStoresForOffer,
  merchantProductsForDropDown,
} from "../../redux/company/companyThunks";
import { format } from "date-fns";

const ProductComp = ({ formik, data }) => {
  //To have date greater than today for points expiry
  let today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrowFormatted = today.toISOString().split("T")[0];
  const [duplicateArray, setDuplicateArray] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const {
    isMerchantStoresLoading,
    isUpdate,
    offersStores,
    shopifyProductsForDD,
  } = useSelector((state) => state.company);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMerchantStoresForOffer());
    dispatch(merchantProductsForDropDown());
  }, []);

  useEffect(() => {
    if (shopifyProductsForDD?.length) {
      const updatedArray = shopifyProductsForDD?.map((item, index) => ({
        ...item,
        value: item.id,
        label: item.title,
      }));
      setDuplicateArray(updatedArray);

      const selected = duplicateArray.find(
        (option) => option?.id === data?.productId
      );
      setSelectedProduct(selected);
    } else setDuplicateArray([]);
  }, [isUpdate]);

  const formattedStartDate =
    data?.eventId && data?.startAt
      ? format(new Date(data.startAt), "yyyy-MM-dd")
      : "";
  const formattedEndDate =
    data?.eventId && data?.endAt
      ? format(new Date(data.endAt), "yyyy-MM-dd")
      : "";

  return (
    <div>
      <div
        style={{
          fontSize: "18px",
          fontWeight: "600",
          color: "#black",
          // paddingLeft: "30px",
          paddingTop: "20px",
        }}
      >
        Rule Type Details
      </div>

      <Stack
        sx={{
          height: "auto",
          marginTop: "20px",
        }}
      >
        <div style={{ display: "flex" }}>
        <Stack sx={{ marginTop: "20px", width: '50%' }}>
        <label
              style={{
                fontSize: "14px",
                color: "black",
                fontWeight: "500",
                paddingBottom: "10px",
              }}
            >
              Product*
            </label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              sx={{
                width: "100%",
                height: "30px",

                "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root ": {
                  borderRadius: "15px",
                },
              }}
              options={duplicateArray}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select Product" />
              )}
              defaultValue={selectedProduct}
              key={selectedProduct}
              onChange={(event, newValue) => {
                formik.setFieldValue("productId", newValue?.value);
                setSelectedProduct(null);
              }}
            />
          </Stack>
          <Stack sx={{ marginLeft: "50px", marginTop: "20px",width:'50%' }}>
            <label
              style={{ fontSize: "14px", color: "black", fontWeight: "500" }}
            >
              Earn Point *
            </label>
            <input
              placeholder="Enter Point"
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
              type="number"
              onChange={(e) => formik.setFieldValue("points", e.target.value)}
              defaultValue={data?.eventId ? data?.points : null}
            />
          </Stack>
        </div>
        <div style={{ display: "flex" }}>
        <Stack sx={{ marginTop: "30px", width: '33.3%' }}>
        <label
              style={{
                fontSize: "14px",
                color: "black",
                fontWeight: "500",
                paddingBottom: "10px",
              }}
            >
              Activity Status *
            </label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={statusOptions}
              sx={{
                width: "100%",
                height: "30px",

                "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root ": {
                  borderRadius: "15px",
                },
              }}
              onChange={(event, newValue) => {
                formik.setFieldValue("status", newValue?.value);
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select Activity Status" />
              )}
              defaultValue={
                data?.eventId
                  ? statusOptions.find(
                      (option) => option.value === data?.status
                    )
                  : null
              }
            />
            {formik?.touched?.status || formik?.errors?.status ? (
              <FormHelperText style={{ paddingTop: "25px" }} error>
                {formik?.errors?.status}
              </FormHelperText>
            ) : null}
          </Stack>
          <Stack sx={{ marginLeft: "50px", marginTop: "30px",width: '33.3%','@media (max-width: 827px)': {
                marginLeft: "30px",
              } }}>            <TextFieldComp
              type="date"
              label="Start Date"
              placeholder="YYYY/MM/DD"
              width="100%"
              name="startAt"
              disabled={formik.values.status !== "ACTIVE"}
              onChange={(e) =>
                formik.setFieldValue(
                  "startAt",
                  new Date(e.target.value).toISOString()
                )
              }
              min={tomorrowFormatted}
              defaultValue={formattedStartDate}
            />
          </Stack>
          <Stack sx={{ marginLeft: "50px", marginTop: "30px",width: '33.3%','@media (max-width: 827px)': {
                marginLeft: "30px",
              } }}>            <TextFieldComp
              type="date"
              label="End Date"
              placeholder="YYYY/MM/DD"
              width="100%"
              name="startAt"
              disabled={formik.values.status !== "ACTIVE"}
              onChange={(e) =>
                formik.setFieldValue(
                  "startAt",
                  new Date(e.target.value).toISOString()
                )
              }
              min={tomorrowFormatted}
              defaultValue={formattedEndDate}
            />
          </Stack>
        </div>
        <div style={{ display: "flex" }}>
          <Stack sx={{  marginTop: "30px",width:'50%' }}>
            <label
              style={{
                fontSize: "14px",
                color: "black",
                fontWeight: "500",
                paddingBottom: "10px",
              }}
            >
              Point Type *
            </label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={pointsTypeOptions}
              sx={{
                width: "100%",
                height: "30px",

                "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root ": {
                  borderRadius: "15px",
                },
              }}
              onChange={(event, newValue) => {
                formik.setFieldValue("pointsType", newValue?.value);
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select Points Type" />
              )}
              defaultValue={
                data?.eventId
                  ? pointsTypeOptions.find(
                      (option) => option.value === data?.pointsType
                    )
                  : null
              }
            />
            {formik?.touched?.pointsType || formik?.errors?.pointsType ? (
              <FormHelperText style={{ paddingTop: "25px" }} error>
                {formik?.errors?.pointsType}
              </FormHelperText>
            ) : null}
          </Stack>
          <Stack sx={{ marginLeft: "50px", marginTop: "30px" ,width:'50%'}}>
            <label
              style={{
                fontSize: "14px",
                color: "black",
                fontWeight: "500",
                paddingBottom: "10px",
              }}
            >
              Purchase Type *
            </label>
            <Autocomplete
              disablePortal
              id="combo-box-demo"
              options={purchaseTypeOptions}
              sx={{
                width: "100%",
                height: "30px",

                "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root ": {
                  borderRadius: "15px",
                },
              }}
              onChange={(event, newValue) => {
                formik.setFieldValue("purchaseType", newValue?.value);
              }}
              renderInput={(params) => (
                <TextField {...params} placeholder="Select Purchase Type" />
              )}
              defaultValue={
                data?.eventId
                  ? purchaseTypeOptions.find(
                      (option) => option.value === data?.purchaseType
                    )
                  : null
              }
            />
            {formik?.touched?.purchaseType || formik?.errors?.purchaseType ? (
              <FormHelperText style={{ paddingTop: "25px" }} error>
                {formik?.errors?.purchaseType}
              </FormHelperText>
            ) : null}
          </Stack>
        </div>
      </Stack>
      {isMerchantStoresLoading ? (
        <CircularProgress sx={{ margin: "70px" }} />
      ) : offersStores?.length ? (
        <>
          <p
            style={{
              fontWeight: "bold",
              paddingTop: "20px",
            }}
          >
            Store Detail
          </p>
          <StoreDetailRadio
            formik={formik}
            offersStores={offersStores}
            isEdit={data?.eventId ? true : false}
          />
        </>
      ) : (
        <p>No Store for selection</p>
      )}
      {formik?.touched?.storeId || formik?.errors?.storeId ? (
        <FormHelperText
          style={{ paddingLeft: "40px", paddingTop: "25px" }}
          error
        >
          {formik?.errors?.storeId}
        </FormHelperText>
      ) : null}
    </div>
  );
};

export default ProductComp;
