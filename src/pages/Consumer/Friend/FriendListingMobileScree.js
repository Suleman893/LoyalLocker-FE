import React from "react";
import { Stack, Grid } from "@mui/material";
import "./style.css";

export const FriendListingMobileScree = () => {
  return (
    <>
      <div className="transections-mobile-cards">
        <Stack
          sx={{
            marginBottom: "15px",
            fontSize: "18px",
            fontWeight: "600",
            color: "#0B7974",
          }}
        >
          Samsung Buds Pro
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div>
              <Stack
                sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
              >
                Email ID
              </Stack>
              <Stack
                sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
              >
                david.wilson@gmail.com
              </Stack>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Stack
                sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
              >
                Points Earn
              </Stack>
              <Stack
                sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
              >
                50
              </Stack>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Stack
                sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
              >
                Invited Date
              </Stack>
              <Stack
                sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
              >
                2 Jun 2024
              </Stack>
            </div>
          </Grid>
        </Grid>
      </div>

      <div className="transections-mobile-cards">
        <Stack
          sx={{
            marginBottom: "15px",
            fontSize: "18px",
            fontWeight: "600",
            color: "#0B7974",
          }}
        >
          Samsung Buds Pro
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <div>
              <Stack
                sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
              >
                Email ID
              </Stack>
              <Stack
                sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
              >
                david.wilson@gmail.com
              </Stack>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Stack
                sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
              >
                Points Earn
              </Stack>
              <Stack
                sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
              >
                50
              </Stack>
            </div>
          </Grid>
          <Grid item xs={6}>
            <div>
              <Stack
                sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
              >
                Invited Date
              </Stack>
              <Stack
                sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
              >
                2 Jun 2024
              </Stack>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};
