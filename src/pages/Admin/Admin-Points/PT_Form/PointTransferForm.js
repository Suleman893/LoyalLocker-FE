import React, { useEffect, useState } from "react";
import "./style.css";
import { CircularProgress, FormHelperText, Stack } from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar";
import Header from "../../../../components/Layout/Header";
import TextFieldComp from "../../../../components/InputFields/TextFieldComp";
import { useFormik } from "formik";
import { pointTransfer } from "../../../../schema/pointTransferSchema";
import {
  allTransferMembers,
  manualPointTransfer,
} from "../../../../redux/admin/adminThunks";
import { useDispatch, useSelector } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useNavigate } from "react-router-dom";

const PointTransferForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //To have date greater than today for points expiry
  let today = new Date();
  today.setDate(today.getDate() + 1);
  const tomorrowFormatted = today.toISOString().split("T")[0];

  const { transferMembers } = useSelector((state) => state.admin);
  const { isLoading } = useSelector((state) => state.admin);

  const [collapsed, setCollapsed] = useState(false);
  const [duplicateArray, setDuplicateArray] = useState([]);

  useEffect(() => {
    dispatch(allTransferMembers());
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
    },
    validationSchema: pointTransfer,
    onSubmit: (values) => {
      dispatch(manualPointTransfer({ values, navigate }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack
      className="admin-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack
         className="admin-dashboard-main-div"
        >
          <div
            style={{ display: "flex" }}
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
          <form onSubmit={formik.handleSubmit}>
            <div style={{ display: "flex" }}>
              <Stack
                direction="column"
                sx={{ marginTop: "20px",width:'50%' }}
              >
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

                <FormControl>
                  <Select
                    value={formik.values.transferType}
                    onChange={(event) =>
                      formik.setFieldValue("transferType", event.target.value)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Select transfer type" }}
                    sx={{
                      borderRadius: "10px",
                      width: "100%%",
                      height: "55px",
                    }}
                  >
                    <MenuItem value="" disabled>
                      Select transfer type
                    </MenuItem>
                    {[
                      { label: "Spend points", value: "SPEND" },
                      { label: "Earn points", value: "EARNED" },
                    ]?.map((option) => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  {formik.touched.transferType || formik.errors.transferType ? (
                    <FormHelperText error>
                      {formik.errors.transferType}
                    </FormHelperText>
                  ) : null}
                </FormControl>
              </Stack>
              <Stack
                direction="column"
                sx={{ marginLeft: "50px", marginTop: "20px",width:'50%' }}
              >
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
                    inputProps={{ "aria-label": "Select email" }}
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
              <Stack
                direction="column"
                sx={{ marginTop: "30px",width:'50%' }}
              >
                <label
                  style={{
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "500",
                    paddingBottom: "10px",
                  }}
                >
                  Status*
                </label>

                <FormControl>
                  <Select
                    value={formik.values.status}
                    onChange={(event) =>
                      formik.setFieldValue("status", event.target.value)
                    }
                    displayEmpty
                    inputProps={{ "aria-label": "Select status" }}
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
                  <FormHelperText error>{formik.errors.status}</FormHelperText>
                ) : null}
              </Stack>
              <Stack sx={{ marginLeft: "50px", marginTop: "30px" ,width:'50%'}}>
                <TextFieldComp
                  type="date"
                  label="Point Expiry"
                  placeholder="YYYY/MM/DD"
                  width="100%"
                  disabled={
                    formik.values.status === "ALWAYS_ACTIVE" ||
                    formik.values.status === ""
                  }
                  name="pointsExpiry"
                  onChange={(e) =>
                    formik.setFieldValue(
                      "pointsExpiry",
                      new Date(e.target.value).toISOString()
                    )
                  }
                  min={tomorrowFormatted}
                />
                {formik.touched.pointsExpiry || formik.errors.pointsExpiry ? (
                  <FormHelperText error>
                    {formik.errors.pointsExpiry}
                  </FormHelperText>
                ) : null}
              </Stack>
            </div>
            <div style={{ display: "flex" }}>
              <Stack
                direction="column"
                sx={{  marginTop: "20px",width:'50%' }}
              >
                <label
                  style={{
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  Add Points
                </label>
                <input
                  type="number"
                  placeholder="Enter "
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
                  <FormHelperText error>{formik.errors.points}</FormHelperText>
                ) : null}
              </Stack>
              <Stack sx={{ marginLeft: "50px", marginTop: "20px",width:'50%' }}>
                <label
                  style={{
                    fontSize: "14px",
                    color: "black",
                    fontWeight: "500",
                  }}
                >
                  Description
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
            <div style={{ display: "flex",justifyContent:'flex-end' }}>
              <button
               className="admin-transfer-cancel-btn"
                type="button"
                onClick={() => formik.resetForm()}
              >
                Cancel
              </button>
              <button
                type="submit"
          className="admin-transfer-save-btn"
              >
                {isLoading ? (
                  <CircularProgress style={{ color: "#fff" }} />
                ) : (
                  "Save"
                )}
              </button>
            </div>
          </form>
        </Stack>
      </Stack>
    </div>
  );
};

export default PointTransferForm;
