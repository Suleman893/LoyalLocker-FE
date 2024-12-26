import React, { useEffect, useState } from "react";
import {
  Stack,
  TextField,
  FormHelperText,
  CircularProgress,
} from "@mui/material";
import "./style.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextFieldComp from "../../../../components/InputFields/TextFieldComp";
import StoreDetailRadio from "../../../../components/InputFields/StoreDetailRadio";
import { useFormik } from "formik";
import {
  createOffer,
  getMerchantStoresForOffer,
  merchantProductsForDropDown,
} from "../../../../redux/company/companyThunks";
import { useDispatch, useSelector } from "react-redux";
import { offerSchema } from "../../../../schema/companySchema";
import { useNavigate } from "react-router-dom";
// import ImageDropDown from "../../../../components/Dropdown/ImageDropDown";

const OfferForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //To have date greater than today for points expiry
  let today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrowFormatted = today.toISOString().split("T")[0];

  //offerStores for the stores name in dropdown for custom selection of stores
  const { offersStores } = useSelector((state) => state.company);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [duplicateArray, setDuplicateArray] = useState([]);
  const {
    isOfferLoading,
    isMerchantStoresLoading,
    isUpdate,
    shopifyProductsForDD,
  } = useSelector((state) => state.company);

  const formik = useFormik({
    initialValues: {
      storeId: [],
      productId: null,
      expiryDate: "",
      discountPercentage: 0,
      discountedPrice: 0,
      claimInstruction: "",
    },
    validationSchema: offerSchema,
    onSubmit: (values) => {
      dispatch(createOffer({ values, navigate }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

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
        image: item.imageSrc,
      }));
      setDuplicateArray(updatedArray);
    } else setDuplicateArray([]);
  }, [isUpdate]);

  const handleDiscountChange = (e) => {
    let discountPercentage = parseFloat(e.target.value);
    // Validate discount percentage (between 1 and 100)
    if (
      isNaN(discountPercentage) ||
      discountPercentage < 1 ||
      discountPercentage > 100
    ) {
      discountPercentage = 0;
      formik.setFieldValue("discountedPrice", null);
    }
    formik.setFieldValue("discountPercentage", discountPercentage);
    const discountedPrice = parseFloat(
      (
        selectedProductPrice -
        (selectedProductPrice * discountPercentage) / 100
      ).toFixed(2)
    );
    formik.setFieldValue("discountedPrice", discountedPrice || 0);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div style={{ display: "flex" }}>
        <div className="rf-title-design2"></div>
        <div className="rf-title2">Create Offer</div>
      </div>
      {isMerchantStoresLoading ? (
        <CircularProgress />
      ) : offersStores?.length ? (
        <StoreDetailRadio
          // marginLeft="30px"
          // width="1200px"
          formik={formik}
          offersStores={offersStores}
        />
      ) : (
        <p>No store for selection</p>
      )}
      {formik.touched.storeId || formik.errors.storeId ? (
        <FormHelperText error sx={{ marginLeft: "60px" }}>
          {formik.errors.storeId}
        </FormHelperText>
      ) : null}
      <div style={{ display: "flex", marginTop: "40px" }}>
        <Stack sx={{ marginTop: "20px",width:'50%' }}>
          <label
            style={{
              fontSize: "14px",
              color: "black",
              fontWeight: "500",
              paddingBottom: "10px",
            }}
          >
            Product *
          </label>
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={duplicateArray}
            sx={{
              width: "100%",
              height: "50px",
              borderRadius: "10px",
              "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root ": {
                borderRadius: "15px",
              },
            }}
            onChange={(e, values) => {
              formik.setFieldValue("productId", values?.id);
              formik.setFieldValue("discountPercentage", 0);
              formik.setFieldValue("discountedPrice", values?.price);
              setSelectedProductPrice(values?.price);
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Select product for offer" />
            )}
          />
          {/* <ImageDropDown
            shopifyProducts={duplicateArray}
            formik={formik}
            setSelectedProductPrice={setSelectedProductPrice}
            isOffer={true}
          /> */}
          {formik.touched.productId || formik.errors.productId ? (
            <FormHelperText error>{formik.errors.productId}</FormHelperText>
          ) : null}
        </Stack>
        {/* <Stack> */}
          <TextFieldComp
            type="date"
            label="Expiration Date *"
            placeholder="Set expiry of offer"
            width="100%"
            stackStyle={{ marginLeft: "50px", marginTop: "20px",width:'50%' }}
            onChange={(e) =>
              formik.setFieldValue(
                "expiryDate",
                new Date(e.target.value).toISOString()
              )
            }
            min={tomorrowFormatted}
          />
          {formik.touched.expiryDate || formik.errors.expiryDate ? (
            <FormHelperText error 
            sx={{ marginLeft: "50px" }}
            >
              {formik.errors.expiryDate}
            </FormHelperText>
          ) : null}
        {/* </Stack> */}
      </div>
      <div style={{ display: "flex" }}>
        <TextFieldComp
          label="Percentage Discount"
          placeholder="Enter discount on product price"
          width="100%"
          stackStyle={{ marginTop: "20px",width:'50%' }}
          name="discountPercentage"
          value={formik.values.discountPercentage}
          type="number"
          onChange={handleDiscountChange}
          max={100}
          min={1}
          disabled={selectedProductPrice ? false : true}
        />
        {formik.touched.discountPercentage ||
        formik.errors.discountPercentage ? (
          <FormHelperText error>
            {formik.errors.discountPercentage}
          </FormHelperText>
        ) : null}
        <TextFieldComp
          label="Discount Price"
          placeholder="Discounted price of product"
          width="100%"
          stackStyle={{ marginLeft: "50px", marginTop: "20px",width:'50%' }}
          name="discountedPrice"
          value={formik.values.discountedPrice}
          disabled={true}
        />
        {formik.touched.discountedPrice || formik.errors.discountedPrice ? (
          <FormHelperText error>{formik.errors.discountedPrice}</FormHelperText>
        ) : null}
      </div>
      <TextFieldComp
        label="Description *"
        placeholder="Enter description of offer"
        width="100%"
        stackStyle={{  marginTop: "20px" }}
        name="claimInstruction"
        value={formik.values.claimInstruction}
        onChange={formik.handleChange}
      />
      {formik.touched.claimInstruction || formik.errors.claimInstruction ? (
        <FormHelperText error sx={{ marginLeft: "50px" }}>
          {formik.errors.claimInstruction}
        </FormHelperText>
      ) : null}
      <div style={{ display: "flex" }}>
        <button
          className="rf-back-btn"
          type="button"
          onClick={() => navigate("/reward_offer")}
        >
          Back
        </button>
        <button className="rf-update-btn" type="submit">
          {isOfferLoading ? (
            <CircularProgress style={{ color: "#fff" }} />
          ) : (
            "Save"
          )}
        </button>
      </div>
    </form>
  );
};

export default OfferForm;
