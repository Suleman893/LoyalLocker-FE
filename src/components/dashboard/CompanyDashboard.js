import React, { useEffect, useState } from "react";
import { Stack, Grid, Box, Typography, Button, useMediaQuery } from "@mui/material";
import { Chart } from "react-google-charts";
import icon1 from "../../assets/admin-dashboard/icon1.png";
import icon2 from "../../assets/admin-dashboard/icon2.png";
import icon3 from "../../assets/admin-dashboard/icon3.png";
import icon4 from "../../assets/admin-dashboard/icon4.png";
import icon5 from "../../assets/admin-dashboard/icon5.png";
import icon6 from "../../assets/admin-dashboard/icon6.png";
import { useDispatch, useSelector } from "react-redux";
import { merchantDashboard } from "../../redux/company/companyThunks";
import { useTheme } from '@mui/material/styles';

import "./CompanyDashboard.css";

function AdminDshboard() {
  const defaultMainData = [
    {
      background: "rgba(168, 230, 200, 0.25)",
      name: "New",
      name1: "Consumers",
      value: 0,
      icon: icon1,
    },
    {
      background: "rgba(162, 231, 255, 0.25)",
      name: "Points ",
      name1: "Credited",
      value: 0,
      icon: icon2,
    },
    {
      background: "rgba(205, 189, 255, 0.25)",
      name: "Points ",
      name1: "Redeem",
      value: 0,
      icon: icon3,
    },
    {
      background: "rgba(0, 123, 117, 0.10)",
      name: "Number of ",
      name1: "Stores",
      value: 0,
      icon: icon4,
    },
    {
      background: "rgba(255, 148, 51, 0.10)",
      name: "Top Performing ",
      name1: "Store",
      value: 0,
      icon: icon5,
    },
    {
      background: "rgba(0, 217, 193, 0.10)",
      name: "Number of ",
      name1: "Referrals",
      value: 0,
      icon: icon6,
    },
  ];

  const campaignTopData = [
    { name: "Email Open Rate", value: 0, text: "0 Unique Email Opens" },
    {
      name: "Email Click-Through Rate",
      value: 0,
      text: "0 Unique Email Clicks",
    },
    { name: "Total Emails Delivered", value: "0" },
  ];

  const campaignBottomData = [
    { name: "Bounce Rate", value: 0, text: "0 Total Bounces" },
    { name: "Number of Event Launched", value: 0, text: "In last 30 Days" },
    {
      name: "Total SMS Delivered",
      value: "0",
      text: "0 Unique Opens",
    },
  ];

  const options = {};
  

  const { dashboardEvents, dashboardInfo } = useSelector(
    (state) => state.company
  );
  const dispatch = useDispatch();
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));
  const isMdUp = useMediaQuery(theme.breakpoints.up('md'));
  const isLgUp = useMediaQuery(theme.breakpoints.up('lg'));
  const isXlUp = useMediaQuery(theme.breakpoints.up('xl'));
  let gapValue = 7;

  if (isXlUp) {
    gapValue = 8;
  } else if (isLgUp) {
    gapValue = 7;
  } else if (isMdUp) {
    gapValue = 2;
  } else if (isSmUp) {
    gapValue = 1;
  }

  const [mainData, setMainData] = useState(defaultMainData);
  const [campaignsTopData, setCampaignsTopData] = useState(campaignTopData);
  const [campaignsBottomData, setCampaignsBottomData] =
    useState(campaignBottomData);

  useEffect(() => {
    dispatch(merchantDashboard());
  }, []);

  useEffect(() => {
    setMainData([
      {
        background: "rgba(168, 230, 200, 0.25)",
        name: "Total",
        name1: "Members",
        value: dashboardInfo?.totalMembers || 0,
        icon: icon1,
      },
      {
        background: "rgba(162, 231, 255, 0.25)",
        name: "Points",
        name1: "Credited",
        value: dashboardInfo?.totalCreditedPoints || 0,
        icon: icon2,
      },
      {
        background: "rgba(205, 189, 255, 0.25)",
        name: "Number of",
        name1: "Stores",
        value: dashboardInfo?.totalStores || 0,
        icon: icon3,
      },
      {
        background: "rgba(0, 123, 117, 0.10)",
        name: "Top performing",
        name1: "Stores",
        value: dashboardInfo?.totalTopPerformingStores || 0,
        icon: icon4,
      },
      {
        background: "rgba(0, 217, 193, 0.10)",
        name: "Number of ",
        name1: "Referrals",
        value: dashboardInfo?.totalInvitedUsers || 0,
        icon: icon6,
      },
    ]);
    setCampaignsTopData([
      {
        name: "Email Open Rate",
        value: dashboardInfo?.merchantCampaignRecord?.totalEmailOpenRate || 0,
        text: `${
          dashboardInfo?.merchantCampaignRecord?.totalUniqueEmailOpens || 0
        } Unique Email Opens`,
      },
      {
        name: "Email Click-Through Rate",
        value: dashboardInfo?.merchantCampaignRecord?.totalClickRate || 0,
        text: `${
          dashboardInfo?.merchantCampaignRecord?.totalUniqueEmailClicks || 0
        } Unique Email Clicks`,
      },
      {
        name: "Total Emails Delivered",
        value: dashboardInfo?.merchantCampaignRecord?.totalEmailsSent || 0,
      },
    ]);
    setCampaignsBottomData([
      {
        name: "Bounce Rate",
        value: dashboardInfo?.merchantCampaignRecord?.totalBounceRate || 0,
        text: `${
          dashboardInfo?.merchantCampaignRecord?.totalBounce || 0
        } Total Bounces`,
      },
      {
        name: "Number of Event Launched",
        value: dashboardInfo?.totalEventsByPlatform || 0,
      },
      {
        name: "Total SMS Delivered",
        value: "0",
        text: "0 Unique Opens",
      },
    ]);
  }, [dashboardInfo]);

  return (
    <>
      <Box>
        <Stack
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Stack
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginLeft: "5px",
            }}
          >
            <Stack sx={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  width: "16px",
                  height: "32px",
                  background: "#0B7974",
                  borderRadius: "5px",
                }}
              ></div>
              <Typography
                sx={{
                  paddingLeft: "16px",
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#1A1D1F",
                }}
              >
                Dashboard
              </Typography>
            </Stack>
          </Stack>
        </Stack>
        <Grid container gap={gapValue}
         sx={{ marginTop: "32px" }}>
          {mainData.map((item, index) => (
            <Grid item key={index} lg={1.8} md={3.8} sm={6.7}>
              <Box
                sx={{
                  background: item.background,
                  boxShadow: '5px 5px 15px #2222220F',
                  height: '300px',
                  borderRadius: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '250px',
                  [theme.breakpoints.down('1441')]: {
                    height: '200px', 
                    width: '200px',
                  },
                  
                }}
              >
                <Box>
                  <img src={item.icon} alt="" width="48px" height="48px" />
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--Neutral-05, #32383F)",
                    }}
                  >
                    {item.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "13px",
                      fontWeight: 500,
                      color: "var(--Neutral-05, #32383F)",
                    }}
                  >
                    {item.name1}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: "48px",
                      fontWeight: 500,
                      color: "var(--Neutral-07, #191D1F)",
                    }}
                  >
                    {item.value}
                  </Typography>
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Grid container gap={2} sx={{ marginTop: "30px" }}>
        <Grid
          item
          lg={5.9}
          sx={{
            height: "auto",
            background: "#FFFFFF",
            boxShadow: " 5px 5px 15px #2222220F",
            borderRadius: "10px",
            [theme.breakpoints.down('1025')]: {
              display: 'block', 
              width: '100%',
            },
          }}
        >
          <Box sx={{ padding: "15px" }}>
            <Stack sx={{ display: "flex", flexDirection: "row" }}>
              <div
                style={{
                  width: "16px",
                  height: "32px",
                  background: "#0B7974",
                  borderRadius: "5px",
                }}
              ></div>
              <Typography
                sx={{
                  paddingLeft: "16px",
                  fontSize: "20px",
                  fontWeight: 500,
                  color: "#1A1D1F",
                }}
              >
                Enagement
              </Typography>
            </Stack>
            <Box
              sx={{
                background: "var(--Neutral-02, #F4F4F4)",
                padding: "10px",
                borderRadius: "20px",
                // height:'auto'
              }}
            >
               <Grid container gap={2}
               sx={{ [theme.breakpoints.down('1025')]: {
                    flexWrap:'nowrap',
                    
                  },}}
                  >
                {campaignsTopData.map((item, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3.7}
                  
                  >
                    <Box
                      sx={{
                        background: index === 0 ? "white" : "transparent",
                        height: "auto",
                        borderRadius: index === 0 ? "10px" : "0", // Apply border-radius only to the first card
                        border:
                          index === 0 ? "1px solid #yourBorderColor" : "none", // Apply border only to the first card
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        // padding:'10px'
                      }}
                    >
                      <Typography sx={{ color: " #1F074F",fontSize:'13px' }}>
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#1F074F",
                          fontSize: "40px",
                          fontWeight: "600",
                        }}
                      >
                        {item.value}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#1F074F",
                          background: "white",
                          borderRadius: "10px",
                          fontSize: "12px",

                        }}
                      >
                        {item.text}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>  
            </Box>
          </Box>

          <Box sx={{ padding: "15px" }}>
            <Box
              sx={{
                background: "var(--Neutral-02, #F4F4F4)",
                padding: "10px",
                borderRadius: "20px",
              }}
            >
              <Grid container gap={2}
                 sx={{ [theme.breakpoints.down('1025')]: {
                  flexWrap:'nowrap',
                  
                },}}
              >
                {campaignsBottomData.map((item, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4} lg={3.7}>
                    <Box
                      sx={{
                        // height: "112px",
                        borderRadius: "10px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Typography sx={{ color: " #1F074F",fontSize: "13px" }}>
                        {item.name}
                      </Typography>
                      <Typography
                        sx={{
                          color: "#1F074F",
                          fontSize: "40px",
                          fontWeight: "600",
                        }}
                      >
                        {item.value}
                      </Typography>
                      <Stack
                        sx={{
                          padding: "5px",
                          background: "#FFFFFF",
                          borderRadius: "8px",
                        }}
                      >
                        <Typography sx={{ color: "#2222224D",fontSize: "13px" }}>
                          {item.text}
                        </Typography>
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box> 
        </Grid>
           <Grid
            item
            lg={5.9}
            sx={{
              height: "348px",
              background: "#FFFFFF",
              boxShadow: " 5px 5px 15px #2222220F",
              borderRadius: "10px",
              [theme.breakpoints.down('1025')]: {
                width:'100%',
                
              }
              
            }}
          >
            <Box sx={{ padding: "15px" }}>
              <Stack
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "32px",
                    background: "#0B7974",
                    borderRadius: "5px",
                  }}
                ></div>
                <Typography
                  sx={{
                    paddingLeft: "16px",
                    fontSize: "20px",
                    fontWeight: 500,
                    color: "#1A1D1F",
                  }}
                >
                  Performance: Earning Rules
                </Typography>
              </Stack>
              <Chart
                chartType="Bar"
                width="100%"
                height="280px"
                data={
                  dashboardEvents?.length
                    ? dashboardEvents
                    : [
                        ["", ""],
                        ["Scenario", 0],
                        ["Referral", 0],
                        ["General Spending", 0],
                        ["Geolocation", 0],
                        ["Multiply Earned Points", 0],
                        ["Product Purchase", 0],
                      ]
                }
                options={{
                  chart: {},
                  colors: ["#0B7974", "#FF5833"],
                  legend: { position: "none" },
                }}
              />
            </Box>
          </Grid> 
      </Grid>
    </>
  );
}

export default AdminDshboard;
