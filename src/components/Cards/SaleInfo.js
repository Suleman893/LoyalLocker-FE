import React from "react";

const SaleInfo = ({ iconSrc, tagText, duration, width }) => {
  return (
    <div
      style={{
        width: width,
        height: "30px",
        background: "#FFBC0F",
        color: "black",
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <img
        width="20px"
        height="20px"
        style={{ marginTop: "5px" }}
        src={iconSrc}
        alt="Sale Icon"
      />
      <div
        style={{
          fontSize: "12px",
          fontWeight: "700",
          marginTop: "5px",
          marginRight: "10px",
        }}
      >
        {tagText}
      </div>
      <div
        style={{
          fontSize: "12px",
          fontWeight: "700",
          marginTop: "5px",
          marginRight: "10px",
        }}
      >
        {duration}
      </div>
    </div>
  );
};

export default SaleInfo;
