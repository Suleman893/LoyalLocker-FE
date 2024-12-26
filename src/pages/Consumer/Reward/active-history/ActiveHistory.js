import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import SideBar2 from "../../../../components/Layout/SideBar2";
import Header from "../../../../components/Layout/Header";
import RewardCard from "../../../../components/Cards/RewardCard";
import "./style.css";

const ActiveHistory = () => {

  const [collapsed, setCollapsed] = useState(false);

  return (
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
          <div className="ah-main">
            <div className="ah-header">
              <div className="ah-title"></div>
              <Typography
                variant="h5"
                fontWeight="500"
                color="black"
                sx={{ pl: "30px" }}
              >
                How to Earn More Points
              </Typography>
            </div>
            <div style={{ display: "flex", marginLeft: "20px" }}>
              <img src="./images/to-arrow.png" alt="Arrow Icon" />
              <div style={{ fontSize: "20px", fontWeight: "700" }}>
                Already used
              </div>
            </div>
            <div style={{ display: "flex" }}>
              <RewardCard
                count={217}
                label="Loyalty points"
                showIcon={false}
                marginTop={"20px"}
              />
              <RewardCard
                count="$ 43.40"
                label="pending CREDITS (1 p. = $0.20)"
                showIcon={false}
                marginTop={"20px"}
              />
            </div>
            <Typography
              variant="h6"
              sx={{
                fontSize: "16px",
                fontWeight: "700",
                paddingLeft: "20px",
                paddingTop: "20px",
              }}
            >
              ACTIVITY HISTORY (4)
            </Typography>
            {Array.from(Array(4), (_, index) => (
              <React.Fragment key={index}>
                <div className="active-card">
                  <div style={{ display: "flex" }}>
                    <img
                      src="./images/arrow_upward.png"
                      alt="Arrow Upward Icon"
                    />
                    <div style={{ paddingLeft: "20px" }}>Activity Name</div>
                  </div>
                  <div>+39 points</div>
                  <div style={{ paddingRight: "150px" }}>22/12/2021</div>
                </div>
                <div className="line"></div>
              </React.Fragment>
            ))}
          </div>
        </Stack>
      </Stack>
    </div>
  );
};

export default ActiveHistory;
