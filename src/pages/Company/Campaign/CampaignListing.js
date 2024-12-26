import React, { useState } from "react";
import Header from "../../../components/Layout/Header";
import { Stack, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import OutlinedPagination from "@mui/material/Pagination";
import "./style.css";
import "./CampaignListing.css";
import { useNavigate } from "react-router-dom";
import { Table, TableRow, TableCell, TableBody } from "@mui/material";
import CampaignTabsButton from "./CampaignTabsButton";
import SideBar3 from "../../../components/Layout/SideBar3";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  allCampaigns,
  checkIntegrationStatus,
} from "../../../redux/company/companyThunks";
import Loader from "../../../components/Loader/Loader";
import AddIcon from "@mui/icons-material/Add";
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

const CompaignListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { campaigns, isLoading, integrationStatus } = useSelector(
    (state) => state.company
  );

  useEffect(() => {
    dispatch(allCampaigns());
  }, []);

  useEffect(() => {
    dispatch(checkIntegrationStatus());
  }, []);

  const rowsPerPage = 8;

  const startingRow = (currentPage - 1) * rowsPerPage + 1;
  const endingRow = Math.min(currentPage * rowsPerPage, campaigns?.length);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const handleNextClick = () => {
    setCurrentPage((prevPage) =>
      Math.min(prevPage + 1, Math.ceil(campaigns?.length / rowsPerPage))
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
        className="company-main-height"
        >
          <Header setCollapsed={setCollapsed} collapsed={collapsed} />
          <Stack className="company-dashboard-main-div">
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
                  onClick={() => navigate("/add_campaign")}
                >
                  Add Campaigns
                </Button>
              </Stack>
              <CampaignTabsButton />
              {isLoading ? (
                <Loader />
              ) : (
                <>
                  {campaigns.length === 0 ? (
                    <div className="no-records-found">
                      <Typography variant="paragraph">
                        No record found
                      </Typography>
                    </div>
                  ) : (
                    <Table>
                      <TableBody>
                        {campaigns
                          .slice(startingRow - 1, endingRow)
                          .map((campaign, index) => (
                            <TableRow
                              key={campaign.id}
                              sx={{
                                backgroundColor:
                                  index % 2 === 0 ? "#F5F7FA" : "#ffffff",
                              }}
                            >
                              <div
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                }}
                              >
                                <TableCell
                                  sx={{ border: "none" }}
                                  className="segment-name"
                                >
                                  {campaign.name}
                                  <Typography className="segment-name-span">
                                    {campaign?.segmentInfo?.name}
                                  </Typography>
                                </TableCell>
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <TableCell
                                    sx={{ border: "none" }}
                                    className="segment-name-value"
                                  >
                                    <span style={{ color: "#0B7974" }}>
                                      Created Date:{" "}
                                      {campaign?.createdAt
                                        ? format(
                                            new Date(campaign?.createdAt),
                                            "MM/dd/yyyy"
                                          )
                                        : "-"}
                                    </span>{" "}
                                    <Typography className="segment-name-value-span">
                                      Sender name: <b>{campaign.senderName}</b>
                                    </Typography>
                                  </TableCell>
                                  {/* <TableCell sx={{ border: "none" }}>
                                    <img
                                      src={dots}
                                      alt="dots"
                                      width="30px"
                                      height="30px"
                                    />
                                  </TableCell> */}
                                </div>
                              </div>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  )}
                  {campaigns.length > 0 && (
                    <div className="pagination">
                      <span>
                        Showing {endingRow} from {campaigns?.length} Campaigns
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
                          <img src="./images/Vectoria.png" alt="previous" />
                        </button>
                        <CustomOutlinedPagination
                          shape="rounded"
                          variant="filled"
                          count={Math.ceil(campaigns?.length / rowsPerPage)}
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
                          <img src="./images/Vectori.png" alt="next" />
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

export default CompaignListing;
