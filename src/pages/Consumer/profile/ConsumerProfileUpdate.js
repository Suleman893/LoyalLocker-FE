import React, { useState } from "react";
import { Box, Grid, Stack } from "@mui/material";
import MerchantSidebar from "../../../components/Layout/SideBar3";
import Header from "../../../components/Layout/Header";
import Footer from "../../../components/Footer";
import { DataGrid } from "@mui/x-data-grid";
import SideBar from "../../../components/Layout/SideBar";
import { useSelector } from "react-redux";

const ConsumerProfileUpdate = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(false);

  const columns = [
    { field: "name", headerName: "Rule Name", width: 290 },
    {
      field: "activity",
      headerName: "Activity",
      width: 250,
      editable: true,
    },
    {
      field: "Point",
      headerName: "Points Expiriy",
      sortable: false,
      width: 200,
    },
  ];

  const rows = [
    {
      id: 1,
      name: "RuleName_01",
      activity: "Active always",
      Point: "yes",
    },
    {
      id: 1,
      name: "RuleName_01",
      activity: "Active always",
      Point: "yes",
    },
    {
      id: 1,
      name: "RuleName_01",
      activity: "Active always",
      Point: "yes",
    },
  ];

  return (
    <div>
      <div style={{ display: "flex" }}>
        {userInfo?.role === "ROLE_ADMIN" ? (
          <SideBar />
        ) : userInfo?.role === "ROLE_MERCHANT" ? (
          <MerchantSidebar />
        ) : null}
        <Stack sx={{ width: "100%", padding: "0px", background: "#FAFAFA" }}>
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack sx={{ padding: "0px 30px" }}></Stack>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container>
              <Grid item xs={6}>
                <div>
                  <div
                    style={{
                      width: "785px",
                      height: "190px",
                      borderRadius: "10px",
                      background:
                        "linear-gradient(0.25turn, #09D8C4 0%, #2972EF 100%)",
                      marginLeft: "30px",
                      marginTop: "20px",
                    }}
                  >
                    <img
                      style={{
                        width: "250px",
                        height: "250px",
                        borderRadius: "50%",
                        marginTop: "60px",
                        marginLeft: "250px",
                        objectFit: "cover",
                      }}
                      src="./images/avatar3.jpg"
                      alt=""
                    />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "43px",
                        color: "#1F074F",
                        marginTop: "180px",
                        marginLeft: "250px",
                        fontWeight: "700",
                      }}
                    >
                      Consumer Name
                    </p>
                    <p
                      style={{
                        fontSize: "23px",
                        fontWeight: "500",
                        color: "#22222299",
                        marginLeft: "330px",
                      }}
                    >
                      dd/mm/yyyy
                    </p>
                  </div>
                  <p
                    style={{
                      fontSize: "23px",
                      fontWeight: "500",
                      color: "#22222299",
                      paddingLeft: "30px",
                    }}
                  >
                    Recent Activity
                  </p>
                  <DataGrid
                    className="data-grid"
                    sx={{
                      "& .MuiDataGrid-cell": {
                        color: "black",
                        paddingLeft: "40px",
                      },
                      "& .MuiDataGrid-row": {
                        marginBottom: "5px",
                        backgroundColor: "white",
                        borderRadius: "5px",
                      },
                      "& .MuiDataGrid-main": {
                        backgroundColor: "#FAFAFA",
                        height: "657px",
                        overflow: "none",
                      },
                      "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "#FAFAFA",
                        color: "#1F074F",
                        fontFamily: "Roboto",
                        fontWeight: "700",
                      },
                      height: "290px",
                      width: "785px",
                      background: "white",
                      margin: "20px 30px",
                      borderRadius: "10px",
                      border: "none",
                      color: "#1F074F",
                      textAlign: "center",
                      overflowX: "none",
                    }}
                    rows={rows}
                    columns={columns}
                    classes={{
                      root: "custom-data-grid-root",
                    }}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 8,
                        },
                      },
                    }}
                    pageSizeOptions={[8]}
                    disableRowSelectionOnClick
                    rowHeight={55}
                    rowStyle={{
                      paddingBottom: "50px",
                    }}
                  />
                </div>
              </Grid>
              <Grid item xs={6}>
                <div
                  style={{
                    width: "785px",
                    height: "870px",
                    borderRadius: "10px",
                    background: "white",
                    marginLeft: "30px",
                    marginTop: "20px",
                  }}
                >
                  <p
                    style={{
                      fontSize: "23px",
                      fontFamily: "Roboto-Medium, Light",
                      color: "#22222299",
                      paddingLeft: "350px",
                      paddingTop: "40px",
                    }}
                  >
                    Details
                  </p>
                  <div style={{ display: "flex" }}>
                    <div>
                      <p
                        style={{
                          paddingLeft: "140px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#2222224D",
                        }}
                      >
                        First Name
                      </p>
                      <p
                        style={{
                          paddingLeft: "140px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        Loream Ispum
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          paddingLeft: "240px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#2222224D",
                        }}
                      >
                        Last Name
                      </p>
                      <p
                        style={{
                          paddingLeft: "240px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        Loream Ispum
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <p
                        style={{
                          paddingLeft: "140px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#2222224D",
                        }}
                      >
                        First Name
                      </p>
                      <p
                        style={{
                          paddingLeft: "140px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        Loream Ispum
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          paddingLeft: "240px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#2222224D",
                        }}
                      >
                        Last Name
                      </p>
                      <p
                        style={{
                          paddingLeft: "240px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        Loream Ispum
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <p
                        style={{
                          paddingLeft: "140px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#2222224D",
                        }}
                      >
                        First Name
                      </p>
                      <p
                        style={{
                          paddingLeft: "140px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        Loream Ispum
                      </p>
                    </div>
                    <div>
                      <p
                        style={{
                          paddingLeft: "240px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#2222224D",
                        }}
                      >
                        Last Name
                      </p>
                      <p
                        style={{
                          paddingLeft: "240px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        Loream Ispum
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex" }}>
                    <div>
                      <p
                        style={{
                          paddingLeft: "140px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "#2222224D",
                        }}
                      >
                        First Name
                      </p>
                      <p
                        style={{
                          paddingLeft: "140px",
                          fontSize: "16px",
                          fontWeight: "500",
                          color: "black",
                        }}
                      >
                        Loream Ispum
                      </p>
                    </div>
                  </div>
                  <div style={{ display: "flex", marginBottom: "20px" }}>
                    <button
                      style={{
                        width: "256px",
                        height: "42px",
                        border: "1px solid #09D8C4",
                        borderRadius: "5px",
                        fontSize: "18px",
                        background: "none",
                        marginTop: "340px",
                        marginLeft: "300px",
                        color: "#09D8C4",
                      }}
                    >
                      Back
                    </button>
                    <button
                      style={{
                        width: "356px",
                        height: "42px",
                        borderRadius: "5px",
                        fontSize: "18px",
                        background: "#1F074F",
                        color: "#09D8C4",
                        marginTop: "340px",
                        marginLeft: "20px",
                      }}
                    >
                      Change Password
                    </button>
                    <button
                      style={{
                        width: "256px",
                        height: "42px",
                        borderRadius: "5px",
                        fontSize: "18px",
                        background: "#1F074F",
                        color: "#09D8C4",
                        marginTop: "340px",
                        marginLeft: "20px",
                      }}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Stack>
      </div>
      <Footer />
    </div>
  );
};

export default ConsumerProfileUpdate;
