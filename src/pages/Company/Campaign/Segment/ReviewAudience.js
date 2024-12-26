import React, { useState } from "react";
import Header from "../../../../components/Layout/Header";
import { Stack, Grid, Typography, Button } from "@mui/material";
import "../style.css";
import SideBar3 from "../../../../components/Layout/SideBar3";
import { Table, TableBody, TableCell, TableRow, Divider } from "@mui/material";
import cross from "../../../../assets/Company images/cross.png";

const ReviewAudience = () => {
  const [collapsed, setCollapsed] = useState(false);

  const rows = [
    {
      name: "Gender_Females",
      totalUser: "Total Users: 345",
      lastUpdated: "Last Updated: 10 Sep 2020",
    },
  ];

  return (
    <div>
      <div style={{ display: "flex" }}>
        <SideBar3 />
        <Stack sx={{ width: "100%", padding: "0px", background: "#FAFAFA" }}>
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack sx={{ padding: "0px 30px" }}>
            <div className="ptl-main-div">
              <Stack
                sx={{
                  marginTop: "20px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  gap={2}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  <div
                    className="ptl-title-design"
                    style={{ marginTop: "0px", marginLeft: "0px" }}
                  ></div>
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 600, color: "#1A1D1F" }}
                  >
                    Review Audience
                  </Typography>
                </Stack>
              </Stack>

              <Stack sx={{ marginTop: "30px" }}>
                <Table>
                  <TableBody>
                    {rows.map((row) => (
                      <>
                        <TableRow key={row.id}>
                          <Grid container>
                            <Grid item md={4}>
                              <TableCell sx={{ border: "none" }}>
                                <Typography
                                  sx={{
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#232323",
                                  }}
                                >
                                  {row.name}
                                </Typography>
                              </TableCell>
                            </Grid>
                            <Grid item md={2}>
                              <TableCell sx={{ border: "none" }}>
                                <Typography
                                  sx={{ fontSize: "18px", color: "#6F767E" }}
                                >
                                  {row.totalUser}
                                </Typography>
                              </TableCell>
                            </Grid>
                            <Grid
                              item
                              md={4}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <TableCell sx={{ border: "none" }}>
                                <Typography
                                  sx={{ fontSize: "18px", color: "#6F767E" }}
                                >
                                  {row.lastUpdated}
                                </Typography>
                              </TableCell>
                            </Grid>
                            <Grid
                              item
                              md={2}
                              sx={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <TableCell sx={{ border: "none" }}>
                                <img
                                  src={cross}
                                  alt=""
                                  width="11px"
                                  height="11px"
                                />
                              </TableCell>
                            </Grid>
                          </Grid>
                        </TableRow>
                        <Divider />
                      </>
                    ))}
                  </TableBody>
                </Table>
              </Stack>

              <Stack
                gap={2}
                sx={{
                  marginTop: "40px",
                  flexDirection: "row",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  sx={{
                    color: "#0B7974",
                    border: "1px solid #0B7974",
                    borderRadius: "10px",
                    height: "52px",
                    width: "240px",
                    textTransform: "none",
                    // "&:hover": {
                    //     cursor: "pointer",
                    //     background: "#0B7974",
                    // },
                  }}
                >
                  Cancel
                </Button>
                <Button
                  sx={{
                    width: "240px",
                    height: "52px",
                    borderRadius: "10px",
                    background: "#0B7974",
                    color: "white",
                    textTransform: "none",
                    "&:hover": {
                      cursor: "pointer",
                      background: "#0B7974",
                    },
                  }}
                >
                  Save
                </Button>
              </Stack>
            </div>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default ReviewAudience;
