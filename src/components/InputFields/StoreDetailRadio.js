import {
  Autocomplete,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

const StoreDetailRadio = ({
  formik,
  isEdit,
  marginLeft,
  width,
  offersStores,
}) => {
  const [customSelected, setCustomSelected] = useState(null);
  const [selectedStores, setSelectedStores] = useState([]);

  useEffect(() => {
    if (isEdit && formik?.values?.storeInfo?.length > 0) {
      const idToMatch = formik?.values?.storeInfo?.map((item) => item.id);
      const preSelectedStores = offersStores?.filter((store) =>
        idToMatch?.includes(store.value)
      );
      setSelectedStores(preSelectedStores);
      setCustomSelected("CUSTOM");
    }
  }, []);

  const handleRadioChange = (e) => {
    setCustomSelected(e.target.value);
    if (e.target.value === "ALL") {
      const allStores = offersStores?.map((itm) => itm.value);
      formik.setFieldValue("storeId", allStores);
      formik.setFieldValue("allStores", true);
    }
  };

  return (
    <div style={{ marginLeft: marginLeft }}>
      <div style={{ display: "flex" }}>
        <RadioGroup
          sx={{
            color: "#0B7974",
            fontWeight: "700",
            // marginLeft: "40px",
          }}
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="stores"
          value={customSelected}
          onChange={handleRadioChange}
        >
          <FormControlLabel
            value="ALL"
            control={
              <Radio
                sx={{
                  color: "#0B7974",
                  "&.Mui-checked": { color: "#0B7974" },
                }}
              />
            }
            label="All Stores"
          />
          <FormControlLabel
            value="CUSTOM"
            control={
              <Radio
                sx={{
                  color: "#0B7974",
                  "&.Mui-checked": { color: "#0B7974" },
                }}
              />
            }
            label="Select Custom"
          />
        </RadioGroup>
      </div>
      {customSelected === "CUSTOM" && (
        <>
          <label style={{ }}>Stores *</label>
          <Autocomplete
            multiple
            id="size-small-outlined-multi"
            size="small"
            options={offersStores?.length ? offersStores : []}
            defaultValue={
              isEdit ? selectedStores?.length && selectedStores : []
            }
            sx={{
              width: width,
              height: "30px",
              "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "15px",
                height: "55px",
              },
              "& .css-1gywuxd-MuiInputBase-root-MuiOutlinedInput-root": {
                borderRadius: "15px",
                height: "55px",
              },
            }}
            getOptionLabel={(option) => option.label}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select Stores" />
            )}
            onChange={(e, selectedStore) => {
              if (selectedStore?.length) {
                const uniqueValues = {};
                const uniqueArray = selectedStore?.filter((item) => {
                  if (!uniqueValues[item.value]) {
                    uniqueValues[item.value] = true;
                    return true;
                  }
                  return false;
                });
                const storeIds = uniqueArray.map((item) => item.value);
                formik.setFieldValue("allStores", false);
                formik.setFieldValue("storeId", storeIds);
              } else {
                formik.setFieldValue("storeId", []);
              }
            }}
          />
        </>
      )}
    </div>
  );
};

export default StoreDetailRadio;
