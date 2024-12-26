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
import OfferForm from "./OfferForm";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {
  ButtonIcon,
  InputWithButton,
} from "../../../../components/InputFields/InputWithButton";
import {
  createReward,
  merchantProductsForDropDown,
} from "../../../../redux/company/companyThunks";
import { rewardSchema } from "../../../../schema/companySchema";
import { width } from "@mui/system";

const RewardForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  //To have date greater than today for points expiry
  let today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrowFormatted = today.toISOString().split("T")[0];

  const [collapsed, setCollapsed] = useState(false);
  const [showRewardForm, setShowRewardForm] = useState(true);
  const [activeButton, setActiveButton] = useState("");
  const [duplicateArray, setDuplicateArray] = useState([]);
  const { isRewardLoading, isUpdate, shopifyProductsForDD } = useSelector(
    (state) => state.company
  );

  useEffect(() => {
    const pathname = location.pathname;
    if (pathname === "/add/reward") {
      setActiveButton("Create Reward");
    } else if (pathname === "/add/offer") {
      setActiveButton("Create Offer");
      setShowRewardForm(false);
    }
  }, [location]);

  useEffect(() => {
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

  const formik = useFormik({
    initialValues: {
      name: "",
      rewardPoints: "",
      expirationDate: "",
      productId: null,
      photoUrl: "",
      claimInstruction: "",
    },
    validationSchema: rewardSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });
      dispatch(createReward({ formData, navigate }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack
        className="company-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="company-dashboard-main-div">
          <div className="rf-main-div">
            {showRewardForm ? (
              <form onSubmit={formik.handleSubmit}>
                <div style={{ display: "flex" }}>
                  <div className="rf-title-design2"></div>
                  <div className="rf-title2">Create Reward</div>
                </div>
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gridGap: "10px",
                      width:'50%'
                    }}
                  >
                    {/* <Stack> */}
                      <TextFieldComp
                        label="Reward Title *"
                        placeholder="Enter reward name"
                        width="100%"
                        stackStyle={{ marginTop: "20px" }}
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                      />
                      {formik.touched.name || formik.errors.name ? (
                        <FormHelperText error sx={{ marginLeft: "50px" }}>
                          {formik.errors.name}
                        </FormHelperText>
                      ) : null}
                    {/* </Stack> */}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gridGap: "10px",
                      width:'50%'
                    }}
                  >
                    <TextFieldComp
                      label="Reward Points *"
                      placeholder="Enter reward points"
                      width="100%"
                      stackStyle={{ marginLeft: "50px", marginTop: "20px" }}
                      name="rewardPoints"
                      value={formik.values.rewardPoints}
                      onChange={formik.handleChange}
                    />
                    {formik.touched.rewardPoints ||
                    formik.errors.rewardPoints ? (
                      <FormHelperText error sx={{ marginLeft: "50px" }}>
                        {formik.errors.rewardPoints}
                      </FormHelperText>
                    ) : null}
                  </div>
                </div>
                <div style={{ display: "flex" }}>
                  <Stack sx={{ marginTop: "20px",width:'50%' }}>
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
                      options={duplicateArray}
                      sx={{
                        width: "100%",
                        height: "50px",
                        borderRadius: "10px",
                        "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root ":
                          { borderRadius: "15px" },
                      }}
                      onChange={(e, values) => {
                        formik.setFieldValue("productId", values?.id);
                      }}
                      renderInput={(params) => (
                        <TextField {...params} placeholder="Select product" />
                      )}
                    />
                    {/* <ImageDropDown
                      shopifyProducts={duplicateArray}
                      formik={formik}
                    /> */}
                    {formik.touched.productId || formik.errors.productId ? (
                      <FormHelperText error>
                        {formik.errors.productId}
                      </FormHelperText>
                    ) : null}
                  </Stack>
                  <Stack 
                  sx={{width:'50%'}}
                  >
                    <TextFieldComp
                      type="date"
                      label="Expiry Date *"
                      placeholder="Set expiry date of reward"
                      width="100%"
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
                      <FormHelperText error sx={{ marginLeft: "50px" }}>
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
                    // width: "38.5%",
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
                    File: PNG,JPG,JPEG
                  </div>
                </Stack>
                <TextFieldComp
                  label="Description *"
                  placeholder="Enter reward description"
                  width="100%"
                  stackStyle={{ marginTop: "20px" }}
                  name="claimInstruction"
                  value={formik.values.claimInstruction}
                  onChange={formik.handleChange}
                />
                {formik.touched.claimInstruction ||
                formik.errors.claimInstruction ? (
                  <FormHelperText error sx={{ marginLeft: "50px" }}>
                    {formik.errors.claimInstruction}
                  </FormHelperText>
                ) : null}
                <div style={{ display: "flex",justifyContent:'flex-end' }}>
                  <button
                    className="rf-back-btn"
                    onClick={() => navigate("/reward_offer")}
                    type="button"
                  >
                    Back
                  </button>
                  <button className="rf-update-btn" type="submit">
                    {isRewardLoading ? (
                      <CircularProgress style={{ color: "#fff" }} />
                    ) : (
                      "Save"
                    )}
                  </button>
                </div>
              </form>
            ) : (
              <OfferForm />
            )}
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default RewardForm;
