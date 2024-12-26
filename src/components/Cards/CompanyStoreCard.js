import React from "react";
import "./style.css";
import Switch from "@mui/material/Switch";

const CompanyStoreCard = () => {
  return (
    <div className="store-card-2">
      <div style={{ display: "flex" }}>
        <div className="store-card-img">
          <img />
        </div>
        <div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#1F074F",
              paddingLeft: "20px",
            }}
          >
            Store Name
          </p>

          <div
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#22222299",
              paddingLeft: "20px",
            }}
          >
            Street Name
          </div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#22222299",
              paddingLeft: "20px",
            }}
          >
            City Name
          </p>
        </div>
      </div>
      <Switch
        className="switch-btn1"
        style={{ color: "#09D8C4" }}
        defaultChecked
      />
    </div>
  );
};

export default CompanyStoreCard;
