import React, { useState } from "react";
import { CircularProgress, FormHelperText, Stack } from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar";
import Header from "../../../../components/Layout/Header";
import { useFormik } from "formik";
import { addEvent } from "../../../../redux/admin/adminThunks";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addEventSchema } from "../../../../schema/eventSchema";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const RuleTypeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isRuleTypeAddLoading } = useSelector((state) => state.admin);

  const [collapsed, setCollapsed] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: "",
      status: "",
      description: "",
    },
    validationSchema: addEventSchema,
    onSubmit: async (values) => {
      dispatch(addEvent({ navigate, values }));
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  return (
    <form style={{ width:'100%',minHeight:'100vh',display: "flex" }} onSubmit={formik.handleSubmit}>
      <SideBar />
      <Stack
       className="admin-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack
       className="admin-dashboard-main-div"
        >
          <div
            style={{ display: "flex", background: "white", marginTop: "20px" }}
          >
            <div
              style={{
                width: "16px",
                height: "32px",
                background: "#0B7974",
                borderRadius: "15px",
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
              Add Rule Type
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <Stack sx={{ marginTop: "20px",width:'50%' }}>
              <label
                style={{ fontSize: "14px", color: "black", fontWeight: "500" }}
              >
                Rule Type Name
              </label>
              <input
                placeholder="Enter "
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
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              {formik.touched.name || formik.errors.name ? (
                <FormHelperText style={{}} error>
                  {formik.errors.name}
                </FormHelperText>
              ) : null}
            </Stack>
            <Stack sx={{ marginLeft: "50px", marginTop: "20px",width:'50%' }}>
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
                  inputProps={{ "aria-label": "Select Status" }}
                  sx={{
                    borderRadius: "10px",
                    width: "100%",
                    height: "55px",
                  }}
                >
                  <MenuItem value="" disabled>
                    Select Status
                  </MenuItem>
                  {[
                    { label: "Active", value: "ACTIVE" },
                    { label: "In Active", value: "INACTIVE" },
                  ]?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {formik.touched.status || formik.errors.status ? (
                  <FormHelperText
                    style={{
                      marginTop: "30px",
                    }}
                    error
                  >
                    {formik.errors.status}
                  </FormHelperText>
                ) : null}
              </FormControl>
            </Stack>
          </div>
          <div style={{ display: "flex" }}>
            <Stack sx={{ width:'100%', marginTop: "20px" }}>
              <label
                style={{ fontSize: "14px", color: "black", fontWeight: "500" }}
              >
                Description
              </label>
              <input
                placeholder="Enter description"
                style={{
                  fontSize: "12px",
                  color: "#0B7974",
                  // width: "1540px",
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
                <FormHelperText style={{}} error>
                  {formik.errors.description}
                </FormHelperText>
              ) : null}
            </Stack>
          </div>

          <div style={{ display: "flex",justifyContent:'flex-end' }}>
            <button
              className="admin-transfer-cancel-btn"
              onClick={() => formik.resetForm()}
              type="button"
            >
              Cancel
            </button>
            <button
           
              className="admin-transfer-save-btn"
              type="submit"
            >
              {isRuleTypeAddLoading ? (
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

export default RuleTypeForm;
