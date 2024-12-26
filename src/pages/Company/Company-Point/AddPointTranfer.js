import React, { useEffect, useState } from "react";
import "./style.css";
import {
  CircularProgress,
  FormControl,
  FormHelperText,
  MenuItem,
  Select,
  Stack,
} from "@mui/material";
import SideBar from "../../../components/Layout/SideBar3";
import Header from "../../../components/Layout/Header";
import TextFieldComp from "../../../components/InputFields/TextFieldComp";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getCouponInfo,
  manualPointTransfer,
} from "../../../redux/company/companyThunks";
import { useFormik } from "formik";
import { allTransferMembers } from "../../../redux/company/companyThunks";
import {
  couponPointsTransfer,
  pointTransfer,
} from "../../../schema/pointTransferSchema";
import { clearCoupon } from "../../../redux/company/companySlice";

const AddPointTransfer = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //To have date greater than today for points expiry
  let today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrowFormatted = today.toISOString().split("T")[0];

  const { transferMembers, isCouponInfoLoading } = useSelector(
    (state) => state.company
  );
  const { isAddPointsLoading, couponInfo } = useSelector(
    (state) => state.company
  );

  const [type, setType] = useState("MANUAL");
  const [couponCode, setCouponCode] = useState(null);
  const [duplicateArray, setDuplicateArray] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [giftType, setGiftType] = useState(null);
  const [offerDiscountedPrice, setOfferDiscountedPrice] = useState(null);
  const [transferType, setTransferType] = useState(null);

  useEffect(() => {
    dispatch(allTransferMembers());
    setGiftType(null);
  }, []);

  useEffect(() => {
    if (transferMembers?.length) {
      const updatedArray = transferMembers?.map((item, index) => ({
        value: item.id,
        label: item.email,
      }));
      setDuplicateArray(updatedArray);
    }
  }, [transferMembers]);

  const formik = useFormik({
    initialValues: {
      transferType: "",
      consumerId: "",
      points: "",
      status: "",
      description: "",
      pointsExpiry: "",
      couponCode: "",
    },
    validationSchema: type === "MANUAL" ? pointTransfer : couponPointsTransfer,
    onSubmit: (values) => {
      dispatch(manualPointTransfer({ values, navigate }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  useEffect(() => {
    if (couponInfo?.id) {
      formik.setFieldValue("consumerId", couponInfo.userId);
      formik.setFieldValue("couponCode", couponInfo.couponCode);
    }
    if (couponInfo?.offerInfo) {
      setGiftType({
        title: "Offer",
        value: "OFFER",
      });
      formik.setFieldValue("transferType", "SPEND");
      setTransferType("Spend");
      setOfferDiscountedPrice(couponInfo?.offerInfo?.discountedPrice);
    }
    if (couponInfo?.rewardInfo) {
      setGiftType({
        title: "Reward",
        value: "REWARD",
      });
      formik.setFieldValue("transferType", "SPEND");
      setTransferType("Spend");
      formik.setFieldValue("points", couponInfo?.rewardInfo?.rewardPoints);
      formik.setFieldValue("status", "ALWAYS_ACTIVE");
    }
    if (couponInfo?.ruleInfo) {
      if (couponInfo?.ruleInfo?.pointsType === "REWARD") {
        setGiftType({
          title: "Reward",
          value: "REWARD",
        });
      } else if (couponInfo?.ruleInfo?.pointsType === "OFFER") {
        setGiftType({
          title: "Offer",
          value: "REWARD",
        });
      }
      if (couponInfo?.ruleInfo.eventId === 5) {
        const multipliedPoints =
          couponInfo?.ruleInfo?.points * couponInfo?.ruleInfo?.multiplier;
        formik.setFieldValue("points", multipliedPoints);
      } else formik.setFieldValue("points", couponInfo?.ruleInfo?.points);
      formik.setFieldValue("status", "ALWAYS_ACTIVE");
      formik.setFieldValue("transferType", "EARNED");
      setTransferType("Earned");
    }
  }, [couponInfo?.id]);

  return (
    <form style={{ width:'100%',minHeight:'100vh',display: "flex" }}onSubmit={formik.handleSubmit}>
      <SideBar />
      <Stack
     className="company-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack
         className="company-dashboard-main-div"
        >
          <div
            style={{
             display:'flex'
            }}
            className=""
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
              Point Transfer
            </div>
          </div>

          <Stack sx={{ marginTop: "20px", gap: "10px", }}>
            <label
              style={{
                fontSize: "14px",
                color: "black",
                fontWeight: "500",
                paddingBottom: "10px",
              }}
            >
              Points Type *
            </label>
            <Select
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                formik.resetForm();
                setGiftType(null);
                dispatch(clearCoupon());
              }}
              displayEmpty
              inputProps={{ "aria-label": "Select transfer type" }}
              sx={{
                borderRadius: "10px",
                width: "100%",
                height: "55px",
              }}
            >
              <MenuItem value="" disabled>
                Select transfer type
              </MenuItem>
              {[
                { label: "Manual Points", value: "MANUAL" },
                { label: "Coupon Points", value: "COUPON" },
              ]?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </Stack>
          {type === "MANUAL" ? (
            <>
              <div style={{ display: "flex" }}>
                <Stack sx={{ marginTop: "20px", gap: "10px",width:'50%' }}>
                  <label
                    style={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "500",
                      paddingBottom: "10px",
                    }}
                  >
                    Transfer Type *
                  </label>
                  <Stack>
                    <Select
                      value={formik.values.transferType}
                      onChange={(event) =>
                        formik.setFieldValue("transferType", event.target.value)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Select transfer type" }}
                      sx={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "55px",
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select transfer type
                      </MenuItem>
                      {[
                        { label: "Spend Points", value: "SPEND" },
                        { label: "Earn Points", value: "EARNED" },
                      ]?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>

                    {formik.touched.transferType ||
                    formik.errors.transferType ? (
                      <FormHelperText error>
                        {formik.errors.transferType}
                      </FormHelperText>
                    ) : null}
                  </Stack>
                </Stack>
                <Stack sx={{ marginLeft: "50px", marginTop: "30px",width:'50%' }}>
                  <label
                    style={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "500",
                      paddingBottom: "10px",
                    }}
                  >
                    Select Member *
                  </label>
                  <FormControl>
                    <Select
                      value={formik.values.consumerId}
                      onChange={(event) =>
                        formik.setFieldValue("consumerId", event.target.value)
                      }
                      displayEmpty
                      inputProps={{ "aria-label": "Select email of member" }}
                      sx={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "55px",
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select email
                      </MenuItem>
                      {duplicateArray?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.touched.consumerId || formik.errors.consumerId ? (
                    <FormHelperText error>
                      {formik.errors.consumerId}
                    </FormHelperText>
                  ) : null}
                </Stack>
              </div>

              <div style={{ display: "flex" }}>
                <Stack sx={{ marginTop: "20px", gap: "10px",width:'50%' }}>
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
                  <FormControl>
                    <Select
                      value={formik.values.status}
                      onChange={(event) =>
                        formik.setFieldValue("status", event.target.value)
                      }
                      displayEmpty
                      inputProps={{
                        "aria-label": "Select status of points",
                      }}
                      sx={{
                        borderRadius: "10px",
                        width: "100%",
                        height: "55px",
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select status
                      </MenuItem>
                      {[
                        { label: "Always Active", value: "ALWAYS_ACTIVE" },
                        { label: "Active", value: "ACTIVE" },
                      ]?.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  {formik.touched.status || formik.errors.status ? (
                    <FormHelperText error>
                      {formik.errors.status}
                    </FormHelperText>
                  ) : null}
                </Stack>
                <Stack sx={{ marginLeft: "50px", marginTop: "30px",width:'50%' }}>
                  <TextFieldComp
                    type="date"
                    label="Point Expiry"
                    placeholder="YYYY/MM/DD"
                    width="100%"
                    disabled={
                      formik.values.status === "ALWAYS_ACTIVE" ||
                      formik.values.status === ""
                    }
                    onChange={(e) =>
                      formik.setFieldValue(
                        "pointsExpiry",
                        new Date(e.target.value).toISOString()
                      )
                    }
                    min={tomorrowFormatted}
                  />
                  {formik.errors.pointsExpiry ? (
                    <FormHelperText error>
                      {formik.errors.pointsExpiry}
                    </FormHelperText>
                  ) : null}
                </Stack>
              </div>

              <div style={{ display: "flex" }}>
                <Stack sx={{ marginTop: "20px", gap: "10px",width:'50%' }}>
                  <label
                    style={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    Add Points *
                  </label>
                  <input
                    type="number"
                    placeholder="Enter Points"
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
                    name="points"
                    value={formik.values.points}
                    onChange={formik.handleChange}
                  />
                  {formik.touched.points || formik.errors.points ? (
                    <FormHelperText error>
                      {formik.errors.points}
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
                    Description *
                  </label>
                  <input
                    placeholder="Enter description"
                    style={{
                      fontSize: "12px",
                      color: "#0B7974",
                      width: "100%",
                      outline: "none",
                      height: "50px",
                      borderRadius: "15px",
                      border: "1px solid #BDBDBD",
                      paddingLeft: "10px",
                      marginTop: "10px",
                    }}
                    type="text"
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
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex" }}>
                <Stack
                  sx={{
                    // marginLeft: "50px",
                    marginTop: "20px",
                    position: "relative",
                    width:'50%'
                  }}
                >
                  <label
                    style={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    Coupon Code *
                  </label>
                  <input
                    placeholder="Enter coupon code"
                    style={{
                      fontSize: "12px",
                      color: "#0B7974",
                      width: "100%",
                      outline: "none",
                      height: "50px",
                      borderRadius: "15px",
                      border: "1px solid #BDBDBD",
                      paddingLeft: "10px",
                      marginTop: "10px",
                    }}
                    type="text"
                    name="couponCode"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                  />
                  <button
                  
                    className="company-coupon-fetch-btn"
                    type="button"
                    onClick={() => dispatch(getCouponInfo({ couponCode }))}
                  >
                    {isCouponInfoLoading ? (
                      <CircularProgress
                        size={13}
                        sx={{ color: "#fff" }}
                        thickness={6}
                      />
                    ) : (
                      "Fetch"
                    )}
                  </button>
                </Stack>

                <Stack sx={{ marginLeft: "50px", marginTop: "20px",width:'50%' }}>
                  <label
                    style={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    Transfer Type *
                  </label>
                  <input
                    placeholder="Transfer Type"
                    style={{
                      fontSize: "12px",
                      color: "#0B7974",
                      width: "100%",
                      outline: "none",
                      height: "50px",
                      borderRadius: "15px",
                      border: "1px solid #BDBDBD",
                      paddingLeft: "10px",
                      marginTop: "10px",
                    }}
                    type="text"
                    disabled={true}
                    name="transferType"
                    value={transferType}
                  />
                </Stack>
              </div>
              <div style={{ display: "flex" }}>
                <Stack sx={{ marginTop: "20px",width:'50%' }}>
                  <label
                    style={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    Type *
                  </label>
                  <input
                    placeholder="Reward/Offer"
                    style={{
                      fontSize: "12px",
                      color: "#0B7974",
                      width: "100%",
                      outline: "none",
                      height: "50px",
                      borderRadius: "15px",
                      border: "1px solid #BDBDBD",
                      paddingLeft: "10px",
                      marginTop: "10px",
                    }}
                    type="text"
                    disabled={true}
                    value={giftType?.title || ""}
                  />
                </Stack>
                <Stack sx={{ marginLeft: "50px", marginTop: "20px",width:'50%' }}>
                  <label
                    style={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    Member name *
                  </label>
                  <input
                    placeholder="Member name"
                    style={{
                      fontSize: "12px",
                      color: "#0B7974",
                      width: "100%",
                      outline: "none",
                      height: "50px",
                      borderRadius: "15px",
                      border: "1px solid #BDBDBD",
                      paddingLeft: "10px",
                      marginTop: "10px",
                    }}
                    type="text"
                    disabled={true}
                    value={
                      couponInfo?.userInfo?.firstName
                        ? couponInfo?.userInfo?.firstName +
                          " " +
                          couponInfo?.userInfo?.lastName
                        : ""
                    }
                  />
                </Stack>
              </div>
              <div style={{ display: "flex" }}>
                {giftType?.value === "REWARD" ? (
                  <Stack sx={{ marginLeft: "50px", marginTop: "20px",width:'50%' }}>
                    <label
                      style={{
                        fontSize: "14px",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      Points *
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Points"
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
                      name="points"
                      value={formik.values.points}
                      onChange={formik.handleChange}
                      disabled={true}
                    />
                    {formik.touched.points || formik.errors.points ? (
                      <FormHelperText error>
                        {formik.errors.points}
                      </FormHelperText>
                    ) : null}
                  </Stack>
                ) : (
                  giftType?.value === "OFFER" && (
                    <Stack sx={{ marginLeft: "50px", marginTop: "20px",width:'50%' }}>
                      <label
                        style={{
                          fontSize: "14px",
                          color: "black",
                          fontWeight: "500",
                        }}
                      >
                        Discounted Price *
                      </label>
                      <input
                        type="number"
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
                        disabled={true}
                        name="offerDiscountedPrice"
                        value={offerDiscountedPrice}
                      />
                    </Stack>
                  )
                )}

                <Stack sx={{  marginTop: "20px",width:'100%' }}>
                  <label
                    style={{
                      fontSize: "14px",
                      color: "black",
                      fontWeight: "500",
                    }}
                  >
                    Description *
                  </label>
                  <input
                    placeholder="Enter description"
                    style={{
                      fontSize: "12px",
                      color: "#0B7974",
                      width: "100%",
                      outline: "none",
                      height: "50px",
                      borderRadius: "15px",
                      border: "1px solid #BDBDBD",
                      paddingLeft: "10px",
                      marginTop: "10px",
                    }}
                    type="text"
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
              </div>
            </>
          )}

          <div style={{ display: "flex",justifyContent:'flex-end' }}>
            <button
            
              className="company-transfer-cancel-btn"
              type="button"
              onClick={() => {
                formik.resetForm();
                setGiftType(null);
                dispatch(clearCoupon());
              }}
            >
              Cancel
            </button>
            <button
              type="submit"
            className="company-transfer-save-btn"
            >
              {isAddPointsLoading ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Save"
              )}
            </button>
          </div>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddPointTransfer;
