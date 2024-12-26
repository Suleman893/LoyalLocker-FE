import React from "react";
import "./style.css";
import Switch from "@mui/material/Switch";

const CompanyCard = () => {
  return (
    <div className="comp-card">
      <div style={{ display: "flex" }}>
        <div className="comp-img">
          <img
            style={{ marginTop: "25px", marginLeft: "20px" }}
            src="./images/amazon_PNG5.png"
            alt=""
          />
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
            Company/Brand Name
          </p>
          <div
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#22222299",
              paddingLeft: "20px",
            }}
          >
            Email:
          </div>
          <p
            style={{
              fontSize: "12px",
              fontWeight: "500",
              color: "#22222299",
              paddingLeft: "20px",
            }}
          >
            Phone:
          </p>
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <button
          style={{
            width: "180px",
            height: "45px",
            border: "none",
            borderRight: "1px solid rgba(240, 240, 240, 1)",
            background: "#FAFAFA",
          }}
        >
          <Switch style={{ color: "#09D8C4" }} defaultChecked />
        </button>
        <button
          style={{
            width: "180px",
            height: "45px",
            border: "none",
            background: "#FAFAFA",
          }}
        >
          <img
            style={{ width: "20px", height: "20px" }}
            src="./images/edit.png"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default CompanyCard;
