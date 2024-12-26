import React, { useState } from "react";
import SideBar3 from "../../../components/Layout/SideBar3";
import Header from "../../../components/Layout/Header";
import { Stack, Grid, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import OutlinedPagination from "@mui/material/Pagination";
import "./style.css";
import "./EmailListing.css";
import { useNavigate } from "react-router-dom";
import { Table, TableRow, TableCell, TableBody } from "@mui/material";
import CampaignTabsButton from "./CampaignTabsButton";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  allSegments,
  checkIntegrationStatus,
} from "../../../redux/company/companyThunks";
import AddIcon from "@mui/icons-material/Add";
import Loader from "../../../components/Loader/Loader";
import { format } from "date-fns";

const CustomOutlinedPagination = styled(OutlinedPagination)(({ theme }) => ({
  "& .Mui-selected": {
    backgroundColor: "rgba(255, 88, 51, 1) !important",
    color: "#fff !important",
  },
  "& .MuiPaginationItem-root": {
    backgroundColor: "transparent",
    color: "black",
    border: "none",
    "&:hover": {
      backgroundColor: "rgba(255, 88, 51, 1)",
      color: "#fff",
    },
  },
}));

const AudienceListing = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { segments, isLoading, integrationStatus } = useSelector(
    (state) => state.company
  );

  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(allSegments());
  }, []);

  useEffect(() => {
    dispatch(checkIntegrationStatus());
  }, []);

  const rowsPerPage = 8;
  const startingRow = (currentPage - 1) * rowsPerPage + 1;
  const endingRow = Math.min(currentPage * rowsPerPage, segments?.length);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(segments?.length / rowsPerPage))
    );
  };

  const handlePreviousClick = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <div>
      <div style={{ width:'100%',minHeight:'100vh',display: "flex" }}>
        <SideBar3 />
        <Stack
        className='company-main-height'
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack className='company-dashboard-main-div'>
            <div className="ptl-main-div">
              <Stack
                sx={{
                  margin: "20px 0px",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Stack
                  gap={2}
                  style={{ display: "flex", flexDirection: "row" }}
                >
                  {" "}
                  <div
                    className="ptl-title-design"
                    style={{ marginTop: "0px", marginLeft: "0px" }}
                  ></div>
                  <Typography
                    sx={{ fontSize: "20px", fontWeight: 600, color: "#1A1D1F" }}
                  >
                    Campaigns
                  </Typography>
                </Stack>
                <Button
                  onClick={() => navigate("/add_audience")}
                  disabled={
                    integrationStatus?.mailchimp === false ? true : false
                  }
                  startIcon={<AddIcon />}
                  sx={{
                    padding: "8px 16px",
                    height: "40px",
                    background: "#FF5833",
                    color: "#FFFFFF",
                    borderRadius: "12px",
                    textTransform: "none",
                  }}
                >
                  Add New Audience
                </Button>
              </Stack>
              <CampaignTabsButton />

              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {segments.length === 0 ? (
                    <div className="no-records-found">
                      <Typography variant="paragraph">
                        No record found
                      </Typography>
                    </div>
                  ) : (
                    <Table>
                      <TableBody>
                        {segments
                          .slice(startingRow - 1, endingRow)
                          .map((segment, index) => (
                            <TableRow
                              key={segment?.id}
                              sx={{
                                backgroundColor:
                                  index % 2 === 0 ? "#F5F7FA" : "#ffffff",
                              }}
                            >
                              <Grid container>
                                <Grid item md={4}>
                                  <TableCell
                                    sx={{
                                      border: "none",
                                      display: "flex",
                                      flexDirection: "row",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Typography className="email-template-name">
                                      {segment.name}
                                    </Typography>
                                  </TableCell>
                                </Grid>
                                <Grid item md={4}>
                                  <TableCell
                                    sx={{ border: "none", color: "#6F767E" }}
                                    className="email-description"
                                  >
                                    Total Users: {segment?.totalUsers}
                                  </TableCell>
                                </Grid>
                                <Grid item md={4}>
                                  <TableCell
                                    sx={{
                                      border: "none",
                                      color: "#6F767E",
                                      width: "497px",
                                    }}
                                    className="email-description"
                                  >
                                    {`Created Date: ${format(
                                      new Date(segment?.updatedAt),
                                      "dd MMM yyyy"
                                    )}`}
                                  </TableCell>
                                </Grid>
                              </Grid>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  )}
                  {segments.length > 0 && (
                    <div className="pagination">
                      <span>
                        Showing {endingRow} from {segments?.length} Audiences
                      </span>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                          onClick={handlePreviousClick}
                          style={{
                            width: "30px",
                            height: "40px",
                            borderRadius: "10px",
                            border: "none",
                            marginRight: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            backgroundColor: "white",
                            color: "rgba(54, 48, 98, 1)",
                          }}
                        >
                          <img src="./images/Vectoria.png" />
                        </button>
                        <CustomOutlinedPagination
                          shape="rounded"
                          variant="filled"
                          count={Math.ceil(segments?.length / rowsPerPage)}
                          page={currentPage}
                          onChange={handlePageChange}
                          hideNextButton
                          hidePrevButton
                        />
                        <button
                          onClick={handleNextClick}
                          style={{
                            width: "30px",
                            height: "40px",
                            borderRadius: "34px",
                            border: "none",
                            marginLeft: "10px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            cursor: "pointer",
                            backgroundColor: "white",
                            color: "rgba(54, 48, 98, 1)",
                          }}
                        >
                          <img src="./images/Vectori.png" />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </Stack>
        </Stack>
      </div>
    </div>
  );
};

export default AudienceListing;
