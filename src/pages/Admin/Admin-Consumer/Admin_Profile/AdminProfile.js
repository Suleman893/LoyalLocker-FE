import React, { useEffect, useState } from "react";
import { Box, Grid, Stack, Typography } from "@mui/material";
import SideBar from "../../../../components/Layout/SideBar";
import Header from "../../../../components/Layout/Header";
import { DataGrid } from "@mui/x-data-grid";
import avatar3 from "../../../../assets/Admin images/avatar3.jpg";
import roww from "../../../../assets/Admin images/roww.svg";
import "./style.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userProfile } from "../../../../redux/auth/authThunks";

const AdminProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedInUser } = useSelector((state) => state.auth);

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    dispatch(userProfile());
  }, []);

  const columns = [
    { field: "name", headerName: "Rule Name", width: 290 },
    {
      field: "activity",
      headerName: "Activity",
      width: 250,
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
    <div style={{ display: "flex" }}>
      <SideBar />

      <Stack sx={{ width: "100%", height: "100vh", background: "#FAFAFA" }}>
        <Header setCollapsed={setCollapsed} collapsed={collapsed} />
        <Stack sx={{ padding: "0px 30px" }}></Stack>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container>
            <Grid item xs={12}>
              <div>
                <div className="ap-main-div">
                  <img className="ap-profile-img" src={avatar3} alt="" />
                  <div>
                    <Stack className="ap-content">
                      <Typography className="ap-content-01">
                        Welcome Back,
                      </Typography>
                      <Typography className="ap-content-02">
                        {loggedInUser?.firstName +
                          "  " +
                          loggedInUser?.lastName}
                      </Typography>
                      <Typography>
                        Company / Brand Name · My Birthday 🎂{" "}
                        {loggedInUser?.dateOfBirth}
                      </Typography>
                    </Stack>
                  </div>

                  <button className="ap-view-btn">
                    View Profile <img src={roww} />
                  </button>
                  <button
                    className="ap-edit-btn"
                    onClick={() =>
                      navigate("/adminProfileUpdate", { state: loggedInUser })
                    }
                  >
                    Edit Profile <img src={roww} />
                  </button>
                </div>
                <div className="ap-tbl-main-div">
                  <div className="ap-header-div">
                    <div className="ap-title-design"></div>
                    <div className="ap-title">Recent Activity</div>
                  </div>
                  <DataGrid
                    className="profile-data-grid"
                    sx={{
                      "& .MuiDataGrid-row": {
                        backgroundColor: "white",
                        borderRadius: "10px",
                      },
                      "& .MuiDataGrid-columnHeader": {
                        color: "black",
                        fontFamily: "Roboto",
                        fontWeight: "700",
                      },
                      height: "290px",
                      border: "none",
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
              </div>
            </Grid>
          </Grid>
        </Box>
      </Stack>
    </div>
  );
};

export default AdminProfile;
