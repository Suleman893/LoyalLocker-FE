import React, { useEffect, useState } from "react";
import "./style.css";
import Autocomplete from "@mui/material/Autocomplete";
import {
  CircularProgress,
  FormHelperText,
  Stack,
  TextField,
} from "@mui/material";
import SideBar from "../../../components/Layout/SideBar3";
import Header from "../../../components/Layout/Header";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  inviteMember,
  getMerchantStoresForOffer,
} from "../../../redux/company/companyThunks";
import { inviteMemberSchema } from "../../../schema/companySchema";

const CompanyConsumerForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { offersStores } = useSelector((state) => state.company);
  const { isInviteMemberLoading } = useSelector((state) => state.company);
  
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    dispatch(getMerchantStoresForOffer());
  }, []);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      storeId: "",
    },
    validationSchema: inviteMemberSchema,
    onSubmit: async (values) => {
      dispatch(inviteMember({ navigate, values }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <form style={{ width:'100%',minHeight:'100vh',display: "flex" }} onSubmit={formik.handleSubmit}>
      <SideBar />
      <Stack
       className="company-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack
        className="company-dashboard-main-div"
        >
          <div style={{display:'flex'}}>
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
              Invite Member
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <Stack sx={{  marginTop: "20px", gap: "10px",width:'50%' }}>
              <label
                style={{
                  fontSize: "14px",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                First Name *
              </label>
              <input
                name="firstName"
                values={formik.values.firstName}
                onChange={formik.handleChange}
                placeholder="Enter new member first name"
                style={{
                  fontSize: "12px",
                  color: "black",
                  width: "100%",
                  height: "45px",
                  borderRadius: "10px",
                  border: "1px solid #BDBDBD",
                  paddingLeft: "10px",
                }}
                type="text"
              />
              {formik.touched.firstName || formik.errors.firstName ? (
                <FormHelperText style={{}} error>
                  {formik.errors.firstName}
                </FormHelperText>
              ) : null}
            </Stack>
            <Stack sx={{ marginLeft: "50px", marginTop: "20px", gap: "10px", width:'50%' }}>
              <label
                style={{
                  fontSize: "14px",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                Last Name
              </label>
              <input
                name="lastName"
                values={formik.values.lastName}
                onChange={formik.handleChange}
                placeholder="Enter new member last name"
                style={{
                  fontSize: "14px",
                  color: "black",
                  width: "100%",
                  height: "45px",
                  borderRadius: "10px",
                  border: "1px solid #BDBDBD",
                  paddingLeft: "10px",
                }}
                type="text"
              />
              {formik.touched.lastName || formik.errors.lastName ? (
                <FormHelperText style={{}} error>
                  {formik.errors.lastName}
                </FormHelperText>
              ) : null}
            </Stack>
          </div>
          <div style={{ display: "flex" }}>
            <Stack sx={{ marginTop: "10px", gap: "10px",width:'50%' }}>
              <label
                style={{
                  fontSize: "14px",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                Email Address *
              </label>
              <input
                name="email"
                values={formik.values.email}
                onChange={formik.handleChange}
                placeholder="Enter new member email"
                style={{
                  fontSize: "12px",
                  color: "black",
                  width: "100%",
                  height: "45px",
                  borderRadius: "10px",
                  border: "1px solid #BDBDBD",
                  paddingLeft: "10px",
                }}
              />
              {formik.touched.email || formik.errors.email ? (
                <FormHelperText style={{}} error>
                  {formik.errors.email}
                </FormHelperText>
              ) : null}
            </Stack>
            <Stack sx={{ marginLeft: "50px", marginTop: "10px", gap: "10px",width:'50%' }}>
              <label
                style={{
                  fontSize: "14px",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                Store Name *
              </label>
              <Autocomplete
                onChange={(event, valueIs) => {
                  formik.setFieldValue("storeId", valueIs?.value);
                }}
                options={offersStores?.length ? offersStores : []}
                disablePortal
                id="combo-box-demo"
                sx={{
                  width: "100%",
                  height: "40px",
                  borderRadius: "10px",
                  "& .css-154xyx0-MuiInputBase-root-MuiOutlinedInput-root ": {
                    borderRadius: "14px",
                  },
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Select store" />
                )}
              />
              {formik.touched.storeId || formik.errors.storeId ? (
                <FormHelperText style={{ paddingTop: "15px" }} error>
                  {formik.errors.storeId}
                </FormHelperText>
              ) : null}
            </Stack>
          </div>

          <div style={{ display: "flex",justifyContent:'flex-end' }}>
            <button
              type="button"
              onClick={() => navigate("/company_members")}
              style={{
                
              }}
              className="company-invite-member-back-btn"
            >
              Back
            </button>
            <button
              type="submit"
              className="company-invite-member-sendinvite-btn"
              style={{
             
              }}
            >
              {isInviteMemberLoading ? (
                <CircularProgress style={{ color: "#fff" }} />
              ) : (
                "Send Invite"
              )}
            </button>
          </div>
        </Stack>
      </Stack>
    </form>
  );
};

export default CompanyConsumerForm;
