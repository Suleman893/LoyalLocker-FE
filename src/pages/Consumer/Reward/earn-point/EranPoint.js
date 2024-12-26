import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import SideBar2 from "../../../../components/Layout/SideBar2";
import Header from "../../../../components/Layout/Header";
import "./style.css";
import EarnCard from "../../../../components/Cards/EarnCard";

const EarnPoint = () => {
  const [collapsed, setCollapsed] = useState(false);

  const cardData = [
    {
      width: "260px",
      imgSrc: "./images/Group-2.png",
      label: "Every $2 Spend",
      points: "200 Points",
    },
    {
      width: "260px",
      imgSrc: "./images/Group-2.png",
      label: "Every $2 Spend",
      points: "200 Points",
    },
    {
      width: "260px",
      imgSrc: "./images/Group-2.png",
      label: "Every $2 Spend",
      points: "200 Points",
    },
    {
      width: "260px",
      imgSrc: "./images/Group-2.png",
      label: "Every $2 Spend",
      points: "200 Points",
    },
    {
      width: "260px",
      imgSrc: "./images/Group-2.png",
      label: "Every $2 Spend",
      points: "200 Points",
    },
  ];
  const cardData2 = [
    {
      width: "350px",
      imgSrc: "./images/Group-2.png",
      label: "Every $2 Spend",
      points: "200 Points",
    },
    {
      width: "350px",
      imgSrc: "./images/Group-2.png",
      label: "Every $2 Spend",
      points: "200 Points",
    },
    {
      width: "350px",
      imgSrc: "./images/Group-2.png",
      label: "Every $2 Spend",
      points: "200 Points",
    },
    {
      width: "350px",
      imgSrc: "./images/Group-2.png",
      label: "Every $2 Spend",
      points: "200 Points",
    },
  ];
  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar2 />
        <Stack
          sx={{
            width: "100%",
            padding: "0px",
            height: "110vh",
            background: "#FAFAFA",
          }}
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack sx={{ padding: "0px 30px" }}>
            <div className="earn-main">
              <div className="earn-header">
                <div className="earn-title"></div>
                <Typography
                  variant="h5"
                  fontWeight="500"
                  color="black"
                  sx={{ pl: "30px" }}
                >
                  How to Earn More Points
                </Typography>
              </div>

              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {cardData.map((card, index) => (
                  <EarnCard
                    key={index}
                    width={card.width}
                    imgSrc={card.imgSrc}
                    label={card.label}
                    points={card.points}
                  />
                ))}
              </div>
              <div style={{ display: "flex", marginLeft: "20px" }}>
                <img src="./images/to-arrow.png" />
                <div style={{ fontSize: "20px", fontWeight: "700" }}>
                  Already used
                </div>
              </div>
              <div
                style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}
              >
                {cardData2.map((card, index) => (
                  <EarnCard
                    key={index}
                    width={card.width}
                    imgSrc={card.imgSrc}
                    label={card.label}
                    points={card.points}
                  />
                ))}
              </div>
            </div>
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default EarnPoint;
