import React, { useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import Autocomplete from "@mui/material/Autocomplete";
import { Stack, TextField } from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar";
import Header from "../../../../components/Layout/Header";
import TextFieldComp from "../../../../components/InputFields/TextFieldComp";
import { useSelector } from "react-redux";

const EarningRuleForm = () => {
  const navigate = useNavigate();
  const { stores } = useSelector((state) => state.admin);
  const [collapsed, setCollapsed] = useState(false);
  const [defaultEarningRule, setDefaultEarningRule] = useState({
    name: "",
    description: "",
    status: "",
    stores: [],
    allTimeActive: false,
    startAt: "",
    endAt: "",
    eventType: "",
    eventName: "",
    reward: "",
    pointsAmount: 15,
    pointValue: 15,
    minTransactionValue: 90,
    latitude: 10,
    longitude: 10,
    radius: 10,
    qrCode: "QR312A12",
    usageLimitActive: false,
    usageLimitPeriod: "0",
  });

  const handleChange = (target) => {
    const { name, value } = target;
    setDefaultEarningRule({
      ...defaultEarningRule,
      [name]: value,
    });
  };

  const handleDropDown = (event, value) => {
    if (event.target.id.startsWith("status-option")) {
      setDefaultEarningRule({
        ...defaultEarningRule,
        status: value,
      });
    } else if (event.target.id.startsWith("allTimeActive-option")) {
      setDefaultEarningRule({
        ...defaultEarningRule,
        allTimeActive: value === "true" ? true : false,
      });
    } else if (event.target.id.startsWith("usageLimitActive-option")) {
      setDefaultEarningRule({
        ...defaultEarningRule,
        usageLimitActive: value === "true" ? true : false,
      });
    } else if (event.target.id.startsWith("usageLimitPeriod-option")) {
      setDefaultEarningRule({
        ...defaultEarningRule,
        usageLimitPeriod: value,
      });
    } else if (event.target.id.startsWith("stores-option")) {
      setDefaultEarningRule((prev) => ({
        ...prev,
        stores: [...prev.stores, value.id],
      }));
    }
  };

  const handleSubmit = async (e) => {};

  return (
    <div style={{ display: "flex" }}>
      <SideBar />
      <Stack sx={{ width: "100%", padding: "0px", background: "#FAFAFA" }}>
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack sx={{ padding: "0px 30px" }}>
          <div className="erf-main-div">
            <div className="erf-header">
              <div style={{ display: "flex" }}>
                {" "}
                <div className="erf-title-design"></div>
                <div className="erf-title">Add an Earning Rule</div>
              </div>
              <button className="erf-add-btn">Add New Rule</button>
            </div>
            <Stack className="erf-field">
              <TextFieldComp
                label="Rule Name"
                placeholder="Enter Rule Name"
                width="1480px"
                name="name"
                value={defaultEarningRule.name}
                onChange={handleChange}
              />
            </Stack>
            <Stack className="erf-field">
              <label
                style={{
                  fontSize: "14px",
                  color: "black",
                  fontWeight: "500",
                }}
              >
                Status
              </label>
              <Autocomplete
                disablePortal
                id="status"
                sx={{ width: "1500px", height: "45px", borderRadius: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Active" />
                )}
                value={defaultEarningRule.status}
                onChange={handleDropDown}
                options={["INACTIVE", "ACTIVE"]}
              />
            </Stack>
            <Stack className="erf-field">
              <label
                style={{ fontSize: "14px", color: "black", fontWeight: "500" }}
              >
                Description
              </label>
              <textarea
                placeholder="Add description"
                rows={5}
                style={{
                  fontSize: "14px",
                  color: "#0B7974",
                  width: "1480px",
                  borderRadius: "5px",
                  border: "1px solid #BDBDBD",
                  paddingLeft: "10px",
                  outline: "none",
                  marginTop: "10px",
                }}
                name="description"
                value={defaultEarningRule.description}
                onChange={handleChange}
              />
            </Stack>
            <div className="erf-usage-div">Activity / Usage of Rules</div>
            <Stack className="erf-field">
              <label
                style={{ fontSize: "14px", color: "black", fontWeight: "500" }}
              >
                All Time Active *
              </label>
              <Autocomplete
                disablePortal
                id="allTimeActive"
                sx={{ width: "1500px", height: "45px", borderRadius: "10px" }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="
                All Time Active"
                  />
                )}
                value={defaultEarningRule.allTimeActive}
                onChange={handleDropDown}
                options={["true", "false"]}
              />
            </Stack>

            <div style={{ display: "flex" }}>
              <Stack className="erf-field">
                <TextFieldComp
                  type="datetime-local"
                  label="Start Date"
                  placeholder="dd/mm/yyyy"
                  width="750px"
                  name="startAt"
                  value={defaultEarningRule.startAt}
                  onChange={handleChange}
                />
              </Stack>
              <Stack className="erf-field">
                <TextFieldComp
                  type="datetime-local"
                  label="End Date"
                  placeholder="dd/mm/yyyy"
                  width="680px"
                  name="endAt"
                  value={defaultEarningRule.endAt}
                  onChange={handleChange}
                />
              </Stack>
            </div>

            <Stack className="erf-field">
              <label
                style={{ fontSize: "14px", color: "black", fontWeight: "500" }}
              >
                Usage Limit
              </label>
              <Autocomplete
                disablePortal
                id="usageLimitActive"
                sx={{ width: "1500px", height: "45px", borderRadius: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Usage Limit" />
                )}
                value={defaultEarningRule.usageLimitActive}
                onChange={handleDropDown}
                options={["true", "false"]}
              />
            </Stack>
            <Stack className="erf-field">
              <label
                style={{
                  fontSize: "14px",
                  color: "#0B7974",
                  fontWeight: "500",
                }}
              >
                Set Usage Limit Period *
              </label>
              <Autocomplete
                disablePortal
                id="usageLimitPeriod"
                sx={{ width: "1500px", height: "45px", borderRadius: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Usage Limit Period" />
                )}
                value={defaultEarningRule.usageLimitPeriod}
                onChange={handleDropDown}
                options={["1", "2"]}
              />
            </Stack>
            <div className="erf-rule-div">Activity / Usage of Rules</div>
            <Stack className="erf-field">
              <label
                style={{ fontSize: "14px", color: "black", fontWeight: "500" }}
              >
                Identify Stores
              </label>
              <Autocomplete
                disablePortal
                id="stores"
                sx={{ width: "1500px", height: "45px", borderRadius: "10px" }}
                renderInput={(params) => (
                  <TextField {...params} label="Store" />
                )}
                value={defaultEarningRule.stores}
                onChange={handleDropDown}
                options={stores.map((val) => ({
                  id: val?.id,
                  label: val?.name,
                }))}
              />
            </Stack>
            <div style={{ display: "flex" }}>
              <Link to="/rules">
                <button
                  className="erf-back-btn"
                  onClick={() => navigate("rules")}
                >
                  Back
                </button>
              </Link>
              <button className="erf-save-btn" onClick={handleSubmit}>
                Save
              </button>
            </div>
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default EarningRuleForm;
