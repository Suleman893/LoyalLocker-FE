import React, { useState } from "react";
import { Stack } from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar3";
import Header from "../../../../components/Layout/Header";
import Active from ".././../../../assets/Company images/Active.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./style.css";

const CompanyStoreDetail = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar />
      <Stack
      className="company-main-height"
      >
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className="company-dashboard-main-div"></Stack>
        <div className="p-main-div">
          <div style={{ display: "flex" }}>
            <div className="csd-title-design"></div>
            <div className="csd-title">Store Detail</div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="csd-label-01">
              
              <p className="csd-title-01">Name</p>
              <p className="csd-value-01">{state?.name}</p>
            </div>
            <div className="csd-label-01">
              
              <p className="csd-title-01">Identifier</p>
              <p className="csd-value-01">{state?.identifier}</p>
            </div>
            <div className="csd-label-01">
              
              <p className="csd-title-01">Store Status</p>
              <div
                className="company-store-status"
              >
                {state?.status === "ACTIVE" && (
                  <img src={Active} alt="Active" />
                )}
                <p className="">{state?.status}</p>
              </div>
            </div>
          </div>
        </div>
        {/* description */}
        <div className="p-main-div">
          <div style={{ display: "flex" }}>
            <div className="csd-title-design"></div>
            <div className="csd-title">Description</div>
          </div>
          <p >{state?.description}</p>
        </div>

        {/* local information */}
        <div className="p-main-div">
          <div style={{ display: "flex" }}>
            {" "}
            <div className="csd-title-design"></div>
            <div className="csd-title">Localization Information</div>
          </div>
          <div style={{ display: "flex" }}>
            <div className="csd-label-02">
              {" "}
              <p className="csd-title-01">Adress</p>
              <p className="csd-value-01">{state?.address}</p>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div className="csd-label-01">
              {" "}
              <p className="csd-title-01">City</p>
              <p className="csd-value-01">{state?.city}</p>
            </div>
            <div className="csd-label-01">
              {" "}
              <p className="csd-title-01">State/Province</p>
              <p className="csd-value-01">{state?.state}</p>
            </div>
          </div>

          <div style={{ display: "flex" }}>
            <div className="csd-label-02">
              {" "}
              <p className="csd-title-01">Country</p>
              <p className="csd-value-01">{state?.country}</p>
            </div>
            <div className="csd-label-01">
              {" "}
              <p className="csd-title-01">Postal Code</p>
              <p className="csd-value-01">{state?.postalCode}</p>
            </div>
          </div>
        </div>
        <button
          style={{ cursor: "pointer" }}
          className="csd-back-btn"
          onClick={() => navigate("/company_stores")}
        >
          Back
        </button>
      </Stack>
    </div>
  );
};

export default CompanyStoreDetail;
