import React from "react";
import { Grid, Paper, Typography, Box, backdropClasses } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./ImageCard.css";

const ImageCard = () => {
  const navigate = useNavigate();
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          onClick={() => navigate("/sale_listing")}
        >
          <Paper
            className="consumer-dashboard-card-2-image"
            elevation={3}
            style={{ cursor: "pointer", borderRadius: "12px" }}
          >
            <Box
              sx={{ height: "100%", boxSizing: "border-box", padding: "16px" }}
            >
              <img
                className="sale-image"
                src="./images/SuperSale.png"
                alt="Super Sale"
              />
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          onClick={() => navigate("/consumer_transactions")}
        >
          <Paper
            className="consumer-dashboard-card-2"
            elevation={3}
            style={{ cursor: "pointer", borderRadius: "12px" }}
          >
            <Box display="flex" p={2}>
              <img
                className="cash-img"
                src="./images/cash.png"
                alt="My Transactions"
              />
              <Box ml={2}>
                <Typography variant="h6">My Transactions</Typography>
                <Typography variant="body2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          md={6}
          lg={4}
          onClick={() => navigate("/sale_listing")}
        >
          <Paper
            className="consumer-dashboard-card-2"
            elevation={3}
            style={{ cursor: "pointer", borderRadius: "12px" }}
          >
            <Box display="flex" p={2}>
              <div style={{ width: "120px", height: "119px" }}>
                <img
                  className="reward-img"
                  src="./images/Rewards.png"
                  alt="Get Rewards"
                />
              </div>
              <Box ml={2}>
                <Typography variant="h6">Get Rewards</Typography>
                <Typography variant="body2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Paper
            className="consumer-dashboard-card-2"
            elevation={3}
            sx={{ borderRadius: "12px" }}
          >
            <Box display="flex" p={2}>
              <img
                className="cash-img"
                src="./images/house.png"
                alt="Visit our store"
              />
              <Box ml={2}>
                <Typography variant="h6">Visit our store</Typography>
                <Typography variant="body2">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4} onClick={() => navigate("/friends")}>
          <Paper
            className="consumer-dashboard-card-2-image"
            elevation={3}
            style={{
              cursor: "pointer",
              borderRadius: "12px",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{ height: "100%", boxSizing: "border-box", padding: "16px" }}
            >
              <img
                className="sale-image"
                src="./images/infrend.png"
                alt="Refer a Friend"
              />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} lg={4} onClick={() => navigate("/faq")}>
          <Paper
            className="consumer-dashboard-card-2-image"
            elevation={3}
            style={{
              cursor: "pointer",
              borderRadius: "12px",
              // display: "flex",
              // justifyContent: "center",
              // alignItems: "center",
              height: "100%",
            }}
          >
            <Box
              sx={{ height: "100%", boxSizing: "border-box", padding: "16px" }}
            >
              <img className="sale-image" src="./images/faq.png" alt="FAQ" />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ImageCard;
