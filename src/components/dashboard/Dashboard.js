import React, { useState } from "react";
import { Stack } from "@mui/material";
import Header from "../Layout/Header";
import SideBar from "../Layout/SideBar";
import "./Dashboard.css";
import AdminDshboard from "./AdminDshboard";

function Dashboard() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack
      className="admin-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="admin-dashboard-main-div">
          <AdminDshboard />
        </Stack>
      </Stack>
    </div>
  );
}

export default Dashboard;
