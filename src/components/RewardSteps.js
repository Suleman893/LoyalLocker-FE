import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";

import ReactStepper from "../components/Buttons/ReactStepper";
import RewardCard from "../components/Cards/RewardCard";

const RewardSteps = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeStep, setActiveStep] = useState(1);

  const handleStepClick = (step) => {
    setActiveStep(step);
  };
  const levels = [
    { label: "BRONZE", unlockStep: 3, isUnlocked: activeStep >= 3 },
    { label: "SILVER", unlockStep: 5, isUnlocked: activeStep >= 5 },
    { label: "GOLD", unlockStep: 8, isUnlocked: activeStep >= 8 },
  ];

  const isBronzeUnlocked = activeStep >= 3;

  const isGoldUnlocked = activeStep >= levels[2].unlockStep;
  return (
    <div
      style={{
        width: "1480px",
        height: "50vh",
        background: "white",
        marginTop: "20px",
        marginLeft: "20px",
        borderRadius: "10px",
        overflow: "auto",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", paddingBottom: "20px" }}
      >
        <div
          style={{
            width: "16px",
            height: "32px",
            background: "#0B7974",
            borderRadius: "10px",
            marginLeft: "30px",
          }}
        ></div>
        <Typography
          variant="h5"
          fontWeight="500"
          color="black"
          sx={{ pl: "30px" }}
        >
          Available Rewards
        </Typography>
      </div>
      <div
        style={{
          width: "1390px",
          height: "180px",
          border: "1px solid #D5D9E7",
          borderRadius: "10px",
          marginLeft: "20px",
        }}
      >
        <div style={{ display: "flex", padding: "10px 20px" }}>
          <div
            style={{
              fontSize: "16px",
              fontWeight: "700",
              paddingLeft: "20px",
              paddingTop: "15px",
              color: levels[0].isUnlocked ? "#0B7974" : "initial",
            }}
          >
            LEVELS
          </div>
          {levels.map((item, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center" }}>
              <img
                src={
                  activeStep >= item.unlockStep
                    ? "./images/star.png"
                    : "./images/loack_1.png"
                }
                alt={item.label}
                style={{
                  paddingLeft: "20px",
                  paddingTop: "10px",
                  color: activeStep >= item.unlockStep ? "#0B7974" : "initial",
                }}
              />
              <Typography
                fontSize="14px"
                fontWeight="600"
                sx={{
                  pl: "20px",
                  pt: "10px",
                  color: activeStep >= item.unlockStep ? "#0B7974" : "initial",
                }}
              >
                {item.label}
              </Typography>
            </div>
          ))}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "1280px",
            marginTop: "20px",
            marginLeft: "30px",
          }}
        >
          {[0, 300, 500, 800].map((value, index) => (
            <div key={index}>{value}</div>
          ))}
        </div>
        <ReactStepper
          activeStep={activeStep}
          handleStepClick={handleStepClick}
          width="380px"
        />
        <div
          style={{
            fontSize: "14px",
            fontWeight: "500",
            color: "#0B7974",
            paddingLeft: "20px",
          }}
        >
          {isGoldUnlocked ? (
            "You are now a Gold member. Continue to earn points to claim bonus rewards."
          ) : (
            <>
              <span
                style={{
                  fontSize: "16px",
                  fontWeight: "700",
                  color: "#0B7974",
                }}
              >
                {isBronzeUnlocked ? "Get 200" : "Get 100"}
              </span>
              <span>
                {" "}
                more points to become a {isBronzeUnlocked
                  ? "Silver"
                  : "Bronze"}{" "}
                member
              </span>
            </>
          )}
        </div>
      </div>
      <div style={{ display: "flex" }}>
        <RewardCard
          count={5}
          label="Available Rewards"
          showIcon={true}
          iconSrc="./images/arrowicon.png"
        />
        <RewardCard
          count={3}
          label="Pending extra earnings"
          showIcon={true}
          iconSrc="./images/arrowicon.png"
        />

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
      <div style={{ display: "flex", marginTop: "20px", marginLeft: "20px" }}>
        <img src="./images/logout.png" alt="logout" />
        <button
          style={{
            width: "120px",
            height: "27px",
            background: "none",
            border: "none",
            color: "#FF5833",
            fontWeight: "bold",
          }}
        >
          Leave Program
        </button>
      </div>
    </div>
  );
};

export default RewardSteps;
