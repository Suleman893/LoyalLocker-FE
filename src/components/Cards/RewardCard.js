import React from "react";

const RewardCard = ({ count, label, showIcon, iconSrc, marginTop }) => {
  return (
    <div
      style={{
        width: "280px",
        height: "119px",
        border: "1px solid #D5D9E7",
        borderRadius: "10px",
        marginTop: "20px",
        marginLeft: "20px",
      }}
    >
      <div
        style={{
          display: "flex",
          marginTop: "30px",
          marginLeft: "20px",
          justifyContent: "space-between",
          marginRight: "20px",
        }}
      >
        <div style={{ fontSize: "28px", fontWeight: "700", color: "#0B7974" }}>
          {count}
        </div>
        {showIcon && <img src={iconSrc} alt="icon" />}
      </div>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "600",
          color: "#0B7974",
          paddingLeft: "20px",
          marginTop: marginTop,
        }}
      >
        {label}
      </div>
    </div>
  );
};

export default RewardCard;
