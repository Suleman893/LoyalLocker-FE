import React from "react";

const EarnCard = ({ width, imgSrc, label, points }) => {
  return (
    <div style={{ width: width, height: "380px", marginLeft: "20px" }}>
      <img style={{ width: width, height: "300px" }} src={imgSrc} />
      <div>{label}</div>
      <div
        style={{
          width: "100px",
          height: "32px",
          background: "#FFBC0F",
          borderRadius: "10px",
          paddingTop: "5px",
          marginTop: "5px",
          fontSize: "20px",
          fontWeight: "700",
          paddingLeft: "5px",
        }}
      >
        {points}
      </div>
    </div>
  );
};

export default EarnCard;
