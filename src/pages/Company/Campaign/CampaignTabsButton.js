import React from "react";
import { Stack, Button } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";

function CampaignTabsButton() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  return (
    <div style={{ marginBottom: "30px" }}>
      <Stack sx={{ flexDirection: "row", 
        // justifyContent: "space-between",
        gap:'3rem' }}>
        <Button
          sx={{
            width: "208px",
            height: "60px",
            background: pathname === "/campaigns" ? "#0B7974" : "#EBEBEB",
            color: pathname === "/campaigns" ? "#FFFFFF" : "#6F767E",
            fontSize: "20px",
            fontWeight: 600,
            borderRadius: "12px",
            textTransform: "none !important",
            padding:'auto',
            "&:hover": {
              background: "#0B7974",
              color: "#FFFFFF",
            },
             '@media (max-width: 1440px)': {
              fontSize: "15px",
            },
          }}
          onClick={() => navigate("/campaigns")}
        >
          Campaigns
        </Button>

        <Button
          sx={{
            width: "208px",
            height: "60px",
            background: pathname === "/email_templates" ? "#0B7974" : "#EBEBEB",
            color: pathname === "/email_templates" ? "#FFFFFF" : "#6F767E",
            fontSize: "20px",
            fontWeight: 600,
            borderRadius: "12px",
            textTransform: "none !important",
            "&:hover": {
              background: "#0B7974",
              color: "#FFFFFF",
            },
             '@media (max-width: 1440px)': {
              fontSize: "15px",
            },
          }}
          onClick={() => navigate("/email_templates")}
        >
          Email Creative
        </Button>
        <Button
          sx={{
            width: "208px",
            height: "60px",
            background: pathname === "/journeys" ? "#0B7974" : "#EBEBEB",
            color: pathname === "/journeys" ? "#FFFFFF" : "#6F767E",
            fontSize: "20px",
            fontWeight: 600,
            borderRadius: "12px",
            textTransform: "none !important",
            "&:hover": {
              background: "#0B7974",
              color: "#FFFFFF",
            },
             '@media (max-width: 1440px)': {
              fontSize: "15px",
            },
          }}
          onClick={() => navigate("/journeys")}
        >
          Journey
        </Button>
        <Button
          sx={{
            width: "208px",
            height: "60px",
            background: pathname === "/sms" ? "#0B7974" : "#EBEBEB",
            color: pathname === "/sms" ? "#FFFFFF" : "#6F767E",
            fontSize: "20px",
            fontWeight: 600,
            borderRadius: "12px",
            textTransform: "none !important",
            "&:hover": {
              background: "#0B7974",
              color: "#FFFFFF",
            },
             '@media (max-width: 1440px)': {
              fontSize: "15px",
            },
          }}
          disabled={true}
        >
          SMS
        </Button>
        <Button
          sx={{
            width: "208px",
            height: "60px",
            background: pathname === "/audience" ? "#0B7974" : "#EBEBEB",
            color: pathname === "/audience" ? "#FFFFFF" : "#6F767E",
            fontSize: "20px",
            fontWeight: 600,
            borderRadius: "12px",
            textTransform: "none !important",
            "&:hover": {
              background: "#0B7974",
              color: "#FFFFFF",
            },
             '@media (max-width: 1440px)': {
              fontSize: "15px",
            },
          }}
          onClick={() => navigate("/audience")}
        >
          Audience
        </Button>
      </Stack>
    </div>
  );
}

export default CampaignTabsButton;
