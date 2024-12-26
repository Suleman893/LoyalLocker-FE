import React from "react";
import { Stack, Grid } from "@mui/material";
import "./style.css";

export const ConsumerMobileScreen = ({ data }) => {
  return (
    <>
      {data?.map((transaction) => (
        <div key={transaction?.id} className="transections-mobile-cards">
          <Stack
            sx={{
              marginBottom: "15px",
              fontSize: "18px",
              fontWeight: "600",
              color: "#0B7974",
            }}
          >
            {transaction?.offerInfo?.productInfo?.title || "Unknown Product"}
          </Stack>
          <Grid container spacing={2}>
            <Grid item xs={5}>
              <div>
                <Stack
                  sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
                >
                  Points
                </Stack>
                <Stack
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
                >
                  {transaction.points ? `$${transaction.points}` : "N/A"}
                </Stack>
              </div>
            </Grid>
            <Grid item xs={7}>
              <div>
                <Stack
                  sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
                >
                  Transaction Type
                </Stack>
                <Stack
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
                >
                  {transaction?.transactionType}
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
                  {new Date(transaction.transactionDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    }
                  )}
                </Stack>
              </div>
            </Grid>
            <Grid item xs={7}>
              <div>
                <Stack
                  sx={{ fontSize: "12px", fontWeight: "600", color: "#888888" }}
                >
                  Merchant
                </Stack>
                <Stack
                  sx={{ fontSize: "16px", fontWeight: "500", color: "#232323" }}
                >
                  {transaction.merchantInfo?.brandName || "Unknown Merchant"}
                </Stack>
              </div>
            </Grid>
          </Grid>
        </div>
      ))}
    </>
  );
};
