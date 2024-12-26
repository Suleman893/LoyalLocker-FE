import React, { useState } from "react";
import Header from "../../../../components/Layout/Header";
import "../style.css";
import "../CampaignListing.css";
import SideBar3 from "../../../../components/Layout/SideBar3";
import { QueryBuilder, formatQuery } from "react-querybuilder";
import "react-querybuilder/dist/query-builder.css";
import "./styles.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryBuilderMaterial } from "@react-querybuilder/material";
import { defaultOperators } from "react-querybuilder";
import {
  Stack,
  Typography,
  Button,
  InputLabel,
  TextField,
  CircularProgress,
} from "@mui/material";
import { createSegment } from "../../../../redux/company/companyThunks";
import { addSegmentSchema } from "../../../../schema/campaignSchema";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

export const validator = (r) => !!r.value;

const getCurrentDate = () => {
  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
};

const customTheme = createTheme({
  palette: {
    primary: {
      main: "#ff5722",
    },
    secondary: {
      main: "#0B7974",
    },
  },
  components: {
    MuiRadio: {
      styleOverrides: {
        root: {
          color: "#0B7974 !important",
        },
        checked: {
          color: "#0B7974 !important",
        },
      },
    },
  },
});

const DateEditor = ({ value, handleOnChange }) => (
  <input
    type="date"
    value={value || ""}
    onChange={(e) => handleOnChange(e.target.value)}
    max={getCurrentDate()}
  />
);

const fields = [
  {
    name: "country",
    label: "Country",
    valueEditorType: "select",
    values: [{ name: "US", label: "US" }],
    defaultValue: "US",
    operators: defaultOperators.filter(
      (op) => op.name === "=" || op.name === "!="
    ),
  },
  {
    name: "date_of_birth",
    label: "Date of birth",
    inputType: "date",
    operators: defaultOperators.filter(
      (op) =>
        op.name === "=" ||
        op.name === "!=" ||
        op.name === "<" ||
        op.name === ">" ||
        op.name === "<=" ||
        op.name === ">="
    ),
    valueEditor: DateEditor,
  },
  {
    name: "gender",
    label: "Gender",
    operators: defaultOperators.filter(
      (op) => op.name === "=" || op.name === "!="
    ),
    valueEditorType: "radio",
    values: [
      { name: "M", label: "Male" },
      { name: "F", label: "Female" },
      { name: "U", label: "Other" },
    ],
  },
];

const AddAudienceQueryBuilder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isCreateSegmentLoading } = useSelector((state) => state.company);

  const [collapsed, setCollapsed] = useState(false);
  const [query, setQuery] = useState({ combinator: "and", rules: [] });
  const [queryToSend, setQueryToSend] = useState(null);
  const [queryError, setQueryError] = useState(false);

  const { values, errors, handleChange, handleSubmit, resetForm } = useFormik({
    initialValues: {
      segmentName: "",
    },
    validationSchema: addSegmentSchema,
    onSubmit: async (values) => {
      const payload = {
        queryToSend: queryToSend,
        segmentName: values.segmentName,
      };
      if (isQueryValid(query)) {
        setQueryError(false);
        dispatch(createSegment({ navigate, payload }));
      } else {
        setQueryError(true);
      }
    },
    validateOnChange: false,
    validateOnBlur: true,
  });

  const handleQueryChange = (newQuery) => {
    setQuery(newQuery);
    setQueryToSend(formatQuery(newQuery, "sql"));
  };

  const isQueryValid = (query) => {
    return query.rules.some((rule) => rule.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
        <SideBar3 />
        <Stack
         className='company-main-height'
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack className='company-dashboard-main-div'>
            <div className="ptl-main-div">
              <Stack
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  gap={2}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div
                    className="ptl-title-design"
                    style={{ marginTop: "0px", marginLeft: "0px" }}
                  ></div>
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 600, color: "#1A1D1F" }}
                  >
                    Add Audience
                  </Typography>
                </Stack>
              </Stack>
              <Stack sx={{ marginTop: "50px" }}>
                <InputLabel
                  htmlFor="username"
                  sx={{
                    color: "#232323",
                    fontSize: "14px",
                    paddingBottom: "5px",
                  }}
                >
                  Audience Name
                </InputLabel>
                <TextField
                  id="segmentName"
                  variant="outlined"
                  placeholder="Enter Audience name here"
                  sx={{
                    width: "100%",
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "12px",
                    },
                  }}
                  type="text"
                  value={values.segmentName}
                  onChange={handleChange}
                />
              </Stack>
              <p style={{ fontSize: "12px", color: "red" }}>
                {errors?.segmentName}
              </p>
              <ThemeProvider theme={customTheme}>
                <QueryBuilderMaterial>
                  <QueryBuilder
                    controlElements={{
                      addGroupAction: () => null,
                    }}
                    fields={fields}
                    query={query}
                    onQueryChange={handleQueryChange}
                    className="queryBuilder-container"
                  />
                </QueryBuilderMaterial>
                {queryError ? (
                  <p style={{ color: "red", fontSize: "12px" }}>
                    At least one rule selection is required
                  </p>
                ) : null}
              </ThemeProvider>
              <Stack
                gap={2}
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  sx={{
                    color: "#0B7974",
                    border: "1px solid #0B7974",
                    borderRadius: "10px",
                    height: "52px",
                    width: "240px",
                    textTransform: "none",
                  }}
                  onClick={() => {
                    setQuery({ combinator: "and", rules: [] });
                    resetForm();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  sx={{
                    width: "240px",
                    height: "52px",
                    borderRadius: "10px",
                    background: "#0B7974",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      cursor: "pointer",
                      background: "#0B7974",
                    },
                  }}
                  type="submit"
                >
                  {isCreateSegmentLoading ? (
                    <CircularProgress style={{ color: "#fff" }} />
                  ) : (
                    "Save"
                  )}
                </Button>
              </Stack>
            </div>
          </Stack>
        </Stack>
      </div>
    </form>
  );
};

export default AddAudienceQueryBuilder;
