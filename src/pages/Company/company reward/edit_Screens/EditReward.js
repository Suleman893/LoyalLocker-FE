import React, { useEffect, useState } from "react";
import SideBar from "../../../../components/Layout/SideBar3";
import Header from "../../../../components/Layout/Header";
import {
  Autocomplete,
  CircularProgress,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import "./style.css";
import TextFieldComp from "../../../../components/InputFields/TextFieldComp";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  ButtonIcon,
  InputWithButton,
} from "../../../../components/InputFields/InputWithButton";
import EditOffer from "./EditOffer";
import {
  editReward,
  getSpecificRewardDetail,
  merchantProductsForDropDown,
} from "../../../../redux/company/companyThunks";
import { useFormik } from "formik";
import { rewardSchema } from "../../../../schema/companySchema";
import { format, parseISO } from "date-fns";

const EditReward = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  //To have date greater than today for points expiry
  let today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrowFormatted = today.toISOString().split("T")[0];

  const { isLoading } = useSelector((state) => state.company);
  const { shopifyProductsForDD } = useSelector((state) => state.company);
  const { specificReward, isUpdate, isEditRewardLoading } = useSelector(
    (state) => state.company
  );

  const [collapsed, setCollapsed] = useState(false);
  const [showRewardForm, setShowRewardForm] = useState(true);
  const [activeButton, setActiveButton] = useState("Create Reward");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [duplicateArray, setDuplicateArray] = useState([]);

  const formik = useFormik({
    initialValues: {
      name: "",
      rewardPoints: "",
      productId: null,
      expirationDate: "",
      photoUrl: "",
      claimInstruction: "",
    },
    validationSchema: rewardSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      if (values?.photoUrl.includes("res.cloudinary")) {
        const { photoUrl, ...restValues } = values;
        Object.keys(restValues).forEach((key) => {
          formData.append(key, restValues[key]);
        });
      } else {
        Object.keys(values).forEach((key) => {
          formData.append(key, values[key]);
        });
      }
      dispatch(editReward({ formData, id, navigate }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    dispatch(merchantProductsForDropDown());
    dispatch(getSpecificRewardDetail({ id }));
  }, []);

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === `/edit/reward/${id}`) {
      setActiveButton("Create Reward");
    } else if (pathname === `/edit/offer/${id}`) {
      setActiveButton("Create Offer");
      setShowRewardForm(false);
    }
  }, [location]);

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
    if (specificReward) {
      formik.setFieldValue("name", specificReward?.name || "");
      formik.setFieldValue("rewardPoints", specificReward?.rewardPoints || "");
      formik.setFieldValue(
        "expirationDate",
        specificReward?.expirationDate || ""
      );
      formik.setFieldValue("productId", specificReward?.productId || "");
      formik.setFieldValue("photoUrl", specificReward?.rewardImg || "");
      formik.setFieldValue(
        "claimInstruction",
        specificReward?.claimInstruction || ""
      );
      const selected = duplicateArray.find(
        (option) => option?.id === specificReward?.productId
      );
      const selectedDate =
        format(parseISO(specificReward?.expirationDate), "yyyy-MM-dd") || "";
      setSelectedDate(selectedDate);
      setSelectedProduct(selected);
    }
  }, [isUpdate, duplicateArray]);

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack
     className="company-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="company-dashboard-main-div">
          <div className="rf-main-div-1">
            {/* <FormToggleButton
              toggleView={toggleView}
              setActiveButton={setActiveButton}
              activeButton={activeButton}
              background="rgba(255, 88, 51, 1)"
              btn1text="Edit Reward"
              btn2text="Edit Offer"
            /> */}
            {showRewardForm && (
              <>
                <div style={{ display: "flex" }}>
                  <div className="rf-title-design2-1"></div>
                  <div className="rf-title2-1">Edit Reward</div>
                </div>
                {isLoading ? (
                 <div className="csl-loader"><CircularProgress /></div> 
                ) : (
                  <form onSubmit={formik.handleSubmit}>
                    <div style={{ display: "flex" }}>
                    <Stack sx={{width:'50%'}}>
                      <TextFieldComp
                        label="Reward Title *"
                        placeholder="Enter reward name"
                        width="100%"
                        stackStyle={{  marginTop: "20px" }}
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.name || formik.errors.name ? (
                        <FormHelperText error style={{paddingLeft:"60px"}}>
                          {formik.errors.name}
                        </FormHelperText>
                      ) : null}
                      </Stack>
                      <Stack sx={{width:'50%'}}>
                      <TextFieldComp
                        label="Reward Points *"
                        placeholder="Enter reward name"
                        width="100%"
                        stackStyle={{ marginLeft: "50px", marginTop: "20px" }}
                        name="rewardPoints"
                        value={formik.values.rewardPoints}
                        onChange={formik.handleChange}
                      />

                      {formik.touched.rewardPoints &&
                      formik.errors.rewardPoints ? (
                        <FormHelperText error style={{paddingLeft:"60px"}}>
                          {formik.errors.rewardPoints}
                        </FormHelperText>
                      ) : null}
                      </Stack>
                    </div>
                    <div style={{ display: "flex" }}>
                      <Stack sx={{  marginTop: "20px",width:'50%' }}>
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
                            "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root ":
                              { borderRadius: "15px" },
                          }}
                          onChange={(e, value) => {
                            formik.setFieldValue("productId", value?.id);
                            setSelectedProduct(null);
                          }}
                          getOptionLabel={(option) => option.label}
                          defaultValue={selectedProduct}
                          key={selectedProduct}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              placeholder="Select Product"
                            />
                          )}
                        />
                        {/* <ImageDropDown
                          shopifyProducts={duplicateArray}
                          formik={formik}
                          isEdit={true}
                          isOffer={false}
                        /> */}
                        {formik.touched.productId || formik.errors.productId ? (
                          <FormHelperText error>
                            {formik.errors.productId}
                          </FormHelperText>
                        ) : null}
                      </Stack>
                      <Stack sx={{width:'50%'}}>
                      <TextFieldComp
                        type="date"
                        label="Expiry Date *"
                        placeholder="Enter expiry date"
                        width="100%"
                        value={selectedDate}
                        stackStyle={{ marginLeft: "50px", marginTop: "20px" }}
                        onChange={(e) =>
                          formik.setFieldValue(
                            "expirationDate",
                            new Date(e.target.value).toISOString()
                          )
                        }
                        min={tomorrowFormatted}
                      />

                      {formik.touched.expirationDate ||
                      formik.errors.expirationDate ? (
                        <FormHelperText error>
                          {formik.errors.expirationDate}
                        </FormHelperText>
                      ) : null}
                      </Stack>
                    </div>

                    <div
                      style={{
                        fontSize: "14px",
                        color: "black",
                        paddingTop: "15px",
                        // paddingLeft: "50px",
                      }}
                    >
                      Upload Image *
                    </div>
                    <Stack
                      direction="column"
                      sx={{
                        width: "38.5%",
                        marginTop: "10px",
                        // marginLeft: "45px",
                      }}
                    >
                      <InputWithButton
                        id="dlDoc"
                        defaultValue=""
                        size="small"
                        placeholder=""
                        disabled
                        formik={formik}
                        button={
                          <div>
                            <label htmlFor="dlDoc">
                              <ButtonIcon text="Upload Image" fontSize="14px" />
                            </label>
                            <input
                              type="file"
                              id="dlDoc"
                              style={{ display: "none" }}
                            />
                          </div>
                        }
                      />
                      {formik.touched.photoUrl || formik.errors.photoUrl ? (
                        <FormHelperText error>
                          {formik.errors.photoUrl}
                        </FormHelperText>
                      ) : null}
                      <div
                        style={{
                          fontSize: "14px",
                          color: "rgba(162, 161, 167, 1)",
                          paddingTop: "5px",
                        }}
                      >
                        File: SVG, PNG,JPG
                      </div>
                    </Stack>

                    <TextFieldComp
                      label="Description *"
                      placeholder="Enter reward name"
                      width="100%"
                      stackStyle={{ marginTop: "20px" }}
                      name="claimInstruction"
                      value={formik.values.claimInstruction}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.claimInstruction ||
                    formik.errors.claimInstruction ? (
                      <FormHelperText error style={{paddingLeft:"60px"}}>
                        {formik.errors.claimInstruction}
                      </FormHelperText>
                    ) : null}
                    <div style={{ display: "flex",justifyContent:'flex-end' }}>
                      <button
                        className="rf-back-btn-1"
                        onClick={() => navigate("/reward_offer")}
                        type="button"
                      >
                        Back
                      </button>
                      <button className="rf-update-btn-1" type="submit">
                        {isEditRewardLoading ? (
                          <CircularProgress style={{ color: "#fff" }} />
                        ) : (
                          "Save"
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </>
            )}
            {!showRewardForm && <EditOffer />}
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default EditReward;
