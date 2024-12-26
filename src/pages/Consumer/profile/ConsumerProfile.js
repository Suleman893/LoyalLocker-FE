import React, { useState } from "react";
import { Box, Grid, Stack, TextField, Autocomplete } from "@mui/material";
import SideBar2 from "../../../components/Layout/SideBar2";
import Header from "../../../components/Layout/Header";
import Footer from "../../../components/Footer";
import { DataGrid } from "@mui/x-data-grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const redTheme = createTheme({
  components: {
    MuiInput: {
      styleOverrides: {
        underline: {
          "&:before": {
            borderBottomColor: "#09D8C4",
          },
          "&:after": {
            borderBottomColor: "#09D8C4",
          },
          "&:hover:not(.Mui-disabled):before": {
            borderBottomColor: "#09D8C4",
          },
        },
      },
    },
  },
});

const ConsumerProfile = () => {
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
      headerName: "Points Expiry",
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
        <SideBar2 />
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
                    <button
                      style={{
                        width: "45px",
                        height: "45px",
                        borderRadius: "50%",
                        marginLeft: "430px",
                        backgroundColor: "white",
                        border: "1px solid #09D8C4",
                      }}
                    >
                      <img src="./images/edit.png" alt="" />
                    </button>
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
                  <div>
                    <TextField
                      id="standard-basic"
                      label="First Name*"
                      variant="standard"
                      style={{
                        width: "350px",
                        marginLeft: "20px",
                        fontSize: "10px",
                        marginTop: "30px",
                        color: "#09D8C4",
                      }}
                    />
                    <TextField
                      id="standard-basic"
                      label="Last Name*"
                      variant="standard"
                      style={{
                        width: "350px",
                        marginLeft: "20px",
                        fontSize: "10px",
                        marginTop: "30px",
                        color: "#09D8C4",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <ThemeProvider theme={redTheme}>
                      <Autocomplete
                        style={{
                          width: "350px",
                          marginLeft: "20px",
                          marginTop: "30px",
                          color: "#09D8C4",
                        }}
                        id="currency"
                        disableCloseOnSelect
                        options={["Option 1", "Option 2", "Option 3"]}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Gender"
                            variant="standard"
                          />
                        )}
                        classes={{
                          popupIndicator: "red-dropdown-button",
                          inputRoot: "#09D8C4",
                        }}
                      />
                    </ThemeProvider>
                    <TextField
                      id="standard-basic"
                      label="email"
                      variant="standard"
                      style={{
                        width: "350px",
                        marginLeft: "20px",
                        fontSize: "10px",
                        marginTop: "30px",
                        color: "#09D8C4",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <TextField
                      id="standard-basic"
                      label="Mobile Number*"
                      variant="standard"
                      style={{
                        width: "350px",
                        marginLeft: "20px",
                        fontSize: "10px",
                        marginTop: "30px",
                        color: "#09D8C4",
                      }}
                    />
                    <ThemeProvider theme={redTheme}>
                      <Autocomplete
                        style={{
                          width: "350px",
                          marginLeft: "20px",
                          marginTop: "30px",
                          color: "#09D8C4",
                        }}
                        id="currency"
                        disableCloseOnSelect
                        options={["Option 1", "Option 2", "Option 3"]}
                        getOptionLabel={(option) => option}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label="Country"
                            variant="standard"
                          />
                        )}
                        classes={{
                          popupIndicator: "red-dropdown-button",
                          inputRoot: "#09D8C4",
                        }}
                      />
                    </ThemeProvider>
                  </div>
                  <div>
                    <TextField
                      id="standard-basic"
                      label="DOB"
                      variant="standard"
                      style={{
                        width: "350px",
                        marginLeft: "20px",
                        fontSize: "10px",
                        marginTop: "30px",
                        color: "#09D8C4",
                      }}
                    />
                  </div>
                  <div style={{ display: "flex", marginBottom: "20px" }}>
                    <button
                      style={{
                        width: "156px",
                        height: "42px",
                        border: "1px solid #09D8C4",
                        borderRadius: "5px",
                        fontSize: "18px",
                        background: "none",
                        marginTop: "340px",
                        marginLeft: "450px",
                        color: "#09D8C4",
                      }}
                    >
                      cancel
                    </button>
                    <button
                      style={{
                        width: "156px",
                        height: "42px",
                        borderRadius: "5px",
                        fontSize: "18px",
                        background: "#1F074F",
                        color: "#09D8C4",
                        marginTop: "340px",
                        marginLeft: "20px",
                      }}
                    >
                      save
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

export default ConsumerProfile;
