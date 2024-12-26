import React, { useState } from "react";
import { Stack, Button as SimpleButton } from "@mui/material";
import Header from "../Layout/Header";
import SideBar from "../Layout/SideBar3";
import "./Dashboard.css";
import CompanyDashboard from "./CompanyDashboard";

function Dashboard2() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <>
      <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
        <SideBar />
        <Stack className="company-main-height">
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack className="company-dashboard-main-div">
            <CompanyDashboard />
          </Stack>
        </Stack>
      </div>
    </>
  );
}

export default Dashboard2;
