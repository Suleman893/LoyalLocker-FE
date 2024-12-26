import React, { useState } from "react";
import { Stack, Typography } from "@mui/material";
import SideBar2 from "../../../../components/Layout/SideBar3";
import Header from "../../../../components/Layout/Header";
import RewardSteps from "../../../../components/RewardSteps";
import { DataGrid } from "@mui/x-data-grid";
import "./style.css";

const LoyaltyList = () => {
  const [collapsed, setCollapsed] = useState(false);
  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "Transaction",
      headerName: "Transaction Type",
      width: 250,
      editable: true,
    },
    {
      field: "store",
      headerName: "Store Detail",
      width: 200,
      editable: true,
    },
    {
      field: "date",
      headerName: "Transaction Date",
      width: 150,
      editable: true,
    },
    {
      field: "Point",
      headerName: "Points Expiring on",
      sortable: false,
      width: 250,
    },
    {
      field: "Point1",
      headerName: "Merchant Detail",
      sortable: false,
      width: 250,
    },
    {
      field: "Point2",
      headerName: "Points Earn/spent",
      sortable: false,
      width: 240,
    },
  ];

  const rows = [
    {
      id: 1,
      Transaction: "Bank",
      store: "Jon",
      date: "14/11/23",
      Point: "35",
      Point1: "45",
      Point2: "334",
    },
    {
      id: 2,
      Transaction: "Bank",
      store: "Jon",
      date: "14/11/23",
      Point: "35",
      Point1: "45",
      Point2: "334",
    },
    {
      id: 3,
      Transaction: "Bank",
      store: "Jon",
      date: "14/11/23",
      Point: "35",
      Point1: "45",
      Point2: "334",
    },
    {
      id: 4,
      Transaction: "Bank",
      store: "Jon",
      date: "14/11/23",
      Point: "35",
      Point1: "45",
      Point2: "334",
    },
    {
      id: 5,
      Transaction: "Bank",
      store: "Jon",
      date: "14/11/23",
      Point: "35",
      Point1: "45",
      Point2: "334",
    },
    {
      id: 6,
      Transaction: "Bank",
      store: "Jon",
      date: "14/11/23",
      Point: "35",
      Point1: "45",
      Point2: "334",
    },
    {
      id: 7,
      Transaction: "Bank",
      store: "Jon",
      date: "14/11/23",
      Point: "35",
      Point1: "45",
      Point2: "334",
    },
    {
      id: 8,
      Transaction: "Bank",
      store: "Jon",
      date: "14/11/23",
      Point: "35",
      Point1: "45",
      Point2: "334",
    },
    {
      id: 9,
      Transaction: "Bank",
      store: "Jon",
      date: "14/11/23",
      Point: "35",
      Point1: "45",
      Point2: "334",
    },
    {
      id: 10,
      Transaction: "Bank",
      store: "Jon",
      date: "14/11/23",
      Point: "35",
      Point1: "45",
      Point2: "334",
    },
    {
      id: 11,
      Transaction: "Bank",
      store: "Jon",
      date: "14/11/23",
      Point: "35",
      Point1: "45",
      Point2: "334",
    },
    {
      id: 12,
      Transaction: "Bank",
      store: "Jon",
      date: "14/11/23",
      Point: "35",
      Point1: "45",
      Point2: "334",
    },
  ];

  return (
    <>
      <div style={{ display: "flex" }}>
        <SideBar2 />
        <Stack
          sx={{
            width: "100%",
            padding: "0px",
            height: "120vh",
            background: "#FAFAFA",
          }}
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack sx={{ padding: "0px 30px" }}>
            <RewardSteps />
            <div className="list-main">
              <div className="list-header">
                <div className="list-title"></div>
                <Typography
                  variant="h5"
                  fontWeight="500"
                  color="black"
                  sx={{ pl: "30px" }}
                >
                  Loyalty Rewards List
                </Typography>
              </div>
              <DataGrid
                className="data-grid"
                sx={{
                  "& .MuiDataGrid-row": {
                    "&:nth-child(even)": {
                      backgroundColor: "#F5F7FA",
                    },
                  },

                  "& .MuiDataGrid-columnHeader": {
                    color: "#1F074F",
                    fontFamily: "Roboto",
                    fontWeight: "700",
                    background: "#FAFAFA",
                    color: "black",
                  },
                  height: "400px",
                  width: "1430px",
                  background: "white",
                  borderRadius: "10px",
                  border: "none",
                  color: "black",
                  textAlign: "center",
                  overflowX: "none",
                  marginLeft: "20px",
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
          </Stack>
        </Stack>
      </div>
    </>
  );
};

export default LoyaltyList;
