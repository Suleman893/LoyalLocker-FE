import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import "./style.css";
import Autocomplete from "@mui/material/Autocomplete";
import TextFieldComp from "../../../../components/InputFields/TextFieldComp";
import StoreDetailRadio from "../../../../components/InputFields/StoreDetailRadio";
import { useFormik } from "formik";
import {
  editOffer,
  getMerchantStoresForOffer,
  getSpecificOfferDetail,
  merchantProductsForDropDown,
} from "../../../../redux/company/companyThunks";
import { useDispatch, useSelector } from "react-redux";
import { offerSchema } from "../../../../schema/companySchema";
import { useNavigate, useParams } from "react-router-dom";
import ImageDropDown from "../../../../components/Dropdown/ImageDropDown";
import { format, parseISO } from "date-fns";

const EditOffer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //To have date greater than today for points expiry
  let today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrowFormatted = today.toISOString().split("T")[0];

  const { specificOffer, isUpdate, isLoading } = useSelector(
    (state) => state.company
  );
  const {
    offersStores,
    shopifyProductsForDD,
    isMerchantStoresLoading,
    isEditOfferLoading,
  } = useSelector((state) => state.company);

  const [duplicateArray, setDuplicateArray] = useState([]);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

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
      dispatch(editOffer({ values, id, navigate }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    dispatch(merchantProductsForDropDown());
    dispatch(getSpecificOfferDetail({ id }));
    dispatch(getMerchantStoresForOffer());
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

  useEffect(() => {
    if (specificOffer) {
      formik.setFieldValue(
        "storeId",
        specificOffer?.storeInfo?.length
          ? specificOffer?.storeInfo?.map((item) => item?.id)
          : []
      );
      formik.setFieldValue("storeInfo", specificOffer?.storeInfo || "");
      formik.setFieldValue("productId", specificOffer?.productId || "");
      formik.setFieldValue("expiryDate", specificOffer?.expiryDate || "");
      formik.setFieldValue(
        "discountPercentage",
        specificOffer?.discountPercentage || 0
      );
      formik.setFieldValue(
        "discountedPrice",
        specificOffer?.discountedPrice || 0
      );
      formik.setFieldValue(
        "claimInstruction",
        specificOffer?.claimInstruction || ""
      );

      const selected = duplicateArray.find(
        (option) => option?.id === specificOffer?.productId
      );
      const selectedDate =
        format(parseISO(specificOffer?.expiryDate), "yyyy-MM-dd") || "";
      setSelectedDate(selectedDate);
      setSelectedProduct(selected);
      setSelectedProductPrice(selected?.price);
    }
  }, [isUpdate, duplicateArray]);

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
    <div>
      <div style={{ display: "flex" }}>
        <div className="rf-title-design2-1"></div>
        <div className="rf-title2-1">Edit Offer</div>
      </div>
      {isLoading ? (
         <div className="csl-loader"><CircularProgress /></div> 
      ) : (
        <form onSubmit={formik.handleSubmit}>
          {isMerchantStoresLoading ? (
            <CircularProgress />
          ) : offersStores?.length ? (
            <StoreDetailRadio
              isEdit={true}
              // marginLeft="30px"
              width="100%"
              formik={formik}
              offersStores={offersStores}
            />
          ) : (
            <p >No Store for selection</p>
          )}
          {formik.touched.storeId || formik.errors.storeId ? (
            <FormHelperText error style={{paddingLeft:"60px",paddingTop:"30px"}}>{formik.errors.storeId}</FormHelperText>
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
                  setSelectedProduct(null);
                  setSelectedProductPrice(values?.price);
                }}
                // defaultValue={duplicateArray?.find(
                //   (option) => option.id == formik?.values?.productId
                // )}
                defaultValue={selectedProduct}
                renderInput={(params) => (
                  <TextField {...params} placeholder="Select Product" />
                )}
              />
              {/* <ImageDropDown
                shopifyProducts={duplicateArray}
                formik={formik}
                isEdit={true}
                setSelectedProductPrice={setSelectedProductPrice}
                isOffer={true}
              /> */}
              {formik.touched.productId || formik.errors.productId ? (
                <FormHelperText error>{formik.errors.productId}</FormHelperText>
              ) : null}
            </Stack>
            <TextFieldComp
              name="expiryDate"
              type="date"
              value={selectedDate}
              label="Expiry Date *"
              width="100%"
              stackStyle={{ marginLeft: "50px", marginTop: "20px",width:'50%' }}
              min={tomorrowFormatted}
              onChange={(e) =>
                formik.setFieldValue(
                  "expiryDate",
                  new Date(e.target.value).toISOString()
                )
              }
            />
            {formik.touched.expiryDate || formik.errors.expiryDate ? (
              <FormHelperText error>{formik.errors.expiryDate}</FormHelperText>
            ) : null}
          </div>
          <div style={{ display: "flex" }}>
            <TextFieldComp
              label="Percentage Discount *"
              placeholder="Enter discount"
              width="100%"
              stackStyle={{ marginTop: "20px",width:'50%' }}
              type="number"
              name="discountPercentage"
              value={formik.values.discountPercentage}
              onChange={handleDiscountChange}
            />
            {formik.touched.discountPercentage ||
            formik.errors.discountPercentage ? (
              <FormHelperText error>
                {formik.errors.discountPercentage}
              </FormHelperText>
            ) : null}
            <TextFieldComp
              label="Discount Price *"
              placeholder="$12.00 - 10.00"
              width="100%"
              stackStyle={{ marginLeft: "50px", marginTop: "20px",width:'50%' }}
              name="discountedPrice"
              value={formik.values.discountedPrice}
              onChange={formik.handleChange}
            />
            {formik.touched.expiryDate || formik.errors.expiryDate ? (
              <FormHelperText error>{formik.errors.expiryDate}</FormHelperText>
            ) : null}
          </div>
          <TextFieldComp
            label="Description *"
            placeholder="Enter description"
            width="100%"
            stackStyle={{  marginTop: "20px" }}
            name="claimInstruction"
            value={formik.values.claimInstruction}
            onChange={formik.handleChange}
          />
          {formik.touched.claimInstruction || formik.errors.claimInstruction ? (
            <FormHelperText error style={{paddingLeft:"60px"}}>
              {formik.errors.claimInstruction}
            </FormHelperText>
          ) : null}
          <div style={{ display: "flex",justifyContent:'flex-end' }}>
            <button
              className="rf-back-btn-1"
              type="button"
              onClick={() => navigate("/reward_offer")}
            >
              Back
            </button>
            <button className="rf-update-btn-1" type="submit">
              {isEditOfferLoading ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default EditOffer;
