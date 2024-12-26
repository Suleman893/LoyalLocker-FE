import React, { useEffect, useState } from "react";
import { Grid, Stack, Typography } from "@mui/material";
import SideBar2 from "../Layout/SideBar2";
import Header from "../Layout/Header";
import ImageCard from "../Cards/ImageCard";
import DashboardCard2 from "../Cards/DashboardCard2";
import "./Dashboard.css";
import { useDispatch, useSelector } from "react-redux";
import { consumerDashboard } from "../../redux/consumer/consumerThunk";
import action from "../../../src/assets/Actions.png";
import rightarrow from "../../../src/assets/rightarrow.png";
import DashboardCard from "../Cards/DashboardCard";

const ConsumerDashboard = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const cardColors = ["#FF58331A", "#0B79741A", "#1480F31A"];
  const [currentDashboard, setCurrentDashboard] = useState(1);
  const [isActionImage, setIsActionImage] = useState(true);

  const { dashboard } = useSelector((state) => state.consumer);
  const openSidebar = useSelector((state) => state.consumer.openSidebar);

  useEffect(() => {
    dispatch(consumerDashboard());
  }, [dispatch]);

  const toggleDashboard = () => {
    setCurrentDashboard(currentDashboard === 1 ? 2 : 1);
    setIsActionImage(!isActionImage);
  };

  return (
    <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
      <SideBar2 collapsed={collapsed} />
      <Stack className="main-height">
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack className={`${openSidebar ? 'dashboard-main-div-toggle' : 'dashboard-main-div'}`}>
          <div
            style={{
              display: "flex",
              marginTop: "20px",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex" }}>
              <div
                style={{
                  width: "16px",
                  height: "32px",
                  background: "#0B7974",
                  borderRadius: "10px",
                  marginLeft: "30px",
                }}
              ></div>
              <div
                style={{
                  fontSize: "23px",
                  fontWeight: "500",
                  color: "black",
                  paddingLeft: "30px",
                }}
              >
                Dashboard
              </div>
            </div>
            <button className="arrow-btn-1" onClick={toggleDashboard}>
              <img
                src={isActionImage ? action : rightarrow}
                alt="toggle button"
              />
            </button>
          </div>
          {currentDashboard === 1 && (
            <>
              <div style={{margin:'20px 20px 0px 20px'}}>
                <DashboardCard dashboard={dashboard} />
              </div>
              <div style={{ margin: "20px"}}>
                <ImageCard />
              </div>
            </>
          )}
          {currentDashboard === 2 && (
            <Grid container spacing={2} style={{ marginTop: "20px" }}>
              {dashboard?.allBrandsPoints?.length > 0 ? (
                dashboard.allBrandsPoints.map((item, index) => (
                  <Grid item xs={12} sm={6} md={4} key={item.merchantId}>
                    <DashboardCard2
                      brandName={item.merchantBrandInfo?.brandName}
                      totalPoints={item?.totalPoints}
                      cardColor={cardColors[index % cardColors.length]}
                    />
                  </Grid>
                ))
              ) : (
                <Typography variant="body1" style={{ marginLeft: "50px" }}>
                  No Points from Brands.
                </Typography>
              )}
            </Grid>
          )}
        </Stack>
      </Stack>
    </div>
  );
};

export default ConsumerDashboard;
