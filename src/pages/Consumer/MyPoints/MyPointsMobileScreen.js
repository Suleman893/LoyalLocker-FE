import React from "react";
import { Stack, Grid } from "@mui/material";
import "./style.css";

export const MyPointsMobileScreen = ({ data }) => {
  return (
    <>
      {data?.map((item, index) => (
        <div key={index} className="points-mobile-cards">
          <Stack
            sx={{
              marginBottom: "15px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#0B7974",
            }}
          >
            {item.description}
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <div>
                <Stack
                  sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
                >
                  Points Earn
                </Stack>
                <Stack
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
                >
                  {item?.points}
                </Stack>
              </div>
            </Grid>
            <Grid item xs={7}>
              <div>
                <Stack
                  sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
                >
                  Points Expires
                </Stack>
                <Stack
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
                >
                  {item.pointsExpiry ? item.pointsExpiry : "N/A"}
                </Stack>
              </div>
            </Grid>
            <Grid item xs={5}>
              <div>
                <Stack
                  sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
                >
                  Transaction Date
                </Stack>
                <Stack
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
                >
                  {new Date(item.transferDate).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </Stack>
              </div>
            </Grid>
            <Grid item xs={7}>
              <div>
                <Stack
                  sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
                >
                  Store
                </Stack>
                <Stack
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
                >
                  {item.merchantInfo
                    ? item.merchantInfo.firstName +
                      " " +
                      item.merchantInfo.lastName
                    : "N/A"}
                </Stack>
              </div>
            </Grid>
          </Grid>
        </div>
      ))}
    </>
  );
};
